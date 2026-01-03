package com.mentorios.dto;

import com.mentorios.model.CalendarBlock;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalendarBlockDTO {
    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String label;
    private CalendarBlock.BlockCategory category;
    private Long taskId;
    private LocalDateTime createdAt;

    public static CalendarBlockDTO fromEntity(CalendarBlock block) {
        return CalendarBlockDTO.builder()
                .id(block.getId())
                .startTime(block.getStartTime())
                .endTime(block.getEndTime())
                .label(block.getLabel())
                .category(block.getCategory())
                .taskId(block.getTask() != null ? block.getTask().getId() : null)
                .createdAt(block.getCreatedAt())
                .build();
    }
}
