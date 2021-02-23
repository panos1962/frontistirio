<?php
header('Content-type: application/json; charset: utf8;');
require_once("../lib/selida.php");

if (Selida::no_xristis())
exit(0);

$eponimo = $_POST["eponimo"];
$onoma = $_POST["onoma"];
$patronimo = $_POST["patronimo"];
$katastasi = $_POST["katastasi"];

$query = "SELECT " .
	"`id`, " .
	"`eponimo`, " .
	"`onoma`, " .
	"`patronimo`, " .
	"DATE_FORMAT(`genisi`, '%d-%m-%Y') AS `genisi`, " .
	"DATE_FORMAT(`egrafi`, '%d-%m-%Y') AS `egrafi`, " .
	"DATE_FORMAT(`apoxorisi`, '%d-%m-%Y') AS `apoxorisi` " .
	"FROM `kathigitis` WHERE (1 = 1)";

if ($eponimo)
$query .= " AND (`eponimo` LIKE '%" . $eponimo . "%')";

if ($onoma)
$query .= " AND (`onoma` LIKE '%" . $onoma . "%')";

if ($patronimo)
$query .= " AND (`patronimo` LIKE '%" . $patronimo . "%')";

if ($katastasi === "energos")
$query .= " AND (`apoxorisi` IS NULL)";

$query .= " ORDER BY `eponimo`, `onoma`, `patronimo`, `id`";

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
