package com.example.security.models;

public class SecretKeyResponse {
    private String secretKey;
    private String expiryTime;

    public SecretKeyResponse(String secretKey, String expiryTime) {
        this.secretKey = secretKey;
        this.expiryTime = expiryTime;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public String getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(String expiryTime) {
        this.expiryTime = expiryTime;
    }
}

