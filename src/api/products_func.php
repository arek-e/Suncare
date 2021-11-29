<?php
require_once 'db_connection.php';

// Retrieve the contents of the php input request in the url
$rest_json = file_get_contents("php://input");

$_POST = json_decode($rest_json, true);

if(isset($_POST['function']) && !empty($_POST['function'])){

    $functionCall = $_POST['function'];
    
    switch($functionCall) {
        case 'get_products':
            get_products($conn);
    }
}
else{
    echo json_encode("Did not run function");
}

function get_products($conn)
{
    $query = "SELECT * FROM `Products`";
    $result = @mysqli_query($conn, $query);
    
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    
    echo json_encode($json);
}


?>