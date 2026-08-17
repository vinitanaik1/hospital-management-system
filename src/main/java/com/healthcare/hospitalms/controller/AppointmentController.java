package com.healthcare.hospitalms.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.healthcare.hospitalms.dto.AppointmentDTO;
import com.healthcare.hospitalms.dto.ResponseDTO;
import com.healthcare.hospitalms.service.AppointmentService;
import com.healthcare.hospitalms.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/v1/appointment")
public class AppointmentController {
    @Autowired private AppointmentService appointmentService;
    @Autowired private ResponseDTO responseDTO;

    @PostMapping("/saveAppointment")
    public ResponseEntity saveAppointment(@RequestBody AppointmentDTO dto) {
        try { String res=appointmentService.saveAppointment(dto); return response(res, dto, "Appointment saved successfully", "Appointment already exists"); }
        catch(Exception e){ return error(e); }
    }

    @PutMapping("/updateAppointment")
    public ResponseEntity updateAppointment(@RequestBody AppointmentDTO dto) {
        try { String res=appointmentService.updateAppointment(dto); return response(res, dto, "Appointment updated successfully", "Appointment not found"); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/getAllAppointments")
    public ResponseEntity getAllAppointments() {
        try { List<AppointmentDTO> list=appointmentService.getAllAppointments(); responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(list); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/searchAppointment/{id}")
    public ResponseEntity searchAppointment(@PathVariable int id) {
        try { AppointmentDTO dto=appointmentService.searchAppointment(id); if(dto==null){ responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Appointment not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); } responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(dto); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @DeleteMapping("/deleteAppointment/{id}")
    public ResponseEntity deleteAppointment(@PathVariable int id) {
        try { String res=appointmentService.deleteAppointment(id); if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Appointment deleted successfully"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.OK); } responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Appointment not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); }
        catch(Exception e){ return error(e); }
    }

    private ResponseEntity response(String res,Object content,String success,String duplicate) {
        if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage(success); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED); }
        if(VarList.RSP_DUPLICATED.equals(res)){ responseDTO.setCode(VarList.RSP_DUPLICATED); responseDTO.setMessage(duplicate); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST); }
        responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Operation failed"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity error(Exception e) { responseDTO.setCode(VarList.RSP_ERROR); responseDTO.setMessage(e.getMessage()); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR); }
}
