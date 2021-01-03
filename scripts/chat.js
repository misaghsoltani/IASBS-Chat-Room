//some code to show the modal popup for profile edit

function openEditProfile(){
   var modalBg = document.querySelector('.modal-bg');
   modalBg.classList.add('active');
}

function closeEditProfile(){
   var modalBg = document.querySelector('.modal-bg');
   modalBg.classList.remove('active');
}

//code fro scrolling chat box to down
var element = document.getElementsByClassName("right-middle");
element[0].scrollTop = element[0].scrollHeight;