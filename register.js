/* Login */

let pswrdLogin = document.getElementById('password')
let toggleBtnLogin = document.getElementById('toggle-btn-login')

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

let pswrd = document.getElementById('pswrd')
let toggleBtn = document.getElementById('toggle-btn')

toggleBtn.onclick = function (){
    if (pswrd.type === 'password'){
      pswrd.setAttribute('type', 'text')
      toggleBtn.classList.add('hide')
    } else {
      pswrd.setAttribute('type', 'password')
      toggleBtn.classList.remove('hide')
    }
}

let pswrdConfirm = document.getElementById('pswrd-confirm')
let toggleBtnConfirm = document.getElementById('toggle-btn-confirm')

toggleBtnConfirm.onclick = function (){
    if (pswrdConfirm.type === 'password'){
      pswrdConfirm.setAttribute('type', 'text')
      toggleBtnConfirm.classList.add('hide-confirm')
    } else {
      pswrdConfirm.setAttribute('type', 'password')
      toggleBtnConfirm.classList.remove('hide-confirm')
    }
} 