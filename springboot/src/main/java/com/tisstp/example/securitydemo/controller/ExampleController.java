package com.tisstp.example.securitydemo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tisstp.example.securitydemo.dto.mapper.UserMapper;
import com.tisstp.example.securitydemo.dto.model.UserDto;
import com.tisstp.example.securitydemo.dto.request.UserRequest;
import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 10-01-2020, 11:35 PM
 */
@Log4j2
@RestController
public class ExampleController {

  @PostMapping("/example")
  @ResponseBody
  @PreAuthorize("hasRole('ROLE_USER')")
  public ResponseEntity<UserDto> example(@RequestBody UserRequest request) {
    log.debug("Example: Start");
    log.debug(request);
    return ResponseEntity.ok(UserMapper.toUserDto(request));
  }

}
