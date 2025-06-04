import DebugText from '../gameCore/debugText'
import Player from '../objects/player'
import GameMap from '../gameCore/gameMap'
import CameraManager from '../gameCore/gameCamera'
import BackEndWebSocket, { GameStatus } from '../network/backEndWebSocket'
import MultiPlayers from '../objects/multiPlayers'
import BulletGroup from '../objects/bulletGroup'
import GameObjectsGroup from '../objects/gameObjetGroup'
import BattleRoyalPlayer from '../objects/battleRoyalPlayer'
import FrontConf from '../conf'
import FieldOfVision from '../gameCore/fieldOfVision'
import GameMenu from '../gameCore/gameMenu'


export default class MainScene extends Phaser.Scene {
  debugText: Phaser.GameObjects.Text
  map: GameMap
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  player: Player
  multiPlayers: MultiPlayers
  cameraManager: CameraManager
  backEndWebSocket: BackEndWebSocket
  bulletsGroup: BulletGroup
  gameObjectGroup: GameObjectsGroup
  playerName: string
  gameUuid : string
  gameOwner : Boolean
  isCreate : boolean
  frontConf: FrontConf
  fieldOfVision: FieldOfVision
  gameMenu : GameMenu
  playerUuid : string

  constructor() {
    super({ key: 'MainScene' });
    this.gameOwner = false;
    this.frontConf = new FrontConf();
  }

  init(data: object) {
    this.playerName = data["pseudo"];
    this.gameUuid = data["gameUuid"];
    this.gameOwner = data["gameOwner"];
  }

  create() {
    // Create map
    this.map = new GameMap(this, "map_fest_room", ["build_atlas", "indoor1", "indoor2", "indoor3"]);

    // Create objects
    this.gameObjectGroup = new GameObjectsGroup(this, this.map.tileMap, "fest_room_prop_atlas");

    // Create Player
    this.playerUuid = Phaser.Utils.String.UUID();
    this.player = new BattleRoyalPlayer(this, this.map.lobbyPoint, "misa", this.playerUuid, this.playerName);

    // Set player's speed
    this.player.velocity = this.frontConf.playerSpeed;

    // Set up the arrows to control the player
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create distant players array
    this.multiPlayers = new MultiPlayers(this);

    // Create local and remote bullets
    this.bulletsGroup = new BulletGroup(this, this.frontConf.bulletSpeed);

    //  Adding camera
    this.cameraManager = new CameraManager(this, this.player, this.map.tileMap.widthInPixels, this.map.tileMap.heightInPixels);

    // Back end connection, adding web socket
    this.backEndWebSocket = new BackEndWebSocket(this.player, this.multiPlayers, this.bulletsGroup, this.gameUuid, this.gameFinished.bind(this));

    // Display fps
    this.debugText = new DebugText(this);

    // Field Of Vision
    this.fieldOfVision = new FieldOfVision(
      this.map,
      this.gameObjectGroup,
      this.multiPlayers,
      this.bulletsGroup,
      this.frontConf.visionScope,
      this.frontConf.visionAlpha);

    // Fire bullet when player clicks
    this.input.on('pointerdown', (pointer) => {
      if(this.backEndWebSocket.gameStatus == GameStatus.PLAYING) {
      this.bulletsGroup.fireBullet(this.player.x, this.player.y,
        this.cameraManager.mainCamera.scrollX + pointer.x, this.cameraManager.mainCamera.scrollY + pointer.y,
        Phaser.Utils.String.UUID(),
        this.backEndWebSocket);
      }
    });

    this.addColliders();

    this.gameMenu = new GameMenu(this, this.frontConf, this.backEndWebSocket, this.gameOwner);

  }

  update() {
    if(this.backEndWebSocket.gameStatus == GameStatus.LOBBY || this.backEndWebSocket.gameStatus == GameStatus.FINISHED) {
      this.gameMenu.update(this.cameraManager.mainCamera.scrollX, this.cameraManager.mainCamera.scrollY);
    } else {
      this.gameMenu.hideMenu();
    }
    this.debugText.update(this.cameraManager.mainCamera.scrollX, this.cameraManager.mainCamera.scrollY, this.backEndWebSocket.latency);
    // Players position
    this.player.update(this.cursors);
    this.multiPlayers.update();
    // Send player position to back
    this.backEndWebSocket.updatePlayerPosition(this.player);
    // Field Of Vision
    this.fieldOfVision.computeFOV(this.cameraManager.mainCamera, this.player);
  }

  addColliders() {
    /*** Player ***/
    // Watch the player and worldLayer for collisions, for the duration of the scene:
    this.physics.add.collider(this.player, this.map.worldLayer);
    // Add collides btw player and objects
    this.physics.add.collider(this.player, this.gameObjectGroup);

    /*** Multi-Players ***/
    // Add colliders
    this.physics.add.collider(this.multiPlayers, this.map.worldLayer);
    // Add collides btw multi-players and objects
    this.physics.add.collider(this.multiPlayers, this.gameObjectGroup );

    // Add collides btw player and multi-players
    this.physics.add.collider(this.player, this.multiPlayers);

    /*** Bullets ***/
    // If bullet I fired collides with wall, the server is informed
    // Collider with WorldLayer
    this.physics.add.collider(this.bulletsGroup, this.map.worldLayer, (bullet: any, map: any) => {
      this.bulletsGroup.deleteBulletIfLocal(bullet, this.backEndWebSocket);
    });
    // Collider with objects
    this.physics.add.collider(this.bulletsGroup, this.gameObjectGroup, (bullet: any, map: any) => {
      this.bulletsGroup.deleteBulletIfLocal(bullet, this.backEndWebSocket);
    });
    // Collider with player
    this.physics.add.collider(this.player, this.bulletsGroup, (player: any, bullet: any) => {
      // If bullet was remote, player has been shot otherwise do nothing to avoid sucuide.
      if (this.bulletsGroup.deleteBulletIfRemote(bullet, this.backEndWebSocket)) {
        this.player.isShot();
      }
    });
  }

  lauchGame() {
    this.multiPlayers.playersMulti = new Array<Player>();
  }

  gameFinished(winnerName: string) {
    this.gameMenu.printWinner(winnerName);
    if(this.gameOwner) {
      this.gameMenu.printMenu();
      // Set lobby after 1 seconds
      setTimeout(this.backEndWebSocket.lobbyGame.bind(this.backEndWebSocket), 1000);
    }
  }
}
