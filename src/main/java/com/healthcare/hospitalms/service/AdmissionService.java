package com.healthcare.hospitalms.service;

import jakarta.transaction.Transactional;
import com.healthcare.hospitalms.dto.AdmissionDTO;
import com.healthcare.hospitalms.entity.Admission;
import com.healthcare.hospitalms.repo.AdmissionRepo;
import com.healthcare.hospitalms.entity.Patient;
import com.healthcare.hospitalms.repo.PatientRepo;
import com.healthcare.hospitalms.entity.Doctor;
import com.healthcare.hospitalms.repo.DoctorRepo;
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
public class AdmissionService {
    @Autowired
    private AdmissionRepo admissionRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private DoctorRepo doctorRepo;
    @Autowired
    private RoomRepo roomRepo;

    public String saveAdmission(AdmissionDTO dto) {

        if (dto.getAdmissionId() != null &&
            admissionRepo.existsById(dto.getAdmissionId())) {
            return VarList.RSP_DUPLICATED;
        }

        Admission admission = admissionRepo.save(mapToEntity(dto));

        dto.setAdmissionId(admission.getAdmissionId());

        return VarList.RSP_SUCCESS;
    }

    public String updateAdmission(AdmissionDTO dto) {
        if (dto.getAdmissionId() == null || !admissionRepo.existsById(dto.getAdmissionId())) return VarList.RSP_NO_DATA_FOUND;
        admissionRepo.save(mapToEntity(dto));
        return VarList.RSP_SUCCESS;
    }

    public List<AdmissionDTO> getAllAdmissions() {
        List<Admission> list = admissionRepo.findAll();
        List<AdmissionDTO> result = new ArrayList<>();
        for (Admission entity : list) result.add(mapToDTO(entity));
        return result;
    }

    public AdmissionDTO searchAdmission(int id) {
        Admission entity = admissionRepo.findById(id).orElse(null);
        return entity == null ? null : mapToDTO(entity);
    }

    public String deleteAdmission(int id) {
        if (!admissionRepo.existsById(id)) return VarList.RSP_NO_DATA_FOUND;
        admissionRepo.deleteById(id);
        return VarList.RSP_SUCCESS;
    }

    private Admission mapToEntity(AdmissionDTO dto) {
        Admission entity = modelMapper.map(dto, Admission.class);
        if (dto.getPatientId() != null) entity.setPatient(patientRepo.findById(dto.getPatientId()).orElseThrow(() -> new IllegalArgumentException("Invalid Patient ID")));
        if (dto.getDoctorId() != null) entity.setDoctor(doctorRepo.findById(dto.getDoctorId()).orElseThrow(() -> new IllegalArgumentException("Invalid Doctor ID")));
        if (dto.getRoomId() != null) entity.setRoom(roomRepo.findById(dto.getRoomId()).orElseThrow(() -> new IllegalArgumentException("Invalid Room ID")));
        return entity;
    }

    private AdmissionDTO mapToDTO(Admission entity) {
        AdmissionDTO dto = modelMapper.map(entity, AdmissionDTO.class);
        dto.setPatientId(entity.getPatient() == null ? null : entity.getPatient().getPatientId());
        dto.setDoctorId(entity.getDoctor() == null ? null : entity.getDoctor().getDoctorId());
        dto.setRoomId(entity.getRoom() == null ? null : entity.getRoom().getRoomId());
        return dto;
    }
}
