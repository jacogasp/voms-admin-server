/**
 * Copyright (c) Istituto Nazionale di Fisica Nucleare (INFN). 2006-2016
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.glite.security.voms.admin.integration.orgdb.dao;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

import org.glite.security.voms.admin.integration.orgdb.database.OrgDBSessionFactory;
import org.glite.security.voms.admin.persistence.dao.generic.GenericDAO;
import org.hibernate.Criteria;
import org.hibernate.LockMode;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Implements the generic CRUD data access operations using Hibernate APIs.
 * <p>
 * To write a DAO, subclass and parameterize this class with your persistent
 * class. Of course, assuming that you have a traditional 1:1 appraoch for
 * Entity:DAO design.
 * <p>
 * You have to inject a current Hibernate <tt>Session</tt> to use a DAO.
 * Otherwise, this generic implementation will use
 * <tt>HibernateUtil.getSessionFactory()</tt> to obtain the curren
 * <tt>Session</tt>.
 * 
 * @see OrgDBHibernateDAOFactory
 * 
 * @author Christian Bauer
 */
public abstract class OrgDBGenericHibernateDAO<T, ID extends Serializable>
  implements GenericDAO<T, ID> {

  private static final Logger LOG = LoggerFactory
    .getLogger(OrgDBGenericHibernateDAO.class);
  
  private Class<T> persistentClass;
  private Session session;

  @SuppressWarnings("unchecked")
  public OrgDBGenericHibernateDAO() {

    this.persistentClass = (Class<T>) ((ParameterizedType) getClass()
      .getGenericSuperclass()).getActualTypeArguments()[0];

    startTransactionIfNedded();
  }

  private void startTransactionIfNedded() {

    Transaction tx = getSession().getTransaction();
    
    if (tx == null){
      LOG.debug("No transaction found in session. Starting one");
      session.beginTransaction();
      return;
    }
    
    if (tx.isActive()){
      LOG.debug("Found active transaction in session, will do nothing");
      return;
    } else {
      LOG.debug("Found inactive transaction in session, starting it");
      tx.begin();
    }
    
    
  }

  public void setSession(Session s) {

    this.session = s;
  }

  protected Session getSession() {

    if (session != null)
      return session;

    if (OrgDBSessionFactory.getSessionFactory()
      .getCurrentSession() != null){
      return OrgDBSessionFactory.getSessionFactory()
        .getCurrentSession();
    }
    
    return OrgDBSessionFactory.getSessionFactory()
      .openSession();

  }

  public Class<T> getPersistentClass() {

    return persistentClass;
  }

  @SuppressWarnings("unchecked")
  public T findById(ID id, boolean lock) {

    T entity;
    if (lock)
      entity = (T) getSession().get(getPersistentClass(), id, LockMode.UPGRADE);
    else
      entity = (T) getSession().get(getPersistentClass(), id);

    return entity;
  }

  public List<T> findAll() {

    return findByCriteria();
  }

  @SuppressWarnings("unchecked")
  public List<T> findByExample(T exampleInstance, String... excludeProperty) {

    Criteria crit = getSession().createCriteria(getPersistentClass());
    Example example = Example.create(exampleInstance);
    for (String exclude : excludeProperty) {
      example.excludeProperty(exclude);
    }
    crit.add(example);
    return crit.list();
  }

  public T makePersistent(T entity) {

    getSession().saveOrUpdate(entity);
    return entity;
  }

  public void makeTransient(T entity) {

    getSession().delete(entity);
  }

  public void flush() {

    getSession().flush();
  }

  public void clear() {

    getSession().clear();
  }

  /**
   * Use this inside subclasses as a convenience method.
   */
  @SuppressWarnings("unchecked")
  protected List<T> findByCriteria(Criterion... criterion) {

    Criteria crit = getSession().createCriteria(getPersistentClass());
    for (Criterion c : criterion) {
      crit.add(c);
    }
    return crit.list();
  }

}