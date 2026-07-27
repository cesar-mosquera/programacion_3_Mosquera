import { useEffect, useState, useRef } from 'react';
import { productsApi } from '../api/products.api';
import type { Product } from '../types/product';
import { PageHeader } from '../components/PageHeader';
import { Spinner } from '../components/Spinner';

export function InvoicesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    productsApi.getAll()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handlePrint = () => window.print();

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><Spinner size={32} /></div>;

  const totalValue = products.reduce((sum, p) => sum + Number(p.price) * p.stock, 0);

  return (
    <div>
      <PageHeader title="Facturación / Reporte de Inventario" action={
        <button onClick={handlePrint} className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card-bg)', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.875rem' }}>
          <svg width="16" height="16"><use href="/icons.svg#receipt" /></svg>
          Imprimir / PDF
        </button>
      } />
      <div ref={printRef} style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid var(--border)' }}>
          <h2 style={{ margin: '0 0 0.25rem' }}>Reporte de Inventario</h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>{new Date().toLocaleDateString()}</p>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['#', 'Producto', 'Tipo', 'Precio', 'Stock', 'Subtotal'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '0.75rem 0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{i + 1}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 500 }}>{p.name}</td>
                <td style={{ padding: '0.75rem 0.5rem', textTransform: 'capitalize' }}>{p.type}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>${Number(p.price).toFixed(2)}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>{p.stock}</td>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>${(Number(p.price) * p.stock).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'right', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid var(--border)' }}>
          <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Total: ${totalValue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
