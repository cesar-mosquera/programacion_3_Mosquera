import { useEffect, useState } from 'react';
import { productsApi } from '../api/products.api';
import type { Product } from '../types/product';
import { PageHeader } from '../components/PageHeader';
import { Spinner } from '../components/Spinner';

export function ReportsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi.getAll()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><Spinner size={32} /></div>;

  const fisicos = products.filter(p => p.type === 'fisico');
  const digitales = products.filter(p => p.type === 'digital');
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const totalValue = products.reduce((s, p) => s + Number(p.price) * p.stock, 0);
  const lowStock = products.filter(p => p.stock <= 5);
  const outOfStock = products.filter(p => p.stock === 0);

  const stats = [
    { label: 'Total Productos', value: products.length },
    { label: 'Físicos', value: fisicos.length },
    { label: 'Digitales', value: digitales.length },
    { label: 'Stock Total', value: totalStock },
    { label: 'Valor Total', value: `$${totalValue.toFixed(2)}` },
    { label: 'Stock Bajo (≤5)', value: lowStock.length, color: 'var(--danger)' },
    { label: 'Sin Stock', value: outOfStock.length, color: outOfStock.length > 0 ? 'var(--danger)' : undefined },
  ];

  const typeData = [
    { label: 'Físicos', count: fisicos.length, avgPrice: fisicos.length ? fisicos.reduce((s, p) => s + Number(p.price), 0) / fisicos.length : 0, totalStock: fisicos.reduce((s, p) => s + p.stock, 0) },
    { label: 'Digitales', count: digitales.length, avgPrice: digitales.length ? digitales.reduce((s, p) => s + Number(p.price), 0) / digitales.length : 0, totalStock: digitales.reduce((s, p) => s + p.stock, 0) },
  ];

  return (
    <div>
      <PageHeader title="Reportes y Estadísticas" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <p style={{ margin: '0 0 0.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase' }}>{s.label}</p>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: s.color || 'inherit' }}>{s.value}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {typeData.map(t => (
          <div key={t.label} style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem' }}>Productos {t.label}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.875rem' }}>
              <span>Cantidad: <strong>{t.count}</strong></span>
              <span>Stock total: <strong>{t.totalStock}</strong></span>
              <span>Precio promedio: <strong>${t.avgPrice.toFixed(2)}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
