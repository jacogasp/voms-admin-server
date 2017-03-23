/*
 * Copyright (c) Members of the EGEE Collaboration. 2006-2009.
 * See http://www.eu-egee.org/partners/ for details on the copyright holders.
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
 *
 * Authors:
 * 	Andrea Ceccanti (INFN)
 */

function vomsErrorMessage(node, text){

	$(node).prepend("<div class='errorMessage'>"+text+"</div>");

}
function hideIfNoPermission(node, gid, rid, perms){

	var permActionURL = ajaxBaseURL +"permission.action";
	var params = {groupId : gid, permissionString: perms};

	if (rid != null){
		params['rid'] = rid;
	}

	jQuery.getJSON(permActionURL, params, function(data, status){
		if (status != "success")
			alert('Error executing ajax call... panel status will not be persistent across calls to the server.');
		else{
			if (! data.hasPermission){
				$(node).hide();
			}else{
				$(node).show();
			}
		}
	});

}

function disableIfNoPermission(node,gid,rid,perms){

	var permActionURL = ajaxBaseURL +"permission.action";
	var params = {groupId : gid, permissionString: perms};

	if (rid != null){
		params['rid'] = rid;
	}

	jQuery.getJSON(permActionURL, params, function(data, status){
		if (status != "success")
			alert('Error executing ajax call... panel status will not be persistent across calls to the server.');
		else{
			if (! data.hasPermission){
				$(node).prop('disabled', 'disabled');
			}else{
				$(node).prop('disabled','');
			}
		}
	});

}

function enableAddToGroupForm(){

	$('#add-to-group').map(function(){

		var gid = $(this).find('[name="groupId"]').val();
		disableIfNoPermission($(this).find(':submit'), gid, null, 'CONTAINER_READ|MEMBERSHIP_READ|MEMBERSHIP_WRITE');

		return this;
	});
}

function enableDeleteRoleAttributeForms(){

	$('form.deleteRoleAttributeForm').map(function(){

		var gid = $(this).find('[name="groupId"]').val();
		var rid = $(this).find('[name="roleId"]').val();

		disableIfNoPermission($(this).find(':submit'), gid, rid, 'ATTRIBUTES_READ|ATTRIBUTES_WRITE');

		return this;

	});
}

function enableSetRoleAttributeForm(){

	$('#setRoleAttributeForm').map(function(){

		var gid = $(this).find('[name="groupId"]').val();
		var rid = $(this).find('[name="roleId"]').val();

		disableIfNoPermission($(this).find(':submit'), gid, rid, 'ATTRIBUTES_READ|ATTRIBUTES_WRITE');

		return this;
	});

}

function ajaxSubmit(formNode, outputPanelId){

	var url = $(formNode).prop('action');
	var params = $(formNode).serializeArray();
	console.log(params);

	if (url == undefined){
		// Should log something to the javascript console
		return;
	}

	ajaxLoad(outputPanelId,url,params);
}


function updateCSRFToken(lastPaneId){

	var lastTokenValue = $('#'+lastPaneId).find('[name="struts.token"]').val();

	if (lastTokenValue != undefined){

		$('input[name="struts.token"]').prop('value', lastTokenValue);
	}
}

function ajaxLoad(id, url, params){

	function completeLoadFunction(responseText, textStatus, req) {
		if (textStatus == 'error'){
			alert("Error executing ajax request!");
			$(this).html(responseText);
		}

		eyeCandy();
		updateCSRFToken(id);
		
		$('#loadDiv').hide();
		$('#'+id+' div.reloadable').fadeTo(50,1.00);
		
	}
	
	$('#loadDiv').show();

	$('#'+id+' div.reloadable').fadeTo(50,0.30);
	
	

	$('#'+id).load(url, params, completeLoadFunction);
}





function blinkBackground(node){
	var bgColor = $(node).css('background-color');

	$(node).animate({ backgroundColor: '#FFF58F'},50, null, function(){
		$(this).animate({ backgroundColor: bgColor},180);});

}

