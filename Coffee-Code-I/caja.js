let pedidos = [];
let total = 0;


        for (let i = 0; i < productoscocina.length; i++) {
            let respuesta = prompt(
                "MENU:\n" +
                "1. Enchiladas verdes $25.99\n" +
                "2. Chile relleno $45.50\n" +
                "3. Hamburguesa clasica $65.00\n" +
                "4. Tacos dorados $20.99\n" +
                "5. Guajalote $48.50\n\n" +
                "Ingresa el numero del producto (o 'no' para terminar):"
            );

            if (respuesta === "no") break;

            let opcion = parseInt(respuesta);
            let producto = productoscocina[opcion - 1];

            if (producto) {
                pedidos.push(producto);
            }
        }

        function mostrarTotal() {
            for (let i = 0; i < pedidos.length; i++) {
                total = total + pedidos[i].precio;
            }
            console.log("Total del pedido: $" + total.toFixed(2));
            document.getElementById("total").textContent = "Total del pedido: $" + total.toFixed(2);
        }

        mostrarTotal();

        console.log("Pedidos realizados:");
        console.table(pedidos);

        const cuerpo = document.getElementById("cuerpo-tabla");
        for (let i = 0; i < pedidos.length; i++) {
            cuerpo.innerHTML += "<tr><td>" + pedidos[i].id + "</td><td>" + pedidos[i].nombre + "</td><td>$" + pedidos[i].precio + "</td></tr>";
        };