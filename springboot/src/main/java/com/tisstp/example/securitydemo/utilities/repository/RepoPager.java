package com.tisstp.example.securitydemo.utilities.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import lombok.extern.log4j.Log4j2;

/**
 * @author sathaphorn.stp (Tis)
 * @since 22-01-2020, 10:03 PM
 */
@Log4j2
public abstract class RepoPager<T> extends RepoBase<T> {

  private Page<T> page;
  private Pageable pageable;
  private Map<String, String> fields;

  protected RepoPager(EntityManager entityManager, StringBuilder sql) {
    this(entityManager, sql, Pageable.unpaged());
  }

  public RepoPager(EntityManager entityManager, StringBuilder sql, Pageable pageable) {
    super(entityManager, sql);
    this.fields = new HashMap<>();
    this.setPageable(pageable);
    this.setAllowOrderBy(this.fields);
    this.setConditions();
    this.execute();
  }

  @Override
  @SuppressWarnings("unchecked")
  protected void execute() {
    try {
      // region count records
      String orderBy = removeOrderByBeforeGetCountResult(sql);
      sql.append(sqlCondition);
      String sqlCount = "select count(*) as total from (" + sql.toString() + ") tblCount";
      Query queryCount = entityManager.createNativeQuery(sqlCount);
      setParameters(queryCount);
      log.debug("[SQL Query] Select Count: {}", sqlCount);
      Integer total = (Integer) queryCount.getSingleResult();
      log.debug("[Result] Select Count: {}", total);
      addOrderByAfterGetCountResult(sql, orderBy);
      // endregion

      // region content records
      String sqlContent = setOrderByFromSortColumn();
      Query querySelect = entityManager.createNativeQuery(sqlContent);
      NativeQuery unwrap = querySelect.unwrap(NativeQuery.class);
      setScalars(unwrap);
      unwrap.getParameters();
      unwrap.setResultTransformer(Transformers.aliasToBean(genericType));
      setParameters(querySelect);
      // endregion

      if (pageable.isPaged()) {
        querySelect.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        querySelect.setMaxResults(pageable.getPageSize());
      }

      log.debug("[SQL Query] Select Content: {}", sqlContent);
      List<T> contents = querySelect.getResultList();
      log.debug("[Content] Size: {}", contents.size());
      page = new PageImpl<>(contents, pageable, total.longValue());
    } catch (PersistenceException ex) {
      log.error(String.format("An error occurred: %s, Stack trace is:", ex.getMessage()), ex);
    }
  }

  private void addOrderByAfterGetCountResult(StringBuilder sql, String orderBy) {
    sql.append(orderBy);
  }

  private String removeOrderByBeforeGetCountResult(StringBuilder sql) {
    if (!checkAppendOrderBy()) {
      int index = sql.lastIndexOf("ORDER BY");
      if (index == -1) {
        index = sql.lastIndexOf("order by");
      }
      if (index == -1) {
        index = sql.lastIndexOf("ORDER by");
      }
      if (index == -1) {
        index = sql.lastIndexOf("order BY");
      }
      this.sql = new StringBuilder(sql.substring(0, index));
      return sql.substring(index);
    }
    return " ";
  }

  public Page<T> getPage() {
    log.debug("Get Page");
    return page;
  }

  protected void setAllowOrderBy(Map<String, String> fields) {
    // todo: implement.. default fields.
    // fields.put("field", "table.column");
  }

  private String setOrderByFromSortColumn() {
    String sqlNew;
    Sort sort = pageable.getSort();
    if (sort.isSorted() && fields != null && !fields.isEmpty()) {
      if (checkAppendOrderBy()) {
        sql.append(" ORDER BY ");
      } else {
        sql.append(", ");
      }
      sort.get().forEach(order -> {
        if (fields.containsKey(order.getProperty())) {
          String field = fields.get(order.getProperty());
          sql.append(field);
          sql.append(" ");
          sql.append(order.getDirection());
          sql.append(", ");
        }
      });
      sqlNew = sql.substring(0, sql.lastIndexOf(", "));
    } else {
      sqlNew = sql.toString();
    }
    return sqlNew;
  }

  protected void setPageable(Pageable pageable) {
    this.pageable = pageable != null ? pageable : Pageable.unpaged();
  }

  private boolean checkAppendOrderBy() {
    return sql.lastIndexOf("ORDER BY") == -1
      && sql.lastIndexOf("order by") == -1
      && sql.lastIndexOf("ORDER by") == -1
      && sql.lastIndexOf("order BY") == -1;
  }

}
