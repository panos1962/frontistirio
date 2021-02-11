<?php

define("BASE_URL", $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["HTTP_HOST"] . "/frontistirio");

function selida_css($file) {
?>
<link rel="stylesheet" href="<?php print $file; ?>.css">
<?php
}

function selida_javascript($file) {
?>
<script src="<?php print $file; ?>.js"></script>
<?php
}

function selida_head_open() {
?>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link rel="icon" type="image/png" href="<?php print BASE_URL; ?>/ikona/frontistirio.png">
<?php
selida_css(BASE_URL . "/lib/selida");
selida_javascript(BASE_URL . "/lib/selida");
}

function selida_titlos($titlos) {
?>
<title>
<?php
print $titlos;
?>
</title>
<?php
}

function selida_body_open() {
?>
</head>
<body>
<?php
}

function selida_close() {
?>
</body>
</html>
<?php
}

?>
