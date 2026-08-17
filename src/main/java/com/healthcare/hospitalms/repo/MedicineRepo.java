package com.healthcare.hospitalms.repo;

import com.healthcare.hospitalms.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineRepo extends JpaRepository<Medicine, Integer> {
}
