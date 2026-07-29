document.addEventListener("DOMContentLoaded", () => {
    const gestor = new GestorInventario();
    
    const fechaEl = document.getElementById('fecha-actual');
    if (fechaEl) {
        fechaEl.innerText = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    const modalRegistro = document.getElementById('modal-registro') as HTMLDivElement;
    const modalMovimientos = document.getElementById('modal-movimientos') as HTMLDivElement;
    const modalEditar = document.getElementById('modal-editar') as HTMLDivElement;
    const modalHistorial = document.getElementById('modal-historial') as HTMLDivElement;
    
    const modales = [modalRegistro, modalMovimientos, modalEditar, modalHistorial];

    const btnAbrirRegistro = document.getElementById('btn-abrir-registro') as HTMLButtonElement;
    const btnAbrirMovimientos = document.getElementById('btn-abrir-movimientos') as HTMLButtonElement;
    const btnAbrirHistorial = document.getElementById('btn-abrir-historial') as HTMLButtonElement;
    
    const btnCerrarRegistro = document.getElementById('btn-cerrar-registro') as HTMLButtonElement;
    const btnCerrarMovimientos = document.getElementById('btn-cerrar-movimientos') as HTMLButtonElement;
    const btnCerrarEditar = document.getElementById('btn-cerrar-editar') as HTMLButtonElement;
    const btnCerrarHistorial = document.getElementById('btn-cerrar-historial') as HTMLButtonElement;

    function abrirModal(modal: HTMLDivElement) {
        modal.classList.remove('oculto');
        setTimeout(() => modal.classList.add('activo'), 10);
    }

    function cerrarModal(modal: HTMLDivElement) {
        modal.classList.remove('activo');
        setTimeout(() => {
            modal.classList.add('oculto');
            const form = modal.querySelector('form') as HTMLFormElement;
            if (form) form.reset();
        }, 300);
    }

    btnAbrirRegistro.addEventListener('click', () => abrirModal(modalRegistro));
    btnAbrirMovimientos.addEventListener('click', () => abrirModal(modalMovimientos));
    btnAbrirHistorial.addEventListener('click', () => abrirModal(modalHistorial));
    
    btnCerrarRegistro.addEventListener('click', () => cerrarModal(modalRegistro));
    btnCerrarMovimientos.addEventListener('click', () => cerrarModal(modalMovimientos));
    btnCerrarEditar.addEventListener('click', () => cerrarModal(modalEditar));
    btnCerrarHistorial.addEventListener('click', () => cerrarModal(modalHistorial));

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

            nuevoProducto.nombre = nombre;
            nuevoProducto.precio = precio;
            nuevoProducto.cantidad = cantidad;

            gestor.agregarProducto(nuevoProducto);
            cerrarModal(modalRegistro);

        } catch (error: any) {
            mostrarMensaje(msjRegistro, error.message, 'error');
        }
    });

    formEditar.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        try {
            const id = parseInt((document.getElementById('edit-id') as HTMLInputElement).value);
            const nombreViejo = (document.getElementById('edit-nombre') as HTMLInputElement).value;
            const precioNuevo = parseFloat((document.getElementById('edit-precio') as HTMLInputElement).value);

            const prod = gestor.obtenerProductoPorId(id);
            if (!prod) throw new Error("Producto no encontrado.");

            const nombreAnterior = prod.nombre;
            const precioAnterior = prod.precio;

            prod.nombre = nombreViejo;
            prod.precio = precioNuevo;

            gestor.registrarMovimiento('Edición', prod.nombre, `Actualizado de "${nombreAnterior}" a "${prod.nombre}", Precio: $${precioAnterior} -> $${prod.precio}`);
            gestor.actualizarUI();
            
            cerrarModal(modalEditar);

        } catch (error: any) {
            mostrarMensaje(msjEditar, error.message, 'error');
        }
    });

    btnVender.addEventListener('click', () => {
        try {
            const id = parseInt(selectProd.value);
            const cant = parseInt(inputCantMov.value);
            
            if (isNaN(id)) throw new Error("Por favor selecciona un producto.");
            if (isNaN(cant) || cant <= 0) throw new Error("Ingresa una cantidad válida a vender.");

            const prod = gestor.obtenerProductoPorId(id);
            if (!prod) throw new Error("Producto no encontrado.");

            prod.vender(cant);
            gestor.registrarMovimiento('Venta', prod.nombre, `Salida de ${cant} unidades (Nuevo stock: ${prod.cantidad})`);
            gestor.actualizarUI();
            
            inputCantMov.value = '';
            cerrarModal(modalMovimientos);
            
        } catch (error: any) {
            mostrarMensaje(msjMov, error.message, 'error');
        }
    });

    btnAbastecer.addEventListener('click', () => {
        try {
            const id = parseInt(selectProd.value);
            const cant = parseInt(inputCantMov.value);
            
            if (isNaN(id)) throw new Error("Por favor selecciona un producto.");
            if (isNaN(cant) || cant <= 0) throw new Error("Ingresa una cantidad válida a abastecer.");

            const prod = gestor.obtenerProductoPorId(id);
            if (!prod) throw new Error("Producto no encontrado.");

            prod.abastecer(cant);
            gestor.registrarMovimiento('Abastecimiento', prod.nombre, `Ingreso de ${cant} unidades (Nuevo stock: ${prod.cantidad})`);
            gestor.actualizarUI();
            
            inputCantMov.value = '';
            cerrarModal(modalMovimientos);
            
        } catch (error: any) {
            mostrarMensaje(msjMov, error.message, 'error');
        }
    });
});
