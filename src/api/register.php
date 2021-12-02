<?php

require_once 'db_connection.php';

// Retrieve the contents of the php input request in the url
$rest_json = file_get_contents("php://input");

$_POST = json_decode($rest_json, true);


// // Perform a query, check for error
// if (!$conn -> query("INSERT INTO `user`(`email`, `password`, `firstName`, `lastName`, `phonenumber`,`cart_id`) VALUES ('". $_POST['email'] . "','" . $_POST['password'] . "','" . $_POST['firstName'] . "','" . $_POST['lastName'] . "','" . $_POST['phoneNum'] . "',4)")) {
//     echo("Error description: " . $conn -> error);
//   }

$query ="INSERT INTO `user`(`email`, `password`, `firstName`, `lastName`, `phonenumber`,`cart_id`) 
VALUES (
    '". $_POST['email'] . "',
    '" . $_POST['password'] . "',
    '" . $_POST['firstName'] . "',
    '" . $_POST['lastName'] . "','
    " . $_POST['phoneNum'] . "',
4)";

// Send back a response for the frontend 
$result = @mysqli_query($conn, $query);

if ($result) {
    echo json_encode(array("sent" => true));
} else {
    echo json_encode(array("sent" => false));
}
?>