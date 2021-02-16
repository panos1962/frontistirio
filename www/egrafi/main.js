"use strict";

const Egrafi = {};

Selida.init.push(function() {
	Egrafi.egrafiMode = !Egrafi.updateMode;

	if (Egrafi.updateMode)
	Selida.xristisTabDOM.remove();

	else
	Selida.egrafiTabDOM.remove();

	Selida.arxikiTabDOM.prependTo(Selida.toolbarRightDOM);
	Egrafi.formaCreate();
});

Egrafi.formaCreate = function() {
	Egrafi.formaDOM = $('<form>').
	addClass('forma').
	attr('id', 'egrafiForma');

	Egrafi.formaDOM.
	append($('<div>').addClass('prompt').text('Login')).
	append(Egrafi.loginDOM = $('<input>').attr('id', 'login')).
	append($('<br>')).
	append($('<div>').addClass('prompt').text('Ονοματεπώνυμο')).
	append(Egrafi.onomateponimoDOM = $('<input>').attr('id', 'onomateponimo')).
	append($('<br>'));

	if (Egrafi.updateMode)
	Egrafi.formaDOM.
	append($('<div>').addClass('prompt').text('Τρέχων κωδικός')).
	append(Egrafi.passwordDOM = $('<input>').attr({
		'id': 'password',
		'type': 'password'
	})).
	append($('<br>'));

	Egrafi.formaDOM.
	append($('<div>').addClass('prompt').
	text(Egrafi.updateMode ? 'Νέος Κωδικός' : 'Κωδικός')).
	append(Egrafi.password1DOM = $('<input>').attr({
		'id': 'password1',
		'type': 'password'
	})).
	append($('<br>')).
	append($('<div>').addClass('prompt').text('Επανάληψη')).
	append(Egrafi.password2DOM = $('<input>').attr({
		'id': 'password2',
		'type': 'password'
	}));
		
	const panel = $('<div>').attr('id', 'panel').appendTo(Egrafi.formaDOM);

	panel.
	append($('<input>').attr({
		'type': 'submit',
		'value': 'Submit',
	})).
	append($('<input>').attr({
		'type': 'reset',
		'value': 'Clear',
	}).on('click', function() {
		Egrafi.loginDOM.focus();
	})).
	append($('<input>').attr({
		'type': 'button',
		'value': 'Cancel',
	}).on('click', function() {
		self.location = Selida.baseUrl;
	}));

	Egrafi.formaDOM.on('submit', function() {
		Egrafi.submitData();
		return false;
	});

	if (Egrafi.updateMode)
	Egrafi.fillFormData();

	Egrafi.formaDOM.appendTo(Selida.ofelimoDOM);
	Selida.widthFix(Egrafi.formaDOM, '.prompt');

	if (Egrafi.updateMode)
	Egrafi.onomateponimoDOM.focus();

	else
	Egrafi.loginDOM.focus();
};

Egrafi.fillFormData = function() {
	Egrafi.loginDOM.prop('disabled', true);
	$.post({
		'url': 'xristis.php',
		'success': function(rsp) {
			if (rsp.hasOwnProperty('login') &&
				(rsp.login === Selida.xristis)) {
				Egrafi.loginDOM.val(rsp.login).prop('disabled', true);
				Egrafi.onomateponimoDOM.val(rsp.onomateponimo);
				return;
			}

			self.location = Selida.baseUrl;
		},
		'fail': function(err) {
			cosnole.error(err);
			self.location = Selida.baseUrl;
		},
	});

	return Egrafi;
}

Egrafi.submitData = function() {
	const login = Egrafi.loginDOM.val().trim();

	if (login === '') {
		Egrafi.loginDOM.focus();
		return false;
	}

	if (!login.match(/^[A-Za-z][0-9a-zA-Z_@.-]*$/)) {
		Egrafi.loginDOM.focus();
		return false;
	}

	const onomateponimo = Egrafi.onomateponimoDOM.val().trim();

	if (onomateponimo === '') {
		Egrafi.onomateponimoDOM.focus();
		return false;
	}

	let password;

	if (Egrafi.updateMode) {
		password = Egrafi.passwordDOM.val();

		if (password === '') {
			Egrafi.passwordDOM.focus();
			return false;
		}
	}

	const password1 = Egrafi.password1DOM.val();

	if (Selida.egrafiMode && (password1 === '')) {
		Egrafi.password1DOM.focus();
		return false;
	}

	const password2 = Egrafi.password2DOM.val();

	if (password1 !== password2) {
		Egrafi.password1DOM.focus();
		return false;
	}

	const data = {};

	data.login = login;
	data.onomateponimo = onomateponimo;

	if (Egrafi.updateMode) {
		data.mode = 'update';
		data.password = password;
		data.password1 = password1;
	}

	else {
		data.mode = 'egrafi';
		data.password = password1;
	}

	Egrafi.suspend(true);
	$.post({
		'url': 'egrafi.php',
		'data': data,
		'success': function(rsp) {
			if (rsp === 'OK')
			self.location = Selida.baseUrl;

			else if (Egrafi.egrafiMode)
			Egrafi.suspend(false).loginDOM.focus();

			else
			Egrafi.suspend(false).passwordDOM.focus();
		},
		'error': function(err) {
			console.error(err);

			if (Egrafi.egrafiMode)
			Egrafi.suspend(false).loginDOM.focus();

			else
			Egrafi.suspend(false).passwordDOM.focus();
		},
	});
};

Egrafi.suspend = function(suspend) {
	Egrafi.formaDOM.find('input').prop('disabled', suspend);

	if (suspend)
	return Egrafi;

	if (Egrafi.egrafiMode)
	return Egrafi;

	Egrafi.loginDOM.prop('disabled', true);
	return Egrafi;
};
