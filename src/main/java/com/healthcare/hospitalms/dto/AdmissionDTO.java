package com.healthcare.hospitalms.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AdmissionDTO {
    private Integer admissionId;
    private Integer patientId;
    private Integer doctorId;
    private Integer roomId;
    private LocalDate admissionDate;
    private LocalDate dischargeDate;
    private String admissionReason;
    private String status;
}
