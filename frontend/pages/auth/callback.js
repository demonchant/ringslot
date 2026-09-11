import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LogoIcon from '../../components/LogoIcon';

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!router.isReady) return;
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const jwt = fragment.get('jwt');
    if (!jwt) { setStatus('error'); setMessage('No authentication token found. Please try signing in again.'); return; }
    window.history.replaceState({}, document.title, '/auth/callback');

    async function finalise() {
      try {
        localStorage.setItem('rs_token', jwt);
        const BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://ringslot-backend.onrender.com').replace(/\/$/, '');
        const res = await fetch(`${BASE}/api/me`, { headers: { 'Authorization': `Bearer ${jwt}`, 'Content-Type': 'application/json' } });
        if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.error || `${res.status}`); }
        const data = await res.json();
        localStorage.setItem('rs_user', JSON.stringify({ id:data.id, email:data.email, role:data.role, api_key:data.api_key }));
        setStatus('success');
        setTimeout(() => router.replace('/dashboard'), 1200);
      } catch (err) {
        localStorage.removeItem('rs_token'); localStorage.removeItem('rs_user');
        setStatus('error'); setMessage(err.message || 'Verification failed. Link may have expired.');
      }
    }
    finalise();
  }, [router.isReady]);

  return (
    <>
    <Head><title>Verify Sign-in — RingSlot</title><meta name="robots" content="noindex, nofollow" /></Head>
    <div className="page" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ marginBottom:32, display:'flex', alignItems:'center', gap:10 }}>
        <LogoIcon size={36} />
        <span style={{ fontWeight:800, fontSize:20, letterSpacing:'-0.04em', color:'var(--text)' }}>RingSlot</span>
      </div>
      <div style={{ background:'var(--surface)', borderRadius:20, padding:40, border:'1px solid var(--border)', boxShadow:'0 24px 64px rgba(147,51,234,0.08)', textAlign:'center', maxWidth:360, width:'100%' }}>
        {status==='verifying' && (<>
          <div style={{ width:56, height:56, margin:'0 auto 20px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ animation:'spin 1s linear infinite' }}>
              <circle cx="12" cy="12" r="10" stroke="var(--border)" strokeWidth="2"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 style={{ fontSize:22, fontWeight:900, letterSpacing:'-0.04em', marginBottom:10, color:'var(--text)' }}>Verifying your sign-in</h1>
          <p style={{ color:'var(--text-3)', fontSize:14 }}>Just a moment…</p>
        </>)}
        {status==='success' && (<>
          <div style={{ width:64, height:64, margin:'0 auto 20px', borderRadius:16, background:'var(--accent-dim)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:32 }}>✅</span>
          </div>
          <h1 style={{ fontSize:22, fontWeight:900, letterSpacing:'-0.04em', marginBottom:10, color:'var(--accent)' }}>Device verified!</h1>
          <p style={{ color:'var(--text-3)', fontSize:14 }}>Redirecting to your dashboard…</p>
        </>)}
        {status==='error' && (<>
          <div style={{ width:64, height:64, margin:'0 auto 20px', borderRadius:16, background:'rgba(239,68,68,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:32 }}>❌</span>
          </div>
          <h1 style={{ fontSize:22, fontWeight:900, letterSpacing:'-0.04em', marginBottom:10, color:'var(--text)' }}>Verification failed</h1>
          <p style={{ color:'var(--text-2)', fontSize:14, marginBottom:24 }}>{message}</p>
          <a href="/login" className="btn btn-primary" style={{ display:'inline-block', textDecoration:'none' }}>Back to sign in →</a>
        </>)}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
    </>
  );
}
