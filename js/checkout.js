const form = document.getElementById("form-checkout");
const resumen = document.getElementById("resumen-compra");
const datosUsuarioDiv = document.getElementById("datos-usuario");
const productosCompra = document.getElementById("productos-compra");
const totalCompraSpan = document.getElementById("total-compra");
const volverBtn = document.getElementById("volver");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function validarNombre(nombre) {
  return /^[a-zA-Z\s]+$/.test(nombre.trim());
}

function validarNumeroTarjeta(numero) {
  return /^\d{16}$/.test(numero);
}

function validarFechaExp(fecha) {
  return /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(fecha);
}

function validarCVV(cvv) {
  return /^\d{3}$/.test(cvv);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = form.email.value.trim();
  const direccion = form.direccion.value.trim();
  const nombre = form.nombre.value.trim();
  const apellido = form.apellido.value.trim();
  const telefono = form.telefono.value.trim();
  const numTarjeta = form.numTarjeta.value.trim();
  const fechaExp = form.fechaExp.value.trim();
  const codigoSeg = form.codigoSeg.value.trim();
  const titular = form.titular.value.trim();

  // Validaciones
  if (!email || !direccion || !nombre || !apellido || !telefono || !numTarjeta || !fechaExp || !codigoSeg || !titular) {
    Swal.fire("Error", "Por favor completa todos los campos.", "error");
    return;
  }

  if (!validarNombre(nombre) || !validarNombre(apellido) || !validarNombre(titular)) {
    Swal.fire("Error", "Los campos nombre, apellido y titular solo pueden contener letras y espacios.", "error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    Swal.fire("Error", "El correo electrónico no es válido.", "error");
    return;
  }

  if (!validarNumeroTarjeta(numTarjeta)) {
    Swal.fire("Error", "El número de tarjeta debe tener 16 dígitos.", "error");
    return;
  }

  if (!validarFechaExp(fechaExp)) {
    Swal.fire("Error", "La fecha de expiración debe tener formato MM/AA.", "error");
    return;
  }

  if (!validarCVV(codigoSeg)) {
    Swal.fire("Error", "El código de seguridad debe tener 3 dígitos.", "error");
    return;
  }

  // Si todo está ok mostramos resumen y ocultamos formulario
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
  carrito.forEach(prod => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${prod.nombre} - $${prod.precio}`;
    productosCompra.appendChild(li);
    total += prod.precio;
  });

  totalCompraSpan.textContent = total.toFixed(2);
});

// Botón para volver a editar el formulario (opcional)
volverBtn.addEventListener("click", () => {
  resumen.style.display = "none";
  form.style.display = "block";
});
