<?php
require_once '../controller/JWT.php';
use Ahc\Jwt\JWT;

require_once 'core.php';

header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    try{
        $data = json_decode(file_get_contents('php://input'), true);
        if(json_last_error() !== JSON_ERROR_NONE){
            Response::special_response(400, "Please check request format again.");
        }
        // check if all parameters are sent (or received at server )
        $required_keys = ['username' , 'password','first_name', 'last_name'];
        if (!count(array_diff($required_keys, array_keys($data))) == 0) {
            // one of the values is not sent: code 422
            Response::all_parameters_required_response();
        }


        $db = Database::get_instance();
        if(!$db->ping()){
            Response::special_response(500, "Internal server error.");
        }
        // check if username exist:
        $username = $data['username'];
        $query = "CALL GETPROFILE('$username')";

        $result = $db->query($query);
        if($result->num_rows == 0){
            $db->close();
            $db = Database::get_instance();
            // there is no user with this username and we can register
            $password = $data['password'];
            $first_name = $data['first_name'];
            $last_name = $data['last_name'];

            if (!$db->query("CALL REGISTER('$username', '$password', '$first_name', '$last_name')")) {
                echo("Error description: " . $db -> error);
            }


            $db->commit();
            $db->close();
            Response::special_response(201, "User created.", true);

        }else{
            // username already exist
            Response::special_response(409, "Username already taken.");
        }
    }catch (Throwable $exception){

        Response::special_response(500, "Internal server error.");
    }
}else{
    // TODO : return 405 code
    http_response_code(405);

    echo ("405 code");
}