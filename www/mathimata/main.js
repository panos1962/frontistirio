"use strict";

Selida.init.push(function() {
	Selida.
	eponimiXrisiMust().
	arxikiTab().
	kathigitesTab().
	xristisTab().
	exodosTab();

	Main.
	filtraSetup().
	mathimaSetup().
	mathimataSetup();

	setTimeout(function() {
		if (Selida.debug) {
			Main.idFiltroDOM.val('100002');
			Main.filtraDOM.trigger('submit');
		}

		else
		Main.perigrafiFiltroDOM.focus();
	}, 100);
});

Main.filtraSetup = function() {
	Main.filtraDOM = $('#formaFiltra').appendTo(Selida.ofelimoDOM);
	Main.etosFiltroDOM = $('#etosFiltro');
	Main.perigrafiFiltroDOM = $('#perigrafiFiltro');
	Main.idFiltroDOM = $('#idFiltro');

	Main.filtraDOM.
	on('submit', function() {
		const data = {};

		data.etos = Main.etosFiltroDOM.val();
		data.perigrafi = Main.perigrafiFiltroDOM.val();
		data.id = Main.idFiltroDOM.val();

		Main.mathimataClear();
		$.post({
			'url': 'mathimata.php',
			'data': data,
			'success': function(rsp) {
				rsp.pop();
				rsp.forEach(function(x) {
					x.apo = Selida.ymd2dmy(x.apo);
					x.eos = Selida.ymd2dmy(x.eos);
					(new Mathima(x).
					domCreate().
					appendTo(Main.mathimataDOM));
				});
				Main.perigrafiFiltroDOM.focus();
			},
			'fail': function(err) {
				console.error(err);
			},
		});

		return false;
	}).
	on('reset', function() {
		Main.mathimataClear();
		Main.perigrafiFiltroDOM.select();
	});

	return Main;
};

Main.mathimataSetup = function() {
	$('#mathimataWrapper').appendTo(Selida.ofelimoDOM);

	Main.mathimataDOM = $('#mathimata').
	on('click', 'tr', function() {
		if (Main.mathimaTrexonDOM)
		Main.mathimaTrexonDOM.removeClass('mathimaTrexon');

		Main.mathimaTrexonDOM = $(this).addClass('mathimaTrexon');
		Main.mathimaDialogDOM.dialog('close').dialog('open');
	});

	Main.confirmDeleteDOM = $('#confirmDelete').
	appendTo(Selida.ofelimoDOM).
	dialog({
		'autoOpen': false,
		'position': {
			'my': 'right-10 top+20',
			'at': 'right bottom',
			'of': Main.mathimaFormaDOM.first(),
		},
		'minHeight': 0,
		'width': '30em',
		'resizable': false,
		'modal': true,
	});

	Main.confirmDeleteDeleteDOM = $('#confirmDeleteDelete').
	on('click', function() {
		$.post({
			'url': 'mathimaDelete.php',
			'data': {
				"id": Main.mathimaTrexonDOM.
					data('mathima').id,
			},
			'success': function(rsp) {
				if (rsp !== 'OK')
				return;

				if (Main.mathimaTrexonDOM)
				Main.mathimaTrexonDOM.remove();

				delete Main.mathimaTrexonDOM;
				Main.mathimaFormaClear();
				Main.confirmDeleteDOM.dialog('close');
			},
			'fail': function(err) {
				console.error(err);
			},
		});
	});

	$('#confirmDeleteCancel').on('click', function() {
		Main.confirmDeleteDOM.dialog('close');
	});

	return Main;
};

Main.mathimataClear = function() {
	Main.mathimaDialogDOM.dialog('close');
	delete Main.mathimaTrexonDOM;
	Main.mathimataDOM.empty();

	return Main;
};

