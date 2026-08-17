package com.healthcare.hospitalms.service;

import jakarta.transaction.Transactional;
import com.healthcare.hospitalms.dto.DoctorDTO;
import com.healthcare.hospitalms.entity.Doctor;
import com.healthcare.hospitalms.repo.DoctorRepo;
import com.healthcare.hospitalms.entity.Department;
import com.healthcare.hospitalms.repo.DepartmentRepo;
import com.healthcare.hospitalms.util.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DoctorService {
    @Autowired
    private DoctorRepo doctorRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private DepartmentRepo departmentRepo;

   // public String saveDoctor(DoctorDTO dto) {
    //    if (dto.getDoctorId() != null && doctorRepo.existsById(dto.getDoctorId())) return VarList.RSP_DUPLICATED;
     //   doctorRepo.save(mapToEntity(dto));
       // return VarList.RSP_SUCCESS;
   // }

    public String saveDoctor(DoctorDTO dto) {

        if (dto.getDoctorId() != null && doctorRepo.existsById(dto.getDoctorId()))
            return VarList.RSP_DUPLICATED;

        Doctor entity = mapToEntity(dto);

        Doctor savedEntity = doctorRepo.save(entity);

        dto.setDoctorId(savedEntity.getDoctorId());

        return VarList.RSP_SUCCESS;
    }
    
    public String updateDoctor(DoctorDTO dto) {
        if (dto.getDoctorId() == null || !doctorRepo.existsById(dto.getDoctorId())) return VarList.RSP_NO_DATA_FOUND;
        doctorRepo.save(mapToEntity(dto));
        return VarList.RSP_SUCCESS;
    }

    public List<DoctorDTO> getAllDoctors() {
        List<Doctor> list = doctorRepo.findAll();
        List<DoctorDTO> result = new ArrayList<>();
        for (Doctor entity : list) result.add(mapToDTO(entity));
        return result;
    }

    public DoctorDTO searchDoctor(int id) {
        Doctor entity = doctorRepo.findById(id).orElse(null);
        return entity == null ? null : mapToDTO(entity);
    }

    public String deleteDoctor(int id) {
        if (!doctorRepo.existsById(id)) return VarList.RSP_NO_DATA_FOUND;
        doctorRepo.deleteById(id);
        return VarList.RSP_SUCCESS;
    }

    private Doctor mapToEntity(DoctorDTO dto) {
        Doctor entity = modelMapper.map(dto, Doctor.class);
        if (dto.getDepartmentId() != null) entity.setDepartment(departmentRepo.findById(dto.getDepartmentId()).orElseThrow(() -> new IllegalArgumentException("Invalid Department ID")));
        return entity;
    }

    private DoctorDTO mapToDTO(Doctor entity) {
        DoctorDTO dto = modelMapper.map(entity, DoctorDTO.class);
        dto.setDepartmentId(entity.getDepartment() == null ? null : entity.getDepartment().getDepartmentId());
        return dto;
    }
}
