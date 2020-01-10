package com.tisstp.example.securitydemo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tisstp.example.securitydemo.dto.mapper.UserMapper;
import com.tisstp.example.securitydemo.dto.model.UserDto;
import com.tisstp.example.securitydemo.dto.request.UserRequest;

/**
 * @author sathaphorn.stp (Tis)
 * @since 10-01-2020, 11:35 PM
 */
@RestController
public class ExampleController {

  @PostMapping("/example")
  @ResponseBody
  public ResponseEntity<UserDto> example(@RequestBody UserRequest request) {
    return ResponseEntity.ok(UserMapper.toUserDto(request));
  }

}
