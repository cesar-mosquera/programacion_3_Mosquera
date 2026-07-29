import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authApi.login({ username, password });
      login(res.access_token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 56px - 4rem)' }}>
      <div style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', width: '100%', maxWidth: 400, boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <svg width="48" height="48" color="var(--primary)"><use href="/icons.svg#box" /></svg>
          <h1 style={{ margin: '0.75rem 0 0.25rem', fontSize: '1.5rem' }}>Iniciar Sesión</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Accede a tu panel de inventario</p>
        </div>
        {error && <p style={{ color: 'var(--danger)', fontSize: '0.875rem', textAlign: 'center', margin: '0 0 1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Usuario</label>
            <input value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', padding: '0.625rem 0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--input-bg)', color: 'var(--text-main)', fontSize: '0.875rem', outline: 'none' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.625rem 0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--input-bg)', color: 'var(--text-main)', fontSize: '0.875rem', outline: 'none' }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', border: 'none', borderRadius: 'var(--radius)', background: 'var(--primary)', color: '#fff', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          ¿No tienes cuenta? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
