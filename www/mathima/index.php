<?php
require_once('../lib/selida.php');

Selida::
eponimi_xrisi_must()::
head_open()::
titlos("Μάθημα")::
body_open();
?>
<div id="mathima">
<div id="mathimaId"></div>
<div id="mathimaPerigrafi"></div>
<div id="mathimaDiastima">
<div id="mathimaApo"></div>
<div id="mathimaEos"></div>
</div>
</div>

<div id="didaskaliaWrapper">
<div class="epikefalida">
Διδάσκοντες
</div>
<form id="didaskaliaFiltraForma">
<label for="didaskaliaFiltro">&#x1f50d;</label>
<input id="didaskaliaFiltro">
<input class="panelButton" type="reset" value="Clear">
<input class="panelButton" type="submit" value="Go!">
</form>
<table id="didaskalia"></table>
</div>

<div id="simetoxiWrapper">
<div class="epikefalida">
Μαθητές
</div>
<form id="simetoxiFiltraForma">
<label for="simetoxiFiltro">&#x1f50d;</label>
<input id="simetoxiFiltro">
<input class="panelButton" type="reset" value="Clear">
<input class="panelButton" type="submit" value="Go!">
</form>
<table id="simetoxi"></table>
</div>

<?php
Selida::body_close();
?>
