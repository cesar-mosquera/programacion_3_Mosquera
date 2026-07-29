import { useEffect, useState } from 'react';
import { transactionsApi } from '../api/transactions.api';
import type { Transaction } from '../types/transaction';
import { PageHeader } from '../components/PageHeader';
import { TransactionRow } from '../components/TransactionRow';
import { Spinner } from '../components/Spinner';

export function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    transactionsApi.getAll()
      .then(setTransactions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><Spinner size={32} /></div>;

  return (
    <div>
      <PageHeader title="Historial de Movimientos" />
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
        {transactions.length === 0 && <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No hay movimientos registrados</p>}
      </div>
    </div>
  );
}
