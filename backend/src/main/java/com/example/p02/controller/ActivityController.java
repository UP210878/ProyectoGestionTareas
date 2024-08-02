package com.example.p02.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.p02.exception.ExceptionResourceNotFound;
import com.example.p02.model.Activity;
import com.example.p02.model.User;
import com.example.p02.service.ActivityService;
import com.example.p02.service.UserService;


@Tag(name = "Endpoint Activities", description = "Actividades, funciones miscelaneas")
@RestController
@RequestMapping("/api/activities")
public class ActivityController {
    private final ActivityService activityService;
    private final UserService userService;

    public ActivityController(@Autowired ActivityService activityService, UserService userService){
        this.activityService = activityService;
        this.userService = userService;
    }

    @PutMapping("/updateStatusActivity/{activityId}")
    public ResponseEntity<String> postTask(@RequestBody Boolean isComplete, @PathVariable Long activityId) throws ExceptionResourceNotFound{
        Optional<Activity> activityOptional = activityService.getActivity(activityId);
        if (activityOptional.isPresent()) {
            activityService.setStatus(!isComplete, activityId);
            return ResponseEntity.ok("succesfully updated");
        } else {
            throw new ExceptionResourceNotFound("La id de la actividad no existe.");
        }
    }

    @GetMapping("/getActivitiesByUser/{userId}")
    public ResponseEntity<List<Activity>> getActivitiesByAssignedUser(@PathVariable Long userId) throws ExceptionResourceNotFound{
        Optional<User> userOptional = userService.getUser(userId);
        if (userOptional.isPresent()) {
            List<Activity> activities = activityService.getActivitiesByUser(userId);
            return ResponseEntity.ok(activities);
        } else {
            throw new ExceptionResourceNotFound("User Id Not found");
        }
    }

    
}
