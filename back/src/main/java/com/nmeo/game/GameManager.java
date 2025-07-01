package com.nmeo.game;

import java.util.HashMap;
import java.util.ArrayList;
import java.util.UUID;

import org.apache.commons.lang3.NotImplementedException;

import com.nmeo.models.*;

public class GameManager implements IGameManager {
    private HashMap<UUID, GameSession> games = new HashMap<UUID, GameSession>();

    public void createGame(UUID gameUUID, String gameName){

    }
    public GameState createPlayer(UUID playerUUID, Player player){
        throw new NotImplementedException("method not implemented yet");
    }
    public GameState playerUpdate(UUID playerUUID, Player player){
        throw new NotImplementedException("method not implemented yet");
    }
    public GameState destroyPlayer(UUID playerUUID, Player player){
        throw new NotImplementedException("method not implemented yet");
    }
    public void createBullet(UUID playerUUID, Bullet bullet){
        
    }
    public void destroyBullet(UUID playerUUID, Bullet bullet){

    }
    public ArrayList<Game> getGameList(){
        throw new NotImplementedException("method not implemented yet");
    }

    private GameSession getGameFromId(UUID gameUUID){
        throw new NotImplementedException("method not implemented yet");
    }

    public GameState setGameState(UUID pSocketUUID, GameStatus pStatus){
        throw new NotImplementedException("bleh");
    }
}
