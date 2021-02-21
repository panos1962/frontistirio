<?php
require_once("../lib/selida.php");

if (Selida::no_xristis())
exit(0);

if (Selida::no_post("id"))
exit(0);
$query = "DELETE FROM `mathima` WHERE `id` = " . $_POST["id"];

if (!Selida::query($query))
exit(0);

if (Selida::$db->affected_rows < 1)
exit(0);

print 'OK';
exit(0);
?>
