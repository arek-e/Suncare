<?php 
  session_start();
  header("Access-Control-Allow-Origin: http://localhost:3000"); // cannot be a wildcard, you have to specify the name of the domain making the request here.
  header('Access-Control-Allow-Headers: Content-Type');
  header("Access-Control-Allow-Credentials: true"); // add this header

  if (isset($_GET['username'])) {
     $_SESSION['username'] = $_GET['username'];
     // echo  $_SESSION['username'];
  }

  if(!isset($_SESSION['username'])){
     echo 'you are not logged in';
 } else {
     echo 'you are logged in';
     header('Content-type: application/json');
     echo json_encode($_SESSION);
 }

  ?>