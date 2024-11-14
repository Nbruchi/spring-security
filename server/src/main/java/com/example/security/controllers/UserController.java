package com.example.security.controllers;

import com.example.security.models.UserData;
import com.example.security.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserData> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UserData currentUser = (UserData) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    @GetMapping
    public ResponseEntity<List<UserData>> allUsers() {
        List <UserData> users = userService.allUsers();

        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Optional<UserData>> updateUser(@RequestBody UserData user, @PathVariable("id") Integer id){
        return ResponseEntity.ok(userService.updateUser(user,id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id){
        return ResponseEntity.ok(userService.deleteUser(id));
    }

    @GetMapping("/{username}")
    public ResponseEntity<Optional<UserData>> getUser(@PathVariable String username){
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }
}