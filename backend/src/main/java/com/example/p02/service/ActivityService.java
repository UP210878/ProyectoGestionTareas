package com.example.p02.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.p02.repository.ActivityRepository;
import java.util.Optional;
import java.util.List;
import com.example.p02.model.Activity;

@Service
public class ActivityService {
    private final ActivityRepository activityRepository;
    
    @Autowired
    public ActivityService(ActivityRepository activityRepository){
        this.activityRepository = activityRepository;
    }
    
    public List<Activity> getAllActivities(){
        return activityRepository.findAll();
    }

    public Optional<Activity> getActivity(Long id){
        return activityRepository.findById(id);
    }

    public void setStatus(Boolean status, Long id){
        Optional<Activity> activity = activityRepository.findById(id);
        Activity activityToUpdate = activity.get();
        activityToUpdate.setCompleted(status);
        activityRepository.save(activityToUpdate);
    }

    public void deleteActivity(Long id){
        activityRepository.deleteById(id);
    }
}
