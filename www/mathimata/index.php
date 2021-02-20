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

<input type="reset" value="Clear">
<input type="submit" value="Go!">

</form>

<div id="mathimataWrapper">
<table id="mathimata">
</table>
</div>

<div id="mathimaForma" title="Φόρμα ενημέρωσης μαθήματος">
xxx
</div>

<?php
Selida::
body_close();
?>
