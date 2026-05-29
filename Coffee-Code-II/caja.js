let pedidos = [];
let total = 0;

// Poblar el select con productos de cocina.js
window.onload = function () {
    const select = document.getElementById("selector-producto");
    for (let i = 0; i < productoscocina.length; i++) {
        select.innerHTML += `<option value="${productoscocina[i].id}">${productoscocina[i].nombre} - $${productoscocina[i].precio}</option>`;
    }
};

// Agregar producto seleccionado al pedido
function agregarPedido() {
    const opcion = parseInt(document.getElementById("selector-producto").value);
    const producto = productoscocina.find(p => p.id === opcion);

    if (producto) {
        pedidos.push(producto);
        const { nombre } = producto; // destructuring
        console.log("Pedido agregado:", nombre);
        actualizarVista();
    }
}

// Actualizar tarjetas y total
function actualizarVista() {
    const cuerpo = document.getElementById("cuerpo-tabla");
    cuerpo.innerHTML = "";

    for (let i = 0; i < pedidos.length; i++) {
        const { id, nombre, precio } = pedidos[i]; // destructuring
        cuerpo.innerHTML += `
            <div class="producto-item">
                <div class="producto-info">
                    <span class="producto-nombre">${nombre}</span>
                    <span class="producto-id">ID: ${id}</span>
                </div>
                <span class="producto-precio">$${precio.toFixed(2)}</span>
            </div>
        `;
    }

    // reduce con destructuring para calcular subtotal
    const subtotal = pedidos.reduce((acumulado, { precio }) => acumulado + precio, 0);
    const iva = subtotal * 0.16;
    total = subtotal + iva;

    document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2);
    document.getElementById("iva").textContent      = "$" + iva.toFixed(2);
    document.getElementById("total").textContent    = "$" + total.toFixed(2);
}