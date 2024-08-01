package com.example.p02.service;

import java.util.Optional;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.p02.exception.ExceptionResourceNotFound;
import com.example.p02.model.Activity;
import com.example.p02.model.Category;
import com.example.p02.model.Task;
import com.example.p02.repository.CategoryRepository;
import com.example.p02.repository.TaskRepository;
import com.example.p02.repository.ActivityRepository;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;
    private final ActivityRepository activityRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, CategoryRepository categoryRepository, ActivityRepository activityRepository){
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
        this.activityRepository = activityRepository;
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
    
    public void  deleteTask(Long id){
        taskRepository.deleteById(id);
    }

    public void saveTask(Task task, Long id) throws ExceptionResourceNotFound{
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            task.setCategory(category);
            task.setCompleted(false);
            Task savedTask = taskRepository.save(task);
            
            if (task.getActivities() != null) {
                for (Activity activity : task.getActivities()){
                    activity.setTask(savedTask);
                    activity.setCompleted(false);
                    activityRepository.save(activity);
                }
            }
        } else {
            throw new ExceptionResourceNotFound("Category doesn't exist in which to save the task");
        }
    }

public void updateTask(Task newTaskData, Long taskId) throws ExceptionResourceNotFound {
    Optional<Task> taskOptional = taskRepository.findById(taskId);
    if (taskOptional.isPresent()) {
        Task taskToUpdate = taskOptional.get();
        taskToUpdate.setTaskName(newTaskData.getTaskName());
        taskToUpdate.setDueDate(newTaskData.getDueDate());

        // Para Actividades
        if (newTaskData.getActivities() != null) {
            // Ver las actividades existentes
            Map<Long, Activity> existingActivities = taskToUpdate.getActivities().stream()
                    .collect(Collectors.toMap(Activity::getActivityId, activity -> activity));

            // Actualizar/Crear Actividades
            for (Activity newActivity : newTaskData.getActivities()) {
                if (newActivity.getActivityId() == null) {
                    // Actividad Nueva
                    newActivity.setTask(taskToUpdate);
                    newActivity.setCompleted(false);
                    taskToUpdate.getActivities().add(newActivity);
                } else {
                    // Actividad Existente
                    Activity existingActivity = existingActivities.get(newActivity.getActivityId());
                    if (existingActivity != null) {
                        existingActivity.setActivityName(newActivity.getActivityName());
                        existingActivity.setCompleted(newActivity.getCompleted());
                        existingActivity.setAssignedUser(newActivity.getAssignedUser());
                        existingActivities.remove(newActivity.getActivityId());
                    } else {
                        newActivity.setTask(taskToUpdate);
                        newActivity.setCompleted(false);
                        taskToUpdate.getActivities().add(newActivity);
                    }
                }
            }

            // Para Remover Actividades
            for (Activity remainingActivity : existingActivities.values()) {
                taskToUpdate.getActivities().remove(remainingActivity);
                activityRepository.delete(remainingActivity);
            }
        }

        taskRepository.save(taskToUpdate);
    } else {
        throw new ExceptionResourceNotFound("Task not found");
    }
}

    public void setStatus(Boolean status, Long id){
        Optional<Task> task = taskRepository.findById(id);
        Task taskToUpdate = task.get();
        taskToUpdate.setCompleted(status);
        taskRepository.save(taskToUpdate);
    }

        
    
}
