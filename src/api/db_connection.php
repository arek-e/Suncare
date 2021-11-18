<?php
header('Access-Control-Allow-Origin: *');

$servername = "utbweb.its.ltu.se";
$username = "19991124";
$password = "19991124";

// Retrieve the contents of the php input request in the url
$rest_json = file_get_contents("php://input");

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>