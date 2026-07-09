class GestorInventario {
    private productos: ProductoBase[] = [];
    private historial: Transaccion[] = [];
    private nextId: number = 1;
    private nextHistId: number = 1;

    public agregarProducto(producto: ProductoBase): void {
        this.productos.push(producto);
        this.registrarMovimiento('Registro', producto.nombre, `Stock inicial: ${producto.cantidad} unidades a $${producto.precio}`);
        this.actualizarUI();
    }

    public obtenerProductoPorId(id: number): ProductoBase | undefined {
        return this.productos.find(p => p.id === id);
    }

    public eliminarProducto(id: number): void {
        const prod = this.obtenerProductoPorId(id);
        if (prod) {
            this.productos = this.productos.filter(p => p.id !== id);
            this.registrarMovimiento('Eliminación', prod.nombre, `Producto eliminado del sistema (Stock restante: ${prod.cantidad})`);
            this.actualizarUI();
        }
    }

    public obtenerTotal(): number {
        return this.productos.reduce((acc, prod) => acc + prod.calcularSubtotal(), 0);
    }

    public generarNuevoId(): number {
        return this.nextId++;
    }

    public registrarMovimiento(accion: Transaccion['accion'], productoNombre: string, detalle: string) {
        this.historial.unshift({
            id: this.nextHistId++,
            fecha: new Date(),
            accion,
            productoNombre,
            detalle
        });
    }

    public actualizarUI(): void {
        this.renderizarDOM();
        this.actualizarSelector();
        this.renderizarHistorial();
    }

    private renderizarDOM(): void {
        const tbody = document.getElementById('tabla-body');
        const totalEl = document.getElementById('total-inventario');
        
        if (tbody && totalEl) {
            if (this.productos.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Sin productos registrados en el sistema.</td></tr>`;
                totalEl.innerText = `$0.00`;
                return;
            }

            tbody.innerHTML = ''; 
            
            this.productos.forEach(prod => {
                const tr = document.createElement('tr');
                
                if (prod.cantidad === 0) {
                    tr.className = 'fila-agotado';
                } else {
                    tr.className = 'nueva-fila';
                }
                
                const stockBadge = prod.cantidad === 0 
                    ? `<span class="badge badge-agotado">Agotado</span>` 
                    : prod.cantidad.toString();

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

    private actualizarSelector(): void {
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

    private renderizarHistorial(): void {
        const tbody = document.getElementById('tabla-historial');
        if (tbody) {
            if (this.historial.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No hay actividad registrada.</td></tr>`;
                return;
            }

            tbody.innerHTML = '';
            
            this.historial.forEach(tx => {
                const tr = document.createElement('tr');
                tr.className = 'nueva-fila';
                
                const horaStr = tx.fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second:'2-digit' });
                
                let badgeClass = '';
                switch(tx.accion) {
                    case 'Registro': badgeClass = 'registro'; break;
                    case 'Edición': badgeClass = 'edicion'; break;
                    case 'Venta': badgeClass = 'venta'; break;
                    case 'Abastecimiento': badgeClass = 'abastecimiento'; break;
                    case 'Eliminación': badgeClass = 'eliminacion'; break;
                }

                tr.innerHTML = `
                    <td>${horaStr}</td>
                    <td><span class="badge badge-historial ${badgeClass}">${tx.accion}</span></td>
                    <td><strong>${tx.productoNombre}</strong></td>
                    <td>${tx.detalle}</td>
                `;
                tbody.appendChild(tr);
            });
        }
    }
}