function eyeCandy(){

	formattedDNMagic();

	$('input:text.registrationField, textarea[readonly!=readonly].registrationField').focus(function(){

		$(this).addClass("activeTextField");
	});

	$('input:text.registrationField, textarea[readonly!=readonly].registrationField').blur(function(){

		$(this).removeClass("activeTextField");
	});


	$('.panelButton').click( function(){
		$(this).parent().find('.panelContent').toggle();
	});

	// $('input[type="submit"]').addClass('submitButton');

	$('*[readonly="readonly"]').addClass('readOnly');

	$('select').addClass('selectBox');

	enableSetRoleAttributeForm();
	enableDeleteRoleAttributeForms();


	$('input.checkboxError').wrap("<span class='checkboxValidationError'></span>");

	$('ul.message li').click(function(){
		$(this).fadeOut('normal');
	});

	$('ul.actionError li').click(function(){
		$(this).fadeOut('normal');
	});

	$('#userSelectorTrigger').change(function(){

		var checked = $(this).prop("checked");
		$('.userCheckbox').prop("checked", checked);

		$('.userCheckbox').change();

	});

	$('.userCheckbox').change(function(){

		var checked = $(this).prop("checked");
		if (checked)
			$(this).closest('tr').addClass('userSelected');
		else
			$(this).closest('tr').removeClass('userSelected');
	});


}

function countSelectedUsers(){
	return $('.userCheckbox:checked').size();
}
function showAUPContent(node){

	var aupText = $(node).next().text();
	$('#aclShowTextArea').val(aupText);
}


function initializePanelHeaders(){

	$('.info-tab h2').click(function(){

		var node =  $(this).next();
		node.toggle();

		var visible = $(node).is(':visible');
		var panelId = $(node).prop('id');

		jQuery.getJSON(ajaxBaseURL+'store.action', {panelId:panelId, visible:visible}, function(data, status){
			if (status != "success")
				alert('Error executing ajax call... panel status will not be persistent across calls to the server.');
		});

	});

}

function aclEntryStuff(){

	/** ACL entry selection code **/
	$('.entryType').hide();
	$('#'+$('.aclEntrySelector').val()).show();

	$('.aclEntrySelector').change( function(){

		var selectedEntry = $(this).val();
		$('.entryType:visible').hide();
		$('#'+selectedEntry).show();

	});


	$('#allPermissionHandle').click(function(){
		$('.permissionCheckbox').prop("checked", true);
		return false;
	});

	$('#noPermissionHandle').click(function(){
		$('.permissionCheckbox').prop("checked", false);
		return false;
	});

	$('#browsePermissionHandle').click(function(){
		$('.permissionCheckbox').prop("checked", false);

		$('.permissionCheckbox[value="CONTAINER_READ"]').prop("checked", true);
		$('.permissionCheckbox[value="MEMBERSHIP_READ"]').prop("checked", true);
		return false;
	});


	function checkPermissions(prefix){
		$('.permissionCheckbox[value^="'+prefix+'"]').map(function(){
			if ($(this).is(':checked'))
				$(this).prop('checked', false);
			else
				$(this).prop('checked', true);

			return this;
		})
	}

	$('#containerHandle').click(function(){
		checkPermissions('CONTAINER');
	});

	$('#membershipHandle').click(function(){
		checkPermissions('MEMBERSHIP');
	});

	$('#aclHandle').click(function(){
		checkPermissions('ACL');
	});
	$('#gaHandle').click(function(){
		checkPermissions('ATTRIBUTES');
	});

	$('#piHandle').click(function(){
		checkPermissions('PERSONAL_INFO');
	});

	$('#reqHandle').click(function(){
		checkPermissions('REQUESTS');
	});

	$('#suspendHandle').click(function(){
		checkPermissions('SUSPEND');
	});

	$('#propagateHandle').click(function(){
		$('#propagateCheckbox').click();
	});


	$('tr.borderTop').css('border-top','2px solid rgb(200,200,200)');
	$('tr.clickable').css('border-top','1px solid rgb(200,200,200)');

	$('tr.borderBottom').css('border-bottom','2px solid rgb(200,200,200)');

	ajaxSubmit($('#aclSelectionForm').map(function(){return this;}),'aclShowPane');

	var roleSelectVal = $('#aclRoleSelector').val();

	if (roleSelectVal != undefined && roleSelectVal != -1)
		$('#defaultACLSelector').prop('disabled','disabled');

	$('#aclRoleSelector').change(function(){
			var val = $(this).val();

			if (val != -1){
				$('#defaultACLSelector').prop('disabled','disabled');
				$('#defaultACLSelector').prop('checked','');
			}
			else
				$('#defaultACLSelector').prop('disabled','');
	});

	$('#showACLHelpHandle').click(function(){
		$(this).fadeTo('fast',.8);
		$('#aclHelp').slideToggle('fast', function(){

			if ($(this).is(':visible'))
				$('#showACLHelpHandle').text('Hide help');
			else
				$('#showACLHelpHandle').text('Show help');

			$('#showACLHelpHandle').fadeTo('fast',1);

		});
	});

}

