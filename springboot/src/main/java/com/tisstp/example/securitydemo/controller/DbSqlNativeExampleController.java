package com.tisstp.example.securitydemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tisstp.example.securitydemo.domain.entities.Student;
import com.tisstp.example.securitydemo.dto.mapper.PageMapper;
import com.tisstp.example.securitydemo.dto.response.PageResponse;
import com.tisstp.example.securitydemo.service.StudentService;
import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 16-02-2020, 2:43 PM
 */
@Log4j2
@RestController
@RequestMapping("/sql-native")
public class DbSqlNativeExampleController {

  @Autowired
  private StudentService studentService;

  @PostMapping("/test")
  public ResponseEntity<PageResponse<Student>> test(@RequestBody(required = false) Student req, Pageable pageable) {
    log.debug("Method test of Class DbSqlNativeExampleController: start.");
    log.debug("Request: {}", req);
    log.debug("Pageable: {}", pageable);
    Page<Student> students = studentService.searchStudent(req, pageable);
    PageResponse<Student> response = PageMapper.toPageResponse(students);
    return ResponseEntity.ok(response);
  }

}
