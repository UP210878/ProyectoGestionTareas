package com.example.p02.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.p02.dto.TaskDTO;
import com.example.p02.exception.ExceptionResourceNotFound;
import com.example.p02.mapper.TaskMapper;
import com.example.p02.model.Task;
import com.example.p02.service.TaskService;


@Tag(name = "Endpoint Tasks", description = "CRUD Tareas")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;
    private final TaskMapper taskMapper;

    public TaskController(@Autowired TaskService taskService, TaskMapper taskMapper){
        this.taskService = taskService;
        this.taskMapper = taskMapper;
    }

    @PostMapping("/postTask/{id}")
    public ResponseEntity<Task> postTask(@RequestBody TaskDTO taskDTO, @PathVariable Long id) throws ExceptionResourceNotFound{
        Task task = taskMapper.toTask(taskDTO);
        taskService.saveTask(task, id);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/deleteTask/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) throws ExceptionResourceNotFound {
        Optional<Task> task = taskService.getTaskById(id);
        if (task.isPresent()) {
            taskService.deleteTask(id);
            return ResponseEntity.status(200).body("Succesfully deleted category");
        } else {
            throw new ExceptionResourceNotFound("Task ID doesn't exist");
        }
    }
    
}