function formattedDNMagic(){

	$('div.formattedDN').click(function(){
		$('span',this).toggle();
	});

	$('#toggleFormattedDNsHandle').click(function(){
		$('div.formattedDN').click();
	});
}


function pageSetup(){

	$('#loadDiv').hide();

	initializePanelHeaders();

	eyeCandy();

	aclEntryStuff();
}



function openSuspendDialog(node, dialogId, text){

	$('#'+dialogId+' .alert-error').hide();
	var formInputElem = '#'+dialogId + "_suspensionReasonInputField";
	$(formInputElem).val('');
	
	if ($(node).is(':submit')){

		confirmFunc = function(){

			var formInputElem = '#'+dialogId + "_suspensionReasonInputField";
			var suspensionReason = $(formInputElem).val();
			
			if (suspensionReason === ''){
				$('#'+dialogId+' .alert-error').show();
				return false;
			}

			var form = $(node).closest('form');

			setFormActionFromSubmitButton(form, node);

			form.append("<input type='hidden' name='suspensionReason' value='"+suspensionReason+"'/>");

			if ($(node).prop('form').onsubmit != undefined){

				$(node).prop('form').onsubmit();
				$('#'+dialogId).dialog('destroy');
				return false;
				
			} else{
				form.submit();
			}
		};

	}else{

		var dest = $(node).prop('href');

		confirmFunc  = function(){
			window.location = dest;
		};
	}

	$('#'+dialogId+" .dialogMessage").text(text);

	$('#'+dialogId).dialog({resizable: false,
		width: 800,
		modal: true,
		closeOnEscape: true,
		autoOpen: false,
		overlay: {
		backgroundColor: '#000',
		opacity: 0.5},
		buttons: {
			'Confirm suspension?': confirmFunc,
			Cancel: function() {
				$(this).dialog('close');
				return false;
			}
		}
	});

	$('#'+dialogId).dialog('open');

	return false;

}

function setFormActionFromSubmitButton(formNode, submitButtonNode){

	var action = $(submitButtonNode).prop('name');

	if (action != undefined && action != ""){
		var actionName = action.substring(action.lastIndexOf(':')+1)+".action";
		var formAction = formNode.prop('action');
		var newActionStr = formAction.slice(0,formAction.lastIndexOf('/')+1)+actionName;
		formNode.prop('action', newActionStr);
	}
}


