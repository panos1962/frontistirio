<?php
require_once("../lib/selida.php");
Selida::anonimi_xrisi();

$query = "INSERT INTO `xristis` (" .
	"`login`, " .
	"`onomateponimo`, " .
	"`password`" .
") VALUES (" .
	Selida::sql_string($_POST["login"]) . ", " .
	Selida::sql_string($_POST["onomateponimo"]) . ", " .
	Selida::sql_string(sha1($_POST["password"])) .
")";

if (!Selida::query($query))
exit(0);

if (Selida::$db->affected_rows !== 1)
exit(0);

$_SESSION["xristis"] = $_POST["login"];
exit("OK");
?>
