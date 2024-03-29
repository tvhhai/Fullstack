package com.example.server.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String access_token;
    private String refresh_token;
    private String expires_in;
    private Integer id;
    private String username;
    private String email;
    private List<String> roles;

    public JwtResponse(String access_token, String refresh_token, Integer id, String username, String email, List<String> roles) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
}