function openConfirmDialog(node,dialogId,text){

	if ($(node).is(':submit')){

		confirmFunc = function(){

			var form = $(node).closest('form');
			setFormActionFromSubmitButton(form, node);
			form.submit();
		};

	}else{

		var dest = $(node).prop('href');

		if (typeof dest === "undefined"){
			dest = $(node).prop('action');
		}

		confirmFunc  = function(){
			window.location = dest;
		};
	}


	$('#'+dialogId+" .dialogMessage").text(text);

	$('#'+dialogId).dialog({resizable: false,
		width: 600,
		modal: true,
		closeOnEscape: true,
		autoOpen: false,
		overlay: {
		backgroundColor: '#000',
		opacity: 0.5},
		buttons: {
			Confirm: confirmFunc,
			Cancel: function() {
				$(this).dialog('close');
			}
		}
	});

	$('#'+dialogId).dialog('open');

}

function openYesConfirmDialog(node, dialogId) {
	
	confirmFunc = function(){
		var form = $(node).closest('form');
		var reqText = $('#'+dialogId+' input').val();
		if (reqText.toLowerCase() == "yes") {
			form.submit();
			return true;
		}
		$('#'+dialogId+' .alert-error').show();
		return false;
	};
	
	$('#'+dialogId+' input').val("");
	$('#'+dialogId+' .alert-error').hide();
	
	$('#'+dialogId).dialog({resizable: false,
		width: 800,
		modal: true,
		closeOnEscape: true,
		autoOpen: false,
		overlay: {
		backgroundColor: '#000',
		opacity: 0.5},
		buttons: {
			Confirm: confirmFunc,
			Cancel: function() {
				$(this).dialog('close');
				return false;
			}
		}
	});
	
	$('#'+dialogId).dialog('open');
	$('#'+dialogId+' input').focus();
	return false;
	
}

function bulkRequestSetup(){

	$('#req-selector').click(function(e){
		var checked = $(this).prop("checked");
		var checkboxes = $('.req-checkbox');
		checkboxes.prop("checked", checked);

		var checkboxesChecked = checkboxes.is(":checked");
		if (checkboxesChecked) {
			$('.req-row').removeClass('req-row-noselect');
			$('.req-toolbar-btns').removeClass('req-toolbar-btns-hidden');
		}else {
			$('.req-row').addClass('req-row-noselect');
			$('.req-toolbar-btns').addClass('req-toolbar-btns-hidden');
		}
	});

	var checkboxes = $('.req-checkbox');

	checkboxes.click(function() {
		var checkboxesChecked = checkboxes.is(":checked");

		if (checkboxesChecked) {
			$('.req-row').removeClass('req-row-noselect');
			$('.req-toolbar-btns').removeClass('req-toolbar-btns-hidden');
		}else {
			$('.req-row').addClass('req-row-noselect');
			$('.req-toolbar-btns').addClass('req-toolbar-btns-hidden');
		}
	});


	$('.req-detail-trigger').click(function(e) {
		e.preventDefault();
		var detailNode = $(this).closest('td').find('.req-detail');
		if ($(detailNode).hasClass("req-detail-hidden")){
			$(this).text("hide info");
			$(detailNode).removeClass("req-detail-hidden");
		}else {
			$(this).text("more info");
			$(detailNode).addClass("req-detail-hidden");
		}
	});

	if ($('.req-row').size() < 2) {
		checkboxes.prop("disabled", true);
		$('#req-selector').prop("disabled", "disabled");
	}else {
		checkboxes.prop("disabled", false);
		$('#req-selector').removeAttr("disabled");
	}
}

function rejectRequestDialog(node, dialogId){

	if ($(node).is(':submit')){

		confirmFunc = function(){
			var form = $(node).closest('form');
			var motivation = $('#confirmRejectedRequestDialog_input').val();
			form.append("<input type='hidden' name='motivation' value='"+motivation+"'/>");
			setFormActionFromSubmitButton(form, node);
			form.submit();
		};
	}

	$('#confirmRejectedRequestDialog_input').val("");
	$('#'+dialogId).dialog({resizable: false,
		width: 800,
		modal: true,
		closeOnEscape: true,
		autoOpen: false,
		overlay: {
		backgroundColor: '#000',
		opacity: 0.5},
		buttons: {
			'Reject requests?': confirmFunc,
			Cancel: function() {
				$(this).dialog('close');
				return false;
			}
		}
	});

	$('#'+dialogId).dialog('open');
	$('#confirmRejectedRequestDialog_input').focus();

	return false;
};

