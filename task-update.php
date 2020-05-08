<?php
    include('database\datebase.php');
    
    $task_id = $_POST['id'];
    $name =  $_POST['name'];
    $description = $_POST['description'];

    $query = "UPDATE tasks SET name='$name', description='$description' WHERE task_id= $task_id";

    $result = mysqli_query($connection, $query);

    if(!$result) {
        die("Query failed ".mysqli_error($connection));
    }

    echo "Update task successfully";
?>