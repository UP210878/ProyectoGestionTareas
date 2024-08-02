package com.example.p02.controller;

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
import com.example.p02.service.ActivityService;

import java.util.List;


@Tag(name = "Endpoint Activities", description = "Actividades, funciones miscelaneas")
@RestController
@RequestMapping("/api/activities")
public class ActivityController {
    private final ActivityService activityService;

    public ActivityController(@Autowired ActivityService activityService){
        this.activityService = activityService;
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
    public ResponseEntity<List<Activity>> getActivByUser(@PathVariable Long userId) throws ExceptionResourceNotFound {
        List<Activity> activities = activityService.getActivityByUserId(userId);
        if (!activities.isEmpty()){
            return ResponseEntity.status(200).body(activities);
        } else {
            throw new ExceptionResourceNotFound("Activities associated with user " + userId  + " not found within the database.");
    }    }

}
