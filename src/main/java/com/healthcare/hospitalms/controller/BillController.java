package com.healthcare.hospitalms.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.healthcare.hospitalms.dto.BillDTO;
import com.healthcare.hospitalms.dto.ResponseDTO;
import com.healthcare.hospitalms.service.BillService;
import com.healthcare.hospitalms.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/v1/bill")
public class BillController {
    @Autowired private BillService billService;
    @Autowired private ResponseDTO responseDTO;

    @PostMapping("/saveBill")
    public ResponseEntity saveBill(@RequestBody BillDTO dto) {
        try { String res=billService.saveBill(dto); return response(res, dto, "Bill saved successfully", "Bill already exists"); }
        catch(Exception e){ return error(e); }
    }

    @PutMapping("/updateBill")
    public ResponseEntity updateBill(@RequestBody BillDTO dto) {
        try { String res=billService.updateBill(dto); return response(res, dto, "Bill updated successfully", "Bill not found"); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/getAllBills")
    public ResponseEntity getAllBills() {
        try { List<BillDTO> list=billService.getAllBills(); responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(list); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/searchBill/{id}")
    public ResponseEntity searchBill(@PathVariable int id) {
        try { BillDTO dto=billService.searchBill(id); if(dto==null){ responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Bill not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); } responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(dto); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @DeleteMapping("/deleteBill/{id}")
    public ResponseEntity deleteBill(@PathVariable int id) {
        try { String res=billService.deleteBill(id); if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Bill deleted successfully"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.OK); } responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Bill not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); }
        catch(Exception e){ return error(e); }
    }

    private ResponseEntity response(String res,Object content,String success,String duplicate) {
        if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage(success); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED); }
        if(VarList.RSP_DUPLICATED.equals(res)){ responseDTO.setCode(VarList.RSP_DUPLICATED); responseDTO.setMessage(duplicate); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST); }
        responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Operation failed"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity error(Exception e) { responseDTO.setCode(VarList.RSP_ERROR); responseDTO.setMessage(e.getMessage()); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR); }
}
