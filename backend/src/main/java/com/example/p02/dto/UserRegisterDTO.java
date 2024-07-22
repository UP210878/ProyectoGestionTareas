package com.example.p02.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@Schema(description = "DTO para cuando el usuario manda solicitud de registro")
public class UserRegisterDTO {
    private String username;
    private String email;
    private String password;
}
