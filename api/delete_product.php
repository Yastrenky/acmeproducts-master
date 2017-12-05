<?php
if($_POST){
    include_once '../config/core.php';
    
    // include database connection
    include_once '../config/database.php';
    
    // product object
    include_once '../objects/product.php';

    $database = new Database();
    $db = $database->getConnection();
    $product = new Product($db);

$ins ='';
foreach($_POST['del_ids'] as $id){
    $ins .="{$id}";
}


$ins =trim($ins,',');
echo $product->delete($ins)? 'true':'false';
}