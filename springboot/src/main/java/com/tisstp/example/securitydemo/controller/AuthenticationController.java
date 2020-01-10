package com.tisstp.example.securitydemo.controller;

import org.springframework.http.ResponseEntity;
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
public class AuthenticationController {

  @PostMapping("/auth")
  @ResponseBody
  public ResponseEntity<UserDto> auth(@RequestBody UserRequest request) {
    log.debug(String.format("name: %s", request.getName()));
    log.debug(String.format("surname: %s", request.getSurname()));
    return ResponseEntity.ok(UserMapper.toUserDto(request));
  }

}
