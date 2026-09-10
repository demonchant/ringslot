import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../utils/api';

const TICKER = ['Telegram','WhatsApp','Google','Instagram','Discord','Binance','TikTok','Facebook','Snapchat','Twitter/X'];

export default function Hero() {
  const [tick, setTick] = useState(0);
  const [form, setForm] = useState({ email:'', password:'', confirm:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const router_ref = typeof window !== 'undefined' ? window : null;

  useEffect(() => {
    const t = setInterval(() => setTick(p => (p+1) % TICKER.length), 2000);
    return () => clearInterval(t);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('Passwords do not match');
    if (form.password.length < 8) return setError('Password must be at least 8 characters');
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/register', { email: form.email.trim().toLowerCase(), password: form.password });
      if (res.status === 201 && res.data?.token) {
        localStorage.setItem('rs_token', res.data.token);
        localStorage.setItem('rs_user', JSON.stringify(res.data.user));
        window.location.href = '/dashboard';
      } else { setError(res.data?.error || 'Registration failed'); }
    } catch (err) { setError(err.response?.data?.error || 'Cannot reach server. Try again.'); }
    setLoading(false);
  }

  return (
    <section style={{ paddingTop:100, paddingBottom:80, background:'linear-gradient(180deg,var(--primary-50) 0%,#fafafa 100%)', position:'relative', overflow:'hidden' }}>
      {/* Background blobs */}
      <div style={{ position:'absolute', top:'-20%', right:'-10%', width:640, height:640, background:'radial-gradient(circle,rgba(168,85,247,0.12) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-10%', left:'-5%', width:480, height:480, background:'radial-gradient(circle,rgba(147,51,234,0.08) 0%,transparent 70%)', pointerEvents:'none' }} />

      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:64, alignItems:'center' }}>

          {/* Left — headline */}
          <div>
            <div className="section-tag">
              <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--primary-500)', display:'inline-block', animation:'pulse 2s infinite' }} />
              Live · Numbers available now
            </div>

            <h1 className="font-display" style={{ fontSize:'clamp(36px,5.5vw,64px)', fontWeight:700, lineHeight:1.08, letterSpacing:'-0.04em', color:'var(--slate-900)', marginBottom:20 }}>
              Buy virtual numbers<br/>for{' '}
              <span style={{ color:'var(--primary-600)', position:'relative' }}>
                SMS verification
              </span>
              <br/>
              <span style={{ fontSize:'0.65em', color:'var(--slate-600)' }}>across global inventory</span>
            </h1>

            {/* Rotating service ticker */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16, height:36, overflow:'hidden' }}>
              <span style={{ fontSize:14, color:'var(--slate-500)', fontWeight:500 }}>Works with</span>
              <div style={{ position:'relative', height:36, flex:1, overflow:'hidden' }}>
                {TICKER.map((s,i) => (
                  <div key={s} style={{ position:'absolute', top:0, left:0, fontFamily:'Space Grotesk,sans-serif', fontSize:18, fontWeight:700, color:'var(--primary-700)', transition:'all 0.4s cubic-bezier(.4,0,.2,1)', opacity: i===tick?1:0, transform: i===tick?'translateY(0)':'translateY(20px)' }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <p style={{ fontSize:17, color:'var(--slate-500)', lineHeight:1.8, marginBottom:32, maxWidth:460 }}>
              Request one-time activations for Telegram, WhatsApp, Google, TikTok, Facebook and <strong style={{ color:'var(--slate-700)' }}>dozens of configured services</strong>. Pay with crypto. From <strong style={{ color:'var(--primary-600)' }}>$0.10</strong>, subject to inventory.
            </p>

            {/* Stats row */}
            <div style={{ display:'flex', gap:32, flexWrap:'wrap' }}>
              {[['90+','Countries'],['Dozens','Services'],['$0.10','Starting price'],['10min','Activation window']].map(([v,l]) => (
                <div key={l}>
                  <div className="font-display" style={{ fontSize:24, fontWeight:700, color:'var(--primary-700)', lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:12, color:'var(--slate-400)', fontWeight:500, marginTop:3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — signup card */}
          <div>
            <div style={{ background:'#fff', borderRadius:24, padding:36, boxShadow:'0 24px 80px rgba(147,51,234,0.12), 0 4px 16px rgba(0,0,0,0.06)', border:'1px solid var(--primary-100)' }}>
              {/* Phone mockup header */}
              <div style={{ background:'linear-gradient(135deg,var(--primary-600),var(--primary-800))', borderRadius:16, padding:20, marginBottom:28, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, background:'rgba(255,255,255,0.08)', borderRadius:'50%' }} />
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.7)', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8 }}>Active Number</div>
                <div className="font-mono" style={{ fontSize:22, fontWeight:700, color:'#fff', marginBottom:16 }}>+1 (424) 678-****</div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 8px #4ade80' }} />
                  <span style={{ fontSize:13, color:'rgba(255,255,255,0.8)', fontWeight:500 }}>OTP received · 481 902</span>
                </div>
              </div>

              <h3 className="font-display" style={{ fontSize:20, fontWeight:700, marginBottom:6, color:'var(--slate-900)' }}>Create Account</h3>
              <p style={{ fontSize:14, color:'var(--slate-400)', marginBottom:24 }}>Start in 60 seconds — no credit card required</p>

              {error && <div style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.25)', borderRadius:10, padding:'10px 14px', marginBottom:16, fontSize:13, color:'#dc2626' }}>{error}</div>}

              {done ? (
                <div style={{ textAlign:'center', padding:'16px 0' }}>
                  <div style={{ fontSize:40, marginBottom:8 }}>✅</div>
                  <p style={{ color:'var(--primary-600)', fontWeight:700 }}>Account created! Redirecting…</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input className="input-light" type="email" placeholder="Email address" required value={form.email}
                    onChange={e => setForm(f => ({...f, email:e.target.value}))} style={{ marginBottom:12 }} />
                  <input className="input-light" type="password" placeholder="Password (8+ characters)" required value={form.password}
                    onChange={e => setForm(f => ({...f, password:e.target.value}))} style={{ marginBottom:12 }} />
                  <input className="input-light" type="password" placeholder="Confirm password" required value={form.confirm}
                    onChange={e => setForm(f => ({...f, confirm:e.target.value}))} style={{ marginBottom:20 }} />

                  <button type="submit" className="btn-purple" style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }} disabled={loading}>
                    {loading ? (
                      <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation:'rs-spin .75s linear infinite' }}><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/><path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>Creating account…</>
                    ) : 'Get started free →'}
                  </button>
                </form>
              )}

              <p style={{ textAlign:'center', marginTop:16, fontSize:13, color:'var(--slate-400)' }}>
                Already have an account?{' '}
                <Link href="/login" style={{ color:'var(--primary-600)', fontWeight:600, textDecoration:'none' }}>Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
