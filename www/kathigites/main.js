"use strict";

Selida.init.push(function() {
	Selida.
	eponimiXrisiMust().
	arxikiTab().
	mathimataTab().
	xristisTab().
	exodosTab();

	Main.
	filtraSetup().
	kathigitesSetup().
	kathigitisFormaSetup();

	setTimeout(function() {
		Main.eponimoFiltroDOM.focus();
	}, 100);
});

Main.filtraSetup = function() {
	Main.filtraDOM = $('#formaFiltra');
	Main.eponimoFiltroDOM = $('#eponimoFiltro');
	Main.onomaFiltroDOM = $('#onomaFiltro');
	Main.patronimoFiltroDOM = $('#patronimoFiltro');
	Main.energosFiltroDOM = $('#energosFiltro');

	Selida.ofelimoDOM.
	append(Main.filtraDOM).
	on('submit', function() {
		const data = {};

		data.eponimo = Main.eponimoFiltroDOM.val();
		data.onoma = Main.onomaFiltroDOM.val();
		data.patronimo = Main.patronimoFiltroDOM.val();

		if (Main.energosFiltroDOM.is(':checked'))
		data.katastasi = "energos";

		else
		data.katastasi = "oloi";

		Main.kathigitesClear();
		$.post({
			'url': 'kathigites.php',
			'data': data,
			'success': function(rsp) {
				rsp.pop();
				Main.kathigitesDisplay(rsp);
			},
			'fail': function(err) {
				console.error(err);
			},
		});

		Main.eponimoFiltroDOM.focus();
		return false;
	}).
	on('reset', function() {
		Main.kathigitesClear();
		Main.eponimoFiltroDOM.focus();
	});

	return Main;
};

Main.kathigitesClear = function() {
	Main.kathigitisDialogDOM.dialog('close');
	delete Main.kathigitisTrexonDOM;
	Main.kathigitesDOM.empty();

	return Main;
};

Main.kathigitesSetup = function() {
	Selida.ofelimoDOM.
	append($('<div>').attr('id', 'kathigitesWrapper').
	append(Main.kathigitesDOM = $('<table>').
	attr('id', 'kathigites')));

	Main.kathigitesDOM.
	on('click', 'tr', function() {
		if (Main.kathigitisTrexonDOM)
		Main.kathigitisTrexonDOM.removeClass('trexon');

		Main.kathigitisTrexonDOM = $(this).addClass('trexon');
		Main.kathigitisDialogDOM.dialog('close').dialog('open');
	});

	Main.kathigitesZoomSetup();
	return Main;
};

Main.kathigitesZoomSetup = function() {
	if (Selida.noZoom())
	return Main;

	Selida.zoom = self.parent.Main[Selida.php_REQUEST['zoom']];

	Main.kathigitesDOM.
	on('mouseenter', '.zoomReturn', function(e) {
		e.stopPropagation();
		$(this).addClass('zoomReturnEndixi');
	}).
	on('mouseleave', '.zoomReturn', function(e) {
		e.stopPropagation();
		$(this).removeClass('zoomReturnEndixi');
	}).
	on('click', '.zoomReturn', function(e) {
		e.stopPropagation();
		Selida.zoom($(this).parent().data('kathigitis'));
	});

	return Main;
};

Main.kathigitisDialogOpen = function() {
	const kathigitis = Main.kathigitisTrexonDOM.data('kathigitis');

	Main.kathigitisFormaIdDOM.val(kathigitis.id);
	Main.kathigitisFormaEponimoDOM.val(kathigitis.eponimo);
	Main.kathigitisFormaOnomaDOM.val(kathigitis.onoma);
	Main.kathigitisFormaPatronimoDOM.val(kathigitis.patronimo);
	Main.kathigitisFormaGenisiDOM.val(kathigitis.genisi);
	Main.kathigitisFormaEgrafiDOM.val(kathigitis.egrafi);
	Main.kathigitisFormaApoxorisiDOM.val(kathigitis.apoxorisi);

	Selida.fareaFix(Main.kathigitisFormaDOM);
};

Main.kathigitisFormaSetup = function() {
	Main.kathigitisFormaDOM = $('#kathigitisForma');
	Main.kathigitisFormaIdDOM = $('#kathigitisFormaId');
	Main.kathigitisFormaEponimoDOM = $('#kathigitisFormaEponimo');
	Main.kathigitisFormaOnomaDOM = $('#kathigitisFormaOnoma');
	Main.kathigitisFormaPatronimoDOM = $('#kathigitisFormaPatronimo');
	Main.kathigitisFormaGenisiDOM = $('#kathigitisFormaGenisi').datepicker();
	Main.kathigitisFormaEgrafiDOM = $('#kathigitisFormaEgrafi').datepicker();
	Main.kathigitisFormaApoxorisiDOM = $('#kathigitisFormaApoxorisi').datepicker();

	Main.kathigitisDialogDOM = $('#kathigitisFormaDialog').
	dialog({
		'open': Main.kathigitisDialogOpen,
		'position': {
			'my': 'right top', 
			'at': 'right-10 top+80',
		},
		'width': '32em',
		'resizable': false,
		'autoOpen': false,
	});

	Main.kathigitisFormaDOM.
	on('submit', Main.kathigitisFormaSubmit);

	return Main;
};

Main.kathigitisFormaSubmit = function() {
	const data = {};

	data.id = Main.kathigitisFormaIdDOM.val();
	data.eponimo = Main.kathigitisFormaEponimoDOM.val();
	data.onoma = Main.kathigitisFormaOnomaDOM.val();
	data.patronimo = Main.kathigitisFormaPatronimoDOM.val();
	data.genisi = Main.kathigitisFormaGenisiDOM.val();
	data.egrafi = Main.kathigitisFormaEgrafiDOM.val();
	data.apoxorisi = Main.kathigitisFormaApoxorisiDOM.val();

	$.post({
		'url': 'kathigitisUpdate.php',
		'data': data,
		'success': function(rsp) {
			if (rsp !== 'OK')
			return;

			const kathigitis = new Kathigitis(data);
			kathigitis.domUpdate(Main.kathigitisTrexonDOM);
		},
		'fail': function(err) {
			console.error(err);
		},
	});

	return false;
};

Main.kathigitesDisplay = function(klist) {
	for (let i = 0; i < klist.length; i++) {
		new Kathigitis(klist[i]).
		domCreate().
		appendTo(Main.kathigitesDOM);
	}

	return Main;
};

///////////////////////////////////////////////////////////////////////////////@

Kathigitis.prototype.domCreate = function() {
	return this.domUpdate($('<tr>').addClass('zebra'));
};

Kathigitis.prototype.domUpdate = function(dom) {
	dom.
	data('kathigitis', this).
	empty().
	append($('<td>').addClass('kathigitisId zoomReturn').text(this.id)).
	append($('<td>').addClass('kathigitisEgrafi').text(this.egrafi)).
	append($('<td>').addClass('kathigitiOnomateponimo').text(this.onomateponimoGet())).
	append($('<td>').addClass('kathigitisGenisi').text(this.genisi)).
	append($('<td>').addClass('kathigitisApoxorisi').text(this.apoxorisi));

	return dom;
};
