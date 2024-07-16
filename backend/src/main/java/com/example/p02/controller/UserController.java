package com.example.p02.controller;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.validation.BindingResult;
// import jakarta.validation.Valid;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.example.p02.model.User;
import com.example.p02.service.UserService;
import com.example.p02.util.JwtUtil;

@Tag(name = "Endpoint Users", description = "Users Log In y Registro")
@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    public UserController(@Autowired UserService userService) {
    this.userService = userService;
  };

  @PostMapping("/register") 
  public String registerUser(@RequestBody User user) {
    userService.saveUser(user);
    return "User Registered";
  };

  @PostMapping("/login")
  public ResponseEntity<String> loginUser(@RequestBody User user){
    User existingUser = userService.findByEmail(user.getEmail());
    if (existingUser != null && userService.checkPasswd(existingUser, user.getPassword())) {
      String token = JwtUtil.generateToken(existingUser.getUserId());
      return ResponseEntity.ok().body("{\"token\":\"" + token + "\"}");
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid information");
  }
  };


}
