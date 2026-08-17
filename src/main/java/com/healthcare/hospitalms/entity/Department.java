package com.healthcare.hospitalms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name="departments") @Data @NoArgsConstructor @AllArgsConstructor
public class Department {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer departmentId;
 @Column(nullable=false) private String departmentName;
 private String location;
 private String description;
}
