<?php


abstract class person
{
    public $name;
    public $family;

    function getName() {
        return $this->name;
    }

    function setName($name) {
        $this->name = $name;
    }

    function getFamily() {
        return $this->family;
    }

    function setFamily($family) {
        $this->family = $family;
    }
}

class user extends person
{
    private $username;
    private $password;
    private $status;
    private $last_online;

    function getUsername() {
        return $this->username;
    }

    public function setUsername($username) {
        $this->username = $username;
    }

    function getPassword() {
        return $this->password;
    }

    function setPassword($password) {
        $this->password = md5($password);
    }

    function getStatus() {
        return $this->status;
    }

    function setStatus($status) {
        $this->$status = $status;
    }

    function getLastOnline() {
        return $this->last_online;
    }

    function setLastOnline($last_online) {
        $this->$last_online = $last_online;
    }
/*    function checkUserPass() {
        $paramTypes = "ss";
        $Parameters = array($this->username, $this->password);
        $result = database::ExecuteQuery('CheckUserPass', $paramTypes, $Parameters);

        if(mysqli_num_rows($result) > 0)
        {
            $row = $result->fetch_array();
            $this->setName($row["name"]);
            $this->setFamily($row["family"]);
            return true;
        }
        return false;
    }

    private function isUsernameExist() {
        $paramTypes = "s";
        $Parameters = array($this->username);
        $result = database::ExecuteQuery('IsUsernameExist', $paramTypes, $Parameters);

        if(mysqli_num_rows($result) > 0)
            return true;
        return false;
    }

    function save() {
        if(!$this->IsUsernameExist()) {
            $paramTypes = "ssss";
            $Parameters = array($this->username, $this->password,
                $this->name, $this->family);
            database::ExecuteQuery('AddUser', $paramTypes, $Parameters);
            return true;
        }
        return false;
    }*/
}