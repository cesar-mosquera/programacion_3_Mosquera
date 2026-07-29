import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 56px - 4rem)', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', margin: '0 0 0.5rem', color: 'var(--primary)' }}>404</h1>
      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', margin: '0 0 2rem' }}>Página no encontrada</p>
      <Link to="/" style={{ padding: '0.625rem 1.25rem', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--radius)', textDecoration: 'none', fontWeight: 600 }}>
        Volver al inicio
      </Link>
    </div>
  );
}
