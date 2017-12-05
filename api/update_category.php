<?php
if($_POST){
    include_once '../config/core.php';
    
    // include database connection
    include_once '../config/database.php';
    
    // category object
    include_once '../objects/category.php';

    $database = new Database();
    $db = $database->getConnection();
    $category = new Category($db);


    $category->name = $_POST['name'];
    $category->description = $_POST['description'];
    $category->id = $_POST['id'];


    echo $category->update()? 'true':'false';
}