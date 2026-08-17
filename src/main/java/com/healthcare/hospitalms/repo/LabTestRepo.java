package com.healthcare.hospitalms.repo;

import com.healthcare.hospitalms.entity.LabTest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabTestRepo extends JpaRepository<LabTest, Integer> {
}
