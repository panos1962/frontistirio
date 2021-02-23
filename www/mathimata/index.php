<?php
require_once("../lib/selida.php");

Selida::
must_eponimi_xrisi()::
head_open()::
titlos("Μαθήματα")::
body_open();
?>

<form id="formaFiltra">

<div class="prompt">Έτος</div>
<input id="etosFiltro" type="number" value="<?php print date("Y"); ?>">

<div class="prompt">Περιγραφή</div>
<input id="perigrafiFiltro" type="text">

<input type="reset" class="panelButton" value="Clear">
<input type="submit" class="panelButton" value="Go!">

</form>

<div id="mathimataWrapper">
<table id="mathimata">
</table>
</div>

<div id="mathimaDialog" title="Φόρμα ενημέρωσης μαθήματος">
<form id="mathimaForma">

<div class="formaInputLine">
<div class="prompt farea_A">Id</div>
<input id="mathimaFormaId" disabled="yes">
</div>

<div class="formaInputLine">
<div class="prompt farea_A">Περιγραφή</div>
<textarea id="mathimaFormaPerigrafi" rows="5" cols="44" maxlength="128">
</textarea>
</div>

<div class="formaInputLine">
<div class="prompt farea_A">Από</div>
<input id="mathimaFormaApo" type="date">
</div>

<div class="formaInputLine">
<div class="prompt farea_A">Έως</div>
<input id="mathimaFormaEos" type="date">
</div>

<div class="formaPanel">
<input type="submit" class="panelButton" value="Υποβολή">
<input type="button" class="panelButton" id="mathimaFormaInsert" value="Νέο">
<input type="button" class="panelButton" id="mathimaFormaDelete" value="Διαγραφή">
<input type="button" class="panelButton" id="mathimaFormaCancel" value="Άκυρο">
</div>

</form>
</div>

<div id="confirmDelete" title="Επιβεβαίωση διαγραφής">
<div id="confirmDeleteText">
Μετά τη διαγραφή του μαθήματος δεν υπάρχει τρόπος επαναφοράς.
Παρακαλώ επιβεβαιώστε τη διαγραφή.
</div>
<div class="formaPanel">
<input type="button" class="panelButton" id="confirmDeleteDelete" value="Διαγραφή">
<input type="button" class="panelButton" id="confirmDeleteCancel" value="Ακύρωση">
</div>
</div>

<?php
Selida::
body_close();
?>
