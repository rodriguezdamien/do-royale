package com.nmeo.game;

import java.util.ArrayList;
import java.util.UUID;

public interface IGameManager {
    public void createGame(UUID gameUUID, String gameName);
    public GameState createPlayer(UUID playerUUID, Player player); // guess playerUUID? maybe it's socketUUID
    public GameState playerUpdate(UUID playerUUID, Player player); 
    public GameState destroyPlayer(UUID playerUUID, Player player);
    public void createBullet(UUID playerUUID, Bullet bullet);
    public void destroyBullet(UUID playerUUID, Bullet bullet);
    public GameState setGameState(UUID playerUUID, GameStatus gameStatus);
    public ArrayList<Game> getGameList();
    //abstract GameSession getGameFromId(UUID gameUUID);
}
