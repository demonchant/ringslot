import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceLogo from '../components/ServiceLogo';
import { SERVICES, BASE_URL } from '../utils/seoData';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'RingSlot',
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.svg`,
      contactPoint: { '@type': 'ContactPoint', email: 'support@ringslot.shop', contactType: 'customer service', availableLanguage: 'English' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
      ],
    },
    {
      '@type': 'CollectionPage',
      name: 'SMS Verification Services - All Supported Platforms',
      description: 'Browse dozens of services configured for RingSlot virtual number activations. Live country inventory varies by provider.',
      url: `${BASE_URL}/services`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: SERVICES.length,
        itemListElement: SERVICES.slice(0, 10).map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.name,
          url: `${BASE_URL}/service/${s.slug}`,
        })),
      },
    },
  ],
};

export default function ServicesPage() {
  const [query, setQuery] = useState('');

  const filtered = SERVICES.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>SMS Verification Services - All Supported Platforms | RingSlot</title>
        <meta name="description" content="Browse dozens of services configured for RingSlot virtual number activations. Live country inventory and pricing vary by provider." />
        <meta name="keywords" content="SMS verification services, virtual number platforms, OTP services, Telegram verification, WhatsApp verification, Google SMS code" />
        <link rel="canonical" href={`${BASE_URL}/services`} />
        <meta property="og:title" content="SMS Verification Services - All Supported Platforms | RingSlot" />
        <meta property="og:description" content="Browse dozens of configured services. Virtual number country inventory is checked live." />
        <meta property="og:url" content={`${BASE_URL}/services`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      </Head>

      <div className="page">
        <Navbar />

        <main style={{ paddingTop: 68 }}>
          {/* Hero */}
          <section style={{ padding: '60px 0 40px', background: 'linear-gradient(180deg, var(--primary-50), #fafafa)', textAlign: 'center' }}>
            <div className="wrap">
              <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>Services</div>
              <h1 className="section-h2">SMS Verification Service Directory</h1>
              <p className="section-lead" style={{ margin: '0 auto 32px' }}>
                Explore virtual phone number guides for {SERVICES.length}+ services. Delivery and coverage depend on live inventory.
              </p>

              {/* Search */}
              <div style={{ maxWidth: 480, margin: '0 auto' }}>
                <input
                  className="input-light"
                  type="text"
                  placeholder="Search services... (e.g. Telegram, WhatsApp)"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  aria-label="Search services"
                />
              </div>
            </div>
          </section>

          {/* Grid */}
          <section style={{ padding: '48px 0 80px' }}>
            <div className="wrap">
              {query && (
                <p style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 24 }}>
                  {filtered.length} service{filtered.length !== 1 ? 's' : ''} found
                </p>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {filtered.map(service => (
                  <Link key={service.slug} href={`/service/${service.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ height: '100%', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                          <ServiceLogo serviceKey={service.slug} displayName={service.name} size={42} />
                        </div>
                        <div>
                          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: 0, lineHeight: 1.3 }}>{service.name}</h2>
                          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Live country inventory</span>
                        </div>
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6, margin: 0, flex: 1 }}>
                        {service.description}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-600)' }}>From $0.10</span>
                        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>per activation</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <p style={{ fontSize: 18, color: 'var(--text-3)' }}>No services found for "{query}"</p>
                  <p style={{ fontSize: 14, color: 'var(--text-3)', marginTop: 8 }}>Try a different search term or <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', color: 'var(--primary-600)', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>view all services</button></p>
                </div>
              )}
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '64px 0', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
            <div className="wrap" style={{ textAlign: 'center' }}>
              <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
                Need a different service?
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-2)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
                The dashboard contains dozens of configured services. Live provider inventory is checked when you request an activation.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/register">
                  <button className="btn-purple">Get started free</button>
                </Link>
                <Link href="/countries">
                  <button className="btn-outline-purple">Browse by country</button>
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
