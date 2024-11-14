package com.example.security.services;

import com.example.security.models.LoginUserDto;
import com.example.security.models.RegisterUserDto;
import com.example.security.models.UserData;
import com.example.security.repos.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final TokenBlacklistService tokenBlacklistService;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            TokenBlacklistService tokenBlacklistService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    public UserData signup(RegisterUserDto input) {
        UserData user = new UserData(
                input.getFullName(),
                input.getEmail(),
                passwordEncoder.encode(input.getPassword())
        );

        return userRepository.save(user);
    }

    public UserData authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }

    public void signOut(String token){
        tokenBlacklistService.addToken(token);
    }
}