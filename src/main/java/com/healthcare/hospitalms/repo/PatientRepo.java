package com.healthcare.hospitalms.repo;

import com.healthcare.hospitalms.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepo extends JpaRepository<Patient, Integer> {
}
