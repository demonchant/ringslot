import { useState } from 'react';
import Link from 'next/link';
import ServiceLogo from './ServiceLogo';

const SERVICES = [
  {id:'telegram',name:'Telegram',emoji:'✈️'},{id:'whatsapp',name:'WhatsApp',emoji:'💬'},
  {id:'google',name:'Google',emoji:'🔍'},{id:'discord',name:'Discord',emoji:'🎮'},
  {id:'instagram',name:'Instagram',emoji:'📸'},{id:'facebook',name:'Facebook',emoji:'👥'},
  {id:'tiktok',name:'TikTok',emoji:'🎵'},{id:'twitter',name:'Twitter/X',emoji:'🐦'},
  {id:'amazon',name:'Amazon',emoji:'📦'},{id:'microsoft',name:'Microsoft',emoji:'💻'},
  {id:'binance',name:'Binance',emoji:'💰'},{id:'coinbase',name:'Coinbase',emoji:'🪙'},
  {id:'uber',name:'Uber',emoji:'🚗'},{id:'netflix',name:'Netflix',emoji:'🎬'},
  {id:'spotify',name:'Spotify',emoji:'🎧'},{id:'paypal',name:'PayPal',emoji:'💳'},
  {id:'tinder',name:'Tinder',emoji:'❤️'},{id:'apple',name:'Apple ID',emoji:'🍎'},
  {id:'steam',name:'Steam',emoji:'🎯'},{id:'airbnb',name:'Airbnb',emoji:'🏠'},
  {id:'snapchat',name:'Snapchat',emoji:'👻'},{id:'linkedin',name:'LinkedIn',emoji:'💼'},
  {id:'reddit',name:'Reddit',emoji:'🤖'},{id:'bumble',name:'Bumble',emoji:'💛'},
  {id:'github',name:'GitHub',emoji:'🐙'},{id:'zoom',name:'Zoom',emoji:'📹'},
  {id:'skype',name:'Skype',emoji:'🔵'},{id:'ebay',name:'eBay',emoji:'🛒'},
];

export default function ServiceGrid() {
  const [search, setSearch] = useState('');
  const filtered = SERVICES.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <section id="services" style={{ padding:'96px 0', background:'#fff' }}>
      <div className="wrap">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:48, flexWrap:'wrap', gap:20 }}>
          <div>
            <div className="section-tag" style={{ display:'inline-flex' }}>Dozens of services</div>
            <h2 className="section-h2">Every platform you need</h2>
            <p style={{ fontSize:16, color:'var(--slate-500)' }}>All at $0.10 per activation — no hidden fees</p>
          </div>
          <input type="search" placeholder="Search services…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding:'11px 18px', background:'var(--slate-50)', border:'1.5px solid var(--slate-200)', borderRadius:12, fontSize:14, width:220, outline:'none', color:'var(--slate-900)' }}
            onFocus={e => { e.target.style.borderColor='var(--primary-400)'; e.target.style.boxShadow='0 0 0 3px rgba(168,85,247,0.1)'; }}
            onBlur={e => { e.target.style.borderColor='var(--slate-200)'; e.target.style.boxShadow='none'; }} />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:10 }}>
          {filtered.map(s => (
            <Link key={s.id} href="/dashboard" style={{ textDecoration:'none' }}>
              <div style={{ background:'#fafafa', border:'1.5px solid var(--slate-100)', borderRadius:14, padding:'14px 16px', display:'flex', alignItems:'center', gap:10, cursor:'pointer', transition:'all .15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--primary-300)'; e.currentTarget.style.background='var(--primary-50)'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(147,51,234,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--slate-100)'; e.currentTarget.style.background='#fafafa'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
                <ServiceLogo serviceKey={s.id} displayName={s.name} size={28} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'var(--slate-800)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.name}</div>
                  <div style={{ fontSize:11, color:'var(--primary-600)', fontWeight:700 }}>From $0.10</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:48, color:'var(--slate-400)' }}>No results for "{search}"</div>
        )}

        <div style={{ textAlign:'center', marginTop:40 }}>
          <Link href="/services">
            <button className="btn-outline-purple">View all configured services →</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
