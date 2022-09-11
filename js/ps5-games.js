/* Declaro un array con los juegos */

const juegos = [
  {
    id: 1,
    img: '/images/spiderman.webp',  
    nombre: 'Spider-Man: Miles Morales',
    precio: 7400,
    info: 'Spider-Man: Miles Morales es un videojuego de acción y aventuras desarrollado por Insomniac Games y publicado por Sony Interactive Entertainment para PlayStation 4 y PlayStation 5. Está basado en el superhéroe de Marvel Comics Miles Morales.'
  },
  {
    id: 2,
    img: '/images/gt7.jpeg',
    nombre: 'Gran Turismo 7',
    precio: 8500,
    info: 'Gran Turismo 7 es un videojuego de simulación de carreras de 2022 desarrollado por Polyphony Digital y publicado por Sony Interactive Entertainment. El juego es la octava entrega principal de la serie Gran Turismo.'
  },
  {
    id: 3,
    img: '/images/godofwar.jpeg',
    nombre: 'God of War: Ragnarök',
    precio: 9900,
    info: 'God of War: Ragnarök es un próximo juego de acción y aventuras en desarrollo por Santa Monica Studio y que será publicado por Sony Interactive Entertainment. Su lanzamiento está programado para el 9 de noviembre del 2022 para PlayStation 4 y PlayStation 5.​ Será la 9.ª entrega de la saga de God of War.'
  },
  {
    id: 4,
    img: '/images/returnal.jpeg',
    nombre: 'Returnal',
    precio: 5800,
    info: 'Returnal es un videojuego de disparos en tercera persona roguelike, desarrollado por Housemarque y publicado por Sony Interactive Entertainment. Se estrenó exclusivamente para la consola PlayStation 5 el 30 de abril de 2021.'
  },
  {
    id: 5,
    img: '/images/stray.jpeg',
    nombre: 'Stray',
    precio: 7600,
    info: 'Stray es un juego de aventuras desarrollado por BlueTwelve Studio y publicado por Annapurna Interactive. Anteriormente conocido como HK_Project, el juego fue lanzado el 19 de julio de 2022 para Microsoft Windows, PlayStation 4 y PlayStation 5.​'
  },
  {
    id: 6,
    img: '/images/elden.jpeg',
    nombre: 'Elden Ring',
    precio: 6300,
    info: 'Elden Ring es un videojuego de rol de acción desarrollado por FromSoftware y publicado por Bandai Namco Entertainment. El videojuego surge de una colaboración entre el director y diseñador Hidetaka Miyazaki y el novelista de fantasía George R. R. Martin.'
  },
  {
    id: 7,
    img: '/images/horizon.jpeg',
    nombre: 'Horizon Forbidden West',
    precio: 8800,
    info: 'Horizon Forbidden West es un videojuego de rol de acción, aventura y mundo abierto desarrollado por Guerrilla Games y distribuido por Sony Interactive Entertainment, exclusivamente para PlayStation 4 y PlayStation 5. Es la secuela de Horizon Zero Dawn.'
  },
  {
    id: 8,
    img: '/images/nba2k23.jpeg',
    nombre: 'NBA 2K23',
    precio: 9500,
    info: 'NBA 2K23 es un videojuego de deportes y baloncesto a cargo de Visual Concepts y 2K Sports para PC, PlayStation 4, Xbox One, PlayStation 5, Xbox Series y Switch.'
  }, 
];

let contadorCart = 0;
let amountProduct = document.querySelector('.count-product');
let countProduct = 0;


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
    <div id="card-cart" class="card">
      <div class="card-body">
          <img id="img-cart"src=${juego.img} class="card-img-top">
          <h5 class="card-title">${juego.nombre}</h5>
          <p class="card-text"> Precio: $ ${juego.precio}</p>
          <button id="btn-cart-${juego.idCompra}" class="btn btn-danger">Delete</button>
      </div>
    </div>`;
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
  for (const juego of cart) {
    cartHTML += juegoCartHTML(juego);
    precio += juego.precio;
  }
   
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
        info: juego.info,
        idCompra: contadorCart,
        img: juego.img,
        precio: juego.precio,
      };
      Toastify({
        text: "Juego agregado al carrito!",
        offset: {
          x: 50, 
          y: 10
        },
      }).showToast();
      contadorCart += 1;
      countProduct++;
      amountProduct.innerHTML = countProduct;
      cart.push(juegosCart);
      renderCart();
      localStorage.setItem("carrito", JSON.stringify(cart));
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
      countProduct--;
      amountProduct.innerHTML = countProduct; 
      renderCart();
      localStorage.removeItem("carrito");
    });
  }
};

renderCatalogo();

/* Recupero la informacion del localStorage y valido si el carrito tiene items para presentarlos nuevamente en la web. Para esto utilizo el operador logico OR */

const cart = JSON.parse(localStorage.getItem("carrito")) || [];

renderCart();