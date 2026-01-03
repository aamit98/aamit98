package com.mentorios.dto;

import com.mentorios.model.CalendarBlock;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateCalendarBlockRequest {
    @NotNull
    private LocalDateTime startTime;

    @NotNull
    private LocalDateTime endTime;

    @NotBlank
    private String label;

    @NotNull
    private CalendarBlock.BlockCategory category;

    private Long taskId;
}
