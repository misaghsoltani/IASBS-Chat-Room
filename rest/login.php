<?php

use Ahc\Jwt\JWT;

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
    if(!$db){
        Response::internal_error();
    }
    // check if username and password is correct:
    $username = $data['username'];
    $password= $data['password'];
    $query = "CALL LOGIN('$username', '$password', @_);";
//    print_r($query);
    $result = $db->query($query);

//    print_r($db->error);
    if($result->fetch_array()[0] == 0){
        // username and password does not match
        Response::special_response(401, "Login information is wrong.");
    }

    $jwt = new JWT('secret', 'HS256', 3600 * 24 * 10, 10);

    if(!isset($_SERVER['HTTP_USER_AGENT'])){
        $_SERVER['HTTP_USER_AGENT'] = "";
    }
    $token = $jwt->encode([
        'username' => $username
    ]);

    $response = new Response(200,['token' => $token]);
    setcookie('token', $token, time() + (86400 * 10), "/"); // 86400 = 1 day
    echo($response);
    exit();


}catch (Throwable $exception){
    Response::internal_error($exception->getMessage());
}