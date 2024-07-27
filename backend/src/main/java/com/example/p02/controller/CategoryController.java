package com.example.p02.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.example.p02.exception.ExceptionResourceNotFound;

import com.example.p02.util.JwtUtil;
import java.util.Optional;
import java.util.List;
import com.example.p02.exception.ExceptionResourceNotFound;
import com.example.p02.model.Category;
import com.example.p02.service.CategoryService;

@Tag(name = "Endpoint Categories", description = "CRUD Categorias")
@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(@Autowired CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping({"/getCategoryByUserId/{id}"})
    public ResponseEntity<List<Category>> getCategory(@PathVariable Long id) throws ExceptionResourceNotFound {
        List<Category> listCategory = categoryService.getCatByUserId(id);
        if (!listCategory.isEmpty()){
            return ResponseEntity.status(200).body(listCategory);
        } else {
            throw new ExceptionResourceNotFound("Categories asociated with user " + id  + " not found within the database.");
        }
    }
};
