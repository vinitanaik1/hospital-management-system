package com.healthcare.hospitalms.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class DoctorDTO {
    private Integer doctorId;
    private String doctorName;
    private String specialization;
    private String qualification;
    private String phoneNumber;
    private String email;
    private Integer departmentId;
}
