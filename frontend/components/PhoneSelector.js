import { useState } from 'react';
import Link from 'next/link';

const COUNTRIES = [
  { code:'US', name:'United States',  flag:'🇺🇸', count:'3,486' },
  { code:'GB', name:'United Kingdom', flag:'🇬🇧', count:'2,914' },
  { code:'DE', name:'Germany',        flag:'🇩🇪', count:'2,108' },
  { code:'CA', name:'Canada',         flag:'🇨🇦', count:'3,456' },
  { code:'FR', name:'France',         flag:'🇫🇷', count:'1,876' },
  { code:'NG', name:'Nigeria',        flag:'🇳🇬', count:'2,340' },
  { code:'IN', name:'India',          flag:'🇮🇳', count:'4,102' },
  { code:'BR', name:'Brazil',         flag:'🇧🇷', count:'1,980' },
];

const SERVICES = ['Telegram','WhatsApp','Google','Discord','Instagram','Facebook','TikTok','Binance','PayPal','Snapchat'];

export default function PhoneSelector() {
  const [selCountry, setSelCountry] = useState('US');
  const [selService, setSelService] = useState('Telegram');
  const c = COUNTRIES.find(x => x.code === selCountry) || COUNTRIES[0];

  return (
    <section style={{ padding:'96px 0', background:'#fff', borderTop:'1px solid var(--slate-100)' }}>
      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:64, alignItems:'center' }}>

          {/* Visual card */}
          <div style={{ position:'relative' }}>
            <div style={{ background:'linear-gradient(145deg,var(--primary-50),#fff)', border:'1px solid var(--primary-100)', borderRadius:28, padding:32, boxShadow:'0 20px 60px rgba(147,51,234,0.1)' }}>
              {/* Country row */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
                <div>
                  <div style={{ fontSize:11, color:'var(--slate-400)', fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', marginBottom:4 }}>Country</div>
                  <div className="font-display" style={{ fontSize:20, fontWeight:700, color:'var(--slate-900)' }}>{c.flag} {c.name}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:11, color:'var(--slate-400)', fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', marginBottom:4 }}>Available</div>
                  <div className="font-display" style={{ fontSize:20, fontWeight:700, color:'var(--primary-600)' }}>{c.count}</div>
                </div>
              </div>

              {/* Number display */}
              <div style={{ background:'linear-gradient(135deg,var(--primary-600),var(--primary-800))', borderRadius:16, padding:'20px 24px', marginBottom:20 }}>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.6)', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8 }}>Your virtual number</div>
                <div className="font-mono" style={{ fontSize:26, fontWeight:700, color:'#fff', letterSpacing:2 }}>+1 (424) 678-9021</div>
              </div>

              {/* Service */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 0', borderBottom:'1px solid var(--slate-100)', marginBottom:14 }}>
                <span style={{ fontSize:14, color:'var(--slate-600)', fontWeight:500 }}>Service</span>
                <span className="font-display" style={{ fontSize:15, fontWeight:700, color:'var(--primary-700)' }}>{selService}</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:14, color:'var(--slate-600)', fontWeight:500 }}>Price</span>
                <span className="font-display" style={{ fontSize:20, fontWeight:700, color:'var(--primary-700)' }}>$0.10</span>
              </div>

              <Link href="/dashboard" style={{ textDecoration:'none' }}>
                <button className="btn-purple" style={{ width:'100%', marginTop:24 }}>Get this number →</button>
              </Link>
            </div>

            {/* Floating badge */}
            <div style={{ position:'absolute', top:-16, right:-16, background:'#fff', border:'1px solid var(--primary-100)', borderRadius:16, padding:'10px 16px', boxShadow:'0 8px 24px rgba(147,51,234,0.15)', display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 8px #4ade80', animation:'pulse 2s infinite' }} />
              <span style={{ fontSize:13, fontWeight:700, color:'var(--slate-900)' }}>OTP received in dashboard</span>
            </div>
          </div>

          {/* Controls */}
          <div>
            <div className="section-tag">Virtual Number Selector</div>
            <h2 className="section-h2">Pick your country<br/>& service</h2>
            <p className="section-lead" style={{ marginBottom:36 }}>
              Choose from 90+ configured countries. Live inventory is checked across enabled providers when you buy.
            </p>

            {/* Country picker */}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:12, fontWeight:700, color:'var(--slate-400)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:12 }}>Country</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
                {COUNTRIES.slice(0,8).map(c => (
                  <button key={c.code} onClick={() => setSelCountry(c.code)}
                    style={{ padding:'10px 8px', borderRadius:12, border:`2px solid ${selCountry===c.code?'var(--primary-400)':'var(--slate-100)'}`, background: selCountry===c.code?'var(--primary-50)':'#fff', cursor:'pointer', textAlign:'center', transition:'all .15s' }}>
                    <div style={{ fontSize:20 }}>{c.flag}</div>
                    <div style={{ fontSize:10, fontWeight:600, color: selCountry===c.code?'var(--primary-700)':'var(--slate-500)', marginTop:3 }}>{c.code}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Service picker */}
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:'var(--slate-400)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:12 }}>Service</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {SERVICES.map(s => (
                  <button key={s} onClick={() => setSelService(s)}
                    style={{ padding:'8px 16px', borderRadius:20, border:`1.5px solid ${selService===s?'var(--primary-400)':'var(--slate-200)'}`, background: selService===s?'var(--primary-600)':'#fff', color: selService===s?'#fff':'var(--slate-600)', fontWeight:600, fontSize:13, cursor:'pointer', transition:'all .15s' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
