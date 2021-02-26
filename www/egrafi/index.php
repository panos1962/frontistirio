<?php
require_once("../lib/selida.php");

if (array_key_exists("update", $_REQUEST)) {
	$titlos = "Ενημέρωση";
	$update = 1;
}
else {
	$titlos = "Εγγραφή";
	$update = 0;
}

Selida::
anonimi_xrisi($update)::
head_open();
?>
<script>
Account.updateMode = <?php print $update; ?>;
</script>
<?php
Selida::
titlos($titlos)::
head_close();
?>
