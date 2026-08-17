package com.healthcare.hospitalms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name="admissions") @Data @NoArgsConstructor @AllArgsConstructor
public class Admission {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer admissionId;
 @ManyToOne(optional=false) @JoinColumn(name="patient_id") private Patient patient;
 @ManyToOne(optional=false) @JoinColumn(name="doctor_id") private Doctor doctor;
 @ManyToOne(optional=false) @JoinColumn(name="room_id") private Room room;
 private LocalDate admissionDate;
 private LocalDate dischargeDate;
 private String admissionReason;
 private String status;
}
