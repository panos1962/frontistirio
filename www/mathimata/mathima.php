<?php
header('Content-type: application/json; charset: utf8;');
require_once("../lib/selida.php");

if (Selida::no_xristis())
exit(0);

if (Selida::is_post("id"))
update_mathima();

else
insert_mathima();

function insert_mathima() {
	$query = "INSERT INTO `mathima` (" .
		"`perigrafi`," .
		"`apo`," .
		"`eos`" .
	") VALUES (" .
		Selida::sql_string($_POST["perigrafi"]) . "," .
		Selida::sql_string($_POST["apo"]) . "," .
		Selida::sql_string($_POST["eos"]) .
	")";

	if (!Selida::query($query))
	exit(0);

	if (Selida::$db->affected_rows != 1)
	exit(0);

	print_mathima(Selida::$db->insert_id);
}

function update_mathima() {
	$query = "UPDATE `mathima` SET " .
		"`perigrafi` = " . Selida::sql_string($_POST["perigrafi"]) . "," .
		"`apo` = " . Selida::sql_string($_POST["apo"]) . "," .
		"`eos` = " . Selida::sql_string($_POST["eos"]) . " " .
		"WHERE `id` = " . $_POST["id"];

	if (!Selida::query($query))
	exit(0);

	if (Selida::$db->affected_rows != 1)
	exit(0);

	print_mathima($_POST["id"]);
}

function print_mathima($id) {
	print '{' .
		'"id":' . $id . "," .
		'"perigrafi":' . Selida::json_string($_POST["perigrafi"]) . ',' .
		'"apo":' . Selida::json_string($_POST["apo"]) . ',' .
		'"eos":' . Selida::json_string($_POST["eos"]) .
	'}';
}
?>
