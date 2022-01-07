<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

function startConnection() {
  $servername = "utbweb.its.ltu.se";
  $username = "19991124";
  $password = "19991124";
  $dbname = "db19991124";
  
  // Create connection
  $conn = mysqli_connect($servername, $username, $password, $dbname);
  
  // Check connection
  if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
  }
  
  mysqli_begin_transaction($conn);
  mysqli_autocommit($conn, false);
  return $conn;
}

function closeConnection($conn) {
  mysqli_commit($conn);
  $conn->close();
}

?>