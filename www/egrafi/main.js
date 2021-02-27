"use strict";

Selida.init.push(function() {
	if (Main.updateMode && Selida.noXristis())
	return self.location = Selida.baseUrl;

	Main.egrafiMode = !Main.updateMode;

	if (Main.updateMode)
	Selida.klisimoTab();

	else
	Selida.arxikiTab(Selida.toolbarRightDOM).isodosTab();

	Main.formaCreate();

	setTimeout(function() {
		if (Main.egrafiMode)
		Main.loginDOM.focus();

		else
		Main.onomateponimoDOM.focus();
	}, 100);
});

Main.formaCreate = function() {
	Main.formaDOM = $('<form>').
	addClass('forma').
	attr('id', 'egrafiForma');

	Main.formaDOM.
	append($('<div>').addClass('prompt').text('Login')).
	append(Main.loginDOM = $('<input>').attr('id', 'login')).
	append($('<br>')).
	append($('<div>').addClass('prompt').text('Ονοματεπώνυμο')).
	append(Main.onomateponimoDOM = $('<input>').attr('id', 'onomateponimo')).
	append($('<br>'));

	if (Main.updateMode)
	Main.formaDOM.
	append($('<div>').addClass('prompt').text('Τρέχων κωδικός')).
	append(Main.passwordDOM = $('<input>').attr({
		'id': 'password',
		'type': 'password'
	})).
	append($('<br>'));

	Main.formaDOM.
	append($('<div>').addClass('prompt').
	text(Main.updateMode ? 'Νέος Κωδικός' : 'Κωδικός')).
	append(Main.password1DOM = $('<input>').attr({
		'id': 'password1',
		'type': 'password'
	})).
	append($('<br>')).
	append($('<div>').addClass('prompt').text('Επανάληψη')).
	append(Main.password2DOM = $('<input>').attr({
		'id': 'password2',
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
		if (Main.updateMode) {
			setTimeout(function() {
				Main.loginDOM.val(Selida.xristis);
			}, 0);
			Main.onomateponimoDOM.focus();
		}

		else
		Main.loginDOM.focus();
	})).
	append(Main.cancelDOM = $('<input>').attr({
		'type': 'button',
		'value': 'Cancel',
	}).on('click', function() {
		if (Main.updateMode)
		self.close();

		else;
		self.location = Selida.baseUrl;
	}));

	Main.formaDOM.on('submit', function() {
		Main.submitData();
		return false;
	});

	Main.formaDOM.appendTo(Selida.ofelimoDOM);
	Selida.widthFix(Main.formaDOM, '.prompt');

	if (Main.updateMode)
	Main.formaFill();

	return Main;
};

Main.formaFill = function() {
	Main.suspend(true);
	Main.loginDOM.prop('disabled', true);
	$.post({
		'url': 'xristis.php',
		'success': function(rsp) {
			Main.formaDataFill(rsp);
		},
		'fail': function(err) {
			cosnole.error(err);
		},
	});

	return Main;
};

Main.formaDataFill = function(data) {
	Main.cancelDOM.prop('disabled', false);

	if (data.hasOwnProperty('error'))
	return;

	if (!data.hasOwnProperty('login'))
	return;

	if (data.login !== Selida.xristis)
	return;

	Main.suspend(false);
	Main.loginDOM.val(data.login).prop('disabled', true);
	Main.onomateponimoDOM.val(data.onomateponimo).focus();
};

Main.submitData = function() {
	const login = Main.loginDOM.val().trim();

	if (login === '') {
		Main.loginDOM.focus();
		return false;
	}

	if (!login.match(/^[A-Za-z][0-9a-zA-Z_@.-]*$/)) {
		Main.loginDOM.focus();
		return false;
	}

	const onomateponimo = Main.onomateponimoDOM.val().trim();

	if (onomateponimo === '') {
		Main.onomateponimoDOM.focus();
		return false;
	}

	let password;

	if (Main.updateMode) {
		password = Main.passwordDOM.val();

		if (password === '') {
			Main.passwordDOM.focus();
			return false;
		}
	}

	const password1 = Main.password1DOM.val();

	if (Selida.egrafiMode && (password1 === '')) {
		Main.password1DOM.focus();
		return false;
	}

	const password2 = Main.password2DOM.val();

	if (password1 !== password2) {
		Main.password1DOM.focus();
		return false;
	}

	const data = {
		'login': login,
		'onomateponimo': onomateponimo,
	};

	if (Main.updateMode) {
		data.mode = 'update';
		data.password = password;
		data.password1 = password1;
	}

	else {
		data.mode = 'egrafi';
		data.password = password1;
	}

	Main.suspend(true);
	$.post({
		'url': 'egrafi.php',
		'data': data,
		'success': function(rsp) {
			if (rsp === 'OK') {
				if (Main.egrafiMode)
				return self.location = Selida.baseUrl;

				Main.formaDOM.empty().
				append('Τα στοιχεία ενημερώθηκαν επιτυχώς!');
				return;
			}

			Main.suspend(false);

			if (Main.egrafiMode)
			return Main.loginDOM.focus();

			Main.passwordDOM.focus();
		},
		'error': function(err) {
			console.error(err);

			Main.suspend(false);

			if (Main.egrafiMode)
			return Main.loginDOM.focus();

			return Main().passwordDOM.focus();
		},
	});
};

Main.suspend = function(suspend) {
	Selida.formSuspend(Main.formaDOM, suspend);

	if (suspend)
	return Main;

	if (Main.egrafiMode)
	return Main;

	Main.loginDOM.prop('disabled', true);
	return Main;
};
