"use strict";

Selida.init.push(function() {
	Selida.egrafiTab().arxikiTab(Selida.toolbarRightDOM);
	Main.formaCreate();
});

Main.formaCreate = function() {
	Main.formaDOM = $('<form>').
	addClass('forma').
	attr('id', 'isodosForma');

	Main.formaDOM.
	append($('<div>').addClass('prompt').text('Login')).
	append(Main.loginDOM = $('<input>').attr('id', 'login')).
	append($('<br>')).
	append($('<div>').addClass('prompt').text('Password')).
	append(Main.passwordDOM = $('<input>').attr({
		'id': 'password',
		'type': 'password'
	})).
	append('<br>');

	const panel = $('<div>').
	addClass('formaPanel').
	attr('id', 'panel').
	appendTo(Main.formaDOM);

	panel.
	append($('<input>').attr({
		'type': 'submit',
		'value': 'Submit',
	})).
	append(Main.clearDOM = $('<input>').attr({
		'type': 'reset',
		'value': 'Clear',
	}).on('click', function() {
		Main.loginDOM.focus();
	})).
	append($('<input>').attr({
		'type': 'button',
		'value': 'Cancel',
	}).on('click', function() {
		self.location = Selida.baseUrl;
	}));

	Main.formaDOM.on('submit', function() {
		Main.submitData();
		return false;
	});

	Main.formaDOM.appendTo(Selida.ofelimoDOM);
	Selida.widthFix(Main.formaDOM, '.prompt');
	Main.loginDOM.focus();

	return Main;
};

Main.submitData = function() {
	const login = Main.loginDOM.val().trim();

	if (login === '') {
		Main.loginDOM.focus();
		return false;
	}

	const password = Main.passwordDOM.val();

	Main.suspend(true);
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
			Main.suspend(false).passwordDOM.select();
		},
		'error': function(err) {
			console.error(err);
			Main.suspend(false).loginDOM.focus();
		},
	});

	return Main;
};

Main.suspend = function(suspend) {
	Selida.formSuspend(Main.formaDOM, suspend);
	return Main;
};
