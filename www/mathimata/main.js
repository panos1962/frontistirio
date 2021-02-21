Mathimata = {};

Selida.init.push(function() {
	Selida.mathimataTabDOM.remove();
	Mathimata.
	filtraSetup().
	mathimataSetup().
	mathimaSetup();

	Mathimata.filtraDOM.trigger('submit');
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
		Mathimata.mathimaDialogDOM.
		dialog('close').
		dialog('open');
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
		'autoOpen': false,
		'open': Mathimata.mathimaDialogOpen,
		'position': {
			'my': 'right-10 top+40',
			'at': 'right top',
		},
		'width': 'auto',
		'resizable': false,
	});

	Mathimata.mathimaFormaDOM.
	on('submit', function() {
		Mathimata.mathimaFormaSubmit();
		return false;
	});

	$('#mathimaFormaInsert').on('click', function() {
		Mathimata.mathimaTrexonDOM.removeClass('mathimaTrexon');
		delete Mathimata.mathimaTrexonDOM;

		Mathimata.mathimaFormaIdDOM.val('');
		Mathimata.mathimaFormaPerigrafiDOM.select();
	});

	Mathimata.mathimaFormaCancelDOM = $('#mathimaFormaCancel').
	on('click', function() {
		Mathimata.mathimaDialogDOM.dialog('close');
	});

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
	const dom = Mathimata.mathimataDOM.find('.mathimaTrexon');
	const mathima = dom.data('mathima');

	Mathimata.mathimaFormaIdDOM.val(mathima.id);
	Mathimata.mathimaFormaPerigrafiDOM.val(mathima.perigrafi);
	Mathimata.mathimaFormaApoDOM.val(mathima.apo);
	Mathimata.mathimaFormaEosDOM.val(mathima.eos);

	Mathimata.mathimaDialogDOM.dialog('open');
	Selida.widthFix(Mathimata.mathimaFormaDOM, '.prompt');
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
