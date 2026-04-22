import Link from 'next/link';
import { LogoIcon } from './LogoIcon';

export default function Hero() {
  return (
    <section style={{ padding: '120px 0 80px', overflow: 'hidden', position: 'relative' }}>
      {/* Decors */}
      <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 1000, height: 400, background: 'radial-gradient(circle, rgba(147,51,234,0.06) 0%, transparent 70%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: 12, height: 12, borderRadius: '50%', background: 'var(--primary-200)', opacity: 0.5 }} />
      
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 16px', background: 'var(--primary-50)', border: '1.5px solid var(--primary-100)', borderRadius: 24, fontSize: 13, color: 'var(--primary-600)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 32 }}>
            <span style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--primary-400)', animation: 'pulse 2s infinite', animationDelay: `${i * 0.3}s` }} />)}
            </span>
            Instant Activations Now Available
          </div>

          <h1 className="font-display" style={{ fontSize: 'clamp(44px, 8vw, 84px)', lineHeight: 0.95, fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 28, color: 'var(--slate-900)' }}>
            Elevate Your <span style={{ color: 'var(--primary-600)', position: 'relative' }}>
              Digital Identity
              <svg style={{ position: 'absolute', bottom: -12, left: 0, width: '100%' }} viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                <path d="M1 10.5C50 3.5 150 2.5 299 10.5" stroke="var(--primary-200)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p style={{ fontSize: 'clamp(17px, 2.5vw, 20px)', lineHeight: 1.6, color: 'var(--slate-500)', fontWeight: 500, marginBottom: 44, maxWidth: 640, margin: '0 auto 44px' }}>
            Instant access to secure temporary phone numbers for SMS verification. Fast, affordable, and private. Trusted by 250k+ users.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard"><button className="btn-purple">Get Started Now</button></Link>
            <Link href="#pricing"><button className="btn-outline-purple">View Pricing</button></Link>
          </div>

          <div style={{ marginTop: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', marginRight: -12 }}>
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/user${i}/48/48`} alt="" style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #fff', background: 'var(--slate-100)' }} />
                ))}
                <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #fff', background: 'var(--primary-600)', color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+2.5k</div>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--slate-900)' }}>4.9/5 Rating</div>
                <div style={{ fontSize: 11, color: 'var(--slate-400)', fontWeight: 600 }}>FROM TRUSTED CUSTOMERS</div>
              </div>
            </div>
            
            <div style={{ height: 32, width: 1.5, background: 'var(--slate-100)', display: 'none', md: 'block' }} />

            <div style={{ display: 'flex', gap: 24, opacity: 0.4, filter: 'grayscale(1)' }}>
              {['Amazon', 'Google', 'WhatsApp', 'Telegram'].map(p => (
                <span key={p} style={{ fontWeight: 800, fontSize: 14, letterSpacing: '.05em' }}>{p.toUpperCase()}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
