export function Watermark() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.03,
        transform: 'rotate(-30deg)',
        fontSize: '6rem',
        fontWeight: 900,
        color: 'var(--text-main)',
        textTransform: 'uppercase',
        letterSpacing: '0.5rem',
        userSelect: 'none',
      }}
    >
      Inventario
    </div>
  );
}
