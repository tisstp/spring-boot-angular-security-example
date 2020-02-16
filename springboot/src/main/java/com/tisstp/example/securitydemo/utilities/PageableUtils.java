package com.tisstp.example.securitydemo.utilities;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;

import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 16-02-2020, 5:12 PM
 */
@Log4j2
public class PageableUtils {

  /**
   * @param pageable Pageable object to modify
   * @param fields Field which will map property on sort
   * @return Modified Pageable
   */
  public static Pageable modifiedPageable(Pageable pageable, Map<String, String> fields) {
    List<Order> modifiedSort = new ArrayList<>();

    if (pageable.getSort().isSorted()) {
      pageable.getSort().get().forEach(order -> {
        if (fields != null && fields.containsKey(order.getProperty())) {
          modifiedSort.add(new Order(order.getDirection(), fields.get(order.getProperty())));
        } else {
          // default
          modifiedSort.add(order);
        }
      });
    }

    Sort sort;
    if (modifiedSort.isEmpty()) {
      sort = Sort.unsorted();
    } else {
      sort = Sort.by(modifiedSort);
    }

    return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
  }

}
