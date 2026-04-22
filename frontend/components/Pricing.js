import Link from 'next/link';
import { SERVICES } from '../constants';
import ServiceLogo from './ServiceLogo';

const CATEGORIES = [
  { id: 'social', name: 'Social Media', services: ['telegram', 'whatsapp', 'instagram', 'facebook'] },
  { id: 'ecommerce', name: 'E-Commerce', services: ['amazon', 'ebay', 'aliexpress'] },
  { id: 'it', name: 'IT Services', services: ['google', 'microsoft', 'github', 'openai'] },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: '120px 0', background: 'var(--slate-50)' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-tag">Transparent Pricing</div>
          <h2 className="section-h2">Pay only for what you need</h2>
          <p className="section-lead" style={{ margin: '0 auto' }}>No monthly fees. No subscriptions. Credits never expire.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          {/* Card 1: Features */}
          <div className="card" style={{ padding: 40, border: 'none', boxShadow: '0 20px 60px rgba(0,0,0,0.04)' }}>
            <h3 className="font-display" style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>Everything you need</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Instant code delivery',
                '200+ worldwide services supported',
                '170+ country options',
                'Full REST API access included',
                'Priority customer support',
                'Military-grade privacy'
              ].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, color: 'var(--slate-600)', fontWeight: 500 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--primary-100)', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✓</div>
                  {f}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--slate-100)' }}>
              <div style={{ fontSize: 13, color: 'var(--slate-400)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>Trusted Gateway</div>
              <div style={{ display: 'flex', gap: 16 }}>
                {['Visa', 'Mastercard', 'Crypto', 'USDT'].map(p => (
                  <span key={p} style={{ fontSize: 11, fontWeight: 900, color: 'var(--slate-900)', background: 'var(--slate-100)', padding: '4px 10px', borderRadius: 6 }}>{p}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Sample Pricing */}
          <div className="card" style={{ padding: 40, background: 'var(--primary-600)', color: '#fff', border: 'none', boxShadow: '0 30px 60px rgba(147,51,234,0.2)' }}>
            <h3 className="font-display" style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Sample Rates</h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginBottom: 32, fontWeight: 500 }}>Starting from as low as $0.20 per SMS.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CATEGORIES.map(cat => (
                <div key={cat.id} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.5, marginBottom: 12 }}>{cat.name}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {cat.services.map(sid => {
                      const s = SERVICES.find(sv => sv.id === sid);
                      if (!s) return null;
                      return (
                        <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.08)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <ServiceLogo service={s.id} size={22} inverse={true} />
                            <span style={{ fontSize: 14, fontWeight: 700 }}>{s.name}</span>
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 800 }}>${s.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <button className="btn" style={{ width: '100%', padding: '16px', borderRadius: 16, background: '#fff', color: 'var(--primary-600)', fontWeight: 800, marginTop: 24, fontSize: 16 }}>Launch Dashboard →</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
