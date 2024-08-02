package com.example.p02.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Activity DTO model for putting activities [DEPRECATED, HANDLE IN TASK DTO]")
public class ActivityDTO {
    private String activityName;

    private String assignedUser;

    private Boolean completed;
}
