<?php
header('Content-type: application/json; charset: utf8;');
require_once("../lib/selida.php");

print '{"dummy":true';
mathima();
didaskalia();
simetoxi();
print '}';

function mathima() {
	if (Selida::no_post("mathima"))
	return;

	$query = "SELECT * FROM `mathima` WHERE `id` = " . $_POST["mathima"];

	$result = Selida::query($query);

	if (!$result)
	exit(0);

	$mathima = $result->fetch_assoc();
	$result->close();

	if (!$mathima)
	exit(0);

	print ',"mathima":' . Selida::json_string($mathima);
}

function didaskalia() {
	$mathima = Selida::is_post("mathima");

	if (!$mathima)
	$mathima = Selida::is_post("didaskalia");

	if (!$mathima)
	return;

	$query = "SELECT `id`, `eponimo`, `onoma`, `patronimo`" .
		" FROM `didaskalia`" .
		" LEFT JOIN `kathigitis` ON `kathigitis` = `id`" .
		" WHERE (`mathima` = " . $mathima . ")" .
		" ORDER BY `eponimo`, `onoma`, `patronimo`, `id`";

	$result = Selida::query($query);

	if (!$result)
	return;

	print ',"didaskalia":[';

	while ($mathima = $result->fetch_assoc())
	print Selida::json_string($mathima) . ",";

	$result->close();
	print 'null]';
}

function simetoxi() {
	$mathima = Selida::is_post("mathima");

	if (!$mathima)
	$mathima = Selida::is_post("simetoxi");

	if (!$mathima)
	return;

	$query = "SELECT `id`, `eponimo`, `onoma`, `patronimo`" .
		" FROM `simetoxi`" .
		" LEFT JOIN `mathitis` ON `mathitis` = `id`" .
		" WHERE `mathima` = " . $mathima .
		" ORDER BY `eponimo`, `onoma`, `patronimo`, `id`";

	$result = Selida::query($query);

	if (!$result)
	return;

	print ',"simetoxi":[';

	while ($mathima = $result->fetch_assoc())
	print Selida::json_string($mathima) . ",";

	$result->close();
	print 'null]';
}
?>
