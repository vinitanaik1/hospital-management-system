package com.healthcare.hospitalms.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.healthcare.hospitalms.entity.Admin;

public interface AdminRepo extends JpaRepository<Admin, Integer> {

    Admin findByUsernameAndPassword(String username, String password);
}