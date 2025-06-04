import Player, { PlayerDirection, PlayerInterface } from "./player"

export default class BattleRoyalPlayer extends Player {

    constructor(scene : Phaser.Scene, lobbyPoint : Phaser.Math.Vector2 , playerAtlas : string, uuid : string, name : string) {
        super(scene, lobbyPoint, playerAtlas, playerAtlas.concat("-back"), uuid, name);

        // Offset for the player
        this.setSize(30, 40);
        this.setOffset(0,24);

        // Create the player's walking animations from the texture atlas. These are stored in the global
        // animation manager so any sprite can access them.
        this.anims.create({
            key: "player-left-walk",
            frames: this.anims.generateFrameNames(this.atlas, {
            prefix: this.atlas.concat("-left-walk."),
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "player-right-walk",
            frames: this.anims.generateFrameNames(this.atlas, {
            prefix: this.atlas.concat("-right-walk."),
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "player-front-walk",
            frames: this.anims.generateFrameNames(this.atlas, {
            prefix: this.atlas.concat("-front-walk."),
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "player-back-walk",
            frames: this.anims.generateFrameNames(this.atlas, {
            prefix: this.atlas.concat("-back-walk."),
            start: 0,
            end: 3,
            zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });

    }

    update(cursors : Phaser.Types.Input.Keyboard.CursorKeys) {
        super.update(cursors);

        // Update the animation last and give left/right animations precedence over up/down animations
        if (cursors.left.isDown) {
            this.anims.play("player-left-walk", true);
            this.direction = PlayerDirection.LEFT;
        } else if (cursors.right.isDown) {
            this.anims.play("player-right-walk", true);
            this.direction = PlayerDirection.RIGHT;
        } else if (cursors.up.isDown) {
            this.anims.play("player-back-walk", true);
            this.direction = PlayerDirection.UP;
        } else if (cursors.down.isDown) {
            this.anims.play("player-front-walk", true);
            this.direction = PlayerDirection.DOWN;
        } else {
            this.anims.stop();
            this.direction = PlayerDirection.NOT_MOVING;

            // If we were moving, pick and idle frame to use
            if (this.lastVelocity.x < 0) this.setTexture(this.atlas, this.atlas.concat("-left"));
            else if (this.lastVelocity.x > 0) this.setTexture(this.atlas, this.atlas.concat("-right"));
            else if (this.lastVelocity.y < 0) this.setTexture(this.atlas, this.atlas.concat("-back"));
            else if (this.lastVelocity.y > 0) this.setTexture(this.atlas, this.atlas.concat("-front"));
        }
    }

    updateFromJson(jsonMessage : PlayerInterface) {
        super.updateFromJson(jsonMessage);
        this.direction = jsonMessage.direction;
        let previousDirection = this.direction;
        if(!this.anims) {
            return;
        }

        // Update the animation
        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.direction === PlayerDirection.LEFT) {
            this.anims.play("player-left-walk", true);
        } else if (this.direction === PlayerDirection.RIGHT) {
            this.anims.play("player-right-walk", true);
        } else if (this.direction === PlayerDirection.UP) {
            this.anims.play("player-back-walk", true);
        } else if (this.direction === PlayerDirection.DOWN) {
            this.anims.play("player-front-walk", true);
        } else {
            this.anims.stop();

            // If we were moving, pick and idle frame to use
            if (previousDirection === PlayerDirection.LEFT) this.setTexture(this.atlas, this.atlas.concat("-left"));
            else if (previousDirection === PlayerDirection.RIGHT) this.setTexture(this.atlas, this.atlas.concat("-right"));
            else if (previousDirection === PlayerDirection.UP) this.setTexture(this.atlas, this.atlas.concat("-back"));
            else if (previousDirection === PlayerDirection.DOWN) this.setTexture(this.atlas, this.atlas.concat("-front"));
        }
    }

    toJsonBackEnd() : PlayerInterface {
        let returnValue : PlayerInterface = super.toJsonBackEnd();
        return returnValue;
    }
}