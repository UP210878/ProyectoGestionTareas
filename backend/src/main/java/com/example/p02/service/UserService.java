package com.example.p02.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.p02.model.User;
import com.example.p02.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository clienteRepository) {
        this.userRepository = clienteRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);    }
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void saveUser(User user) {
        userRepository.save(user);  // Altas y Cambios
}

    
}
