package com.example.p02.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
// import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.TemporalType;
// import jakarta.persistence.Temporal;
// import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import jakarta.persistence.Temporal;
import java.time.LocalDate;

@Data
@Entity
@Table (name = "user")
public class User {
    @Id
    @Column(name="userId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotEmpty
    @Column(name="username")
    private String username;
    
    @NotEmpty
    @Column(name="password")
    private String password;

    @NotEmpty
    @Column(name="email")
    @Pattern(regexp = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$", message = "Not valid")
    private String email;

    @Column(name="created_at")
    @Temporal(TemporalType.DATE)
    private LocalDate created_at;

    @Column(name="updated_at")
    @Temporal(TemporalType.DATE)
    private LocalDate updated_at;
}