Main.mathimaSetup = function() {
	Main.mathimaFormaDOM = $('#mathimaForma');
	Main.mathimaFormaIdDOM = $('#mathimaFormaId');
	Main.mathimaFormaPerigrafiDOM = $('#mathimaFormaPerigrafi');
	Main.mathimaFormaApoDOM = $('#mathimaFormaApo');
	Main.mathimaFormaEosDOM = $('#mathimaFormaEos');

	Main.mathimaDialogDOM = $('#mathimaDialog').
	dialog({
		'open': Main.mathimaDialogOpen,
		'position': {
			'my': 'right top',
			'at': 'right-10 top+80',
		},
		'width': 'auto',
		'resizable': false,
		'autoOpen': false,
	});

	Main.mathimaFormaDOM.
	on('submit', Main.mathimaFormaSubmit);

	$('#mathimaFormaInsert').on('click', function() {
		if (Main.mathimaTrexonDOM)
		Main.mathimaTrexonDOM.removeClass('mathimaTrexon');

		delete Main.mathimaTrexonDOM;
		Main.mathimaFormaClear();
	});

	$('#mathimaFormaDelete').on('click', function() {
		if (Main.mathimaTrexonDOM)
		Main.confirmDeleteDOM.dialog('open');
	});

	Main.mathimaFormaCancelDOM = $('#mathimaFormaCancel').
	on('click', function() {
		Main.mathimaDialogDOM.dialog('close');
	});

	Main.mathimaFormaTabsSetup();
	return Main;
};

Main.mathimaFormaTabsSetup = function() {
	$('#mathimaFormaTabs').
	append(Selida.tabCreate({
		'href': function() {
			Main.mathimaFormaMathimaOpen('didaskalia');
		},
		'text': 'Διδάσκοντες',
	})).
	append(Selida.tabCreate({
		'href': function() {
			Main.mathimaFormaMathimaOpen('simetoxi');
		},
		'text': 'Συμμετέχοντες',
	}));

	return Main;
};

Main.mathimaFormaMathimaOpen = function(tag) {
	const mathima = Main.mathimaFormaIdDOM.val();

	if (!mathima)
	return;

	let url = Selida.baseUrl + '/mathima?child&mathima=' + mathima;

	if (tag)
	url += '&' + tag;

	window.open(url, '_blank');
};

Main.mathimaFormaClear = function() {
	Main.mathimaFormaIdDOM.val('');
	Main.mathimaFormaPerigrafiDOM.select();

	return Main;
};

Main.mathimaFormaSubmit = function() {
	const data = {};

	data.id = Main.mathimaFormaIdDOM.val();

	if (!data.id.match(/^[0-9]*$/))
	return false;

	data.apo = Selida.dmy2ymd(Main.mathimaFormaApoDOM.val());

	if (!data.apo) {
		Main.mathimaFormaApoDOM.focus();
		return false;
	}

	data.eos = Selida.dmy2ymd(Main.mathimaFormaEosDOM.val());

	if (!data.eos) {
		Main.mathimaFormaEosDOM.focus();
		return false;
	}

	data.perigrafi = Selida.strstrip(Main.mathimaFormaPerigrafiDOM.val());

	$.post({
		'url': 'mathima.php',
		'data': data,
		'success': function(rsp) {
			rsp.apo = Selida.ymd2dmy(rsp.apo);
			rsp.eos = Selida.ymd2dmy(rsp.eos);

			const mathima = new Mathima(rsp);

			if (Main.mathimaTrexonDOM)
			mathima.domUpdate(Main.mathimaTrexonDOM);

			else
			Main.mathimaInsert(mathima);

			Main.mathimaFormaPerigrafiDOM.focus();
		},
		'fail': function(err) {
			console.error(err);
		},
	});

	return false;
};

Main.mathimaInsert = function(mathima) {
	Main.mathimaFormaIdDOM.val(mathima.id);
	Main.mathimaTrexonDOM = mathima.
	domCreate().
	addClass('mathimaTrexon').
	appendTo(Main.mathimataDOM);
	Selida.windowDOM.scrollTop(10000);
};

Main.mathimaDialogOpen = function() {
	const mathima = Main.mathimaTrexonDOM.data('mathima');

	Main.mathimaFormaIdDOM.val(mathima.id);
	Main.mathimaFormaPerigrafiDOM.val(mathima.perigrafi).focus();
	Main.mathimaFormaApoDOM.val(mathima.apo);
	Main.mathimaFormaEosDOM.val(mathima.eos);

	Selida.fareaFix(Main.mathimaFormaDOM);
};

///////////////////////////////////////////////////////////////////////////////@

Mathima.prototype.domCreate = function() {
	return this.domUpdate($('<tr>'));
};

Mathima.prototype.domUpdate = function(dom) {
	return dom.
	data('mathima', this).
	empty().
	append($('<td>').addClass('mathimaId').text(this.id)).
	append($('<td>').addClass('mathimaPerigrafi').text(this.perigrafi)).
	append($('<td>').addClass('mathimaApo').text(this.apo)).
	append($('<td>').addClass('mathimaEos').text(this.eos));
};
