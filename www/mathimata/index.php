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
<input id="perigrafiFiltro" type="text" value="ext">

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
<textarea id="mathimaFormaPerigrafi" rows="3" cols="44" maxlength="128">
</textarea>
</div>

<div class="formaPanel">
<input type="reset" value="Clear">
<input type="submit" value="Go!">
<input type="button" value="Cancel">
</div>

</form>
</div>

<?php
Selida::
body_close();
?>
