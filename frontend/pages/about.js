import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BASE_URL } from '../utils/seoData';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'RingSlot',
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.svg`,
      description: 'RingSlot provides one-time virtual phone number activations for legitimate SMS verification and software testing.',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@ringslot.shop',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${BASE_URL}/about` },
      ],
    },
    {
      '@type': 'WebPage',
      name: 'About RingSlot - Privacy-First SMS Verification',
      description: 'Learn how RingSlot provides one-time virtual number activations for legitimate verification, privacy, and authorized testing.',
      url: `${BASE_URL}/about`,
    },
  ],
};

const STATS = [
  { value: '90+', label: 'Selectable countries' },
  { value: 'Dozens', label: 'Configured services' },
  { value: '10 min', label: 'Activation window' },
  { value: '5 sec', label: 'Dashboard polling' },
];

const STEPS = [
  {
    number: 1,
    title: 'Create Account',
    description: 'Sign up in seconds with just an email. No personal phone number required to get started.',
  },
  {
    number: 2,
    title: 'Add Funds',
    description: 'Deposit at least $20 USD equivalent using a currency currently offered by our payment processor.',
  },
  {
    number: 3,
    title: 'Get Verified',
    description: 'Choose your service and country. Delivery time and availability depend on the sending platform and live provider inventory.',
  },
];

const TECH = [
  {
    title: 'Global SMS Infrastructure',
    description: 'The dashboard offers 90+ selectable countries and checks live inventory across enabled upstream providers.',
  },
  {
    title: 'Real-Time Delivery',
    description: 'The dashboard checks every five seconds while an activation is waiting. Actual SMS delivery time is controlled by third parties.',
  },
  {
    title: 'REST API',
    description: 'API-key access supports configured service discovery, activation purchases, OTP polling, cancellations, order history, and wallet balance checks.',
  },
  {
    title: 'Redundant Providers',
    description: 'The router compares enabled providers and tries another healthy integration when an acquisition attempt fails.',
  },
];

