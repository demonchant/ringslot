import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const COINS = {
  usdttrc20: { name: 'USDT TRC20', short: 'USDT', sub: 'TRC20', color: '#26a17b', recommended: true },
  btc:       { name: 'Bitcoin',    short: 'BTC',  sub: '',      color: '#f7931a' },
  eth:       { name: 'Ethereum',   short: 'ETH',  sub: '',      color: '#627eea' },
  ltc:       { name: 'Litecoin',   short: 'LTC',  sub: '',      color: '#bfbbbb' },
  usdc:      { name: 'USD Coin',   short: 'USDC', sub: '',      color: '#2775ca' },
  trx:       { name: 'TRON',       short: 'TRX',  sub: '',      color: '#ef0027' },
  usdterc20: { name: 'USDT ERC20', short: 'USDT', sub: 'ERC20', color: '#26a17b' },
};

const MIN = 20;
const PRESETS = ['20', '30', '50', '100', '200'];

const STATUS = {
  waiting:    { label: 'Waiting for payment',   color: 'var(--warning)' },
  confirming: { label: 'Confirming on-chain',   color: 'var(--info)'    },
  finished:   { label: 'Payment complete!',     color: 'var(--success)' },
  failed:     { label: 'Payment failed',        color: 'var(--danger)'  },
  expired:    { label: 'Payment expired',       color: 'var(--danger)'  },
};

