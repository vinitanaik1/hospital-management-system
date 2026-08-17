package com.healthcare.hospitalms.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.healthcare.hospitalms.dto.PrescriptionDTO;
import com.healthcare.hospitalms.dto.ResponseDTO;
import com.healthcare.hospitalms.service.PrescriptionService;
import com.healthcare.hospitalms.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/v1/prescription")
public class PrescriptionController {
    @Autowired private PrescriptionService prescriptionService;
    @Autowired private ResponseDTO responseDTO;

    @PostMapping("/savePrescription")
    public ResponseEntity savePrescription(@RequestBody PrescriptionDTO dto) {
        try { String res=prescriptionService.savePrescription(dto); return response(res, dto, "Prescription saved successfully", "Prescription already exists"); }
        catch(Exception e){ return error(e); }
    }

    @PutMapping("/updatePrescription")
    public ResponseEntity updatePrescription(@RequestBody PrescriptionDTO dto) {
        try { String res=prescriptionService.updatePrescription(dto); return response(res, dto, "Prescription updated successfully", "Prescription not found"); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/getAllPrescriptions")
    public ResponseEntity getAllPrescriptions() {
        try { List<PrescriptionDTO> list=prescriptionService.getAllPrescriptions(); responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(list); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/searchPrescription/{id}")
    public ResponseEntity searchPrescription(@PathVariable int id) {
        try { PrescriptionDTO dto=prescriptionService.searchPrescription(id); if(dto==null){ responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Prescription not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); } responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(dto); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @DeleteMapping("/deletePrescription/{id}")
    public ResponseEntity deletePrescription(@PathVariable int id) {
        try { String res=prescriptionService.deletePrescription(id); if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Prescription deleted successfully"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.OK); } responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Prescription not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); }
        catch(Exception e){ return error(e); }
    }

    private ResponseEntity response(String res,Object content,String success,String duplicate) {
        if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage(success); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED); }
        if(VarList.RSP_DUPLICATED.equals(res)){ responseDTO.setCode(VarList.RSP_DUPLICATED); responseDTO.setMessage(duplicate); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST); }
        responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Operation failed"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity error(Exception e) { responseDTO.setCode(VarList.RSP_ERROR); responseDTO.setMessage(e.getMessage()); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR); }
}
