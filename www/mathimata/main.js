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
		Mathimata.mathimataDOM.find('tr').removeClass('mathimaTrexon');
		$(this).addClass('mathimaTrexon');
		Mathimata.mathimaFormaDOM.
		dialog('close').
		dialog('open');
	});

	return Mathimata;
};

Mathimata.mathimaSetup = function() {
	Mathimata.mathimaFormaDOM = $('#mathimaForma').
	appendTo(Selida.ofelimoDOM).
	dialog({
		'autoOpen': false,
		'open': Mathimata.mathimaFormaOpen,
		'position': {
			'my': 'right-10 top+40',
			'at': 'right top',
		},
	});

	return Mathimata;
};

Mathimata.mathimaFormaOpen = function() {
	const dom = Mathimata.mathimataDOM.find('.mathimaTrexon');

	Mathimata.mathimaFormaDOM.dialog('open');
	Mathimata.mathimaFormaDOM.
	empty().
	append(dom.data('mathima').id);
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
	return $('<tr>').
	data('mathima', this).
	append($('<td>').addClass('mathimaId').text(this.id)).
	append($('<td>').addClass('mathimaPerigrafi').text(this.perigrafi)).
	append($('<td>').addClass('mathimaApo').text(this.apo)).
	append($('<td>').addClass('mathimaEos').text(this.eos));

	return dom;
};
