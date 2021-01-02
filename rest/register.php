<?php
require_once '../controller/JWT.php';
use Ahc\Jwt\JWT;

require_once 'core.php';

$data = json_decode(file_get_contents('php://input'), true);

$db = new Response(Response::$UNAUTHORIZED);
header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    try{
        $db = Database::get_instance();

        // check if username exist:
        $username = $data['username'];
        $query = "CALL GETPROFILE('$username')";

        $result = $db->query($query);
        if($result->num_rows == 0){
            // there is no user with this username and we can register
            $required_keys = ['username' , 'password',];
            if (count(array_diff($required_keys, array_keys($data))) == 0) {
                echo 'all exist';
            }
            $password = $data['password'];
            $first_name = $data['firs_name'];
            $last_name = $data['last_name'];

        }else{
            // username already exist
            http_response_code(409);
            echo ('
        {"code": 409, "msg": "Username already taken."}
        ');
        }
    }catch (Exception $exception){

    }
}else{
    // TODO : return 405 code
    http_response_code(405);

    echo ("405 codeee");
}