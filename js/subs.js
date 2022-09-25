/* Incorporo fetch para consumir productos de la api de Meli */

let response = fetch('https://api.mercadolibre.com/sites/MLA/search?limit=6&q=ps-plus')
	.then(response => response.json())
	.then(data => {
    const subs = data.results.map((sub) => { 
      const psPlus = {
        nombre: sub.title,
        precio: sub.price,
        img: "../images/ps-plus.gif",
        id: sub.id,
      };
      return psPlus
  });

  let contadorCart = 17;
  const contadorCarrito = document.getElementById("contador-carrito")
  const botonVaciar = document.getElementById("vaciar-carrito")

  /* Declaro catalogo y carrito de subs a instertarse en el DOM */

  const subCatalogoHTML = (sub) => {
    return`
      <div class="card">
          <div class="card-body">
            <img id="img-catalogo"src=${sub.img} class="card-img-top">
            <h5 class="card-title">${sub.nombre}</h5>
            <p class="card-text">Adquiere tu suscripcion Ps Plus al mejor precio del mercado!<hr> Precio: $ ${sub.precio}</p>
            <button id="btn-catalogo-${sub.id}" class="btn btn-primary">Buy</button>
          </div>
      </div>`;
  }; 

  const subCartHTML = (sub) => {
    return` 
      <tr>
          <th scope="row"><img id="img-cart"src=${sub.img}></th>
          <td>${sub.nombre}</td>
          <td>$${sub.precio}</td>
          <td id="cantidad">${sub.cantidad}</td> 
          <td><button id="btn-cart-${sub.idCompra}" class="btn btn-danger">X</button></td>
      </tr>
    `;
  };

  /* Renderizado del catalogo de juegos */   

  const renderCatalogo = () => {
    const catalogoNodo = document.getElementById("catalogo");
    let catalogoHTML = "";
    
    for (const sub of subs) {
      catalogoHTML += subCatalogoHTML(sub);
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
    for (const sub of cart) {
      cartHTML += subCartHTML(sub);
      precio += sub.precio;
      cantidad += sub.cantidad
    }

    contadorCarrito.innerHTML = cantidad
    precioNodo.innerHTML = precio;
    cartNodo.innerHTML = cartHTML;
    botonesCart(); 
  }

   /* Botones del catalogo */

  const botonesCatalogo = () => {
    for (const sub of subs) {
      const botonId = `btn-catalogo-${sub.id}`;
      const botonNodo = document.getElementById(botonId);
  
      botonNodo.addEventListener("click", () => {
        const subsCart = {
          nombre: sub.nombre,
          id: sub.id,
          idCompra: contadorCart,
          img: sub.img,
          precio: sub.precio,
          cantidad: 1
        };

      const existe = cart.some(sub => sub.id == subsCart.id);
      if (existe){
        const subs = cart.map (sub => {
          if (sub.id == subsCart.id){
              sub.cantidad++;
              sub.precio = sub.precio + subsCart.precio * subsCart.cantidad
              return sub;
          }else{
            return sub;
          }   
      })
      console.log(subs)
      renderCart();
      localStorage.setItem("carrito", JSON.stringify(cart));
      Toastify({
        text: "Sub agregada al carrito!",
        offset: {
          x: 50, 
          y: 10
        },
      }).showToast();
      } else {
        Toastify({
          text: "Sub agregada al carrito!",
          offset: {
            x: 50, 
            y: 10
          },
        }).showToast();
        contadorCart += 1;
        cart.push(subsCart);
        renderCart();
        localStorage.setItem("carrito", JSON.stringify(cart));
        }
      });
    }
  };
   /* Botones del carrito */

  const botonesCart = () => {
    for (const sub of cart) {
      const botonId = `btn-cart-${sub.idCompra}`;
      const botonNodo = document.getElementById(botonId);
  
      botonNodo.addEventListener("click", () => {
        const index = cart.findIndex((p) => p.idCompra == sub.idCompra);
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
        let id = sub.id
        borrarSub(id)
      });
    }
  };

  /* Declaro una funcion para eliminar individualmente los juegos del carrito */
  function borrarSub(id){
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

});