const FEATURES = [
  {
    title: 'Privacy First',
    description: 'No personal phone number needed. Keep your real number private and protect your identity across all online platforms.',
  },
  {
    title: 'Dashboard Delivery',
    description: 'OTP polling begins after purchase. Arrival time varies, and eligible expired orders are refunded to the wallet.',
  },
  {
    title: 'Global Coverage',
    description: '90+ countries are selectable. Live availability depends on the service, country, and upstream inventory.',
  },
  {
    title: 'Fair Pricing',
    description: 'Configured prices start from $0.10 per activation. The displayed price can vary with the service, country, and inventory.',
  },
  {
    title: 'Developer Friendly',
    description: 'A REST API and working cURL examples support approved automation and testing workflows.',
  },
  {
    title: 'No Subscriptions',
    description: 'One-time activations have no recurring subscription charge. Deposit and balance terms are explained in the published policies.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About RingSlot - Privacy-First SMS Verification</title>
        <meta name="description" content="Learn how RingSlot provides one-time virtual number activations across 90+ selectable countries and dozens of configured services." />
        <meta name="keywords" content="about RingSlot, SMS verification company, virtual phone number provider, privacy SMS verification, OTP service provider" />
        <link rel="canonical" href={`${BASE_URL}/about`} />
        <meta property="og:title" content="About RingSlot - Privacy-First SMS Verification" />
        <meta property="og:description" content="One-time virtual number activations for legitimate verification, privacy, and software testing." />
        <meta property="og:url" content={`${BASE_URL}/about`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RingSlot" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      </Head>

      <div className="page">
        <Navbar />

        <main style={{ paddingTop: 68 }}>
          {/* Hero */}
          <section style={{ padding: '60px 0 40px', background: 'linear-gradient(180deg, var(--primary-50), #fafafa)', textAlign: 'center' }}>
            <div className="wrap">
              <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>About RingSlot</div>
              <h1 className="section-h2">Privacy-First SMS Verification for Everyone</h1>
              <p className="section-lead" style={{ margin: '0 auto 32px', maxWidth: 640 }}>
                Our mission is to make online verification accessible, affordable, and private. Everyone deserves the right to verify accounts without sacrificing personal information.
              </p>
            </div>
          </section>

          {/* Mission Statement */}
          <section style={{ padding: '48px 0' }}>
            <div className="wrap" style={{ maxWidth: 800, margin: '0 auto' }}>
              <div className="card" style={{ padding: '40px 32px', textAlign: 'center' }}>
                <h2 className="font-display" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: 'var(--text)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                  Our Mission
                </h2>
                <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.8, margin: 0, maxWidth: 620, marginLeft: 'auto', marginRight: 'auto' }}>
                  RingSlot provides virtual number activations for people and teams with legitimate verification, privacy, customer-support, and QA needs. Users must have authority for their activity and follow the law, our policies, and the rules of the third-party platform involved.
                </p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section style={{ padding: '48px 0' }}>
            <div className="wrap">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                {STATS.map(stat => (
                  <div className="card" key={stat.label} style={{ textAlign: 'center', padding: '32px 20px' }}>
                    <div className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--primary-600)', letterSpacing: '-0.02em', marginBottom: 4 }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--text-2)', fontWeight: 500 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section style={{ padding: '64px 0', background: 'var(--surface-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="wrap">
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>How It Works</div>
                <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
                  Three Simple Steps
                </h2>
                <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 520, margin: '0 auto' }}>
                  Request an activation for a configured service and follow its verification flow.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                {STEPS.map(step => (
                  <div className="card" key={step.number} style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary-50)', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700 }}>
                      {step.number}
                    </div>
                    <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Technology */}
          <section style={{ padding: '64px 0' }}>
            <div className="wrap">
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>Technology</div>
                <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
                  Built for Reliability
                </h2>
                <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 560, margin: '0 auto' }}>
                  Our infrastructure is designed to deliver SMS verification codes quickly and reliably, no matter where you are.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                {TECH.map(item => (
                  <div className="card" key={item.title} style={{ padding: '28px 24px' }}>
                    <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 10px', letterSpacing: '-0.01em' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why RingSlot */}
          <section style={{ padding: '64px 0', background: 'var(--surface-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="wrap">
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>Why RingSlot</div>
                <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
                  Why Choose RingSlot
                </h2>
                <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 520, margin: '0 auto' }}>
                  From individual privacy to enterprise-scale verification, RingSlot delivers on every front.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                {FEATURES.map(feature => (
                  <div className="card" key={feature.title} style={{ padding: '28px 24px' }}>
                    <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 10px', letterSpacing: '-0.01em' }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Internal Links */}
          <section style={{ padding: '48px 0' }}>
            <div className="wrap">
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <h2 className="font-display" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                  Explore RingSlot
                </h2>
                <p style={{ fontSize: 14, color: 'var(--text-2)' }}>Learn more about our platform and capabilities.</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link href="/services" style={{ fontSize: 14, color: 'var(--primary-600)', fontWeight: 500, textDecoration: 'none', padding: '8px 16px', borderRadius: 8, background: 'var(--primary-50)' }}>
                  All Services
                </Link>
                <Link href="/countries" style={{ fontSize: 14, color: 'var(--primary-600)', fontWeight: 500, textDecoration: 'none', padding: '8px 16px', borderRadius: 8, background: 'var(--primary-50)' }}>
                  Supported Countries
                </Link>
                <Link href="/api-docs" style={{ fontSize: 14, color: 'var(--primary-600)', fontWeight: 500, textDecoration: 'none', padding: '8px 16px', borderRadius: 8, background: 'var(--primary-50)' }}>
                  API Documentation
                </Link>
                <Link href="/security" style={{ fontSize: 14, color: 'var(--primary-600)', fontWeight: 500, textDecoration: 'none', padding: '8px 16px', borderRadius: 8, background: 'var(--primary-50)' }}>
                  Security
                </Link>
                <Link href="/faq" style={{ fontSize: 14, color: 'var(--primary-600)', fontWeight: 500, textDecoration: 'none', padding: '8px 16px', borderRadius: 8, background: 'var(--primary-50)' }}>
                  FAQ
                </Link>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '64px 0', background: 'linear-gradient(180deg, #fafafa, var(--primary-50))' }}>
            <div className="wrap" style={{ textAlign: 'center' }}>
              <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
                Ready to get started?
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-2)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
                Create your account and check live availability for the service and country you need.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/register">
                  <button className="btn-purple">Create free account</button>
                </Link>
                <Link href="/services">
                  <button className="btn-outline-purple">Browse services</button>
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
