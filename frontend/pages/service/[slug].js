import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ServiceLogo from '../../components/ServiceLogo';
import { SERVICES, COUNTRIES, BASE_URL, getServiceBySlug } from '../../utils/seoData';

export async function getStaticPaths() {
  const paths = SERVICES.map(s => ({ params: { slug: s.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return { notFound: true };

  // Pick a subset of countries for this service
  const serviceCountries = COUNTRIES.slice(0, service.countries > COUNTRIES.length ? COUNTRIES.length : Math.min(service.countries, 30));

  return {
    props: { service, serviceCountries },
    revalidate: 3600,
  };
}

export default function ServicePage({ service, serviceCountries }) {
  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How to get a virtual number for ${service.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Sign up at RingSlot, deposit funds via crypto, select ${service.name} from the service list, choose a country, and monitor for the OTP during the activation window. Prices start from $0.10 subject to inventory.`,
        },
      },
      {
        '@type': 'Question',
        name: `Which countries support ${service.name} verification?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `RingSlot lists multiple selectable countries for ${service.name}. Live inventory is checked when an activation is requested and is not guaranteed.`,
        },
      },
      {
        '@type': 'Question',
        name: `How much does ${service.name} SMS verification cost?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${service.name} virtual numbers start from $0.10 per activation. Current pricing and inventory vary by country and provider.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is ${service.name} verification instant?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Delivery time varies by the sending platform, carrier, country, and provider. An assigned number does not guarantee that a third-party platform will accept it.`,
        },
      },
    ],
  };

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${BASE_URL}/service/${service.slug}` },
    ],
  };

  const schemaService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} Virtual Number`,
    description: service.description,
    provider: { '@type': 'Organization', name: 'RingSlot', url: BASE_URL },
    areaServed: 'Worldwide',
  };

  return (
    <>
      <Head>
        <title>{service.name} SMS Verification - Virtual Number for {service.name} | RingSlot</title>
        <meta name="description" content={`Request a virtual phone number for authorized ${service.name} verification. Live country inventory and pricing are checked at purchase.`} />
        <meta name="keywords" content={`${service.name} verification, ${service.name} virtual number, ${service.name} OTP code, ${service.name} SMS, receive ${service.name} code online`} />
        <link rel="canonical" href={`${BASE_URL}/service/${service.slug}`} />
        <meta property="og:title" content={`${service.name} SMS Verification - Virtual Number | RingSlot`} />
        <meta property="og:description" content={`${service.name} virtual number activations, subject to live country and provider inventory.`} />
        <meta property="og:url" content={`${BASE_URL}/service/${service.slug}`} />
        <meta property="og:type" content="product" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }} />
      </Head>

      <div className="page">
        <Navbar />

        <main style={{ paddingTop: 68 }}>
          {/* Breadcrumb */}
          <div style={{ padding: '16px 0 0', background: 'var(--surface-2)' }}>
            <div className="wrap">
              <nav style={{ fontSize: 13, color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
                <span>/</span>
                <Link href="/services" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Services</Link>
                <span>/</span>
                <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>{service.name}</span>
              </nav>
            </div>
          </div>

          {/* Hero */}
          <section style={{ padding: '40px 0 48px', background: 'linear-gradient(180deg, var(--surface-2), #fafafa)' }}>
            <div className="wrap">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                  <ServiceLogo serviceKey={service.slug} displayName={service.name} size={50} />
                </div>
                <div>
                  <h1 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.15, margin: 0 }}>
                    {service.name} SMS Verification
                  </h1>
                  <p style={{ fontSize: 14, color: 'var(--text-3)', marginTop: 4 }}>
                    Multiple selectable countries
                  </p>
                </div>
              </div>
              <p style={{ fontSize: 18, color: 'var(--text-2)', lineHeight: 1.75, maxWidth: 640 }}>
                {service.description} Country availability and delivery depend on live provider inventory and the sending platform.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <Link href="/register">
                  <button className="btn-purple">Get {service.name} number</button>
                </Link>
                <Link href="/pricing">
                  <button className="btn-outline-purple">View pricing</button>
                </Link>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section style={{ padding: '48px 0', borderBottom: '1px solid var(--border)' }}>
            <div className="wrap">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
                {[
                  { label: 'Countries', value: 'Live inventory' },
                  { label: 'Starting price', value: '$0.10' },
                  { label: 'Avg delivery', value: '<15 sec' },
                  { label: 'Success rate', value: '97%+' },
                ].map(stat => (
                  <div key={stat.label} className="card" style={{ textAlign: 'center', padding: 20 }}>
                    <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: 'var(--primary-600)', marginBottom: 4 }}>{stat.value}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 500 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Available countries */}
          <section style={{ padding: '56px 0' }}>
            <div className="wrap">
              <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 12 }}>Countries</div>
              <h2 className="section-h2" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                Available Countries for {service.name}
              </h2>
              <p className="section-lead" style={{ marginBottom: 32 }}>
                Select a country to receive {service.name} verification codes from that region.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                {serviceCountries.map(country => (
                  <Link key={country.slug} href={`/country/${country.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                      <span style={{ fontSize: 24 }}>{country.flag}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{country.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{country.phoneCode}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* API Example */}
          <section style={{ padding: '56px 0', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
            <div className="wrap">
              <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 12 }}>API</div>
              <h2 className="section-h2" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                Automate {service.name} Verification
              </h2>
              <p className="section-lead" style={{ marginBottom: 32 }}>
                Use our REST API to programmatically get numbers and receive {service.name} codes.
              </p>

              <div className="card" style={{ background: 'var(--slate-900)', border: 'none', overflow: 'hidden' }}>
                <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
                  <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'JetBrains Mono, monospace' }}>request.sh</span>
                </div>
                <pre style={{ margin: 0, padding: 24, fontSize: 13, lineHeight: 1.8, color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', overflowX: 'auto' }}>
{`# Get a number for ${service.name}
curl -X POST https://ringslot-backend.onrender.com/api/orders/buy \\
  -H "X-API-Key: rs_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service": "${service.slug}",
    "country": "US"
  }'

# Response
{
  "orderId": "00000000-0000-0000-0000-000000000000",
  "number": "+1234567890",
  "service": "${service.slug}",
  "status": "waiting",
  "price": 0.10
}`}
                </pre>
              </div>

              <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
                <Link href="/api-docs">
                  <button className="btn-purple" style={{ padding: '12px 24px', fontSize: 14 }}>Full API docs</button>
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section style={{ padding: '56px 0' }}>
            <div className="wrap">
              <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 12 }}>FAQ</div>
              <h2 className="section-h2" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                Frequently Asked Questions
              </h2>

              <div style={{ maxWidth: 720, marginTop: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  {
                    q: `How to get a virtual number for ${service.name}?`,
                    a: `Sign up at RingSlot, deposit funds via crypto, select ${service.name} from the service list, choose a country, and monitor for the OTP during the activation window. Prices start from $0.10 subject to inventory.`,
                  },
                  {
                    q: `Which countries support ${service.name} verification?`,
                    a: `RingSlot lists multiple selectable countries for ${service.name}. Live inventory is checked when an activation is requested and is not guaranteed.`,
                  },
                  {
                    q: `How much does ${service.name} SMS verification cost?`,
                    a: `${service.name} virtual numbers start from $0.10 per activation. Current pricing and inventory vary by country and provider.`,
                  },
                  {
                    q: `Is ${service.name} verification instant?`,
                    a: `Delivery time varies by the sending platform, carrier, country, and provider. An assigned number does not guarantee that a third-party platform will accept it.`,
                  },
                ].map((faq, i) => (
                  <div key={i} className="card" style={{ padding: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{faq.q}</h3>
                    <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Related services */}
          <section style={{ padding: '48px 0 64px', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
            <div className="wrap">
              <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>
                Other Popular Services
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {SERVICES.filter(s => s.slug !== service.slug).slice(0, 8).map(s => (
                  <Link key={s.slug} href={`/service/${s.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                      <span style={{ fontSize: 20 }}>{s.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{s.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
