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

    public function __toString()
    {
        $response = array(
            "code" => $this->code,
            "msg" => $this->msg
            );

        return json_encode($response);
    }


}