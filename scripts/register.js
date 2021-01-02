function isCharNumber(event){
    if (event.keyCode < 48 || event.keyCode > 57)
        return false;
    return true;
}
function isTextEnglish(text) {
    return !( new RegExp("[^\sa-zA-Z]").test(text));
}
function isCharEnglish(event){
    if(isTextEnglish(String.fromCharCode(event.keyCode)))
        return true;
    return false;
}

function isCharValidFirstName(event){
    return isCharEnglish(event);
}
function isCharValidLastName(event){
    return isCharEnglish(event);
}
function isCharValidUsername(event){
    let flag = String.fromCharCode(event.keyCode) === '_';
    return (isCharEnglish(event) || isCharNumber(event) || flag);
}
function isCharValidPassword(event){
    let pattern = /[=*$#!+-]/;
    return (isCharEnglish(event) || isCharNumber(event) || pattern.test(String.fromCharCode(event.keyCode)));
}

function validateFirstName(){
    let first_name = document.getElementsByClassName("name txtBox")[0].value;
    if(first_name.length >= 3 && first_name.length <= 50){
        return true;
    }else{
        //say something
        return false;
    }
}
function validateLastName(){
    let last_name = document.getElementsByClassName("family txtBox")[0].value;
    if(last_name.length >= 3 && last_name.length <= 100){
        return true;
    }else{
        //say something
        return false;
    }
}
function validateUsername(){
    let username = document.getElementsByClassName("username txtBox")[0].value;
    if(username.length >= 5 && username.length <= 50){
        return true;
    }else {
        //say something
        return false;
    }
}
function validatePassword(){
    let password = document.getElementsByClassName("password txtBox")[0].value;
    if(password.length >= 8 && password.length <= 24){
        return true;
    }else {
        //say something
        return false;
    }
}
function validateConfirmation(){
    let confirmation = document.getElementsByClassName("password-confirm txtBox")[0].value;
    let password = document.getElementsByClassName("password txtBox")[0].value;
    if(validatePassword() && Password == confirmation){
        return true;
    }else{
        //say something
        return false;
    }
}

function Validation(){
    let res = validateFirstName() && validateLastName() && validateUsername() && validatePassword() && validateConfirmation();
    return res;
}