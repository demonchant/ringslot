// components/ServiceLogo.js
const BRAND_COLORS = {
  telegram:  '#229ED9',
  whatsapp:  '#25D366',
  google:    '#4285F4',
  facebook:  '#1877F2',
  instagram: '#E4405F',
  amazon:    '#FF9900',
  openai:    '#10A37F',
  apple:     '#000000',
  microsoft: '#00A4EF',
  uber:      '#000000',
  airbnb:    '#FF5A5F',
  discord:   '#5865F2',
  tinder:    '#FD3A73',
  twitter:   '#1DA1F2',
  steam:     '#171a21',
  netflix:   '#E50914',
  spotify:   '#1DB954',
  snapchat:  '#FFFC00',
  tiktok:    '#000000',
  reddit:    '#FF4500'
};

export default function ServiceLogo({ service, size = 32, inverse = false }) {
  const color = BRAND_COLORS[service] || 'var(--slate-200)';
  const glyph = service.charAt(0).toUpperCase();

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: size * 0.35,
      background: inverse ? 'rgba(255,255,255,0.15)' : `${color}${inverse ? '' : '15'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Glow */}
      {!inverse && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 30% 30%, #fff 0%, transparent 80%)`,
          opacity: 0.1
        }} />
      )}

      {/* Simplified SVG Placeholder or Initial */}
      <div style={{
        fontSize: size * 0.45,
        fontWeight: 900,
        fontFamily: 'Space Grotesk, sans-serif',
        color: inverse ? '#fff' : color,
        position: 'relative',
        zIndex: 1,
        letterSpacing: '-0.02em'
      }}>
        {glyph}
      </div>
    </div>
  );
}
