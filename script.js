let productos = JSON.parse(localStorage.getItem('productos')) || [];  // Cargar productos guardados en LocalStorage

function agregarProducto() {
    const descripcion = document.getElementById("descripcion").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precio = parseFloat(document.getElementById("precio").value);

    if (descripcion && cantidad > 0 && precio >= 0) {
        const producto = {
            descripcion,
            cantidad,
            precio
        };
        productos.push(producto);
        guardarEnLocalStorage();  // Guardar productos en LocalStorage
        actualizarPresupuesto();
    } else {
        alert("Por favor, completa todos los campos correctamente.");
    }
}

function guardarEnLocalStorage() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

function calcularTotal() {
    const subtotal = productos.reduce((acc, p) => acc + p.cantidad * p.precio, 0);
    const impuesto = subtotal * 0.21;
    const total = subtotal + impuesto;
    return { subtotal, impuesto, total };
}

function actualizarPresupuesto() {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = "";

    productos.forEach((p, index) => {
        const li = document.createElement("li");
        li.textContent = `${p.descripcion}: ${p.cantidad} x $${p.precio.toFixed(2)} = $${(p.cantidad * p.precio).toFixed(2)}`;
        listaProductos.appendChild(li);
    });

    const { subtotal, impuesto, total } = calcularTotal();

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("impuesto").textContent = impuesto.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
}

// Cargar los productos guardados en el almacenamiento local al iniciar
document.addEventListener('DOMContentLoaded', actualizarPresupuesto);
