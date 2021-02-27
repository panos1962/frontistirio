"use strict";

Selida.init.push(function() {
	Selida.eponimiXrisiMust();

	if (Selida.isChild())
	Selida.
	klisimoTab();

	else
	Selida.
	arxikiTab().
	kathigitesTab().
	xristisTab().
	exodosTab();

	Main.mathima = parseInt(Main.mathima);

	if (!Main.mathima)
	return self.location = Selida.baseUrl;

	Main.setup();

	$.post({
		'url': 'mathima.php',
		'data': {
			'mathima': Main.mathima,
		},
		'success': function(rsp) {
			Main.init(new Mathima(rsp));
		},
		'fail': function(err) {
			console.error(err);
		},
	});
});

Main.setup = function() {
	Main.mathimaDOM = $('#mathima').appendTo(Selida.ofelimoDOM);
	Main.mathimaIdDOM = $('#mathimaId');
	Main.mathimaPerigrafiDOM = $('#mathimaPerigrafi');
	Main.mathimaApoDOM = $('#mathimaApo');
	Main.mathimaEosDOM = $('#mathimaEos');

	return Main;
};

Main.init = function(mathima) {
	Main.mathima = mathima;
	Main.mathimaIdDOM.text(Main.mathima.id);
	Main.mathimaPerigrafiDOM.text(Main.mathima.perigrafi);
	Main.mathimaApoDOM.text(Selida.ymd2dmy(Main.mathima.apo));
	Main.mathimaEosDOM.text(Selida.ymd2dmy(Main.mathima.eos));

	return Main;
};
