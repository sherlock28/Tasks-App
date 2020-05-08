<?php
    include('database\datebase.php');

    $query = "SELECT * FROM tasks";
    $result = mysqli_query($connection, $query);

    if(!$result) {
        die("Query failed ".mysqli_error($connection));
    }

    $json = array();
    while($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'name' => $row['name'],
            'description' => $row['description'],
            'id' => $row['task_id']
        );
    }
    
    $jsonstring = json_encode($json);
    echo $jsonstring;

    // $i = 0;
    // while($row = mysqli_fetch_array($result)) {
    //     $rawdata[$i] = $row;
    //     $i++;
    // }

    
?>