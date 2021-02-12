<?php
require_once("../lib/selida.php");
unset($_SESSION["xristis"]);

Selida::dbopen();

$query = "INSERT INTO `xristis` (" .
	"`login`, " .
	"`onomateponimo`, " .
	"`password`" .
") VALUES (" .
	Selida::sql_string($_POST["login"]) . ", " .
	Selida::sql_string($_POST["onomateponimo"]) . ", " .
	Selida::sql_string(sha1($_POST["password"])) .
")";

if (!Selida::$db->query($query))
exit();

if (Selida::$db->affected_rows !== 1)
exit();

$_SESSION["xristis"] = $_POST["login"];
exit("OK");
?>
