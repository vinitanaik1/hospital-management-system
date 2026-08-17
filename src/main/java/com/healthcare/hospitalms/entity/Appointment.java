package com.healthcare.hospitalms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name="appointments") @Data @NoArgsConstructor @AllArgsConstructor
public class Appointment {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer appointmentId;
 @ManyToOne(optional=false) @JoinColumn(name="patient_id") private Patient patient;
 @ManyToOne(optional=false) @JoinColumn(name="doctor_id") private Doctor doctor;
 private LocalDate appointmentDate;
 private String appointmentTime;
 private String reason;
 private String status;
}
