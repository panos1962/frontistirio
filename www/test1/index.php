<?php
require_once("../lib/selida.php");

selida_head_open();
selida_titlos("TEST");
selida_css("selida");

selida_body_open();
selida_toolbar_open();
?>
TOOLBAR
<?php
selida_toolbar_close();
?>
BODY1
BODY2
BODY3
<?php
selida_close();
?>
