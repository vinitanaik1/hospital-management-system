package com.healthcare.hospitalms.service;

import jakarta.transaction.Transactional;
import com.healthcare.hospitalms.dto.LabTestDTO;
import com.healthcare.hospitalms.entity.LabTest;
import com.healthcare.hospitalms.repo.LabTestRepo;
import com.healthcare.hospitalms.entity.Patient;
import com.healthcare.hospitalms.repo.PatientRepo;
import com.healthcare.hospitalms.entity.Doctor;
import com.healthcare.hospitalms.repo.DoctorRepo;
import com.healthcare.hospitalms.util.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class LabTestService {
    @Autowired
    private LabTestRepo labTestRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private DoctorRepo doctorRepo;

    public String saveLabTest(LabTestDTO dto) {

        if (dto.getLabTestId() != null
                && labTestRepo.existsById(dto.getLabTestId())) {
            return VarList.RSP_DUPLICATED;
        }

        LabTest entity = mapToEntity(dto);
        entity = labTestRepo.save(entity);

        dto.setLabTestId(entity.getLabTestId());

        return VarList.RSP_SUCCESS;
    }

    public String updateLabTest(LabTestDTO dto) {
        if (dto.getLabTestId() == null || !labTestRepo.existsById(dto.getLabTestId())) return VarList.RSP_NO_DATA_FOUND;
        labTestRepo.save(mapToEntity(dto));
        return VarList.RSP_SUCCESS;
    }

    public List<LabTestDTO> getAllLabTests() {
        List<LabTest> list = labTestRepo.findAll();
        List<LabTestDTO> result = new ArrayList<>();
        for (LabTest entity : list) result.add(mapToDTO(entity));
        return result;
    }

    public LabTestDTO searchLabTest(int id) {
        LabTest entity = labTestRepo.findById(id).orElse(null);
        return entity == null ? null : mapToDTO(entity);
    }

    public String deleteLabTest(int id) {
        if (!labTestRepo.existsById(id)) return VarList.RSP_NO_DATA_FOUND;
        labTestRepo.deleteById(id);
        return VarList.RSP_SUCCESS;
    }

    private LabTest mapToEntity(LabTestDTO dto) {
        LabTest entity = modelMapper.map(dto, LabTest.class);
        if (dto.getPatientId() != null) entity.setPatient(patientRepo.findById(dto.getPatientId()).orElseThrow(() -> new IllegalArgumentException("Invalid Patient ID")));
        if (dto.getDoctorId() != null) entity.setDoctor(doctorRepo.findById(dto.getDoctorId()).orElseThrow(() -> new IllegalArgumentException("Invalid Doctor ID")));
        return entity;
    }

    private LabTestDTO mapToDTO(LabTest entity) {
        LabTestDTO dto = modelMapper.map(entity, LabTestDTO.class);
        dto.setPatientId(entity.getPatient() == null ? null : entity.getPatient().getPatientId());
        dto.setDoctorId(entity.getDoctor() == null ? null : entity.getDoctor().getDoctorId());
        return dto;
    }
}
