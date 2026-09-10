import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import api from '../../utils/api';
import LogoIcon from '../../components/LogoIcon';

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [form, setForm] = useState({ password:'', confirm:'' });
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    const t = router.query.token;
    if (!t) { setValid(false); return; }
    setToken(t);
    api.get(`/auth/validate-reset/${t}`).then(r => setValid(r.data?.valid !== false)).catch(() => setValid(false));
  }, [router.isReady, router.query]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/reset-password', { token, password: form.password });
      if (res.status === 200 && res.data?.success) setDone(true);
      else setError(res.data?.error || 'Something went wrong');
    } catch (err) { setError(err.response?.data?.error || 'Cannot reach server.'); }
    setLoading(false);
  }

  return (<>
    <Head><title>Reset Password — RingSlot</title><meta name="robots" content="noindex"/></Head>
    <div className="page" style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'16px 24px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', background:'rgba(255,255,255,0.8)', backdropFilter:'blur(12px)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:8, textDecoration:'none' }}>
          <LogoIcon size={30} />
          <span style={{ fontWeight:800, fontSize:16, color:'var(--text)' }}>RingSlot</span>
        </Link>
      </div>
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ width:'100%', maxWidth:400 }}>
          {valid === null && (
            <div style={{ background:'var(--surface)', borderRadius:20, padding:40, border:'1px solid var(--border)', boxShadow:'0 24px 64px rgba(147,51,234,0.08)', textAlign:'center' }}>
              <p style={{ color:'var(--text-3)' }}>Validating link…</p>
            </div>
          )}
          {valid === false && (
            <div style={{ background:'var(--surface)', borderRadius:20, padding:40, border:'1px solid var(--border)', boxShadow:'0 24px 64px rgba(147,51,234,0.08)', textAlign:'center' }}>
              <div style={{ width:64, height:64, margin:'0 auto 24px', borderRadius:16, background:'rgba(239,68,68,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:32 }}>❌</span>
              </div>
              <h1 style={{ fontSize:24, fontWeight:900, marginBottom:12, color:'var(--text)' }}>Link invalid or expired</h1>
              <p style={{ color:'var(--text-2)', marginBottom:24 }}>This reset link has expired or already been used.</p>
              <Link href="/auth/forgot-password"><button className="btn btn-primary" style={{ width:'100%' }}>Request a new link</button></Link>
            </div>
          )}
          {valid && !done && (
            <div style={{ background:'var(--surface)', borderRadius:20, padding:40, border:'1px solid var(--border)', boxShadow:'0 24px 64px rgba(147,51,234,0.08)' }}>
              <div style={{ textAlign:'center', marginBottom:32 }}>
                <h1 style={{ fontSize:26, fontWeight:900, letterSpacing:'-0.04em', marginBottom:8, color:'var(--text)' }}>Set new password</h1>
                <p style={{ color:'var(--text-2)', fontSize:15 }}>Choose a strong password of at least 8 characters.</p>
              </div>
              {error && <div style={{ background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:10, padding:'12px 16px', marginBottom:20, fontSize:14, color:'#dc2626' }}>{error}</div>}
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom:16 }}>
                  <label style={{ display:'block', fontSize:12, fontWeight:700, color:'var(--text-3)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:6 }}>New password</label>
                  <input type="password" className="input" placeholder="At least 8 characters" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
                </div>
                <div style={{ marginBottom:24 }}>
                  <label style={{ display:'block', fontSize:12, fontWeight:700, color:'var(--text-3)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:6 }}>Confirm password</label>
                  <input type="password" className="input" placeholder="Repeat password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width:'100%' }} disabled={loading}>{loading?'Saving…':'Set new password →'}</button>
              </form>
            </div>
          )}
          {done && (
            <div style={{ background:'var(--surface)', borderRadius:20, padding:40, border:'1px solid var(--border)', boxShadow:'0 24px 64px rgba(147,51,234,0.08)', textAlign:'center' }}>
              <div style={{ width:64, height:64, margin:'0 auto 24px', borderRadius:16, background:'var(--accent-dim)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:32 }}>✅</span>
              </div>
              <h1 style={{ fontSize:24, fontWeight:900, marginBottom:12, color:'var(--text)' }}>Password updated!</h1>
              <p style={{ color:'var(--text-2)', marginBottom:28 }}>Your password has been changed. You can now sign in.</p>
              <Link href="/login"><button className="btn btn-primary" style={{ width:'100%' }}>Sign in →</button></Link>
            </div>
          )}
        </div>
      </div>
    </div>
  </>);
}
