import { useState } from 'react';
import Link from 'next/link';

const COUNTRIES = [
  {code:'US',name:'United States',flag:'🇺🇸',count:'3,486'},{code:'GB',name:'United Kingdom',flag:'🇬🇧',count:'2,914'},
  {code:'DE',name:'Germany',flag:'🇩🇪',count:'2,108'},{code:'CA',name:'Canada',flag:'🇨🇦',count:'3,456'},
  {code:'FR',name:'France',flag:'🇫🇷',count:'1,876'},{code:'AU',name:'Australia',flag:'🇦🇺',count:'1,654'},
  {code:'NG',name:'Nigeria',flag:'🇳🇬',count:'2,340'},{code:'IN',name:'India',flag:'🇮🇳',count:'4,102'},
  {code:'BR',name:'Brazil',flag:'🇧🇷',count:'1,980'},{code:'RU',name:'Russia',flag:'🇷🇺',count:'3,201'},
  {code:'ID',name:'Indonesia',flag:'🇮🇩',count:'1,543'},{code:'PH',name:'Philippines',flag:'🇵🇭',count:'1,234'},
  {code:'VN',name:'Vietnam',flag:'🇻🇳',count:'1,456'},{code:'TH',name:'Thailand',flag:'🇹🇭',count:'1,123'},
  {code:'MX',name:'Mexico',flag:'🇲🇽',count:'1,678'},{code:'KR',name:'South Korea',flag:'🇰🇷',count:'987'},
  {code:'JP',name:'Japan',flag:'🇯🇵',count:'876'},{code:'ZA',name:'South Africa',flag:'🇿🇦',count:'765'},
  {code:'KE',name:'Kenya',flag:'🇰🇪',count:'654'},{code:'EG',name:'Egypt',flag:'🇪🇬',count:'543'},
];

export default function Coverage() {
  const [search, setSearch] = useState('');
  const filtered = COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase()));

  return (
    <section id="countries" style={{ padding:'96px 0', background:'var(--slate-50)' }}>
      <div className="wrap">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:48, flexWrap:'wrap', gap:20 }}>
          <div>
            <div className="section-tag" style={{ display:'inline-flex' }}>Global Coverage</div>
            <h2 className="section-h2">170+ countries available</h2>
            <p style={{ fontSize:16, color:'var(--slate-500)' }}>Numbers from virtually every country on earth</p>
          </div>
          <input type="search" placeholder="Search countries…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding:'11px 18px', background:'#fff', border:'1.5px solid var(--slate-200)', borderRadius:12, fontSize:14, width:220, outline:'none', color:'var(--slate-900)' }}
            onFocus={e => { e.target.style.borderColor='var(--primary-400)'; e.target.style.boxShadow='0 0 0 3px rgba(168,85,247,0.1)'; }}
            onBlur={e => { e.target.style.borderColor='var(--slate-200)'; e.target.style.boxShadow='none'; }} />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:10 }}>
          {filtered.map(c => (
            <Link key={c.code} href="/dashboard" style={{ textDecoration:'none' }}>
              <div style={{ background:'#fff', border:'1.5px solid var(--slate-100)', borderRadius:14, padding:'14px 18px', display:'flex', alignItems:'center', gap:12, cursor:'pointer', transition:'all .15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--primary-300)'; e.currentTarget.style.background='var(--primary-50)'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(147,51,234,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--slate-100)'; e.currentTarget.style.background='#fff'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
                <span style={{ fontSize:24 }}>{c.flag}</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:'var(--slate-800)' }}>{c.name}</div>
                  <div style={{ fontSize:11, color:'var(--primary-600)', fontWeight:700 }}>{c.count} available</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && <div style={{ textAlign:'center', padding:48, color:'var(--slate-400)' }}>No countries match "{search}"</div>}

        <div style={{ textAlign:'center', marginTop:40 }}>
          <Link href="/dashboard"><button className="btn-outline-purple">Browse all 170+ countries →</button></Link>
        </div>
      </div>
    </section>
  );
}
