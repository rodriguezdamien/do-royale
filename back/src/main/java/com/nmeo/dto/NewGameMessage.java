package com.nmeo.dto;

public class NewGameMessage {
    private String socketUuid;
    private int type;
    private String gameId;
    private String gameName;

    NewGameMessage(String socketUuid, int type, String gameId, String gameName){
        this.socketUuid = socketUuid;
        this.type = type;
        this.gameId = gameId;
        this.gameName = gameName;
    }
}
