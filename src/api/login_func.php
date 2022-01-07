<?php
session_start();
require_once 'db_connection.php';
$conn = startConnection();

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
    if(isset($_POST['account'])){
        $userID = $_POST['account']['userid'];
    };
    if(isset($_POST['billing'])){
        $billing = $_POST['billing'];
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
        case 'get_address':
            get_address($conn, $userID);
            break;
        case 'submit_address':
            submit_address($conn, $userID, $billing);
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

function get_address($conn, $userID){
    $query = "SELECT * FROM `user_billing_infos` WHERE `users_id` = $userID";
    $result = @mysqli_query($conn, $query);
    $json = mysqli_fetch_assoc($result);
                              // products array => Sub array in Data
    echo json_encode($json);
}

function submit_address($conn, $userID, $billing){

    $query = "INSERT INTO `user_billing_infos`(`first_name`, `last_name`, `address1`, `address2`, `city`, `state`, `postal_code`, `country`, `users_id`) 
    VALUES (
        '". $billing['first_name'] ."',
        '". $billing['last_name'] ."',
        '". $billing['address1'] ."',
        '". $billing['address2'] ."',
        '". $billing['city'] ."',
        '". $billing['state'] ."',
        '". $billing['postal_code'] ."',
        '". $billing['country'] ."',
        $userID
    )";

    $result = @mysqli_query($conn, $query);

    if($result){
        echo json_encode(array("sent" => true));
        closeConnection($conn);
    }
    else{
        echo json_encode(array("sent" => false));
        mysqli_rollback($conn);
    };

}

?>