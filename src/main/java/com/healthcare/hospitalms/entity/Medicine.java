package com.healthcare.hospitalms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name="medicines") @Data @NoArgsConstructor @AllArgsConstructor
public class Medicine {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer medicineId;
 @Column(nullable=false) private String medicineName;
 private String category;
 private String manufacturer;
 private Integer quantity;
 private Double unitPrice;
 private LocalDate expiryDate;
}
