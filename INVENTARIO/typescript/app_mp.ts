// ConfiguraciÃ³n inicial de TypeScript
const sistema: string = "Inventario Pro";
console.log(\ cargado con TypeScript.);

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
}

class GestorInventario {
    private productos: Producto[] = [];
    private nextId: number = 1;

    public agregar(nombre: string, precio: number, stock: number): void {
        const nuevo: Producto = { id: this.nextId++, nombre, precio, stock };
        this.productos.push(nuevo);
        console.log(Producto \ agregado correctamente.);
    }

    public obtenerProductos(): Producto[] {
        return this.productos;
    }
}

const gestor = new GestorInventario();
