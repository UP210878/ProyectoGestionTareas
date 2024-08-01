package com.example.p02.mapper;

import com.example.p02.dto.CategoryAddDTO;
import com.example.p02.dto.UserRegisterDTO;
import com.example.p02.model.Category;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import java.util.ArrayList;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "categoryId", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    Category toCategory(CategoryAddDTO categoryaddDTO);

    CategoryAddDTO toCategoryAddDTO(Category category);

    @AfterMapping
    default void initializeTasks(@MappingTarget Category category) {
        if (category.getTasks() == null) {
            category.setTasks(new ArrayList<>());
        }
    }
}