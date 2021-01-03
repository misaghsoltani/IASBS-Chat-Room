//some code to show the modal popup for profile edit

function openEditProfile(){
   var modalBg = document.querySelector('.modal-bg');
   modalBg.classList.add('active');
}

function closeEditProfile(){
   var modalBg = document.querySelector('.modal-bg');
   modalBg.classList.remove('active');
}

function checkMessageText(text){
   let trimmed = text.trim();
   if(trimmed == ""){
      return false;
   }else{return true;}
}

//code for scrolling chat box to down
var element = document.getElementsByClassName("right-middle");
element[0].scrollTop = element[0].scrollHeight;

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
   let pattern = /[=*@$#!+-]/;
   return (isCharEnglish(event) || isCharNumber(event) || pattern.test(String.fromCharCode(event.keyCode)));
}

function validateFirstName(){
   let first_name = document.getElementsByClassName("name txtBox")[0].value;
   if(first_name.length >= 3 && first_name.length <= 50){
      return true;
   }else{
      //say something
      window.alert("1");
      return false;
   }
}
function validateLastName(){
   let last_name = document.getElementsByClassName("family txtBox")[0].value;
   if(last_name.length >= 3 && last_name.length <= 100){
      return true;
   }else{
      //say something
      window.alert("2");
      return false;
   }
}
function validateUsername(){
   let username = document.getElementsByClassName("username txtBox")[0].value;
   if(username.length >= 5 && username.length <= 50){
      return true;
   }else {
      //say something
      window.alert("3");
      return false;
   }
}
function validatePassword(){
   let password = document.getElementsByClassName("password txtBox")[0].value;
   if(password.length >= 8 && password.length <= 24){
      return true;
   }else {
      //say something
      window.alert("4");
      return false;
   }
}

function Validation(){
   let res1 = validateFirstName();
   let res2 = validateLastName();
   let res3 = validateUsername();
   let res4 = validatePassword();
   window.alert(res1 && res2 && res3 && res4);
   return res1 && res2 && res3 && res4;
}

//some code to show and hide edit menu arrow
function showEditArrow(el){
   let msg_br = el.querySelector('.msg-br');
   let msg_menu = el.querySelector('.msg-menu-selector');
   msg_br.style.display = "block";
   msg_menu.style.display = "block";
   if (el.classList.contains('me')) {
      msg_menu.style.float = "left";
   }
   else {
      msg_menu.style.float = "right";
   }
}

function hideEditArrow(el){
   let msg_br = el.querySelector('.msg-br');
   let msg_menu = el.querySelector('.msg-menu-selector');
   msg_br.style.display = "none";
   msg_menu.style.display = "none";
}

function showContextMenu(){
   let contextMenu = document.querySelector('.context-menu');
   document.querySelector('.context-menu-container').style.display = 'block';
   contextMenu.style.display = 'block';
   contextMenu.style.opacity = ''
   contextMenu.style.left = event.clientX + 'px';
   //alert(event.clientY);
   contextMenu.style.top = event.clientY + 'px';
   /*el.style.backgroundColor = 'black';*/
}

function hideContextMenu(){
   let contextMenu = document.querySelector('.context-menu');
   contextMenu.style.display = 'none';
   document.querySelector('.context-menu-container').style.display = 'none';
}