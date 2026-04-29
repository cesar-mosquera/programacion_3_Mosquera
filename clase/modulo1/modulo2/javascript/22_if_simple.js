// ===== CONDICIONALES SIMPLES - IF =====


console.log("--- Ejemplo 1: Descuento por compra ---");
let monto = prompt("Ingresa el monto de la compra:");
monto = parseFloat(monto);

if (monto > 100) {
    console.log("¡Aplica descuento!");
}

console.log("--- Ejemplo 2: Control de velocidad ---");
let velocidad = prompt("Ingresa la velocidad del vehículo (km/h):");
velocidad = parseFloat(velocidad);

if (velocidad > 90) {
    console.log("¡Exceso de velocidad!");
}


console.log("--- Ejemplo 3: Control de asistencias ---");
let asistencias = prompt("Ingresa el número de asistencias del estudiante:");
asistencias = parseFloat(asistencias);

if (asistencias < 70) {
    console.log("¡Pierde la materia por faltas!");
}
