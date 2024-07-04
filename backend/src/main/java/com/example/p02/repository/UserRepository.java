package com.example.p02.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.p02.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}