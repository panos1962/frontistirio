<?php
header('Content-Type: application/json; charset=utf8;');
require_once("../lib/selida.php");

if (Selida::no_xristis())
Selida::error_exit_json("Ανώνυμη χρήση");

$query = "SELECT * FROM `xristis`" .
	" WHERE `login` = " . Selida::sql_string($_SESSION["xristis"]);

$result = Selida::query($query);

if (!$result)
error_exit_json("SQL error");

$xristis = NULL;

while ($row = $result->fetch_assoc())
$xristis = $row;

$result->close();

if (!isset($xristis))
error_exit_json("account not found");

unset($xristis["password"]);
print Selida::json_string($xristis);

function error_exit_json($msg) {
	Selida::anonimi_xrisi();
	exit('{"error":' . Selida::json_string($msg) . '}');
}
?>
