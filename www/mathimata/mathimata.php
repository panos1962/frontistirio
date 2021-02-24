<?php
header('Content-type: application/json; charset: utf8;');
require_once("../lib/selida.php");

if (Selida::no_xristis())
exit(0);

$query = "SELECT * FROM `mathima` " . where_clause() . " ORDER BY `apo`, `eos`, `id`";
$result = Selida::query($query);

if (!$result)
exit(0);

print "[";

while ($row = $result->fetch_assoc())
print Selida::json_string($row) . ",";

$result->close();

print "null]";
exit(0);

function where_clause() {
	$id = $_POST["id"];
	$etos = $_POST["etos"];
	$perigrafi = $_POST["perigrafi"];

	$con = "WHERE ";

	if ($id)
	return $con . "`id` = " . $id;

	$s = "";

	if ($etos) {
		$s .= $con . "(`apo` BETWEEN '" . $etos . "-01-01' AND '" . $etos . "-12-31')";
		$con = " AND ";
	}

	if ($perigrafi) {
		$s .= $con . "(`perigrafi` LIKE '%" . $perigrafi . "%')";
		$con = " AND ";
	}

	return $s;
}

?>
