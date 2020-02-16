package com.tisstp.example.securitydemo.domain.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tisstp.example.securitydemo.domain.entities.Student;

/**
 * @author sathaphorn.stp (Tis)
 * @since 16-02-2020, 3:38 PM
 */
public interface StudentRepositoryCustom {

  Page<Student> searchStudentForNative(Student req, Pageable pageable);

}
