package com.tisstp.example.securitydemo.dto.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

/**
 * @author sathaphorn.stp (Tis)
 * @since 10-01-2020, 11:47 PM
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {

  private String firstName;
  private String lastName;
  private String fullName;

}
