//PRODUCTOS ARRAY

const burgersArray = [
  {
    id: 'pedido1',
    titulo: 'Burger Grill - 10,90€',
    imagen: './img/Burger1.jpg',
    precio: 10.9,
  },
  {
    id: 'pedido2',
    titulo: 'Burger Clásica - 10,90€',
    imagen: './img/burger2.jpg',
    precio: 10.9,
  },
  {
    id: 'pedido3',
    titulo: 'Cabrita - 12,90€',
    imagen: './img/burger3.jpg',
    precio: 12.9,
  },
  {
    id: 'pedido4',
    titulo: 'Caprichosa - 14,90€',
    imagen: './img/burger4.jpg',
    precio: 14.9,
  },
  {
    id: 'pedido5',
    titulo: 'Tex Mex - 13,90€',
    imagen: './img/burger5.jpg',
    precio: 13.9,
  },
  {
    id: 'pedido6',
    titulo: 'Chicken Sandwich - 9,90€',
    imagen: './img/burger6.jpg',
    precio: 9.9,
  },
  {
    id: 'pedido7',
    titulo: 'Chicken Burger - 13,50€',
    imagen: './img/burger7.jpg',
    precio: 13.5,
  },
  {
    id: 'pedido8',
    titulo: 'Ensalada César - 9,50€',
    imagen: './img/ensalada.jpg',
    precio: 9.5,
  },
  {
    id: 'pedido9',
    titulo: 'Nachos Tex - 10,50€',
    imagen: './img/nachos.jpg',
    precio: 10.5,
  },
];

const contenedorProductos = document.querySelector('#contenedor-pedidos');
const numeroCarritoElement = document.getElementById('numero-carrito');
let cantidadEnCarrito = parseInt(localStorage.getItem('cantidadEnCarrito')) || 0;
let productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
  // Cargar datos del localStorage al inicio
  cantidadEnCarrito = parseInt(localStorage.getItem('cantidadEnCarrito')) || 0;
  productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];

  // Actualizar el contador en la interfaz de usuario
  actualizarNumeroCarrito();
});

const cargarProductos = () => {
  burgersArray.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('contenedor-hamburguesa');
    div.innerHTML = `
        <div class="hamburguesa">
            <img src="${producto.imagen}" alt="${producto.titulo}" />
        </div>
        <div class="pedido1">
            <h4 class="titulo-pedido">${producto.titulo}</h4>
            <p class="text-pedido">€${producto.precio}</p>
            <button class="boton-carrito" id="${producto.id}">Agregar al carrito</button>
        </div>

    `;

    contenedorProductos.append(div);
  });

  agregarEventoAlCarrito();
};

const agregarEventoAlCarrito = () => {
  const botonesCarrito = document.querySelectorAll('.boton-carrito');

  botonesCarrito.forEach((boton) => {
    boton.addEventListener('click', agregarAlCarrito);
  });
};

// const productosEnCarrito = [];

const agregarAlCarrito = (e) => {
  const id = e.currentTarget.id;
  const productoSeleccionado = burgersArray.find((producto) => producto.id === id);

  if (productoSeleccionado) {
    productosEnCarrito.push(productoSeleccionado);
    cantidadEnCarrito++;
    actualizarNumeroCarrito();
    console.log('Producto agregado al carrito:', productoSeleccionado);

    localStorage.setItem('cantidadEnCarrito', cantidadEnCarrito.toString());
    localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));

    Swal.fire({
      title: productoSeleccionado.titulo,
      text: 'Agregado al carrito',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      iconColor: 'white',
    });
  } else {
    console.log('Producto no encontrado');
  }
};

const actualizarNumeroCarrito = () => {
  numeroCarritoElement.innerText = cantidadEnCarrito.toString();
};

cargarProductos();

const sweetAlertCarrito = document.querySelector('boton-carrito');

sweetAlertCarrito.addEventListener('click', () => {});
