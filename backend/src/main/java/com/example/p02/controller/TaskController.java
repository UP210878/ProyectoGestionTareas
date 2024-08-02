package com.example.p02.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PostMapping("/postTask/{categoryId}")
    public ResponseEntity<Task> postTask(@RequestBody TaskDTO taskDTO, @PathVariable Long categoryId) throws ExceptionResourceNotFound{
        Task task = taskMapper.toTask(taskDTO);
        taskService.saveTask(task, categoryId);
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

    @PutMapping("/updateTask/{taskId}")
    public ResponseEntity<Task> updateTask(@RequestBody TaskDTO taskDTO,@PathVariable Long taskId) throws ExceptionResourceNotFound {
        Task task = taskMapper.toTask(taskDTO);
        Optional<Task> oldTask = taskService.getTaskById(taskId);
        if (oldTask.isPresent()) {
            taskService.updateTask(task, taskId);
            return ResponseEntity.ok(task);
        } else {
            throw new ExceptionResourceNotFound("Task Id not found");
        }
    }


    @PutMapping("/updateStatus/{taskId}")
    public ResponseEntity<String> postTask(@RequestBody Boolean isComplete, @PathVariable Long taskId) throws ExceptionResourceNotFound{
        Optional<Task> taskOptional = taskService.getTaskById(taskId);
        if (taskOptional.isPresent()) {
            taskService.setStatus(!isComplete, taskId);
            return ResponseEntity.ok("succesfully updated");
        } else {
            throw new ExceptionResourceNotFound("La id de la actividad no existe.");
        }
    }
    
}
