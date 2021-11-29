<?php

require_once 'db_connection.php';

// Retrieve the contents of the php input request in the url
$rest_json = file_get_contents("php://input");

$_POST = json_decode($rest_json, true);

$query ="INSERT INTO `users` (`username`, `email`, `password`) 
VALUES (
'" . $_POST['firstName'] . "',
'" . $_POST['email'] . "',
'" . $_POST['password'] . "'
)";

// Send back a response for the frontend 
$result = @mysqli_query($conn, $query);
if ($result) {
    echo json_encode(array("sent" => true));
} else {
    echo json_encode(array("sent" => false));
}
?>