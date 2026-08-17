package com.healthcare.hospitalms.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class BillDTO {
    private Integer billId;
    private Integer patientId;
    private Integer admissionId;
    private LocalDate billDate;
    private Double consultationCharge;
    private Double roomCharge;
    private Double medicineCharge;
    private Double labCharge;
    private Double otherCharge;
    private Double totalAmount;
    private String paymentStatus;
}
