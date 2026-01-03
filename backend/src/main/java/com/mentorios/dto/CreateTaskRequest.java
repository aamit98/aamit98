package com.mentorios.dto;

import com.mentorios.model.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateTaskRequest {
    @NotBlank
    private String title;

    private String description;

    @NotNull
    private Task.TaskType type;

    private Task.Priority priority = Task.Priority.MEDIUM;

    private Task.TaskStatus status = Task.TaskStatus.TODO;

    private LocalDateTime dueDate;

    private Integer estimateMinutes;

    private String[] tags;

    private Long relatedCourseId;

    private Long relatedApplicationId;
}
