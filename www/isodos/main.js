"use strict";

const Isodos = {};

Selida.init.push(function() {
	Selida.isodosTabDOM.remove();
	Selida.arxikiTabDOM.appendTo(Selida.toolbarRightDOM);
	Isodos.formaCreate();
});

Isodos.formaCreate = function() {
	const forma = $('<form>').
	addClass('forma').
	attr('id', 'isodosForma');

	forma.
	append($('<div>').addClass('prompt').text('Login')).
	append(Isodos.loginDOM = $('<input>').attr('id', 'login')).
	append($('<br>')).
	append($('<div>').addClass('prompt').text('Password')).
	append(Isodos.passwordDOM = $('<input>').attr('type', 'password'));

	const panel = $('<div>').attr('id', 'panel').appendTo(forma);

	panel.
	append($('<input>').attr({
		'type': 'submit',
		'value': 'Submit',
	})).
	append($('<input>').attr({
		'type': 'reset',
		'value': 'Clear',
	}).on('click', function() {
		Isodos.loginDOM.focus();
	})).
	append($('<input>').attr({
		'type': 'button',
		'value': 'Cancel',
	}).on('click', function() {
		self.location = Selida.baseUrl;
	}));

	forma.on('submit', function() {
		Isodos.submitData();
		return false;
	});

	forma.appendTo(Selida.ofelimoDOM);
	Selida.widthFix(forma, '.prompt');
	Isodos.loginDOM.focus();
};

Isodos.submitData = function() {
	const login = Isodos.loginDOM.val().trim();

	if (login === '') {
		Isodos.loginDOM.focus();
		return false;
	}

	const password = Isodos.passwordDOM.val();

	$.post({
		'url': 'isodos.php',
		'data': {
			'login': login,
			'password': password,
		},
		'success': function(rsp) {
			if (rsp === 'OK')
			self.location = Selida.baseUrl;

			else
			Isodos.passwordDOM.select();
		},
		'error': function(err) {
			console.error(err);
			Isodos.loginDOM.focus();
		},
	});
};
