package com.healthcare.hospitalms.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class LabTestDTO {
    private Integer labTestId;
    private Integer patientId;
    private Integer doctorId;
    private String testName;
    private LocalDate testDate;
    private String result;
    private String normalRange;
    private String status;
    private Double testCharge;
}
