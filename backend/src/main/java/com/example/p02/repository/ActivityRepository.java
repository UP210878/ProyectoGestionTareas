package com.example.p02.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.p02.model.Activity;

public interface ActivityRepository extends JpaRepository<Activity,Long>{
}
