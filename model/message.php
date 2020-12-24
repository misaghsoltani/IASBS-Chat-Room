<?php


class message
{
    private $from;
    private $to;
    private $msgText;
    private $msgTime;
    private $msgStatus;

    function getFrom() {
        return $this->from;
    }

    function setFrom($from) {
        $this->from = $from;
    }

    function getTo() {
        return $this->to;
    }

    function setTo($to) {
        $this->to = $to;
    }

    function getMsgText() {
        return $this->msgText;
    }

    function setMsgText($msgText) {
        $this->msgText = $msgText;
    }

    function getMsgTime() {
        return $this->msgTime;
    }

    function setMsgTime($msgTime) {
        $this->msgTime = $msgTime;
    }

    function getMsgStatus() {
        return $this->msgStatus;
    }

    function setMsgStatus($msgStatus) {
        $this->msgStatus = $msgStatus;
    }

    function save(){

    }
}