"use strict";
class ProductoBase {
    id;
    _nombre;
    _precio;
    _cantidad;
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this._nombre = nombre;
        this._precio = precio;
        this._cantidad = cantidad;
    }
    get nombre() { return this._nombre; }
    set nombre(valor) {
        if (valor.trim().length < 2) {
            throw new Error("El nombre debe tener al menos 2 caracteres.");
        }
        this._nombre = valor.trim();
    }
    get precio() { return this._precio; }
    set precio(valor) {
        if (valor <= 0) {
            throw new Error("El precio debe ser mayor a 0.");
        }
        this._precio = valor;
    }
    get cantidad() { return this._cantidad; }
    set cantidad(valor) {
        if (valor < 0) {
            throw new Error("La cantidad no puede ser negativa.");
        }
        this._cantidad = valor;
    }
    vender(cant) {
        if (cant <= 0)
            throw new Error("La cantidad a vender debe ser mayor a 0.");
        if (cant > this._cantidad)
            throw new Error(`Stock insuficiente. Solo quedan ${this._cantidad} unidades de ${this._nombre}.`);
        this._cantidad -= cant;
    }
    abastecer(cant) {
        if (cant <= 0)
            throw new Error("La cantidad a abastecer debe ser mayor a 0.");
        this._cantidad += cant;
    }
    calcularSubtotal() {
        return this._precio * this._cantidad;
    }
}
class ProductoFisico extends ProductoBase {
    constructor(id, nombre, precio, cantidad) {
        super(id, nombre, precio, cantidad);
    }
    obtenerTipo() {
        return "Físico";
    }
    obtenerBadgeHtml() {
        return `<span class="badge badge-fisico">Físico</span>`;
    }
}
class ProductoDigital extends ProductoBase {
    constructor(id, nombre, precio, cantidad) {
        super(id, nombre, precio, cantidad);
    }
    obtenerTipo() {
        return "Digital";
    }
    obtenerBadgeHtml() {
        return `<span class="badge badge-digital">Digital</span>`;
    }
}
