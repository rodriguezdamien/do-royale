import FrontConf from "../conf";
import BackEndWebSocket from "../network/backEndWebSocket";

export default class GameMenu {
    startGameButton : Phaser.GameObjects.Sprite
    startGameText : Phaser.GameObjects.Text
    positionX : number
    positionY : number
    winnerBackground : Phaser.GameObjects.Sprite
    winnerText : Phaser.GameObjects.Text
    backEndWebSocket : BackEndWebSocket
    isOwner: Boolean

    constructor(scene: Phaser.Scene, frontConf : FrontConf, backEnd : BackEndWebSocket, isOwner: Boolean) {
        this.isOwner = isOwner;
        this.positionX = frontConf.width/2;
        this.positionY = frontConf.height - 100;

        this.backEndWebSocket = backEnd;

        this.startGameButton = scene.add.sprite(this.positionX, this.positionY, 'menuButton', 'button1');
        this.startGameButton.setInteractive();
        this.startGameButton.setScale(0.7, 0.7);
        this.startGameButton.setOrigin(0.5, 0.5);
        this.startGameButton.on('clicked', (button : Phaser.GameObjects.Sprite) => {
            this.hideMenu();
            this.backEndWebSocket.startGame();
        });

        this.startGameText = scene.add.text(this.positionX , this.positionY, "Start the game");
        this.startGameText.setOrigin(0.5, 0.5);
        this.startGameText.setScale(0.7, 0.7);

        scene.input.on('gameobjectdown', (pointer, gameObject) => {gameObject.emit('clicked', gameObject)});
        scene.input.on('gameobjectup', (pointer, gameObject) => {gameObject.emit('pointerup', gameObject)});

        this.winnerBackground = scene.add.sprite(this.positionX, this.positionY+50, 'menuButton', 'button1');
        this.winnerBackground.setScale(0.7, 0.7);
        this.winnerBackground.setOrigin(0.5, 0.5);
        this.winnerBackground.setVisible(false);

        this.winnerText = scene.add.text(this.positionX , this.positionY+50, "The winner is : Test");
        this.winnerText.setOrigin(0.5, 0.5);
        this.winnerText.setScale(0.7, 0.7);
        this.winnerText.setVisible(false);

        if(!this.isOwner) {
            this.hideMenu();
        }
    }

    hideMenu() {
        this.startGameButton.setActive(false);
        this.startGameButton.setVisible(false);
        this.startGameText.setVisible(false);

        this.winnerBackground.setVisible(false);
        this.winnerText.setVisible(false);
    }

    printMenu() {
        if(this.isOwner) {
            this.startGameButton.setActive(true);
            this.startGameButton.setVisible(true);
            this.startGameText.setVisible(true);
        }
    }

    printWinner(winnerName: string) {
        this.winnerBackground.setVisible(true);
        this.winnerText.setVisible(true);
        this.winnerText.setText("The winner is : " + winnerName);
    }

    public update(cameraX : number, cameraY : number) {
      this.startGameButton.setX(this.positionX + cameraX);
      this.startGameButton.setY(this.positionY + cameraY);
      this.startGameText.setX(this.positionX + cameraX);
      this.startGameText.setY(this.positionY + cameraY);

      this.winnerBackground.setX(this.positionX + cameraX);
      this.winnerBackground.setY(this.positionY + 50 + cameraY);
      this.winnerText.setX(this.positionX + cameraX);
      this.winnerText.setY(this.positionY + 50 + cameraY);
    }
  }
