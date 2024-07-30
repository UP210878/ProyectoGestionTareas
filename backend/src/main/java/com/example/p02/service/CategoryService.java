package com.example.p02.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.p02.model.Category;
import com.example.p02.repository.CategoryRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }
    
    public Optional<Category> getCategory(Long id){
        return categoryRepository.findById(id);
    }
    public void  delCategory(Long id){
        categoryRepository.deleteById(id);
    }
    public void saveCategory(Category category, Long id) {
        category.setUserId(id);
        categoryRepository.save(category);
    }

    public void updateCategory(Category newCategoryData, Long categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        Category categoryToUpdate = categoryOptional.get();
        categoryToUpdate.setCategoryName(newCategoryData.getCategoryName());
        categoryRepository.save(categoryToUpdate);
    }

    @Transactional(readOnly = true)
    public List<Category> getCatByUserId(Long id){
        return categoryRepository.findCatByUserId(id);
    }


}



