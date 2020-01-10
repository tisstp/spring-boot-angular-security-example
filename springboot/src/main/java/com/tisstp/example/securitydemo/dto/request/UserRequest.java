package com.tisstp.example.securitydemo.dto.request;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author sathaphorn.stp (Tis)
 * @since 10-01-2020, 11:48 PM
 */
@Data
@Accessors(chain = true)
public class UserRequest {

  private String name;
  private String surname;

}
