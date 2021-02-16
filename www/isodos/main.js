"use strict";

const Isodos = {};

Selida.init.push(function() {
	Selida.isodosTabDOM.remove();
	Selida.arxikiTabDOM.appendTo(Selida.toolbarRightDOM);
	Isodos.formaCreate();
});

Isodos.formaCreate = function() {
	Isodos.formaDOM = $('<form>').
	addClass('forma').
	attr('id', 'isodosForma');

	Isodos.formaDOM.
	append($('<div>').addClass('prompt').text('Login')).
	append(Isodos.loginDOM = $('<input>').attr('id', 'login')).
	append($('<br>')).
	append($('<div>').addClass('prompt').text('Password')).
	append(Isodos.passwordDOM = $('<input>').attr({
		'id': 'password',
		'type': 'password'
	}));

	const panel = $('<div>').attr('id', 'panel').appendTo(Isodos.formaDOM);

	panel.
	append($('<input>').attr({
		'type': 'submit',
		'value': 'Submit',
	})).
	append($('<input>').attr({
		'type': 'button',
		'value': 'Cancel',
	}).on('click', function() {
		self.location = Selida.baseUrl;
	}));

	Isodos.formaDOM.on('submit', function() {
		Isodos.submitData();
		return false;
	});

	Isodos.formaDOM.appendTo(Selida.ofelimoDOM);
	Selida.widthFix(Isodos.formaDOM, '.prompt');
	Isodos.loginDOM.focus();

	return Isodos;
};

Isodos.submitData = function() {
	const login = Isodos.loginDOM.val().trim();

	if (login === '') {
		Isodos.loginDOM.focus();
		return false;
	}

	const password = Isodos.passwordDOM.val();

	Isodos.suspend(true);
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
			Isodos.suspend(false).passwordDOM.select();
		},
		'error': function(err) {
			console.error(err);
			Isodos.suspend(false).loginDOM.focus();
		},
	});

	return Isodos;
};

Isodos.suspend = function(suspend) {
	Isodos.formaDOM.find('input').prop('disabled', suspend);
	return Isodos;
};
