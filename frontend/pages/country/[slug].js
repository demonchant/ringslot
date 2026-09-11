import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ServiceLogo from '../../components/ServiceLogo';
import { SERVICES, COUNTRIES, BASE_URL, getCountryBySlug } from '../../utils/seoData';

export async function getStaticPaths() {
  const paths = COUNTRIES.map(c => ({ params: { slug: c.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const country = getCountryBySlug(params.slug);
  if (!country) return { notFound: true };

  // Pick a subset of services for this country
  const countryServices = SERVICES.slice(0, Math.min(country.services, SERVICES.length));

  return {
    props: { country, countryServices },
    revalidate: 3600,
  };
}

export default function CountryPage({ country, countryServices }) {
  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Countries', item: `${BASE_URL}/countries` },
      { '@type': 'ListItem', position: 3, name: country.name, item: `${BASE_URL}/country/${country.slug}` },
    ],
  };

  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How to get a ${country.name} virtual phone number?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Sign up at RingSlot, deposit funds via cryptocurrency, select ${country.name} (${country.phoneCode}) from the country list, choose a configured service, and monitor for the OTP during the activation window. Prices start from $0.10 subject to inventory.`,
        },
      },
      {
        '@type': 'Question',
        name: `What services work with ${country.name} numbers?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${country.name} can be selected for RingSlot's configured service catalog. Live inventory is checked by the provider when an activation is requested.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the phone number format for ${country.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${country.name} phone numbers use the ${country.phoneCode} country code. The format is ${country.format}. RingSlot provides real ${country.name} numbers with this format.`,
        },
      },
      {
        '@type': 'Question',
        name: `How much does a ${country.name} virtual number cost?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${country.name} virtual numbers start from $0.10 per activation. Current pricing and inventory vary by service and provider.`,
        },
      },
    ],
  };

  const schemaService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${country.name} Virtual Phone Number`,
    description: `Request a virtual phone number from ${country.name} (${country.phoneCode}) for an authorized SMS verification workflow, subject to inventory.`,
    provider: { '@type': 'Organization', name: 'RingSlot', url: BASE_URL },
  };

  return (
    <>
      <Head>
        <title>{`${country.name} Virtual Phone Number - ${country.phoneCode} SMS Verification | RingSlot`}</title>
        <meta name="description" content={`Request a ${country.name} (${country.phoneCode}) virtual phone number for authorized SMS verification. Live service inventory and pricing are checked at purchase.`} />
        <meta name="keywords" content={`${country.name} virtual number, ${country.name} phone number, ${country.phoneCode} SMS verification, ${country.name} OTP, buy ${country.name} number`} />
        <link rel="canonical" href={`${BASE_URL}/country/${country.slug}`} />
        <meta property="og:title" content={`${country.name} Virtual Phone Number - SMS Verification | RingSlot`} />
        <meta property="og:description" content={`${country.name} (${country.phoneCode}) virtual number activations, subject to live provider inventory.`} />
        <meta property="og:url" content={`${BASE_URL}/country/${country.slug}`} />
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
                <Link href="/countries" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Countries</Link>
                <span>/</span>
                <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>{country.name}</span>
              </nav>
            </div>
          </div>

          {/* Hero */}
          <section style={{ padding: '40px 0 48px', background: 'linear-gradient(180deg, var(--surface-2), #fafafa)' }}>
            <div className="wrap">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <span style={{ fontSize: 56, lineHeight: 1 }}>{country.flag}</span>
                <div>
                  <h1 className="font-display" style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.15, margin: 0 }}>
                    {country.name} Virtual Numbers
                  </h1>
                  <p style={{ fontSize: 14, color: 'var(--text-3)', marginTop: 4 }}>
                    Country code: {country.phoneCode} | ISO: {country.iso}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: 18, color: 'var(--text-2)', lineHeight: 1.75, maxWidth: 640 }}>
                Request virtual phone numbers from {country.name} for authorized SMS verification. Inventory varies by service and provider.
                One-time SMS activations subject to live inventory and third-party delivery.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <Link href="/register">
                  <button className="btn-purple">Get {country.name} number</button>
                </Link>
                <Link href="/pricing">
                  <button className="btn-outline-purple">View pricing</button>
                </Link>
              </div>
            </div>
          </section>

          {/* Country info */}
          <section style={{ padding: '48px 0', borderBottom: '1px solid var(--border)' }}>
            <div className="wrap">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                {[
                  { label: 'Country code', value: country.phoneCode },
                  { label: 'Number format', value: country.format },
                  { label: 'Catalog', value: 'Dozens of services' },
                  { label: 'Starting price', value: '$0.10' },
                ].map(info => (
                  <div key={info.label} className="card" style={{ padding: 20 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{info.label}</div>
                    <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>{info.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Available services */}
          <section style={{ padding: '56px 0' }}>
            <div className="wrap">
              <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 12 }}>Services</div>
              <h2 className="section-h2" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                Available Services in {country.name}
              </h2>
              <p className="section-lead" style={{ marginBottom: 32 }}>
                Use {country.name} ({country.phoneCode}) numbers with any of these platforms.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                {countryServices.map(service => (
                  <Link key={service.slug} href={`/service/${service.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                        <ServiceLogo serviceKey={service.slug} displayName={service.name} size={34} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{service.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>From $0.10</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing info */}
          <section style={{ padding: '56px 0', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
            <div className="wrap">
              <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 12 }}>Pricing</div>
              <h2 className="section-h2" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                {country.name} Number Pricing
              </h2>
              <p className="section-lead" style={{ marginBottom: 32 }}>
                Transparent pricing for {country.name} virtual numbers. No hidden fees.
              </p>

              <div style={{ maxWidth: 520 }}>
                <div className="card" style={{ padding: 28 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary-600)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>One-time activation</div>
                  <div className="font-display" style={{ fontSize: 36, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>$0.10<span style={{ fontSize: 16, color: 'var(--text-3)', fontWeight: 400 }}> / code</span></div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {['Receive one OTP code', '10-minute activation window', 'Automatic wallet refund if eligible and no SMS arrives', 'Inventory varies by service'].map(item => (
                      <li key={item} style={{ fontSize: 14, color: 'var(--text-2)', padding: '8px 0', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: 'var(--success)', fontSize: 14 }}>&#10003;</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
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
                    q: `How to get a ${country.name} virtual phone number?`,
                    a: `Sign up at RingSlot, deposit funds via cryptocurrency, select ${country.name} (${country.phoneCode}) from the country list, choose a configured service, and monitor for the OTP during the activation window. Prices start from $0.10 subject to inventory.`,
                  },
                  {
                    q: `What services work with ${country.name} numbers?`,
                    a: `${country.name} can be selected for RingSlot's configured service catalog. Live inventory is checked by the provider when an activation is requested.`,
                  },
                  {
                    q: `What is the phone number format for ${country.name}?`,
                    a: `${country.name} phone numbers use the ${country.phoneCode} country code. The format is ${country.format}. RingSlot provides real ${country.name} numbers with this format.`,
                  },
                  {
                    q: `How much does a ${country.name} virtual number cost?`,
                    a: `${country.name} virtual numbers start from $0.10 per activation. Current pricing and inventory vary by service and upstream provider.`,
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

          {/* Related countries */}
          <section style={{ padding: '48px 0 64px', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
            <div className="wrap">
              <h2 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>
                Other Popular Countries
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {COUNTRIES.filter(c => c.slug !== country.slug).slice(0, 8).map(c => (
                  <Link key={c.slug} href={`/country/${c.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                      <span style={{ fontSize: 22 }}>{c.flag}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{c.name}</span>
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
