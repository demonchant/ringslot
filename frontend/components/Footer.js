import Link from 'next/link';

function PurpleLogo({ size = 30 }) {
  const inner = size - Math.round(size * 0.3);
  return (
    <div style={{ width:size, height:size, borderRadius:Math.round(size*0.26), background:'linear-gradient(145deg,#7c5cf6,#5b3de8)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <svg width={inner} height={inner} viewBox="0 0 20 20" fill="none">
        <rect x="1" y="1" width="8" height="8" rx="2" fill="white"/>
        <rect x="11" y="1" width="8" height="8" rx="2" fill="white"/>
        <rect x="1" y="11" width="8" height="8" rx="2" fill="white"/>
        <rect x="11" y="11" width="8" height="8" rx="2" fill="white" fillOpacity="0.38"/>
      </svg>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ background:'var(--slate-900)', color:'rgba(255,255,255,0.5)', padding:'64px 0 28px' }}>
      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:48, marginBottom:56 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <PurpleLogo size={32} />
              <span className="font-display" style={{ fontWeight:700, fontSize:18, color:'#fff', letterSpacing:'-0.02em' }}>RingSlot</span>
            </div>
            <p style={{ fontSize:14, lineHeight:1.75, maxWidth:200 }}>One-time virtual number activations. 90+ selectable countries, dozens of configured services, from $0.10.</p>
            <div style={{ marginTop:16, display:'flex', gap:8 }}>
              <a href="/llms.txt" style={{ fontSize:11, color:'rgba(147,51,234,0.7)', textDecoration:'none', padding:'3px 8px', border:'1px solid rgba(147,51,234,0.3)', borderRadius:6 }}>llms.txt</a>
              <a href="/sitemap.xml" style={{ fontSize:11, color:'rgba(147,51,234,0.7)', textDecoration:'none', padding:'3px 8px', border:'1px solid rgba(147,51,234,0.3)', borderRadius:6 }}>sitemap</a>
            </div>
          </div>

          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', marginBottom:16 }}>Product</div>
            {[['Virtual numbers','/virtual-phone-number'],['Pricing','/pricing'],['Dashboard','/dashboard'],['API Docs','/api-docs'],['Deposit','/deposit']].map(([l,h]) => (
              <Link key={h} href={h} style={{ display:'block', fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:10, textDecoration:'none' }}
                onMouseEnter={e=>e.target.style.color='var(--primary-400)'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.5)'}>{l}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', marginBottom:16 }}>Popular</div>
            {[['Telegram OTP','/service/telegram'],['WhatsApp Verify','/service/whatsapp'],['Google SMS','/service/google'],['Discord Code','/service/discord'],['Instagram Verify','/service/instagram']].map(([s, href]) => (
              <Link key={href} href={href} style={{ display:'block', fontSize:13, color:'rgba(255,255,255,0.35)', marginBottom:9, textDecoration:'none' }}
                onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.35)'}>{s}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', marginBottom:16 }}>Support</div>
            <a href="mailto:support@ringslot.shop" style={{ display:'block', fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:10, textDecoration:'none' }}>support@ringslot.shop</a>
            <Link href="/contact" style={{ display:'block', fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:10, textDecoration:'none' }}>Contact support</Link>
            <Link href="/status" style={{ display:'block', fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:10, textDecoration:'none' }}>System status</Link>
          </div>

          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', marginBottom:16 }}>Legal</div>
            {[['Terms','/terms'],['Privacy','/privacy'],['Acceptable use','/acceptable-use'],['Refund policy','/refund-policy'],['Security','/security']].map(([label, href]) => (
              <Link key={href} href={href} style={{ display:'block', fontSize:14, color:'rgba(255,255,255,0.5)', marginBottom:10, textDecoration:'none' }}>{label}</Link>
            ))}
          </div>
        </div>

        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:24, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12, alignItems:'center' }}>
          <span style={{ fontSize:13 }}>© 2026 RingSlot · ringslot.shop · All rights reserved</span>
          <span style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>Use responsibly and follow third-party platform rules.</span>
        </div>
      </div>
    </footer>
  );
}
