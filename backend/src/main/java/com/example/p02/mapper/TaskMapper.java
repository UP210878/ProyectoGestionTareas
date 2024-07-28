package com.example.p02.mapper;

import com.example.p02.dto.TaskDTO;
import com.example.p02.model.Task;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import java.util.ArrayList;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    @Mapping(target = "taskId", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "activities", ignore = true)
    Task toTask(TaskDTO taskDTO);

    TaskDTO toTaskDTO(Task task);

    @AfterMapping
    default void initializeActivities(@MappingTarget Task task) {
        if (task.getActivities() == null) {
            task.setActivities(new ArrayList<>());
        }
    }
}


