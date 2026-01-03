package com.mentorios.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateCourseRequest {
    @NotBlank
    private String name;
    private String code;
    private String semester;
    private Integer credits;
}
