export default function QRCode({ value, size = 128, color = '#1a1a1a', bg = '#ffffff' }) {
  // Simple deterministic pattern generator for demo/placeholder
  const generatePattern = (val) => {
    let hash = 0;
    for (let i = 0; i < val.length; i++) {
      hash = ((hash << 5) - hash) + val.charCodeAt(i);
      hash |= 0;
    }
    const bits = [];
    const seed = Math.abs(hash);
    for (let i = 0; i < 25; i++) {
      bits.push((seed >> i) & 1);
    }
    return bits;
  };

  const pattern = generatePattern(value);

  return (
    <div style={{
      padding: size * 0.1,
      background: bg,
      borderRadius: 16,
      border: '1.5px solid var(--slate-100)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 32px rgba(0,0,0,0.04)'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: size * 0.05,
        width: size,
        height: size
      }}>
        {pattern.map((bit, i) => (
          <div key={i} style={{
            background: bit ? color : 'transparent',
            borderRadius: size * 0.03,
            transition: 'all 0.3s ease',
            opacity: bit ? 1 : 0.05
          }} />
        ))}
      </div>
    </div>
  );
}
