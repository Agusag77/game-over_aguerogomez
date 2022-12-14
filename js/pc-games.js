/* Declaro un array con los juegos */

const juegos = [
  {
    id: 1,
    img: '../images/fifa23.webp',  
    nombre: 'Fifa 23',
    precio: 12000,
    info: 'FIFA 23 lleva el Juego del mundo al campo con la tecnología HyperMotion 2, queofrece una experiencia de juego aún más realista, la Copa del Mundo FIFA™ masculina yfemenina, los equipos femeninos de clubes, las funciones de juego multiplataforma y muchomás.'
  },
  {
    id: 2,
    img: '../images/cod-mw2.jpeg',
    nombre: 'Call of Duty - Modern Warfare 2',
    precio: 8000,
    info: 'Call of Duty: Modern Warfare 2​ ​​es un videojuego de acción en primera personadesarrollado por Infinity Ward. Es la sexta entrega de la serie Call of Duty y sucesoradirecta de Modern Warfare, cuarto de la serie.'
  },
  {
    id: 3,
    img: '../images/nfl23.jpeg',
    nombre: 'NFL 23',
    precio: 6900,
    info: 'Madden NFL 23 es un próximo videojuego de fútbol americano basado en la LigaNacional de Fútbol, ​​desarrollado por EA Tiburon y publicado por Electronic Arts.'
  },
  {
    id: 4,
    img: '../images/apex.webp',
    nombre: 'Apex Legends - Champion Edition',
    precio: 5000,
    info: 'Apex Legends es un videojuego gratuito perteneciente a los géneros battle royale yhero shooter en primera persona, desarrollado por Respawn Entertainment y publicado porElectronic Arts.'
  },
  {
    id: 5,
    img: '../images/battlefield-2042.jpeg',
    nombre: 'Battlefield 2042',
    precio: 7000,
    info: 'Battlefield 2042 es un videojuego de disparos y acción bélica en primera persona, desarrollado por EA Digital Illusion CE, Criterion Games, Ripple Effect y distribuido por Electronic Arts.​'
  },
  {
    id: 6,
    img: '../images/masseffect-lgedition.jpeg',
    nombre: 'Mass Effect - Legendary',
    precio: 5000,
    info: 'Mass Effect es una franquicia de medios de ciencia ficción militar creada por Casey Hudson, Drew Karpyshyn y Preston Watamaniuk.'
  },
  {
    id: 7,
    img: '../images/star-wars.jpg',
    nombre: 'Star Wars Jedi: Fallen Order',
    precio: 3500,
    info: 'Star Wars Jedi: Fallen Order es un videojuego de acción y aventura para un solo jugador desarrollado por Respawn Entertainment y publicado por Electronic Arts, ambientado en el universo de Star Wars. La trama se sitúa entre el Episodio lll: La Venganza de los Sith y el Episodio lV: Una Nueva Esperanza.'
  },
  {
    id: 8,
    img: '../images/plantsvszombies.jpg',
    nombre: 'Plants vs. Zombies: La batalla de Neighborville',
    precio: 2500,
    info: 'Plants vs. Zombies: La batalla de Neighborville es un videojuego de disparos en tercera persona desarrollado por PopCap Games y publicado por Electronic Arts para Microsoft Windows, PlayStation 4, Xbox One y Nintendo Switch. Es la tercera entrega de la serie de videojuegos Plants vs. Zombies: Garden Warfare.'
  }, 
];


let contadorCart = 1;
const contadorCarrito = document.getElementById("contador-carrito")
const botonVaciar = document.getElementById("vaciar-carrito")


/* Declaro catalogo y carrito de juegos a instertarse en el DOM */

const juegoCatalogoHTML = (juego) => {
  return`
    <div class="card">
        <div class="card-body">
          <img id="img-catalogo"src=${juego.img} class="card-img-top">
          <h5 class="card-title">${juego.nombre}</h5>
          <p class="card-text"> ${juego.info} <hr> Precio: $ ${juego.precio}</p>
          <button id="btn-catalogo-${juego.id}" class="btn btn-primary">Buy</button>
        </div>
    </div>`;
};

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

/* Renderizado del catalogo de juegos */   

const renderCatalogo = () => {
  const catalogoNodo = document.getElementById("catalogo");
  let catalogoHTML = "";
  
  for (const juego of juegos) {
    catalogoHTML += juegoCatalogoHTML(juego);
  }
    
  catalogoNodo.innerHTML = catalogoHTML;
  botonesCatalogo();
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
   

/* Botones del catalogo */

const botonesCatalogo = () => {
  for (const juego of juegos) {
    const botonId = `btn-catalogo-${juego.id}`;
    const botonNodo = document.getElementById(botonId);
  
    botonNodo.addEventListener("click", () => {
      const juegosCart = {
        nombre: juego.nombre,
        id: juego.id,
        idCompra: contadorCart,
        img: juego.img,
        precio: juego.precio,
        cantidad: 1
        
      };

      const existe = cart.some(juego => juego.id == juegosCart.id);
      if (existe){
        const juegos = cart.map (juego => {
          if (juego.id == juegosCart.id){
              juego.cantidad++;
              juego.precio = juego.precio + juegosCart.precio * juegosCart.cantidad
              return juego;
          }else{
          return juego;
        } 
      })
      console.log(juegos)
      renderCart();
      localStorage.setItem("carrito", JSON.stringify(cart));
      Toastify({
        text: "Juego agregado al carrito!",
        offset: {
          x: 50, 
          y: 10
        },
      }).showToast();
      } else {
      Toastify({
        text: "Juego agregado al carrito!",
        offset: {
          x: 50, 
          y: 10
        },
      }).showToast();
      contadorCart += 1;
      cart.push(juegosCart);
      renderCart();
      localStorage.setItem("carrito", JSON.stringify(cart));
      }
    });
  }
};

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

renderCatalogo();

/* Recupero la informacion del localStorage y valido si el carrito tiene items para presentarlos nuevamente en la web. Para esto utilizo el operador logico OR */

const cart = JSON.parse(localStorage.getItem("carrito")) || [];
renderCart();

/* Utilizo operador ternario para mostrar si el LS esta vacio o lleno. En base a eso muestro un mensaje o los elementos del arreglo */

cart != 0 
? console.log(cart) : console.log("El localStorage está vacío.");


