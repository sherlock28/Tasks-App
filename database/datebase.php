<?php
    $connection = mysqli_connect("localhost", "root", "", "tasks-app") or die ("Could not connect");
    mysqli_set_charset($connection, "utf8");
?>