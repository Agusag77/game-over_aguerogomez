/* Declaro un array con los juegos */

const juegos = [
  {
    id: 9,
    img: './images/spiderman.webp',  
    nombre: 'Spider-Man: Miles Morales',
    precio: 7400,
    info: 'Spider-Man: Miles Morales es un videojuego de acción y aventuras desarrollado por Insomniac Games y publicado por Sony Interactive Entertainment para PlayStation 4 y PlayStation 5. Está basado en el superhéroe de Marvel Comics Miles Morales.'
  },
  {
    id: 10,
    img: '../images/gt7.jpeg',
    nombre: 'Gran Turismo 7',
    precio: 8500,
    info: 'Gran Turismo 7 es un videojuego de simulación de carreras de 2022 desarrollado por Polyphony Digital y publicado por Sony Interactive Entertainment. El juego es la octava entrega principal de la serie Gran Turismo.'
  },
  {
    id: 11,
    img: '../images/godofwar.jpeg',
    nombre: 'God of War: Ragnarök',
    precio: 9900,
    info: 'God of War: Ragnarök es un próximo juego de acción y aventuras en desarrollo por Santa Monica Studio y que será publicado por Sony Interactive Entertainment. Su lanzamiento está programado para el 9 de noviembre del 2022 para PlayStation 4 y PlayStation 5.​ Será la 9.ª entrega de la saga de God of War.'
  },
  {
    id: 12,
    img: '../images/returnal.jpeg',
    nombre: 'Returnal',
    precio: 5800,
    info: 'Returnal es un videojuego de disparos en tercera persona roguelike, desarrollado por Housemarque y publicado por Sony Interactive Entertainment. Se estrenó exclusivamente para la consola PlayStation 5 el 30 de abril de 2021.'
  },
  {
    id: 13,
    img: '../images/stray.jpeg',
    nombre: 'Stray',
    precio: 7600,
    info: 'Stray es un juego de aventuras desarrollado por BlueTwelve Studio y publicado por Annapurna Interactive. Anteriormente conocido como HK_Project, el juego fue lanzado el 19 de julio de 2022 para Microsoft Windows, PlayStation 4 y PlayStation 5.​'
  },
  {
    id: 14,
    img: '../images/elden.jpeg',
    nombre: 'Elden Ring',
    precio: 6300,
    info: 'Elden Ring es un videojuego de rol de acción desarrollado por FromSoftware y publicado por Bandai Namco Entertainment. El videojuego surge de una colaboración entre el director y diseñador Hidetaka Miyazaki y el novelista de fantasía George R. R. Martin.'
  },
  {
    id: 15,
    img: '../images/horizon.jpeg',
    nombre: 'Horizon Forbidden West',
    precio: 8800,
    info: 'Horizon Forbidden West es un videojuego de rol de acción, aventura y mundo abierto desarrollado por Guerrilla Games y distribuido por Sony Interactive Entertainment, exclusivamente para PlayStation 4 y PlayStation 5. Es la secuela de Horizon Zero Dawn.'
  },
  {
    id: 16,
    img: '../images/nba2k23.jpeg',
    nombre: 'NBA 2K23',
    precio: 9500,
    info: 'NBA 2K23 es un videojuego de deportes y baloncesto a cargo de Visual Concepts y 2K Sports para PC, PlayStation 4, Xbox One, PlayStation 5, Xbox Series y Switch.'
  }, 
];

let contadorCart = 9;
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
  };
  
  contadorCarrito.innerHTML = cantidad;
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
    })
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