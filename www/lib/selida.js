"use strict";

const Selida = {};
Selida.init = [];

$(document).ready(function() {
	Selida.selidaSetup();

	Selida.init.forEach(function(x) {
		x();
	});
});

Selida.selidaSetup = function() {
	Selida.windowDOM = $(window);
	Selida.bodyDOM = $(document.body);

	Selida.
	toolbarSetup().
	ofelimoSetup().
	ribbonSetup().
	ofelimoHeightSetup();

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

	if (Selida.isXristis()) {
		Selida.toolbarLeftDOM.
		append(Selida.mathimataTabDOM = Selida.mathimataTab()).
		append(Selida.kathigitesTabDOM = Selida.kathigitesTab());

		Selida.toolbarRightDOM.
		append(Selida.xristisTabDOM = Selida.tabCreate({
			'text': Selida.xristis,
			'href': Selida.baseUrl + '/egrafi?update',
		})).
		append(Selida.tabCreate({
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

Selida.isXristis = function() {
	return Selida.xristis;
};

Selida.noXristis = function() {
	return !Selida.isXristis();
};

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

///////////////////////////////////////////////////////////////////////////////@

const Mathima = function(attrs) {
	for (let i in attrs) {
		this[i] = attrs[i];
	}
};

Mathima.prototype.perigrafiSet = function(s) {
	this.perigrafi = s.replace(/[\n\t]/g, " ").trim();
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
