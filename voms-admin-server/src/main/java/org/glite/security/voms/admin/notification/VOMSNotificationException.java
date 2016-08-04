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
package org.glite.security.voms.admin.notification;

import org.glite.security.voms.admin.error.VOMSException;

public class VOMSNotificationException extends VOMSException {

  /**
	 * 
	 */
  private static final long serialVersionUID = 1L;

  public VOMSNotificationException(String message) {

    super(message);
  }

  public VOMSNotificationException(String message, Throwable t) {

    super(message, t);
  }

  public VOMSNotificationException(Throwable t) {

    super(t);
  }

}
