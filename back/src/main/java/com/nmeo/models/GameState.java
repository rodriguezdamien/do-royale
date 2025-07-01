package com.nmeo.models;

import java.util.Set;
import java.util.Optional;

public class GameState {
    private Set<Player> players;
    private GameStatus gameStatus;
    private Optional<String> winnerName;

    public GameState(Set<Player> players, GameStatus gameStatus, String winnerName) {
        this.players = players;
        this.gameStatus = gameStatus;
        this.winnerName = Optional.ofNullable(winnerName);
    }


}
