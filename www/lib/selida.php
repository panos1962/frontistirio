<?php
session_start();

///////////////////////////////////////////////////////////////////////////////@

define("BASE_DIR", "/home/panos/Desktop/frontistirio");
define("BASE_URL", $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["HTTP_HOST"] . "/frontistirio");

class Selida {

///////////////////////////////////////////////////////////////////////////////@

static public function css($file) {
?>
<link rel="stylesheet" href="<?php print $file; ?>.css">
<?php
}

static public function javascript($file) {
?>
<script src="<?php print $file; ?>.js"></script>
<?php
}

///////////////////////////////////////////////////////////////////////////////@

static public function head_open() {
?>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link rel="icon" type="image/png" href="<?php print BASE_URL; ?>/ikona/frontistirio.png">
<?php
selida::css(BASE_URL . "/lib/selida");
selida::javascript(BASE_URL . "/lib/selida");
?>
<script>
Selida.baseUrl = '<?php print BASE_URL; ?>';
<?php
if (array_key_exists("xristis", $_SESSION)) {
?>
Selida.xristis = '<?php print $_SESSION["xristis"]; ?>';
<?php
}
else {
?>
delete Selida.xristis;
<?php
}
?>
</script>
<?php
}

static public function titlos($titlos) {
?>
<title>
<?php
print $titlos;
?>
</title>
<?php
}

static public function body_open() {
?>
</head>
<body>
<?php
}

static public function close() {
?>
</body>
</html>
<?php
}

///////////////////////////////////////////////////////////////////////////////@

static public $db = NULL;

static public function dbopen() {
	$pass = rtrim(file_get_contents(BASE_DIR . "/local/secret/sesami.txt"));
	self::$db = new mysqli("localhost", "frontistirio", $pass, "frontistirio");

	if (self::$db->connect_errno) {
		self::$db = NULL;
		exit(1);
	}

	if (!self::$db->set_charset("utf8mb4"))
	exit(1);

	return TRUE;
}

static public function dbclose() {
	if (!isset(self::$db))
	return;

	self::$db->close();
	self::$db = NULL;
}

static public function sql_string($s) {
	return "'" . self::$db->real_escape_string($s) . "'";
}

///////////////////////////////////////////////////////////////////////////////@
}

register_shutdown_function('Selida::dbclose');
?>
