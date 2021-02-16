<?php
require_once("../lib/selida.php");

$update = array_key_exists("update", $_GET);

Selida::
anonimi_xrisi($update)::
head_open();

if ($update) {
?>
<script>
Egrafi.updateMode = true;
</script>
<?php
}

Selida::
titlos($update ? "Ενημέρωση" : "Εγγραφή")::
head_close();
?>
