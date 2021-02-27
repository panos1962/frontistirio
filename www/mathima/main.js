"use strict";

Selida.init.push(function() {
	Selida.eponimiXrisiMust();
	Main.
	mathimaMust().
	toolbarSetup().
	mathimaSetup().
	didaskaliaSetup().
	simetoxiSetup();

	$.post({
		'url': 'mathima.php',
		'data': {
			'mathima': Main.mathima,
		},
		'success': function(rsp) {
			Main.processMathima(rsp);
		},
		'fail': function(err) {
			console.error(err);
		},
	});
});

Main.mathimaMust = function() {
	Main.mathima = parseInt(Main.mathima);

	if (!Main.mathima)
	return self.location = Selida.baseUrl;

	return Main;
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

Main.processMathima = function(rsp) {
	Main.mathima = new Mathima(rsp.mathima);

	Main.mathimaIdDOM.text(Main.mathima.id);
	Main.mathimaPerigrafiDOM.text(Main.mathima.perigrafi);
	Main.mathimaApoDOM.text(Selida.ymd2dmy(Main.mathima.apo));
	Main.mathimaEosDOM.text(Selida.ymd2dmy(Main.mathima.eos));

	if (Selida.php_REQUEST.hasOwnProperty('didaskalia'))
	Main.didaskaliaWrapperDOM.css('display', 'block');

	if (Selida.php_REQUEST.hasOwnProperty('simetoxi'))
	Main.simetoxiWrapperDOM.css('display', 'block');

	return Main;
};

///////////////////////////////////////////////////////////////////////////////@

Main.didaskaliaToggle = function() {
	const display = Main.didaskaliaWrapperDOM.css('display');

	Main.didaskaliaWrapperDOM.
	css('display', display === 'none' ? 'block' : 'none');

	return Main;
};

Main.didaskaliaSetup = function() {
	Selida.ofelimoDOM.
	append(Main.didaskaliaWrapperDOM = $('#didaskaliaWrapper'));

	return Main;
};

///////////////////////////////////////////////////////////////////////////////@

Main.simetoxiToggle = function() {
	const display = Main.simetoxiWrapperDOM.css('display');

	Main.simetoxiWrapperDOM.
	css('display', display === 'none' ? 'block' : 'none');

	return Main;
};

Main.simetoxiSetup = function() {
	Selida.ofelimoDOM.
	append(Main.simetoxiWrapperDOM = $('#simetoxiWrapper'));

	return Main;
};

///////////////////////////////////////////////////////////////////////////////@
