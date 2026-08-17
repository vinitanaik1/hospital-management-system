package com.healthcare.hospitalms.service;

import jakarta.transaction.Transactional;
import com.healthcare.hospitalms.dto.BillDTO;
import com.healthcare.hospitalms.entity.Bill;
import com.healthcare.hospitalms.repo.BillRepo;
import com.healthcare.hospitalms.entity.Patient;
import com.healthcare.hospitalms.repo.PatientRepo;
import com.healthcare.hospitalms.entity.Admission;
import com.healthcare.hospitalms.repo.AdmissionRepo;
import com.healthcare.hospitalms.util.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class BillService {
    @Autowired
    private BillRepo billRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private AdmissionRepo admissionRepo;

    
    public String saveBill(BillDTO dto) {

        if (dto.getBillId() != null && billRepo.existsById(dto.getBillId())) {
            return VarList.RSP_DUPLICATED;
        }

        Bill entity = mapToEntity(dto);

        Bill savedBill = billRepo.save(entity);

        dto.setBillId(savedBill.getBillId());

        return VarList.RSP_SUCCESS;
    }

    public String updateBill(BillDTO dto) {
        if (dto.getBillId() == null || !billRepo.existsById(dto.getBillId())) return VarList.RSP_NO_DATA_FOUND;
        billRepo.save(mapToEntity(dto));
        return VarList.RSP_SUCCESS;
    }

    public List<BillDTO> getAllBills() {
        List<Bill> list = billRepo.findAll();
        List<BillDTO> result = new ArrayList<>();
        for (Bill entity : list) result.add(mapToDTO(entity));
        return result;
    }

    public BillDTO searchBill(int id) {
        Bill entity = billRepo.findById(id).orElse(null);
        return entity == null ? null : mapToDTO(entity);
    }

    public String deleteBill(int id) {
        if (!billRepo.existsById(id)) return VarList.RSP_NO_DATA_FOUND;
        billRepo.deleteById(id);
        return VarList.RSP_SUCCESS;
    }

    private Bill mapToEntity(BillDTO dto) {
        Bill entity = modelMapper.map(dto, Bill.class);
        if (dto.getPatientId() != null) entity.setPatient(patientRepo.findById(dto.getPatientId()).orElseThrow(() -> new IllegalArgumentException("Invalid Patient ID")));
        if (dto.getAdmissionId() != null) entity.setAdmission(admissionRepo.findById(dto.getAdmissionId()).orElseThrow(() -> new IllegalArgumentException("Invalid Admission ID")));
        return entity;
    }

    private BillDTO mapToDTO(Bill entity) {
        BillDTO dto = modelMapper.map(entity, BillDTO.class);
        dto.setPatientId(entity.getPatient() == null ? null : entity.getPatient().getPatientId());
        dto.setAdmissionId(entity.getAdmission() == null ? null : entity.getAdmission().getAdmissionId());
        return dto;
    }
}
