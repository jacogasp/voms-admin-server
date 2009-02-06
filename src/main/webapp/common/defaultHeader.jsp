<%--
 Copyright (c) Members of the EGEE Collaboration. 2006.
 See http://www.eu-egee.org/partners/ for details on the copyright
 holders.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 Authors:
     Andrea Ceccanti - andrea.ceccanti@cnaf.infn.it
--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://org.glite.security.voms.tags" prefix="voms"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>


<div id="headerTitle">
	<div id="vaInfo">
		<table cellpadding="0" cellspacing="0" width="100%">
			<tr>
				<td valign="bottom" width="25%">
					<html:link forward="manageUsers">
						<html:img page="/img/va-logo.png" style="float:left;"/>
					</html:link>
				</td>
				<td align="left" valign="bottom" style="padding-left: .5em;">
					for VO:<span id="voName" style="padding-left:.5em">${voName}</span>
				</td>			
				<td align="right" valign="bottom" style="padding-left: .5em;">Current user:
								<span id='adminDN' title="${currentAdmin.realSubject}" style="padding-left:.5em">
									<voms:formatDN dn="${currentAdmin.realSubject}" fields="CN"/>
								</span>
				</td>
			</tr>
		</table>
	</div>
</div>




