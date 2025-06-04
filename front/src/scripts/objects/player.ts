export enum PlayerDirection {
    NOT_MOVING = 0,
    UP = 1,
    DOWN = 2,
    LEFT = 3,
    RIGHT = 4
}

export interface PlayerInterface {
    uuid : string,
    name : string,
    x : number,
    y : number,
    velocityX : number,
    velocityY : number
    direction : number,
    atlas : string,
    frame : string,
    width : number,
    height : number,
    isAlive : boolean
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
    scene : Phaser.Scene
    atlas : string
    name : string
    lastVelocity : Phaser.Math.Vector2
    velocity : number
    uuid : string
    direction : PlayerDirection
    hasBeenUpdated : boolean
    lobbyPoint : Phaser.Math.Vector2
    spawnPoint : Phaser.Math.Vector2
    lastUpdate : number
    isAlive : boolean

    constructor(scene : Phaser.Scene, lobbyPoint : Phaser.Math.Vector2 , playerAtlas : string, frame: string, uuid : string, name : string) {
        super(scene, lobbyPoint.x, lobbyPoint.y, playerAtlas, frame);
        this.scene = scene;
        this.atlas = playerAtlas;
        this.name = name;
        // Adding player to scene
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // setSize & setOffset are used to control the size of the player's body.
        this.setSize(32, 32);

        // Parameter usefull to destroy a remote player who has been disconnected
        this.hasBeenUpdated = true;

        // Set velocity parameters
        this.velocity = 200;
        this.lastVelocity = new Phaser.Math.Vector2(0,0);
        this.direction = PlayerDirection.NOT_MOVING;

        // Unique ID for this player
        this.uuid = uuid;
        this.lobbyPoint = lobbyPoint;

        // Define spanw point
        let x = Math.floor(Math.random() * (1458 - 868 + 1)) + 868;
        let y = Math.floor(Math.random() * (2655 - 1992 + 1)) + 1992;
        this.spawnPoint = new Phaser.Math.Vector2(x, y);
        this.lastUpdate = Date.now();
    }

    update(cursors : Phaser.Types.Input.Keyboard.CursorKeys)
    {
        // Record previous velocity
        this.lastVelocity = this.body.velocity.clone();

        // Stop any previous movement from the last frame
        this.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown) {
            this.setVelocityX(-this.velocity);
        } else if (cursors.right.isDown) {
            this.setVelocityX(this.velocity);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            this.setVelocityY(-this.velocity);
        } else if (cursors.down.isDown) {
            this.setVelocityY(this.velocity);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.body.velocity.normalize().scale(this.velocity);
    }

    goToSpawnPoint() {
        this.setPosition(this.spawnPoint.x, this.spawnPoint.y);
    }

    goToLobbyPoint() {
        this.setPosition(this.lobbyPoint.x, this.lobbyPoint.y);
    }

    isShot() {
        // If player is shoot, he goes back to respawn point for now
        this.setPosition(this.lobbyPoint.x, this.lobbyPoint.y);
        this.isAlive = false;
    }

    toJsonBackEnd() : PlayerInterface {
        let returnValue : PlayerInterface = {
            uuid: this.uuid,
            name: this.name,
            x: this.x,
            y: this.y,
            velocityX : this.body.velocity.x,
            velocityY : this.body.velocity.y,
            direction : this.direction,
            atlas : this.atlas,
            frame : this.frame.name,
            width : this.body.width,
            height : this.body.height,
            isAlive : this.isAlive
        }
        return returnValue;
    }

    updateFromJson(jsonMessage : PlayerInterface) {
        this.setPosition(jsonMessage.x, jsonMessage.y);
        this.lastVelocity.x = jsonMessage.velocityX;
        this.lastVelocity.y = jsonMessage.velocityY;
        this.lastUpdate = Date.now();
    }
}
