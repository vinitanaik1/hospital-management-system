package com.healthcare.hospitalms.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import com.healthcare.hospitalms.dto.PatientDTO;
import com.healthcare.hospitalms.dto.ResponseDTO;
import com.healthcare.hospitalms.service.PatientService;
import com.healthcare.hospitalms.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/v1/patient")
public class PatientController {
    @Autowired private PatientService patientService;
    @Autowired private ResponseDTO responseDTO;

    @PostMapping("/savePatient")
    public ResponseEntity savePatient(@RequestBody PatientDTO dto) {
        try { String res=patientService.savePatient(dto); return response(res, dto, "Patient saved successfully", "Patient already exists"); }
        catch(Exception e){ return error(e); }
    }

    @PutMapping("/updatePatient")
    public ResponseEntity updatePatient(@RequestBody PatientDTO dto) {
        try { String res=patientService.updatePatient(dto); return response(res, dto, "Patient updated successfully", "Patient not found"); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/getAllPatients")
    public ResponseEntity getAllPatients() {
        try { List<PatientDTO> list=patientService.getAllPatients(); responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(list); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/searchPatient/{id}")
    public ResponseEntity searchPatient(@PathVariable int id) {
        try { PatientDTO dto=patientService.searchPatient(id); if(dto==null){ responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Patient not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); } responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(dto); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @DeleteMapping("/deletePatient/{id}")
    public ResponseEntity deletePatient(@PathVariable int id) {
        try { String res=patientService.deletePatient(id); if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Patient deleted successfully"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.OK); } responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Patient not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); }
        catch(Exception e){ return error(e); }
    }

    private ResponseEntity response(String res,Object content,String success,String duplicate) {
        if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage(success); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED); }
        if(VarList.RSP_DUPLICATED.equals(res)){ responseDTO.setCode(VarList.RSP_DUPLICATED); responseDTO.setMessage(duplicate); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST); }
        responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Operation failed"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity error(Exception e) { responseDTO.setCode(VarList.RSP_ERROR); responseDTO.setMessage(e.getMessage()); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR); }
}
