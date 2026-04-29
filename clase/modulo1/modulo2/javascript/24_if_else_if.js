const temperatura = 50; // grados Celsius

if (temperatura >= 35) {
  console.log("🌡️ Calor extremo. Evitar actividad al aire libre.");
} else if (temperatura >= 25) {
  console.log("☀️ Temperatura cálida. Condiciones ideales para exteriores.");
} else if (temperatura >= 15) {
  console.log("🌤️ Temperatura agradable. Llevar una chaqueta ligera.");
} else if (temperatura >= 5) {
  console.log("🧥 Temperatura fría. Abrigarse bien.");
} else {
  console.log("❄️ Temperatura bajo cero. Riesgo de heladas.");
}
// ☀️ Temperatura cálida. Condiciones ideales para exteriores.


const pesoKg = 4.5;
const TARIFA_LIGERO   = 2.50;
const TARIFA_MEDIANO  = 5.00;
const TARIFA_PESADO   = 9.00;
const TARIFA_ESPECIAL = 15.00;

let costoEnvio;
let categoriaPeso;

if (pesoKg <= 1) {
  costoEnvio    = TARIFA_LIGERO;
  categoriaPeso = "Ligero";
} else if (pesoKg <= 5) {
  costoEnvio    = TARIFA_MEDIANO;
  categoriaPeso = "Mediano";
} else if (pesoKg <= 20) {
  costoEnvio    = TARIFA_PESADO;
  categoriaPeso = "Pesado";
} else {
  costoEnvio    = TARIFA_ESPECIAL;
  categoriaPeso = "Especial — requiere gestión manual";
}

console.log(`Paquete: ${pesoKg} kg`);
console.log(`Categoría: ${categoriaPeso}`);
console.log(`Costo de envío: $${costoEnvio.toFixed(2)}`);
// Paquete: 4.5 kg
// Categoría: Mediano
// Costo de envío: $5.00

const nota = 78; // sobre 100

let calificacion;
let aprobado;

if (nota >= 90) {
  calificacion = "A — Excelente";
  aprobado     = true;
} else if (nota >= 80) {
  calificacion = "B — Muy bueno";
  aprobado     = true;
} else if (nota >= 70) {
  calificacion = "C — Bueno";
  aprobado     = true;
} else if (nota >= 60) {
  calificacion = "D — Suficiente";
  aprobado     = true;
} else {
  calificacion = "F — Reprobado";
  aprobado     = false;
}

console.log(`Nota: ${nota}/100`);
console.log(`Calificación: ${calificacion}`);
console.log(`Estado: ${aprobado ? "Aprobado ✅" : "Reprobado ❌"}`);
// Nota: 78/100
// Calificación: C — Bueno
// Estado: Aprobado ✅

const prompt = require('prompt-sync')(); 

// 1. Ejemplo del Consumo de Energía
let consumo = prompt("Ingrese el consumo de energía (kWh): ");
consumo = Number(consumo); // Convertimos el texto a número

if (consumo <= 100) {
    console.log("Consumo bajo");
} else if (consumo <= 300) {
    console.log("Consumo medio");
} else {
    console.log("Consumo alto");
}

// 2. Ejemplo del Sueldo
let sueldo = prompt("Ingrese el sueldo del empleado: ");
sueldo = Number(sueldo);

if (sueldo < 500) {
    console.log("Sueldo básico");
} else if (sueldo >= 500 && sueldo <= 1000) {
    console.log("Sueldo medio");
} else {
    console.log("Sueldo alto");
}


// 3. Ejercicio del Día de la Semana
let dia = prompt("Ingrese el día de la semana (1-7): ");
dia = Number(dia);

if (dia >= 1 && dia <= 5) {
    console.log("Día laboral");
} else if (dia === 6) {
    console.log("Sábado");
} else if (dia === 7) {
    console.log("Domingo");
} else {
    console.log("Día inválido");
}

// 4. Ejemplo Compra con Descuento
let compra = prompt("Ingrese el monto de la compra: ");
compra = parseFloat(compra);
let miembro = prompt("Es miembro (sí/no): ");
if (compra > 50) {
    if (miembro === "sí") {
        console.log("Descuento especial para miembros");
    } else {
        console.log("Descuento normal");
    }
} else {
    console.log("No aplica descuento");
}

let edad = Number(prompt("Ingrese su edad: "));

if (edad < 18) {
    let estudia = prompt("¿Estudia? (si/no): ").toLowerCase();
    if (estudia === "si") {
        console.log("Estudiante activo");
    } else {
        console.log("Debe estar estudiando");
    }
} else {
    console.log("Adulto");
}
