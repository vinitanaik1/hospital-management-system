package com.healthcare.hospitalms.repo;

import com.healthcare.hospitalms.entity.Admission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdmissionRepo extends JpaRepository<Admission, Integer> {
}
