package com.healthcare.hospitalms.repo;

import com.healthcare.hospitalms.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepo extends JpaRepository<Bill, Integer> {
}
