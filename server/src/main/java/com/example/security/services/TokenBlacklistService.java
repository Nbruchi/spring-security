package com.example.security.services;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class TokenBlacklistService {
    private final Set<String> blackList = new HashSet<>();
    public void addToken(String token){
        blackList.add(token);
    }

    public boolean isBlackListed(String token){
        return blackList.contains(token);
    }
}
