package com.mentorios.dto;

import com.mentorios.model.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private Long id;
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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static TaskDTO fromEntity(Task task) {
        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .type(task.getType())
                .priority(task.getPriority())
                .status(task.getStatus())
                .dueDate(task.getDueDate())
                .estimateMinutes(task.getEstimateMinutes())
                .actualMinutes(task.getActualMinutes())
                .tags(task.getTags())
                .relatedCourseId(task.getRelatedCourseId())
                .relatedApplicationId(task.getRelatedApplicationId())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}
