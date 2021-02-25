"use strict";

const Selida = {};
Selida.init = [];

Selida.readyCount = 0;

Selida.checkReady = function() {
	Selida.readyCount++;

	if (Selida.readyCount !== 2)
	return;

	delete Selida.readyCount;
	delete Selida.checkReady;

	Selida.
	selidaSetup().
	init.forEach(function(x) {
		x();
	});

	return Selida;
};

$(document).ready(Selida.checkReady);
$(window).ready(Selida.checkReady);

Selida.selidaSetup = function() {
	Selida.windowDOM = $(window);
	Selida.bodyDOM = $(document.body);
	$('.imerominiaInput').datepicker();

	Selida.
	toolbarSetup().
	ofelimoSetup().
	ribbonSetup().
	ofelimoHeightSetup();

	setTimeout(function() {
		Selida.bodyDOM.css({
			'visibility': 'visible',
			'overflow-y': 'scroll',
		});
	}, 100);

	return Selida;
};

Selida.toolbarSetup = function() {
	Selida.toolbarDOM = $('<div>').
	attr('id', 'toolbar').
	appendTo(Selida.bodyDOM);

	Selida.toolbarDOM.
	append(Selida.toolbarLeftDOM = $('<div>').attr('id', 'toolbarLeft')).
	append(Selida.toolbarRightDOM = $('<div>').attr('id', 'toolbarRight'));

	Selida.toolbarLeftDOM.
	append(Selida.arxikiTabDOM = Selida.arxikiTab());

	Selida.klisimoTabDOM = Selida.klisimoTab();

	if (Selida.isXristis()) {
		Selida.toolbarLeftDOM.
		append(Selida.mathimataTabDOM = Selida.mathimataTab()).
		append(Selida.kathigitesTabDOM = Selida.kathigitesTab());

		Selida.toolbarRightDOM.
		append(Selida.xristisTabDOM = Selida.tabCreate({
			'text': Selida.xristis,
			'href': Selida.baseUrl + '/egrafi?update',
			'target': '_blank',
		})).
		append(Selida.exodosTabDOM = Selida.tabCreate({
			'text': 'Έξοδος',
			'href': function() {
				$.post({
					'url': Selida.baseUrl + '/lib/exodos.php',
					'success': function(rsp) {
						if (rsp === 'OK')
						self.location = Selida.baseUrl;
					},
					'fail': function(err) {
						console.error(err);
					},
				});
			},
		}));
	}

	else {
		Selida.toolbarRightDOM.
		append(Selida.egrafiTabDOM = Selida.tabCreate({
			'text': 'Εγγραφή',
			'href': Selida.baseUrl + '/egrafi',
		})).
		append(Selida.isodosTabDOM = Selida.tabCreate({
			'text': 'Είσοδος',
			'href': Selida.baseUrl + '/isodos',
		}));
	}

	return Selida;
};

Selida.tabCreate = function(opts) {
	if (!opts)
	opts = {};

	if (!opts.hasOwnProperty('text'))
	opts.text = '';

	if (!opts.hasOwnProperty('target'))
	opts.target = '_self';

	const tab = $('<a>').
	addClass('tab').
	text(opts.text);

	if (typeof(opts.href) === 'string')
	tab.attr({
		'href': opts.href,
		'target': opts.target,
	});

	else {
		tab.attr('href', '#');
		tab.on('click', function() {
			opts.href();
			return false;
		});
	}

	return tab;
};

Selida.arxikiTab = function() {
	return Selida.tabCreate({
		'href': Selida.baseUrl,
		'text': 'Αρχική',
	});

	return Selida;
};

Selida.klisimoTab = function() {
	return Selida.tabCreate({
		'href': function() {
			self.close();
		},
		'text': 'Κλείσιμο',
	});

	return Selida;
};

Selida.mathimataTab = function() {
	return Selida.tabCreate({
		'text': 'Μαθήματα',
		'href': Selida.baseUrl + '/mathimata',
		'target': '_self',
	}).appendTo(Selida.toolbarLeftDOM);
};

Selida.kathigitesTab = function() {
	return Selida.tabCreate({
		'text': 'Καθηγητές',
		'href': Selida.baseUrl + '/kathigites',
		'target': '_self',
	}).appendTo(Selida.toolbarLeftDOM);
};

Selida.ofelimoSetup = function() {
	Selida.ofelimoDOM = $('<div>').
	attr('id', 'ofelimo').
	appendTo(Selida.bodyDOM);

	Selida.windowDOM.on('resize', function() {
		Selida.ofelimoHeightSetup();
	});

	return Selida;
};

Selida.ribbonSetup = function() {
	Selida.ribbonDOM = $('<div>').
	attr('id', 'ribbon').
	appendTo(Selida.bodyDOM);

	Selida.ribbonDOM.
	append(Selida.ribbonLeftDOM = $('<div>').attr('id', 'ribbonLeft')).
	append(Selida.ribbonRightDOM = $('<div>').attr('id', 'ribbonRight'));

	return Selida;
};

