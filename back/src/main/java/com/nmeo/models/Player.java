package com.nmeo.models;

import java.util.UUID;

public class Player implements Comparable<Player> {

    private UUID uuid;
    private String name;
    private int x;
    private int y;
    private int velocityX;
    private int velocityY;
    private int direction;
    private String atlas;
    private String frame;
    private int width;
    private int height;
    private boolean isAlive;

    public Player(String name, int x, int y, int velocityX, int velocityY, int direction, String atlas, String frame, int width, int height, boolean isAlive) {
        this.uuid = UUID.randomUUID();
        this.name = name;
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.direction = direction;
        this.atlas = atlas;
        this.frame = frame;
        this.width = width;
        this.height = height;
        this.isAlive = isAlive;
    }

    public Player(Player player) {
        this.uuid = player.uuid;
        this.name = player.name;
        this.x = player.x;
        this.y = player.y;
        this.velocityX = player.velocityX;
        this.velocityY = player.velocityY;
        this.direction = player.direction;
        this.atlas = player.atlas;
        this.frame = player.frame;
        this.width = player.width;
        this.height = player.height;
        this.isAlive = player.isAlive;
    }


    @Override
    public int compareTo(Player other) {
        return this.uuid.compareTo(other.uuid);
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;

        Player player = (Player) other;
        return this.uuid != null && this.uuid.equals(player.uuid);
    }

    @Override
    public int hashCode() {
        return this.uuid != null ? uuid.hashCode() : 0;
    }
}
