import Link from 'next/link';
import { LogoIcon } from './LogoIcon';

export default function Footer() {
  const links = {
    Company: [
      { name: 'About', href: '#' },
      { name: 'Pricing', href: '/dashboard' },
      { name: 'Rentals', href: '/dashboard' },
      { name: 'Support', href: '/#support' },
    ],
    Product: [
      { name: 'SMS Activation', href: '/dashboard' },
      { name: 'Private SIMs', href: '/dashboard' },
      { name: 'Rentals', href: '/dashboard' },
      { name: 'API Docs', href: '/api-docs' },
    ],
    Legal: [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Refund Policy', href: '#' },
    ]
  };

  return (
    <footer style={{ background:'#fff', borderTop:'1.5px solid var(--slate-100)', padding:'96px 0 48px' }}>
      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:64, marginBottom:72 }}>
          <div style={{ gridColumn:'span 2' }}>
            <Link href="/" style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24, textDecoration:'none' }}>
              <LogoIcon size={38} color="#9333ea" />
              <span style={{ fontSize:22, fontWeight:900, color:'var(--slate-900)', letterSpacing:'-0.03em' }}>RingSlot</span>
            </Link>
            <p style={{ fontSize:15, lineHeight:1.7, color:'var(--slate-500)', maxWidth:300, marginBottom:24 }}>
              The premium destination for instant, secure phone activations. Trusted by businesses and users worldwide.
            </p>
            <div style={{ display:'flex', gap:10 }}>
              {['Twitter','Telegram','GitHub','Discord'].map(s => (
                <div key={s} style={{ width:36, height:36, borderRadius:10, background:'var(--slate-50)', border:'1px solid var(--slate-100)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'.15s' }}>
                  <img src={`https://picsum.photos/seed/${s}/20/20`} alt={s} style={{ width:18, height:18, filter:'grayscale(1) opacity(0.6)' }} />
                </div>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <div style={{ fontSize:13, fontWeight:800, color:'var(--slate-900)', letterSpacing:'.1em', textTransform:'uppercase', marginBottom:24 }}>{title}</div>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:14 }}>
                {items.map(l => (
                  <li key={l.name}>
                    <Link href={l.href} style={{ textDecoration:'none', fontSize:14, fontWeight:500, color:'var(--slate-500)', transition:'.1s' }}
                      onMouseEnter={e => e.target.style.color='var(--primary-600)'} onMouseLeave={e => e.target.style.color='var(--slate-500)'}>
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop:'1.5px solid var(--slate-50)', paddingTop:48, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20 }}>
          <div style={{ fontSize:13, color:'var(--slate-400)', fontWeight:500 }}>
            © {new Date().getFullYear()} RingSlot Inc. All rights reserved. Built for security and speed.
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:32 }}>
            <div style={{ display:'flex', gap:8 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 8px rgba(34,197,94,0.4)' }} />
              <span style={{ fontSize:12, fontWeight:700, color:'var(--slate-400)', textTransform:'uppercase', letterSpacing:'.04em' }}>STATUS: ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
