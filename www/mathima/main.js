"use strict";

Selida.init.push(function() {
	Selida.eponimiXrisiMust();
	Main.
	mathimaMust().
	toolbarSetup().
	mathimaSetup().
	didaskaliaSetup().
	simetoxiSetup().
	postSetup();

	$.post({
		'url': 'mathima.php',
		'data': {
			'mathima': Main.mathima,
		},
		'success': function(rsp) {
			Main.mathimaProcess(rsp);
		},
		'fail': function(err) {
			console.error(err);
		},
	});
});

Main.postSetup = function() {
	setTimeout(function() {
		if (Selida.php_REQUEST.hasOwnProperty('simetoxi'))
		Main.simetoxiFiltroDOM.focus();

		if (Selida.php_REQUEST.hasOwnProperty('didaskalia'))
		Main.didaskaliaFiltroDOM.focus();
	}, 100);

	return Main;
};

Main.mathimaMust = function() {
	if (!Selida.php_REQUEST.hasOwnProperty('mathima'))
	return Main.noMathima();

	Main.mathima = parseInt(Selida.php_REQUEST['mathima']);

	if (!Main.mathima)
	return Main.noMathima();

	if (isNaN(Main.mathima))
	return Main.noMathima();

	return Main;
};

Main.noMathima = function() {
	self.location = Selida.baseUrl + '/error';
	throw Error('error');
};

Main.toolbarSetup = function() {
	if (Selida.isChild())
	Selida.
	klisimoTab();

	else
	Selida.
	arxikiTab().
	xristisTab().
	exodosTab();

	Selida.toolbarLeftDOM.
	append(Selida.tabCreate({
		'href': Main.didaskaliaToggle,
		'text': 'Διδάσκοντες',
	})).
	append(Selida.tabCreate({
		'href': Main.simetoxiToggle,
		'text': 'Μαθητές',
	}));

	return Main;
};

Main.mathimaSetup = function() {
	Main.mathimaDOM = $('#mathima').appendTo(Selida.ofelimoDOM);
	Main.mathimaIdDOM = $('#mathimaId');
	Main.mathimaPerigrafiDOM = $('#mathimaPerigrafi');
	Main.mathimaApoDOM = $('#mathimaApo');
	Main.mathimaEosDOM = $('#mathimaEos');

	return Main;
};

Main.mathimaProcess = function(data) {
	Main.mathima = new Mathima(data.mathima);

	Main.mathimaIdDOM.text(Main.mathima.id);
	Main.mathimaPerigrafiDOM.text(Main.mathima.perigrafi);
	Main.mathimaApoDOM.text(Selida.ymd2dmy(Main.mathima.apo));
	Main.mathimaEosDOM.text(Selida.ymd2dmy(Main.mathima.eos));

	Main.
	didaskaliaProcess(data).
	simetoxiProcess(data);

	if (Selida.php_REQUEST.hasOwnProperty('didaskalia'))
	Main.didaskaliaWrapperDOM.css('display', 'block');

	if (Selida.php_REQUEST.hasOwnProperty('simetoxi'))
	Main.simetoxiWrapperDOM.css('display', 'block');

	return Main;
};

Main.didaskaliaProcess = function(data) {
	Main.didaskaliaDOM.empty();

	if (!data.hasOwnProperty('didaskalia'))
	return Main;

	let filtro = Main.didaskaliaFiltroDOM.val();

	if (filtro)
	filtro = new RegExp(filtro, 'i');

	const dlist = data.didaskalia;
	dlist.pop();
	Main.didaskaliaList = [];
	dlist.forEach(function(x) {
		x = new Didaskalia(x);

		if (x.filtroMatch(filtro))
		Main.didaskaliaList.push(x);
	});
	Main.didaskaliaList.forEach(function(didaskalia) {
		Main.didaskaliaDOM.
		append(didaskalia.domCreate());
	});

	return Main;
};

