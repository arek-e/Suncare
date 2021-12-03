<?php
require_once 'db_connection.php';
// Retrieve the contents of the php input request in the url
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// Perform a query, check for error
// if (!$conn -> query("INSERT INTO `users`(`email`, `password`, `first_name`, `last_name`, `phone_number`,`adminFlag`) VALUES ('". $_POST['email'] . "','" . $_POST['password'] . "','" . $_POST['first_name'] . "','" . $_POST['last_name'] . "','" . $_POST['phone_number'] . "', 0)")) {
//     echo("Error description: " . $conn -> error);
//   }

if(!empty($_POST)){
    $query ="INSERT INTO `users`(`email`, `password`, `first_name`, `last_name`, `phone_number`,`adminFlag`) 
    VALUES (
        '". $_POST['email'] . "',
        '" . $_POST['password'] . "',
        '" . $_POST['firstName'] . "',
        '" . $_POST['lastName'] . "','
        " . $_POST['phoneNum'] . "',
        0
    )";
};

// Send back a response for the frontend 
$result = @mysqli_query($conn, $query);

if ($result) {
    echo json_encode(array("sent" => true));
} else {
    echo json_encode(array("sent" => false));
}
?>