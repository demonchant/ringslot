const STEPS = [
  { n:'01', icon:'👤', title:'Create account', desc:'Sign up free in 30 seconds. Email only, no credit card required.' },
  { n:'02', icon:'💰', title:'Deposit crypto', desc:'Fund with USDT, BTC, ETH, LTC and more. Minimum $20.' },
  { n:'03', icon:'📱', title:'Pick your number', desc:'Select a service and country. A one-time activation number is issued when inventory is available.' },
  { n:'04', icon:'✅', title:'Receive OTP', desc:'Code appears on your dashboard in seconds. Auto-refund if it fails.' },
];

export default function HowItWorks() {
  return (
    <section style={{ padding:'96px 0', background:'var(--slate-50)' }}>
      <div className="wrap">
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <div className="section-tag" style={{ display:'inline-flex' }}>How it works</div>
          <h2 className="section-h2" style={{ marginBottom:16 }}>Four steps to your OTP</h2>
          <p className="section-lead" style={{ margin:'0 auto' }}>Get your verification code in under 60 seconds</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:4, position:'relative' }}>
          {/* Connecting line */}
          <div className="hide-mobile" style={{ position:'absolute', top:52, left:'12.5%', right:'12.5%', height:1, background:'linear-gradient(90deg,transparent,var(--primary-200),var(--primary-200),transparent)', zIndex:0 }} />

          {STEPS.map(({ n, icon, title, desc }, i) => (
            <div key={n} style={{ background:'#fff', border:'1px solid var(--slate-100)', borderRadius:20, padding:32, textAlign:'center', position:'relative', zIndex:1, boxShadow:'0 2px 8px rgba(0,0,0,0.04)', transition:'box-shadow .2s, transform .2s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow='0 12px 40px rgba(147,51,234,0.1)'; e.currentTarget.style.transform='translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform='none'; }}>
              {/* Step circle */}
              <div style={{ width:56, height:56, borderRadius:'50%', background:'var(--primary-600)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', boxShadow:'0 8px 24px rgba(147,51,234,0.35)' }}>
                <span style={{ fontSize:22 }}>{icon}</span>
              </div>
              <div style={{ fontSize:10, fontWeight:700, color:'var(--primary-400)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10 }}>{n}</div>
              <h3 className="font-display" style={{ fontSize:18, fontWeight:700, color:'var(--slate-900)', marginBottom:10 }}>{title}</h3>
              <p style={{ fontSize:14, color:'var(--slate-500)', lineHeight:1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
