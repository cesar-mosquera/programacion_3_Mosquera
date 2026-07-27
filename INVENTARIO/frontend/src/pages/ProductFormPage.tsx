import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsApi } from '../api/products.api';
import { PageHeader } from '../components/PageHeader';
import { useToast } from '../components/Toast';

export function ProductFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({ name: '', price: '', stock: '', type: 'fisico' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      productsApi.getById(id).then(p => setForm({ name: p.name, price: String(p.price), stock: String(p.stock), type: p.type })).catch(() => navigate('/products'));
    }
  }, [id, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dto = { name: form.name, price: Number(form.price), stock: Number(form.stock), type: form.type as 'fisico' | 'digital' };
      if (isEdit) {
        await productsApi.update(id!, dto);
        toast.show('Producto actualizado', 'success');
      } else {
        await productsApi.create(dto);
        toast.show('Producto creado', 'success');
      }
      navigate('/products');
    } catch {
      toast.show('Error al guardar producto', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <PageHeader title={isEdit ? 'Editar Producto' : 'Nuevo Producto'} action={
        <button onClick={() => navigate('/products')} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card-bg)', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.875rem' }}>
          <svg width="16" height="16"><use href="/icons.svg#arrow-left" /></svg>
          Volver
        </button>
      } />
      <div style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Nombre</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ width: '100%', padding: '0.625rem 0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--input-bg)', color: 'var(--text-main)', fontSize: '0.875rem', outline: 'none' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Precio</label>
            <input type="number" step="0.01" min="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required style={{ width: '100%', padding: '0.625rem 0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--input-bg)', color: 'var(--text-main)', fontSize: '0.875rem', outline: 'none' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Stock</label>
            <input type="number" min="0" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} required style={{ width: '100%', padding: '0.625rem 0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--input-bg)', color: 'var(--text-main)', fontSize: '0.875rem', outline: 'none' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Tipo</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ width: '100%', padding: '0.625rem 0.75rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--input-bg)', color: 'var(--text-main)', fontSize: '0.875rem', outline: 'none' }}>
              <option value="fisico">Físico</option>
              <option value="digital">Digital</option>
            </select>
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', border: 'none', borderRadius: 'var(--radius)', background: 'var(--primary)', color: '#fff', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Guardando...' : isEdit ? 'Actualizar Producto' : 'Crear Producto'}
          </button>
        </form>
      </div>
    </div>
  );
}
