//Traer lo del LocalStorage

const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
console.log(productosEnCarrito);

// //Linkeo con HTML
// const contenedorCarritoVacio = document.querySelector('#carrito-vacio');
// const contenedorCarritoProductos = document.querySelector('#carrito-productos');
// const contenedorCarritoAcciones = document.querySelector('#carrito-acciones');
// const contenedorCarritoComprado = document.querySelector('#carrito-comprado');

// if (productosEnCarrito) {
//     contenedorCarritoVacio.classList.add('disabled');
//     contenedorCarritoProductos.classList.remove('disabled');
//     contenedorCarritoAcciones.classList.remove('disabled');
//     contenedorCarritoComprado.classList.add('disabled');

//     //Para que el carrito este vacío
//     contenedorCarritoProductos.innerHTML = '';

//     productosEnCarrito.forEach(producto => {
//         const div = document.createElement('div');
//         div.classList.add('carrito-producto');
//         div.innerHTML = `
//         <div class="cart-item">
//             <img class="cartItem-img" src="${producto.imagen}" alt="${producto.titulo}">
//             <div class="cartItem-title">
//                 <small>Título</small>
//                 <h3>${producto.titulo}</h3>
//             </div>
//             <div class="cartItem-quantity">
//                 <small>Cantidad</small>
//                 <p>${producto.cantidad}</p>
//             </div>
//             <div class="cartItem-price">
//                 <small>Precio</small>
//                 <p>$ ${producto.precio}</p>
//             </div>
//             <div class="cartItem-subTotal">
//                 <small>Subtotal</small>
//                 <p>$${producto.precio * producto.cantidad}</p>
//             </div>
//             <button class="cartItem-delete" id=${producto.id} ><i class="bi bi-trash3"></i></button>
//         </div>
//         `;

//         contenedorCarritoProductos.append(div);
//     })
// } else {

// }