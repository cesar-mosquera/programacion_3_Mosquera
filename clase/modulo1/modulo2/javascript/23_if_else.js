const ingresoMensual = 800;
const deudaActual = 200;
const INGRESO_MINIMO = 600;
const RATIO_DEUDA_MAXIMO = 0.4; // la deuda no debe superar el 40% del ingreso

const ratioDeuda = deudaActual / ingresoMensual;

if (ingresoMensual >= INGRESO_MINIMO && ratioDeuda <= RATIO_DEUDA_MAXIMO) {
    console.log("Crédito aprobado.");
    console.log(`Ratio deuda/ingreso: ${(ratioDeuda * 100).toFixed(1)}%`);
} else {
    console.log("Crédito denegado.");
    console.log(`Ingreso mínimo requerido: $${INGRESO_MINIMO}`);
    console.log(`Ratio deuda actual: ${(ratioDeuda * 100).toFixed(1)}% (máximo permitido: 40%)`);
}

// Crédito aprobado.
// Ratio deuda/ingreso: 25.0%

const contrasenaIngresada = "Segura12";
const contrasenaCorrecta = "Segura123";
let intentosFallidos = 0;
const MAX_INTENTOS = 3;

if (contrasenaIngresada === contrasenaCorrecta) {
    console.log("Autenticación exitosa. Bienvenido.");
} else {
    intentosFallidos++;
    const intentosRestantes = MAX_INTENTOS - intentosFallidos;
    console.log(`Contraseña incorrecta. Intentos restantes: ${intentosRestantes}`);
    console.log(`Intentos fallidos: ${intentosFallidos}`);
}

// Autenticación exitosa. Bienvenido.






const cantidadProductos = 12; // Cambia este valor para probar

if (cantidadProductos >= 10) {
    console.log("Descuento aplicado");
} else {
    console.log("Sin descuento");
}

const contrasena = "1234"; // Cambia este valor para probar

if (contrasena === "1234") {
    console.log("Acceso permitido");
} else {
    console.log("Acceso denegado");
}

const hora = 14; // Cambia este valor para probar

if (hora < 12) {
    console.log("Buenos días");
} else {
    console.log("Buenas tardes/noches");
}
