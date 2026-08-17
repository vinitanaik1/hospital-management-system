package com.healthcare.hospitalms.controller;

import com.healthcare.hospitalms.dto.DoctorDTO;

import com.healthcare.hospitalms.dto.ResponseDTO;
import com.healthcare.hospitalms.service.DoctorService;
import com.healthcare.hospitalms.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/v1/doctor")
public class DoctorController {
    @Autowired private DoctorService doctorService;
    @Autowired private ResponseDTO responseDTO;

    @PostMapping("/saveDoctor")
    public ResponseEntity saveDoctor(@RequestBody DoctorDTO dto) {
        try { String res=doctorService.saveDoctor(dto); return response(res, dto, "Doctor saved successfully", "Doctor already exists"); }
        catch(Exception e){ return error(e); }
    }

    @PutMapping("/updateDoctor")
    public ResponseEntity updateDoctor(@RequestBody DoctorDTO dto) {
        try { String res=doctorService.updateDoctor(dto); return response(res, dto, "Doctor updated successfully", "Doctor not found"); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/getAllDoctors")
    public ResponseEntity getAllDoctors() {
        try { List<DoctorDTO> list=doctorService.getAllDoctors(); responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(list); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/searchDoctor/{id}")
    public ResponseEntity searchDoctor(@PathVariable int id) {
        try { DoctorDTO dto=doctorService.searchDoctor(id); if(dto==null){ responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Doctor not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); } responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(dto); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @DeleteMapping("/deleteDoctor/{id}")
    public ResponseEntity deleteDoctor(@PathVariable int id) {
        try { String res=doctorService.deleteDoctor(id); if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Doctor deleted successfully"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.OK); } responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Doctor not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); }
        catch(Exception e){ return error(e); }
    }

    private ResponseEntity response(String res,Object content,String success,String duplicate) {
        if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage(success); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED); }
        if(VarList.RSP_DUPLICATED.equals(res)){ responseDTO.setCode(VarList.RSP_DUPLICATED); responseDTO.setMessage(duplicate); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST); }
        responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Operation failed"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity error(Exception e) { responseDTO.setCode(VarList.RSP_ERROR); responseDTO.setMessage(e.getMessage()); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR); }
}
