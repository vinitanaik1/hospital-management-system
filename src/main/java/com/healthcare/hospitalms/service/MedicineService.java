package com.healthcare.hospitalms.service;

import jakarta.transaction.Transactional;
import com.healthcare.hospitalms.dto.MedicineDTO;
import com.healthcare.hospitalms.entity.Medicine;
import com.healthcare.hospitalms.repo.MedicineRepo;
import com.healthcare.hospitalms.util.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class MedicineService {
    @Autowired
    private MedicineRepo medicineRepo;
    @Autowired
    private ModelMapper modelMapper;

    public String saveMedicine(MedicineDTO dto) {
        if (dto.getMedicineId() != null && medicineRepo.existsById(dto.getMedicineId())) {
            return VarList.RSP_DUPLICATED;
        }

        Medicine entity = medicineRepo.save(mapToEntity(dto));
        dto.setMedicineId(entity.getMedicineId());

        return VarList.RSP_SUCCESS;
    }
    public String updateMedicine(MedicineDTO dto) {
        if (dto.getMedicineId() == null || !medicineRepo.existsById(dto.getMedicineId())) return VarList.RSP_NO_DATA_FOUND;
        medicineRepo.save(mapToEntity(dto));
        return VarList.RSP_SUCCESS;
    }

    public List<MedicineDTO> getAllMedicines() {
        List<Medicine> list = medicineRepo.findAll();
        List<MedicineDTO> result = new ArrayList<>();
        for (Medicine entity : list) result.add(mapToDTO(entity));
        return result;
    }

    public MedicineDTO searchMedicine(int id) {
        Medicine entity = medicineRepo.findById(id).orElse(null);
        return entity == null ? null : mapToDTO(entity);
    }

    public String deleteMedicine(int id) {
        if (!medicineRepo.existsById(id)) return VarList.RSP_NO_DATA_FOUND;
        medicineRepo.deleteById(id);
        return VarList.RSP_SUCCESS;
    }

    private Medicine mapToEntity(MedicineDTO dto) {
        Medicine entity = modelMapper.map(dto, Medicine.class);
        return entity;
    }

    private MedicineDTO mapToDTO(Medicine entity) {
        MedicineDTO dto = modelMapper.map(entity, MedicineDTO.class);
        return dto;
    }
}
