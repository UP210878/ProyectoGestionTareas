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
import org.springframework.web.bind.annotation.RestController;

import com.example.p02.dto.CategoryAddDTO;
import com.example.p02.exception.ExceptionResourceNotFound;
import com.example.p02.mapper.CategoryMapper;
import java.util.Optional;
import java.util.List;
import com.example.p02.model.Category;
import com.example.p02.service.CategoryService;

@Tag(name = "Endpoint Categories", description = "CRUD Categorias")
@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    public CategoryController(@Autowired CategoryService categoryService, CategoryMapper categoryMapper) {
        this.categoryService = categoryService;
        this.categoryMapper = categoryMapper;
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

    @PostMapping("/postCategory/{id}")
    public ResponseEntity<Category> postCategory(@RequestBody CategoryAddDTO categoryDTO, @PathVariable Long id) {
        Category category = categoryMapper.toCategory(categoryDTO);
        categoryService.saveCategory(category, id);
        return ResponseEntity.status(200).body(category);
    }

    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) throws ExceptionResourceNotFound {
        Optional<Category> category = categoryService.getCategory(id);
        if (category.isPresent()) {
            categoryService.delCategory(id);
            return ResponseEntity.status(200).body("Succesfully deleted category");
        } else {
            throw new ExceptionResourceNotFound("Category Id doesn't exist");
        }
    }

    @PutMapping("/updateCategory/{categoryId}")
    public ResponseEntity<Category> updateCategory(@RequestBody CategoryAddDTO categoryDTO, @PathVariable Long categoryId) throws ExceptionResourceNotFound{
        Category category = categoryMapper.toCategory(categoryDTO);
        Optional<Category> oldCategory = categoryService.getCategory(categoryId);
        if (oldCategory.isPresent()) {
            categoryService.updateCategory(category, categoryId);
            return ResponseEntity.ok(category);
        } else {
            throw new ExceptionResourceNotFound("Category to update doesn't exist");
        }
    }
};
