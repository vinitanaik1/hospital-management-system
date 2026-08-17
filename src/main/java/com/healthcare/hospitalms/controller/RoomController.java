package com.healthcare.hospitalms.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.healthcare.hospitalms.dto.RoomDTO;
import com.healthcare.hospitalms.dto.ResponseDTO;
import com.healthcare.hospitalms.service.RoomService;
import com.healthcare.hospitalms.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/v1/room")
public class RoomController {
    @Autowired private RoomService roomService;
    @Autowired private ResponseDTO responseDTO;

    @PostMapping("/saveRoom")
    public ResponseEntity saveRoom(@RequestBody RoomDTO dto) {
        try { String res=roomService.saveRoom(dto); return response(res, dto, "Room saved successfully", "Room already exists"); }
        catch(Exception e){ return error(e); }
    }

    @PutMapping("/updateRoom")
    public ResponseEntity updateRoom(@RequestBody RoomDTO dto) {
        try { String res=roomService.updateRoom(dto); return response(res, dto, "Room updated successfully", "Room not found"); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/getAllRooms")
    public ResponseEntity getAllRooms() {
        try { List<RoomDTO> list=roomService.getAllRooms(); responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(list); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @GetMapping("/searchRoom/{id}")
    public ResponseEntity searchRoom(@PathVariable int id) {
        try { RoomDTO dto=roomService.searchRoom(id); if(dto==null){ responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Room not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); } responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Success"); responseDTO.setContent(dto); return new ResponseEntity(responseDTO,HttpStatus.OK); }
        catch(Exception e){ return error(e); }
    }

    @DeleteMapping("/deleteRoom/{id}")
    public ResponseEntity deleteRoom(@PathVariable int id) {
        try { String res=roomService.deleteRoom(id); if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage("Room deleted successfully"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.OK); } responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Room not found"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.NOT_FOUND); }
        catch(Exception e){ return error(e); }
    }

    private ResponseEntity response(String res,Object content,String success,String duplicate) {
        if(VarList.RSP_SUCCESS.equals(res)){ responseDTO.setCode(VarList.RSP_SUCCESS); responseDTO.setMessage(success); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.ACCEPTED); }
        if(VarList.RSP_DUPLICATED.equals(res)){ responseDTO.setCode(VarList.RSP_DUPLICATED); responseDTO.setMessage(duplicate); responseDTO.setContent(content); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST); }
        responseDTO.setCode(VarList.RSP_NO_DATA_FOUND); responseDTO.setMessage("Operation failed"); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity error(Exception e) { responseDTO.setCode(VarList.RSP_ERROR); responseDTO.setMessage(e.getMessage()); responseDTO.setContent(null); return new ResponseEntity(responseDTO,HttpStatus.INTERNAL_SERVER_ERROR); }
}
