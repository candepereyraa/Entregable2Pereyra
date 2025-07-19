 let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
   function mostrarCantidadProductos() {
    const cantidad = carrito.length;
    document.getElementById('cantidad-productos').textContent = cantidad;
   }

    function renderizarCarrito() {
      const lista = document.getElementById('lista-carrito');
      lista.innerHTML = '';

      carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          <div>
            <img src="${producto.imagen}" alt="${producto.nombre}" width="50" class="me-3" />
            ${producto.nombre} - $${producto.precio}
          </div>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        lista.appendChild(li);
       
      });

      actualizarTotal();
      mostrarCantidadProductos();
    }

    function eliminarProducto(indice) {
      carrito.splice(indice, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderizarCarrito();
      Swal.fire('Producto eliminado', '', 'success');
    }

    function actualizarTotal() {
      const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
      document.getElementById('total').textContent = total.toFixed(2);
    }
document.addEventListener('DOMContentLoaded', renderizarCarrito);