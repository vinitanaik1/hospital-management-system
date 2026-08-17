package com.healthcare.hospitalms.service;

import jakarta.transaction.Transactional;
import com.healthcare.hospitalms.dto.DepartmentDTO;
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
public class DepartmentService {
    @Autowired
    private DepartmentRepo departmentRepo;
    @Autowired
    private ModelMapper modelMapper;

    public String saveDepartment(DepartmentDTO dto) {

        if (dto.getDepartmentId() != null
                && departmentRepo.existsById(dto.getDepartmentId())) {
            return VarList.RSP_DUPLICATED;
        }

        Department entity = mapToEntity(dto);
        entity = departmentRepo.save(entity);

        // Set auto-generated ID back into DTO
        dto.setDepartmentId(entity.getDepartmentId());

        return VarList.RSP_SUCCESS;
    }
    public String updateDepartment(DepartmentDTO dto) {
        if (dto.getDepartmentId() == null || !departmentRepo.existsById(dto.getDepartmentId())) return VarList.RSP_NO_DATA_FOUND;
        departmentRepo.save(mapToEntity(dto));
        return VarList.RSP_SUCCESS;
    }

    public List<DepartmentDTO> getAllDepartments() {
        List<Department> list = departmentRepo.findAll();
        List<DepartmentDTO> result = new ArrayList<>();
        for (Department entity : list) result.add(mapToDTO(entity));
        return result;
    }

    public DepartmentDTO searchDepartment(int id) {
        Department entity = departmentRepo.findById(id).orElse(null);
        return entity == null ? null : mapToDTO(entity);
    }

    public String deleteDepartment(int id) {
        if (!departmentRepo.existsById(id)) return VarList.RSP_NO_DATA_FOUND;
        departmentRepo.deleteById(id);
        return VarList.RSP_SUCCESS;
    }

    private Department mapToEntity(DepartmentDTO dto) {
        Department entity = modelMapper.map(dto, Department.class);
        return entity;
    }

    private DepartmentDTO mapToDTO(Department entity) {
        DepartmentDTO dto = modelMapper.map(entity, DepartmentDTO.class);
        return dto;
    }
}
