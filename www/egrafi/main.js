"use strict";

const Account = {};

Selida.init.push(function() {
	if (Account.updateMode && Selida.noXristis())
	return self.location = Selida.baseUrl;

	Account.egrafiMode = !Account.updateMode;

	if (Account.updateMode)
	Selida.xristisTabDOM.remove();

	else
	Selida.egrafiTabDOM.remove();

	Selida.arxikiTabDOM.prependTo(Selida.toolbarRightDOM);
	Account.formaCreate();
});

Account.formaCreate = function() {
	Account.formaDOM = $('<form>').
	addClass('forma').
	attr('id', 'egrafiForma');

	Account.formaDOM.
	append($('<div>').addClass('prompt').text('Login')).
	append(Account.loginDOM = $('<input>').attr('id', 'login')).
	append($('<br>')).
	append($('<div>').addClass('prompt').text('Ονοματεπώνυμο')).
	append(Account.onomateponimoDOM = $('<input>').attr('id', 'onomateponimo')).
	append($('<br>'));

	if (Account.updateMode)
	Account.formaDOM.
	append($('<div>').addClass('prompt').text('Τρέχων κωδικός')).
	append(Account.passwordDOM = $('<input>').attr({
		'id': 'password',
		'type': 'password'
	})).
	append($('<br>'));

	Account.formaDOM.
	append($('<div>').addClass('prompt').
	text(Account.updateMode ? 'Νέος Κωδικός' : 'Κωδικός')).
	append(Account.password1DOM = $('<input>').attr({
		'id': 'password1',
		'type': 'password'
	})).
	append($('<br>')).
	append($('<div>').addClass('prompt').text('Επανάληψη')).
	append(Account.password2DOM = $('<input>').attr({
		'id': 'password2',
		'type': 'password'
	})).
	append('<br>');
		
	const panel = $('<div>').
	addClass('formaPanel').
	attr('id', 'panel').
	appendTo(Account.formaDOM);

	panel.
	append($('<input>').attr({
		'type': 'submit',
		'value': 'Submit',
	})).
	append(Account.clearDOM = $('<input>').attr({
		'type': 'reset',
		'value': 'Clear',
	}).on('click', function() {
		if (Account.updateMode) {
			setTimeout(function() {
				Account.loginDOM.val(Selida.xristis);
			}, 0);
			Account.onomateponimoDOM.focus();
		}

		else
		Account.loginDOM.focus();
	})).
	append(Account.cancelDOM = $('<input>').attr({
		'type': 'button',
		'value': 'Cancel',
	}).on('click', function() {
		self.location = Selida.baseUrl;
	}));

	Account.formaDOM.on('submit', function() {
		Account.submitData();
		return false;
	});

	Account.formaDOM.appendTo(Selida.ofelimoDOM);
	Selida.widthFix(Account.formaDOM, '.prompt');

	if (Account.updateMode)
	return Account.formaFill();

	Account.loginDOM.focus();
	return Account;
};

Account.formaFill = function() {
	Account.suspend(true);
	Account.loginDOM.prop('disabled', true);
	$.post({
		'url': 'xristis.php',
		'success': function(rsp) {
			Account.formaDataFill(rsp);
		},
		'fail': function(err) {
			cosnole.error(err);
		},
	});

	return Account;
};

Account.formaDataFill = function(data) {
	Account.cancelDOM.prop('disabled', false);

	if (data.hasOwnProperty('error'))
	return;

	if (!data.hasOwnProperty('login'))
	return;

	if (data.login !== Selida.xristis)
	return;

	Account.suspend(false);
	Account.loginDOM.val(data.login).prop('disabled', true);
	Account.onomateponimoDOM.val(data.onomateponimo).focus();
};

Account.submitData = function() {
	const login = Account.loginDOM.val().trim();

	if (login === '') {
		Account.loginDOM.focus();
		return false;
	}

	if (!login.match(/^[A-Za-z][0-9a-zA-Z_@.-]*$/)) {
		Account.loginDOM.focus();
		return false;
	}

	const onomateponimo = Account.onomateponimoDOM.val().trim();

	if (onomateponimo === '') {
		Account.onomateponimoDOM.focus();
		return false;
	}

	let password;

	if (Account.updateMode) {
		password = Account.passwordDOM.val();

		if (password === '') {
			Account.passwordDOM.focus();
			return false;
		}
	}

	const password1 = Account.password1DOM.val();

	if (Selida.egrafiMode && (password1 === '')) {
		Account.password1DOM.focus();
		return false;
	}

	const password2 = Account.password2DOM.val();

	if (password1 !== password2) {
		Account.password1DOM.focus();
		return false;
	}

	const data = {
		'login': login,
		'onomateponimo': onomateponimo,
	};

	if (Account.updateMode) {
		data.mode = 'update';
		data.password = password;
		data.password1 = password1;
	}

	else {
		data.mode = 'egrafi';
		data.password = password1;
	}

	Account.suspend(true);
	$.post({
		'url': 'egrafi.php',
		'data': data,
		'success': function(rsp) {
			if (rsp === 'OK')
			return self.location = Selida.baseUrl;

			Account.suspend(false);

			if (Account.egrafiMode)
			return Account.loginDOM.focus();

			Account.passwordDOM.focus();
		},
		'error': function(err) {
			console.error(err);

			Account.suspend(false);

			if (Account.egrafiMode)
			return Account.loginDOM.focus();

			return Account().passwordDOM.focus();
		},
	});
};

Account.suspend = function(suspend) {
	Selida.formSuspend(Account.formaDOM, suspend);

	if (suspend)
	return Account;

	if (Account.egrafiMode)
	return Account;

	Account.loginDOM.prop('disabled', true);
	return Account;
};
