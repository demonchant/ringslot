import Link from 'next/link';

const ENDPOINTS = [
  { method:'GET',  path:'/api/services',      desc:'List all services with pricing' },
  { method:'POST', path:'/api/orders/buy',     desc:'Purchase a number — body: {service, country}' },
  { method:'GET',  path:'/api/orders/sms',     desc:'Poll for OTP — ?id=orderId' },
  { method:'POST', path:'/api/orders/cancel',  desc:'Cancel & refund — body: {id}' },
  { method:'POST', path:'/api/orders/rent',    desc:'Rent a number — body: {service, country, duration}' },
  { method:'GET',  path:'/api/wallet/balance', desc:'Get current balance' },
];

const METHOD_COLOR = { GET:'#3b82f6', POST:'#22c55e', DELETE:'#ef4444', PUT:'#f59e0b' };

export default function ApiDocs() {
  return (
    <section id="api" style={{ padding:'96px 0', background:'var(--slate-900)', color:'#fff', overflow:'hidden', position:'relative' }}>
      <div style={{ position:'absolute', top:0, right:0, width:400, height:400, background:'radial-gradient(circle,rgba(147,51,234,0.15) 0%,transparent 70%)', pointerEvents:'none' }} />

      <div className="wrap" style={{ position:'relative', zIndex:1 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:64, alignItems:'start' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', background:'rgba(147,51,234,0.15)', border:'1px solid rgba(147,51,234,0.3)', borderRadius:24, fontSize:12, fontWeight:700, color:'#c084fc', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:16 }}>
              REST API
            </div>
            <h2 className="font-display" style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:700, letterSpacing:'-0.03em', marginBottom:16, lineHeight:1.15 }}>
              Automate with our API
            </h2>
            <p style={{ fontSize:17, color:'rgba(255,255,255,0.6)', lineHeight:1.75, marginBottom:32 }}>
              Full REST API access included with every account. X-API-Key authentication. Automate number purchasing and OTP polling.
            </p>

            {/* Code sample */}
            <div style={{ background:'rgba(0,0,0,0.4)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:24, marginBottom:28 }}>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginBottom:16, fontWeight:600, letterSpacing:'.05em' }}>EXAMPLE REQUEST</div>
              <pre style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, lineHeight:1.8, color:'rgba(255,255,255,0.8)', overflow:'auto' }}>{`curl https://ringslot-backend.onrender.com/api/orders/buy \\
  -H "X-API-Key: rs_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"service":"telegram","country":"any"}'`}</pre>
            </div>

            <Link href="/api-docs"><button className="btn-purple">View full API docs →</button></Link>
          </div>

          <div>
            <div style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.3)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:16 }}>Endpoints</div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {ENDPOINTS.map(({ method, path, desc }) => (
                <div key={path} style={{ display:'flex', alignItems:'flex-start', gap:12, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'14px 16px' }}>
                  <span style={{ fontSize:11, fontWeight:800, color: METHOD_COLOR[method]||'#fff', background:`${METHOD_COLOR[method]}15`, padding:'3px 8px', borderRadius:6, fontFamily:'JetBrains Mono,monospace', flexShrink:0 }}>{method}</span>
                  <div>
                    <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, color:'rgba(255,255,255,0.85)', marginBottom:3 }}>{path}</div>
                    <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
