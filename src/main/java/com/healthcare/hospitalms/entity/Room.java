package com.healthcare.hospitalms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name="rooms") @Data @NoArgsConstructor @AllArgsConstructor
public class Room {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer roomId;
 @Column(nullable=false, unique=true) private String roomNumber;
 private String roomType;
 private String wardName;
 private String status;
 private Double dailyCharge;
}
