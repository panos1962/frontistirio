<?php
require_once("../lib/selida.php");

Selida::
must_eponimi_xrisi()::
head_open()::
titlos("Καθηγητές")::
body_open();
?>

<form id="formaFiltra">

<div class="prompt">
Επώνυμο
</div>
<input id="eponimoFiltro" value="ro">

<div class="prompt">
Όνομα
</div>
<input id="onomaFiltro">

<div class="prompt">
Πατρώνυμο
</div>
<input id="patronimoFiltro">

<div class="prompt">
Ενεργοί
</div>
<input name="katastasi" id="energosFiltro" type="radio" value="energos" checked="yes">

<div class="prompt">
Όλοι
</div>
<input name="katastasi" id="oloiFiltro" type="radio" value="oloi">

<input id="clearFiltro" type="reset" value="Clear">
<input id="submitFiltro" type="submit" value="Go!">

</form>

<div id="kathigitisFormaWrapper">
<form id="kathigitisForma">

<div class="prompt">
Id
</div>
<input id="kathigitisFormaId">

<div class="prompt">
Επώνυμο
</div>
<input id="kathigitisFormaEponimo">

<div class="prompt">
Όνομα
</div>
<input id="kathigitisFormaOnoma">

<div class="prompt">
Πατρώνυμο
</div>
<input id="kathigitisFormaPatronimo">

</form>
</div>

<?php
?>
