import { LogoIcon } from './LogoIcon';

const REASONS = [
  { 
    title: 'Privacy First', 
    desc: 'We never store your personal data. Your verification history is encrypted and temporary.',
    icon: '🛡️',
    color: '#34d399'
  },
  { 
    title: 'Extreme Speed', 
    desc: 'Our direct-carrier relationships ensure sub-second delivery for verification codes.',
    icon: '⚡',
    color: '#fbbf24'
  },
  { 
    title: 'Global Reach', 
    desc: 'Over 170 countries and 200 services supported out of the box. No regional limits.',
    icon: '🌍',
    color: '#60a5fa'
  },
  { 
    title: '24/7 Availability', 
    desc: 'Redundant systems across 4 regions ensure 99.9% uptime for your critical activations.',
    icon: '🏢',
    color: '#a78bfa'
  }
];

export default function WhyRingSlot() {
  return (
    <section style={{ padding: '120px 0', background: 'var(--slate-50)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="section-tag">Elite Advantages</div>
            <h2 className="section-h2">Why thousands choose RingSlot daily</h2>
            <p className="section-lead" style={{ marginBottom: 40 }}>Built for developers, businesses, and privacy advocates who demand the highest reliability in number activations.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {REASONS.map(r => (
                <div key={r.title} style={{ display: 'flex', gap: 24 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: '#fff', border: '1.5px solid var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
                    {r.icon}
                  </div>
                  <div>
                    <h3 className="font-display" style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: 'var(--slate-900)' }}>{r.title}</h3>
                    <p style={{ fontSize: 15, color: 'var(--slate-500)', lineHeight: 1.6 }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 500, background: 'radial-gradient(circle, var(--primary-100) 0%, transparent 70%)', opacity: 0.5, zIndex: 0 }} />
            <div className="card" style={{ position: 'relative', zIndex: 1, padding: 60, textAlign: 'center', border: 'none', background: '#fff', boxShadow: '0 40px 100px rgba(147,51,234,0.08)' }}>
              <div style={{ width: 100, height: 100, borderRadius: 32, background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 40px' }}>
                <LogoIcon size={64} color="#9333ea" />
              </div>
              <div style={{ fontSize: 44, fontWeight: 900, color: 'var(--slate-900)', letterSpacing: '-0.04em', marginBottom: 12 }}>99.9%</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary-600)', textTransform: 'uppercase', letterSpacing: '.15em', marginBottom: 40 }}>Guaranteed Uptime</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                  <div key={i} style={{ height: 4, borderRadius: 2, background: i < 8 ? 'var(--success)' : 'var(--slate-200)', opacity: i < 8 ? 1 : 0.3 }} />
                ))}
              </div>
              <div style={{ marginTop: 12, fontSize: 11, fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase' }}>Last 30 Days Signal Health</div>
            </div>

            {/* Floaties */}
            <div style={{ position: 'absolute', top: -40, right: 20, background: '#fff', padding: '12px 20px', borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.08)', zIndex: 2, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
              <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--slate-900)' }}>Live API Response: 42ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
