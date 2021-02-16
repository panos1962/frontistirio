<?php
header('Content-Type: application/json; charset=utf8;');
require_once("../lib/selida.php");

if (Selida::no_xristis())
exit(0);

$query = "SELECT * FROM `xristis`" .
	" WHERE `login` = " . Selida::sql_string($_SESSION["xristis"]);

$result = Selida::query($query);

if (!$result)
exit(0);

$xristis = NULL;

while ($row = $result->fetch_assoc())
$xristis = $row;

$result->close();

if (!isset($xristis))
exit(0);

unset($xristis["password"]);
print Selida::json_string($xristis);
?>
