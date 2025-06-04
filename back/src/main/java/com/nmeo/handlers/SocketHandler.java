package com.nmeo.handlers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.nmeo.dto.WebSocketMessage;
import com.nmeo.services.BroadcastService;
import com.nmeo.services.GameService;

import io.javalin.websocket.WsCloseContext;
import io.javalin.websocket.WsConnectContext;
import io.javalin.websocket.WsMessageContext;

public class SocketHandler {

    private static final Logger logger = LogManager.getLogger(SocketHandler.class.getName());

    public static void handleNewConnection(WsConnectContext ctx, BroadcastService broadcastService) {
        logger.info("A new connection has been established");
    }

    public static void handleCloseConnection(WsCloseContext ctx, BroadcastService broadcastService) {
        logger.info("Web socket closed");
    }

    public static void handleNewMessage(WsMessageContext ctx, GameService gameService, BroadcastService broadcastService) {
        WebSocketMessage newMessage = ctx.message(WebSocketMessage.class);
        logger.info("handleNewMessage");
        switch(newMessage.type) {
            case NEW_PLAYER:
                break;
            case NEW_GAME:
                break;
            case LIST_GAME:
                break;
            case PLAYER_MOVED:
                break;
            case PLAYER_DESTROY:
                break;
            case NEW_BULLET:
                break;
            case BULLET_DESTROY:
                break;
            case GAME_STATE:
                break;
            default:
                logger.error("Unsupported message type");
                break;
        }
    }
}
