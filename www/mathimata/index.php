<?php
require_once("../lib/selida.php");

Selida::
must_eponimi_xrisi()::
head_open()::
titlos("Μαθήματα")::
body_open();
?>

<!--
Ακολουθεί φόρμα υποβολής κριτηρίων αναζήτησης μαθημάτων. Παρέχονται
κριτήρια ως προς το id, το έτος έναρξης και την περιγραφή. Το πλήκτρο
[Clear] εκκαθάρίζει όλα τα κριτήρια και θέτει στο κριτήριο έτους το
τρέχον έτος, ενώ το πλήκτρο [Go!] υποβάλλει το αίτημα αναζήτησης στον
server.
-->

<form id="formaFiltra">

<div class="prompt">Έτος</div>
<input id="etosFiltro" type="number" value="<?php print date("Y"); ?>">

<div class="prompt">Περιγραφή</div>
<input id="perigrafiFiltro" type="text">

<div class="prompt">ID</div>
<input id="idFiltro" type="text">

<input type="reset" class="panelButton" value="Clear">
<input type="submit" class="panelButton" value="Go!">

</form>

<!--
Ακολουθεί το div παρουσίασης αποτελεσμάτων. Πρόκειται
για wrapper γύρω από τον πίνακα μαθημάτων.
-->

<div id="mathimataWrapper">
<table id="mathimata">
</table>
</div>

<!--
Ακολουθεί η φόρμα διαλόγου ενημέρωσης στοιχείων μαθήματος. Σ' αυτή τη φόρμα
ο χρήστης μπορεί να ενημερώσει τα στοιχεία μαθήματος, να διαγράψει κάποιο
μάθημα, ή να προσθέσει νέα μαθήματα.
-->

<div id="mathimaDialog" title="Φόρμα ενημέρωσης μαθήματος">
<form id="mathimaForma">

<div class="formaInputLine">
<div class="prompt farea_A">Id</div>
<input id="mathimaFormaId" disabled="yes">
<div id="mathimaFormaTabs">
</div>
</div>

<div class="formaInputLine">
<div class="prompt farea_A">Περιγραφή</div>
<textarea id="mathimaFormaPerigrafi" rows="5" cols="44" maxlength="128">
</textarea>
</div>

<div class="formaInputLine">
<div class="prompt farea_A">Από</div>
<input id="mathimaFormaApo" class="imerominiaInput">
</div>

<div class="formaInputLine">
<div class="prompt farea_A">Έως</div>
<input id="mathimaFormaEos" class="imerominiaInput">
</div>

<div class="formaPanel">
<input type="submit" class="panelButton" value="Υποβολή">
<input type="button" class="panelButton" id="mathimaFormaInsert" value="Νέο">
<input type="button" class="panelButton" id="mathimaFormaDelete" value="Διαγραφή">
<input type="button" class="panelButton" id="mathimaFormaCancel" value="Άκυρο">
</div>

</form>
</div>

<!--
Ακολουθεί φόρμα επιβεβαίωσης διαγραφής μαθήματος. Πρόκειται για modal φόρμα
διαλόγου στην οποία ο χρήστης είναι υποχρεωμένος είτε να επιβεβαιώσει τη
διαγραφή, είτε να προβεί σε ακύρωση της διαγραφής.
-->

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
