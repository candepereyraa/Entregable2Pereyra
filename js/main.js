let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch("productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data;
    renderizarProductos(productos);
    asignarEventosBotones();
    actualizarCarrito();
  })
  .catch(error => console.error("Error al cargar productos:", error));

function renderizarProductos(productos) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  productos.forEach(prod => {
    contenedor.innerHTML += `
      <div class="producto card p-3 m-2" style="width: 18rem;">
        <img src="${prod.imagen}" alt="${prod.nombre}" class="card-img-top">
        <h3 class="card-title mt-2">${prod.nombre}</h3>
        <p class="card-text">${prod.descripcion || ""}</p>
        <p class="card-text fw-bold">$${prod.precio}</p>
        <button class="btn btn-primary btn-agregar" data-id="${prod.id}">Agregar al carrito</button>
      </div>
    `;
  });
}

function asignarEventosBotones() {
  const botones = document.querySelectorAll(".btn-agregar");
  botones.forEach(boton => {
    boton.addEventListener("click", e => {
      e.preventDefault();
      const id = parseInt(boton.getAttribute("data-id"));
      agregarAlCarrito(id);
      Swal.fire({
        title: "¡Producto agregado!",
        icon: "success",
        confirmButtonText: "Confirmar"
      });
    });
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
  }
}

function actualizarCarrito() {
  const cantidad = document.getElementById("cantidad");
  cantidad.textContent = carrito.length;

  const ul = document.getElementById("lista-carrito");
  ul.innerHTML = "";
  
  carrito.forEach(producto => {
    ul.innerHTML += `
      <li class="item-carrito d-flex align-items-center mb-2">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen me-2" width="50">
        <span class="flex-grow-1">- ${producto.nombre} - $${producto.precio}</span>
        <button class="btn btn-sm btn-danger boton-eliminar" data-id="${producto.id}">Eliminar</button>
      </li>
    `;
  });

  // Asignar evento eliminar para cada botón de eliminar (porque se generan dinámicamente)
  const botonesEliminar = document.querySelectorAll(".boton-eliminar");
  botonesEliminar.forEach(boton => {
    boton.addEventListener("click", () => {
      const id = parseInt(boton.getAttribute("data-id"));
      carrito = carrito.filter(p => p.id !== id);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarCarrito();
    });
  });

  totalAPagar();
}

function totalAPagar() {
  const totalElem = document.getElementById("total");
  let total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  totalElem.textContent = `Total a pagar: $${total.toFixed(2)}`;
}

// Validar formulario simple (que no esté vacío)
function validarFormulario() {
  const inputs = document.querySelectorAll(".form-control");
  for (let input of inputs) {
    if (!input.value.trim()) return false;
  }
  return true;
}

// Evento para el botón de pago (si existe)
const botonPago = document.getElementById("pagohecho");
if (botonPago) {
  botonPago.addEventListener("click", () => {
    if (!validarFormulario()) {
      Swal.fire({
        icon: "warning",
        title: "Formulario incompleto",
        text: "Por favor, completá todos los campos antes de continuar."
      });
      return;
    }

    let timerInterval;
    Swal.fire({
      title: "¡Procesando compra!",
      html: "Confirmando en <b></b> milisegundos.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then(result => {
      if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
          title: "¡Compra realizada!",
          icon: "success",
          confirmButtonText: "Volver al inicio"
        }).then(() => {
          localStorage.removeItem("carrito");
          window.location.href = "index.html";
        });
      }
    });
  });
}
