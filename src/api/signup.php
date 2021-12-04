<?php
require_once 'db_connection.php';

//get content from front-end, signUp.js
$content = file_get_contents("php://input");
// Convert the raw data from the front-end to JSON format in order to retrive values
$_POST = json_decode($content, true);

// if (!$conn -> query("INSERT INTO users(email, password, first_name, last_name, phone_number,adminFlag) VALUES ('". $_POST['email'] . "','" . $_POST['password'] . "','" . $_POST['first_name'] . "','" . $_POST['last_name'] . "','" . $_POST['phone_number'] . "', 0)")) {
//     echo("Error description: " . $conn -> error);
//   }

$query = "INSERT INTO `users`(`email`, `password`, `first_name`, `last_name`, `phone_number`, `adminFlag`) 
VALUES (
    '". $_POST['email'] ."',
    '". $_POST['password'] ."',
    '". $_POST['firstName'] ."',
    '". $_POST['lastName'] ."',
    '". $_POST['phoneNumber'] ."',
    0
)";

$result = @mysqli_query($conn, $query);

if($result){
    echo json_encode(array("sent" => true));
}
else{
    echo json_encode(array("sent" => false));
};


?>