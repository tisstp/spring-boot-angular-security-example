package com.tisstp.example.securitydemo.dto.mapper;

import com.tisstp.example.securitydemo.dto.model.UserDto;
import com.tisstp.example.securitydemo.dto.request.UserRequest;

/**
 * @author sathaphorn.stp (Tis)
 * @since 10-01-2020, 11:55 PM
 */
public class UserMapper {

  public static UserDto toUserDto(UserRequest user) {
    return new UserDto()
      .setFullName(String.format("%s %s", user.getName(), user.getSurname()))
      .setFirstName(user.getName())
      .setLastName(user.getSurname());
  }

}
