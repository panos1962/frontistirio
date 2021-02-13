"use strict";

const Egrafi = {};

Selida.init = function() {
	Selida.egrafiTabDOM.remove();
	Selida.arxikiTabDOM.prependTo(Selida.toolbarRightDOM);

	Egrafi.formaCreate();
};

Egrafi.formaCreate = function() {
	const forma = $('<form>').
	addClass('forma').
	attr('id', 'egrafiForma');

	forma.
	append($('<div>').addClass('prompt').text('Login')).
	append(Egrafi.loginDOM = $('<input>').attr('id', 'login')).
	append($('<br>')).
	append($('<div>').addClass('prompt').text('Ονοματεπώνυμο')).
	append(Egrafi.onomateponimoDOM = $('<input>').attr('id', 'onomateponimo')).
	append($('<br>')).
	append($('<div>').addClass('prompt').text('Password')).
	append(Egrafi.password1DOM = $('<input>').attr('type', 'password')).
	append($('<br>')).
	append($('<div>').addClass('prompt').text('Repeat')).
	append(Egrafi.password2DOM = $('<input>').attr('type', 'password'));
		
/*
*/
Egrafi.loginDOM.val('nikos');
Egrafi.onomateponimoDOM.val('Νίκος Χατζηνικολάου');
Egrafi.password1DOM.val('xxx');
Egrafi.password2DOM.val('xxx');

	const panel = $('<div>').attr('id', 'panel').appendTo(forma);

	panel.
	append($('<input>').attr({
		'type': 'submit',
		'value': 'Submit',
	})).
	append($('<input>').attr({
		'type': 'reset',
		'value': 'Clear',
	})).
	append($('<input>').attr({
		'type': 'button',
		'value': 'Cancel',
	}).on('click', function() {
		self.location = Selida.baseUrl;
	}));

	forma.on('submit', function() {
		Egrafi.submitData();
		return false;
	});

	forma.appendTo(Selida.ofelimoDOM);
	Selida.widthFix(forma, '.prompt');
	Egrafi.loginDOM.focus();
};

Egrafi.submitData = function() {
	const login = Egrafi.loginDOM.val().trim();

	if (login === '') {
		Egrafi.loginDOM.focus();
		return false;
	}

	if (!login.match(/^[0-9a-zA-Z@.-]+$/)) {
		Egrafi.loginDOM.focus();
		return false;
	}

	const onomateponimo = Egrafi.onomateponimoDOM.val().trim();

	if (onomateponimo === '') {
		Egrafi.onomateponimoDOM.focus();
		return false;
	}

	const password1 = Egrafi.password1DOM.val();

	if (password1 === '') {
		Egrafi.password1DOM.focus();
		return false;
	}

	const password2 = Egrafi.password2DOM.val();

	if (password1 !== password2) {
		Egrafi.password1DOM.focus();
		return false;
	}

	$.post({
		'url': 'egrafi.php',
		'data': {
			'login': login,
			'onomateponimo': onomateponimo,
			'password': password1,
		},
		'success': function(rsp) {
			if (rsp === 'OK')
			self.location = Selida.baseUrl;

			else
			Egrafi.loginDOM.focus();
		},
		'error': function(err) {
			console.error(err);
			Egrafi.loginDOM.focus();
		},
	});
};
