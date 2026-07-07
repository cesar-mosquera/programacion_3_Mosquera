// Polimorfismo: Clase Abstracta Base
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

    // Encapsulamiento con getters y setters (validaciones estrictas)
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

    // --- LOGICA DE NEGOCIO ---
    public vender(cant: number): void {
        if (cant <= 0) throw new Error("La cantidad a vender debe ser mayor a 0.");
        if (cant > this._cantidad) throw new Error(`Stock insuficiente. Solo quedan ${this._cantidad} unidades de ${this._nombre}.`);
        this._cantidad -= cant;
    }

    public abastecer(cant: number): void {
        if (cant <= 0) throw new Error("La cantidad a abastecer debe ser mayor a 0.");
        this._cantidad += cant;
    }

    // Método que calcula el subtotal
    public calcularSubtotal(): number {
        return this._precio * this._cantidad;
    }

    // Método abstracto obligatorio para las hijas
    abstract obtenerTipo(): string;
    abstract obtenerBadgeHtml(): string;
}

// Herencia: Clases Hijas
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

// Clase Gestora de Inventario
class GestorInventario {
    private productos: ProductoBase[] = [];
    private nextId: number = 1;

    public agregarProducto(producto: ProductoBase): void {
        this.productos.push(producto);
        this.renderizarDOM();
        this.actualizarSelector();
    }

    public obtenerProductoPorId(id: number): ProductoBase | undefined {
        return this.productos.find(p => p.id === id);
    }

    public eliminarProducto(id: number): void {
        this.productos = this.productos.filter(p => p.id !== id);
        this.renderizarDOM();
        this.actualizarSelector();
    }

    public obtenerTotal(): number {
        return this.productos.reduce((acc, prod) => acc + prod.calcularSubtotal(), 0);
    }

    public generarNuevoId(): number {
        return this.nextId++;
    }

