//some code to show the modal popup for profile edit

function openEditProfile(){
   var modalBg = document.querySelector('.modal-bg');
   modalBg.classList.add('active');
}

function closeEditProfile(){
   var modalBg = document.querySelector('.modal-bg');
   modalBg.classList.remove('active');
}

//code for scrolling chat box to down
var element = document.getElementsByClassName("right-middle");
element[0].scrollTop = element[0].scrollHeight;

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