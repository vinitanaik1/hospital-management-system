package com.healthcare.hospitalms.service;

import jakarta.transaction.Transactional;
import com.healthcare.hospitalms.dto.PrescriptionDTO;
import com.healthcare.hospitalms.entity.Prescription;
import com.healthcare.hospitalms.repo.PrescriptionRepo;
import com.healthcare.hospitalms.entity.Patient;
import com.healthcare.hospitalms.repo.PatientRepo;
import com.healthcare.hospitalms.entity.Doctor;
import com.healthcare.hospitalms.repo.DoctorRepo;
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
public class PrescriptionService {
    @Autowired
    private PrescriptionRepo prescriptionRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private DoctorRepo doctorRepo;
    @Autowired
    private MedicineRepo medicineRepo;

   
    public String savePrescription(PrescriptionDTO dto) {
        if (dto.getPrescriptionId() != null && prescriptionRepo.existsById(dto.getPrescriptionId()))
            return VarList.RSP_DUPLICATED;

        Prescription entity = mapToEntity(dto);
        Prescription savedEntity = prescriptionRepo.save(entity);

        dto.setPrescriptionId(savedEntity.getPrescriptionId());

        return VarList.RSP_SUCCESS;
    }

    public String updatePrescription(PrescriptionDTO dto) {
        if (dto.getPrescriptionId() == null || !prescriptionRepo.existsById(dto.getPrescriptionId())) return VarList.RSP_NO_DATA_FOUND;
        prescriptionRepo.save(mapToEntity(dto));
        return VarList.RSP_SUCCESS;
    }

    public List<PrescriptionDTO> getAllPrescriptions() {
        List<Prescription> list = prescriptionRepo.findAll();
        List<PrescriptionDTO> result = new ArrayList<>();
        for (Prescription entity : list) result.add(mapToDTO(entity));
        return result;
    }

    public PrescriptionDTO searchPrescription(int id) {
        Prescription entity = prescriptionRepo.findById(id).orElse(null);
        return entity == null ? null : mapToDTO(entity);
    }

    public String deletePrescription(int id) {
        if (!prescriptionRepo.existsById(id)) return VarList.RSP_NO_DATA_FOUND;
        prescriptionRepo.deleteById(id);
        return VarList.RSP_SUCCESS;
    }

    private Prescription mapToEntity(PrescriptionDTO dto) {
        Prescription entity = modelMapper.map(dto, Prescription.class);
        if (dto.getPatientId() != null) entity.setPatient(patientRepo.findById(dto.getPatientId()).orElseThrow(() -> new IllegalArgumentException("Invalid Patient ID")));
        if (dto.getDoctorId() != null) entity.setDoctor(doctorRepo.findById(dto.getDoctorId()).orElseThrow(() -> new IllegalArgumentException("Invalid Doctor ID")));
        if (dto.getMedicineId() != null) entity.setMedicine(medicineRepo.findById(dto.getMedicineId()).orElseThrow(() -> new IllegalArgumentException("Invalid Medicine ID")));
        return entity;
    }

    private PrescriptionDTO mapToDTO(Prescription entity) {
        PrescriptionDTO dto = modelMapper.map(entity, PrescriptionDTO.class);
        dto.setPatientId(entity.getPatient() == null ? null : entity.getPatient().getPatientId());
        dto.setDoctorId(entity.getDoctor() == null ? null : entity.getDoctor().getDoctorId());
        dto.setMedicineId(entity.getMedicine() == null ? null : entity.getMedicine().getMedicineId());
        return dto;
    }
}
