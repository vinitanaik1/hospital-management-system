package com.healthcare.hospitalms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name="treatments") @Data @NoArgsConstructor @AllArgsConstructor
public class Treatment {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer treatmentId;
 @ManyToOne(optional=false) @JoinColumn(name="patient_id") private Patient patient;
 @ManyToOne(optional=false) @JoinColumn(name="doctor_id") private Doctor doctor;
 @ManyToOne @JoinColumn(name="appointment_id") private Appointment appointment;
 private LocalDate treatmentDate;
 private String diagnosis;
 @Column(length=2000) private String treatmentDetails;
 private String followUpDate;
}
