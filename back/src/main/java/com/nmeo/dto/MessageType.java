package com.nmeo.dto;

public enum MessageType {
	IDLE(0),
    NEW_PLAYER (1),
    PLAYER_MOVED(2),
    GAME_STATE (3),
    PLAYER_DESTROY(4),
    NEW_BULLET(5),
    BULLET_DESTROY(6),
    NEW_GAME(7),
	LIST_GAME(8);

	public final Integer type;
	private MessageType(Integer p_type) {
		this.type = p_type;
	}
};