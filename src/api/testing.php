<?php 
require_once 'db_connection.php';
$conn = startConnection();

// Retrieve the contents of the php input request in the url
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$data = array();

if(isset($_POST['prodID'])){
    $productID = $_POST['prodID'];
};

$query = "SELECT * FROM `products` WHERE `products.id` = $productID";     
    
$result = mysqli_query($conn, $query);                  //RAW
$json = mysqli_fetch_all($result, MYSQLI_ASSOC);        // products array

$data['product'] = $json;                              // products array => Sub array in Data
echo json_encode($data);
?>