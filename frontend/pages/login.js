import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import api from '../utils/api';

function PurpleLogo({ size = 34 }) {
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

const OAUTH = [
  { id:'google', label:'Google', color:'#4285F4', icon: <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
  { id:'apple', label:'Apple', color:'#000', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/></svg> },
  { id:'telegram', label:'Telegram', color:'#2AABEE', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#2AABEE"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/></svg> },
  { id:'facebook', label:'Facebook', color:'#1877F2', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
];

export default function Login() {
  const router = useRouter();
  const [mounted, setMounted]           = useState(false);
  const [form, setForm]                 = useState({ email:'', password:'' });
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);
  const [state, setState]               = useState('idle');
  const [sentTo, setSentTo]             = useState('');

  useEffect(() => {
    setMounted(true);
    try { if (localStorage.getItem('rs_token')) router.replace('/dashboard'); } catch {}
    const { verify } = router.query || {};
    if (verify === 'expired')      setError('Verification link expired. Please sign in again.');
    if (verify === 'invalid')      setError('Invalid verification link. Please try again.');
    if (verify === 'already_used') setError('Link already used. Please sign in.');
  }, [router.query]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/login', { email: form.email.trim().toLowerCase(), password: form.password });
      if (res.status === 202 && res.data?.requiresVerification) {
        setSentTo(form.email.trim().toLowerCase());
        setState(res.data.isFirstLogin ? 'first_login' : 'check_email');
      } else if (res.status === 200 && res.data?.token) {
        localStorage.setItem('rs_token', res.data.token);
        localStorage.setItem('rs_user', JSON.stringify(res.data.user));
        router.replace('/dashboard');
      } else if (res.status === 429) {
        setError('Too many attempts. Please wait 15 minutes.');
      } else {
        setError(res.data?.error || 'Invalid email or password');
      }
    } catch { setError('Cannot reach server. Please check your connection.'); }
    setLoading(false);
  }

  if (!mounted) return null;

  if (state === 'check_email' || state === 'first_login') {
    return (
      <div className="page" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ background:'var(--surface)', borderRadius:24, padding:48, maxWidth:420, width:'100%', textAlign:'center', boxShadow:'0 24px 64px rgba(147,51,234,0.12)', border:'1px solid var(--border)' }}>
          <div style={{ width:72, height:72, margin:'0 auto 24px', borderRadius:20, background:'var(--primary-50)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:32 }}>📧</span>
          </div>
          <h1 className="font-display" style={{ fontSize:26, fontWeight:700, color:'var(--text)', marginBottom:12 }}>{state === 'first_login' ? 'Confirm your sign-in' : 'Check your email'}</h1>
          <p style={{ color:'var(--text-2)', lineHeight:1.75, marginBottom:8 }}>We sent a verification link to</p>
          <p style={{ color:'var(--accent)', fontWeight:700, marginBottom:24, fontFamily:'JetBrains Mono,monospace' }}>{sentTo}</p>
          <p style={{ color:'var(--text-3)', fontSize:13, lineHeight:1.7, marginBottom:32 }}>Click the link in the email to complete sign-in. Expires in 15 minutes. Check spam if you don't see it.</p>
          <button style={{ width:'100%', padding:'13px', background:'var(--surface-2)', border:'1.5px solid var(--border)', borderRadius:12, color:'var(--accent)', fontWeight:600, fontSize:15, cursor:'pointer' }} onClick={() => { setState('idle'); setError(''); }}>← Use a different email</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', position:'relative' }}>
      <Head>
        <title>Sign in — RingSlot</title>
        <meta name="robots" content="noindex" />
        <style>{`@keyframes rs-spin{to{transform:rotate(360deg)}}`}</style>
      </Head>

      {/* Top bar */}
      <div style={{ padding:'16px 28px', display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(255,255,255,0.8)', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--border)' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <PurpleLogo size={32} />
          <span className="font-display" style={{ fontWeight:700, fontSize:17, color:'var(--text)' }}>RingSlot</span>
        </Link>
        <Link href="/" style={{ fontSize:13, color:'var(--text-2)', textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to home
        </Link>
      </div>

      {/* Main */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ width:'100%', maxWidth:420 }}>
          <div style={{ background:'var(--surface)', borderRadius:24, padding:40, boxShadow:'0 24px 64px rgba(147,51,234,0.1)', border:'1px solid var(--border)' }}>
            <div style={{ textAlign:'center', marginBottom:32 }}>
              <h1 className="font-display" style={{ fontSize:28, fontWeight:700, color:'var(--text)', marginBottom:8 }}>Welcome back</h1>
              <p style={{ color:'var(--text-3)', fontSize:15 }}>Sign in to your RingSlot account</p>
            </div>

            {error && (
              <div style={{ background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:10, padding:'12px 16px', marginBottom:20, fontSize:14, color:'#dc2626', lineHeight:1.5 }}>{error}</div>
            )}

            {/* Email/password form */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom:14 }}>
                <label style={{ display:'block', fontSize:12, fontWeight:700, color:'var(--text-3)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:6 }}>Email</label>
                <input className="input" type="email" placeholder="you@example.com" required value={form.email} onChange={e => setForm({ ...form, email:e.target.value })} />
              </div>
              <div style={{ marginBottom:24 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                  <label style={{ fontSize:12, fontWeight:700, color:'var(--text-3)', letterSpacing:'.06em', textTransform:'uppercase' }}>Password</label>
                  <Link href="/auth/forgot-password" style={{ fontSize:12, color:'var(--accent)', textDecoration:'none', fontWeight:500 }}>Forgot password?</Link>
                </div>
                <input className="input" type="password" placeholder="••••••••" required value={form.password} onChange={e => setForm({ ...form, password:e.target.value })} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }} disabled={loading}>
                {loading ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation:'rs-spin .75s linear infinite' }}><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/><path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>Signing in…</>) : 'Sign in →'}
              </button>
            </form>

            <p style={{ textAlign:'center', fontSize:14, color:'var(--text-3)', marginTop:20 }}>
              No account?{' '}<Link href="/register" style={{ color:'var(--accent)', fontWeight:700, textDecoration:'none' }}>Create one free →</Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
