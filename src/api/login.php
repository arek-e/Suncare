<?php
//Connecting to the database
require_once 'db_connection.php';

//get content from front-end, signUp.js
$content = file_get_contents("php://input");
// Convert the raw data from the front-end to JSON format in order to retrive values
$_POST = json_decode($content, true);


// if (!$conn -> query("SELECT `password` FROM `users` WHERE `email` = '". $_POST['email'] ."'")) {
//     echo("Error description: " . $conn -> error);
//   }

// Byt så det är rätt mail
$query = "SELECT `password` FROM `users` 
WHERE `email` = '". $_POST['email'] ."'";

$result = @mysqli_query($conn, $query);

if ($result == $_POST['password']) {
    echo json_encode(array("same" => true));
}
else{
    echo json_encode(array("same" => false));
};





?>