package com.healthcare.hospitalms.service;

import jakarta.transaction.Transactional;
import com.healthcare.hospitalms.dto.TreatmentDTO;
import com.healthcare.hospitalms.entity.Treatment;
import com.healthcare.hospitalms.repo.TreatmentRepo;
import com.healthcare.hospitalms.entity.Patient;
import com.healthcare.hospitalms.repo.PatientRepo;
import com.healthcare.hospitalms.entity.Doctor;
import com.healthcare.hospitalms.repo.DoctorRepo;
import com.healthcare.hospitalms.entity.Appointment;
import com.healthcare.hospitalms.repo.AppointmentRepo;
import com.healthcare.hospitalms.util.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TreatmentService {
    @Autowired
    private TreatmentRepo treatmentRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private DoctorRepo doctorRepo;
    @Autowired
    private AppointmentRepo appointmentRepo;

    public String saveTreatment(TreatmentDTO dto) {
        if (dto.getTreatmentId() != null && treatmentRepo.existsById(dto.getTreatmentId())) {
            return VarList.RSP_DUPLICATED;
        }

        Treatment entity = treatmentRepo.save(mapToEntity(dto));

        dto.setTreatmentId(entity.getTreatmentId());

        return VarList.RSP_SUCCESS;
    }

    public String updateTreatment(TreatmentDTO dto) {
        if (dto.getTreatmentId() == null || !treatmentRepo.existsById(dto.getTreatmentId())) return VarList.RSP_NO_DATA_FOUND;
        treatmentRepo.save(mapToEntity(dto));
        return VarList.RSP_SUCCESS;
    }

    public List<TreatmentDTO> getAllTreatments() {
        List<Treatment> list = treatmentRepo.findAll();
        List<TreatmentDTO> result = new ArrayList<>();
        for (Treatment entity : list) result.add(mapToDTO(entity));
        return result;
    }

    public TreatmentDTO searchTreatment(int id) {
        Treatment entity = treatmentRepo.findById(id).orElse(null);
        return entity == null ? null : mapToDTO(entity);
    }

    public String deleteTreatment(int id) {
        if (!treatmentRepo.existsById(id)) return VarList.RSP_NO_DATA_FOUND;
        treatmentRepo.deleteById(id);
        return VarList.RSP_SUCCESS;
    }

    private Treatment mapToEntity(TreatmentDTO dto) {
        Treatment entity = modelMapper.map(dto, Treatment.class);
        if (dto.getPatientId() != null) entity.setPatient(patientRepo.findById(dto.getPatientId()).orElseThrow(() -> new IllegalArgumentException("Invalid Patient ID")));
        if (dto.getDoctorId() != null) entity.setDoctor(doctorRepo.findById(dto.getDoctorId()).orElseThrow(() -> new IllegalArgumentException("Invalid Doctor ID")));
        if (dto.getAppointmentId() != null) entity.setAppointment(appointmentRepo.findById(dto.getAppointmentId()).orElseThrow(() -> new IllegalArgumentException("Invalid Appointment ID")));
        return entity;
    }

    private TreatmentDTO mapToDTO(Treatment entity) {
        TreatmentDTO dto = modelMapper.map(entity, TreatmentDTO.class);
        dto.setPatientId(entity.getPatient() == null ? null : entity.getPatient().getPatientId());
        dto.setDoctorId(entity.getDoctor() == null ? null : entity.getDoctor().getDoctorId());
        dto.setAppointmentId(entity.getAppointment() == null ? null : entity.getAppointment().getAppointmentId());
        return dto;
    }
}
