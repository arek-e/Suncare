<?php
session_start();
require_once 'db_connection.php';

// Retrieve the contents of the php input request in the url
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$data = array();

//function handler
if(isset($_POST['function']) && !empty($_POST['function'])){

    $functionCall = $_POST['function'];
    if(isset($_POST['form'])){
        $email = $_POST['form']['email'];
        $password = $_POST['form']['password'];
    };

    switch($functionCall) {
        case 'login_user':
            login_user($conn, $email, $password);
            break;
        case 'get_user':
            get_user($conn);
            break;
        case 'logout_user':
            logout_user($conn);
            break;
    }
}
else{
    echo json_encode("Did not run function");
}


function login_user($conn, $email, $password){
    session_destroy();
    //Byt så det är rätt mail
    $query = "SELECT * FROM `users` WHERE `email` = '$email'";

    $result = mysqli_query($conn, $query);
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if ($json[0]['password'] ==  $password) {
        $_SESSION["userid"] = $json[0]['id'];
        $_SESSION["email"] = $json[0]['email'];
        $_SESSION["firstName"] = $json[0]['first_name'];
        $_SESSION["lastName"] = $json[0]['last_name'];
        $_SESSION["phoneNum"] = $json[0]['phone_number'];
        $_SESSION["adminFlag"] = $json[0]['adminFlag'];
        $_SESSION["created"] = $json[0]['created'];

        // $data['sent'] = true;
        $data['session'] = $_SESSION;                          // products array => Sub array in Data
        echo json_encode($data);
    
    }
    else{
        $data['sent'] = false;
        echo json_encode($data);
    };
}
function get_user($conn){  
    session_start(); 
    if(isset($_SESSION)){
        $data['session'] = $_SESSION;                              // products array => Sub array in Data
        echo json_encode(array("session" => $_SESSION));
    }
    //echo json_encode($_SESSION);
}

function logout_user($conn){
    session_start();
    unset($_SESSION["userid"]);
    unset($_SESSION["email"]);
    unset($_SESSION["firstName"]);
    unset($_SESSION["lastName"]);
    unset($_SESSION["phoneNum"]);
    unset($_SESSION["adminFlag"]);
    unset($_SESSION["created"]);
    
    session_destroy();

    echo json_encode($_SESSION);
}
?>