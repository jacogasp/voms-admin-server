/**
 * Copyright (c) Istituto Nazionale di Fisica Nucleare (INFN). 2006-2015
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
package org.glite.security.voms.admin.api.attributes;

import org.glite.security.voms.admin.api.User;
import org.glite.security.voms.admin.api.VOMSException;

/**
 * This service defines methods for managing VOMS generic attributes.
 * 
 * Generic attributes (GA), from the point of view of applications, are (name,
 * value) pairs that can be assigned to VO users and that end up in the
 * attribute certificate and SAML assertions issued by VOMS.
 * 
 * GAs can be defined also at the group and role level. What happens then is
 * that such GA will be valid for all users belonging to the group or role and
 * will end up in Attribute Certificate or SAML assertions generated by VOMS.
 * 
 * The GA concept is modeled in VOMS by two classes:
 * 
 * <ul>
 * <li> {@link AttributeClass}, which is used to define name, description and
 * other checks made on GAs</li>
 * <li> {@link AttributeValue}, which is used to represent the actual GA value
 * and scope</li>
 * </ul>
 * 
 * 
 * @author <a href="mailto:andrea.ceccanti@cnaf.infn.it">Andrea Ceccanti</a>
 *
 */
public interface VOMSAttributes {

  /**
   * 
   * Creates a new attribute class.
   * 
   * @param name
   *          the name of the attribute
   * 
   * @param description
   *          a description associated to the attribute
   * 
   * @param uniquenessChecked
   *          a flag that enables the uniqueness checking of attribute values
   *          between users.
   * 
   * @throws VOMSException
   *           if something goes wrong.
   */
  public void createAttributeClass(String name, String description,
    boolean uniquenessChecked) throws VOMSException;

  /**
   * Creates a new attribute class.
   * 
   * @param name
   *          the name of the attribute
   * 
   * @param description
   *          a description associated with the attribute
   * 
   * @throws VOMSException
   *           if something goes wrong
   */
  public void createAttributeClass(String name, String description)
    throws VOMSException;

  /**
   * Creates a new attribute class.
   * 
   * @param name
   *          the name of the attribute
   * 
   * @throws VOMSException
   *           if something goes wrong
   */
  public void createAttributeClass(String name) throws VOMSException;

  /**
   * Returns an attribute class given its name.
   * 
   * @param name
   *          An attribute class name
   * 
   * @return Returns the {@link AttributeClass} with the given name,
   *         <code>null</code> if no attribute class is found with the name
   *         passed as argument
   * 
   * @throws VOMSException
   *           if something goes wrong
   */
  public AttributeClass getAttributeClass(String name) throws VOMSException;

  /**
   * Saves {@link AttributeClass} information in the VOMS database.
   * 
   * @param attributeClass
   *          the {@link AttributeClass} object to be saved.
   * 
   * @throws VOMSException
   *           if something goes wrong
   */
  public void saveAttributeClass(AttributeClass attributeClass)
    throws VOMSException;

  /**
   * Removes an {@link AttributeClass} by name from the VOMS database.
   * 
   * @param name
   *          the name of the {@link AttributeClass} to be removed.
   * 
   * @throws VOMSException
   *           if something goes wrong.
   * 
   */
  public void deleteAttributeClass(String name) throws VOMSException;

  /**
   * Removes an {@link AttributeClass} from the VOMS database.
   * 
   * @param attributeClass
   *          the {@link AttributeClass} to be removed.
   * 
   * @throws VOMSException
   *           if something goes wrong.
   */
  public void deleteAttributeClass(AttributeClass attributeClass)
    throws VOMSException;

  /**
   * Returns an array of {@link AttributeClass} defined in the VOMS database.
   * 
   * @return
   * @throws VOMSException
   */
  public AttributeClass[] listAttributeClasses() throws VOMSException;

  /**
   * Returns an array of {@link AttributeValue} defined for a given User
   * 
   * @param user
   * @return
   * @throws VOMSException
   */
  public AttributeValue[] listUserAttributes(User user) throws VOMSException;

