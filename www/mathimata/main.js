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
				Mathimata.mathimataDisplay(rsp);
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
		const mathima = Mathimata.mathimaTrexonDOM.data('mathima');

		mathima.perigrafiSet(Mathimata.mathimaFormaPerigrafiDOM.val());
		mathima.domUpdate(Mathimata.mathimaTrexonDOM);

		Mathimata.mathimaDialogDOM.dialog('close');
		return false;
	});

	Mathimata.mathimaFormaClearDOM = $('#mathimaFormaClear').
	on('click', function() {
		Mathimata.mathimaFormaPerigrafiDOM.val('');
		return false;
	});

	Mathimata.mathimaFormaCancelDOM = $('#mathimaFormaCancel').
	on('click', function() {
		Mathimata.mathimaDialogDOM.dialog('close');
	});

	return Mathimata;
};

Mathimata.mathimaDialogOpen = function() {
	const dom = Mathimata.mathimataDOM.find('.mathimaTrexon');
	const mathima = dom.data('mathima');

	Mathimata.mathimaFormaIdDOM.val(mathima.id);
	Mathimata.mathimaFormaPerigrafiDOM.val(mathima.perigrafi);

	Mathimata.mathimaDialogDOM.dialog('open');
	Selida.widthFix(Mathimata.mathimaFormaDOM, '.prompt');
};

Mathimata.mathimataDisplay = function(mlist) {
	for (let i = 0; i < mlist.length; i++) {
		(new Mathima(mlist[i])).
		domCreate().
		appendTo(Mathimata.mathimataDOM);
	}

	return Mathimata;
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
