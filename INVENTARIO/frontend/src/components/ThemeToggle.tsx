import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      title={`Modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--text-light)',
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: 'var(--radius)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        fontSize: '0.875rem',
      }}
    >
      <svg width="18" height="18" aria-hidden="true">
        <use href={`/icons.svg#${theme === 'light' ? 'moon' : 'sun'}`} />
      </svg>
      {theme === 'light' ? 'Oscuro' : 'Claro'}
    </button>
  );
}
