package com.example.p02.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.p02.model.Task;


public interface TaskRepository extends JpaRepository<Task, Long> {
}

