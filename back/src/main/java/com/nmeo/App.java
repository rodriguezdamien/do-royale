package com.nmeo;

import io.javalin.Javalin;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.nmeo.handlers.SocketHandler;
import com.nmeo.services.BroadcastService;
import com.nmeo.services.GameService;

public class App {
    private static final Logger logger = LogManager.getLogger(App.class.getName());
    public static void main(String[] args) {
        logger.info("Starting the app");
        GameService gameService = new GameService();
        BroadcastService broadcastService = new BroadcastService();

        int port = System.getenv("SERVER_PORT") != null? Integer.parseInt(System.getenv("SERVER_PORT")) : 8080;
        Javalin.create().ws("/game", ws -> {
            ws.onConnect(ctx -> {
                SocketHandler.handleNewConnection(ctx, broadcastService);
            });
            ws.onMessage(ctx -> {
                SocketHandler.handleNewMessage(ctx, gameService, broadcastService);
            });
            ws.onClose(ctx -> {
                SocketHandler.handleCloseConnection(ctx, broadcastService);
                logger.debug("onClose");
                ctx.send("onClose");
            });
        }).start(port);
    }
}