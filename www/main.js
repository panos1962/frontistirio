"use strict";

Selida.init.push(function() {
	Selida.arxikiTabDOM.remove();

	if (Selida.noXristis())
	return;

	Selida.tabCreate({
		'text': 'Μαθήματα',
		'href': 'mathimata',
		'target': '_blank',
	}).appendTo(Selida.toolbarLeftDOM);
});
