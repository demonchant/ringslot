import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import api from '../../utils/api';
import LogoIcon from '../../components/LogoIcon';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/forgot-password', { email: email.trim().toLowerCase() });
      if (res.status === 200 || res.status === 201) {
        setSent(true);
      } else if (res.status === 429) {
        setError('Too many attempts. Please wait an hour and try again.');
      } else {
        setError(res.data?.detail || res.data?.error || `Error ${res.status}`);
      }
    } catch { setError('Cannot reach server. Please check your connection.'); }
    setLoading(false);
  }

  return (<>
    <Head><title>Forgot Password — RingSlot</title><meta name="robots" content="noindex"/></Head>
    <div className="page" style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'16px 24px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(255,255,255,0.8)', backdropFilter:'blur(12px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none' }}>
          <LogoIcon size={30} />
          <span style={{ fontWeight:800, fontSize:16, color:'var(--text)' }}>RingSlot</span>
        </Link>
        <Link href="/login" style={{ fontSize:13, color:'var(--text-3)', textDecoration:'none' }}>← Back to sign in</Link>
      </div>
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ width:'100%', maxWidth:400 }}>
          {sent ? (
            <div style={{ background:'var(--surface)', borderRadius:20, padding:40, border:'1px solid var(--border)', boxShadow:'0 24px 64px rgba(147,51,234,0.08)', textAlign:'center' }}>
              <div style={{ width:64, height:64, margin:'0 auto 24px', borderRadius:16, background:'var(--accent-dim)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:32 }}>📧</span>
              </div>
              <h1 style={{ fontSize:26, fontWeight:900, letterSpacing:'-0.04em', marginBottom:12, color:'var(--text)' }}>Check your email</h1>
              <p style={{ color:'var(--text-2)', lineHeight:1.75, marginBottom:28 }}>We sent a password reset link to <strong style={{ color:'var(--accent)' }}>{email}</strong>. It expires in 1 hour.</p>
              <Link href="/login"><button className="btn btn-primary" style={{ width:'100%' }}>Back to sign in</button></Link>
            </div>
          ) : (
            <div style={{ background:'var(--surface)', borderRadius:20, padding:40, border:'1px solid var(--border)', boxShadow:'0 24px 64px rgba(147,51,234,0.08)' }}>
              <div style={{ textAlign:'center', marginBottom:32 }}>
                <h1 style={{ fontSize:26, fontWeight:900, letterSpacing:'-0.04em', marginBottom:8, color:'var(--text)' }}>Reset your password</h1>
                <p style={{ color:'var(--text-2)', fontSize:15 }}>Enter your email and we'll send you a reset link.</p>
              </div>
              {error && <div style={{ background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:10, padding:'12px 16px', marginBottom:20, fontSize:14, color:'#dc2626' }}>{error}</div>}
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom:20 }}>
                  <label style={{ display:'block', fontSize:12, fontWeight:700, color:'var(--text-3)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:6 }}>Email address</label>
                  <input type="email" className="input" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width:'100%' }} disabled={loading}>{loading?'Sending…':'Send reset link →'}</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  </>);
}
