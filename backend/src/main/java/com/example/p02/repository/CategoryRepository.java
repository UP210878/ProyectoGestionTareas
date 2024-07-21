package com.example.p02.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.p02.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}

