<?php

    include('database\datebase.php');
    $search = $_POST['search'];

    if(!empty($search)) {
      $query = "SELECT * FROM tasks WHERE name LIKE '$search%'";
      $result = mysqli_query($connection, $query);
      
      if(!$result) {
        die('Query Error' . mysqli_error($connection));
      }
      
      $json = array();
      while($row = mysqli_fetch_array($result)) {
        $json[] = array(
          'name' => $row['name'],
          'description' => $row['description'],
          'id' => $row['task_id']
        );
      }
      $jsonstring = json_encode($json); //JSON_UNESCAPED_UNICODE
      echo $jsonstring;
    }


?>