<?php



$jwt = new JWT('secret');
if ($_SERVER['REQUEST_METHOD'] != 'POST'){
   // TODO : request method must be post
}else{
    $data = json_decode(file_get_contents('php://input'), true);
    print_r($data);
}