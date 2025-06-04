package com.nmeo.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WebSocketMessage {
    public MessageType type;
    public UUID socketUuid;
}
