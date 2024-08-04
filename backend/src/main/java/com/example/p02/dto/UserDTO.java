package com.example.p02.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Builder
@AllArgsConstructor
@Schema(description = "General DTO model")
public class UserDTO {
    private Long userId;

    private String username;
  
    private String password;
    
    private String email;

    @JsonFormat(pattern = "yyyy-MM-dd") 
    private LocalDate created_at;
  
    @JsonFormat(pattern = "yyyy-MM-dd") 
    private LocalDate updated_at;
}