function QRImage({ value, size = 180 }) {
  const [src, setSrc] = useState('');
  const [err, setErr] = useState(0);

  const sources = [
    `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&margin=10`,
    `https://quickchart.io/qr?text=${encodeURIComponent(value)}&size=${size}&margin=2`,
  ];

  useEffect(() => {
    if (!value) return;
    setErr(0);
    setSrc(sources[0]);
  }, [value]);

  function handleError() {
    const next = err + 1;
    if (next < sources.length) {
      setErr(next);
      setSrc(sources[next]);
    } else {
      setSrc('');
    }
  }

  if (!value) return null;

  if (!src) {
    return (
      <div style={{ width: size + 20, minHeight: size / 2, background: 'var(--surface-3)', borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 700 }}>Copy address below</span>
        <span style={{ fontSize: 9, color: 'var(--text)', wordBreak: 'break-all', textAlign: 'center', fontFamily: 'monospace', lineHeight: 1.5 }}>{value}</span>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', padding: 10, borderRadius: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
      <img src={src} alt="Scan QR with crypto wallet" width={size} height={size} onError={handleError} style={{ display: 'block' }} />
    </div>
  );
}

export default function Deposit() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep]       = useState('form');
  const [amount, setAmount]   = useState('');
  const [currency, setCurrency] = useState('usdttrc20');
  const [payment, setPayment] = useState(null);
  const [status, setStatus]   = useState('waiting');
  const [copied, setCopied]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const poll = useRef(null);
  const coin = COINS[currency] || COINS.usdttrc20;

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => () => clearInterval(poll.current), []);

  async function create() {
    const amt = parseFloat(amount);
    if (!amount || amt < MIN) return setError(`Minimum deposit is $${MIN}`);
    setLoading(true); setError('');
    try {
      const response = await api.post('/wallet/deposit', { amount: amt, currency });
      if (response.status !== 200 || !response.data?.paymentId) {
        throw new Error(response.data?.error || 'Failed to create payment.');
      }
      const { data } = response;
      setPayment(data);
      setStep('paying');
      poll.current = setInterval(async () => {
        try {
          const { data: s } = await api.get(`/wallet/deposit/${data.paymentId}/status`);
          setStatus(s.status);
          if (s.status === 'finished') { clearInterval(poll.current); setStep('done'); }
          if (['failed','expired'].includes(s.status)) clearInterval(poll.current);
        } catch {}
      }, 8000);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to create payment. Try again.');
    }
    setLoading(false);
  }

  function copy(text, key) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  }

  function reset() {
    clearInterval(poll.current);
    setStep('form'); setPayment(null); setStatus('waiting'); setError(''); setAmount('');
  }

  if (!mounted) return <Head><title>Deposit Funds — RingSlot</title><meta name="robots" content="noindex, nofollow" /></Head>;

  const sc = STATUS[status] || STATUS.waiting;

  return (
    <div className="page">
      <Head><title>Deposit Funds — RingSlot</title><meta name="robots" content="noindex, nofollow" /></Head>
      <Navbar />
      <div className="wrap" style={{ paddingTop: 108, paddingBottom: 60, maxWidth: 600 }}>

        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 'clamp(24px,5vw,36px)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 8, color: 'var(--text)' }}>Deposit funds</h1>
          <p style={{ color: 'var(--text-2)', fontSize: 14 }}>Crypto only - Minimum $20 - Spend-only - No withdrawals</p>
        </div>

        {/* FORM */}
        {step === 'form' && (
          <div className="card fade-up">
            {error && <div className="alert alert-error" style={{ marginBottom: 20 }}>{error}</div>}

            <div className="field">
              <label className="label">Amount (USD)</label>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                {PRESETS.map(v => (
                  <button key={v} onClick={() => setAmount(v)} style={{
                    padding: '8px 16px', borderRadius: 8,
                    border: `1px solid ${amount === v ? 'var(--accent)' : 'var(--border)'}`,
                    background: amount === v ? 'var(--accent-dim)' : 'var(--surface-2)',
                    color: amount === v ? 'var(--accent)' : 'var(--text-2)',
                    fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.15s',
                  }}>${v}</button>
                ))}
              </div>
              <input className="input" type="number" min={MIN} placeholder={`Minimum $${MIN}`}
                value={amount} onChange={e => setAmount(e.target.value)} />
            </div>

            <div className="field" style={{ marginBottom: 28 }}>
              <label className="label">Currency</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {Object.entries(COINS).map(([key, info]) => (
                  <button key={key} onClick={() => setCurrency(key)} style={{
                    padding: '12px 8px', borderRadius: 10, cursor: 'pointer', textAlign: 'center',
                    border: `1px solid ${currency === key ? info.color : 'var(--border)'}`,
                    background: currency === key ? `${info.color}14` : 'var(--surface-2)',
                    transition: 'all 0.15s',
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 800, fontFamily: 'JetBrains Mono', color: currency === key ? info.color : 'var(--text-3)', letterSpacing: '0.02em' }}>{info.short}</div>
                    {info.sub && <div style={{ fontSize: 9, color: 'var(--text-3)', marginTop: 2 }}>{info.sub}</div>}
                    {info.recommended && <div style={{ fontSize: 9, color: 'var(--accent)', marginTop: 2, fontWeight: 700 }}>Recommended</div>}
                  </button>
                ))}
              </div>
              {coin.recommended && <p style={{ fontSize: 12, color: 'var(--accent)', marginTop: 8 }}>Recommended - fastest confirmation</p>}
            </div>

            <button className="btn btn-primary btn-full btn-lg" onClick={create} disabled={loading}>
              {loading ? 'Generating address...' : `Generate ${coin.name} address`}
            </button>
          </div>
        )}

        {/* PAYING */}
        {step === 'paying' && payment && (
          <div className="card fade-up">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: `${sc.color}10`, border: `1px solid ${sc.color}30`, borderRadius: 10, marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: sc.color, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: sc.color, fontWeight: 600 }}>{sc.label}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-3)' }}>Checking every 8s</span>
            </div>

            <div style={{ textAlign: 'center', padding: '20px', background: 'var(--surface-2)', borderRadius: 12, marginBottom: 20 }}>
              <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Send Exactly</div>
              <div style={{ fontSize: 'clamp(20px, 5vw, 30px)', fontWeight: 700, color: coin.color, letterSpacing: '-0.02em', fontFamily: 'JetBrains Mono, monospace' }}>
                {payment.payAmount} {payment.payCurrency?.toUpperCase()}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 6 }}>= ${payment.usdAmount} USD</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, alignItems: 'start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>Scan QR</div>
                <QRImage value={payment.payAddress} size={160} />
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Wallet Address</div>
                <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 12px', fontFamily: 'JetBrains Mono', fontSize: 11, color: 'var(--text-2)', wordBreak: 'break-all', lineHeight: 1.6, marginBottom: 10 }}>
                  {payment.payAddress}
                </div>
                <button className="btn btn-primary btn-sm btn-full" onClick={() => copy(payment.payAddress, 'addr')}>
                  {copied === 'addr' ? 'Copied!' : 'Copy Address'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginBottom: 16, padding: '12px 14px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Amount to send</div>
                <div style={{ fontSize: 15, color: 'var(--text)', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>{payment.payAmount} {payment.payCurrency?.toUpperCase()}</div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => copy(payment.payAmount, 'amt')} style={{ flexShrink: 0 }}>
                {copied === 'amt' ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div style={{ padding: '12px 14px', background: 'var(--warning-dim)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 10, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 16 }}>
              Send the <strong style={{ color: 'var(--text)' }}>exact amount</strong> shown. Different amounts may delay your deposit.
            </div>

            <button className="btn btn-ghost btn-full" onClick={reset}>Start over</button>
          </div>
        )}

        {/* DONE */}
        {step === 'done' && (
          <div className="card fade-up" style={{ textAlign: 'center', padding: '48px 32px' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--success-dim)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28, color: 'var(--success)' }}>&#10003;</div>
            <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 8, letterSpacing: '-0.03em', color: 'var(--text)' }}>Deposit confirmed!</h2>
            <p style={{ color: 'var(--text-2)', marginBottom: 28 }}>${payment?.usdAmount} has been added to your wallet.</p>
            <Link href="/dashboard"><button className="btn btn-primary btn-lg">Go to Dashboard</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}
