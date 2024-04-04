
//Fetch

let productos = [];

fetch("./js/productos.json")
    .then (response => response.json())
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
let botonComprar = document.querySelector(".boton-comprar");

 



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

//Función para que cada vez que se carguen productos nuevos se creen los botones correspondientes

function actualizarBotonesAgregar() {
    botonesAgregarAlCarrito = document.querySelectorAll(".agregarAlCarrito");

    botonesAgregarAlCarrito.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

//Array para agregar al carrito los ítems que se seleccionen


const productosEnCarrito = [];

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        //hay que buscar si el producto agregado ya existe en el carrito para no duplicarlo, sólo aumentar la cantidad
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;

    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumeroCarrito();
    cargarProductosCarrito();
    actualizarTotal();

    //Local Storage del array del carrito para poder llevarlo a la página de carrito
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    // Mostrar el toast al agregar un producto al carrito
    Toastify({
        text: `Se agregó ${productoAgregado.titulo} al carrito`,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "left", 
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: '#9BB0C1',
            color: '#EEEEEE',
        },
        onClick: function () { } // Callback after click
    }).showToast();
}


//Función para que se actualice el número del carrito en el index 
function actualizarNumeroCarrito() {
    const numeroCarritoMenu = productosEnCarrito.reduce((acc, producto)=> acc + producto.cantidad, 0);
    localStorage.setItem("cantidad-productos", numeroCarritoMenu);
    numeroCarrito.innerText = localStorage.getItem("cantidad-productos");

    cargarProductosCarrito();
}

function buscarProducto() {
    const valorInput = document.getElementById("busqueda").value;
    // Si hay algo en la caja de busqueda filtro, sino muestro todos los productos
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
            let total = calcularTotal();
            console.log('TOTAL', total);
            divCarrito.innerHTML = `
                <div class = "carrito-producto">
                    <div class= cart-item>
                        <img class="cartItem-img" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="cartItem-title">${producto.titulo}</div>
                        <div class="cart-quantity">${producto.cantidad}</div>
                        <div class="cartItem-price">$${producto.precio}</div>
                        <div class="cartItem-subTotal">$${producto.precio * producto.cantidad}</div>
                        <button class="cartItem-delete" id= ${producto.id}><i class="bi bi-trash3"></i></button>
                        <div class="carrito-footer">
                        <button class="boton-comprar">FINALIZAR COMPRA</button>
                        <p id="total">$${total}</p>

                    </div>

                </div>
            `;
            contenedorProductosCarrito.append(divCarrito);
        });
        actualizarBotonesEliminar();
        actualizarTotal();
    }
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

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
    actualizarTotal();

}

//Actualizar total de la compra 

function actualizarTotal() {
    let totalCompra = document.querySelector("#total");
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCompra.innerText = `$${totalCalculado.toFixed(2)}`; 
}

function calcularTotal() {
    return productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
}




//Dark Mode

// Obtener el botón de cambio de modo y el cuerpo del documento
const colorModeBtn = document.getElementById('color-mode');
const body = document.body;

// Función para activar el modo oscuro
function activarDarkMode() {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'activado'); // Guardar el estado del modo en el almacenamiento local
}

// Función para desactivar el modo oscuro
function desactivarDarkMode() {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'desactivado'); // Guardar el estado del modo en el almacenamiento local
}

// Verificar el estado del modo al cargar la página
window.onload = function() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'activado') {
        activarDarkMode();
    } else {
        desactivarDarkMode();
    }
}

// Agregar un evento de clic al botón de cambio de modo
colorModeBtn.addEventListener('click', () => {
    // Alternar entre activar y desactivar el modo oscuro
    if (body.classList.contains('dark-mode')) {
        desactivarDarkMode();
    } else {
        activarDarkMode();
    }
});

