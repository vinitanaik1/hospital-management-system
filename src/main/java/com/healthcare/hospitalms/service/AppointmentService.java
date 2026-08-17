package com.healthcare.hospitalms.service;

import jakarta.transaction.Transactional;
import com.healthcare.hospitalms.dto.AppointmentDTO;
import com.healthcare.hospitalms.entity.Appointment;
import com.healthcare.hospitalms.repo.AppointmentRepo;
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
public class AppointmentService {
    @Autowired
    private AppointmentRepo appointmentRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private DoctorRepo doctorRepo;

    public String saveAppointment(AppointmentDTO dto) {

        if (dto.getAppointmentId() != null &&
            appointmentRepo.existsById(dto.getAppointmentId())) {
            return VarList.RSP_DUPLICATED;
        }

        Appointment entity = mapToEntity(dto);

        Appointment savedEntity = appointmentRepo.save(entity);

        dto.setAppointmentId(savedEntity.getAppointmentId());

        return VarList.RSP_SUCCESS;
    }
    public String updateAppointment(AppointmentDTO dto) {
        if (dto.getAppointmentId() == null || !appointmentRepo.existsById(dto.getAppointmentId())) return VarList.RSP_NO_DATA_FOUND;
        appointmentRepo.save(mapToEntity(dto));
        return VarList.RSP_SUCCESS;
    }

    public List<AppointmentDTO> getAllAppointments() {
        List<Appointment> list = appointmentRepo.findAll();
        List<AppointmentDTO> result = new ArrayList<>();
        for (Appointment entity : list) result.add(mapToDTO(entity));
        return result;
    }

    public AppointmentDTO searchAppointment(int id) {
        Appointment entity = appointmentRepo.findById(id).orElse(null);
        return entity == null ? null : mapToDTO(entity);
    }

    public String deleteAppointment(int id) {
        if (!appointmentRepo.existsById(id)) return VarList.RSP_NO_DATA_FOUND;
        appointmentRepo.deleteById(id);
        return VarList.RSP_SUCCESS;
    }

    private Appointment mapToEntity(AppointmentDTO dto) {
        Appointment entity = modelMapper.map(dto, Appointment.class);
        if (dto.getPatientId() != null) entity.setPatient(patientRepo.findById(dto.getPatientId()).orElseThrow(() -> new IllegalArgumentException("Invalid Patient ID")));
        if (dto.getDoctorId() != null) entity.setDoctor(doctorRepo.findById(dto.getDoctorId()).orElseThrow(() -> new IllegalArgumentException("Invalid Doctor ID")));
        return entity;
    }

    private AppointmentDTO mapToDTO(Appointment entity) {
        AppointmentDTO dto = modelMapper.map(entity, AppointmentDTO.class);
        dto.setPatientId(entity.getPatient() == null ? null : entity.getPatient().getPatientId());
        dto.setDoctorId(entity.getDoctor() == null ? null : entity.getDoctor().getDoctorId());
        return dto;
    }
}
