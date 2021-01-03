//some code to show the modal popup for profile edit
/*var modalBtn = document.querySelector('.left-top');*/


function openEditProfile(){
   var modalBg = document.querySelector('.modal-bg');
   modalBg.classList.add('active');
}

function closeEditProfile(){
   var modalBg = document.querySelector('.modal-bg');
   modalBg.classList.remove('active');
}