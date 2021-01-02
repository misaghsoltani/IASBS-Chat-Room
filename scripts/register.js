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
    return (isCharEnglish(event) || isCharNumber(event) || event.keyCode === 189);
}
function isCharValidPassword(event){
    let pattern = /[a-zA-Z0-9=*$#!+-]/;
    return (isCharEnglish(event) || isCharNumber(event) || pattern.test(String.fromCharCode(event.keyCode)));
}
