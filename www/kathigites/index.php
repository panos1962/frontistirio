<?php
require_once("../lib/selida.php");

Selida::
eponimi_xrisi_must()::
head_open()::
titlos("Καθηγητές")::
body_open();
?>

<form id="formaFiltra">

<div class="prompt">Επώνυμο</div>
<input id="eponimoFiltro">

<div class="prompt">Όνομα</div>
<input id="onomaFiltro">

<div class="prompt">Πατρώνυμο</div>
<input id="patronimoFiltro">

<div class="prompt">Ενεργοί</div>
<input name="katastasi" id="energosFiltro" type="radio" value="energos" checked="yes">

<div class="prompt">Όλοι</div>
<input name="katastasi" id="oloiFiltro" type="radio" value="oloi">

<input class="panelButton" id="clearFiltro" type="reset" value="Clear">
<input class="panelButton" id="submitFiltro" type="submit" value="Go!">

</form>

<div id="kathigitisFormaDialog" title="Φόρμα ενημέρωσης καθηγητή">
<form id="kathigitisForma">

<div class="formaInputLine">
<div class="prompt farea_A">Id</div>
<input id="kathigitisFormaId" maxlength="4" disabled="yes">
</div>

<div class="formaInputLine">
<div class="prompt farea_A">Επώνυμο</div>
<input id="kathigitisFormaEponimo" maxlength="30">
</div>

<div class="formaInputLine">
<div class="prompt farea_A">Όνομα</div>
<input id="kathigitisFormaOnoma" maxlength="20">
</div>

<div class="formaInputLine">
<div class="prompt farea_A">Πατρώνυμο</div>
<input id="kathigitisFormaPatronimo" maxlength="20">
</div>

<div class="formaInputLine">
<div class="prompt farea_A">Ημ. γέννησης</div>
<input id="kathigitisFormaGenisi" class="kathigitisFormaImerominia" maxlength="10">
</div>

<div class="formaInputLine">
<div class="prompt farea_A">Εγγραφή</div>
<input id="kathigitisFormaEgrafi" class="kathigitisFormaImerominia" maxlength="10">
</div>

<div class="formaInputLine">
<div class="prompt farea_A">Αποχώρηση</div>
<input id="kathigitisFormaApoxorisi" class="kathigitisFormaImerominia" maxlength="10">
</div>

<div class="formaPanel">
<input type="submit" class="panelButton" value="Υποβολή">
<input type="button" class="panelButton" id="mathimaFormaInsert" value="Κλώνος">
<input type="button" class="panelButton" id="mathimaFormaDelete" value="Διαγραφή">
<input type="button" class="panelButton" id="mathimaFormaCancel" value="Άκυρο">
</div>

</form>
</div>

<?php
?>
