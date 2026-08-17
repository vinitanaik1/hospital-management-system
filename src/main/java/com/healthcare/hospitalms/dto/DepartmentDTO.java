package com.healthcare.hospitalms.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class DepartmentDTO {
    private Integer departmentId;
    private String departmentName;
    private String location;
    private String description;
}
