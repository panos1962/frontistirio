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
<input id="perigrafiFiltro" type="text" value="ex">

<div class="formaPanel">
<input type="reset" value="Clear">
<input type="submit" value="Go!">
</div>

</form>

<div id="mathimataWrapper">
<table id="mathimata">
</table>
</div>

<div id="mathimaDialog" title="Φόρμα ενημέρωσης μαθήματος">
<form id="mathimaForma">

<div class="formaInputLine">
<div class="prompt">Id</div>
<input id="mathimaFormaId" disabled="yes">
</div>

<div class="formaInputLine">
<div class="prompt">Περιγραφή</div>
<textarea id="mathimaFormaPerigrafi" rows="5" cols="44" maxlength="128">
</textarea>
</div>

<div class="formaInputLine">
<div class="prompt">Από</div>
<input id="mathimaFormaApo" type="date">
</div>

<div class="formaInputLine">
<div class="prompt">Έως</div>
<input id="mathimaFormaEos" type="date">
</div>

<div class="formaPanel">
<input type="submit" value="Υποβολή">
<input type="button" id="mathimaFormaInsert" value="Νέο">
<input type="button" id="mathimaFormaDelete" value="Διαγραφή">
<input type="button" id="mathimaFormaCancel" value="Cancel">
</div>

</form>
</div>

<?php
Selida::
body_close();
?>
