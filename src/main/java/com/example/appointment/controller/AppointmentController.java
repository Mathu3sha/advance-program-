package com.example.appointment.controller;

import com.example.appointment.model.Appointment;
import com.example.appointment.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/getall")
    public List<Appointment> getAppointments() {
        return appointmentService.getAllAppointments();
    }

    @PostMapping("/save")
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentService.createAppointment(appointment);
    }

    @DeleteMapping("/delete/{id}")
    public void cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
    }

    @PutMapping("/update/{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody Appointment updatedAppointment) {
        return appointmentService.updateAppointment(id, updatedAppointment);
    }


    @GetMapping("/ui/appointments/edit-appointment/{id}")
    public String showEditAppointmentPage(@PathVariable Long id, Model model) {
//        model.addAttribute("appointment",appointmentService.get(id))
        return "edit-appointment"; // Make sure the view name matches your HTML file name
    }

//    @GetMapping("/get/{id}")
//    public Appointment getAppointmentById(@PathVariable Long id) {
//        return appointmentService.getAppointmentById(id);
//    }


}
