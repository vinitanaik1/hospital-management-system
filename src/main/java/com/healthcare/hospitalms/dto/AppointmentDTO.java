package com.healthcare.hospitalms.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AppointmentDTO {
    private Integer appointmentId;
    private Integer patientId;
    private Integer doctorId;
    private LocalDate appointmentDate;
    private String appointmentTime;
    private String reason;
    private String status;
}
