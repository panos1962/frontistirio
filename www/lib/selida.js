"use strict";

const Selida = {};

$(document).ready(function() {
	Selida.selidaSetup();
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

	if (Selida.xristis) {
		Selida.toolbarRightDOM.
		append(Selida.tabCreate({
			'text': Selida.xristis,
			'href': 'profile',
		})).
		append(Selida.tabCreate({
			'text': 'Έξοδος',
			'href': function() {
				alert('asdasd');
			},
		}));
	}

	else {
		Selida.toolbarRightDOM.
		append(Selida.tabCreate({
			'text': 'Εγγραφή',
			'href': 'egrafi',
		})).
		append(Selida.tabCreate({
			'text': 'Είσοδος',
			'href': 'isodos',
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
	tab.attr('href', opts.href);

	else {
		tab.attr('href', '#');
		tab.on('click', function() {
			opts.href();
			return false;
		});
	}

	return tab;
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
	Selida.ofelimoDOM.css('height', 'auto');

	const th = Selida.toolbarDOM.outerHeight();
	const rh = Selida.ribbonDOM.outerHeight();
	const wh = Selida.windowDOM.height();
	const oh = wh - th - rh;

	Selida.ofelimoDOM.css('height', oh + 'px');

	return Selida;
};
