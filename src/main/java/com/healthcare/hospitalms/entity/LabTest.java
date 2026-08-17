package com.healthcare.hospitalms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name="lab_tests") @Data @NoArgsConstructor @AllArgsConstructor
public class LabTest {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer labTestId;
 @ManyToOne(optional=false) @JoinColumn(name="patient_id") private Patient patient;
 @ManyToOne @JoinColumn(name="doctor_id") private Doctor doctor;
 private String testName;
 private LocalDate testDate;
 private String result;
 private String normalRange;
 private String status;
 private Double testCharge;
}
