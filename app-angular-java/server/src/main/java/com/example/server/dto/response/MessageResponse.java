package com.example.server.dto.response;

import lombok.*;
import org.springframework.http.HttpStatus;


@Getter
@Setter
@NoArgsConstructor
public class MessageResponse<T> {
    private Integer statusCode;
    private String message;
    private T data;

    public MessageResponse(HttpStatus statusCode, String message, T data) {
        this.statusCode = statusCode.value();
        this.message = message;
        this.data = data;
    }
}
