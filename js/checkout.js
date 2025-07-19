const form = document.getElementById("form-checkout");
const resumen = document.getElementById("resumen-compra");
const datosUsuarioDiv = document.getElementById("datos-usuario");
const productosCompra = document.getElementById("productos-compra");
const totalCompraSpan = document.getElementById("total-compra");
const volverBtn = document.getElementById("volver");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function soloLetras(texto) {
  const letrasValidas = "abcdefghijklmnopqrstuvwxyzáéíóúüñ ";
  texto = texto.toLowerCase();

  for (let i = 0; i < texto.length; i++) {
    if (!letrasValidas.includes(texto[i])) {
      return false;
    }
  }
  return true;
}
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = form.email.value;
  const direccion = form.direccion.value;
  const nombre = form.nombre.value;
  const apellido = form.apellido.value;
  const telefono = form.telefono.value;
  const numTarjeta = form.numTarjeta.value;
  const fechaExp = form.fechaExp.value;
  const codigoSeg = form.codigoSeg.value;
  const titular = form.titular.value;

  if (
    email === "" || direccion === "" || nombre === "" || apellido === "" ||
    telefono === "" || numTarjeta === "" || fechaExp === "" || 
    codigoSeg === "" || titular === ""
  ) {
    Swal.fire("Error", "Todos los campos son obligatorios.", "error");
    return;
  }
 if (!soloLetras(nombre)) {
    Swal.fire("Error", "El nombre solo debe contener letras y espacios.", "error");
    return;
  }
  if (!soloLetras(apellido)) {
    Swal.fire("Error", "El apellido solo debe contener letras y espacios.", "error");
    return;
  }
  if (!soloLetras(titular)) {
    Swal.fire("Error", "El nombre del titular solo debe contener letras y espacios.", "error");
    return;
  }

  if (numTarjeta.length !== 16 || isNaN(numTarjeta)) {
    Swal.fire("Error", "El número de tarjeta debe tener 16 dígitos.", "error");
    return;
  }
  if(fechaExp.length !== 4|| isNaN(fechaExp)){
    Swal.fire("Error", "La fecha de expiracion debe tener 4 digitos.","error");
    return;
  }
  if (codigoSeg.length !== 3 || isNaN(codigoSeg)) {
    Swal.fire("Error", "El código de seguridad debe tener 3 dígitos.", "error");
    return;
  }
 
  
   Swal.fire({
    title: '¡Compra realizada con éxito!',
    icon: 'success',
    confirmButtonText: 'Ver resumen'
  }).then(() => {
    // Mostrar resumen y ocultar form
    form.style.display = "none";
    resumen.style.display = "block";

  datosUsuarioDiv.innerHTML = `
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Dirección:</strong> ${direccion}</p>
    <p><strong>Nombre y Apellido:</strong> ${nombre} ${apellido}</p>
    <p><strong>Teléfono:</strong> ${telefono}</p>
  `;

  productosCompra.innerHTML = "";
  let total = 0;
  carrito.forEach(producto => {
    const item = document.createElement("li");
    item.className = "list-group-item";
    item.textContent = `${producto.nombre} - $${producto.precio}`;
    productosCompra.appendChild(item);
    total += producto.precio;
  });

  totalCompraSpan.textContent = total.toFixed(2);
});

// Botón para volver
volverBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
});