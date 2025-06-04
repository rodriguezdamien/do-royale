import MenuScene from "../scenes/menuScene";
import FrontConf from "../conf";
import { KeyWords, MessageType } from "./backEndWebSocket"

export default class ListGamesWebSocket {
    webSocket : WebSocket
    uuid : string
    menuScene : MenuScene

    constructor(menuScene : MenuScene) {
        this.menuScene = menuScene;
        let frontConf = new FrontConf();
        let url = "ws://" + frontConf.backEndIp + ":" + frontConf.backEndPort + "/game";
        this.webSocket = new WebSocket(url);
        this.uuid = Phaser.Utils.String.UUID();
        this.webSocket.onopen = (ev: Event) => {
            this.sendServerListRequest();
        };

        this.webSocket.onmessage = (ev: MessageEvent) =>  {
            let message = JSON.parse(ev.data);
            if(message[KeyWords.MESSAGE_TYPE] === MessageType.LIST_GAME) {
                let serverList =  new Map<string, string>();
                message["gamelist"].forEach( element => {
                    serverList.set(element[KeyWords.GAME_NAME], element[KeyWords.GAME_ID]);
                });
                this.menuScene.loadServerList(serverList);
            }
        }
    }

    connect() { }

    disconnect() {
        this.webSocket.close();
    }

    sendServerListRequest() {
        let message = {};
        message[KeyWords.SOCKET_UUID] = this.uuid;
        message[KeyWords.MESSAGE_TYPE] = MessageType.LIST_GAME;
        this.webSocket.send(JSON.stringify(message));
    }

    createNewServer(serverName : string, gameUuid : string) {
        let message = {};
        message[KeyWords.SOCKET_UUID] = this.uuid;
        message[KeyWords.MESSAGE_TYPE] = MessageType.NEW_GAME;
        message[KeyWords.GAME_ID] = gameUuid;
        message[KeyWords.GAME_NAME] = serverName;
        this.webSocket.send(JSON.stringify(message));
    }

}