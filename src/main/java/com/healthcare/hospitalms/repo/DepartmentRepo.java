package com.healthcare.hospitalms.repo;

import com.healthcare.hospitalms.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepo extends JpaRepository<Department, Integer> {
}
