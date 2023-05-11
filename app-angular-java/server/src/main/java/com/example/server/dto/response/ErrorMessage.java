package com.example.server.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorMessage {
    private int statusCode;
    private Date timestamp;
    private String message;
    private String description;

    public ErrorMessage(HttpStatus statusCode, Date timestamp, String message, String description) {
        this.statusCode = statusCode.value();
        this.timestamp = timestamp;
        this.message = message;
        this.description = description;
    }
}
