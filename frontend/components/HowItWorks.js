const STEPS = [
  { 
    n: '01', 
    title: 'Choose Service', 
    desc: 'Select from 200+ global platforms including Telegram, WhatsApp, and Amazon.',
    icon: '🎯'
  },
  { 
    n: '02', 
    title: 'Select Country', 
    desc: 'Pick a region or specific area code. We offer numbers from 170+ countries.',
    icon: '🌍'
  },
  { 
    n: '03', 
    title: 'Instant Delivery', 
    desc: 'Receive your number immediately. Our system is built for speed and uptime.',
    icon: '⚡'
  },
  { 
    n: '04', 
    title: 'Get Verified', 
    desc: 'Receive your SMS code in real-time. Transparent pricing, no hidden fees.',
    icon: '✅'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '120px 0', background: '#fff' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <div className="section-tag">The Process</div>
          <h2 className="section-h2">Getting started is simple</h2>
          <p className="section-lead" style={{ margin: '0 auto' }}>Four small steps to your new secure identity.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32, position: 'relative' }}>
          {/* Connector line for desktop */}
          <div style={{ position: 'absolute', top: '24%', left: '10%', right: '10%', height: 2, background: 'linear-gradient(90deg, transparent 0%, var(--primary-100) 20%, var(--primary-100) 80%, transparent 100%)', zIndex: 0, display: 'none', lg: 'block' }} />

          {STEPS.map((s, i) => (
            <div key={s.n} style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{ width: 84, height: 84, borderRadius: 28, background: '#fff', border: '2px solid var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 28px', boxShadow: '0 12px 32px rgba(0,0,0,0.03)', transition: 'all .3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-300)'; e.currentTarget.style.transform = 'translateY(-8px) rotate(4deg)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(147,51,234,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--slate-100)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.03)'; }}>
                {s.icon}
                <div style={{ position: 'absolute', top: -14, right: -14, width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-600)', color: '#fff', fontSize: 13, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #fff' }}>
                  {s.n}
                </div>
              </div>
              <h3 className="font-display" style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, color: 'var(--slate-900)' }}>{s.title}</h3>
              <p style={{ fontSize: 15, color: 'var(--slate-500)', lineHeight: 1.6, padding: '0 20px' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
