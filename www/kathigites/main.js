Kathigites = {};

Selida.init.push(function() {
	Selida.kathigitesTabDOM.remove();
	Kathigites.
	filtraCreate().
	kathigitesCreate();

	Kathigites.filtraDOM.trigger('submit');
});

Kathigites.filtraCreate = function() {
	Kathigites.filtraDOM = $('<form>').
	attr('id', 'formaFiltra').

	append($('<div>').addClass('prompt').text('Επώνυμο')).
	append(Kathigites.eponimoFiltroDOM = $('<input>').attr({
		'id': 'eponimoFiltro',
		'type': 'text',
		'value': 'ro',
	})).

	append($('<div>').addClass('prompt').text('Όνομα')).
	append(Kathigites.onomaFiltroDOM = $('<input>').attr({
		'id': 'onomaFiltro',
		'type': 'text',
		'value': '',
	})).

	append($('<div>').addClass('prompt').text('Πατρώνυμο')).
	append(Kathigites.patronimoFiltroDOM = $('<input>').attr({
		'id': 'patronimoFiltro',
		'type': 'text',
		'value': '',
	})).

	append($('<div>').addClass('prompt').text('Ενεργοί')).
	append(Kathigites.energosFiltroDOM = $('<input>').
	attr({
		'id': 'energosFiltro',
		'name': 'katastasi',
		'type': 'radio',
		'value': 'energos',
	}).
	prop({
		'checked': true,
	})).

	append($('<div>').addClass('prompt').text('Όλοι')).
	append(Kathigites.oloiFiltroDOM = $('<input>').attr({
		'id': 'oloiFiltro',
		'name': 'katastasi',
		'type': 'radio',
		'value': 'oloi',
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
	append(Kathigites.filtraDOM).
	on('submit', function() {
		const data = {};

		data.eponimo = Kathigites.eponimoFiltroDOM.val();
		data.onoma = Kathigites.onomaFiltroDOM.val();
		data.patronimo = Kathigites.patronimoFiltroDOM.val();

		if (Kathigites.energosFiltroDOM.is(':checked'))
		data.katastasi = "energos";

		else
		data.katastasi = "oloi";

		Kathigites.kathigitesDOM.empty();
		$.post({
			'url': 'kathigites.php',
			'data': data,
			'success': function(rsp) {
				rsp.pop();
				Kathigites.kathigitesDisplay(rsp);
			},
			'fail': function(err) {
				console.error(err);
			},
		});

		return false;
	});

	Kathigites.eponimoFiltroDOM.focus();
	return Kathigites;
};

Kathigites.kathigitesCreate = function() {
	Selida.ofelimoDOM.
	append($('<div>').
	attr('id', 'kathigitesWrapper').
	resizable().

	append(Kathigites.kathigitesDOM = $('<table>').
	attr('id', 'kathigites')));

	return Kathigites;
};

Kathigites.kathigitesDisplay = function(klist) {
	for (let i = 0; i < klist.length; i++) {
		(new Kathigitis(klist[i])).
		domCreate().
		appendTo(Kathigites.kathigitesDOM);
	}

	return Kathigites;
};

///////////////////////////////////////////////////////////////////////////////@

Kathigitis.prototype.domCreate = function() {
	return $('<tr>').
	append($('<td>').addClass('kathigitisId').text(this.id)).
	append($('<td>').addClass('kathigitisEgrafi').text(this.egrafi)).
	append($('<td>').addClass('kathigitiOnomateponimo').text(this.onomateponimoGet())).
	append($('<td>').addClass('kathigitisGenisi').text(this.genisi)).
	append($('<td>').addClass('kathigitisApoxorisi').text(this.apoxorisi));

	return dom;
};
