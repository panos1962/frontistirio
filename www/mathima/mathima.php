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

print '{"mathima":' . Selida::json_string($mathima);

print ',"didskalia":[';

$query = "SELECT `id`, `eponimo`, `onoma`, `patronimo`" .
	" FROM `kathigitis`" .
	" WHERE `` = " . $_POST["mathima"] .
	" ORDER BY `

exit(0);

function lathos($s) {
	global $query;

	print '{"error":' . Selida::json_string($s) . '}';
	exit(0);
}
?>
