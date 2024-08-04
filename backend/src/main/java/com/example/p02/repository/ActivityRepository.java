package com.example.p02.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.p02.model.Activity;

public interface ActivityRepository extends JpaRepository<Activity,Long>{
    @Query(value = "SELECT * FROM activity WHERE assignedUser=?1",nativeQuery = true)
    List<Activity> findActivitiesByAssignedUser(Long id);
}
