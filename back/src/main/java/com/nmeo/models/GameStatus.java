package com.nmeo.models;

public enum GameStatus {
    IDLE(0),
    LOBBY(1),
    STARTING(2),
    PLAYING(3),
    FINISHED(4);

    private int value;

    GameStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

}
