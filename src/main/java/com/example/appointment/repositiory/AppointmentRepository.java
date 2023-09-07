package com.example.appointment.repositiory;

import com.example.appointment.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    Appointment findAppointmentById(Long id);
}
