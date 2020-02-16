package com.tisstp.example.securitydemo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 16-02-2020, 2:43 PM
 */
@Log4j2
@RestController
@RequestMapping("/sql-native")
public class DbSqlNativeExampleController {


  @PostMapping("/test")
  public ResponseEntity<?> test() {
    log.debug("Method test of Class DbSqlNativeExampleController: start.");
    return ResponseEntity.ok(true);
  }

}
