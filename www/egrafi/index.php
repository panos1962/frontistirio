<?php
require_once("../lib/selida.php");

unset($_SESSION["xristis"]);

Selida::head_open();
Selida::titlos("Εγγραφή");
Selida::css("main");
Selida::javascript("main");

?>
<script>
delete Selida.xristis;
</script>
<?php

Selida::body_open();
Selida::close();
?>
