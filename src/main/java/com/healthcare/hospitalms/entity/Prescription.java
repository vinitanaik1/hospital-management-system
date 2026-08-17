package com.healthcare.hospitalms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name="prescriptions") @Data @NoArgsConstructor @AllArgsConstructor
public class Prescription {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer prescriptionId;
 @ManyToOne(optional=false) @JoinColumn(name="patient_id") private Patient patient;
 @ManyToOne(optional=false) @JoinColumn(name="doctor_id") private Doctor doctor;
 @ManyToOne(optional=false) @JoinColumn(name="medicine_id") private Medicine medicine;
 private LocalDate prescriptionDate;
 private String dosage;
 private String frequency;
 private String duration;
 @Column(length=1000) private String instructions;
}
