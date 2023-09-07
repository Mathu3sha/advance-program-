package com.example.appointment.service;

import com.example.appointment.model.Appointment;
import com.example.appointment.repositiory.AppointmentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AppointmentService {
//    Appointment getAppointmentById(Long id) {
//        AppointmentService appointmentService;
//        return appointmentService.getAppointmentById(id);
//    }

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public void cancelAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    public Appointment updateAppointment(Long id, Appointment newAppointment) {
        if (appointmentRepository.existsById(id)) {
            newAppointment.setId(id);
            return appointmentRepository.save(newAppointment);
        } else {
            throw new NoSuchElementException("Appointment not found with ID: " + id);
        }
    }
}
