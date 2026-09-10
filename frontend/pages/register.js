import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import api from '../utils/api';

function PurpleLogo({ size = 34 }) {
  const inner = Math.round(size * 0.7);
  return (
    <div style={{ width:size, height:size, borderRadius:Math.round(size*0.26), background:'linear-gradient(145deg,#7c5cf6,#5b3de8)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 4px 14px rgba(91,61,232,0.4)` }}>
      <svg width={inner} height={inner} viewBox="0 0 20 20" fill="none">
        <rect x="1" y="1" width="8" height="8" rx="2" fill="white"/>
        <rect x="11" y="1" width="8" height="8" rx="2" fill="white"/>
        <rect x="1" y="11" width="8" height="8" rx="2" fill="white"/>
        <rect x="11" y="11" width="8" height="8" rx="2" fill="white" fillOpacity="0.38"/>
      </svg>
    </div>
  );
}

const BLOCKED = new Set(['mailinator.com','guerrillamail.com','tempmail.com','yopmail.com','fakeinbox.com','mailnull.com','trashmail.com','maildrop.cc','getnada.com','10minutemail.com','discard.email','spam4.me']);

function getEmailError(email) {
  if (!email) return '';
  const parts = email.split('@');
  if (parts.length !== 2) return 'Invalid email format';
  const domain = parts[1].toLowerCase();
  if (BLOCKED.has(domain)) return 'Disposable email addresses are not allowed';
  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) return 'Please enter a valid email address';
  return '';
}

export default function Register() {
  const router = useRouter();
  const [form, setForm]         = useState({ email:'', password:'', confirm:'' });
  const [emailError, setEmailError] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    try { if (localStorage.getItem('rs_token')) router.replace('/dashboard'); } catch {}
  }, []);

  const emailOk = form.email.includes('@') && !emailError && !getEmailError(form.email);

  function handleEmailBlur() { if (form.email) setEmailError(getEmailError(form.email)); }

  async function handleSubmit(e) {
    e.preventDefault();
    const emailErr = getEmailError(form.email);
    if (emailErr) { setEmailError(emailErr); return; }
    if (form.password.length < 8) return setError('Password must be at least 8 characters');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/register', { email: form.email.trim().toLowerCase(), password: form.password });
      if (res.status === 201 && res.data?.token) {
        localStorage.setItem('rs_token', res.data.token);
        localStorage.setItem('rs_user', JSON.stringify(res.data.user));
        router.replace('/dashboard');
      } else if (res.status === 409) {
        setError('This email is already registered.');
      } else {
        setError(res.data?.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      if (err.response?.status === 409) setError('This email is already registered.');
      else if (err.response?.status === 429) setError('Too many attempts. Please wait and try again.');
      else setError(err.response?.data?.error || 'Cannot reach server. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div className="page" style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <Head>
        <title>Create Account — RingSlot</title>
        <meta name="robots" content="noindex" />
        <style>{`@keyframes rs-spin{to{transform:rotate(360deg)}}`}</style>
      </Head>

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

      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ width:'100%', maxWidth:420 }}>
          <div style={{ background:'var(--surface)', borderRadius:24, padding:40, boxShadow:'0 24px 64px rgba(147,51,234,0.1)', border:'1px solid var(--border)' }}>
            <div style={{ textAlign:'center', marginBottom:32 }}>
              <h1 className="font-display" style={{ fontSize:28, fontWeight:700, color:'var(--text)', marginBottom:8 }}>Create account</h1>
              <p style={{ color:'var(--text-3)', fontSize:15 }}>Free to start. No credit card required.</p>
            </div>

            {error && <div style={{ background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:10, padding:'12px 16px', marginBottom:20, fontSize:14, color:'#dc2626' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div style={{ marginBottom:14 }}>
                <label style={{ display:'block', fontSize:12, fontWeight:700, color:'var(--text-3)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:6 }}>Email address</label>
                <div style={{ position:'relative' }}>
                  <input className="input" type="email" placeholder="you@example.com" required value={form.email}
                    onChange={e => { setForm(f => ({...f, email:e.target.value})); if (e.target.value.includes('@')) setEmailError(getEmailError(e.target.value)); else setEmailError(''); }}
                    onBlur={handleEmailBlur}
                    style={{ paddingRight:36, borderColor: emailError?'#ef4444':emailOk?'var(--accent)':undefined }} />
                  {form.email && (
                    <div style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', fontSize:14, color: emailOk?'var(--accent)':emailError?'#ef4444':'transparent' }}>
                      {emailOk ? '✓' : emailError ? '✗' : ''}
                    </div>
                  )}
                </div>
                {emailError && <p style={{ fontSize:12, color:'#ef4444', marginTop:5 }}>⚠ {emailError}</p>}
                {emailOk && <p style={{ fontSize:12, color:'var(--accent)', marginTop:5 }}>✓ Valid email address</p>}
              </div>

              {/* Password */}
              <div style={{ marginBottom:14 }}>
                <label style={{ display:'block', fontSize:12, fontWeight:700, color:'var(--text-3)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:6 }}>Password</label>
                <input className="input" type="password" placeholder="At least 8 characters" required value={form.password}
                  onChange={e => setForm(f => ({...f, password:e.target.value}))} />
                {form.password && form.password.length < 8 && <p style={{ fontSize:12, color:'#f59e0b', marginTop:5 }}>{8-form.password.length} more characters needed</p>}
              </div>

              {/* Confirm */}
              <div style={{ marginBottom:28 }}>
                <label style={{ display:'block', fontSize:12, fontWeight:700, color:'var(--text-3)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:6 }}>Confirm password</label>
                <input className="input" type="password" placeholder="Repeat your password" required value={form.confirm}
                  onChange={e => setForm(f => ({...f, confirm:e.target.value}))}
                  style={{ borderColor: form.confirm&&form.confirm!==form.password?'#ef4444':form.confirm&&form.confirm===form.password?'var(--accent)':undefined }} />
                {form.confirm && form.confirm !== form.password && <p style={{ fontSize:12, color:'#ef4444', marginTop:5 }}>Passwords do not match</p>}
                {form.confirm && form.confirm === form.password && <p style={{ fontSize:12, color:'var(--accent)', marginTop:5 }}>✓ Passwords match</p>}
              </div>

              <button type="submit" className="btn btn-primary" style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }} disabled={loading || !!emailError || !emailOk}>
                {loading ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation:'rs-spin .75s linear infinite' }}><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/><path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>Creating account…</>) : 'Create account →'}
              </button>
            </form>

            <p style={{ fontSize:12, color:'var(--text-3)', textAlign:'center', marginTop:16, lineHeight:1.6 }}>
              By creating an account you agree to our <Link href="/terms">Terms</Link>, <Link href="/acceptable-use">Acceptable Use Policy</Link>, and <Link href="/privacy">Privacy Policy</Link>. Disposable email addresses are not accepted.
            </p>

            <p style={{ textAlign:'center', marginTop:20, fontSize:14, color:'var(--text-3)' }}>
              Already have an account?{' '}<Link href="/login" style={{ color:'var(--accent)', fontWeight:700, textDecoration:'none' }}>Sign in →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