function rejectSingleRequestDialog(submitNode, dialogId){

	if ($(submitNode).is(':submit')){

		confirmFunc = function(){
			var form = $(submitNode).closest('form');

			var action = $(submitNode).attr('formaction');
			form.prop('action', action);
			var motivation = $('#confirmRejectedRequestDialog_input').val();
			form.append("<input type='hidden' name='motivation' value='"+motivation+"'/>");
			form.submit();
		};
	}

	$('#confirmRejectedRequestDialog_input').val("");
	$('#'+dialogId).dialog({resizable: false,
		width: 800,
		modal: true,
		closeOnEscape: true,
		autoOpen: false,
		overlay: {
		backgroundColor: '#000',
		opacity: 0.5},
		buttons: {
			'Reject request?': confirmFunc,
			Cancel: function() {
				$(this).dialog('close');
				return false;
			}
		}
	});

	$('#'+dialogId).dialog('open');
	$('#confirmRejectedRequestDialog_input').focus();
	return false;
};

function auditLogSetup(){

	$('.al-trigger').click(function(e) {
		e.preventDefault();
		var detailNodeId = $(this).data('target');
		var detailNode = $('#'+detailNodeId);

		if ($(detailNode).hasClass("al-dtl-hidden")){

			$(this).text("hide info");
			$(this).closest('tr').find('td').addClass('al-dtl-header');
			$(detailNode).removeClass("al-dtl-hidden");
			$('html,body')
			.animate({ scrollTop: $(this).closest('tr').offset().top },	500);
		}else {
			$(this).text("more info");
			$(this).closest('tr').find('td').removeClass('al-dtl-header');
			$(detailNode).addClass("al-dtl-hidden");
		}
	});
};

function confirmOrgDbIdChangeDialog(formId,userInfo){

	if (validateForm_save_orgdb_id()) {
		var orgdbId = $('#orgDbIdVal').val();
		$('#confirmOrgDbIdChangeDialog .new-hr-id').text(orgdbId);
		
		$('#confirmOrgDbIdChangeDialog .alert').hide();
		
		$('#confirmOrgDbIdChangeDialog .dialogMessage').text(userInfo);
		$('#confirmOrgDbIdChangeDialog .hr-id-confirm').val();
		
		openYesConfirmDialog(formId, 'confirmOrgDbIdChangeDialog');
	}

	return false;
};

function confirmRemoveOwnCertificateDialog(formId,certSubject, certIssuer){
	$('#confirmOwnCertificateRemovalDialog .userDN').text(certSubject);
	$('#confirmOwnCertificateRemovalDialog .userCA').text(certIssuer);
	$('#confirmOwnCertificateRemovalDialog .alert').hide();
	$('#confirmOwnCertificateRemovalDialog .rm-cert-confirm').val();
	
	openYesConfirmDialog(formId, 'confirmOwnCertificateRemovalDialog');
};

function confirmRemoveCertificateDialog(formId,certSubject, certIssuer, userInfo){
	$('#confirmCertificateRemovalDialog .userDN').text(certSubject);
	$('#confirmCertificateRemovalDialog .userCA').text(certIssuer);
	$('#confirmCertificateRemovalDialog .userInfo').text(userInfo);
	
	$('#confirmCertificateRemovalDialog .alert').hide();
	$('#confirmCertificateRemovalDialog .rm-cert-confirm').val();
	
	openYesConfirmDialog(formId, 'confirmCertificateRemovalDialog');
};

$(document).ready(function(){
	pageSetup();
	bulkRequestSetup();
	auditLogSetup();
});
