//Fetch
let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

//Linkeo con HTML 
const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesMenu = document.querySelectorAll('.boton-menu');
let botonesAgregarAlCarrito = document.querySelectorAll(".agregarAlCarrito");
const numeroCarrito = document.querySelector("#numero-carrito");
let toastify = document.querySelector('.toastify');
let botonVaciarCarrito = document.querySelector('#clearOut');
const botonCerrarCarrito = document.querySelector(".cerrar");
const botonCarrito = document.querySelector("#carrito-icon");
const contenedorCarrito = document.querySelector("#carrito-container");


function limpiarContenedor(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

function cargarProductos(listaProductos) {
    limpiarContenedor(contenedorProductos); 
    if (listaProductos.length > 0){
        listaProductos.forEach(producto => {
            const div = document.createElement('div');
            div.innerHTML = `
                <img class="cardImg" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="cardStyle">
                    <h5 class="card-title">${producto.titulo}</h5>
                    <p class="card-text">$${producto.precio} </p>
                    <button class="card-btn agregarAlCarrito" id="${producto.id}">AGREGAR</button>
                </div>
            `;
            contenedorProductos.append(div);
        });
        actualizarBotonesAgregar();
    } else {
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="cardStyle">
                    <h5 class="card-title">No se encontraron resultados.</h5>
                </div>
            `;
            contenedorProductos.append(div);
    }
}

cargarProductos(productos);

//Botones de Menú - se cambia la etiqueta active dependiendo de en qué botón se haga click
botonesMenu.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesMenu.forEach(boton => boton.classList.remove('active'));    
        e.currentTarget.classList.add('active');
    })
})

//Agregar al carrito
function actualizarBotonesAgregar() {
    botonesAgregarAlCarrito = document.querySelectorAll(".agregarAlCarrito");
    botonesAgregarAlCarrito.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

let productosEnCarrito = [];
const productosCarritoStorage = JSON.parse(localStorage.getItem("productos-en-carrito"));

if(productosCarritoStorage.length > 0) {
    productosEnCarrito = Array.from(productosCarritoStorage);
    actualizarNumeroCarrito();
    cargarProductosCarrito();
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumeroCarrito();
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    // Mostrar el toast al agregar un producto al carrito
    Toastify({
        text: `Se agregó ${productoAgregado.titulo} al carrito`,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "left", 
        stopOnFocus: true, 
        style: {
            background: '#F9B572',
            color: 'black',
        },
        onClick: function () { } 
    }).showToast();
}

function actualizarNumeroCarrito() {
    const numeroCarritoMenu = productosEnCarrito.reduce((acc, producto)=> acc + producto.cantidad, 0);
    localStorage.setItem("cantidad-productos", numeroCarritoMenu);
    numeroCarrito.innerText = localStorage.getItem("cantidad-productos");
    cargarProductosCarrito();
}

function buscarProducto() {
    const valorInput = document.getElementById("busqueda").value;
    if (valorInput) {
        const productosFiltrados  = productos.filter((producto) => producto.titulo.toLowerCase() == valorInput.toLowerCase());
        cargarProductos(productosFiltrados);
    } else {
        cargarProductos(productos);
    }
}

function cargarProductosCarrito() {
    const contenedorProductosCarrito = document.querySelector("#carrito-productos");
    limpiarContenedor(contenedorProductosCarrito)
    if (productosEnCarrito.length > 0) {
        productosEnCarrito.forEach((producto) => {
            const divCarrito = document.createElement("div");
            divCarrito.innerHTML = `
                <div class = "carrito-producto" id ="carrito-producto">
                    <div class= cart-item>
                        <img class="cartItem-img" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="cartItem-title">
                            ${producto.titulo}
                        </div>
                        <div class="cart-quantity">
                            ${producto.cantidad}
                        </div>
                        <div class="cartItem-price">
                            $${producto.precio}
                        </div>
                        <div class="cartItem-subTotal">
                            $${producto.precio * producto.cantidad}
                        </div>
                        <button class="cartItem-delete" id= ${producto.id}><i class="bi bi-trash3"></i></button>
                    </div>
                </div>
            `;
            contenedorProductosCarrito.append(divCarrito);
        });

        const listadoProductos = document.querySelector("#carrito-producto");
        const divTotal = document.createElement("div");
        const total = calcularTotal();
        divTotal.innerHTML = 
            `<div class="carrito-footer" onclick="comprar()">
                 <p id="boton-finalizar-compra" class="boton-comprar">FINALIZAR COMPRA</p>
                <p id="total">$${total}</p>
            </div>`;
    
        listadoProductos.append(divTotal);
        actualizarBotonesEliminar();
        actualizarTotal();
    }
}

function comprar() {
    console.log('Comprar');
    Swal.fire({
        title: '¡Compra realizada!',
        text: 'Gracias por su compra. ¡Vuelva pronto!',
        icon: 'success'
    });
    vaciarCarrito()
}
function actualizarBotonesEliminar() {
    botonEliminarProductos = document.querySelectorAll(".cartItem-delete");
    botonEliminarProductos.forEach(boton => {
        boton.addEventListener('click', eliminarDelCarrito);
    });
}

botonVaciarCarrito.addEventListener("click", vaciarCarrito);

function eliminarDelCarrito(e) {
    let idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
}

function vaciarCarrito() {
    actualizarTotal();
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    let totalCompra = document.querySelector("#total");
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCompra.innerText = `$${totalCalculado.toFixed(2)}`; 
}

function calcularTotal() {
    return productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
}

botonCarrito.addEventListener("click", function() {
    contenedorCarrito.classList.remove("cerrado");
})

botonCerrarCarrito.addEventListener("click", function() {
    contenedorCarrito.classList.add("cerrado");
})


//Dark Mode
const colorModeBtn = document.getElementById('color-mode');
const body = document.body;

function activarDarkMode() {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'activado');
}

function desactivarDarkMode() {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'desactivado');
}

window.onload = function() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'activado') {
        activarDarkMode();
    } else {
        desactivarDarkMode();
    }
}

colorModeBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        desactivarDarkMode();
    } else {
        activarDarkMode();
    }
});

