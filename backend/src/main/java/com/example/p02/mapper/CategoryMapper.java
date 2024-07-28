package com.example.p02.mapper;

import com.example.p02.dto.CategoryAddDTO;
import com.example.p02.dto.UserRegisterDTO;
import com.example.p02.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "categoryId", ignore = true)
    @Mapping(target = "tasks", ignore = true)
    Category toCategory(CategoryAddDTO categoryaddDTO);

    CategoryAddDTO toCategoryAddDTO(Category category);
}
