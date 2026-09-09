const productos = [
    {
        codigo: "TC001",
        categoria: "Tortas Cuadradas",
        forma: "cuadrada",
        nombre: "Torta Cuadrada de Chocolate",
        precio: 45000,
        descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales."
    },
    {
        codigo: "TC002",
        categoria: "Tortas Cuadradas",
        forma: "cuadrada",
        nombre: "Torta Cuadrada de Frutas",
        precio: 50000,
        descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones."
    },
    {
        codigo: "TT001",
        categoria: "Tortas Circulares",
        forma: "circular",
        nombre: "Torta Circular de Vainilla",
        precio: 40000,
        descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión."
    },
    {
        codigo: "TT002",
        categoria: "Tortas Circulares",
        forma: "circular",
        nombre: "Torta Circular de Manjar",
        precio: 42000,
        descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos."
    },
    {
        codigo: "PI001",
        categoria: "Postres Individuales",
        forma: "otro",
        nombre: "Mousse de Chocolate",
        precio: 5000,
        descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate."
    },
    {
        codigo: "PI002",
        categoria: "Postres Individuales",
        forma: "otro",
        nombre: "Tiramisú Clásico",
        precio: 5500,
        descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida."
    },
    {
        codigo: "PSA001",
        categoria: "Productos Sin Azúcar",
        forma: "circular",
        nombre: "Torta Sin Azúcar de Naranja",
        precio: 48000,
        descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables."
    },
    {
        codigo: "PSA002",
        categoria: "Productos Sin Azúcar",
        forma: "circular",
        nombre: "Cheesecake Sin Azúcar",
        precio: 47000,
        descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa."
    },
    {
        codigo: "PT001",
        categoria: "Pastelería Tradicional",
        forma: "otro",
        nombre: "Empanada de Manzana",
        precio: 3000,
        descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda."
    },
    {
        codigo: "PT002",
        categoria: "Pastelería Tradicional",
        forma: "circular",
        nombre: "Tarta de Santiago",
        precio: 6000,
        descripcion: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos."
    },
    {
        codigo: "PG001",
        categoria: "Productos Sin Gluten",
        forma: "cuadrada",
        nombre: "Brownie Sin Gluten",
        precio: 4000,
        descripcion: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor."
    },
    {
        codigo: "PG002",
        categoria: "Productos Sin Gluten",
        forma: "otro",
        nombre: "Pan Sin Gluten",
        precio: 3500,
        descripcion: "Suave y esponjoso, ideal para sandwiches o para acompañar cualquier comida."
    },
    {
        codigo: "PV001",
        categoria: "Productos Vegana",
        forma: "circular",
        nombre: "Torta Vegana de Chocolate",
        precio: 50000,
        descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos."
    },
    {
        codigo: "PV002",
        categoria: "Productos Vegana",
        forma: "otro",
        nombre: "Galletas Veganas de Avena",
        precio: 4500,
        descripcion: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano."
    },
    {
        codigo: "TE001",
        categoria: "Tortas Especiales",
        forma: "cuadrada",
        nombre: "Torta Especial de Cumpleaños",
        precio: 55000,
        descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos."
    },
    {
        codigo: "TE002",
        categoria: "Tortas Especiales",
        forma: "circular",
        nombre: "Torta Especial de Boda",
        precio: 60000,
        descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda."
    }
];

const contenedor = document.getElementById("contenedor-productos");
const inputBuscar = document.getElementById("buscar");
const selectCategoria = document.getElementById("categoria");
const selectForma = document.getElementById("forma");

function mostrarProductos(lista) {
    if (!contenedor) return;
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron productos con esos filtros.</p>";
        return;
    }

    lista.forEach(prod => {
        const tarjeta = document.createElement("article");
        tarjeta.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p><strong>Código:</strong> ${prod.codigo}</p>
            <p><strong>Categoría:</strong> ${prod.categoria}</p>
            <p><strong>Precio:</strong> $${prod.precio.toLocaleString('es-CL')} CLP</p>
            <p>${prod.descripcion}</p>
            <a href="detalle-producto.html?codigo=${prod.codigo}">Ver Detalles</a>
            <button type="button" onclick="agregarAlCarrito('${prod.codigo}')">Añadir al Carrito</button>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// 4. Función de filtrado dinámico
function filtrarProductos() {
    const texto = inputBuscar.value.toLowerCase().trim();
    const cat = selectCategoria.value.toLowerCase();
    const forma = selectForma.value.toLowerCase();

    const filtrados = productos.filter(prod => {
        const coincideNombre = prod.nombre.toLowerCase().includes(texto);
        const coincideCategoria = cat === "" || prod.categoria.toLowerCase().includes(cat);
        const coincideForma = forma === "" || prod.forma === forma;

        return coincideNombre && coincideCategoria && coincideForma;
    });

    mostrarProductos(filtrados);
}

// 5. Event Listeners para búsqueda en vivo
if (inputBuscar) inputBuscar.addEventListener("input", filtrarProductos);
if (selectCategoria) selectCategoria.addEventListener("change", filtrarProductos);
if (selectForma) selectForma.addEventListener("change", filtrarProductos);

// Carga inicial al abrir la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(productos);
});