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
        $sql = "";
        if(isset($data['from'])){
            $from = $data['from'];
            $sql = "SELECT * FROM MESSAGES WHERE TO_USER = '$username' AND FROM_USER = '$from'";
        }else{
            $sql = "SELECT * FROM MESSAGES WHERE TO_USER = '$username';";
        }

        $result = $db->query($sql);
        $messages = array();
        if($result)
            while ($row = $result->fetch_assoc()){
                $messages[] = $row;
            }
        Response::special_response(200,$messages);
    }else if ($_SERVER['REQUEST_METHOD'] == 'POST'){
        $to = $data['to'];
        $text = $data['text'];
        if(isset($data['id'])) {
            $id = $data['id'];
            $result = $db->query("CALL EDITMESSAGE('$id', '$text')");
            Response::special_response(200,["id" => $id]);

        }

        $result = $db->query("CALL SENDMESSAGE('$username', '$to', '$text')");
        $id = $result->fetch_array()[0];
        Response::special_response(200,["id" => $id]);


    }else if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
        $id = $data['id'];
        $db->query("CALL DELETEMESSAGE('$id')");
        Response::special_response(200, "Message deleted.");
    }else{
        Response::method_not_allowed_response();
    }

}catch (\Ahc\Jwt\JWTException $exception){
    Response::token_is_invalid();
}catch (Exception $exception){
    Response::internal_error();
}
// GET method: receive messages by specifying sender ( and has pagination)

// POST method: to send message to someone ...

// DELETE method: to delete message by receiving message_id