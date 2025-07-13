const productos = [];
productos.push({
  id: 1,
  nombre: "Gloss Bomb Ice",
  precio: 12000,
  imagen: "imagenesfenty/01.webp"
});
productos.push({
  id: 2,
  nombre: "Aceite Gloss Bomb",
  precio: 12000,
  imagen: "imagenesfenty/02.webp"
});
productos.push({
  id: 3,
  nombre: "máscara de pestañas thicc",
  precio: 19000,
  imagen: "imagenesfenty/03.webp"
});
productos.push({
  id: 4,
  nombre: "prebase de pestañas",
  precio: 19000,
  imagen: "imagenesfenty/04.webp"
});
productos.push({
  id: 5,
  nombre: "match stix contour skinstick",
  precio: 20000,
  imagen: "imagenesfenty/05.webp"
});
productos.push({
  id: 6,
  nombre: "rubor en polvo suede",
  precio: 15000,
  imagen: "imagenesfenty/06.jpg"
});
productos.push({
  id: 7,
  nombre: "spray fijador y prolongador",
  precio: 21000,
  imagen: "imagenesfenty/07.webp"
});
productos.push({
  id: 8,
  nombre: "corrector fenty",
  precio: 19000,
  imagen: "imagenesfenty/08.jpg"
});
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para agregar producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  if (producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
  }
}

// Función para actualizar el contador del carrito
function actualizarCarrito() {
  const cantidad = document.getElementById("cantidad");
  cantidad.textContent = carrito.length;

  const ul = document.getElementById("lista-carrito");
  ul.innerHTML = "";
  carrito.forEach((producto) => {
    let li = document.createElement("li");
    li.classList.add("item-carrito");
    let img = document.createElement("img");
    img.src = producto.imagen;
    img.classList.add("imagen");
    let texto = document.createTextNode(`- ${producto.nombre} - $${producto.precio}`);
    let boton = document.createElement("button");
    boton.textContent = "eliminar";
    boton.classList.add("boton-eliminar");
    boton.addEventListener("click", () => {
      carrito = carrito.filter(p => p.id !== producto.id);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarCarrito()
    });

    li.appendChild(img);
    li.appendChild(texto);
    li.appendChild(boton);
    ul.appendChild(li);
  });
  TotalApagar()
}
function TotalApagar() {
  const ul = document.getElementById("total");
  let total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  ul.innerHTML = "Total a pagar: $" + total.toFixed(2);

};
  document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito();
  });
// Configurar evento al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito();

  // Agregar eventos a todos los botones
  const botones = document.querySelectorAll(".btn");
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      const id = parseInt(boton.getAttribute("data-id"));
      agregarAlCarrito(id);
      Swal.fire({
        title: "¡Producto Agregado!",
        icon: "success",
        confirmButtonText: "confirmar"
      });
    });
  });
});
function validarFormulario() {
  const inputs = document.querySelectorAll(".form-control"); 
  for (let input of inputs) {
    if (!input.value.trim()) {
      return false; //
    }
  }
  return true; 
}
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
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
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
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('input0').value = 'correofalso@gmail.com'
  document.getElementById('input1').value = 'Calle Falsa 123';
  document.getElementById('input2').value = 'Departamento 4B';
  document.getElementById('input3').value = 'Juan';
  document.getElementById('input4').value = 'Pérez';
  document.getElementById('input5').value = '123456789';
  document.getElementById('input6').value = '1234 5678 9876 5432';
  document.getElementById('input7').value = '12/26';
  document.getElementById('input8').value = '123';
  document.getElementById('input9').value = 'Juan Pérez';
  
  // Para el select (país)
  const selectPais = document.querySelector('select.form-select');
  selectPais.value = '1'; // Por ejemplo, Argentina (value="1")
});
