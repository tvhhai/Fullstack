package com.example.server.controller;

import com.example.server.entity.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerController {
    @GetMapping("/")
    public String home() {
        return "{}";
    }
}
