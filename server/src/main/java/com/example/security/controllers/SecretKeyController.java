package com.example.security.controllers;

import com.example.security.models.SecretKeyResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/config")
public class SecretKeyController {
    @Value("${security.jwt.secret-key}")
    private String secretKey;
    @Value("${security.jwt.expiration-time}")
    private String expiryTime;

    @GetMapping("/secret-key")
    public SecretKeyResponse getScretKey(){
        return new SecretKeyResponse(secretKey,expiryTime);
    }
}
