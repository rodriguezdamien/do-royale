import { Physics } from "phaser";
import FrontConf from "../conf";
import { TextEdit, Edit } from 'phaser3-rex-plugins/plugins/textedit.js';


import ListGamesWebSocket from "../network/listGameWebSocket"

export default class MenuScene extends Phaser.Scene {
    serverList : Map<string, string>
    graphicServerList : Array<Phaser.GameObjects.Text>
    selectedServer : string | undefined
    webSocket : ListGamesWebSocket
    frontConf : FrontConf
    pseudoText : Phaser.GameObjects.Text
    textJoin : Phaser.GameObjects.Text
    serverNameText : Phaser.GameObjects.Text

    constructor() {
      super({ key: 'MenuScene' })
    }

    create() {
        this.webSocket = new ListGamesWebSocket(this);

        this.frontConf = new FrontConf();
        // Fill the back ground with texture
        for(let w = 0; w <= this.frontConf.width; w+= 512 ) {
            for(let h = 0; h <= this.frontConf.height; h+= 512 ) {
                this.add.tileSprite(w, h, 512, 512, 'menuBackgroud');
            }
        }

        /* Title */
        let textTitle = this.add.text(this.frontConf.width/2, 30, "Battle Royal 2D");
        textTitle.setOrigin(0.5, 0.5);
        textTitle.setFontSize(50);
        let textSubTitle = this.add.text(this.frontConf.width/2, 70, "Made With Phaser 3");
        textSubTitle.setOrigin(0.5, 0.5);
        textSubTitle.setFontSize(25);

        /* Pseudo */
        let pseudoLabel = this.add.text(this.frontConf.width/2 - 150, this.frontConf.height/2 - 150, "Enter your pseudo :");
        pseudoLabel.setOrigin(0.5, 0.5);
        pseudoLabel.setFontSize(25);
        var pseudoBox = this.add.sprite(this.frontConf.width/2 + 150, this.frontConf.height/2 -150, 'menuButton', 'edit-box');
        pseudoBox.setOrigin(0.5, 0.5);
        this.pseudoText = this.add.text(this.frontConf.width/2 +150, this.frontConf.height/2 -150, "Enter pseudo");
        this.pseudoText.setOrigin(0.5, 0.5);
        this.pseudoText.setInteractive();
        this.pseudoText.setInteractive().on('pointerdown', () => {
            var editor = new TextEdit(this.pseudoText);
            editor.open(
            {
                onOpen: function (textObject) {},
                onTextChanged: function (textObject, text) {
                    (textObject as Phaser.GameObjects.Text).text = text;
                },
                onClose: function (textObject) {},
                selectAll: true,
            });
        });

        /* Join Section */
        this.textJoin = this.add.text(this.frontConf.width/2 - 300, this.frontConf.height / 2, "Join server");
        this.textJoin.setOrigin(0.5, 0.5);
        this.textJoin.setFontSize(25);

        /* Button Refresh */
        let buttonRefresh = this.add.sprite(this.frontConf.width/2 - 400, this.frontConf.height / 2 + 260, 'menuButton', 'button1');
        buttonRefresh.setInteractive();
        buttonRefresh.setScale(0.7, 0.7);
        buttonRefresh.on('clicked', (button : Physics.Arcade.Sprite) => {
            buttonRefresh.setFrame("button1-clicked");
            this.webSocket.sendServerListRequest();
        });
        buttonRefresh.on('pointerup', (button : Physics.Arcade.Sprite) => {
            buttonRefresh.setFrame("button1");
        });

        let textRefresh = this.add.text(this.frontConf.width/2 - 400, this.frontConf.height / 2 + 260, "Refresh servers");
        textRefresh.setOrigin(0.5, 0.5);
        textRefresh.setScale(0.7, 0.7);

        /* Button Join */
        let buttonJoin = this.add.sprite(this.frontConf.width/2 - 200, this.frontConf.height / 2 + 260, 'menuButton', 'button1');
        buttonJoin.setInteractive();
        buttonJoin.setScale(0.7, 0.7);
        buttonJoin.on('clicked', (button : Physics.Arcade.Sprite) => {
            buttonJoin.setFrame("button1-clicked");
            this.joinServer();
        });
        buttonJoin.on('pointerup', (button : Physics.Arcade.Sprite) => {
            buttonJoin.setFrame("button1");
        });

        let textSelectedJoin = this.add.text(this.frontConf.width/2 - 200, this.frontConf.height / 2 + 260, "Join Selected Server");
        textSelectedJoin.setOrigin(0.5, 0.5);
        textSelectedJoin.setScale(0.7, 0.7);

        /* Server List */
        let textServer = this.add.text(this.frontConf.width/2 - 300, this.frontConf.height/2 + 110 , "Server List");
        textServer.setOrigin(0.5, 0.5);

        let serverListBack = this.add.sprite(this.frontConf.width/2 - 300, this.frontConf.height/2 + 120, 'menuButton', 'server-list');
        serverListBack.scale = 2.5

        this.serverList = new Map<string, string>();
        this.graphicServerList = new Array<Phaser.GameObjects.Text>();

        /* Create Section */
        let textCreateSection = this.add.text(this.frontConf.width/2 + 300, this.frontConf.height / 2, "Create a server");
        textCreateSection.setOrigin(0.5, 0.5);
        textCreateSection.setFontSize(25);

        var serverNameInput = this.add.sprite(this.frontConf.width/2 +300, this.frontConf.height/2 + 50, 'menuButton', 'edit-box');
        serverNameInput.setOrigin(0.5, 0.5);
        this.serverNameText = this.add.text(this.frontConf.width/2 +300, this.frontConf.height/2 + 50, "Enter server name");
        this.serverNameText.setOrigin(0.5, 0.5);
        this.serverNameText.setInteractive();
        this.serverNameText.setInteractive().on('pointerdown', () => {
            var editor = new TextEdit(this.serverNameText);
            editor.open(
            {
                onOpen: function (textObject) {},
                onTextChanged: function (textObject, text) {
                    (textObject as Phaser.GameObjects.Text).text = text;
                },
                onClose: function (textObject) {},
                selectAll: true,
            });
        });

        let buttonCreate = this.add.sprite(this.frontConf.width/2 + 300, this.frontConf.height/2+ 100, 'menuButton', 'button1');
        buttonCreate.setInteractive();
        buttonCreate.on('clicked', (button : Physics.Arcade.Sprite) => {
            buttonCreate.setFrame("button1-clicked");
            this.createGame();
        });
        buttonCreate.on('pointerup', (button : Physics.Arcade.Sprite) => {
            buttonCreate.setFrame("button1");
        });

        let textCreate = this.add.text(this.frontConf.width/2 +300, this.frontConf.height/2 + 100, "Create Server");
        textCreate.setOrigin(0.5, 0.5);
        // Catch click and send it to corresponding game object
        this.input.on('gameobjectdown', (pointer, gameObject) => {gameObject.emit('clicked', gameObject)});
        this.input.on('gameobjectup', (pointer, gameObject) => {gameObject.emit('pointerup', gameObject)});
    }