Main.simetoxiProcess = function(data) {
	Main.simetoxiDOM.empty();

	if (!data.hasOwnProperty('simetoxi'))
	return Main;

	let filtro = Main.simetoxiFiltroDOM.val();

	if (filtro)
	filtro = new RegExp(filtro, 'i');

	const dlist = data.simetoxi;
	dlist.pop();
	Main.simetoxiList = [];
	dlist.forEach(function(x) {
		x = new Simetoxi(x);

		if (x.filtroMatch(filtro))
		Main.simetoxiList.push(x);
	});

	Main.simetoxiList.forEach(function(simetoxi) {
		Main.simetoxiDOM.
		append(simetoxi.domCreate());
	});

	return Main;
};

///////////////////////////////////////////////////////////////////////////////@

Main.didaskaliaSetup = function() {
	Selida.ofelimoDOM.
	append(Main.didaskaliaWrapperDOM = $('#didaskaliaWrapper'));

	Main.didaskaliaFiltroDOM = $('#didaskaliaFiltro');
	Main.didaskaliaDOM = $('#didaskalia');

	$('#didaskaliaFiltraForma').
	on('submit', Main.didaskaliaRefresh);

	return Main;
};

Main.didaskaliaRefresh = function() {
	$.post({
		'url': 'mathima.php',
		'data': {
			'didaskalia': Main.mathima.id,
		},
		'success': function(rsp) {
			Main.didaskaliaProcess(rsp);
		},
		'fail': function(err) {
			console.error(err);
		},
	});

	return false;
};

Main.didaskaliaToggle = function() {
	const display = Main.didaskaliaWrapperDOM.css('display');

	if (display === 'none') {
		Main.didaskaliaWrapperDOM.css('display', 'block');
		Main.didaskaliaFiltroDOM.focus();
		return Main;
	}

	Main.didaskaliaWrapperDOM.css('display', 'none');
	return Main;
};

///////////////////////////////////////////////////////////////////////////////@

Main.simetoxiSetup = function() {
	Selida.ofelimoDOM.
	append(Main.simetoxiWrapperDOM = $('#simetoxiWrapper'));

	Main.simetoxiFiltroDOM = $('#simetoxiFiltro');
	Main.simetoxiDOM = $('#simetoxi');

	$('#simetoxiFiltraForma').
	on('submit', Main.simetoxiRefresh);

	return Main;
};

Main.simetoxiRefresh = function() {
	$.post({
		'url': 'mathima.php',
		'data': {
			'simetoxi': Main.mathima.id,
		},
		'success': function(rsp) {
			Main.simetoxiProcess(rsp);
		},
		'fail': function(err) {
			console.error(err);
		},
	});

	return false;
};

Main.simetoxiToggle = function() {
	const display = Main.simetoxiWrapperDOM.css('display');

	Main.simetoxiWrapperDOM.
	css('display', display === 'none' ? 'block' : 'none');

	return Main;
};

///////////////////////////////////////////////////////////////////////////////@

Didaskalia.prototype.domCreate = function() {
	return this.domUpdate($('<tr>'));
};

Didaskalia.prototype.domUpdate = function(dom) {
	return dom.
	data('didaskalia', this).
	empty().
	append($('<td>').text(this.id)).
	append($('<td>').text(this.onomateponimoGet()));
};

Didaskalia.prototype.filtroMatch = function(filtro) {
	if (!filtro)
	return true;

	return this.onomateponimoGet().match(filtro);
};

///////////////////////////////////////////////////////////////////////////////@

Simetoxi.prototype.domCreate = function() {
	return this.domUpdate($('<tr>'));
};

Simetoxi.prototype.domUpdate = function(dom) {
	return dom.
	data('simetoxi', this).
	empty().
	append($('<td>').text(this.id)).
	append($('<td>').text(this.onomateponimoGet()));
};

Simetoxi.prototype.filtroMatch = function(filtro) {
	if (!filtro)
	return true;

	return this.onomateponimoGet().match(filtro);
};

///////////////////////////////////////////////////////////////////////////////@
