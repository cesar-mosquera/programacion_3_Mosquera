import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsApi } from '../api/products.api';
import type { Product } from '../types/product';

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi.getAll().then(setProducts).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const totalValue = products.reduce((sum, p) => sum + Number(p.price) * p.stock, 0);
  const lowStock = products.filter(p => p.stock <= 5);

  const cards = [
    { label: 'Productos', value: products.length, icon: 'package', color: 'var(--primary)' },
    { label: 'Valor Total', value: `$${totalValue.toFixed(2)}`, icon: 'dollar', color: 'var(--success)' },
    { label: 'Stock Bajo', value: lowStock.length, icon: 'alert', color: 'var(--danger)' },
    { label: 'Tipos', value: [...new Set(products.map(p => p.type))].join(', '), icon: 'box', color: 'var(--accent2)' },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ margin: '0 0 1.5rem', fontSize: '1.5rem', fontWeight: 700 }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {cards.map(card => (
          <div key={card.label} style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <svg width="24" height="24" color={card.color}><use href={`/icons.svg#${card.icon}`} /></svg>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{card.label}</span>
            </div>
            <p style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>{card.value}</p>
          </div>
        ))}
      </div>
      {lowStock.length > 0 && (
        <div style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1.125rem', color: 'var(--danger)' }}>Productos con stock bajo</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {lowStock.map(p => (
              <Link key={p.id} to={`/products/${p.id}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius)', background: 'var(--input-bg)', textDecoration: 'none', color: 'inherit', fontSize: '0.875rem' }}>
                <span>{p.name}</span>
                <span style={{ fontWeight: 600, color: p.stock === 0 ? 'var(--danger)' : 'var(--text-muted)' }}>{p.stock} unidades</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
