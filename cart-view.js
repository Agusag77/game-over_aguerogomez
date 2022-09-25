/* Declaro variables */

let contadorCart = 0;
const contadorCarrito = document.getElementById("contador-carrito")
const botonVaciar = document.getElementById("vaciar-carrito")

/* Declaro carrito de productos a instertarse en el DOM */

const juegoCartHTML = (juego) => {
  return` 
    <tr>
      <th scope="row"><img id="img-cart"src=${juego.img}></th>
      <td>${juego.nombre}</td>
      <td>$${juego.precio}</td>
      <td id="cantidad">${juego.cantidad}</td> 
      <td><button id="btn-cart-${juego.idCompra}" class="btn btn-danger">X</button></td>
    </tr>
  `;
};

/* Renderizado del carrito */

const renderCart = () => {
  const cartNodo = document.getElementById("carrito");
  const precioNodo = document.getElementById("precioTotal");
    
  let cartHTML = "";
  let precio = 0;
  let cantidad = 0
  for (const juego of cart) {
    cartHTML += juegoCartHTML(juego);
    precio += juego.precio;
    cantidad += juego.cantidad
  }

  contadorCarrito.innerHTML = cantidad
  precioNodo.innerHTML = precio;
  cartNodo.innerHTML = cartHTML;
  botonesCart(); 
}

/* Botones del carrito */  

const botonesCart = () => {
  for (const juego of cart) {
    const botonId = `btn-cart-${juego.idCompra}`;
    const botonNodo = document.getElementById(botonId);
    
    botonNodo.addEventListener("click", () => {
      const index = cart.findIndex((p) => p.idCompra == juego.idCompra);
      cart.splice(index, 1);
      Toastify({
        text: "Has eliminado el juego del carrito!",
        style: {
          background: "linear-gradient(to right, rgb(200, 129, 129), rgb(204, 68, 68))"
        },
        offset: {
          x: 50, 
          y: 10
        },
      }).showToast();
      renderCart();
      let id = juego.id
      borrarJuego(id)
    });
  }
};

/* Declaro una funcion para eliminar individualmente los juegos del carrito */
function borrarJuego(id){
  let carritoArray = JSON.parse(localStorage.getItem("carrito"))
  let carritoIndexInArray = carritoArray.findIndex(e => e.id === id)
  carritoArray.splice(carritoIndexInArray,1)
  let carritoArrayJSON = JSON.stringify(carritoArray);
  localStorage.setItem("carrito", carritoArrayJSON)
}

/* Inserto funcionalidad al boton de vaciado del carrito */
botonVaciar.addEventListener('click', () => {
  cart.length = 0
  renderCart();
  localStorage.removeItem("carrito"); 
});

/* Recupero la informacion del localStorage y valido si el carrito tiene items para presentarlos nuevamente en la web. Para esto utilizo el operador logico OR */

const cart = JSON.parse(localStorage.getItem("carrito")) || [];
renderCart();  

/* Utilizo operador ternario para mostrar si el LS esta vacio o lleno. En base a eso muestro un mensaje o los elementos del arreglo */

cart != 0 
? console.log(cart) : console.log("El localStorage está vacío.");