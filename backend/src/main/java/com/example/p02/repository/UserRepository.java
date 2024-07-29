package com.example.p02.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.p02.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
        @Query(value = "SELECT * FROM user WHERE username = ?1", nativeQuery = true)
        User findByUsername(String username);

        @Query(value = "SELECT * FROM user WHERE email = ?1", nativeQuery = true)
        User findByEmail(String email);

        @Query(value = "SELECT userId FROM user WHERE username = ?1", nativeQuery = true)
        Long findIdByUsername(String username);
}