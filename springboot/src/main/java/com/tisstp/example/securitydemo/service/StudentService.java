package com.tisstp.example.securitydemo.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tisstp.example.securitydemo.domain.entities.Student;

/**
 * @author sathaphorn.stp (Tis)
 * @since 16-02-2020, 3:24 PM
 */
public interface StudentService {

  Page<Student> searchStudent(Student req, Pageable pageable);

}
