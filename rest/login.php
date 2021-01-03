<?php
require_once 'core.php';

if ($_SERVER['REQUEST_METHOD'] != 'POST'){
    Response::method_not_allowed_response();
}

try{
    $data = json_decode(file_get_contents('php://input'), true);
    if(json_last_error() !== JSON_ERROR_NONE){
        Response::special_response(400, "Please check request format again.");
    }
    // check if all parameters are sent (or received at server )
    $required_keys = ['username' , 'password'];
    if (!count(array_diff($required_keys, array_keys($data))) == 0) {
        // one of the values is not sent: code 422
        Response::all_parameters_required_response();
    }

    $db = Database::get_instance();
    
    
}catch (Throwable $exception){
    Response::internal_error();
}