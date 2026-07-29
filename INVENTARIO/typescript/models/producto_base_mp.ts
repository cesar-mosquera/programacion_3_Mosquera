abstract class ProductoBase {
    private _nombre: string;
    private _precio: number;
    private _cantidad: number;

    constructor(
        public readonly id: number,
        nombre: string,
        precio: number,
        cantidad: number
    ) {
        this._nombre = nombre;
        this._precio = precio;
        this._cantidad = cantidad;
    }

    get nombre(): string { return this._nombre; }
    set nombre(valor: string) {
        if (valor.trim().length < 2) {
            throw new Error("El nombre debe tener al menos 2 caracteres.");
        }
        this._nombre = valor.trim();
    }

    get precio(): number { return this._precio; }
    set precio(valor: number) {
        if (valor <= 0) {
            throw new Error("El precio debe ser mayor a 0.");
        }
        this._precio = valor;
    }

    get cantidad(): number { return this._cantidad; }
    set cantidad(valor: number) {
        if (valor < 0) {
            throw new Error("La cantidad no puede ser negativa.");
        }
        this._cantidad = valor;
    }

    public vender(cant: number): void {
        if (cant <= 0) throw new Error("La cantidad a vender debe ser mayor a 0.");
        if (cant > this._cantidad) throw new Error(`Stock insuficiente. Solo quedan ${this._cantidad} unidades de ${this._nombre}.`);
        this._cantidad -= cant;
    }

    public abastecer(cant: number): void {
        if (cant <= 0) throw new Error("La cantidad a abastecer debe ser mayor a 0.");
        this._cantidad += cant;
    }

    public calcularSubtotal(): number {
        return this._precio * this._cantidad;
    }

    abstract obtenerTipo(): string;
    abstract obtenerBadgeHtml(): string;
}

class ProductoFisico extends ProductoBase {
    constructor(id: number, nombre: string, precio: number, cantidad: number) {
        super(id, nombre, precio, cantidad);
    }

    obtenerTipo(): string {
        return "Físico";
    }

    obtenerBadgeHtml(): string {
        return `<span class="badge badge-fisico">Físico</span>`;
    }
}

class ProductoDigital extends ProductoBase {
    constructor(id: number, nombre: string, precio: number, cantidad: number) {
        super(id, nombre, precio, cantidad);
    }

    obtenerTipo(): string {
        return "Digital";
    }

    obtenerBadgeHtml(): string {
        return `<span class="badge badge-digital">Digital</span>`;
    }
}
