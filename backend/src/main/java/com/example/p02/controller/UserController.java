package com.example.p02.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.p02.model.User;
import com.example.p02.service.UserService;

import jakarta.validation.Valid;

@Controller
public class UserController {
    private final UserService userService;

    public UserController(@Autowired UserService userService) {
    this.userService = userService;
  }

    @PostMapping("/register") 
  public String guardar(@Valid User user, BindingResult br, Model model) {
    if (br.hasErrors()) {
      model.addAttribute("titulo", "Formulario de cliente");
      return "register";
    } // redirige a la pagina /listar guardando los cambios con 'redirect:'
    userService.guardar(user);
    return "redirect:listado";
  }

}