Selida.ofelimoHeightSetup = function() {
	const pad = 1;

	Selida.bodyDOM.css('overflow-y', 'scroll');
	Selida.ofelimoDOM.css({
		'padding-top': pad + 'px',
		'padding-bottom': pad + 'px',
		'min-height': 0,
	});

	const th = Selida.toolbarDOM.outerHeight();
	const rh = Selida.ribbonDOM.outerHeight();
	const wh = Selida.windowDOM.height();
	const oh = wh - th - rh - pad - pad;

	Selida.ofelimoDOM.css('min-height', oh + 'px');

	return Selida;
};

Selida.isXristis = function() {
	return Selida.xristis;
};

Selida.noXristis = function() {
	return !Selida.isXristis();
};

///////////////////////////////////////////////////////////////////////////////@

Selida.fareaList = [ 'A', 'B', 'C', 'D', 'E', 'F' ];

Selida.fareaFix = function(form) {
	if (form.data('fareaFixed'))
	return Selida;

	Selida.fareaList.forEach(function(area) {
		const alist = form.find('.farea_' + area);
		let wmax = 0;

		alist.each(function(s) {
			const w = $(this).innerWidth();

			if (w > wmax)
			wmax = w;
		});

		alist.css('width', wmax + 'px');
	});

	form.data('fareaFixed', true);
	return Selida;
};

Selida.fareaFixReset = function(form) {
	form.removeData('fareaFixed');
	return Selida;
};

Selida.widthFix = function(dom, selector) {
	let cl = dom.find(selector);
	let cw = 0;

	cl.each(function() {
		let w = $(this).innerWidth();

		if (w > cw)
		cw = w;
	});

	cl.css('width', cw + 'px');

	return Selida;
};

Selida.formSuspend = function(forma, suspend) {
	forma.find('input').prop('disabled', suspend);
};


///////////////////////////////////////////////////////////////////////////////@

Selida.strpush = function(s, t, r) {
	if (t === undefined)
	return s;

	if (t === '')
	return s;

	if (r === undefined)
	r = ' ';

	if (s !== '')
	s += r;

	s += t

	return s;
};

Selida.strstrip = function(s) {
	return s.replace(/[\n\t]/g, " ").trim();
};

Selida.dmy2ymd = function(d) {
	if (!d)
	return '';

	const dmy = d.split(/[^0-9]/);

	if (dmy.length !== 3)
	return '';

	if (!(new Date(dmy[2], dmy[1] - 1, dmy[0])))
	return '';

	return dmy[2] + '-' + dmy[1] + '-' + dmy[0];
};

Selida.ymd2dmy = function(d) {
	if (!d)
	return '';

	const dmy = d.split(/[^0-9]/);

	if (dmy.length !== 3)
	return '';

	if (!(new Date(dmy[0], dmy[1] - 1, dmy[2])))
	return '';

	return dmy[2] + '-' + dmy[1] + '-' + dmy[0];
};

///////////////////////////////////////////////////////////////////////////////@

// Greek (el) initialisation for the jQuery UI date picker plugin.
// Written by Alex Cicovic (http://www.alexcicovic.com)

$.datepicker.setDefaults({
	'closeText': "Κλείσιμο",
	'prevText': "Προηγούμενος",
	'nextText': "Επόμενος",
	'currentText': "Σήμερα",
	'monthNames': [ "Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος",
		"Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος",
		"Νοέμβριος","Δεκέμβριος" ],
	'monthNamesShort': [ "Ιαν","Φεβ","Μαρ","Απρ","Μαι","Ιουν","Ιουλ","Αυγ",
		"Σεπ","Οκτ","Νοε","Δεκ" ],
	'dayNames': [ "Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη",
		"Παρασκευή","Σάββατο" ],
	'dayNamesShort': [ "Κυρ","Δευ","Τρι","Τετ","Πεμ","Παρ","Σαβ" ],
	'dayNamesMin': [ "Κυ","Δε","Τρ","Τε","Πε","Πα","Σα" ],
	'weekHeader': "Εβδ",
	'firstDay': 1,
	'isRTL': false,
	'showMonthAfterYear': false,
	'yearSuffix': "",
	'dateFormat': "dd-mm-yy",
});

///////////////////////////////////////////////////////////////////////////////@

const Mathima = function(attrs) {
	for (let i in attrs) {
		this[i] = attrs[i];
	}
};

Mathima.prototype.perigrafiSet = function(s) {
	this.perigrafi = Selida.strstrip(s);
	return this;
};

///////////////////////////////////////////////////////////////////////////////@

const Kathigitis = function(attrs) {
	for (let i in attrs) {
		this[i] = attrs[i];
	}
};

Kathigitis.prototype.onomateponimoGet = function() {
	let x = '';

	x = Selida.strpush(x, this.eponimo);
	x = Selida.strpush(x, this.onoma);
	x = Selida.strpush(x, this.patronimo.substr(0, 3));

	return x;
};

///////////////////////////////////////////////////////////////////////////////@
