<?php
require_once("../lib/selida.php");

Selida::anonimi_xrisi();

$query = "SELECT `login` FROM `xristis`" .
	" WHERE `login` = " . Selida::sql_string($_POST["login"]) .
	" AND `password` = " . Selida::sql_string(sha1($_POST["password"]));

$result = Selida::query($query);

if (!$result)
exit(0);

$xristis = NULL;

while ($row = $result->fetch_assoc())
$xristis = $row["login"];

$result->close();

if (!isset($xristis))
exit(0);

Selida::eponimi_xrisi($xristis);
exit("OK");
?>