    public renderizarDOM(): void {
        const tbody = document.getElementById('tabla-body');
        const totalEl = document.getElementById('total-inventario');
        
        if (tbody && totalEl) {
            if (this.productos.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Sin productos registrados en el sistema.</td></tr>`;
                totalEl.innerText = `$0.00`;
                return;
            }

            tbody.innerHTML = ''; // Limpiar tabla
            
            this.productos.forEach(prod => {
                const tr = document.createElement('tr');
                
                if (prod.cantidad === 0) {
                    tr.className = 'fila-agotado';
                } else {
                    tr.className = 'nueva-fila';
                }
                
                const stockBadge = prod.cantidad === 0 
                    ? `<span class="badge badge-agotado">Agotado</span>` 
                    : prod.cantidad;

                tr.innerHTML = `
                    <td>#${prod.id.toString().padStart(3, '0')}</td>
                    <td><strong>${prod.nombre}</strong></td>
                    <td>${prod.obtenerBadgeHtml()}</td>
                    <td>$${prod.precio.toFixed(2)}</td>
                    <td>${stockBadge}</td>
                    <td><strong>$${prod.calcularSubtotal().toFixed(2)}</strong></td>
                    <td class="acciones-td">
                        <button class="btn-icon icon-edit" data-id="${prod.id}" title="Editar">✏️</button>
                        <button class="btn-icon icon-delete" data-id="${prod.id}" title="Eliminar">🗑️</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            
            totalEl.innerText = `$${this.obtenerTotal().toFixed(2)}`;
        }
    }

    public actualizarSelector(): void {
        const selector = document.getElementById('producto-select') as HTMLSelectElement;
        if (selector) {
            const currentVal = selector.value;
            selector.innerHTML = '<option value="" disabled selected>-- Elige un producto --</option>';
            this.productos.forEach(prod => {
                const option = document.createElement('option');
                option.value = prod.id.toString();
                option.textContent = `${prod.nombre} (Stock: ${prod.cantidad})`;
                selector.appendChild(option);
            });
            if (currentVal) selector.value = currentVal;
        }
    }
}

// Interactividad con el DOM
document.addEventListener("DOMContentLoaded", () => {
    const gestor = new GestorInventario();
    
    // Configurar Fecha
    const fechaEl = document.getElementById('fecha-actual');
    if (fechaEl) {
        fechaEl.innerText = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    // Manejo de Modales
    const modalRegistro = document.getElementById('modal-registro') as HTMLDivElement;
    const modalMovimientos = document.getElementById('modal-movimientos') as HTMLDivElement;
    const modalEditar = document.getElementById('modal-editar') as HTMLDivElement;
    
    const modales = [modalRegistro, modalMovimientos, modalEditar];

    const btnAbrirRegistro = document.getElementById('btn-abrir-registro') as HTMLButtonElement;
    const btnAbrirMovimientos = document.getElementById('btn-abrir-movimientos') as HTMLButtonElement;
    
    const btnCerrarRegistro = document.getElementById('btn-cerrar-registro') as HTMLButtonElement;
    const btnCerrarMovimientos = document.getElementById('btn-cerrar-movimientos') as HTMLButtonElement;
    const btnCerrarEditar = document.getElementById('btn-cerrar-editar') as HTMLButtonElement;

    function abrirModal(modal: HTMLDivElement) {
        modal.classList.remove('oculto');
        setTimeout(() => modal.classList.add('activo'), 10);
    }

    function cerrarModal(modal: HTMLDivElement) {
        modal.classList.remove('activo');
        setTimeout(() => {
            modal.classList.add('oculto');
            // Limpiar formulario correspondiente
            const form = modal.querySelector('form') as HTMLFormElement;
            if (form) form.reset();
        }, 300);
    }

    btnAbrirRegistro.addEventListener('click', () => abrirModal(modalRegistro));
    btnAbrirMovimientos.addEventListener('click', () => abrirModal(modalMovimientos));
    
    btnCerrarRegistro.addEventListener('click', () => cerrarModal(modalRegistro));
    btnCerrarMovimientos.addEventListener('click', () => cerrarModal(modalMovimientos));
    btnCerrarEditar.addEventListener('click', () => cerrarModal(modalEditar));

    // Cerrar al hacer clic fuera o con ESC
    window.addEventListener('click', (e) => {
        modales.forEach(modal => {
            if (e.target === modal) cerrarModal(modal);
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modales.forEach(modal => {
                if (modal.classList.contains('activo')) cerrarModal(modal);
            });
        }
    });

    // Delegación de Eventos para la Tabla (Editar / Eliminar)
    const tbody = document.getElementById('tabla-body') as HTMLTableSectionElement;
    tbody.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        const btn = target.closest('.btn-icon') as HTMLButtonElement;
        
        if (btn) {
            const id = parseInt(btn.getAttribute('data-id') || '0');
            
            if (btn.classList.contains('icon-delete')) {
                if(confirm("¿Estás seguro de eliminar este producto?")) {
                    gestor.eliminarProducto(id);
                }
            } 
            else if (btn.classList.contains('icon-edit')) {
                const prod = gestor.obtenerProductoPorId(id);
                if (prod) {
                    (document.getElementById('edit-id') as HTMLInputElement).value = prod.id.toString();
                    (document.getElementById('edit-nombre') as HTMLInputElement).value = prod.nombre;
                    (document.getElementById('edit-precio') as HTMLInputElement).value = prod.precio.toString();
                    abrirModal(modalEditar);
                }
            }
        }
    });

    // Elementos de Formularios
    const formRegistro = document.getElementById('form-producto') as HTMLFormElement;
    const formEditar = document.getElementById('form-editar') as HTMLFormElement;
    const msjRegistro = document.getElementById('form-mensaje') as HTMLDivElement;
    const msjEditar = document.getElementById('edit-mensaje') as HTMLDivElement;

    const selectProd = document.getElementById('producto-select') as HTMLSelectElement;
    const inputCantMov = document.getElementById('cantidad-mov') as HTMLInputElement;
    const btnVender = document.getElementById('btn-vender') as HTMLButtonElement;
    const btnAbastecer = document.getElementById('btn-abastecer') as HTMLButtonElement;
    const msjMov = document.getElementById('movimiento-mensaje') as HTMLDivElement;

    function mostrarMensaje(div: HTMLDivElement, mensaje: string, tipo: 'exito' | 'error') {
        div.className = `mensaje-alerta mensaje-${tipo}`;
        div.innerText = mensaje;
        setTimeout(() => { div.className = 'mensaje-alerta oculto'; }, 3500);
    }

    // 1. REGISTRAR PRODUCTO
    formRegistro.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        try {
            const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
            const precio = parseFloat((document.getElementById('precio') as HTMLInputElement).value);
            const cantidad = parseInt((document.getElementById('cantidad') as HTMLInputElement).value);
            const tipo = (document.getElementById('tipo') as HTMLSelectElement).value;

            const id = gestor.generarNuevoId();
            let nuevoProducto: ProductoBase;

            if (tipo === 'fisico') {
                nuevoProducto = new ProductoFisico(id, nombre, precio, cantidad);
            } else {
                nuevoProducto = new ProductoDigital(id, nombre, precio, cantidad);
            }

            // Setters disparan validación
            nuevoProducto.nombre = nombre;
            nuevoProducto.precio = precio;
            nuevoProducto.cantidad = cantidad;

            gestor.agregarProducto(nuevoProducto);
            
            // Cerrar modal automáticamente con éxito
            cerrarModal(modalRegistro);

        } catch (error: any) {
            mostrarMensaje(msjRegistro, error.message, 'error');
        }
    });

