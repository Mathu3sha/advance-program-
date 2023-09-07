package com.example.appointment.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "appointment")
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "Date")
    private Date date;
    @Column(name = "time")
    private String time;
    @Column(name = "job_seeeker's_name")
    private String jobSeekerName;
    @Column(name = "consultant_name")
    private String consultantName;
}
