/* Incorporo fetch para consumir productos de la api de Meli */

let response = fetch('https://api.mercadolibre.com/sites/MLA/search?limit=6&q=ps-plus')
	.then(response => response.json())
	.then(data => {
    console.log(data);
    const subs = data.results.map((sub) => { 
      const psPlus = {
        nombre: sub.title,
        precio: sub.price,
        img: "/images/ps-plus.gif",
        id: sub.id,
      };
      return psPlus
      
  });

  let contadorCart = 0;
  let amountProduct = document.querySelector('.count-product');
  let countProduct = 0;

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
    <div id="card-cart" class="card">
      <div class="card-body">
          <img id="img-cart"src=${sub.img} class="card-img-top">
          <h5 class="card-title">${sub.nombre}</h5>
          <p class="card-text"> Precio: $ ${sub.precio}</p>
          <button id="btn-cart-${sub.idCompra}" class="btn btn-danger">Delete</button>
      </div>
    </div>`;
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
    for (const sub of cart) {
      cartHTML += subCartHTML(sub);
      precio += sub.precio;
    }
     
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
          idCompra: contadorCart,
          img: sub.img,
          precio: sub.precio,
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
        cart.push(subsCart);
        renderCart();
        localStorage.setItem("carrito", JSON.stringify(cart));
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
            background: "linear-gradient(to right, rgb(200, 129, 129), rgb  (204, 68, 68))"
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

  console.log(subs)
  renderCatalogo(); 
  const cart = JSON.parse(localStorage.getItem("carrito")) || [];
  renderCart();

});

