const productos = [];
productos.push({
  id: 1,
  nombre: "Gloss Bomb Ice",
});
productos.push({
  id: 2,
  nombre: "Aceite Gloss Bomb",
});
productos.push({
  id: 3,
  nombre: "máscara de pestañas thicc",
});
productos.push({
  id: 4,
  nombre: "prebase de pestañas",
});
productos.push({ 
  id: 5, 
  nombre: "match stix contour skinstick",
 });
productos.push({ 
  id: 6, 
  nombre: "rubor en polvo suede" 
});
productos.push({ 
  id: 7, 
  nombre: "spray fijador y prolongador" 
});
productos.push({ 
  id: 8, 
  nombre: "corrector fenty" 
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
  let texto = document.createTextNode(`Agregaste ${producto.nombre}`);
  let boton = document.createElement("button");
  boton.textContent = "eliminar";
  boton.addEventListener("click",() =>{
  carrito = carrito.filter(p => p.id !== producto.id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito()
  });

  li.appendChild(texto);
  li.appendChild(boton);
  ul.appendChild(li);
  });
}
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
    });
  });
});
