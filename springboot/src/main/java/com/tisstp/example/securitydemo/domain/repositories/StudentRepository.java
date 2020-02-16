package com.tisstp.example.securitydemo.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tisstp.example.securitydemo.domain.entities.Student;

/**
 * @author sathaphorn.stp (Tis)
 * @since 15-02-2020, 8:19 PM
 */
public interface StudentRepository extends JpaRepository<Student, Long> {

}
