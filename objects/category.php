<?php

class Category{

    private $conn;
    private $table_name = 'categories';
    
    public $id;
    public $name;
    public $description;

    public function __construct($db){
        $this->conn = $db;
    }
    public function readAll(){
        // Select all the data
        $query = "SELECT id, name, description
             FROM " . $this->table_name;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return json_encode($results);
    }
    public function readOne(){
        // Select one the data
        $query = "SELECT id, name, description
             FROM " . $this->table_name . "
        WHERE id=:id";

       $stmt = $this->conn->prepare($query);

       $id = htmlspecialchars(strip_tags($this->id));
       $stmt->bindParam(':id', $id);
       $stmt->execute();

       $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

       return json_encode($results);
   }
   public function create(){
    try{
        $query = "INSERT INTO ". $this->table_name .
        " SET name=:name, description=:description, created=:created";
        $stmt = $this->conn->prepare($query);

        $name = htmlspecialchars(strip_tags($this->name));
        $description= htmlspecialchars(strip_tags($this->description));
 
        $stmt->bindParam(':name',$name);
        $stmt->bindParam(':description',$description);

        $created = date('Y-m-d H:i:s');
        $stmt->bindParam(':created', $created);

        if($stmt->execute()){
            return true;
        }
        else{
            return false;
        }

    }
    catch(PDOException $exception){
        die('ERROR: '.$exception->getMessage());
    }
}

    public function delete($ins){
       $query ="DELETE FROM  ". $this->table_name .
         "  WHERE id IN (:ins)";
       $stmt = $this->conn->prepare($query);
       $ins = htmlspecialchars(strip_tags($ins));

       $stmt->bindParam(':ins',$ins);

       if($stmt->execute()){
       return true;
       }
        else{
       return false;
       }
}

    public function update(){
       $query ="UPDATE ". $this->table_name .
       " SET name=:name, description=:description
        WHERE id=:id";       
        $stmt = $this->conn->prepare($query);
        
        $name = htmlspecialchars(strip_tags($this->name));
        $description= htmlspecialchars(strip_tags($this->description));
        $id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':name',$name);
        $stmt->bindParam(':description',$description);
        $stmt->bindParam(':id',$id);
        var_dump($name);
     
                    if($stmt->execute()){
                        return true;
                    }
                    else{
                        return false;
                    }
}




    }