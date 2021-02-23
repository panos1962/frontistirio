Mathimata = {};

Selida.init.push(function() {
	Selida.mathimataTabDOM.remove();
	Mathimata.
	filtraSetup().
	mathimataSetup().
	mathimaSetup();
});

Mathimata.filtraSetup = function() {
	Mathimata.filtraDOM = $('#formaFiltra').appendTo(Selida.ofelimoDOM);
	Mathimata.etosFiltroDOM = $('#etosFiltro');
	Mathimata.perigrafiFiltroDOM = $('#perigrafiFiltro');

	Mathimata.filtraDOM.
	on('submit', function() {
		const data = {};

		data.etos = Mathimata.etosFiltroDOM.val();
		data.perigrafi = Mathimata.perigrafiFiltroDOM.val();

		Mathimata.mathimataDOM.empty();
		$.post({
			'url': 'mathimata.php',
			'data': data,
			'success': function(rsp) {
				rsp.pop();
				rsp.forEach((x) => (new Mathima(x)).
				domCreate().
				appendTo(Mathimata.mathimataDOM));
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
			'my': 'left+10 top+40',
			'at': 'left top',
		},
		'minHeight': 0,
		'height': 'auto',
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
		'width': '34em',
		'resizable': false,
		'autoOpen': false,
	});

	Mathimata.mathimaFormaDOM.
	on('submit', function() {
		Mathimata.mathimaFormaSubmit();
		return false;
	});

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

	return Mathimata;
};

Mathimata.mathimaFormaClear = function() {
	Mathimata.mathimaFormaIdDOM.val('');
	Mathimata.mathimaFormaPerigrafiDOM.select();

	return Mathimata;
};

Mathimata.mathimaFormaSubmit = function() {
	const data = {};

	data.id = Mathimata.mathimaFormaIdDOM.val();
	data.perigrafi = Selida.strstrip(Mathimata.mathimaFormaPerigrafiDOM.val());
	data.apo = Mathimata.mathimaFormaApoDOM.val();
	data.eos = Mathimata.mathimaFormaEosDOM.val();

	$.post({
		'url': 'mathima.php',
		'data': data,
		'success': function(rsp) {
			const mathima = new Mathima(rsp);

			if (Mathimata.mathimaTrexonDOM)
			Mathimata.mathimaUpdate(mathima);

			else
			Mathimata.mathimaInsert(mathima);

			Mathimata.mathimaFormaPerigrafiDOM.focus();
		},
		'fail': function(err) {
			console.error(err);
		},
	});

	return Mathimata;
};

Mathimata.mathimaUpdate = function(mathima) {
	Mathimata.mathimaTrexonDOM.data('mathima', mathima);
	mathima.domUpdate(Mathimata.mathimaTrexonDOM);
};

Mathimata.mathimaInsert = function(mathima) {
	Mathimata.mathimaFormaIdDOM.val(mathima.id);
	Mathimata.mathimaTrexonDOM = mathima.
	domCreate().
	data('mathima', mathima).
	addClass('mathimaTrexon').
	appendTo(Mathimata.mathimataDOM);
	Selida.windowDOM.scrollTop(10000);
};

Mathimata.mathimaDialogOpen = function() {
	const mathima = Mathimata.mathimataDOM.
	find('.mathimaTrexon').data('mathima');

	Mathimata.mathimaFormaIdDOM.val(mathima.id);
	Mathimata.mathimaFormaPerigrafiDOM.val(mathima.perigrafi);
	Mathimata.mathimaFormaApoDOM.val(mathima.apo);
	Mathimata.mathimaFormaEosDOM.val(mathima.eos);

	Selida.fareaFix(Mathimata.mathimaFormaDOM);
};

///////////////////////////////////////////////////////////////////////////////@

Mathima.prototype.domCreate = function() {
	return this.domUpdate($('<tr>').data('mathima', this));
};

Mathima.prototype.domUpdate = function(dom) {
	dom.
	empty().
	append($('<td>').addClass('mathimaId').text(this.id)).
	append($('<td>').addClass('mathimaPerigrafi').text(this.perigrafi)).
	append($('<td>').addClass('mathimaApo').text(this.apo)).
	append($('<td>').addClass('mathimaEos').text(this.eos));

	return dom;
};
