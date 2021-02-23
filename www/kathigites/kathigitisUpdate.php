<?php
require_once('../lib/selida.php');

if (Selida::no_xristis())
exit(0);

$id = $_POST["id"];

$eponimo = Selida::sql_string($_POST["eponimo"]);
$onoma = Selida::sql_string($_POST["onoma"]);
$patronimo = Selida::sql_string($_POST["patronimo"]);

$genisi = "STR_TO_DATE(" . Selida::sql_string($_POST["genisi"]) . ", '%d-%m-%Y')";
$egrafi = "STR_TO_DATE(" . Selida::sql_string($_POST["egrafi"]) . ", '%d-%m-%Y')";

$apoxorisi = $_POST["apoxorisi"];

if (!$apoxorisi)
$apoxorisi = "NULL";

else
$apoxorisi = "STR_TO_DATE(" . Selida::sql_string($apoxorisi) . ", '%d-%m-%Y')";

$query = "UPDATE `kathigitis` SET " .
	"`eponimo` = " . $eponimo . ", " .
	"`onoma` = " . $onoma . ", " .
	"`patronimo` = " . $patronimo . ", " .
	"`genisi` = " . $genisi . ", " .
	"`egrafi` = " . $egrafi . ", " .
	"`apoxorisi` = " . $apoxorisi . " " .
	"WHERE `id` = " . $_POST["id"];

if (!Selida::query($query))
exit(0);

if (Selida::$db->affected_rows < 1)
exit(0);

print 'OK';
exit(0);

?>
