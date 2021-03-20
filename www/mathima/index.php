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
<input class="panelButton" id="didaskaliaInsert" type="button" value="Προσθήκη">
</form>
<table id="didaskalia">
</table>
</div>

<!--
Ακολουθεί η φόρμα διαλόγου ενημέρωσης στοιχείων διδάσκοντος. Σ' αυτή τη φόρμα
ο χρήστης μπορεί να ενημερώσει τα στοιχεία διδάσκοντος, να διαγράψει κάποιον
διδάσκοντα, ή να προσθέσει νέο διδάσκοντα.
-->

<div id="didaskaliaDialog" title="Φόρμα ενημέρωσης διδάσκοντος">
<form id="didaskaliaForma">

<div class="formaInputLine">
<div class="prompt farea_A">Id</div>
<input id="didaskaliaFormaId">
</div>

<div class="formaInputLine">
<div class="prompt farea_A">Ονοματεπώνυμο</div>
<input id="didaskaliaFormaOnomateponimo" disabled="yes">
</div>

<div class="formaPanel">
<input type="submit" class="panelButton" value="Υποβολή">
<input type="button" class="panelButton" id="didaskaliaFormaDelete" value="Διαγραφή">
<input type="button" class="panelButton" id="didaskaliaFormaCancel" value="Άκυρο">
</div>

</form>
</div>

<!--
-->

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
