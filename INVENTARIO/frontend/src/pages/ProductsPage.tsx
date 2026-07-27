import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsApi } from '../api/products.api';
import type { Product } from '../types/product';
import { PageHeader } from '../components/PageHeader';
import { ProductRow } from '../components/ProductRow';
import { ConfirmModal } from '../components/ConfirmModal';
import { useToast } from '../components/Toast';
import { Spinner } from '../components/Spinner';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [sellTarget, setSellTarget] = useState<Product | null>(null);
  const [sellQty, setSellQty] = useState(1);
  const [restockTarget, setRestockTarget] = useState<Product | null>(null);
  const [restockQty, setRestockQty] = useState(1);
  const navigate = useNavigate();
  const toast = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productsApi.getAll();
      setProducts(data);
    } catch { toast.show('Error al cargar productos', 'error'); }
    finally { setLoading(false); }
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await productsApi.delete(deleteTarget.id);
      toast.show('Producto eliminado', 'success');
      setDeleteTarget(null);
      load();
    } catch { toast.show('Error al eliminar', 'error'); }
  };

  const handleSell = async () => {
    if (!sellTarget) return;
    try {
      await productsApi.sell(sellTarget.id, { quantity: sellQty });
      toast.show('Venta realizada', 'success');
      setSellTarget(null);
      setSellQty(1);
      load();
    } catch { toast.show('Error al vender', 'error'); }
  };

  const handleRestock = async () => {
    if (!restockTarget) return;
    try {
      await productsApi.restock(restockTarget.id, { quantity: restockQty });
      toast.show('Abastecimiento realizado', 'success');
      setRestockTarget(null);
      setRestockQty(1);
      load();
    } catch { toast.show('Error al abastecer', 'error'); }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><Spinner size={32} /></div>;

  return (
    <div>
      <PageHeader title="Productos" action={
        <button onClick={() => navigate('/products/new')} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', border: 'none', borderRadius: 'var(--radius)', background: 'var(--primary)', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>
          <svg width="16" height="16"><use href="/icons.svg#plus" /></svg>
          Nuevo Producto
        </button>
      } />
      <div style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Nombre', 'Tipo', 'Precio', 'Stock', 'Acciones'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <ProductRow
                key={p.id}
                product={p}
                onEdit={() => navigate(`/products/${p.id}/edit`)}
                onDelete={() => setDeleteTarget(p)}
                onSell={() => { setSellTarget(p); setSellQty(1); }}
                onRestock={() => { setRestockTarget(p); setRestockQty(1); }}
              />
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No hay productos registrados</p>}
      </div>
      <ConfirmModal open={!!deleteTarget} title="Eliminar Producto" message={`¿Eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer.`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} confirmLabel="Eliminar" danger />
      <ActionModal open={!!sellTarget} title="Vender" label="Cantidad a vender" value={sellQty} max={sellTarget?.stock || 1} onChange={setSellQty} onConfirm={handleSell} onCancel={() => setSellTarget(null)} confirmLabel="Vender" />
      <ActionModal open={!!restockTarget} title="Abastecer" label="Cantidad a agregar" value={restockQty} onChange={setRestockQty} onConfirm={handleRestock} onCancel={() => setRestockTarget(null)} confirmLabel="Abastecer" />
    </div>
  );
}

function ActionModal({ open, title, label, value, max, onChange, onConfirm, onCancel, confirmLabel }: {
  open: boolean; title: string; label: string; value: number; max?: number; onChange: (v: number) => void; onConfirm: () => void; onCancel: () => void; confirmLabel: string;
}) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', animation: 'modalOverlayIn 0.2s ease' }}>
      <div onClick={onCancel} style={{ position: 'absolute', inset: 0, background: 'var(--overlay)' }} />
      <div style={{ position: 'relative', background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', padding: '2rem', maxWidth: 350, width: '100%', boxShadow: 'var(--shadow-lg)', animation: 'modalContentIn 0.2s ease' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.125rem' }}>{title}</h2>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{label}</label>
        <input type="number" min={1} max={max} value={value} onChange={e => onChange(Number(e.target.value))} style={{ width: '100%', padding: '0.625rem 0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--input-bg)', color: 'var(--text-main)', fontSize: '0.875rem', outline: 'none', marginBottom: '1.5rem' }} />
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={{ padding: '0.5rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card-bg)', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.875rem' }}>Cancelar</button>
          <button onClick={onConfirm} style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: 'var(--radius)', background: 'var(--primary)', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
