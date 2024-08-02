package com.example.p02.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.p02.model.Category;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT c FROM Category c LEFT JOIN c.tasks t LEFT JOIN t.activities WHERE c.userId = ?1")
    List<Category> findCatByUserId(Long id);

}

