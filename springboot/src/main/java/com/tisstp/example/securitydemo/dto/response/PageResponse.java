package com.tisstp.example.securitydemo.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

/**
 * @author sathaphorn.stp (Tis)
 * @since 09-01-2020, 12:12 PM
 */
@Setter
@Getter
@ToString
@NoArgsConstructor
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class PageResponse<T> {

  private List<T> content;
  private int numberOfElements;
  private int pageNumber;
  private int pageSize;
  private long totalElements;
  private int totalPages;

}
