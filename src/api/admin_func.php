<?php
require_once 'db_connection.php';
$conn = startConnection();

// Retrieve the contents of the php input request in the url
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$data = array();

//function handler
if(isset($_POST['function']) && !empty($_POST['function'])){

    $functionCall = $_POST['function'];

    if(isset($_POST['orderID'])){
        $orderID = $_POST['orderID'];
    };
    if(isset($_POST['billing'])){
        $billing = $_POST['billing'];
    };
    if(isset($_POST['order'])){
        $order = $_POST['order'];
    };
    if(isset($_POST['customerID'])){
        $customerID = $_POST['customerID'];
    };
    if(isset($_POST['customer'])){
        $customer = $_POST['customer'];
    };


    switch($functionCall) {
        case 'get_all_orders':
            get_all_orders($conn);
            break;
        case 'get_order':
            get_order($conn, $orderID);
            break;
        case 'get_order_billing_info':
            get_order_billing_info($conn, $orderID);
            break;
        case 'set_order_submit':
            set_order_submit($conn, $orderID, $order, $billing);
            break;
        case 'get_all_customers':
            get_all_customers($conn);
            break;
        case 'get_customer':
            get_customer($conn, $customerID);
            break;
        case 'get_customer_billing_info':
            get_customer_billing_info($conn, $orderID);
            break;
        case 'set_customer_submit':
            set_customer_submit($conn, $customerID, $customer);
            break;
    }
}
else{
    echo json_encode("Did not run function");
}

function get_all_orders($conn)
{
    $query = "SELECT * FROM `orders`";     
    $result = mysqli_query($conn, $query);
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    
    $data['orders'] = $json;                              // products array => Sub array in Data
    echo json_encode($data);
}

function get_order($conn, $orderID){
    $query = "SELECT * FROM `orders` WHERE `id` = $orderID";     
    
    $result = mysqli_query($conn, $query);                  //RAW
    $json = mysqli_fetch_assoc($result);        // products array
    
    echo json_encode($json);
}

function get_order_billing_info($conn, $orderID)
{   
    // SQL Query statement
    $query = "SELECT * FROM `orders_billing_infos` WHERE `orders_id` = $orderID"; 
    $result = mysqli_query($conn, $query);                  //RAW
    $json = mysqli_fetch_assoc($result);        // products array
    
    echo json_encode($json);
}

function get_order_items($conn, $orderID)
{
    // SQL Query statement
    $query = "SELECT * FROM `products`"; 
    $result = mysqli_query($conn, $query);                  //RAW
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);        // products array
    
    $data['products'] = $json;                              // products array => Sub array in Data
    echo json_encode($data);
}

function set_order_submit($conn, $orderID, $order, $billing)
{
    $status = (int) $order['status'];
    $orderQuery = "UPDATE `orders` SET `status` = $status WHERE id = $orderID";
    $orderResult = mysqli_query($conn, $orderQuery);
    
    $billingQuery = "UPDATE `orders_billing_infos` 
        SET `first_name`    = '". $billing['first_name'] ."',
            `last_name`     = '". $billing['last_name'] ."',
            `address1`      = '". $billing['address1'] ."',
            `address2`      = '". $billing['address2'] ."',
            `city`          = '". $billing['city'] ."',
            `state`         = '". $billing['state'] ."',
            `postal_code`   = '". $billing['postal_code'] ."',
            `country`       = '". $billing['country'] ."'
        WHERE `orders_id` = $orderID";
    $billingResult = mysqli_query($conn, $billingQuery);
    echo json_encode($billingResult);

    if($orderResult && $billingResult){
        echo json_encode(array("sent" => true));
        closeConnection($conn);
    }
    else{
        echo json_encode(array("sent" => false));
        mysqli_rollback($conn);
    };
}



function get_all_customers($conn)
{
    $query = "SELECT * FROM `users`";     
    $result = mysqli_query($conn, $query);
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    
    $data['customers'] = $json;                              // products array => Sub array in Data
    echo json_encode($data);
}
 
function get_customer($conn, $customerID)
{
    $query = "SELECT * FROM `users` WHERE `id` = $customerID";     
    
    $result = mysqli_query($conn, $query);                  //RAW
    $json = mysqli_fetch_assoc($result);        // products array
    
    echo json_encode($json);
}

function get_customer_billing_info($conn, $orderID)
{

}

function set_customer_submit($conn, $customerID, $customer)
{    

    $admin = (int) $customer['adminFlag'];


    $customerQuery = "UPDATE `users` 
        SET `email`         = '". $customer['email'] ."',
            `first_name`    = '". $customer['first_name'] ."',
            `last_name`     = '". $customer['last_name'] ."',
            `phone_number`  = '". $customer['phone_number'] ."',
            `adminFlag`     = $admin
        WHERE `id` = $customerID";
    $customerResult = mysqli_query($conn, $customerQuery);

    if($customerResult){
        echo json_encode(array("sent" => true));
        closeConnection($conn);
    }
    else{
        echo json_encode(array("sent" => false));
        mysqli_rollback($conn);
    };
}

?>