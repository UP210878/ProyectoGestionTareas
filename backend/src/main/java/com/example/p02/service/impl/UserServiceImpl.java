package com.example.p02.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.p02.dto.UserRegisterDTO;
import com.example.p02.model.User;
import org.modelmapper.ModelMapper;
import com.example.p02.repository.UserRepository;
import com.example.p02.service.UserService;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder; //Encryption for passwords
    private final ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository clienteRepository, BCryptPasswordEncoder bCryptPasswordEncoder, ModelMapper modelMapper) {
        this.userRepository = clienteRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.modelMapper = modelMapper;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
        }
    
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);  // Altas y Cambios
    }

    public void saveUserDTO(UserRegisterDTO userRegisterDTO) {
    User user = modelMapper.map(userRegisterDTO, User.class);
    saveUser(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean checkPasswd(User user, String rawPassword){
        return bCryptPasswordEncoder.matches(rawPassword, user.getPassword());
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void updateUser(Long id, User newData){
        Optional<User> userOptional = userRepository.findById(id);
        User userToUpdate = userOptional.get();
        userToUpdate.setUsername(newData.getUsername());
        userToUpdate.setEmail(newData.getEmail());
        if (newData.getPassword() != null && !newData.getPassword().isEmpty()) {
            userToUpdate.setPassword(bCryptPasswordEncoder.encode(newData.getPassword()));
        }
        userRepository.save(userToUpdate);
    }
}
