package com.example.p02.service;

import java.util.List;
import java.util.Optional;
import com.example.p02.model.User;

public interface UserService {

    public List<User> getUsers();

    public Optional<User> getUser(Long id);
    
    public void deleteUser(Long id);

    public void saveUser(User user);

    public User findByUsername(String username);

    public Long findIdByUsername(String username);

    public List<String> getUsernames();

    public boolean checkPasswd(User user, String rawPassword);

    public User findByEmail(String email);

    public void updateUser(Long id, User newData);
}
