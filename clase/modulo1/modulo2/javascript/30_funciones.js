//funcion declarada
function saludo() {
    console.log("Hello World");
}   

saludo();

//funcion expresada
const saludarHola = function() {
    console.log("Hola con funcion expresada");
}

saludarHola();
//funcion flecha
const saludoFlecha = () => {
    console.log("Hello con funcion flecha");
}

//funcion anónima
setTimeout(function() {
    console.log("Ejecutando ...");
}, 1000);

//funcion con parametros 

function saludarconparametros(nombre) {
    console.log ("Hola " +nombre)
}
saludarconparametros("Pedro");

function sumar(a,b) {
    return a + b;
}
const resultado = sumar(45,5);
console.log(resultado);

const espar = (n) => n % 2 == 0;
console.log(espar(4));

// area de un triangulo y colocar por defecto 

const areaTriangulo = (base = 2, altura = 4) => (base * altura) / 2;
console.log(areaTriangulo(10, 5));
console.log(areaTriangulo(20));

