package com.healthcare.hospitalms.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class TreatmentDTO {
    private Integer treatmentId;
    private Integer patientId;
    private Integer doctorId;
    private Integer appointmentId;
    private LocalDate treatmentDate;
    private String diagnosis;
    private String treatmentDetails;
    private String followUpDate;
}
