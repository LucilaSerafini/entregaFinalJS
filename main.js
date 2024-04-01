// JUEGOS
const productos = [
    {
        id:'Kingdomino',
        titulo: 'Kingdomino',
        imagen: './resources/kingdomino.png',
        precio: 1500
    },
    {
        id:'Burako',
        titulo: 'Burako',
        imagen: './resources/burako.png',
        precio: 1500
    },
    {
        id:'Catan',
        titulo: 'Catan',
        imagen: './resources/catan.png',
        precio: 1500
    },
    {
        id:'Dables',
        titulo: 'Dables',
        imagen: './resources/dables.png',
        precio: 1500
    },
    {
        id:'DigaloConMemes',
        titulo: 'DigaloConMemes',
        imagen: './resources/digaloConMemes.png',
        precio: 1500
    },
    {
        id:'Estanciero',
        titulo: 'Estanciero',
        imagen: './resources/estanciero.png',
        precio: 1500
    },
    {
        id:'Monopoly',
        titulo: 'Monopoly',
        imagen: './resources/monopoly.png',
        precio: 1500
    },
    {
        id:'Munchkin',
        titulo: 'Munchkin',
        imagen: './resources/munchkin.png',
        precio: 1500
    },
    {
        id:'Teg',
        titulo: 'Teg',
        imagen: './resources/teg.png',
        precio: 1500
    },
    {
        id:'Uno',
        titulo: 'Uno',
        imagen: './resources/uno.png',
        precio: 1500
    },

]

//Linkeo con HTML 
 const contenedorProductos = document.querySelector('#contenedor-productos');
 const botonesMenu = document.querySelectorAll('.boton-menu');
 let botonesAgregarAlCarrito = document.querySelectorAll(".agregarAlCarrito");
 const numeroCarrito = document.querySelector("#numero-carrito");
 const botonBusqueda = document.querySelector("#boton-busqueda");




 function cargarProductos() {
    productos.forEach(producto => {
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


}

cargarProductos();


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

//Se traen los productos de carrito para que no se reinicie cada vez que apretamos seguir comprando

let productosEnCarrito;
let productosEnCarritoLS; 

 productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse (productosEnCarritoLS);
    actualizarNumeroCarrito();
    
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        //hay que buscar sie l producto agregado ya existe en el carrito para no duplicarlo, sólo aumentar la cantidad
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;

    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumeroCarrito();

    //Local Storage del array del carrito para poder llevarlo a la página de carrito

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

//Función para que se actualice el número del carrito en el index 
function actualizarNumeroCarrito() {
    const numeroCarritoMenu = productosEnCarrito.reduce((acc, producto)=> acc + producto.cantidad, 0);
    localStorage.setItem("cantidad-productos", numeroCarritoMenu);
    numeroCarrito.innerText = localStorage.getItem("cantidad-productos");
}

//Barra de búsqueda 

function buscarProducto() {
    const valorInput = document.getElementById("busqueda").value;
    // Si hay algo en la caja de busqueda filtro, sino muestro todos los productos
    if (valorInput) {
        const productosFiltrados = productos.filter((producto) => producto.titulo.toLowerCase().includes(valorInput.toLowerCase()));

        cargarProductos(productosFiltrados);
    } else {
        cargarProductos(productos);
    }
}



