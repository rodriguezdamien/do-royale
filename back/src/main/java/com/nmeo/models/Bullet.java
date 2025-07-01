package com.nmeo.models;

import java.util.UUID;

public class Bullet implements Comparable<Bullet> {

    private UUID uuid;
    private int startX;
    private int toX;
    private int toY;

    public Bullet(int startX, int toX, int toY) {
        this.uuid = UUID.randomUUID();
        this.startX = startX;
        this.toX = toX;
        this.toY = toY;
    }

    @Override
    public int compareTo(Bullet other) {
        return this.uuid.compareTo(other.uuid);
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;

        Bullet bullet = (Bullet) other;
        return this.uuid != null && this.uuid.equals(bullet.uuid);
    }

    @Override
    public int hashCode() {
        return this.uuid != null ? uuid.hashCode() : 0;
    }
}
