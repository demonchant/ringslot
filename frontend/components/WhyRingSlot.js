const FEATURES = [
  { icon:'⚡', title:'Live routing', desc:'RingSlot checks enabled provider integrations for available inventory when you request an activation.' },
  { icon:'🔒', title:'Crypto payments', desc:'Fund your wallet using currencies currently offered by the payment processor.', highlight: true },
  { icon:'↩️', title:'Auto-refund', desc:'No OTP in 10 minutes? Full automatic refund to your wallet. No ticket needed, no questions asked.' },
  { icon:'🌐', title:'90+ countries', desc:'Choose from the USA, UK, Germany, India, Nigeria, Brazil and many more configured locations.' },
  { icon:'🔌', title:'REST API', desc:'Full API access with X-API-Key auth. Automate purchases and OTP polling programmatically.' },
  { icon:'🛡️', title:'Responsible support', desc:'Contact support by web form or email, with clear order and refund policies.' },
];

export default function WhyRingSlot() {
  return (
    <section style={{ padding:'96px 0', background:'#fff' }}>
      <div className="wrap">
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <div className="section-tag" style={{ display:'inline-flex' }}>Why RingSlot</div>
          <h2 className="section-h2">Everything you need</h2>
          <p className="section-lead" style={{ margin:'0 auto' }}>No hidden fees. No subscriptions. Just what works.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16 }}>
          {FEATURES.map(({ icon, title, desc, highlight }) => (
            <div key={title} style={{
              background: highlight ? 'linear-gradient(135deg,var(--primary-600),var(--primary-800))' : '#fafafa',
              border: highlight ? 'none' : '1.5px solid var(--slate-100)',
              borderRadius:20, padding:32, transition:'transform .2s, box-shadow .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(147,51,234,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
              <div style={{ fontSize:32, marginBottom:16 }}>{icon}</div>
              <h3 className="font-display" style={{ fontSize:18, fontWeight:700, marginBottom:10, color: highlight?'#fff':'var(--slate-900)' }}>{title}</h3>
              <p style={{ fontSize:14, lineHeight:1.7, color: highlight?'rgba(255,255,255,0.8)':'var(--slate-500)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
