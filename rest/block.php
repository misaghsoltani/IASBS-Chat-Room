<?php

require_once 'core.php';
use Ahc\Jwt\JWT;

try{
    $token = getBearerToken();
    if($token == ""){
        Response::token_is_invalid();
    }
    $payload = (new JWT('secret', 'HS256', 3600 * 24 * 10, 10))->decode($token);

    $username = $payload['username'];
    $db = Database::get_instance();
    $data = json_decode(file_get_contents('php://input'), true);
    if ($_SERVER['REQUEST_METHOD'] == 'GET'){
//        $sql = "CALL";
//
//        $result = $db->query($sql);
//        $messages = array();
//        if($result)
//            while ($row = $result->fetch_assoc()){
//                $messages[] = $row;
//            }
//        Response::special_response(200,$messages);
    }else if ($_SERVER['REQUEST_METHOD'] == 'POST'){


        if(isset($data['id'])) {
            $id = $data['id'];
            $result = $db->query("CALL BLOCKUSER('$username', '$id')");
            Response::special_response(200,"User blocked.");
        }
        else{
            Response::all_parameters_required_response();
        }

    }else{
        Response::method_not_allowed_response();
    }

}catch (\Ahc\Jwt\JWTException $exception){
    Response::token_is_invalid();
}catch (Exception $exception){
    Response::internal_error();
}
// GET method: returns blocked users;

// POST method: receive users for blocking