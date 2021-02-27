<?php
header('Content-type: application/json; charset: utf8;');
require_once("../lib/selida.php");

$query = "SELECT * FROM `mathima` WHERE `id` = " . $_POST["mathima"];

$result = Selida::query($query);

if (!$result)
lathos("SQL error");

$mathima = $result->fetch_assoc();
$result->close();

if (!$mathima)
lathos("mathima not found");

print Selida::json_string($mathima);
exit(0);

function lathos($s) {
	global $query;

	print '{"error":' . Selida::json_string($s) . '}';
	exit(0);
}
?>
