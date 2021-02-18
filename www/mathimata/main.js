Mathimata = {};

Selida.init.push(function() {
	Selida.mathimataTabDOM.remove();
	Mathimata.
	filtraCreate().
	mathimataCreate();

	Mathimata.filtraDOM.trigger('submit');
});

Mathimata.filtraCreate = function() {
	Mathimata.filtraDOM = $('<form>').
	attr('id', 'formaFiltra').

	append($('<div>').addClass('prompt').text('Έτος')).
	append(Mathimata.etosFiltroDOM = $('<input>').attr({
		'id': 'etosFiltro',
		'type': 'number',
		'value': (new Date()).getFullYear(),
	})).

	append($('<div>').addClass('prompt').text('Περιγραφή')).
	append(Mathimata.perigrafiFiltroDOM = $('<input>').attr({
		'id': 'perigrafiFiltro',
		'type': 'text',
		'value': 'pproa%diagn',
	})).

	append($('<input>').attr({
		'type': 'reset',
		'value': 'Clear',
	})).

	append($('<input>').attr({
		'type': 'submit',
		'value': 'Go!',
	}));

	Selida.ofelimoDOM.
	append(Mathimata.filtraDOM).
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

Mathimata.mathimataCreate = function() {
	Mathimata.mathimataDOM = $('<table>').
	attr('id', 'mathimata').
	appendTo(Selida.ofelimoDOM);

	return Mathimata;
};

Mathimata.mathimataDisplay = function(mlist) {
	for (let i = 0; i < mlist.length; i++) {
		(new Mathima(mlist[i])).
		domCreate().
		appendTo(Mathimata.mathimataDOM);
	}

	Selida.ofelimoDOM.
	append(Mathimata.mathimataDOM);

	return Mathimata;
};

///////////////////////////////////////////////////////////////////////////////@

Mathima.prototype.domCreate = function() {
	return $('<tr>').
	append($('<td>').addClass('mathimaId').text(this.id)).
	append($('<td>').addClass('mathimaPerigrafi').text(this.perigrafi)).
	append($('<td>').addClass('mathimaApo').text(this.apo)).
	append($('<td>').addClass('mathimaEos').text(this.eos));

	return dom;
};
