// carrito.js
const contenedorCarrito = document.getElementById('contenedor-carrito');
const totalElement = document.getElementById('total');
let cantidadEnCarrito = parseInt(localStorage.getItem('cantidadEnCarrito')) || 0;
let productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
  // Cargar datos del localStorage al inicio
  cantidadEnCarrito = parseInt(localStorage.getItem('cantidadEnCarrito')) || 0;
  productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];

  // Actualizar el contador en la interfaz de usuario
  actualizarNumeroCarrito();

  // Cargar y mostrar productos en el carrito
  cargarProductosEnCarrito();
});

const cargarProductosEnCarrito = () => {
  contenedorCarrito.innerHTML = '';

  const cantidadPorProducto = {};

  productosEnCarrito.forEach((producto) => {
    cantidadPorProducto[producto.id] = (cantidadPorProducto[producto.id] || 0) + 1;
  });

  for (const [productoId, cantidad] of Object.entries(cantidadPorProducto)) {
    const producto = productosEnCarrito.find((p) => p.id === productoId);

    const div = document.createElement('div');
    div.classList.add('contenedor-carrito');
    div.innerHTML = `
      <div class="carritos-productos">
        <div class="carrito-producto">
          <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" />
          <div class="carrito-producto-titulo">
            <small>Nombre</small>
            <h3>${producto.titulo}</h3>
          </div>
          <div class="carrito-producto-cantidad">
            <small>Cantidad</small>
            <p>${cantidad}</p>
          </div>
          <div class="carrito-producto-precio">
            <small>Precio</small>
            <p>${producto.precio.toFixed(2)}</p>
          </div>
          <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>${(producto.precio * cantidad).toFixed(2)}</p>
          </div>
          <button class="carrito-producto-eliminar" onclick="eliminarProductoDelCarrito('${
            producto.id
          }')">Quitar</button>
        </div>
      </div>
    `;

    contenedorCarrito.append(div);
  }

  // Calcular y mostrar el total
  calcularYMostrarTotal();
};

const calcularYMostrarTotal = () => {
  const total = productosEnCarrito
    .reduce((acumulador, producto) => {
      return acumulador + producto.precio;
    }, 0)
    .toFixed(2);

  totalElement.innerText = `€${total}`;
};

const actualizarNumeroCarrito = () => {
  // Actualizar el contador del carrito en todas las páginas
  const numeroCarritoElement = document.getElementById('numero-carrito');
  numeroCarritoElement.innerText = cantidadEnCarrito.toString();
};

const eliminarProductoDelCarrito = (productoId) => {
  productosEnCarrito = productosEnCarrito.filter((producto) => producto.id !== productoId);
  cantidadEnCarrito = productosEnCarrito.length;

  // Guardar en localStorage
  localStorage.setItem('cantidadEnCarrito', cantidadEnCarrito.toString());
  localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));

  // Actualizar la interfaz
  cargarProductosEnCarrito();
  actualizarNumeroCarrito();
};

const vaciarCarrito = () => {
  productosEnCarrito = [];
  cantidadEnCarrito = 0;

  // Guardar en localStorage
  localStorage.setItem('cantidadEnCarrito', cantidadEnCarrito.toString());
  localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));

  // Actualizar la interfaz
  cargarProductosEnCarrito();
  actualizarNumeroCarrito();
};

const realizarCompra = () => {
  alert('Compra realizada. Gracias por tu pedido.');

  vaciarCarrito();
};
