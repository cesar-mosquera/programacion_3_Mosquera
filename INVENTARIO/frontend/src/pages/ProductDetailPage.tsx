import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsApi } from '../api/products.api';
import { transactionsApi } from '../api/transactions.api';
import type { Product } from '../types/product';
import type { Transaction } from '../types/transaction';
import { Badge } from '../components/Badge';
import { TransactionRow } from '../components/TransactionRow';
import { PageHeader } from '../components/PageHeader';
import { Spinner } from '../components/Spinner';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([productsApi.getById(id), transactionsApi.getByProduct(id)])
      .then(([p, t]) => { setProduct(p); setTransactions(t); })
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><Spinner size={32} /></div>;
  if (!product) return null;

  return (
    <div>
      <PageHeader title={product.name} action={
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => navigate(`/products/${id}/edit`)} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card-bg)', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.875rem' }}>
            <svg width="16" height="16"><use href="/icons.svg#edit" /></svg>
            Editar
          </button>
          <button onClick={() => navigate('/products')} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card-bg)', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.875rem' }}>
            <svg width="16" height="16"><use href="/icons.svg#arrow-left" /></svg>
            Volver
          </button>
        </div>
      } />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Tipo', value: <Badge label={product.type} variant={product.type} /> },
          { label: 'Precio', value: `$${Number(product.price).toFixed(2)}` },
          { label: 'Stock', value: <span style={{ color: product.stock > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>{product.stock}</span> },
          { label: 'Creado', value: new Date(product.createdAt).toLocaleDateString() },
        ].map(info => (
          <div key={info.label} style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
            <p style={{ margin: '0 0 0.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase' }}>{info.label}</p>
            <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{info.value}</p>
          </div>
        ))}
      </div>
      <h2 style={{ margin: '0 0 1rem', fontSize: '1.125rem' }}>Movimientos</h2>
      <div style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Fecha', 'Producto', 'Acción', 'Detalle'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => <TransactionRow key={t.id} transaction={t} />)}
          </tbody>
        </table>
        {transactions.length === 0 && <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Sin movimientos</p>}
      </div>
    </div>
  );
}
