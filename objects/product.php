<?php

class Product{

    private $conn;
    private $table_name = 'products';
    
    public $id;
    public $name;
    public $price;
    public $description;
    public $category_id;
    public $timestamp;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        try{
            $query = "INSERT INTO products
            SET name=:name, description=:description , price=:price,
            category_id=: category_id, created=:created";
            $smtp = $this->conn->prepare($query);

            $name = htmlspecialchars(strip_tags($this->name));
            $description= htmlspecialchars(strip_tags($this->description));
            $price = htmlspecialchars(strip_tags($this->price));
            $category_id = htmlspecialchars(strip_tags($this->category_id));
            

            smtp->bindParam(':name',$name);
            smtp->bindParam(':description',$description);
            smtp->bindParam(':price',$price);
            smtp->bindParam(':category_id',$category_id);
            
            $create = date('Y-m-d H:i:s');
            $stmt->bindParam(':created', $created);

            if($stmt->execute()){
                return true;
            }
            else{
                return false;
            }

        }
        catch(PDOException $exception){
            die('ERR: '.$exception->getMessage());
        }
    }

    public function readAll(){
        // Select all the data
        $query = "SELECT p.id, p.name, p.description, p.price, c.name as category_name 
             FROM " . $this->table_name . " p 
            LEFT JOIN categories c 
                 ON p.category_id=c.id
            ORDER BY id DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }

    public function readOne(){
        // Select one the data
        $query = "SELECT p.id, p.name, p.description, p.price, c.name as category_name
        FROM " . $this->table_name . " p
        LEFT JOIN categories c 
            ON p.category_id=c.id
        WHERE p.id=:id";

       $stmt = $this->conn->prepare($query);

       $id = htmlspecialchars(strip_tags($this->id));
       $stmt->bindParam(':id', $id);
       $stmt->execute();

       $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

       return json_encode($results);
   }
}