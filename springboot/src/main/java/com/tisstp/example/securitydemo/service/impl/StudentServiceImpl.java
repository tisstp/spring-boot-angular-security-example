package com.tisstp.example.securitydemo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tisstp.example.securitydemo.domain.entities.Student;
import com.tisstp.example.securitydemo.domain.repositories.StudentRepository;
import com.tisstp.example.securitydemo.service.StudentService;
import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 16-02-2020, 3:24 PM
 */
@Log4j2
@Service
public class StudentServiceImpl implements StudentService {

  @Autowired
  private StudentRepository studentRepository;

  @Override
  public Page<Student> searchStudent(Student req, Pageable pageable) {
    return studentRepository.searchStudentForNative(req, pageable);
  }

}
