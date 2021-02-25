Mathimata = {};

Selida.init.push(function() {
	Selida.mathimataTabDOM.remove();
	Mathimata.
	filtraSetup().
	mathimaSetup().
	mathimataSetup();
Mathimata.filtraDOM.trigger('submit');
});

Mathimata.filtraSetup = function() {
	Mathimata.filtraDOM = $('#formaFiltra').appendTo(Selida.ofelimoDOM);
	Mathimata.etosFiltroDOM = $('#etosFiltro');
	Mathimata.perigrafiFiltroDOM = $('#perigrafiFiltro');
	Mathimata.idFiltroDOM = $('#idFiltro');

	Mathimata.filtraDOM.
	on('reset', function() {
		Mathimata.perigrafiFiltroDOM.select();
	}).
	on('submit', function() {
		const data = {};

		data.etos = Mathimata.etosFiltroDOM.val();
		data.perigrafi = Mathimata.perigrafiFiltroDOM.val();
		data.id = Mathimata.idFiltroDOM.val();

		Mathimata.mathimaDialogDOM.dialog('close');
		delete Mathimata.mathimaTrexonDOM;
		Mathimata.mathimataDOM.empty();
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
					appendTo(Mathimata.mathimataDOM));
				});
				Mathimata.perigrafiFiltroDOM.focus();
			},
			'fail': function(err) {
				console.error(err);
			},
		});

		return false;
	});

	Mathimata.perigrafiFiltroDOM.focus();
	return Mathimata;
};

Mathimata.mathimataSetup = function() {
	$('#mathimataWrapper').appendTo(Selida.ofelimoDOM);

	Mathimata.mathimataDOM = $('#mathimata').
	on('click', 'tr', function(e) {
		if (Mathimata.mathimaTrexonDOM)
		Mathimata.mathimaTrexonDOM.removeClass('mathimaTrexon');

		Mathimata.mathimaTrexonDOM = $(this).addClass('mathimaTrexon');
		Mathimata.mathimaDialogDOM.dialog('close').dialog('open');
	});

	Mathimata.confirmDeleteDOM = $('#confirmDelete').
	appendTo(Selida.ofelimoDOM).
	dialog({
		'autoOpen': false,
		'position': {
			'my': 'right-10 top+20',
			'at': 'right bottom',
			'of': Mathimata.mathimaFormaDOM.first(),
		},
		'minHeight': 0,
		'width': '30em',
		'resizable': false,
		'modal': true,
	});

	Mathimata.confirmDeleteDeleteDOM = $('#confirmDeleteDelete').
	on('click', function() {
		$.post({
			'url': 'mathimaDelete.php',
			'data': {
				"id": Mathimata.mathimaTrexonDOM.
					data('mathima').id,
			},
			'success': function(rsp) {
				if (rsp !== 'OK')
				return;

				if (Mathimata.mathimaTrexonDOM)
				Mathimata.mathimaTrexonDOM.remove();

				delete Mathimata.mathimaTrexonDOM;
				Mathimata.mathimaFormaClear();
				Mathimata.confirmDeleteDOM.dialog('close');
			},
			'fail': function(err) {
				console.error(err);
			},
		});
	});

	$('#confirmDeleteCancel').on('click', function() {
		Mathimata.confirmDeleteDOM.dialog('close');
	});

	return Mathimata;
};

Mathimata.mathimaSetup = function() {
	Mathimata.mathimaFormaDOM = $('#mathimaForma');
	Mathimata.mathimaFormaIdDOM = $('#mathimaFormaId');
	Mathimata.mathimaFormaPerigrafiDOM = $('#mathimaFormaPerigrafi');
	Mathimata.mathimaFormaApoDOM = $('#mathimaFormaApo');
	Mathimata.mathimaFormaEosDOM = $('#mathimaFormaEos');

	Mathimata.mathimaDialogDOM = $('#mathimaDialog').
	appendTo(Selida.ofelimoDOM).
	dialog({
		'open': Mathimata.mathimaDialogOpen,
		'position': {
			'my': 'right top',
			'at': 'right-10 top+40',
		},
		'width': 'auto',
		'resizable': false,
		'autoOpen': false,
	});

	Mathimata.mathimaFormaDOM.
	on('submit', Mathimata.mathimaFormaSubmit);

	$('#mathimaFormaInsert').on('click', function() {
		if (Mathimata.mathimaTrexonDOM)
		Mathimata.mathimaTrexonDOM.removeClass('mathimaTrexon');

		delete Mathimata.mathimaTrexonDOM;
		Mathimata.mathimaFormaClear();
	});

	$('#mathimaFormaDelete').on('click', function() {
		if (Mathimata.mathimaTrexonDOM)
		Mathimata.confirmDeleteDOM.dialog('open');
	});

	Mathimata.mathimaFormaCancelDOM = $('#mathimaFormaCancel').
	on('click', function() {
		Mathimata.mathimaDialogDOM.dialog('close');
	});

	Mathimata.mathimaFormaTabsSetup();
	return Mathimata;
};

