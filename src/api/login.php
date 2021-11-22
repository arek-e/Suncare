<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

require_once 'db_connection.php';

// Retrieve the contents of the php input request in the url
$rest_json = file_get_contents("php://input");

$_POST = json_decode($rest_json, true);

$query ="INSERT INTO `users` (`username`, `email`, `password`) 
VALUES (
'" . $_POST['username'] . "',
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