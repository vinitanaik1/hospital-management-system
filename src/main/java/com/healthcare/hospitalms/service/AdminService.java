package com.healthcare.hospitalms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthcare.hospitalms.entity.Admin;
import com.healthcare.hospitalms.repo.AdminRepo;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    public Admin login(String username, String password) {
        return adminRepo.findByUsernameAndPassword(username, password);
    }
}