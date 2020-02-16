package com.tisstp.example.securitydemo.domain.repositories;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.query.NativeQuery;
import org.hibernate.type.LongType;
import org.hibernate.type.StringType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.tisstp.example.securitydemo.domain.entities.Student;
import com.tisstp.example.securitydemo.utilities.repository.RepoPager;
import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 16-02-2020, 3:38 PM
 */
@Log4j2
@Repository
public class StudentRepositoryCustomImpl implements StudentRepositoryCustom {

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  public Page<Student> searchStudentForNative(Student req, Pageable pageable) {
    Page<Student> page = new PageImpl<>(Collections.emptyList(), pageable, 0);;
    StringBuilder sql = new StringBuilder();

    sql.append("SELECT  "
      + " s.id, "
      + " s.name, "
      + " s.passport_number as passportNumber "
      + "FROM STUDENT s ");

    try {
      RepoPager<Student> pager = new RepoPager<>(entityManager, sql, pageable) {
        @Override
        protected void setAllowOrderBy(Map<String, String> fields) {
          fields.put("id", "s.id");
          fields.put("name", "s.name");
          fields.put("passportNumber", "s.passport_number");
        }

        @Override
        protected void setConditions() {

        }

        @Override
        protected void setScalars(NativeQuery unwrap) {
          unwrap.addScalar("id", LongType.INSTANCE);
          unwrap.addScalar("name", StringType.INSTANCE);
          unwrap.addScalar("passportNumber", StringType.INSTANCE);
        }
      };

      page = pager.getPage();
    } catch (Exception ex) {
      log.error(String.format("[Parameter]: %s", req));
      log.error(String.format("[Query]: %s", sql.toString()));
      log.error(String.format("An error occurred: %s, Stack trace is:", ex.getMessage()), ex);
    }
    return page;
  }

}
