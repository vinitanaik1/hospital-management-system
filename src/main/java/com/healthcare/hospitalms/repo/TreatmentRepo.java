package com.healthcare.hospitalms.repo;

import com.healthcare.hospitalms.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentRepo extends JpaRepository<Treatment, Integer> {
}
