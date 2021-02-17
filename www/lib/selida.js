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
	//ofelimoHeightSetup(false).
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
	prepend(Selida.arxikiTabDOM = Selida.tabArxiki());

	if (Selida.isXristis()) {
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

Selida.tabArxiki = function() {
	return Selida.tabCreate({
		'href': Selida.baseUrl,
		'text': 'Αρχική',
	});
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

Selida.ofelimoHeightSetup = function(scroll) {
	const pad = 1;

	Selida.bodyDOM.css('overflow-y', 'hidden');
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

	if (scroll !== false)
	Selida.bodyDOM.css('overflow-y', '');

	return Selida;
};

Selida.widthFix = function(dom, selector) {
	let cl = dom.children(selector);
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

///////////////////////////////////////////////////////////////////////////////@

const Mathima = function(attrs) {
	for (let i in attrs) {
		this[i] = attrs[i];
	}
};

///////////////////////////////////////////////////////////////////////////////@
