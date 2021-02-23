Kathigites = {};

Selida.init.push(function() {
	Selida.kathigitesTabDOM.remove();
	Kathigites.
	filtraSetup().
	kathigitesCreate().
	kathigitisFormaSetup();

	Kathigites.filtraDOM.trigger('submit');
});

Kathigites.filtraSetup = function() {
	Kathigites.filtraDOM = $('#formaFiltra');
	Kathigites.eponimoFiltroDOM = $('#eponimoFiltro');
	Kathigites.onomaFiltroDOM = $('#onomaFiltro');
	Kathigites.patronimoFiltroDOM = $('#patronimoFiltro');
	Kathigites.energosFiltroDOM = $('#energosFiltro');

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
	append($('<div>').attr('id', 'kathigitesWrapper').
	append(Kathigites.kathigitesDOM = $('<table>').
	attr('id', 'kathigites')));

	Kathigites.kathigitesDOM.
	on('click', 'tr', function() {
		if (Kathigites.kathigitisTrexonDOM)
		Kathigites.kathigitisTrexonDOM.removeClass('kathigitisTrexon');

		Kathigites.kathigitisTrexonDOM = $(this).addClass('kathigitisTrexon');
		Kathigites.kathigitisDialogDOM.dialog('close').dialog('open');
	});

	return Kathigites;
};

Kathigites.kathigitisDialogOpen = function() {
	const kathigitis = Kathigites.kathigitesDOM.
	find('.kathigitisTrexon').data('kathigitis');

	Kathigites.kathigitisFormaIdDOM.val(kathigitis.id);
	Kathigites.kathigitisFormaEponimoDOM.val(kathigitis.eponimo);
	Kathigites.kathigitisFormaOnomaDOM.val(kathigitis.onoma);
	Kathigites.kathigitisFormaPatronimoDOM.val(kathigitis.patronimo);

	Selida.fareaFix(Kathigites.kathigitisFormaDOM);
};

Kathigites.kathigitisFormaSetup = function() {
	Kathigites.kathigitisFormaDOM = $('#kathigitisForma');
	Kathigites.kathigitisFormaIdDOM = $('#kathigitisFormaId');
	Kathigites.kathigitisFormaEponimoDOM = $('#kathigitisFormaEponimo');
	Kathigites.kathigitisFormaOnomaDOM = $('#kathigitisFormaOnoma');
	Kathigites.kathigitisFormaPatronimoDOM = $('#kathigitisFormaPatronimo');

	Kathigites.kathigitisDialogDOM = $('#kathigitisFormaDialog').
	dialog({
		'open': Kathigites.kathigitisDialogOpen,
		'position': {
			'my': 'right top', 
			'at': 'right-10 top+40',
		},
		'width': '32em',
		'resizable': false,
		'autoOpen': false,
	});
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
	data('kathigitis', this).
	append($('<td>').addClass('kathigitisId').text(this.id)).
	append($('<td>').addClass('kathigitisEgrafi').text(this.egrafi)).
	append($('<td>').addClass('kathigitiOnomateponimo').text(this.onomateponimoGet())).
	append($('<td>').addClass('kathigitisGenisi').text(this.genisi)).
	append($('<td>').addClass('kathigitisApoxorisi').text(this.apoxorisi));

	return dom;
};
