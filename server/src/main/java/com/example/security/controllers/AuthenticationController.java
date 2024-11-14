package com.example.security.controllers;

import com.example.security.models.LoginResponse;
import com.example.security.models.LoginUserDto;
import com.example.security.models.RegisterUserDto;
import com.example.security.models.UserData;
import com.example.security.services.AuthenticationService;
import com.example.security.services.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserData> register(@Valid @RequestBody RegisterUserDto registerUserDto) {
        UserData registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@Valid @RequestBody LoginUserDto loginUserDto) {
        UserData authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());


        return ResponseEntity.ok(loginResponse);
    }


    @PostMapping("/signout")
    public ResponseEntity<Void> signout(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7); // Assuming the token is prefixed with "Bearer "
        authenticationService.signOut(jwtToken);
        return ResponseEntity.noContent().build();
    }
}