package com.mentorios.dto;

import com.mentorios.model.Exam;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExamDTO {
    private Long id;
    private Long courseId;
    private String courseName;
    private String name;
    private LocalDateTime examDate;
    private BigDecimal weight;
    private String scope;
    private Exam.ExamStatus status;
    private BigDecimal grade;
    private String notes;
    private String location;
    private Long daysUntil;  // Calculated field
    private LocalDateTime createdAt;

    public static ExamDTO fromEntity(Exam exam) {
        long daysUntil = java.time.temporal.ChronoUnit.DAYS.between(
                LocalDateTime.now(), exam.getExamDate());

        return ExamDTO.builder()
                .id(exam.getId())
                .courseId(exam.getCourse().getId())
                .courseName(exam.getCourse().getName())
                .name(exam.getName())
                .examDate(exam.getExamDate())
                .weight(exam.getWeight())
                .scope(exam.getScope())
                .status(exam.getStatus())
                .grade(exam.getGrade())
                .notes(exam.getNotes())
                .location(exam.getLocation())
                .daysUntil(daysUntil)
                .createdAt(exam.getCreatedAt())
                .build();
    }
}
