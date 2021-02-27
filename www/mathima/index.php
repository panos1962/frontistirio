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

<div id="didaskaliaWrapper">
<table>
<thead>
<tr>
<td>
ID
</td>
<td>
Ονοματεπώνυμο καθηγητή
</td>
</tr>
</thead>
<tbody id="didaskalia"></tbody>
</table>
</div>

<div id="simetoxiWrapper">
<table>
<thead>
<tr>
<td>
ID
</td>
<td>
Ονοματεπώνυμο μαθητή
</td>
</tr>
</thead>
<tbody id="simetoxi"></tbody>
</table>
</div>

<?php
Selida::body_close();
?>
