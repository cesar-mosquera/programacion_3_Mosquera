import type { Product } from '../types/product';
import { Badge } from './Badge';

interface Props {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onSell: () => void;
  onRestock: () => void;
}

export function ProductRow({ product, onEdit, onDelete, onSell, onRestock }: Props) {
  return (
    <tr style={{ animation: 'fadeInRow 0.3s ease', verticalAlign: 'middle' }}>
      <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{product.name}</td>
      <td style={{ padding: '0.75rem 1rem' }}><Badge label={product.type} variant={product.type} /></td>
      <td style={{ padding: '0.75rem 1rem' }}>${Number(product.price).toFixed(2)}</td>
      <td style={{ padding: '0.75rem 1rem' }}>
        <span style={{ color: product.stock > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
          {product.stock}
        </span>
      </td>
      <td style={{ padding: '0.75rem 1rem' }}>
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          <IconBtn icon="edit" onClick={onEdit} title="Editar" />
          <IconBtn icon="trash" onClick={onDelete} title="Eliminar" color="var(--danger)" />
          <IconBtn icon="dollar" onClick={onSell} title="Vender" color="var(--success)" />
          <IconBtn icon="plus" onClick={onRestock} title="Abastecer" color="var(--primary)" />
        </div>
      </td>
    </tr>
  );
}

function IconBtn({ icon, onClick, title, color }: { icon: string; onClick: () => void; title: string; color?: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        cursor: 'pointer',
        padding: '0.375rem',
        display: 'flex',
        color: color || 'var(--text-muted)',
        transition: 'color 0.15s, background 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--input-bg)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
    >
      <svg width="16" height="16"><use href={`/icons.svg#${icon}`} /></svg>
    </button>
  );
}
