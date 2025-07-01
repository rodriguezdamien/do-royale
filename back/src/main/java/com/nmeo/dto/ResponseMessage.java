package com.nmeo.dto;

public class ResponseMessage {
    private String status;
    private String errorMessage;

    ResponseMessage(String status, String errorMessage){
        this.status = status;
        this.errorMessage = errorMessage;
    }

    public String getStatus() {
        return status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
