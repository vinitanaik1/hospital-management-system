package com.healthcare.hospitalms.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class MedicineDTO {
    private Integer medicineId;
    private String medicineName;
    private String category;
    private String manufacturer;
    private Integer quantity;
    private Double unitPrice;
    private LocalDate expiryDate;
}
