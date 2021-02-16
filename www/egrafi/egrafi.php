<?php
require_once("../lib/selida.php");

if (!array_key_exists("mode", $_POST))
exit(0);

$mode = $_POST["mode"];

if ($mode === "update")
xristis_update();

else
xristis_egrafi();

function xristis_egrafi() {
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

	Selida::eponimi_xrisi($_POST["login"]);
	exit("OK");
}

function xristis_update() {
	if (Selida::no_xristis())
	exit(0);

	if ($_POST["login"] !== $_SESSION["xristis"])
	exit(0);

	$query = "UPDATE `xristis` SET `onomateponimo` = " .
		Selida::sql_string($_POST["onomateponimo"]);

	if ($_POST["password1"] !== "")
	$query .= ", `password` = " . Selida::sql_string(sha1($_POST["password1"]));

	$query .= " WHERE (`login` = " . Selida::sql_string($_POST["login"]) . ")" .
		" AND (`password` = " . Selida::sql_string(sha1($_POST["password"])) . ")";

	if (!Selida::query($query))
	exit(0);

	if (Selida::$db->affected_rows !== 1)
	exit(0);

	exit("OK");
}

?>
