package com.healthcare.hospitalms.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PatientDTO {
    private Integer patientId;
    private String patientName;
    private Integer age;
    private String gender;
    private String phoneNumber;
    private String address;
    private String bloodGroup;
    private String emergencyContact;
    private String medicalHistory;
}
