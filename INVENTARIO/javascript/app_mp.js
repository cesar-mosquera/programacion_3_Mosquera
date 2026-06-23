// Inicializacion de variables
let inventario = [];
console.log("Sistema de Inventario Inicializado");

function validarProducto(nombre, precio, cantidad) {
    if (!nombre || nombre.trim() === "") {
        console.error("El nombre es requerido.");
        return false;
    } else if (precio <= 0) {
        console.error("El precio debe ser mayor a 0.");
        return false;
    } else if (cantidad < 0) {
        console.error("La cantidad no puede ser negativa.");
        return false;
    }
    return true;
}

function calcularTotalInventario() {
    let total = 0;
    for (let i = 0; i < inventario.length; i++) {
        total += inventario[i].precio * inventario[i].cantidad;
    }
    console.log("Total del inventario: $" + total);
    return total;
}