    // 2. EDITAR PRODUCTO
    formEditar.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        try {
            const id = parseInt((document.getElementById('edit-id') as HTMLInputElement).value);
            const nombre = (document.getElementById('edit-nombre') as HTMLInputElement).value;
            const precio = parseFloat((document.getElementById('edit-precio') as HTMLInputElement).value);

            const prod = gestor.obtenerProductoPorId(id);
            if (!prod) throw new Error("Producto no encontrado.");

            // Setters disparan validación de negocio
            prod.nombre = nombre;
            prod.precio = precio;

            gestor.renderizarDOM();
            gestor.actualizarSelector();
            
            cerrarModal(modalEditar);

        } catch (error: any) {
            mostrarMensaje(msjEditar, error.message, 'error');
        }
    });

    // 3. LÓGICA DE NEGOCIO: VENDER
    btnVender.addEventListener('click', () => {
        try {
            const id = parseInt(selectProd.value);
            const cant = parseInt(inputCantMov.value);
            
            if (isNaN(id)) throw new Error("Por favor selecciona un producto.");
            if (isNaN(cant) || cant <= 0) throw new Error("Ingresa una cantidad válida a vender.");

            const prod = gestor.obtenerProductoPorId(id);
            if (!prod) throw new Error("Producto no encontrado.");

            prod.vender(cant); // REGLA DE NEGOCIO (Lanza error si vende > stock)
            gestor.renderizarDOM();
            gestor.actualizarSelector();
            
            cerrarModal(modalMovimientos);
            
        } catch (error: any) {
            mostrarMensaje(msjMov, error.message, 'error');
        }
    });

    // 4. LÓGICA DE NEGOCIO: ABASTECER
    btnAbastecer.addEventListener('click', () => {
        try {
            const id = parseInt(selectProd.value);
            const cant = parseInt(inputCantMov.value);
            
            if (isNaN(id)) throw new Error("Por favor selecciona un producto.");
            if (isNaN(cant) || cant <= 0) throw new Error("Ingresa una cantidad válida a abastecer.");

            const prod = gestor.obtenerProductoPorId(id);
            if (!prod) throw new Error("Producto no encontrado.");

            prod.abastecer(cant); // REGLA DE NEGOCIO
            gestor.renderizarDOM();
            gestor.actualizarSelector();
            
            cerrarModal(modalMovimientos);
            
        } catch (error: any) {
            mostrarMensaje(msjMov, error.message, 'error');
        }
    });
});
