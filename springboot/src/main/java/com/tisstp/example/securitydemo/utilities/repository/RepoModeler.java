package com.tisstp.example.securitydemo.utilities.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;

import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 28-01-2020, 6:01 PM
 */
@Log4j2
public abstract class RepoModeler<T> extends RepoBase<T> {

  private List<T> contents;

  public RepoModeler(EntityManager entityManager, StringBuilder sql) {
    super(entityManager, sql);
    this.setConditions();
    this.execute();
  }

  @Override
  protected void execute() {
    try {
      String sqlContent = sql.toString();
      Query querySelect = entityManager.createNativeQuery(sqlContent);
      NativeQuery unwrap = querySelect.unwrap(NativeQuery.class);
      setScalars(unwrap);
      unwrap.setResultTransformer(Transformers.aliasToBean(genericType));
      setParameters(querySelect);
      log.debug(String.format("[SQL Query] Select: %s", sqlContent));
      contents = querySelect.getResultList();
      log.debug(String.format("[Content] Select Size: %s", contents.size()));
    } catch (PersistenceException ex) {
      log.error(String.format("An error occurred: %s, Stack trace is:", ex.getMessage()), ex);
    }
  }

  public T getContentFirst() {
    if (!contents.isEmpty()) {
      return contents.get(0);
    }
    return null;
  }

  public List<T> getContents() {
    return contents;
  }
}
