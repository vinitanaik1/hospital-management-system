package com.healthcare.hospitalms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthcare.hospitalms.entity.Admin;
import com.healthcare.hospitalms.service.AdminService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/v1/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {

        Admin result = adminService.login(
                admin.getUsername(),
                admin.getPassword()
        );

        if (result != null) {
            return ResponseEntity.ok(result);
        }

        return ResponseEntity.status(401).body("Invalid username or password");
    }
}