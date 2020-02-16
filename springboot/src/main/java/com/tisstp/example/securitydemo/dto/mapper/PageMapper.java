package com.tisstp.example.securitydemo.dto.mapper;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.tisstp.example.securitydemo.dto.response.PageResponse;


/**
 * @author sathaphorn.stp (Tis)
 * @since 09-01-2020, 12:14 PM
 */
@Component
public class PageMapper {

  public static <T> PageResponse<T> toPageResponse(Page<T> page) {
    return new PageResponse<T>()
        .setTotalPages(page.getTotalPages())
        .setTotalElements(page.getTotalElements())
        .setPageNumber(page.getNumber())
        .setPageSize(page.getSize())
        .setNumberOfElements(page.getNumberOfElements())
        .setContent(page.getContent());
  }

}
