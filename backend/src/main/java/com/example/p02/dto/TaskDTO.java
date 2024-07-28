package com.example.p02.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Task DTO model for saving tasks")
public class TaskDTO {
    private Long taskId;

    private String taskName;

    private Date dueDate;

    private Boolean completed;
}
