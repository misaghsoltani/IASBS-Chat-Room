<?php
// TODO
class Database{
    public static function get_instance(){
        return new mysqli("127.0.0.1:3306","root","","messenger");
    }

}

class Response{
    public static $OK = 200;
    public static $BAD_REQUEST = 400;
    public static $UNAUTHORIZED = 403;

    private $msg;
    private $code;

    public function __construct($code,$msg = 'this is message')
    {
        $this->msg = $msg;
        $this->code = $code;
    }

    public static function internal_error($msg = "Internal server error.")
    {
        self::special_response(500, $msg );
    }

    public function __toString()
    {
        $response = array(
            "code" => $this->code,
            "msg" => $this->msg
            );

        return json_encode($response);
    }

    public static function all_parameters_required_response(){
        self::special_response(422, "All parameters are mandatory.");
    }

    public static function special_response($code, $msg){
        http_response_code($code);
        echo (new Response($code,$msg));
        exit();
    }

    public static function method_not_allowed_response($msg = "Method not allowed."){
        self::special_response(405,$msg);
    }

    public static function token_is_invalid(){
        self::special_response(401, "Login information is wrong.");
    }

}




require_once '../controller/JWT.php';

use Ahc\Jwt\JWT;

require_once 'core.php';


header('Content-Type: application/json');


/**
 * Get header Authorization
 * */
function getAuthorizationHeader()
{
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        //print_r($requestHeaders);
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    return $headers;
}

/**
 * get access token from header
 * */
function getBearerToken()
{
    $headers = getAuthorizationHeader();
    // HEADER: Get the access token from the header
    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }
    }
    return null;
}