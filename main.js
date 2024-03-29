
// JUEGOS
const productos = [
    {
        id:'Kingdomino',
        titulo: 'Kingdomino',
        imagen: './resources/kingdomino.png',
        categoria: {
            nombre: 'juegos',
            id: 'Kingdomino'
        },
        precio: 1500
    },
    {
        id:'Burako',
        titulo: 'Burako',
        imagen: './resources/burako.png',
        categoria: {
            nombre: 'juegos',
            id: 'Burako'
        },
        precio: 1500
    },
    {
        id:'Catan',
        titulo: 'Catan',
        imagen: './resources/catan.png',
        categoria: {
            nombre: 'juegos',
            id: 'Catan'
        },
        precio: 1500
    },
    {
        id:'Dables',
        titulo: 'Dables',
        imagen: './resources/dables.png',
        categoria: {
            nombre: 'juegos',
            id: 'Dables'
        },
        precio: 1500
    },
    {
        id:'DigaloConMemes',
        titulo: 'DigaloConMemes',
        imagen: './resources/digaloConMemes.png',
        categoría: {
            nombre: 'juegos',
            id: 'DigaloConMemes'
        },
        precio: 1500
    },
    {
        id:'Estanciero',
        titulo: 'Estanciero',
        imagen: './resources/estanciero.png',
        categoría: {
            nombre: 'juegos',
            id: 'Estanciero'
        },
        precio: 1500
    },
    {
        id:'Monopoly',
        titulo: 'Monopoly',
        imagen: './resources/monopoly.png',
        categoria: {
            nombre: 'juegos',
            id: 'Monopoly'
        },
        precio: 1500
    },
    {
        id:'Munchkin',
        titulo: 'Munchkin',
        imagen: './resources/munchkin.png',
        categoria: {
            nombre: 'juegos',
            id: 'Munchkin'
        },
        precio: 1500
    },
    {
        id:'Teg',
        titulo: 'Teg',
        imagen: './resources/teg.png',
        categoria: {
            nombre: 'juegos',
            id: 'Teg'
        },
        precio: 1500
    },
    {
        id:'Uno',
        titulo: 'Uno',
        imagen: './resources/uno.png',
        categoria: {
            nombre: 'juegos',
            id: 'Uno'
        },
        precio: 1500
    },

]

 const contenedorProductos = document.querySelector('#contenedor-productos');

 function cargarProductos() {
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img class="cardImg" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="cardStyle">
                <h5 class="card-title">${producto.titulo}</h5>
                <p class="card-text">$${producto.precio} </p>
                <button class="card-btn agregarAlCarrito" data-id="${producto.id}">AGREGAR</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
}

cargarProductos();



