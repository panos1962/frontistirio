<?php
require_once('../lib/selida.php');

if (!array_key_exists("mathima", $_REQUEST)) {
	header('Location: ' . BASE_URL);
	exit(0);
}

Selida::
eponimi_xrisi_must()::
head_open()::
titlos("Μάθημα");

?>
<script>
Main.mathima = <?php print Selida::json_string($_REQUEST["mathima"]); ?>;
</script>
<?php

Selida::body_open();
?>
<div id="mathima">
<div id="mathimaId"></div>
<div id="mathimaPerigrafi"></div>
<div id="mathimaDiastima">
<div id="mathimaApo"></div>
<div id="mathimaEos"></div>
</div>
</div>
<?php
Selida::body_close();
?>
