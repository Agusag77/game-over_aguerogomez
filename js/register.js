/* Login */

/* Declaro variables */

let pswrdLogin = document.getElementById('password')
let toggleBtnLogin = document.getElementById('toggle-btn-login')

/* Incorporo visualizacion para el input de contraseña */

toggleBtnLogin.onclick = function (){
    if (pswrdLogin.type === 'password'){
      pswrdLogin.setAttribute('type', 'text')
      toggleBtnLogin.classList.add('hide-login')
    } else {
      pswrdLogin.setAttribute('type', 'password')
      toggleBtnLogin.classList.remove('hide-login')
    }
}

/* Register */

/* Declaro variables */

let pswrd = document.getElementById('pswrd')
let toggleBtn = document.getElementById('toggle-btn')
let pswrdConfirm = document.getElementById('pswrd-confirm')
let toggleBtnConfirm = document.getElementById('toggle-btn-confirm')


/* Incorporo visualizacion para los input de contraseña y confirmacion de la misma */

toggleBtn.onclick = function (){
    if (pswrd.type == 'password'){
      pswrd.setAttribute('type', 'text')
      toggleBtn.classList.add('hide')
    } else {
      pswrd.setAttribute('type', 'password')
      toggleBtn.classList.remove('hide')
    }
}

toggleBtnConfirm.onclick = function (){
    if (pswrdConfirm.type == 'password'){
      pswrdConfirm.setAttribute('type', 'text')
      toggleBtnConfirm.classList.add('hide-confirm')
    } else {
      pswrdConfirm.setAttribute('type', 'password')
      toggleBtnConfirm.classList.remove('hide-confirm')
    }
} 

/* Declaro variables */

const registro = document.getElementById('register')
const logueo = document.getElementById('btn-login')

registro.onclick = () => {
  swal ( "Bienvenido!", "Disfruta de nuestra web!", "success", {buttons: false})
  setTimeout('location.reload()',1200)
}

logueo.onclick = () => {
  swal ( "Que bueno volver a verte!", "Disfruta de nuestra web!", "success", {buttons: false})
  setTimeout('location.reload()',1200)
}