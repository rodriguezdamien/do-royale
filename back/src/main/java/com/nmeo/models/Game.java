package com.nmeo.models;

import java.util.UUID;

public class Game {
    private UUID uuid;
    private String name;

    public Game(String name) {
        this.uuid = UUID.randomUUID();
        this.name = name;
    }
}
