interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export function ConfirmModal({ open, title, message, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar', onConfirm, onCancel, danger }: Props) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', animation: 'modalOverlayIn 0.2s ease' }}>
      <div onClick={onCancel} style={{ position: 'absolute', inset: 0, background: 'var(--overlay)' }} />
      <div style={{ position: 'relative', background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', padding: '2rem', maxWidth: 400, width: '100%', boxShadow: 'var(--shadow-lg)', animation: 'modalContentIn 0.2s ease' }}>
        <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.125rem' }}>{title}</h2>
        <p style={{ margin: '0 0 1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>{message}</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={{ padding: '0.5rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card-bg)', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.875rem' }}>
            {cancelLabel}
          </button>
          <button onClick={onConfirm} style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: 'var(--radius)', background: danger ? 'var(--danger)' : 'var(--primary)', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
