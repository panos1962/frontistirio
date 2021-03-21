"use strict";

Selida.init.push(function() {
	Selida.eponimiXrisiMust();

	Main.
	mathimaMust().
	toolbarSetup().
	kathigitisZoomSetup().
	mathimaSetup().
	didaskaliaSetup().
	didaskaliaFormaSetup().
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

///////////////////////////////////////////////////////////////////////////////@

Main.mathimaMust = function() {
	if (!Selida.php_REQUEST.hasOwnProperty('mathima'))
	return Main.noMathima();

	Main.mathima = parseInt(Selida.php_REQUEST['mathima']);

	if (isNaN(Main.mathima))
	return Main.noMathima();

	if (Main.mathima <= 0)
	return Main.noMathima();

	return Main;
};

Main.noMathima = function() {
	self.location = Selida.baseUrl + '/error';
	throw Error('error');
};

///////////////////////////////////////////////////////////////////////////////@

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

///////////////////////////////////////////////////////////////////////////////@

Main.kathigitisZoomSetup = function() {
	Main.kathigitisZoomDialogDOM = $('#kathigitisZoomDialog').
	dialog({
		'open': Main.kathigitisZoomOpen,
		'close': function() {
			Main.kathigitisZoomDialogDOM.empty();
		},
		'position': {
			'my': 'right top',
			'at': 'right-80 top+50',
		},
		'width': 800,
		'height': 600,
		'resizable': true,
		'autoOpen': false,
	});

	return Main;
};

Main.kathigitisZoomOpen = function() {
	$('<iframe>').
	attr({
		'id': 'kathigitisZoomIframe',
		'src': Selida.baseUrl + '/kathigites?zoom=kathigitisZoomProcess',
	}).
	appendTo(Main.kathigitisZoomDialogDOM);

	return Main;
};

Main.kathigitisZoomProcess = function (x) {
	Main.didaskaliaFormaIdDOM.val(x.id);
	Main.didaskaliaFormaOnomateponimoDOM.val(x.onomateponimoGet());
	Main.kathigitisZoomDialogDOM.dialog('close');
};

///////////////////////////////////////////////////////////////////////////////@

Main.mathimaSetup = function() {
	Main.mathimaDOM = $('#mathima').
	appendTo(Selida.ofelimoDOM);

	Main.mathimaIdDOM = $('#mathimaId');
	Main.mathimaPerigrafiDOM = $('#mathimaPerigrafi');
	Main.mathimaApoDOM = $('#mathimaApo');
	Main.mathimaEosDOM = $('#mathimaEos');

	return Main;
};

///////////////////////////////////////////////////////////////////////////////@

Main.didaskaliaSetup = function() {
	Main.didaskaliaWrapperDOM = $('#didaskaliaWrapper').
	appendTo(Selida.ofelimoDOM);

	Main.didaskaliaFiltroDOM = $('#didaskaliaFiltro');
	Main.didaskaliaDOM = $('#didaskalia');

	$('#didaskaliaFiltraForma').
	on('reset', () => Main.didaskaliaFiltroDOM.focus()).
	on('submit', Main.didaskaliaRefresh);

	$('#didaskaliaInsert').
	on('click', Main.didaskaliaInsert);

	Main.didaskaliaDOM.
	on('click', 'tr', function() {
		if (Main.didaskaliaTrexonDOM)
		Main.didaskaliaTrexonDOM.removeClass('trexon');

		Main.didaskaliaTrexonDOM = $(this).addClass('trexon');
		Main.didaskaliaDialogDOM.dialog('close').dialog('open');
	});

	return Main;
};

Main.didaskaliaRefresh = function() {
	Main.didaskaliaFiltroDOM.focus();

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

Main.didaskaliaInsert = function() {
};

///////////////////////////////////////////////////////////////////////////////@

Main.didaskaliaFormaSetup = function() {
	Main.didaskaliaFormaDOM = $('#didaskaliaForma');
	Main.didaskaliaFormaIdDOM = $('#didaskaliaFormaId');
	Selida.zoomSet(Main.didaskaliaFormaIdDOM, Main.kathigitisZoomDialogDOM);
	Main.didaskaliaFormaOnomateponimoDOM = $('#didaskaliaFormaOnomateponimo');

	Main.didaskaliaDialogDOM = $('#didaskaliaDialog').
	dialog({
		'open': Main.didaskaliaDialogOpen,
		'position': {
			'my': 'left top',
			'at': 'left+300 top+120',
		},
		'width': 'auto',
		'resizable': false,
		'autoOpen': false,
	});

	Main.didaskaliaFormaDOM.
	on('submit', Main.didaskaliaFormaSubmit);

	$('#didaskaliaInsert').on('click', function() {
		if (Main.didaskaliaTrexonDOM)
		Main.didaskaliaTrexonDOM.removeClass('trexon');

		delete Main.didaskaliaTrexonDOM;
		Main.
		didaskaliaFormaClear().
		didaskaliaDialogDOM.dialog('close').dialog('open');
	});

	$('#didaskaliaFormaDelete').on('click', function() {
		if (Main.didaskaliaTrexonDOM)
		Main.confirmDeleteDOM.dialog('open');
	});

	Main.didaskaliaFormaCancelDOM = $('#didaskaliaFormaCancel').
	on('click', function() {
		Main.didaskaliaDialogDOM.dialog('close');
	});

	return Main;
};

Main.didaskaliaDialogOpen = function() {
	Selida.fareaFix(Main.didaskaliaFormaDOM);

	if (Main.didaskaliaTrexonDOM) {
		const didaskalia = Main.didaskaliaTrexonDOM.data('didaskalia');
		Main.didaskaliaFormaIdDOM.
		prop('disabled', true).
		val(didaskalia.id);
		Main.didaskaliaFormaOnomateponimoDOM.
		val(didaskalia.onomateponimoGet());
	}

	else {
		Main.didaskaliaFormaIdDOM.
		prop('disabled', false).
		focus();
	}

	return Main;
};

Main.didaskaliaFormaClear = function() {
	Main.didaskaliaFormaIdDOM.val('');
	Main.didaskaliaFormaOnomateponimoDOM.val('');

	return Main;
};

///////////////////////////////////////////////////////////////////////////////@

Main.simetoxiSetup = function() {
	Main.simetoxiWrapperDOM = $('#simetoxiWrapper').
	appendTo(Selida.ofelimoDOM);

	Main.simetoxiFiltroDOM = $('#simetoxiFiltro');
	Main.simetoxiDOM = $('#simetoxi');

	$('#simetoxiFiltraForma').
	on('reset', () => Main.simetoxiFiltroDOM.focus()).
	on('submit', Main.simetoxiRefresh);

	return Main;
};

Main.simetoxiRefresh = function() {
	Main.simetoxiFiltroDOM.focus();

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

Main.postSetup = function() {
	setTimeout(function() {
		if (Selida.php_REQUEST.hasOwnProperty('simetoxi'))
		Main.simetoxiFiltroDOM.focus();

		if (Selida.php_REQUEST.hasOwnProperty('didaskalia'))
		Main.didaskaliaFiltroDOM.focus();
	}, 100);

	return Main;
};

///////////////////////////////////////////////////////////////////////////////@

Didaskalia.prototype.domCreate = function() {
	return this.domUpdate($('<tr>').addClass('zebra'));
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
	return this.domUpdate($('<tr>').addClass('zebra'));
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
