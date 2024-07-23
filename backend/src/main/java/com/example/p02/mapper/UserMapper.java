package com.example.p02.mapper;

import com.example.p02.dto.UserRegisterDTO;
import com.example.p02.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "created_at", ignore = true)
    @Mapping(target = "updated_at", ignore = true)
    User toUser(UserRegisterDTO userRegisterDTO);

    UserRegisterDTO toUserRegisterDTO(User user);
}
