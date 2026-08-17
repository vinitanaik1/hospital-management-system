package com.healthcare.hospitalms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name="patients") @Data @NoArgsConstructor @AllArgsConstructor
public class Patient {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer patientId;
 @Column(nullable=false) private String patientName;
 private Integer age;
 private String gender;
 private String phoneNumber;
 private String address;
 private String bloodGroup;
 private String emergencyContact;
 private String medicalHistory;
}
