interface Transaccion {
    id: number;
    fecha: Date;
    accion: 'Registro' | 'Edición' | 'Venta' | 'Abastecimiento' | 'Eliminación';
    productoNombre: string;
    detalle: string;
}