    update() {

    }

    goToMainScene(data : object) {
        this.scene.start('MainScene',  data);
    }

    createGame() {
        if(this.pseudoText.text === null || this.pseudoText.text === "Enter pseudo") {
            this.pseudoText.setColor("red");
            return;
        } else {
            this.pseudoText.setColor("green");
        }
        if (this.serverNameText.text === null || this.serverNameText.text === "Enter server name") {
            this.serverNameText.setColor("red");
            return;
        } else {
            this.serverNameText.setColor("green");
        }
        console.log("Creating a new game " + this.serverNameText.text);
        var gameUuid = Phaser.Utils.String.UUID();
        this.webSocket.createNewServer(this.serverNameText.text, gameUuid)
        this.goToMainScene({ pseudo: this.pseudoText.text, gameUuid : gameUuid, gameOwner : true });
    }

    joinServer() {
        if(this.pseudoText.text === null || this.pseudoText.text === "Enter pseudo") {
            this.pseudoText.setColor("red");
            return;
        } else {
            this.pseudoText.setColor("green");
        }
        if(this.selectedServer === undefined) {
            this.textJoin.setColor("red");
            return;
        }
        this.goToMainScene({ pseudo: this.pseudoText.text, gameUuid : this.selectedServer, gameOwner : false });
    }

    loadServerList(serverList : Map<string, string>) {
        this.graphicServerList.forEach( (textElement : Phaser.GameObjects.Text) => { textElement.destroy()});
        this.graphicServerList = new Array<Phaser.GameObjects.Text>();
        this.serverList = serverList;
        let i = 15;
        this.serverList.forEach( ( value : string, key : string) => {
            let textServer = this.add.text(this.frontConf.width/2 - 300, this.frontConf.height/2 + 35 + i , key);
            textServer.setOrigin(0.5, 0.5);
            textServer.setInteractive();

            textServer.on('clicked', (button : Physics.Arcade.Sprite) => {
                this.graphicServerList.forEach( (textElement : Phaser.GameObjects.Text) => { textElement.setColor("white");});
                textServer.setColor("red");
                this.selectedServer = this.serverList.get(textServer.text);
            });
            this.graphicServerList.push(textServer);
            i += this.frontConf.height/30;
        });
    }
  }
