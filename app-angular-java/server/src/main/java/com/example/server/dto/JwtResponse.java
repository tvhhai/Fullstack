package com.example.server.dto;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Integer id;
    private String username;
    private String email;
    private String password;
    private List<String> roles;

    public JwtResponse(String token, Integer id, String username, String password, String email, List<String> roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
    }


}
