import type { CSSProperties } from 'react';

const variants: Record<string, CSSProperties> = {
  fisico: { background: '#dbeafe', color: '#1d4ed8' },
  digital: { background: '#f3e8ff', color: '#7c3aed' },
  sale: { background: '#fce7f3', color: '#be123c' },
  restock: { background: '#d1fae5', color: '#065f46' },
  default: { background: 'var(--border)', color: 'var(--text-muted)' },
};

export function Badge({ label, variant = 'default' }: { label: string; variant?: string }) {
  const style = variants[variant] || variants.default;
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 999,
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'capitalize',
        ...style,
      }}
    >
      {label}
    </span>
  );
}
