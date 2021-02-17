<?php
require_once("../lib/selida.php");

if (Selida::no_xristis()) {
	header('Location: ' . BASE_URL);
	exit(0);
}

Selida::
head_open()::
titlos("Μαθήματα")::
head_close();
?>
