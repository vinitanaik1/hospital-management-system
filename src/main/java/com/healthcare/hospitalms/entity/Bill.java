package com.healthcare.hospitalms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name="bills") @Data @NoArgsConstructor @AllArgsConstructor
public class Bill {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer billId;
 @ManyToOne(optional=false) @JoinColumn(name="patient_id") private Patient patient;
 @ManyToOne @JoinColumn(name="admission_id") private Admission admission;
 private LocalDate billDate;
 private Double consultationCharge;
 private Double roomCharge;
 private Double medicineCharge;
 private Double labCharge;
 private Double otherCharge;
 private Double totalAmount;
 private String paymentStatus;
}
