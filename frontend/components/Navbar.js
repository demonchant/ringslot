import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import api from '../utils/api';

function PurpleLogo({ size = 32 }) {
  const inner = Math.round(size * 0.7);
  return (
    <div style={{ width:size, height:size, borderRadius:Math.round(size*0.26), background:'linear-gradient(145deg,#7c5cf6,#5b3de8)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 ${Math.round(size*.08)}px ${Math.round(size*.35)}px rgba(91,61,232,0.4)` }}>
      <svg width={inner} height={inner} viewBox="0 0 20 20" fill="none">
        <rect x="1" y="1" width="8" height="8" rx="2" fill="white"/>
        <rect x="11" y="1" width="8" height="8" rx="2" fill="white"/>
        <rect x="1" y="11" width="8" height="8" rx="2" fill="white"/>
        <rect x="11" y="11" width="8" height="8" rx="2" fill="white" fillOpacity="0.38"/>
      </svg>
    </div>
  );
}

const NAV_LINKS = [
  { href:'/', label:'Home' },
  { href:'/virtual-phone-number', label:'Virtual numbers' },
  { href:'/pricing', label:'Pricing' },
  { href:'/#services', label:'Services' },
  { href:'/#countries', label:'Countries' },
  { href:'/api-docs', label:'API' },
  { href:'/support', label:'Support' },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser]         = useState(null);
  const [balance, setBalance]   = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    try {
      const u = JSON.parse(localStorage.getItem('rs_user') || 'null');
      setUser(u);
      if (u) {
        api.get('/me').then(({ data }) => {
          setUser(data);
          localStorage.setItem('rs_user', JSON.stringify({ ...u, ...data }));
        }).catch(() => {});
        api.get('/wallet/balance').then(r => setBalance(r.data?.balance)).catch(() => {});
      }
    } catch {}
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function logout() {
    localStorage.removeItem('rs_token');
    localStorage.removeItem('rs_user');
    router.push('/login');
  }

  const isActive = (href) => router.pathname === href;

  const textColor = 'var(--slate-800)';
  const textMuted = 'var(--slate-500)';

  return (
    <>
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, height:68, background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderBottom:`1px solid ${scrolled ? 'rgba(0,0,0,0.06)' : 'transparent'}`, transition:'all 0.25s', boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', height:'100%', display:'flex', alignItems:'center' }}>

          {/* Logo */}
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, marginRight:36, flexShrink:0, textDecoration:'none' }}>
            <PurpleLogo size={34} />
            <span className="font-display" style={{ fontWeight:700, fontSize:18, color: textColor, letterSpacing:'-0.03em' }}>RingSlot</span>
          </Link>

          {/* Desktop links */}
          <div className="hide-mobile" style={{ display:'flex', alignItems:'center', gap:2, flex:1 }}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} style={{ padding:'7px 13px', borderRadius:9, fontSize:14, fontWeight:500, color: isActive(href) ? 'var(--primary-600)' : textMuted, background: isActive(href) ? 'var(--primary-50)' : 'transparent', transition:'all 0.15s', textDecoration:'none' }}
                onMouseEnter={e => { if (!isActive(href)) { e.currentTarget.style.color=textColor; e.currentTarget.style.background='rgba(0,0,0,0.04)'; }}}
                onMouseLeave={e => { if (!isActive(href)) { e.currentTarget.style.color=textMuted; e.currentTarget.style.background='transparent'; }}}
              >{label}</Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hide-mobile" style={{ display:'flex', alignItems:'center', gap:10 }}>
            {user ? (
              <>
                {balance !== null && (
                  <div style={{ padding:'7px 14px', background:'var(--primary-50)', border:'1px solid var(--primary-100)', borderRadius:10, display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:10, color:'var(--primary-400)', fontFamily:'JetBrains Mono,monospace', fontWeight:700, letterSpacing:'0.08em' }}>BAL</span>
                    <span style={{ fontSize:15, color:'var(--primary-600)', fontFamily:'JetBrains Mono,monospace', fontWeight:700 }}>${parseFloat(balance).toFixed(2)}</span>
                  </div>
                )}
                {['admin', 'superadmin'].includes(user.role) && (
                  <Link href="/admin"><button style={{ padding:'9px 14px', background:'var(--primary-50)', border:'1px solid var(--primary-100)', borderRadius:10, color:'var(--primary-600)', fontWeight:700, cursor:'pointer' }}>{user.role === 'superadmin' ? 'Owner' : 'Admin'}</button></Link>
                )}
                <Link href="/dashboard">
                  <button className="btn-purple" style={{ padding:'9px 20px', fontSize:14 }}>Dashboard</button>
                </Link>
                <button onClick={logout} style={{ padding:'9px 18px', background:'none', border:'1px solid var(--slate-200)', borderRadius:10, color:textMuted, fontSize:14, fontWeight:500, cursor:'pointer' }}>Sign out</button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button style={{ padding:'9px 18px', background:'none', border:'1px solid var(--slate-200)', borderRadius:10, color:textMuted, fontSize:14, fontWeight:500, cursor:'pointer', transition:'all .15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor='var(--primary-300)'; e.currentTarget.style.color='var(--primary-600)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='var(--slate-200)'; e.currentTarget.style.color=textMuted; }}>
                    Sign in
                  </button>
                </Link>
                <Link href="/register">
                  <button className="btn-purple" style={{ padding:'9px 20px', fontSize:14 }}>Get started</button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="hide-desktop" onClick={() => setMenuOpen(!menuOpen)} style={{ marginLeft:'auto', background:'none', border:'none', color:textColor, cursor:'pointer', padding:8, display:'flex', flexDirection:'column', gap:5 }}>
            <span style={{ display:'block', width:22, height:2, background: menuOpen?'var(--primary-500)':textColor, borderRadius:2, transition:'all .2s', transform: menuOpen?'rotate(45deg) translate(5px,5px)':'none' }} />
            <span style={{ display:'block', width:22, height:2, background:textColor, borderRadius:2, opacity:menuOpen?0:1, transition:'all .2s' }} />
            <span style={{ display:'block', width:22, height:2, background: menuOpen?'var(--primary-500)':textColor, borderRadius:2, transition:'all .2s', transform: menuOpen?'rotate(-45deg) translate(5px,-5px)':'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="hide-desktop" style={{ position:'fixed', top:68, left:0, right:0, zIndex:99, background:'rgba(255,255,255,0.99)', backdropFilter:'blur(20px)', borderBottom:'1px solid var(--slate-100)', padding:'16px 24px 28px' }} onClick={() => setMenuOpen(false)}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} style={{ display:'block', padding:'13px 0', fontSize:16, fontWeight:600, color: isActive(href)?'var(--primary-600)':textColor, borderBottom:'1px solid var(--slate-100)', textDecoration:'none' }}>{label}</Link>
          ))}
          <div style={{ marginTop:20, display:'flex', gap:10 }}>
            {user ? (
              <>
                {['admin', 'superadmin'].includes(user.role) && <Link href="/admin" style={{ flex:1 }}><button style={{ width:'100%', padding:'12px', border:'1px solid var(--primary-200)', borderRadius:10, background:'var(--primary-50)', color:'var(--primary-600)', fontWeight:700 }}>Admin</button></Link>}
                <Link href="/dashboard" style={{ flex:1 }}><button className="btn-purple" style={{ width:'100%' }}>Dashboard</button></Link>
                <button onClick={logout} style={{ flex:1, padding:'12px', background:'none', border:'1px solid var(--slate-200)', borderRadius:10, color:textColor, fontSize:15, fontWeight:600, cursor:'pointer' }}>Sign out</button>
              </>
            ) : (
              <>
                <Link href="/login" style={{ flex:1 }}><button style={{ width:'100%', padding:'12px', background:'none', border:'1px solid var(--slate-200)', borderRadius:10, color:textColor, fontSize:15, fontWeight:600, cursor:'pointer' }}>Sign in</button></Link>
                <Link href="/register" style={{ flex:1 }}><button className="btn-purple" style={{ width:'100%' }}>Get started</button></Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
