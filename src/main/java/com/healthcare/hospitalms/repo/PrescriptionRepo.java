package com.healthcare.hospitalms.repo;

import com.healthcare.hospitalms.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRepo extends JpaRepository<Prescription, Integer> {
}
