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
    if(isset($_POST['catID'])){
        $catID = $_POST['catID'];
    };
    if(isset($_POST['prodID'])){
        $productID = $_POST['prodID'];
    };
    if(isset($_POST['product'])){
        $product = $_POST['product'];
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
    if(isset($_POST['orderItems'])){
        $orderItems = $_POST['orderItems'];
    }
    if(isset($_POST['billingAddress'])){
        $billingAddress = $_POST['billingAddress'];
    }
    if(isset($_POST['review'])){
        $review = $_POST['review'];
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
        case 'set_product_submit':
            set_product_submit($conn, $productID, $product);
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
        case 'clear_cart':
            clear_cart($conn, $userID);
            break;
        case 'remove_from_cart':
            remove_from_cart($conn, $item);
            break;
        case 'place_order':
            place_order($conn, $orderItems, $userID, $billingAddress);
            break;
        case 'get_all_reviews':
            get_all_reviews($conn);
            break;      
        case 'get_all_product_reviews':
            get_all_product_reviews($conn, $productID);
            break;    
        case 'get_reviewer':
            get_reviewer($conn, $userID);
            break;  
        case 'submit_review':
            submit_review($conn, $review, $productID, $userID);
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

function set_product_submit($conn, $productID, $product)
{
    $query = "UPDATE `products` 
        SET `name`='". $product['name'] ."',
            `description`='". $product['description'] ."',
            `price`='". $product['price'] ."',
            `stock`='". $product['stock'] ."',
            `thumbnail`='". $product['thumbnail'] ."',
            `product_catergories_id`='". $product['product_catergories_id'] ."'
        WHERE `id` = $productID";     
    
    $update = mysqli_query($conn, $query);
    if($update){
        echo json_encode(array("sent" => true));
        closeConnection($conn);
    }
    else{
        mysqli_rollback($conn);
    }
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
        closeConnection($conn);
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
        closeConnection($conn);
    }
    else{
        echo json_encode(array("sent" => false));
    };
}

function place_order($conn, $orderItems, $userID, $billingAddress){
    //innan kommit

    $query = "INSERT INTO `orders`(`status`, `users_id`) VALUES (0, $userID)";
    $result = @mysqli_query($conn, $query);

    $query = "SELECT `id`, `status`, `users_id` FROM `orders` WHERE `users_id` = $userID AND `status` = 0";
    $result = @mysqli_query($conn, $query);
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if (!$conn -> query("INSERT INTO `orders_billing_infos`(`first_name`, `last_name`, `address1`, `address2`, `city`, `state`, `postal_code`, `country`, `orders_id`) 
    VALUES (
        '". $billingAddress['firstName'] ."',
        '". $billingAddress['lastName'] ."',
        '". $billingAddress['address1'] ."',
        '". $billingAddress['address2'] ."',
        '". $billingAddress['city'] ."',
        '". $billingAddress['state'] ."',
        '". $billingAddress['zip'] ."',
        '". $billingAddress['country'] ."',
        '". $json[0]['id'] ."'
        )")) 
    {
        echo("Error description: " . $conn -> error);
    }
    // echo json_encode($json[0]['id']);

    foreach ($json as $orderRow) {
        $orderID = $orderRow['id'];
    
        foreach ($orderItems as $row) {
            $amount = $row['amount'];
            $price = $row['price'];
            $productID = $row['product_id'];
            
            $query = "SELECT `stock` FROM `products` WHERE `id` = $productID "; 
            $result = @mysqli_query($conn, $query);
            $productInfo = mysqli_fetch_row($result);
            $stock = (int)$productInfo[0];
            if($stock < $amount){
                echo("Not enough stock");
                mysqli_rollback($conn);
                break;
            }

            $query = "INSERT INTO `order_item`(`amount`, `price`, `orders_id`, `products_id`) VALUES ($amount,$price, $orderID, $productID)";
            $result = @mysqli_query($conn, $query);

            // Ta bort från stocks
            $newStock = (int)$stock - (int)$amount;
            $query = "UPDATE `products` SET stock = $newStock WHERE `id` = $productID";
            $update = mysqli_query($conn, $query);
        }
        $query = "UPDATE `orders` SET status = 1 WHERE `id` = $orderID";
        $update = mysqli_query($conn, $query);
        if($update){
            echo json_encode(array("sent" => true));
            closeConnection($conn);
        }

    }
}

function get_all_reviews($conn)
{
    $query = "SELECT * FROM `product_reviews`";
    $result = @mysqli_query($conn, $query);
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $data['reviews'] = $json;                              // products array => Sub array in Data
    echo json_encode($data);
}

function get_all_product_reviews($conn, $productID)
{
    $query = "SELECT * FROM `product_reviews` WHERE `products_id` = $productID";
    $result = @mysqli_query($conn, $query);
    $json = mysqli_fetch_all($result, MYSQLI_ASSOC);

    $data['product_reviews'] = $json;                              // products array => Sub array in Data
    echo json_encode($data);
}

function get_reviewer($conn, $userID)
{
    $query = "SELECT * FROM `users` WHERE `id` = $userID";     
    
    $result = mysqli_query($conn, $query);                  //RAW
    $json = mysqli_fetch_assoc($result);        // products array
    
    echo json_encode($json);
}

function submit_review($conn, $review, $productID, $userID)
{
    $rating = (int) $review['review_stars'];
    $query = "INSERT INTO `product_reviews`(`title`, `review_ext`, `review_stars`, `products_id`, `users_id`) 
    VALUES (
        '". $review['title'] ."',
        '". $review['review_ext'] ."',
        $rating, $productID, $userID
    )";     
    
    $update = mysqli_query($conn, $query);
    if($update){
        echo json_encode(array("sent" => true));
        closeConnection($conn);
    }
    else{
        mysqli_rollback($conn);
    }
}


function clear_cart($conn, $userID){

    $query = "DELETE FROM `cart` WHERE `users_id` = $userID";     
    
    $update = mysqli_query($conn, $query);
    if($update){
        echo json_encode(array("sent" => true));
        closeConnection($conn);
    }
    else{
        mysqli_rollback($conn);
    }
}

function remove_from_cart($conn, $item)
{
    $query = "DELETE FROM `cart` WHERE `products_id` = $item";     
    
    $update = mysqli_query($conn, $query);
    if($update){
        echo json_encode(array("sent" => true));
        closeConnection($conn);
    }
    else{
        mysqli_rollback($conn);
    }
}

?>