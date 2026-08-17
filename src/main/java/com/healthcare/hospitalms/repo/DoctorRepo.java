package com.healthcare.hospitalms.repo;

import com.healthcare.hospitalms.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepo extends JpaRepository<Doctor, Integer> {
}
