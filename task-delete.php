<?php
    include('database\datebase.php');

    if(isset($_POST['id'])) {
        $id = $_POST['id'];
        $query = "DELETE FROM tasks WHERE task_id = $id";
        $result = mysqli_query($connection, $query);

        if(!$result) {
            die("Query failed: ". mysqli_error($connection));
        }

        echo "Task deleted successfully";
    }


?>