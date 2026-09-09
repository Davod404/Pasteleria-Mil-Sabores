function obtenerCarrito() {
    const data = localStorage.getItem("carrito");
    return data ? JSON.parse(data) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(codigo, personalizacion = "Sin mensaje", cantidad = 1) {
    let carrito = obtenerCarrito();
    
    const index = carrito.findIndex(item => item.codigo === codigo && item.personalizacion === personalizacion);

    if (index !== -1) {
        carrito[index].cantidad += Number(cantidad);
    } else {
        const prodBase = productos.find(p => p.codigo === codigo);
        if (!prodBase) return;

        carrito.push({
            codigo: prodBase.codigo,
            nombre: prodBase.nombre,
            precio: prodBase.precio,
            personalizacion: personalizacion,
            cantidad: Number(cantidad)
        });
    }

    guardarCarrito(carrito);
    alert(`Se agregó "${codigo}" al carrito.`);
    renderizarCarrito();
}

function modificarCantidad(index, nuevaCantidad) {
    let carrito = obtenerCarrito();
    const cant = Number(nuevaCantidad);

    if (cant <= 0) {
        eliminarDelCarrito(index);
        return;
    }

    carrito[index].cantidad = cant;
    guardarCarrito(carrito);
    renderizarCarrito();
}

function eliminarDelCarrito(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    renderizarCarrito();
}

// Variable para almacenar el descuento activo
let porcentajeDescuento = 0;

function aplicarCupon() {
    const inputCupon = document.getElementById("cupon");
    if (!inputCupon) return;

    const codigo = inputCupon.value.trim().toUpperCase();

    if (codigo === "FELICES50") {
        porcentajeDescuento = 0.10; // 10% descuento de por vida[cite: 2]
        alert("¡Cupón FELICES50 aplicado! 10% de descuento.");
    } else if (codigo === "MAYOR50") {
        porcentajeDescuento = 0.50; // 50% descuento mayores de 50 años[cite: 2]
        alert("¡Descuento Senior aplicado! 50% de descuento.");
    } else {
        porcentajeDescuento = 0;
        alert("Cupón no válido.");
    }
    renderizarCarrito();
}

function renderizarCarrito() {
    const tablaBody = document.getElementById("lista-carrito");
    const subtotalElem = document.getElementById("resumen-subtotal");
    const descuentoElem = document.getElementById("resumen-descuento");
    const totalElem = document.getElementById("resumen-total");

    if (!tablaBody) return;

    const carrito = obtenerCarrito();
    tablaBody.innerHTML = "";

    if (carrito.length === 0) {
        tablaBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">El carrito está vacío.</td></tr>`;
        if (subtotalElem) subtotalElem.textContent = "$0 CLP";
        if (descuentoElem) descuentoElem.textContent = "$0 CLP";
        if (totalElem) totalElem.textContent = "$0 CLP";
        return;
    }

    let subtotalGeneral = 0;

    carrito.forEach((item, index) => {
        const subtotalItem = item.precio * item.cantidad;
        subtotalGeneral += subtotalItem;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.personalizacion}</td>
            <td>$${item.precio.toLocaleString('es-CL')} CLP</td>
            <td>
                <input type="number" min="1" value="${item.cantidad}" 
                       onchange="modificarCantidad(${index}, this.value)">
            </td>
            <td>$${subtotalItem.toLocaleString('es-CL')} CLP</td>
            <td>
                <button type="button" onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });

    const montoDescuento = subtotalGeneral * porcentajeDescuento;
    const totalPagar = subtotalGeneral - montoDescuento;

    if (subtotalElem) subtotalElem.textContent = `$${subtotalGeneral.toLocaleString('es-CL')} CLP`;
    if (descuentoElem) descuentoElem.textContent = `-$${montoDescuento.toLocaleString('es-CL')} CLP`;
    if (totalElem) totalElem.textContent = `$${totalPagar.toLocaleString('es-CL')} CLP`;
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();

    const botonCupon = document.querySelector("#cupon ~ button");
    if (botonCupon) {
        botonCupon.addEventListener("click", aplicarCupon);
    }
});