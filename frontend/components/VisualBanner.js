import Link from 'next/link';

export default function VisualBanner() {
  return (
    <section style={{ padding: '40px 0' }}>
      <div className="wrap">
        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--slate-900)', borderRadius: 48, padding: '100px 60px' }}>
          {/* Animated Glows */}
          <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -150, left: -50, width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, textAlign: 'center', margin: '0 auto' }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#fff', marginBottom: 28 }}>
              Ready to secure your <span style={{ color: 'var(--primary-400)' }}>digital boundary?</span>
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 40, fontWeight: 500 }}>
              Join 250,000+ privacy-conscious users who trust RingSlot for their instant verification needs. Start today with as little as $5.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <button className="btn-purple" style={{ padding: '18px 48px' }}>Launch Dashboard</button>
              </Link>
              <Link href="/#pricing" style={{ textDecoration: 'none' }}>
                <button className="btn-outline" style={{ border: '2px solid rgba(255,255,255,0.1)', color: '#fff', padding: '18px 48px' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Floating abstract elements */}
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: 2,
              height: 2,
              background: '#fff',
              opacity: 0.1,
              boxShadow: '0 0 10px #fff'
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
