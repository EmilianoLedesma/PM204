let productoscocina = [
    { id: 1, nombre: "Enchiladas verdes",  precio: 25.99 },
    { id: 2, nombre: "Chile relleno",       precio: 45.50 },
    { id: 3, nombre: "Hamburguesa clasica", precio: 65.00 },
    { id: 4, nombre: "Tacos dorados",       precio: 20.99 },
    { id: 5, nombre: "Guajalote",           precio: 48.50 }
];

// Cargar desde localStorage si existe
const guardados = localStorage.getItem("productoscocina");
if (guardados) {
    productoscocina = JSON.parse(guardados);
}

// Guardar array actual en localStorage
function guardarStorage() {
    localStorage.setItem("productoscocina", JSON.stringify(productoscocina));
}

// ===== FUNCIONES CRUD =====

function agregar() {
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);

    if (!nombre || !precio) return;

    const nuevoId = Math.max(...productoscocina.map(p => p.id)) + 1;
    productoscocina.push({ id: nuevoId, nombre, precio });
    guardarStorage();

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
}

function listar() {
    let html = "";
    productoscocina.forEach(p => {
        html += "<p>ID: " + p.id + " | " + p.nombre + " | $" + p.precio + "</p>";
    });
    document.getElementById("lista").innerHTML = html;
}

function buscar() {
    const id = parseInt(document.getElementById("buscaId").value);
    const producto = productoscocina.find(p => p.id === id);

    if (producto) {
        document.getElementById("resultado").innerHTML =
            "<p>" + producto.nombre + " - $" + producto.precio + "</p>";
    } else {
        document.getElementById("resultado").innerHTML = "<p>No encontrado</p>";
    }
}

function actualizar() {
    const id = parseInt(document.getElementById("updateId").value);
    const nuevoPrecio = parseFloat(document.getElementById("updatePrecio").value);

    const producto = productoscocina.find(p => p.id === id);
    if (producto) {
        producto.precio = nuevoPrecio;
        guardarStorage();
        document.getElementById("updateId").value = "";
        document.getElementById("updatePrecio").value = "";
    }
}

function eliminar() {
    const id = parseInt(document.getElementById("deleteId").value);
    const index = productoscocina.findIndex(p => p.id === id);

    if (index !== -1) {
        productoscocina.splice(index, 1);
        guardarStorage();
        document.getElementById("deleteId").value = "";
    }
}