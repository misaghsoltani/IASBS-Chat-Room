//some code to show the modal popup for profile edit
var currentMessageObject;
var editingStatus = false;
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
   if (el.classList.contains('me')) {
      msg_menu.style.float = "left";
      msg_br.style.display = "block";
      msg_menu.style.display = "block";
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

function showContextMenu(selectorObject){
   currentMessageObject = selectorObject.parentElement;
   let contextMenu = document.querySelector('.context-menu');
   document.querySelector('.context-menu-container').style.display = 'block';
   contextMenu.style.display = 'block';
   contextMenu.style.opacity = ''
   contextMenu.style.left = event.clientX + 'px';
   contextMenu.style.top = event.clientY + 'px';
}

function hideContextMenu(){
   let contextMenu = document.querySelector('.context-menu');
   contextMenu.style.display = 'none';
   document.querySelector('.context-menu-container').style.display = 'none';
}

function editMessage(){
   document.getElementById("msg-input").value = currentMessageObject.childNodes[2].innerHTML;
   editingStatus = true;
}

function sendMessage(){
   let messageText = document.getElementById("msg-input").value;
   if(checkMessageText(messageText)){
      if(editingStatus == true){
         //call php edit message with message id
         var receiver = document.getElementById("username").innerHTML;
         axios.post("../rest/message", {id: 17 , text: messageText}, {headers: {Authorization: "Bearer " + Cookies.get('token')}}).then(function (response) {
            console.log(response);
         });

         currentMessageObject.childNodes[2].innerHTML = document.getElementById("msg-input").value;
         document.getElementById("msg-input").value = "";


      }
      else{
         //call php send message with message id
         var receiver = document.getElementById("username").innerHTML;
         axios.post("../rest/message", {to: receiver , text: messageText}, {headers: {Authorization: "Bearer " + Cookies.get('token')}}).then(function (response) {
            console.log(response);
         });
         let tagLI = document.createElement("LI");
         let attClass = document.createAttribute("class");
         let attOnMouseOver = document.createAttribute("onmouseover");
         let attOnMouseOut = document.createAttribute("onmouseout");
         attClass.value = "me";
         attOnMouseOver.value = "showEditArrow(this)";
         attOnMouseOut.value = "hideEditArrow(this)";
         tagLI.setAttributeNode(attClass);
         tagLI.setAttributeNode(attOnMouseOver);
         tagLI.setAttributeNode(attOnMouseOut);
         let tagIMG = document.createElement("IMG");
         let attSRC = document.createAttribute("src");
         let attClass2 = document.createAttribute("class");
         let attOnClick = document.createAttribute("onclick");
         attSRC.value = "images/msg_edit_menu.png";
         attClass2.value = "msg-menu-selector";
         attOnClick.value = "showContextMenu(this)";
         tagIMG.setAttributeNode(attSRC);
         tagIMG.setAttributeNode(attClass2);
         tagIMG.setAttributeNode(attOnClick);
         let tagBR = document.createElement("BR");
         let attClass3 = document.createAttribute("class");
         attClass3.value = "msg-br";
         tagBR.setAttributeNode(attClass3);
         let tagP = document.createElement("p");
         let textNode = document.createTextNode(document.getElementById("msg-input").value);
         tagP.appendChild(textNode);
         let tagBR2 = document.createElement("BR");
         let tagDiv = document.createElement("div");
         let tagSpan = document.createElement("SPAN");
         let attClass4 = document.createAttribute("class");
         attClass4.value = "datetime-span";
         let textNode2 = document.createTextNode("2021.2.2 17:50");
         tagSpan.setAttributeNode(attClass4);
         tagSpan.appendChild(textNode2);
         let tagIMG2 = document.createElement("IMG");
         let attClass5 = document.createAttribute("class");
         let attSRC2 = document.createAttribute("src");
         attClass5.value = "status-img";
         attSRC2.value = "images/sent.png";
         tagIMG2.setAttributeNode(attClass5);
         tagIMG2.setAttributeNode(attSRC2);
         tagDiv.appendChild(tagSpan);
         tagDiv.appendChild(tagIMG2);
         tagLI.appendChild(tagIMG);
         tagLI.appendChild(tagBR);
         tagLI.appendChild(tagP);
         tagLI.appendChild(tagBR2);
         tagLI.appendChild(tagDiv);
         document.getElementById("chat ul").appendChild(tagLI);
         element[0].scrollTop = element[0].scrollHeight;
         //alert(document.getElementById("msg-input").value);
         document.getElementById("msg-input").value = "";
      }
   }
}

function deleteMessage(){
   //call php delete message with message id
   // axios.delete("../rest/message", {id: 17 }, {headers: {Authorization: "Bearer " + Cookies.get('token')}}).then(function (response) {
   //
   // });

   axios.delete("../rest/message", {
      headers: {
         Authorization: "Bearer " + Cookies.get('token')
      },
      data: {
         id: 17
      }
   }).then(function (response) {
      console.log(response);
   });

   currentMessageObject.remove();
}