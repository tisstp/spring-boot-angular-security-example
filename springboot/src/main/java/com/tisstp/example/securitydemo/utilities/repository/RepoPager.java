package com.tisstp.example.securitydemo.utilities.repository;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 22-01-2020, 10:03 PM
 */
@Log4j2
public abstract class RepoPager<T> extends RepoBase<T> {

  private Page<T> page;
  private Pageable pageable;

  protected RepoPager(EntityManager entityManager, StringBuilder sql) {
    this(entityManager, sql, Pageable.unpaged());
  }

  public RepoPager(EntityManager entityManager, StringBuilder sql, Pageable pageable) {
    super(entityManager, sql);
    this.setPageable(pageable);
    this.setConditions();
    this.execute();
  }

  @Override
  @SuppressWarnings("unchecked")
  protected void execute() {
    try {
      String sqlContent = sql.toString();
      Query querySelect = entityManager.createNativeQuery(sqlContent);
      NativeQuery unwrap = querySelect.unwrap(NativeQuery.class);
      setScalars(unwrap);
      unwrap.getParameters();
      unwrap.setResultTransformer(Transformers.aliasToBean(genericType));
      setParameters(querySelect);

      String sqlCount = "select count(*) as total from (" + sql.toString() + ") tblCount";
      Query queryCount = entityManager.createNativeQuery(sqlCount);
      setParameters(queryCount);
      log.debug(String.format("[SQL Query] Select Count: %s", sqlCount));
      BigInteger total = (BigInteger) queryCount.getSingleResult();
      log.debug(String.format("[Result] Select Count: %s", total));

      if (pageable.isPaged()) {
        querySelect.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        querySelect.setMaxResults(pageable.getPageSize());
      }

      log.debug(String.format("[SQL Query] Select Content: %s", sqlContent));
      List<T> contents = querySelect.getResultList();
      log.debug(String.format("[Content] Size: %s", contents.size()));
      page = new PageImpl<>(contents, pageable, total.longValue());
    } catch (PersistenceException ex) {
      log.error(String.format("An error occurred: %s, Stack trace is:", ex.getMessage()), ex);
    }
  }

  public Page<T> getPage() {
    log.debug("Get Page");
    return page;
  }

  protected void setPageable(Pageable pageable) {
    this.pageable = pageable != null ? pageable : Pageable.unpaged();
  }

}