  /**
   * Sets the value of an attribute for a given user.
   * 
   * @param user
   *          the VOMS user
   * 
   * @param attributeValue
   *          The {@link AttributeValue} that defines the attribute value to be
   *          assigned to the user.
   * 
   * @throws VOMSException
   */
  public void setUserAttribute(User user, AttributeValue attributeValue)
    throws VOMSException;

  /**
   * Deletes an attribute for a given user by name.
   * 
   * @param user
   *          the VOMS user
   * 
   * @param attributeName
   *          the name of the attribute to be deleted.
   * 
   * @throws VOMSException
   */
  public void deleteUserAttribute(User user, String attributeName)
    throws VOMSException;

  /**
   * Deletes an attribute for a given user.
   * 
   * @param user
   *          the VOMS user
   * 
   * @param attributeValue
   *          the {@link AttributeValue} to be deleted.
   * 
   * @throws VOMSException
   */
  public void deleteUserAttribute(User user, AttributeValue attributeValue)
    throws VOMSException;

  /**
   * Sets an attribute for a given VOMS group.
   * 
   * @param groupName
   *          the name of the VOMS group for which the attribute will be set.
   * 
   * @param attributeValue
   *          The {@link AttributeValue} that defines the attribute value to be
   *          assigned to the group.
   * 
   * @throws VOMSException
   */
  public void setGroupAttribute(String groupName, AttributeValue attributeValue)
    throws VOMSException;

  /**
   * Deletes a group attribute by name
   * 
   * @param groupName
   *          the name of the VOMS group for which the attribute will be
   *          deleted.
   * 
   * @param attributeName
   *          the name of the attribute to be deleted.
   * 
   * @throws VOMSException
   */
  public void deleteGroupAttribute(String groupName, String attributeName)
    throws VOMSException;

  /**
   * 
   * Deletes a group attribute.
   * 
   * @param groupName
   *          the name of the VOMS group for which the attribute will be
   *          deleted.
   * 
   * @param attributeValue
   *          the {@link AttributeValue} to be deleted.
   * 
   * @throws VOMSException
   */
  public void deleteGroupAttribute(String groupName,
    AttributeValue attributeValue) throws VOMSException;

  /**
   * Returns an array of {@link AttributeValue} defined for a group.
   * 
   * @param groupName
   *          The name of the VOMS group
   * 
   * @return an array of {@link AttributeValue} objects, <code>null</code> if no
   *         attributes are defined for the group
   * 
   * @throws VOMSException
   */
  public AttributeValue[] listGroupAttributes(String groupName)
    throws VOMSException;

  /**
   * Sets an attribute for a given VOMS role.
   * 
   * @param groupName
   *          The name of the VOMS group the role is scoped to.
   * 
   * @param roleName
   *          The name of the VOMS role
   * 
   * @param attributeValue
   *          the {@link AttributeValue} to be set.
   * 
   * @throws VOMSException
   */
  public void setRoleAttribute(String groupName, String roleName,
    AttributeValue attributeValue) throws VOMSException;

  /**
   * Deletes an attribute from a role.
   * 
   * @param groupName
   *          The name of the VOMS group the role is scoped to.
   * 
   * @param roleName
   *          The name of the VOMS role.
   * 
   * @param attrName
   *          The name of the attribute to be deleted.
   * 
   * @throws VOMSException
   */
  public void deleteRoleAttribute(String groupName, String roleName,
    String attrName) throws VOMSException;

  /**
   * Deletes an attribute from a role.
   * 
   * 
   * @param groupName
   *          The name of the VOMS group the role is scoped to.
   * 
   * @param roleName
   *          The name of the VOMS role.
   * 
   * @param attributeValue
   *          the {@link AttributeValue} to be deleted.
   * 
   * @throws VOMSException
   */
  public void deleteRoleAttribute(String groupName, String roleName,
    AttributeValue attributeValue) throws VOMSException;

  /**
   * Returns an array of {@link AttributeValue} defined for a given role
   * 
   * @param groupName
   *          The name of the VOMS group the role is scoped to.
   * 
   * @param roleName
   *          The name of the VOMS role.
   * 
   * @return an array of {@link AttributeValue} objects, <code>null</code> if no
   *         attributes are defined for the role
   * 
   * @throws VOMSException
   */
  public AttributeValue[] listRoleAttributes(String groupName, String roleName)
    throws VOMSException;

}
