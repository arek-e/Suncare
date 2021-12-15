<?php
require_once 'db_connection.php';

// Retrieve the contents of the php input request in the url
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$data = array();

//function handler
if(isset($_POST['function']) && !empty($_POST['function'])){

    $functionCall = $_POST['function'];
    if(isset($_POST['catID'])){
        $catID = $_POST['catID'];
    };
    if(isset($_POST['prodID'])){
        $productID = $_POST['prodID'];
    };
    if(isset($_POST['userID'])){
        $userID = $_POST['userID'];
    }
    if(isset($_POST['item'])){
        $item = $_POST['item'];
    }
    if(isset($_POST['price'])){
        $price = $_POST['price'];
    }
    if(isset($_POST['amount'])){
        $amount = $_POST['amount'];
    }


    switch($functionCall) {
        case 'get_all_categories':
            get_all_categories($conn);
            break;
        case 'get_all_products':
            get_all_products($conn);
            break;
        case 'get_all_category_products':
            get_all_category_products($conn, $catID);
            break;
        case 'get_product':
            get_product($conn, $productID);
            break;
        case 'get_cart':
            get_cart($conn, $userID);
            break;
        case 'add_to_cart':
            add_to_cart($conn, $userID, $item, $price, $amount);
            break;
        case 'update_cart':
            update_cart($conn, $userID, $item, $price, $amount);
            break;
    }
}
else{
    echo json_encode("Did not run function");
}

function get_all_categories($conn)
{
    $query = "SELECT * FROM `product_catergories`";     
    $result = mysqli_query($conn, $query);
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);
    
    $data['categories'] = $json;                              // products array => Sub array in Data
    echo json_encode($data);
}

function get_all_category_products($conn, $product_cat_id)
{
    // SQL Query statement
    $query = "SELECT * FROM `products` WHERE `product_catergories_id` = $product_cat_id"; 
    $result = mysqli_query($conn, $query);                  //RAW
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);        // products array
    
    $data['categoryProducts'] = $json;                              // products array => Sub array in Data
    echo json_encode($data);
}

function get_all_products($conn)
{
    // SQL Query statement
    $query = "SELECT * FROM `products`"; 
    $result = mysqli_query($conn, $query);                  //RAW
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);        // products array
    
    $data['products'] = $json;                              // products array => Sub array in Data
    echo json_encode($data);
}

function get_product($conn, $productID){
    $query = "SELECT * FROM `products` WHERE `id` = $productID";     
    
    $result = mysqli_query($conn, $query);                  //RAW
    $json = mysqli_fetch_assoc($result);        // products array
    
    echo json_encode($json);
}

function get_cart($conn, $userID){
    // SQL Query statement
    $query = "SELECT `amount`,`products_id` FROM `cart` WHERE `users_id` = $userID"; 
    $result = mysqli_query($conn, $query);                  //RAW
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);        // products array
    
    $data['cart'] = $json;                              // products array => Sub array in Data
    echo json_encode($data);
}

function add_to_cart($conn, $userID, $item, $price, $amount){
    $query = "INSERT INTO `cart`(`price`, `amount`, `products_id`, `users_id`) VALUES ($price,$amount,$item,$userID)";
    $result = @mysqli_query($conn, $query);
    
    if($result){
        echo json_encode(array("sent" => true));
    }
    else{
        echo json_encode(array("sent" => false));
    };
}

function update_cart($conn, $userID, $item, $price, $amount){
    $query = "UPDATE `cart` SET `amount`= $amount WHERE `products_id`= $item AND `users_id` = $userID";

    $result = @mysqli_query($conn, $query);
    
    if($result){
        echo json_encode(array("sent" => true));
    }
    else{
        echo json_encode(array("sent" => false));
    };
}

?>