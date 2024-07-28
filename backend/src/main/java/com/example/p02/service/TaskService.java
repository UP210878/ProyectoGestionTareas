package com.example.p02.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.p02.exception.ExceptionResourceNotFound;
import com.example.p02.model.Category;
import com.example.p02.model.Task;
import com.example.p02.repository.CategoryRepository;
import com.example.p02.repository.TaskRepository;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, CategoryRepository categoryRepository){
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
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
            taskRepository.save(task);
        } else {
            throw new ExceptionResourceNotFound("Category doesn't exist in which to save the task");
        }
    }
    
}
