import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormField({ label, error, id, ...inputProps }: Props) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor={id}
        style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-muted)' }}
      >
        {label}
      </label>
      <input
        id={id}
        style={{
          width: '100%',
          padding: '0.625rem 0.75rem',
          border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
          borderRadius: 'var(--radius)',
          background: 'var(--input-bg)',
          color: 'var(--text-main)',
          fontSize: '0.875rem',
          outline: 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--primary-glow)'; e.currentTarget.style.background = 'var(--input-bg-focus)'; }}
        onBlur={e => { e.currentTarget.style.borderColor = error ? 'var(--danger)' : 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'var(--input-bg)'; }}
        {...inputProps}
      />
      {error && <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'var(--danger)' }}>{error}</p>}
    </div>
  );
}
