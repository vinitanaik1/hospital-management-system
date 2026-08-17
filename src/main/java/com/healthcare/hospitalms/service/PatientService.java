package com.healthcare.hospitalms.service;

import jakarta.transaction.Transactional;
import com.healthcare.hospitalms.dto.PatientDTO;
import com.healthcare.hospitalms.entity.Patient;
import com.healthcare.hospitalms.repo.PatientRepo;
import com.healthcare.hospitalms.util.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PatientService {
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private ModelMapper modelMapper;

   
    
    public String savePatient(PatientDTO dto) {

        if (dto.getPatientId() != null && patientRepo.existsById(dto.getPatientId()))
            return VarList.RSP_DUPLICATED;

        Patient entity = mapToEntity(dto);

        Patient savedEntity = patientRepo.save(entity);

        dto.setPatientId(savedEntity.getPatientId());

        return VarList.RSP_SUCCESS;
    }

    public String updatePatient(PatientDTO dto) {
        if (dto.getPatientId() == null || !patientRepo.existsById(dto.getPatientId())) return VarList.RSP_NO_DATA_FOUND;
        patientRepo.save(mapToEntity(dto));
        return VarList.RSP_SUCCESS;
    }

    public List<PatientDTO> getAllPatients() {
        List<Patient> list = patientRepo.findAll();
        List<PatientDTO> result = new ArrayList<>();
        for (Patient entity : list) result.add(mapToDTO(entity));
        return result;
    }

    public PatientDTO searchPatient(int id) {
        Patient entity = patientRepo.findById(id).orElse(null);
        return entity == null ? null : mapToDTO(entity);
    }

    public String deletePatient(int id) {
        if (!patientRepo.existsById(id)) return VarList.RSP_NO_DATA_FOUND;
        patientRepo.deleteById(id);
        return VarList.RSP_SUCCESS;
    }

    private Patient mapToEntity(PatientDTO dto) {
        Patient entity = modelMapper.map(dto, Patient.class);
        return entity;
    }

    private PatientDTO mapToDTO(Patient entity) {
        PatientDTO dto = modelMapper.map(entity, PatientDTO.class);
        return dto;
    }
}
