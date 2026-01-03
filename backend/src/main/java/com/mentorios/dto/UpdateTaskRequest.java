package com.mentorios.dto;

import com.mentorios.model.Task;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateTaskRequest {
    private String title;
    private String description;
    private Task.TaskType type;
    private Task.Priority priority;
    private Task.TaskStatus status;
    private LocalDateTime dueDate;
    private Integer estimateMinutes;
    private Integer actualMinutes;
    private String[] tags;
    private Long relatedCourseId;
    private Long relatedApplicationId;
}
