import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { COUNTRIES, BASE_URL } from '../utils/seoData';

const REGIONS = [
  { id: 'all', label: 'All' },
  { id: 'europe', label: 'Europe' },
  { id: 'asia', label: 'Asia' },
  { id: 'americas', label: 'Americas' },
  { id: 'africa', label: 'Africa & ME' },
  { id: 'oceania', label: 'Oceania' },
];

const REGION_MAP = {
  europe: ['GB', 'DE', 'FR', 'NL', 'RU', 'UA', 'PL', 'ES', 'IT', 'TR', 'SE', 'NO', 'DK', 'FI', 'CH', 'AT', 'BE', 'PT', 'CZ', 'RO', 'HU', 'IE', 'GR'],
  asia: ['IN', 'ID', 'PH', 'VN', 'TH', 'MY', 'JP', 'KR', 'CN', 'SG', 'HK', 'PK', 'BD', 'KZ'],
  americas: ['US', 'CA', 'BR', 'MX', 'AR', 'CO', 'CL', 'PE'],
  africa: ['NG', 'ZA', 'EG', 'KE', 'IL', 'AE', 'SA'],
  oceania: ['AU', 'NZ'],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'RingSlot',
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.svg`,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Countries', item: `${BASE_URL}/countries` },
      ],
    },
    {
      '@type': 'CollectionPage',
      name: 'Supported Countries - Virtual Phone Numbers by Country',
      description: 'Browse 90+ countries selectable for RingSlot virtual number activations. Live inventory varies by service and provider.',
      url: `${BASE_URL}/countries`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: COUNTRIES.length,
        itemListElement: COUNTRIES.slice(0, 10).map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          url: `${BASE_URL}/country/${c.slug}`,
        })),
      },
    },
  ],
};

export default function CountriesPage() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('all');

  const filtered = COUNTRIES.filter(c => {
    const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase()) || c.iso.toLowerCase().includes(query.toLowerCase());
    const matchesRegion = region === 'all' || (REGION_MAP[region] && REGION_MAP[region].includes(c.iso));
    return matchesQuery && matchesRegion;
  });

  return (
    <>
      <Head>
        <title>Supported Countries - Virtual Phone Numbers by Country | RingSlot</title>
        <meta name="description" content="Browse 90+ countries selectable for virtual number activations. Live SMS service inventory and pricing vary by provider." />
        <meta name="keywords" content="virtual number countries, SMS verification country, phone number by country, international virtual numbers, global SMS verification" />
        <link rel="canonical" href={`${BASE_URL}/countries`} />
        <meta property="og:title" content="Supported Countries - Virtual Phone Numbers by Country | RingSlot" />
        <meta property="og:description" content="Browse 90+ selectable countries for virtual number activations, subject to live inventory." />
        <meta property="og:url" content={`${BASE_URL}/countries`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      </Head>

      <div className="page">
        <Navbar />

        <main style={{ paddingTop: 68 }}>
          {/* Hero */}
          <section style={{ padding: '60px 0 40px', background: 'linear-gradient(180deg, var(--primary-50), #fafafa)', textAlign: 'center' }}>
            <div className="wrap">
              <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>Countries</div>
              <h1 className="section-h2">Virtual Numbers from {COUNTRIES.length}+ Countries</h1>
              <p className="section-lead" style={{ margin: '0 auto 32px' }}>
                Choose from 90+ configured countries. Number type, delivery, and inventory vary by upstream provider.
              </p>

              {/* Search */}
              <div style={{ maxWidth: 480, margin: '0 auto 24px' }}>
                <input
                  className="input-light"
                  type="text"
                  placeholder="Search countries... (e.g. United States, Germany)"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  aria-label="Search countries"
                />
              </div>

              {/* Region filter */}
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                {REGIONS.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setRegion(r.id)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 20,
                      border: region === r.id ? '1.5px solid var(--primary-400)' : '1.5px solid var(--border)',
                      background: region === r.id ? 'var(--primary-50)' : '#fff',
                      color: region === r.id ? 'var(--primary-600)' : 'var(--text-2)',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Grid */}
          <section style={{ padding: '48px 0 80px' }}>
            <div className="wrap">
              {(query || region !== 'all') && (
                <p style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 24 }}>
                  {filtered.length} countr{filtered.length !== 1 ? 'ies' : 'y'} found
                </p>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                {filtered.map(country => (
                  <Link key={country.slug} href={`/country/${country.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontSize: 32, lineHeight: 1 }}>{country.flag}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {country.name}
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                          <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace' }}>{country.phoneCode}</span>
                          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Inventory checked live</span>
                        </div>
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--primary-600)', fontWeight: 600 }}>{country.iso}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <p style={{ fontSize: 18, color: 'var(--text-3)' }}>No countries found</p>
                  <p style={{ fontSize: 14, color: 'var(--text-3)', marginTop: 8 }}>
                    Try a different search or{' '}
                    <button onClick={() => { setQuery(''); setRegion('all'); }} style={{ background: 'none', border: 'none', color: 'var(--primary-600)', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                      view all countries
                    </button>
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '64px 0', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
            <div className="wrap" style={{ textAlign: 'center' }}>
              <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
                90+ selectable countries, live inventory
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-2)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
                All numbers are real SIM-based with high delivery rates. Pay with crypto.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/register">
                  <button className="btn-purple">Get started free</button>
                </Link>
                <Link href="/services">
                  <button className="btn-outline-purple">Browse by service</button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
