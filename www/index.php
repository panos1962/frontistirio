<?php
session_start();
require_once("lib/selida.php");

selida_head_open();
selida_titlos("ABC");

?>
<script>
<?php
if (array_key_exists("xrisitis", $_SESSION)) {
?>
Selida.xristis = '<?php print $_SESSION["xristis"]; ?>';
<?php
}
else {
?>
Selida.xristis = undefined;
<?php
}
?>
</script>
<?Php

selida_body_open();
selida_close();
?>
