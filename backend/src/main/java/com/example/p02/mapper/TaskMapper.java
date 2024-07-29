package com.example.p02.mapper;

import com.example.p02.dto.TaskDTO;
import com.example.p02.dto.ActivityDTO;
import com.example.p02.model.Task;
import com.example.p02.model.Activity;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    @Mapping(target = "taskId", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "completed", ignore = true)
    @Mapping(target = "activities", source = "activities") 
    Task toTask(TaskDTO taskDTO);

    TaskDTO toTaskDTO(Task task);

    @Mapping(target = "task", ignore = true)
    @Mapping(target = "activityId", ignore = true)
    Activity toActivity(ActivityDTO activityDTO);

    List<Activity> toActivityList(List<ActivityDTO> activityDTOs);

    @AfterMapping
    default void initializeActivities(@MappingTarget Task task) {
        if (task.getActivities() == null) {
            task.setActivities(new ArrayList<>());
        }
        task.getActivities().forEach(activity -> activity.setTask(task)); // Set the task for each activity
    }
}
