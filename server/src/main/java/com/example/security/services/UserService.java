package com.example.security.services;

import com.example.security.models.UserData;
import com.example.security.repos.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserData> allUsers() {
        return new ArrayList<>(userRepository.findAll());
    }

    public Optional<UserData> getUserByUsername(String username) {
        return userRepository.findByEmail(username);
    }

    public Optional<UserData> updateUser(UserData updatedUser, Integer id){
        return userRepository.findById(id).map(user -> {
            user.setEmail(updatedUser.getEmail());
            user.setUpdatedAt(new Date());
            user.setFullName(updatedUser.getFullName());
            user.setPassword(updatedUser.getPassword());

           return userRepository.save(user);
        });
    };

    public Void deleteUser(Integer id){
        userRepository.deleteById(id);
        return null;
    }
}