import Link from 'next/link';

const PLANS = [
  {
    name:'Pay-as-you-go', price:'$0.10', period:'/number', desc:'Perfect for occasional use. Only pay when you need a number.',
    features:['From $0.10 per activation','90+ selectable countries','Dozens of configured services','Eligible expiry refunds','Dashboard access'],
    popular:true,
  },
  {
    name:'API Access', price:'Free', period:'included', desc:'Every account includes full REST API access at no extra cost.',
    features:['X-API-Key authentication','Buy & poll endpoints','Programmatic OTP','60 requests per minute','No extra API fee'],
    popular:false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding:'96px 0', background:'var(--slate-50)' }}>
      <div className="wrap">
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <div className="section-tag" style={{ display:'inline-flex' }}>Pricing</div>
          <h2 className="section-h2">Simple, transparent pricing</h2>
          <p className="section-lead" style={{ margin:'0 auto' }}>No subscription. Pay only for one-time activations you request.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
          {PLANS.map(p => (
            <div key={p.name} style={{
              background: p.popular ? 'linear-gradient(145deg,var(--primary-600),var(--primary-800))' : '#fff',
              border: p.popular ? 'none' : '1.5px solid var(--slate-100)',
              borderRadius:24, padding:36, position:'relative',
              boxShadow: p.popular ? '0 24px 64px rgba(147,51,234,0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
              transform: p.popular ? 'scale(1.03)' : 'none',
            }}>
              {p.popular && (
                <div style={{ position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)', background:'#fff', color:'var(--primary-700)', padding:'5px 20px', borderRadius:20, fontSize:12, fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase', boxShadow:'0 4px 12px rgba(147,51,234,0.2)' }}>
                  Most popular
                </div>
              )}
              <div style={{ marginBottom:8, fontSize:14, fontWeight:700, color: p.popular?'rgba(255,255,255,0.7)':'var(--slate-400)', letterSpacing:'.05em', textTransform:'uppercase' }}>{p.name}</div>
              <div style={{ display:'flex', alignItems:'baseline', gap:4, marginBottom:8 }}>
                <span className="font-display" style={{ fontSize:48, fontWeight:700, color: p.popular?'#fff':'var(--slate-900)', lineHeight:1 }}>{p.price}</span>
                <span style={{ fontSize:15, color: p.popular?'rgba(255,255,255,0.6)':'var(--slate-400)', fontWeight:500 }}>{p.period}</span>
              </div>
              <p style={{ fontSize:14, color: p.popular?'rgba(255,255,255,0.7)':'var(--slate-500)', lineHeight:1.6, marginBottom:28 }}>{p.desc}</p>

              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:32 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:18, height:18, borderRadius:'50%', background: p.popular?'rgba(255,255,255,0.2)':'var(--primary-100)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke={p.popular?'#fff':'var(--primary-700)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize:14, color: p.popular?'rgba(255,255,255,0.85)':'var(--slate-600)' }}>{f}</span>
                  </div>
                ))}
              </div>

              <Link href="/dashboard" style={{ textDecoration:'none' }}>
                <button style={{ width:'100%', padding:'14px', borderRadius:14, fontWeight:700, fontSize:15, cursor:'pointer', border: p.popular?'none':'1.5px solid var(--primary-200)', background: p.popular?'#fff':'var(--primary-50)', color: p.popular?'var(--primary-700)':'var(--primary-700)', transition:'all .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; }}>
                  Get started →
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
