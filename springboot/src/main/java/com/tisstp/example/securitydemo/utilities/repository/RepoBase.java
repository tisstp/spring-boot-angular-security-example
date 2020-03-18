package com.tisstp.example.securitydemo.utilities.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.apache.commons.lang.StringUtils;
import org.hibernate.query.NativeQuery;
import org.springframework.core.GenericTypeResolver;

import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 28-01-2020, 6:10 PM
 */
@Log4j2
public abstract class RepoBase<T> {

  protected final Class<T> genericType;
  protected EntityManager entityManager;
  protected Map<String, Object> parameters;
  protected StringBuilder sql;
  protected StringBuilder sqlCondition;

  public RepoBase(EntityManager entityManager, StringBuilder sql) {
    this.genericType = (Class<T>) GenericTypeResolver
        .resolveTypeArgument(getClass(), RepoBase.class);
    this.entityManager = entityManager;
    this.sql = sql;
    this.sqlCondition = new StringBuilder();
    this.parameters = new HashMap<>();
  }

  protected abstract void execute();

  protected boolean isNotBlank(String value) {
    return StringUtils.isNotBlank(value);
  }

  protected boolean isNotNull(Object value) {
    return value != null;
  }

  protected void putParameter(String key, Object value) {
    parameters.put(key, value);
  }

  /**
   * sqlAppend("AND columnName = :cName");
   * putParameter("cName", Object);
   */
  protected abstract void setConditions();

  protected void setParameters(Query query) {
    for (Map.Entry<String, Object> entry : parameters.entrySet()) {
      Object value = entry.getValue();
      if (value instanceof List) {
        if (((List) value).isEmpty()) {
          value = null;
        }
      }
      log.debug(String.format("setParameter Key: %s, Value: %s", entry.getKey(), value));
      query.setParameter(entry.getKey(), value);
    }
  }

  /**
   * example: unwrap.addScalar("policyNo", StringType.INSTANCE);
   *
   * @param unwrap set bean, model, dto.
   */
  protected abstract void setScalars(NativeQuery unwrap);

  protected void sqlAppend(String sqlCondition) {
    this.sqlCondition.append(" ");
    this.sqlCondition.append(sqlCondition.trim());
    this.sqlCondition.append(" ");
  }


}
