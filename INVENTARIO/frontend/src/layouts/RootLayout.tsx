import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { Watermark } from '../components/Watermark';

const navItems = [
  { path: '/', label: 'Inicio', icon: 'box' },
  { path: '/products', label: 'Productos', icon: 'package' },
  { path: '/transactions', label: 'Movimientos', icon: 'history' },
  { path: '/reports', label: 'Reportes', icon: 'chart' },
  { path: '/invoices', label: 'Facturas', icon: 'receipt' },
];

export function RootLayout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Watermark />
      <header
        style={{
          background: 'var(--header-bg)',
          color: '#fff',
          padding: '0 1.5rem',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#fff', fontWeight: 700, fontSize: '1.125rem' }}>
            <svg width="24" height="24"><use href="/icons.svg#box" /></svg>
            Inventario
          </Link>
          {isAuthenticated && (
            <nav style={{ display: 'flex', gap: '0.25rem' }}>
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                    padding: '0.375rem 0.75rem', borderRadius: 'var(--radius)',
                    textDecoration: 'none', color: location.pathname === item.path ? '#fff' : 'var(--text-light)',
                    background: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'none',
                    fontSize: '0.875rem', fontWeight: 500,
                    transition: 'background 0.15s',
                  }}
                >
                  <svg width="16" height="16"><use href={`/icons.svg#${item.icon}`} /></svg>
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ThemeToggle />
          {isAuthenticated && (
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius)', color: '#fff', cursor: 'pointer', padding: '0.375rem 0.75rem', fontSize: '0.8125rem' }}>
              <svg width="16" height="16"><use href="/icons.svg#logout" /></svg>
              Salir
            </button>
          )}
        </div>
      </header>
      <main style={{ flex: 1, padding: '2rem 1.5rem', maxWidth: 1200, width: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
