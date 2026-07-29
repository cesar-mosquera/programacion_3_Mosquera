"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const gestor = new GestorInventario();
    const fechaEl = document.getElementById('fecha-actual');
    if (fechaEl) {
        fechaEl.innerText = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    const modalRegistro = document.getElementById('modal-registro');
    const modalMovimientos = document.getElementById('modal-movimientos');
    const modalEditar = document.getElementById('modal-editar');
    const modalHistorial = document.getElementById('modal-historial');
    const modales = [modalRegistro, modalMovimientos, modalEditar, modalHistorial];
    const btnAbrirRegistro = document.getElementById('btn-abrir-registro');
    const btnAbrirMovimientos = document.getElementById('btn-abrir-movimientos');
    const btnAbrirHistorial = document.getElementById('btn-abrir-historial');
    const btnCerrarRegistro = document.getElementById('btn-cerrar-registro');
    const btnCerrarMovimientos = document.getElementById('btn-cerrar-movimientos');
    const btnCerrarEditar = document.getElementById('btn-cerrar-editar');
    const btnCerrarHistorial = document.getElementById('btn-cerrar-historial');
    function abrirModal(modal) {
        modal.classList.remove('oculto');
        setTimeout(() => modal.classList.add('activo'), 10);
    }
    function cerrarModal(modal) {
        modal.classList.remove('activo');
        setTimeout(() => {
            modal.classList.add('oculto');
            const form = modal.querySelector('form');
            if (form)
                form.reset();
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
            if (e.target === modal)
                cerrarModal(modal);
        });
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modales.forEach(modal => {
                if (modal.classList.contains('activo'))
                    cerrarModal(modal);
            });
        }
    });
    const tbody = document.getElementById('tabla-body');
    tbody.addEventListener('click', (e) => {
        const target = e.target;
        const btn = target.closest('.btn-icon');
        if (btn) {
            const id = parseInt(btn.getAttribute('data-id') || '0');
            if (btn.classList.contains('icon-delete')) {
                if (confirm("¿Estás seguro de eliminar este producto?")) {
                    gestor.eliminarProducto(id);
                }
            }
            else if (btn.classList.contains('icon-edit')) {
                const prod = gestor.obtenerProductoPorId(id);
                if (prod) {
                    document.getElementById('edit-id').value = prod.id.toString();
                    document.getElementById('edit-nombre').value = prod.nombre;
                    document.getElementById('edit-precio').value = prod.precio.toString();
                    abrirModal(modalEditar);
                }
            }
        }
    });
    const formRegistro = document.getElementById('form-producto');
    const formEditar = document.getElementById('form-editar');
    const msjRegistro = document.getElementById('form-mensaje');
    const msjEditar = document.getElementById('edit-mensaje');
    const selectProd = document.getElementById('producto-select');
    const inputCantMov = document.getElementById('cantidad-mov');
    const btnVender = document.getElementById('btn-vender');
    const btnAbastecer = document.getElementById('btn-abastecer');
    const msjMov = document.getElementById('movimiento-mensaje');
    function mostrarMensaje(div, mensaje, tipo) {
        div.className = `mensaje-alerta mensaje-${tipo}`;
        div.innerText = mensaje;
        setTimeout(() => { div.className = 'mensaje-alerta oculto'; }, 3500);
    }
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const nombre = document.getElementById('nombre').value;
            const precio = parseFloat(document.getElementById('precio').value);
            const cantidad = parseInt(document.getElementById('cantidad').value);
            const tipo = document.getElementById('tipo').value;
            const id = gestor.generarNuevoId();
            let nuevoProducto;
            if (tipo === 'fisico') {
                nuevoProducto = new ProductoFisico(id, nombre, precio, cantidad);
            }
            else {
                nuevoProducto = new ProductoDigital(id, nombre, precio, cantidad);
            }
            nuevoProducto.nombre = nombre;
            nuevoProducto.precio = precio;
            nuevoProducto.cantidad = cantidad;
            gestor.agregarProducto(nuevoProducto);
            cerrarModal(modalRegistro);
        }
        catch (error) {
            mostrarMensaje(msjRegistro, error.message, 'error');
        }
    });
    formEditar.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const id = parseInt(document.getElementById('edit-id').value);
            const nombreViejo = document.getElementById('edit-nombre').value;
            const precioNuevo = parseFloat(document.getElementById('edit-precio').value);
            const prod = gestor.obtenerProductoPorId(id);
            if (!prod)
                throw new Error("Producto no encontrado.");
            const nombreAnterior = prod.nombre;
            const precioAnterior = prod.precio;
            prod.nombre = nombreViejo;
            prod.precio = precioNuevo;
            gestor.registrarMovimiento('Edición', prod.nombre, `Actualizado de "${nombreAnterior}" a "${prod.nombre}", Precio: $${precioAnterior} -> $${prod.precio}`);
            gestor.actualizarUI();
            cerrarModal(modalEditar);
        }
        catch (error) {
            mostrarMensaje(msjEditar, error.message, 'error');
        }
    });
    btnVender.addEventListener('click', () => {
        try {
            const id = parseInt(selectProd.value);
            const cant = parseInt(inputCantMov.value);
            if (isNaN(id))
                throw new Error("Por favor selecciona un producto.");
            if (isNaN(cant) || cant <= 0)
                throw new Error("Ingresa una cantidad válida a vender.");
            const prod = gestor.obtenerProductoPorId(id);
            if (!prod)
                throw new Error("Producto no encontrado.");
            prod.vender(cant);
            gestor.registrarMovimiento('Venta', prod.nombre, `Salida de ${cant} unidades (Nuevo stock: ${prod.cantidad})`);
            gestor.actualizarUI();
            inputCantMov.value = '';
            cerrarModal(modalMovimientos);
        }
        catch (error) {
            mostrarMensaje(msjMov, error.message, 'error');
        }
    });
    btnAbastecer.addEventListener('click', () => {
        try {
            const id = parseInt(selectProd.value);
            const cant = parseInt(inputCantMov.value);
            if (isNaN(id))
                throw new Error("Por favor selecciona un producto.");
            if (isNaN(cant) || cant <= 0)
                throw new Error("Ingresa una cantidad válida a abastecer.");
            const prod = gestor.obtenerProductoPorId(id);
            if (!prod)
                throw new Error("Producto no encontrado.");
            prod.abastecer(cant);
            gestor.registrarMovimiento('Abastecimiento', prod.nombre, `Ingreso de ${cant} unidades (Nuevo stock: ${prod.cantidad})`);
            gestor.actualizarUI();
            inputCantMov.value = '';
            cerrarModal(modalMovimientos);
        }
        catch (error) {
            mostrarMensaje(msjMov, error.message, 'error');
        }
    });
});
