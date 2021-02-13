<?php
require_once("lib/selida.php");

Selida::
head_open()::
titlos("Φροντιστήριο");

if (Selida::no_xristis())
Selida::
css("welcome")::
javascript("welcome");

Selida::body_open();

if (Selida::no_xristis())
require_once("welcome.html");

Selida::body_close();
?>
