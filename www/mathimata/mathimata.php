<?php
header('Content-type: application/json; charset: utf8;');
require_once("../lib/selida.php");

if (Selida::no_xristis())
exit(0);

$etos = $_POST["etos"];
$perigrafi = $_POST["perigrafi"];

$query = "SELECT * FROM `mathima` WHERE (1 = 1) ";

if ($etos)
$query .= "AND (`apo` BETWEEN '" . $etos . "-01-01' AND '" . $etos . "-12-31') ";

if ($perigrafi)
$query .= "AND (`perigrafi` LIKE '%" . $perigrafi . "%') ";

$query .= "ORDER BY `apo`, `eos`, `id`";

$result = Selida::query($query);

if (!$result)
exit(0);

print "[";
while ($row = $result->fetch_assoc())
print Selida::json_string($row) . ",";

$result->close();
print "null]";
exit(0);
?>
