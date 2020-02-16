package com.tisstp.example.securitydemo.domain.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

/**
 * @author sathaphorn.stp (Tis)
 * @since 15-02-2020, 8:08 PM
 */
@Data
@Entity
@Table(name = "STUDENT")
public class Student {

  @Id
  @Column(name = "ID")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "NAME")
  private String name;

  @Column(name = "PASSPORT_NUMBER")
  private String passportNumber;

}
