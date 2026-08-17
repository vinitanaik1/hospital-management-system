package com.healthcare.hospitalms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name="doctors") @Data @NoArgsConstructor @AllArgsConstructor
public class Doctor {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer doctorId;
 @Column(nullable=false) private String doctorName;
 private String specialization;
 private String qualification;
 private String phoneNumber;
 private String email;
 @ManyToOne @JoinColumn(name="department_id") private Department department;
}