Mathimata.mathimaFormaTabsSetup = function() {
	$('#mathimaFormaTabs').
	append(Selida.tabCreate({
		'href': Mathimata.mathimaFormaMathimaOpen,
		'text': 'Διδάσκοντες',
	})).
	append(Selida.tabCreate({
		'href': Mathimata.mathimaFormaMathimaOpen,
		'text': 'Συμμετέχοντες',
	}));

	return Mathimata;
};

Mathimata.mathimaFormaMathimaOpen = function() {
	const mathima = Mathimata.mathimaFormaIdDOM.val();

	if (!mathima)
	return;

	window.open(Selida.baseUrl + '/mathima?mathima=' + mathima, '_blank');
};

Mathimata.mathimaFormaClear = function() {
	Mathimata.mathimaFormaIdDOM.val('');
	Mathimata.mathimaFormaPerigrafiDOM.select();

	return Mathimata;
};

Mathimata.mathimaFormaSubmit = function() {
	const data = {};

	data.id = Mathimata.mathimaFormaIdDOM.val();

	if (!data.id.match(/^[0-9]*$/))
	return false;

	data.apo = Selida.dmy2ymd(Mathimata.mathimaFormaApoDOM.val());

	if (!data.apo) {
		Mathimata.mathimaFormaApoDOM.focus();
		return false;
	}

	data.eos = Selida.dmy2ymd(Mathimata.mathimaFormaEosDOM.val());

	if (!data.eos) {
		Mathimata.mathimaFormaEosDOM.focus();
		return false;
	}

	data.perigrafi = Selida.strstrip(Mathimata.mathimaFormaPerigrafiDOM.val());

	$.post({
		'url': 'mathima.php',
		'data': data,
		'success': function(rsp) {
			rsp.apo = Selida.ymd2dmy(rsp.apo);
			rsp.eos = Selida.ymd2dmy(rsp.eos);

			const mathima = new Mathima(rsp);

			if (Mathimata.mathimaTrexonDOM)
			mathima.domUpdate(Mathimata.mathimaTrexonDOM);

			else
			Mathimata.mathimaInsert(mathima);

			Mathimata.mathimaFormaPerigrafiDOM.focus();
		},
		'fail': function(err) {
			console.error(err);
		},
	});

	return false;
};

Mathimata.mathimaInsert = function(mathima) {
	Mathimata.mathimaFormaIdDOM.val(mathima.id);
	Mathimata.mathimaTrexonDOM = mathima.
	domCreate().
	addClass('mathimaTrexon').
	appendTo(Mathimata.mathimataDOM);
	Selida.windowDOM.scrollTop(10000);
};

Mathimata.mathimaDialogOpen = function() {
	const mathima = Mathimata.mathimataDOM.
	find('.mathimaTrexon').data('mathima');

	Mathimata.mathimaFormaIdDOM.val(mathima.id);
	Mathimata.mathimaFormaPerigrafiDOM.val(mathima.perigrafi).focus();
	Mathimata.mathimaFormaApoDOM.val(mathima.apo);
	Mathimata.mathimaFormaEosDOM.val(mathima.eos);

	Selida.fareaFix(Mathimata.mathimaFormaDOM);
};

///////////////////////////////////////////////////////////////////////////////@

Mathima.prototype.domCreate = function() {
	return this.domUpdate($('<tr>'));
};

Mathima.prototype.domUpdate = function(dom) {
	dom.
	data('mathima', this).
	empty().
	append($('<td>').addClass('mathimaId').text(this.id)).
	append($('<td>').addClass('mathimaPerigrafi').text(this.perigrafi)).
	append($('<td>').addClass('mathimaApo').text(this.apo)).
	append($('<td>').addClass('mathimaEos').text(this.eos));

	return dom;
};
