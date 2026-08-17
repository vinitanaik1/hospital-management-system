package com.healthcare.hospitalms.repo;

import com.healthcare.hospitalms.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepo extends JpaRepository<Appointment, Integer> {
}
