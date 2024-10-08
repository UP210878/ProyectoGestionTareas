package com.example.p02.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.validation.BindingResult;
// import jakarta.validation.Valid;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.p02.dto.UserLoginDTO;
import com.example.p02.dto.UserRegisterDTO;
import com.example.p02.exception.ExceptionResourceNotFound;
import com.example.p02.mapper.UserMapper;
import com.example.p02.model.User;
import com.example.p02.service.UserService;
import com.example.p02.util.JwtUtil;
import java.util.Optional;

@Tag(name = "Endpoint Users", description = "Todo lo referente a usuarios.")
@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(@Autowired UserService userService, UserMapper userMapper) {
    this.userService = userService;
    this.userMapper = userMapper;
  };

  @PostMapping("/register") 
  public ResponseEntity<String> registerUser(@RequestBody UserRegisterDTO userRegisterDTO) {
    User existingMail = userService.findByEmail(userRegisterDTO.getEmail());
    User existingUser = userService.findByUsername(userRegisterDTO.getUsername());
    if (existingMail != null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email Already Exists");
    } else if (existingUser != null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username Already Exists");
    } else {
      User user = userMapper.toUser(userRegisterDTO);
      userService.saveUser(user);
      return ResponseEntity.status(HttpStatus.OK).body("User Registered");

    }
  };

  @PostMapping("/login")
  public ResponseEntity<String> loginUser(@RequestBody UserLoginDTO user){
    User existingUser = userService.findByEmail(user.getEmail());
    if (existingUser != null && userService.checkPasswd(existingUser, user.getPassword())) {
      String token = JwtUtil.generateToken(existingUser.getUserId());
      return ResponseEntity.status(HttpStatus.OK).body("{\"token\":\"" + token + "\"}");
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid information");
  }
  };

  @GetMapping({ "/getUsers" })
  public ResponseEntity<List<User>> getUsers() {
    return ResponseEntity.ok(userService.getUsers());
  }

  @GetMapping({ "/getUser/{id}" })
  public ResponseEntity<Optional<User>> getUser(@PathVariable Long id) throws ExceptionResourceNotFound {
    Optional<User> userOptional = userService.getUser(id);
    if (userOptional.isPresent()) {
      return ResponseEntity.ok(userService.getUser(id));
    } else {
      throw new ExceptionResourceNotFound("User " + id  + " not found within the database.");
    }
  }

  @GetMapping ({ "/getUsernames"})
  public ResponseEntity<List<String>> getUsernames(){
    return ResponseEntity.ok(userService.getUsernames());
  }

  @GetMapping({"/getUsername/{id}"})
  public ResponseEntity<String> getUsername(@PathVariable Long id) throws ExceptionResourceNotFound {
    Optional<User> userOptional = userService.getUser(id);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      return ResponseEntity.ok(user.getUsername());
    } else {
      throw new ExceptionResourceNotFound("User not found");
    }
  }

  @GetMapping({"/getUserIdByUsername/{username}"})
  public ResponseEntity<Long> getUserIdByUsername(@PathVariable String username) throws ExceptionResourceNotFound{
    Long userId = userService.findIdByUsername(username);
    if (userId!=null) {
      return ResponseEntity.ok(userService.findIdByUsername(username));
    } else {
      throw new ExceptionResourceNotFound("Username doesn't exist");
    }
  }

  @DeleteMapping("/delUser/{id}")
  public ResponseEntity<String> delUser(@PathVariable Long id) throws ExceptionResourceNotFound {
    Optional<User> userToDelete = userService.getUser(id);
    if (userToDelete.isPresent()) {
      userService.deleteUser(id);
      return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User " + id + " succesfully deleted");
    } else {
      throw new ExceptionResourceNotFound("User " + id  + " not found within the database. Unable to delete");
    }
  }

  @PutMapping("/updateUser/{id}")
  public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User data) throws ExceptionResourceNotFound {
    Optional<User> userToUpdate = userService.getUser(id);
    if (userToUpdate.isPresent()) {
      userService.updateUser(id,data );
      return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User " + id + " updated");
    } else {
      throw new ExceptionResourceNotFound("User " + id  + " not found within the database. Unable to update");
    }
  }

  @PostMapping("/validateToken")
  public ResponseEntity<Map<String, Long>> validateToken(@RequestBody Map<String, String> tokenMap) {
      String token = tokenMap.get("token");
      try {
          Long userId = JwtUtil.validateToken(token);
          Map<String, Long> response = new HashMap<>();
          response.put("userId", userId);
          return ResponseEntity.ok(response);
      } catch (Exception e) {
          return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
      }
  }
  
  

}
