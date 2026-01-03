package com.mentorios.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CreateExamRequest {
    @NotNull
    private Long courseId;

    @NotBlank
    private String name;

    @NotNull
    private LocalDateTime examDate;

    private BigDecimal weight;
    private String scope;
    private String location;
}
