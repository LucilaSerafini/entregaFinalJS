//Traer lo del LocalStorage

let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse (productosEnCarrito);


//Linkeo con HTML
const contenedorCarritoVacio = document.querySelector('#carrito-vacio');
const contenedorCarritoProductos = document.querySelector('#carrito-productos');
const contenedorCarritoAcciones = document.querySelector('#carrito-acciones');
const contenedorCarritoComprado = document.querySelector('#carrito-comprado');
let botonEliminarProductos = document.querySelectorAll('.cartItem-delete');
let botonVaciarCarrito = document.querySelector('.cartActions-clearOut');
let totalCompra = document.querySelector("#total");
let botonComprar = document.querySelector(".cartActions-buy");

//Función para cargar todos los productos que están en el Local Storage

function cargarProductosCarrito() {

    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add('disabled');
        contenedorCarritoProductos.classList.remove('disabled');
        contenedorCarritoAcciones.classList.remove('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    
        //Para que el carrito este vacío
        contenedorCarritoProductos.innerHTML = '';
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('carrito-producto');
            div.innerHTML = `
            <div class="cart-item">
                <img class="cartItem-img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="cartItem-title">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="cartItem-quantity">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="cartItem-price">
                    <small>Precio</small>
                    <p>$ ${producto.precio}</p>
                </div>
                <div class="cartItem-subTotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="cartItem-delete" id=${producto.id} ><i class="bi bi-trash3"></i></button>
            </div>
            `;
    
            contenedorCarritoProductos.append(div);
        })

        actualizarBotonesEliminar(); 

    } else {
        contenedorCarritoVacio.classList.remove('disabled');
        contenedorCarritoProductos.classList.add('disabled');
        contenedorCarritoAcciones.classList.add('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    }
    

    actualizarTotal();
    
}

cargarProductosCarrito();

//Función para que cada vez que se carguen productos nuevos se creen los botones correspondientes

function actualizarBotonesEliminar() {
    botonEliminarProductos = document.querySelectorAll(".cartItem-delete");

    botonEliminarProductos.forEach(boton => {
        boton.addEventListener('click', eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    let idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
 
}

botonVaciarCarrito.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

}

//Actualizar total de la compra 

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce ((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCompra.innerText = `$${totalCalculado}`;
}

//Botón comprar

botonComprar.addEventListener("click", realizarCompra);

function realizarCompra() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add('disabled');
    contenedorCarritoProductos.classList.add('disabled');
    contenedorCarritoAcciones.classList.add('disabled');
    contenedorCarritoComprado.classList.remove('disabled');


}

