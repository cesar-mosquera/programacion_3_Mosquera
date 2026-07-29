import type { Transaction } from '../types/transaction';
import { Badge } from './Badge';

export function TransactionRow({ transaction }: { transaction: Transaction }) {
  const variant = transaction.action === 'sale' ? 'sale' : 'restock';
  return (
    <tr style={{ animation: 'fadeInRow 0.3s ease', verticalAlign: 'middle' }}>
      <td style={{ padding: '0.75rem 1rem' }}>{new Date(transaction.date).toLocaleString()}</td>
      <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{transaction.productName}</td>
      <td style={{ padding: '0.75rem 1rem' }}><Badge label={transaction.action} variant={variant} /></td>
      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>{transaction.detail}</td>
    </tr>
  );
}
