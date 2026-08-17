package com.healthcare.hospitalms.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PrescriptionDTO {
    private Integer prescriptionId;
    private Integer patientId;
    private Integer doctorId;
    private Integer medicineId;
    private LocalDate prescriptionDate;
    private String dosage;
    private String frequency;
    private String duration;
    private String instructions;
}
