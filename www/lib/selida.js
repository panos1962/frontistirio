"use strict";

const Selida = {};

$(document).ready(function() {
console.log('>>' + Selida.xristis + '<<');
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
	append(Selida.toolbarLeftDOM = $('<div>').attr('id', 'toolbarLeft').text('LEFT')).
	append(Selida.toolbarRightDOM = $('<div>').attr('id', 'toolbarRight'));

	if (Selida.xristis) {
		Selida.toolbarRightDOM.
		append(Selida.xristis).
		append('Έξοδος');
	}

	else {
		Selida.toolbarRightDOM.
		append($('<div>').addClass('toolbarTab').text('Εγγραφή')).
		append($('<div>').addClass('toolbarTab').text('Είσοδος'));
	}

	return Selida;
};

Selida.ofelimoSetup = function() {
	Selida.ofelimoDOM = $('<div>').
	attr('id', 'ofelimo').
	appendTo(Selida.bodyDOM);

	$(window).on('resize', function() {
		Selida.ofelimoHeightSetup();
	});

	return Selida;
};

Selida.ribbonSetup = function() {
	Selida.ribbonDOM = $('<div>').
	attr('id', 'ribbon').
	appendTo(Selida.bodyDOM);

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
