// components/ServiceGrid.js
import { useState } from 'react';
import Link from 'next/link';
import { SERVICES } from '../constants';
import ServiceLogo from './ServiceLogo';

export default function ServiceGrid() {
  const [search, setSearch] = useState('');
  const filtered = SERVICES.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <section id="services" style={{ padding: '120px 0', background: '#fff' }}>
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 540 }}>
            <div className="section-tag" style={{ display: 'inline-flex' }}>Platform Integration</div>
            <h2 className="section-h2">Available on 200+ platforms</h2>
            <p className="section-lead">Instantly receive SMS verification codes for any major service worldwide.</p>
          </div>
          <div style={{ position: 'relative' }}>
            <input className="input" type="search" placeholder="Search platforms..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: 280, paddingLeft: '44px' }} />
            <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }}>🔍</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
          {filtered.slice(0, 24).map(s => (
            <Link key={s.id} href="/dashboard" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1.5px solid var(--slate-100)', borderRadius: 20, padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-200)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(107,33,168,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--slate-100)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                <ServiceLogo service={s.id} size={54} />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--slate-900)', marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--primary-600)', fontWeight: 800 }}>From ${s.price}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 24 }}>📡</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--slate-400)' }}>Platform not found</h3>
            <p style={{ color: 'var(--slate-500)', fontSize: 15 }}>Try searching for a different keyword or browse all platforms.</p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/dashboard"><button className="btn-outline-purple">Browse 200+ more platforms →</button></Link>
        </div>
      </div>
    </section>
  );
}
