document.addEventListener('DOMContentLoaded', function() {
    // Definir constructor para Producto
    function Producto(nombre, precio, tipo) {
        this.nombre = nombre;
        this.precio = precio;
        this.tipo = tipo;
    }

    // Crear productos
    const productos = [
        new Producto('Kingdomino', 1500, 'juego'),
        new Producto('Burako', 1800, 'juego'),
        new Producto('Catan', 2000, 'juego'),
        new Producto('Dables', 1200, 'juego'),
        new Producto('DigaloConMemes', 1000, 'juego'),
        new Producto('Estanciero', 2200, 'juego'),
        new Producto('Monopoly', 2500, 'juego'),
        new Producto('Munchkin', 1700, 'juego'),
        new Producto('Teg', 2300, 'juego'),
        new Producto('Uno', 800, 'juego')
    ];

    // Obtener botones de agregar al carrito
    const botonesAgregarCarrito = document.querySelectorAll('.btn');

    // Inicializar carrito
    const carrito = [];

    // Agregar evento a cada botón de agregar al carrito
    botonesAgregarCarrito.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            const producto = document.getElementById("busqueda");
            const valorProducto = producto.value;
            console.log('Valor: ', valorProducto);
            agregarAlCarrito(valorProducto);
        });
    });

    if (localStorage.cantidad) {
        console.log('Hay cantidad:', localStorage.cantidad);
        const unidadesStorage = document.querySelector('.productos');
        unidadesStorage.textContent = localStorage.cantidad;
    }

    if (localStorage.importe) {
        console.log('Hay importe:', localStorage.importe);
        const importeStorage = document.querySelector('.importe');
        importeStorage.textContent = localStorage.importe;
    }
    

    // Función para agregar producto al carrito
    function agregarAlCarrito(valorProducto) {
        const productoFiltrado = productos.filter((producto) => producto.nombre === valorProducto);
        console.log('Producto filtrado', productoFiltrado);
        if (productoFiltrado.length > 0) {
            carrito.push(productoFiltrado[0]);
            actualizarProductosCarrito();
            calcularTotal();
        }
    }

    // Función para actualizar cantidad de productos en el carrito
    function actualizarProductosCarrito() {
        const unidadesProductos = document.querySelector('.productos');
        unidadesProductos.textContent = carrito.length;
        localStorage.setItem('cantidad', carrito.length);
    }

    // Función para calcular el total de la compra
    function calcularTotal() {
        const importeTotal = carrito.reduce((total, producto) => total + producto.precio, 0);
        const importeElemento = document.querySelector('.importe');
        importeElemento.textContent = `$${importeTotal.toFixed(2)}`;
        localStorage.setItem('importe', importeElemento.textContent);
    }
});
