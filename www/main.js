"use strict";

Selida.init.push(function() {
	if (Selida.isAnonimiXrisi())
	return Selida.egrafiTab().isodosTab();

	Selida.toolbarLeftDOM.
	append(Selida.tabCreate({
               'text': 'Μαθήματα',
               'href': Selida.baseUrl + '/mathimata',
       })).
	append(Selida.tabCreate({
               'text': 'Καθηγητές',
               'href': Selida.baseUrl + '/kathigites',
       }));

	Selida.xristisTab().exodosTab();
});
