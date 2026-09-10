export default function VisualBanner() {
  return (
    <section style={{ padding:'80px 0', background:'linear-gradient(135deg,var(--primary-600) 0%,var(--primary-800) 100%)', overflow:'hidden', position:'relative' }}>
      <div style={{ position:'absolute', top:'-30%', right:'-5%', width:500, height:500, background:'rgba(255,255,255,0.06)', borderRadius:'50%', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-40%', left:'-5%', width:400, height:400, background:'rgba(255,255,255,0.04)', borderRadius:'50%', pointerEvents:'none' }} />

      <div className="wrap">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:32 }}>
          <div>
            <h2 className="font-display" style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:700, color:'#fff', marginBottom:12, letterSpacing:'-0.03em' }}>
              Pay with crypto.<br/>No banks required.
            </h2>
            <p style={{ fontSize:18, color:'rgba(255,255,255,0.7)', lineHeight:1.7 }}>
              Instant deposits. Full privacy. All major cryptocurrencies accepted.
            </p>
          </div>

          <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
            {[
              { s:'₮', n:'USDT', c:'#26a17b' },
              { s:'₿', n:'Bitcoin', c:'#f7931a' },
              { s:'Ξ', n:'Ethereum', c:'#627eea' },
              { s:'Ł', n:'Litecoin', c:'#bfbbbb' },
              { s:'BNB', n:'BNB', c:'#f0b90b' },
              { s:'◎', n:'Solana', c:'#9945ff' },
            ].map(c => (
              <div key={c.n} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 18px', background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:12 }}>
                <span style={{ fontSize:18, color:c.c, fontWeight:700 }}>{c.s}</span>
                <span style={{ fontSize:14, color:'rgba(255,255,255,0.9)', fontWeight:600 }}>{c.n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
