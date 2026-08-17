package com.healthcare.hospitalms.service;

import jakarta.transaction.Transactional;
import com.healthcare.hospitalms.dto.RoomDTO;
import com.healthcare.hospitalms.entity.Room;
import com.healthcare.hospitalms.repo.RoomRepo;
import com.healthcare.hospitalms.util.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RoomService {
    @Autowired
    private RoomRepo roomRepo;
    @Autowired
    private ModelMapper modelMapper;

    public String saveRoom(RoomDTO dto) {
        if (dto.getRoomId() != null && roomRepo.existsById(dto.getRoomId())) {
            return VarList.RSP_DUPLICATED;
        }

        Room entity = roomRepo.save(mapToEntity(dto));
        dto.setRoomId(entity.getRoomId());

        return VarList.RSP_SUCCESS;
    }

    public String updateRoom(RoomDTO dto) {
        if (dto.getRoomId() == null || !roomRepo.existsById(dto.getRoomId())) return VarList.RSP_NO_DATA_FOUND;
        roomRepo.save(mapToEntity(dto));
        return VarList.RSP_SUCCESS;
    }

    public List<RoomDTO> getAllRooms() {
        List<Room> list = roomRepo.findAll();
        List<RoomDTO> result = new ArrayList<>();
        for (Room entity : list) result.add(mapToDTO(entity));
        return result;
    }

    public RoomDTO searchRoom(int id) {
        Room entity = roomRepo.findById(id).orElse(null);
        return entity == null ? null : mapToDTO(entity);
    }

    public String deleteRoom(int id) {
        if (!roomRepo.existsById(id)) return VarList.RSP_NO_DATA_FOUND;
        roomRepo.deleteById(id);
        return VarList.RSP_SUCCESS;
    }

    private Room mapToEntity(RoomDTO dto) {
        Room entity = modelMapper.map(dto, Room.class);
        return entity;
    }

    private RoomDTO mapToDTO(Room entity) {
        RoomDTO dto = modelMapper.map(entity, RoomDTO.class);
        return dto;
    }
}
