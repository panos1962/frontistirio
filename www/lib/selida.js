"use strict";

var Main = {};
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
	init.forEach((x) => x());

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
	ribbonSetup();

	return Selida;
};

Selida.isZoom = function() {
	return Selida.php_REQUEST.hasOwnProperty('zoom');
};

Selida.noZoom = function() {
	return !Selida.isZoom();
};

Selida.toolbarSetup = function() {
	Selida.toolbarDOM = $('<div>').attr('id', 'toolbar');

	if (Selida.isZoom())
	Selida.toolbarDOM.addClass('zoomHide');

	Selida.toolbarDOM.
	append(Selida.toolbarLeftDOM = $('<div>').attr('id', 'toolbarLeft')).
	append(Selida.toolbarRightDOM = $('<div>').attr('id', 'toolbarRight'));

	Selida.bodyDOM.append(Selida.toolbarDOM);
	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

Selida.arxikiTab = function(dom) {
	if (!dom)
	dom = Selida.toolbarLeftDOM;

	dom.
	append(Selida.arxikiTabDOM = Selida.tabCreate({
		'href': Selida.baseUrl,
		'text': 'Αρχική',
	}));

	return Selida;
};

Selida.klisimoTab = function(dom) {
	if (!dom)
	dom = Selida.toolbarRightDOM;

	dom.
	append(Selida.klisimoTabDOM = Selida.tabCreate({
		'href': function() {
			self.close();
		},
		'text': 'Κλείσιμο',
	}));

	return Selida;
};

Selida.egrafiTab = function() {
	Selida.toolbarRightDOM.
	append(Selida.egrafiTabDOM = Selida.tabCreate({
		'text': 'Εγγραφή',
		'href': Selida.baseUrl + '/egrafi',
	}));

	return Selida;
};

Selida.isodosTab = function() {
	Selida.toolbarRightDOM.
	append(Selida.isodosTabDOM = Selida.tabCreate({
		'text': 'Είσοδος',
		'href': Selida.baseUrl + '/isodos',
	}));

	return Selida;
};

Selida.xristisTab = function() {
	Selida.toolbarRightDOM.
	append(Selida.xristisTabDOM = Selida.tabCreate({
		'text': Selida.xristis,
		'href': Selida.baseUrl + '/egrafi?update',
		'target': '_blank',
	}));

	return Selida;
};

Selida.exodosTab = function() {
	Selida.toolbarRightDOM.
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

	return Selida;
};

Selida.mathimataTab = function() {
	Selida.toolbarLeftDOM.
	append(Selida.tabCreate({
		'text': 'Μαθήματα',
		'href': Selida.baseUrl + '/mathimata',
		'target': '_self',
	}));

	return Selida;
};

Selida.kathigitesTab = function() {
	Selida.toolbarLeftDOM.
	append(Selida.tabCreate({
		'text': 'Καθηγητές',
		'href': Selida.baseUrl + '/kathigites',
		'target': '_self',
	}));

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

///////////////////////////////////////////////////////////////////////////////@

Selida.ofelimoSetup = function() {
	Selida.ofelimoDOM = $('<div>').
	attr('id', 'ofelimo').
	appendTo(Selida.bodyDOM);

	return Selida;
};

Selida.ribbonSetup = function() {
	Selida.ribbonDOM = $('<div>').attr('id', 'ribbon');

	if (Selida.isZoom())
	Selida.ribbonDOM.addClass('zoomHide');

	Selida.ribbonDOM.
	append(Selida.ribbonLeftDOM = $('<div>').attr('id', 'ribbonLeft')).
	append(Selida.ribbonRightDOM = $('<div>').attr('id', 'ribbonRight'));

	Selida.bodyDOM.append(Selida.ribbonDOM);
	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

Selida.isXristis = function() {
	return Selida.xristis;
};

Selida.noXristis = function() {
	return !Selida.isXristis();
};

Selida.isEponimiXrisi = Selida.isXristis;
Selida.isAnonimiXrisi = Selida.noXristis;

Selida.eponimiXrisiMust = function() {
	if (Selida.isAnonimiXrisi())
	self.location = Selida.baseUrl;

	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

Selida.isChild = function() {
	return Selida.child;
};

Selida.isAftonomi = function() {
	return !Selida.isChild();
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

const Didaskalia = function(attrs) {
	for (let i in attrs) {
		this[i] = attrs[i];
	}
};

Didaskalia.prototype.onomateponimoGet = function() {
	if (this.hasOwnProperty('onomateponimo'))
	return this.onomateponimo;

	let x = '';

	x = Selida.strpush(x, this.eponimo);
	x = Selida.strpush(x, this.onoma);
	x = Selida.strpush(x, this.patronimo.substr(0, 3));

	return x;
};

///////////////////////////////////////////////////////////////////////////////@

const Simetoxi = function(attrs) {
	for (let i in attrs) {
		this[i] = attrs[i];
	}
};

Simetoxi.prototype.onomateponimoGet = function() {
	if (this.hasOwnProperty('onomateponimo'))
	return this.onomateponimo;

	let x = '';

	x = Selida.strpush(x, this.eponimo);
	x = Selida.strpush(x, this.onoma);
	x = Selida.strpush(x, this.patronimo.substr(0, 3));

	return x;
};

///////////////////////////////////////////////////////////////////////////////@
