import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import ServiceLogo from '../components/ServiceLogo';
import COUNTRIES, { getBaseCountry } from '../components/CountrySelect';
import api from '../utils/api';

const TABS = [
  { label: 'Buy number', value: 0 },
  { label: 'Orders', value: 2 },
  { label: 'API key', value: 3 },
];

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted]   = useState(false);
  const [tab, setTab]           = useState(0);
  const [balance, setBalance]   = useState(0);
  const [services, setServices] = useState([]);
  const [svcLoading, setSvcLoading] = useState(true);
  const [orders, setOrders]     = useState([]);
  const [user, setUser]         = useState(null);

  const [rentService, setRentService]   = useState('');
  const [rentCountry, setRentCountry]   = useState('any');
  const [rentDuration, setRentDuration] = useState('30');
  const [rentLoading, setRentLoading]   = useState(false);
  const [rentError, setRentError]       = useState('');
  const [rentResult, setRentResult]     = useState(null);
  const [rentSearch, setRentSearch]     = useState('');

  const [search, setSearch]     = useState('');
  const [service, setService]   = useState('');
  const [country, setCountry]   = useState('any');
  const [ctySearch, setCtySearch] = useState('');
  const [showDrop, setShowDrop] = useState(false);
  const [dropPos, setDropPos]   = useState({ top:0, left:0, width:300 });
  const [buyLoading, setBuyLoading] = useState(false);
  const [buyError, setBuyError] = useState('');
  const [needsDeposit, setNeedsDeposit] = useState(false);

  const [order, setOrder]       = useState(null);
  const [copied, setCopied]     = useState('');
  const [focus, setFocus]       = useState(false);
  const [countdown, setCountdown] = useState(0);

  const cdRef   = useRef(null);
  const pollRef = useRef(null);
  const ctyRef  = useRef(null);
  const dropRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    try {
      const u = JSON.parse(localStorage.getItem('rs_user') || 'null');
      if (!u) { router.push('/login'); return; }
      setUser(u);
    } catch { router.push('/login'); return; }
    loadAll();

    const onDown = (e) => {
      if (ctyRef.current?.contains(e.target) || dropRef.current?.contains(e.target)) return;
      setShowDrop(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  async function loadAll() {
    try { const r = await api.get('/wallet/balance'); setBalance(r.data.balance); } catch {}
    try { const r = await api.get('/services'); setServices(r.data); } catch {} finally { setSvcLoading(false); }
    try { const r = await api.get('/orders'); setOrders(r.data); } catch {}
  }

  async function handleBuy(e) {
    e.preventDefault();
    if (!service) return setBuyError('Please select a service');
    setBuyLoading(true); setBuyError(''); setNeedsDeposit(false);
    try {
      const ctry = getBaseCountry(country);
      const res  = await api.post('/orders/buy', { service, country: ctry });
      if (res.status !== 200 && res.status !== 201) {
        setBuyLoading(false);
        return setBuyError(res.data?.error || 'Purchase failed — check balance');
      }
      setOrder(res.data); setFocus(true); setCountdown(600);
      clearInterval(cdRef.current);
      cdRef.current = setInterval(() => setCountdown(p => {
        if (p <= 1) { clearInterval(cdRef.current); return 0; } return p - 1;
      }), 1000);
      poll(res.data.orderId);
      try { const r = await api.get('/wallet/balance'); setBalance(r.data.balance); } catch {}
      try { const r = await api.get('/orders'); setOrders(r.data); } catch {}
    } catch (err) {
      if (err.response?.status === 402) setNeedsDeposit(true);
      setBuyError(err.response?.data?.error || err.message || 'Purchase failed');
    }
    setBuyLoading(false);
  }

  function poll(id) {
    clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      try {
        const r = await api.get('/orders/sms?id=' + id);
        setOrder(p => ({ ...p, ...r.data }));
        if (['received','cancelled','expired'].includes(r.data.status)) {
          clearInterval(pollRef.current); setFocus(false);
          try { const b = await api.get('/wallet/balance'); setBalance(b.data.balance); } catch {}
          try { const o = await api.get('/orders'); setOrders(o.data); } catch {}
        }
      } catch {}
    }, 5000);
  }

  useEffect(() => () => { clearInterval(pollRef.current); clearInterval(cdRef.current); }, []);

  async function cancel(id) {
    try {
      await api.post('/orders/cancel', { id });
      setOrder(null); setFocus(false);
      clearInterval(pollRef.current); clearInterval(cdRef.current); setCountdown(0);
      try { const r = await api.get('/wallet/balance'); setBalance(r.data.balance); } catch {}
      try { const r = await api.get('/orders'); setOrders(r.data); } catch {}
    } catch (err) { setBuyError(err.response?.data?.error || err.message || 'Cancel failed'); }
  }

  function copy(text, key) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key); setTimeout(() => setCopied(''), 2000);
  }

  function openDrop() {
    if (!ctyRef.current) return;
    const r = ctyRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - r.bottom;
    setDropPos({ top: spaceBelow >= 320 ? r.bottom + 4 : r.top - 324, left: r.left, width: r.width });
    setShowDrop(v => !v);
  }

  async function handleRent(e) {
    e.preventDefault();
    if (!rentService) return setRentError('Please select a service');
    setRentLoading(true); setRentError('');
    try {
      const res = await api.post('/orders/rent', {
        service: rentService,
        country: rentCountry,
        duration: parseInt(rentDuration),
      });
      if (res.status === 200 && res.data?.number) {
        setRentResult(res.data);
        try { const b = await api.get('/wallet/balance'); setBalance(b.data.balance); } catch {}
      } else {
        setRentError(res.data?.error || 'Rental failed. Check your balance.');
      }
    } catch (err) { setRentError(err.response?.data?.error || err.message || 'Rental failed'); }
    setRentLoading(false);
  }

  const filtered  = services.filter(s =>
    s.display_name.toLowerCase().includes(search.toLowerCase()) ||
    s.service_key.toLowerCase().includes(search.toLowerCase())
  );
  const filteredC = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(ctySearch.toLowerCase()) ||
    c.code.toLowerCase().includes(ctySearch.toLowerCase())
  );
  const selC  = COUNTRIES.find(c => c.code === country) || COUNTRIES[0];
  const selS  = services.find(s => s.service_key === service);
  const rentLabel = rentDuration === '365' ? '1 Year'
    : rentDuration === '30' ? '1 Month'
    : rentDuration + ' Days';

  if (!mounted) return <Head><title>Dashboard — RingSlot</title><meta name="robots" content="noindex, nofollow" /></Head>;

  const tag = { fontSize:10, color:'var(--text-3)', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase' };

  return (
    <div className="page">
      <Head><title>Dashboard — RingSlot</title><meta name="robots" content="noindex, nofollow" /></Head>
      <Navbar />
      <div className="wrap" style={{ paddingTop:108, paddingBottom:60 }}>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32, flexWrap:'wrap', gap:16 }}>
          <div>
            <h1 style={{ fontSize:'clamp(22px,4vw,32px)', fontWeight:900, letterSpacing:'-0.04em', marginBottom:4, color:'var(--text)' }}>Dashboard</h1>
            <p style={{ color:'var(--text-3)', fontSize:13 }}>{user?.email}</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
            <div style={{ padding:'10px 18px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, display:'flex', alignItems:'center', gap:10 }}>
              <span style={tag}>BALANCE</span>
              <span style={{ fontSize:22, color:'var(--accent)', fontFamily:'JetBrains Mono,monospace', fontWeight:700, letterSpacing:'-0.03em' }}>
                ${parseFloat(balance).toFixed(4)}
              </span>
            </div>
            <button className="btn btn-primary" onClick={() => router.push('/deposit')}>+ Deposit</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {TABS.map(({ label, value }) => (
            <button key={value} className={'tab' + (tab === value ? ' active' : '')} onClick={() => setTab(value)}>{label}</button>
          ))}
        </div>

        {/* BUY TAB */}
        {tab === 0 && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>

            <div className="card fade-up" style={{ opacity: focus ? 0.4 : 1, transition:'opacity .3s' }}>
              <h2 style={{ fontSize:16, fontWeight:700, marginBottom:20, letterSpacing:'-0.02em', color:'var(--text)' }}>Get a number</h2>
              {buyError && (
                <div className="alert alert-error" style={{ marginBottom:16 }}>
                  <div>{buyError}</div>
                  {needsDeposit && (
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => router.push('/deposit')} style={{ marginTop:10 }}>
                      Deposit funds
                    </button>
                  )}
                </div>
              )}

              <form onSubmit={handleBuy}>
                <div className="field">
                  <label className="label">Service</label>
                  <input className="input" placeholder="Search services..." value={search}
                    onChange={e => setSearch(e.target.value)} style={{ marginBottom:8 }} />
                  {selS ? (
                    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'var(--accent-dim)', border:'1px solid var(--accent-border)', borderRadius:8, marginBottom:8 }}>
                      <ServiceLogo serviceKey={selS.service_key} displayName={selS.display_name} size={24} />
                      <span style={{ fontWeight:600, fontSize:14, color:'var(--accent)', flex:1 }}>{selS.display_name}</span>
                      <button type="button" onClick={() => setService('')} style={{ background:'none', border:'none', color:'var(--text-3)', cursor:'pointer', fontSize:18, lineHeight:1 }}>x</button>
                    </div>
                  ) : (
                    <div style={{ maxHeight:220, overflowY:'auto', border:'1px solid var(--border)', borderRadius:10, background:'var(--surface-2)' }}>
                      {svcLoading
                        ? <div style={{ padding:16, textAlign:'center', color:'var(--text-3)', fontSize:13 }}>Loading services...</div>
                        : filtered.length === 0
                          ? <div style={{ padding:16, textAlign:'center', color:'var(--text-3)', fontSize:13 }}>{search ? 'No results for "' + search + '"' : 'No services found'}</div>
                          : filtered.map(s => (
                              <button key={s.service_key} type="button"
                                onClick={() => { setService(s.service_key); setSearch(''); }}
                                style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'10px 14px', background:'none', border:'none', borderBottom:'1px solid var(--border)', cursor:'pointer', textAlign:'left', color:'var(--text)' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-3)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                                <ServiceLogo serviceKey={s.service_key} displayName={s.display_name} size={24} />
                                <span style={{ fontSize:13, fontWeight:500, flex:1 }}>{s.display_name}</span>
                              </button>
                            ))
                      }
                    </div>
                  )}
                </div>

                <div className="field" style={{ marginBottom:24 }}>
                  <label className="label">Country</label>
                  <button type="button" ref={ctyRef} onClick={openDrop}
                    style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'11px 14px',
                      background: showDrop ? 'var(--surface)' : 'var(--surface-2)',
                      border: '1px solid ' + (showDrop ? 'var(--accent)' : 'var(--border)'),
                      boxShadow: showDrop ? '0 0 0 3px var(--accent-dim)' : 'none',
                      borderRadius:10, cursor:'pointer', textAlign:'left', transition:'all .15s' }}>
                    <span style={{ fontSize:18 }}>{selC.flag}</span>
                    <span style={{ fontSize:14, color:'var(--text)', fontWeight:500, flex:1 }}>{selC.name}</span>
                    <span style={{ color:'var(--text-3)', fontSize:10, transform: showDrop ? 'rotate(180deg)' : 'none', transition:'transform .2s', display:'inline-block' }}>&#9660;</span>
                  </button>
                </div>

                <button className="btn btn-primary btn-full" type="submit" disabled={buyLoading || !service}>
                  {buyLoading ? (
                    <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation:'rs-spin 0.75s linear infinite' }}>
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                      Securing your number...
                    </span>
                  ) : 'Get number'}
                </button>
              </form>
            </div>

            {/* Active order */}
            <div className="card fade-up" style={{ border: focus ? '1px solid var(--accent-border)' : '1px solid var(--border)', boxShadow: focus ? '0 0 40px rgba(124,58,237,.06)' : 'none', transition:'all .3s' }}>
              <h2 style={{ fontSize:16, fontWeight:700, marginBottom:20, letterSpacing:'-0.02em', color:'var(--text)' }}>Active order</h2>
              {!order ? (
                <div style={{ textAlign:'center', padding:'40px 0', color:'var(--text-3)' }}>
                  <div style={{ fontSize:40, marginBottom:12, opacity:.4 }}>&#128241;</div>
                  <p style={{ fontSize:14 }}>No active order.<br/>Select a service and get started.</p>
                </div>
              ) : (
                <div>
                  <div style={{ padding:'16px 20px', background:'var(--accent-dim)', borderRadius:10, marginBottom:16 }}>
                    <div style={{ ...tag, marginBottom:6 }}>Phone number - enter this in the app</div>
                    <div onClick={() => copy(order.number, 'num')} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'clamp(18px,4vw,24px)', fontWeight:700, color:'var(--accent)', cursor:'pointer' }}>
                      {order.number}
                    </div>
                  </div>

                  {countdown > 0 && order.status === 'waiting' && (
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12, padding:'8px 12px', background:'var(--warning-dim)', border:'1px solid rgba(245,158,11,.15)', borderRadius:8 }}>
                      <span style={{ fontSize:12, color:'var(--text-3)' }}>Auto-refund in</span>
                      <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, color: countdown < 60 ? 'var(--danger)' : 'var(--warning)', fontWeight:700 }}>
                        {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
                      </span>
                    </div>
                  )}

                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                    <div style={{ position:'relative', width:16, height:16, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      {order.status === 'waiting' && (
                        <>
                          <div className="signal-ring" style={{ width:16, height:16 }} />
                          <div className="signal-ring" style={{ width:16, height:16 }} />
                        </>
                      )}
                      <div style={{ width:6, height:6, borderRadius:'50%', background: order.status === 'received' ? 'var(--success)' : order.status === 'waiting' ? 'var(--warning)' : 'var(--danger)', zIndex:1 }} />
                    </div>
                    <span className={'badge badge-' + order.status}>{order.status}</span>
                    {order.status === 'waiting' && <span style={{ fontSize:12, color:'var(--text-3)' }}>Checking every 5s...</span>}
                  </div>

                  {order.otp && (
                    <div style={{ padding:20, background:'var(--accent-dim)', border:'1px solid var(--accent-border)', borderRadius:12, marginBottom:16, textAlign:'center', boxShadow:'0 0 30px rgba(124,58,237,.06)' }}>
                      <div style={{ fontSize:10, color:'var(--accent)', opacity:0.7, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:10 }}>OTP Code - tap to copy</div>
                      <div onClick={() => copy(order.otp, 'otp')} style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'clamp(28px,6vw,44px)', fontWeight:700, color:'var(--accent)', letterSpacing:'.1em', cursor:'pointer' }}>
                        {order.otp}
                      </div>
                    </div>
                  )}

                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => copy(order.number, 'num')}>
                      {copied === 'num' ? '&#10003; Copied' : 'Copy number'}
                    </button>
                    {order.status === 'waiting' && (
                      <button className="btn btn-danger btn-sm" onClick={() => cancel(order.orderId)}>Cancel & refund</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* RENT TAB */}
        {tab === 1 && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
            <div className="card fade-up">
              <h2 style={{ fontSize:16, fontWeight:700, marginBottom:6, letterSpacing:'-0.02em', color:'var(--text)' }}>Rent a number</h2>
              <p style={{ fontSize:13, color:'var(--text-3)', marginBottom:20, lineHeight:1.6 }}>
                Rent a dedicated number for <strong style={{ color:'var(--accent)' }}>1 month to 12 months</strong>. Receive unlimited SMS on the same number. Perfect for long-term account management.
              </p>
              {rentError && <div className="alert alert-error" style={{ marginBottom:16 }}>{rentError}</div>}

              {rentResult ? (
                <div style={{ textAlign:'center', padding:'24px 0' }}>
                  <div style={{ width:48, height:48, borderRadius:'50%', background:'var(--success-dim)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', fontSize:24, color:'var(--success)' }}>&#10003;</div>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:22, fontWeight:700, color:'var(--accent)', marginBottom:8 }}>{rentResult.number}</div>
                  <div style={{ fontSize:13, color:'var(--text-2)', marginBottom:4 }}>Service: <strong>{rentResult.service}</strong></div>
                  <div style={{ fontSize:13, color:'var(--text-2)', marginBottom:4 }}>Expires: <strong>{new Date(rentResult.expiresAt).toLocaleDateString()}</strong></div>
                  <div style={{ fontSize:13, color:'var(--text-2)', marginBottom:20 }}>Paid: <strong style={{ color:'var(--accent)' }}>${rentResult.price}</strong></div>
                  <button className="btn btn-ghost btn-full" onClick={() => { setRentResult(null); setRentService(''); }}>Rent another number</button>
                </div>
              ) : (
                <form onSubmit={handleRent}>
                  <div className="field">
                    <label className="label">Service</label>
                    <input className="input" placeholder="Search services..." value={rentSearch}
                      onChange={e => setRentSearch(e.target.value)} style={{ marginBottom:8 }} />
                    {rentService ? (
                      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'var(--accent-dim)', border:'1px solid var(--accent-border)', borderRadius:8 }}>
                        <span style={{ fontWeight:600, fontSize:14, color:'var(--accent)', flex:1 }}>{rentService}</span>
                        <button type="button" onClick={() => setRentService('')} style={{ background:'none', border:'none', color:'var(--text-3)', cursor:'pointer', fontSize:18, lineHeight:1 }}>x</button>
                      </div>
                    ) : (
                      <div style={{ maxHeight:180, overflowY:'auto', border:'1px solid var(--border)', borderRadius:10, background:'var(--surface-2)' }}>
                        {services.filter(s => s.display_name.toLowerCase().includes(rentSearch.toLowerCase())).slice(0, 20).map(s => (
                          <button key={s.service_key} type="button"
                            onClick={() => { setRentService(s.service_key); setRentSearch(''); }}
                            style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'9px 14px', background:'none', border:'none', borderBottom:'1px solid var(--border)', cursor:'pointer', textAlign:'left', color:'var(--text)' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-3)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                            <span style={{ fontSize:13, fontWeight:500 }}>{s.display_name}</span>
                          </button>
                        ))}
                        {services.filter(s => s.display_name.toLowerCase().includes(rentSearch.toLowerCase())).length === 0 && (
                          <div style={{ padding:12, textAlign:'center', color:'var(--text-3)', fontSize:13 }}>No services found</div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="field" style={{ marginBottom:20 }}>
                    <label className="label">Rental duration</label>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                      {[{val:'30',label:'1 Month'},{val:'60',label:'2 Months'},{val:'90',label:'3 Months'},{val:'180',label:'6 Months'},{val:'270',label:'9 Months'},{val:'365',label:'1 Year'}].map(({ val, label }) => (
                        <button key={val} type="button" onClick={() => setRentDuration(val)}
                          style={{ padding:'10px 8px', borderRadius:10, fontSize:13, fontWeight:600, cursor:'pointer',
                            background: rentDuration === val ? 'var(--accent-dim)' : 'var(--surface-2)',
                            border: '1px solid ' + (rentDuration === val ? 'var(--accent-border)' : 'var(--border)'),
                            color: rentDuration === val ? 'var(--accent)' : 'var(--text-2)',
                            transition:'all .15s' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ padding:'12px 16px', background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:10, marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:13, color:'var(--text-3)' }}>Estimated price</span>
                    <span style={{ fontSize:16, fontWeight:700, color:'var(--accent)', fontFamily:'JetBrains Mono,monospace' }}>
                      ${(parseInt(rentDuration) * 0.15).toFixed(2)}
                    </span>
                  </div>

                  <button type="submit" className="btn btn-primary btn-full" disabled={rentLoading || !rentService}>
                    {rentLoading ? (
                      <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation:'rs-spin 0.75s linear infinite' }}>
                          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"/>
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                        Processing...
                      </span>
                    ) : 'Rent for ' + rentLabel}
                  </button>
                </form>
              )}
            </div>

            <div className="card fade-up">
              <h2 style={{ fontSize:16, fontWeight:700, marginBottom:16, letterSpacing:'-0.02em', color:'var(--text)' }}>How rental works</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {[
                  { icon:'📅', title:'Fixed term', desc:'Your number stays active for the full rental period - 1 month to 1 year.' },
                  { icon:'📨', title:'Unlimited SMS', desc:'Receive as many OTP codes as you need on the same number during the rental.' },
                  { icon:'🔄', title:'Same number', desc:'Perfect for platforms that require the same number for repeated verifications.' },
                  { icon:'↩️', title:'Refund policy', desc:'If no SMS received in first 24 hours, contact support for a refund.' },
                  { icon:'💰', title:'Pricing', desc:'From $4.50/month ($0.15/day). Billed upfront from your balance.' },
                  { icon:'🔌', title:'API support', desc:'Manage rentals via REST API using POST /orders/rent.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                    <span style={{ fontSize:20, flexShrink:0 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:2 }}>{title}</div>
                      <div style={{ fontSize:12, color:'var(--text-3)', lineHeight:1.6 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {tab === 2 && (
          <div className="card fade-up" style={{ padding:0 }}>
            <div style={{ padding:'18px 24px', borderBottom:'1px solid var(--border)' }}>
              <h2 style={{ fontSize:16, fontWeight:700, letterSpacing:'-0.02em', color:'var(--text)' }}>Order history</h2>
            </div>
            {orders.length === 0 ? (
              <div style={{ textAlign:'center', padding:48, color:'var(--text-3)', fontSize:14 }}>No orders yet</div>
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr><th>Service</th><th>Number</th><th>OTP</th><th>Status</th><th>Price</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td>
                          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                            <ServiceLogo serviceKey={o.service} size={22} />
                            <span style={{ fontSize:13 }}>{o.service}</span>
                          </div>
                        </td>
                        <td style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12 }}>{o.phone_number}</td>
                        <td style={{ fontFamily:'JetBrains Mono,monospace', color: o.otp ? 'var(--success)' : 'var(--text-3)', fontSize:13, fontWeight: o.otp ? 700 : 400 }}>{o.otp || '-'}</td>
                        <td><span className={'badge badge-' + o.status}>{o.status}</span></td>
                        <td style={{ color:'var(--accent)', fontFamily:'JetBrains Mono,monospace', fontSize:12 }}>${parseFloat(o.user_price).toFixed(4)}</td>
                        <td style={{ color:'var(--text-3)', fontSize:12 }}>{new Date(o.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* API KEY TAB */}
        {tab === 3 && user && (
          <div className="card fade-up" style={{ maxWidth:560 }}>
            <h2 style={{ fontSize:16, fontWeight:700, marginBottom:6, letterSpacing:'-0.02em', color:'var(--text)' }}>Your API key</h2>
            <p style={{ fontSize:14, color:'var(--text-3)', marginBottom:20 }}>
              Add <code style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, background:'var(--surface-3)', padding:'2px 6px', borderRadius:4 }}>X-API-Key: your_key</code> to authenticate.
            </p>
            <div style={{ display:'flex', gap:8, marginBottom:16 }}>
              <input className="input" style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12 }} value={user.api_key || '-'} readOnly />
              <button className="btn btn-ghost" onClick={() => copy(user.api_key, 'key')} style={{ flexShrink:0 }}>
                {copied === 'key' ? '&#10003;' : 'Copy'}
              </button>
            </div>
            <p style={{ fontSize:13, color:'var(--text-3)' }}>
              Keep secret. See <a href="/api-docs" style={{ color:'var(--accent)' }}>API docs</a>.
            </p>
          </div>
        )}
      </div>

      {/* Country dropdown portal - position:fixed */}
      {showDrop && (
        <div ref={dropRef} style={{
          position:'fixed', zIndex:99999,
          top: dropPos.top, left: dropPos.left, width: dropPos.width,
          background:'var(--surface)', border:'1px solid var(--border)',
          borderRadius:12, boxShadow:'0 20px 60px rgba(0,0,0,.08)', overflow:'hidden',
        }}>
          <div style={{ padding:10 }}>
            <input className="input" placeholder="Search countries..." value={ctySearch}
              onChange={e => setCtySearch(e.target.value)} style={{ fontSize:13 }} autoFocus />
          </div>
          <div style={{ maxHeight:260, overflowY:'auto' }}>
            {filteredC.map(c => (
              <button key={c.code} type="button"
                onClick={() => { setCountry(c.code); setShowDrop(false); setCtySearch(''); }}
                style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'10px 16px',
                  background: country === c.code ? 'var(--accent-dim)' : 'transparent',
                  border:'none', borderBottom:'1px solid var(--border)', cursor:'pointer', textAlign:'left' }}
                onMouseEnter={e => { if (country !== c.code) e.currentTarget.style.background = 'var(--surface-3)'; }}
                onMouseLeave={e => { if (country !== c.code) e.currentTarget.style.background = 'transparent'; }}>
                <span style={{ fontSize:20 }}>{c.flag}</span>
                <div style={{ flex:1 }}>
                  <span style={{ fontSize:13, color: country === c.code ? 'var(--accent)' : 'var(--text)', fontWeight: country === c.code ? 700 : 400 }}>{c.name}</span>
                </div>
                {country === c.code && <span style={{ color:'var(--accent)', flexShrink:0 }}>&#10003;</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
