package com.healthcare.hospitalms.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.healthcare.hospitalms.dto.AdmissionDTO;
import com.healthcare.hospitalms.dto.ResponseDTO;
import com.healthcare.hospitalms.service.AdmissionService;
import com.healthcare.hospitalms.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/v1/admission")
public class AdmissionController {
    @Autowired private AdmissionService admissionService;
    @Autowired private ResponseDTO responseDTO;

    @PostMapping("/saveAdmission")
    public ResponseEntity saveAdmission(@RequestBody AdmissionDTO dto) {
        try { String res=admissionService.saveAdmission(dto); return response(res, dto, "Admission saved successfully", "Admission already exists"); }
        catch(Exception e){ return error(e); }
    }

    @PutMapping("/updateAdmission")
    public ResponseEntity updateAdmission(@RequestBody AdmissionDTO dto) {
        try { String res=admissionService.updateAdmission(dto); return response(res, dto, "Admission updated successfully", "Admission not found"); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/getAllAdmissions")
    public ResponseEntity getAllAdmissions() {
        try { List<AdmissionDTO> list=admissionService.getAllAdmissions(); responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(list); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/searchAdmission/{id}")
    public ResponseEntity searchAdmission(@PathVariable int id) {
        try { AdmissionDTO dto=admissionService.searchAdmission(id); if(dto==null){ responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Admission not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); } responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(dto); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @DeleteMapping("/deleteAdmission/{id}")
    public ResponseEntity deleteAdmission(@PathVariable int id) {
        try { String res=admissionService.deleteAdmission(id); if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Admission deleted successfully"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.OK); } responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Admission not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); }
        catch(Exception e){ return error(e); }
    }

    private ResponseEntity response(String res,Object content,String success,String duplicate) {
        if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage(success); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED); }
        if(VarList.RSP_DUPLICATED.equals(res)){ responseDTO.setCode(VarList.RSP_DUPLICATED); responseDTO.setMessage(duplicate); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST); }
        responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Operation failed"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity error(Exception e) { responseDTO.setCode(VarList.RSP_ERROR); responseDTO.setMessage(e.getMessage()); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR); }
}
