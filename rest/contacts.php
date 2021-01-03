<?php
require_once 'core.php';
use Ahc\Jwt\JWT;
if ($_SERVER['REQUEST_METHOD'] != 'GET'){
    Response::method_not_allowed_response();
}
try{
    $token = getBearerToken();
    if($token == ""){
        Response::token_is_invalid();
    }
    $payload = (new JWT('secret', 'HS256', 3600 * 24 * 10, 10))->decode($token);

    $username = $payload['username'];


    $db = Database::get_instance();
    $result = $db->query("CALL CONTACTLIST('$username');");

//    print_r();
    $contacts = array();
    while ($row = $result->fetch_assoc()){
        $contacts[] = $row;
    }
    Response::special_response(200,$contacts);

}catch (\Ahc\Jwt\JWTException $exception){
    Response::token_is_invalid();
}catch (Exception $exception){
    Response::internal_error();
}