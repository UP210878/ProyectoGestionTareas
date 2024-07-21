package com.example.p02.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.p02.model.Category;
import com.example.p02.repository.CategoryRepository;;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }
    public List<Category> getCategory(){
        return categoryRepository.findAll();
    }    
    public void  eliminar (long id){
        categoryRepository.deleteById(id);
    }
    public void guardar(Category category) {
        categoryRepository.save(category);
    }


}



