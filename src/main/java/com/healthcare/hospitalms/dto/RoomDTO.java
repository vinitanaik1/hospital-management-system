package com.healthcare.hospitalms.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RoomDTO {
    private Integer roomId;
    private String roomNumber;
    private String roomType;
    private String wardName;
    private String status;
    private Double dailyCharge;
}
