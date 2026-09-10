import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BASE_URL } from '../utils/seoData';

const CONTROLS = [
  ['Passwords', 'Passwords are hashed with bcrypt using a work factor of 12. Plaintext passwords are not stored.'],
  ['Sign-in protection', 'Login attempts are rate-limited. New-device verification is available by email when the required database tables and email service are configured.'],
  ['API access', 'Protected routes require a signed bearer token or account API key. Users can regenerate API keys and revoke trusted devices.'],
  ['Network traffic', 'Production website and API traffic is delivered over HTTPS. TLS configuration is managed by the hosting providers.'],
  ['Payment callbacks', 'Payment notifications require an HMAC signature and are matched to a pending payment, user, and amount before wallet credit.'],
  ['Order integrity', 'Wallet deductions, cancellations, and expiry refunds use database transactions and row locks to prevent duplicate refunds or overspending.'],
  ['Sensitive messages', 'RingSlot stores the parsed OTP needed to deliver an order, then removes OTP values from completed order records after 24 hours.'],
  ['Abuse controls', 'Global, authentication, purchase, password-reset, and contact limits are applied. Administrators can disable users, providers, and abusive IP addresses.'],
];

export default function SecurityPage() {
  const schema = {
    '@context': 'https://schema.org', '@type': 'WebPage', name: 'RingSlot Security',
    description: 'Documented security controls for RingSlot accounts, orders, payments, and API access.',
    url: `${BASE_URL}/security`,
  };
  return <div className="page">
    <Head>
      <title>Security Practices | RingSlot</title>
      <meta name="description" content="Documented security controls for RingSlot passwords, sessions, API keys, payments, orders, and OTP retention." />
      <link rel="canonical" href={`${BASE_URL}/security`} />
      <meta property="og:title" content="Security Practices | RingSlot" />
      <meta property="og:description" content="How RingSlot protects account access, payment callbacks, wallet operations, and sensitive OTP data." />
      <meta property="og:url" content={`${BASE_URL}/security`} />
      <meta property="og:type" content="website" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </Head>
    <Navbar />
    <main style={{ paddingTop: 68 }}>
      <section style={{ padding: '64px 0 44px', background: 'linear-gradient(180deg,var(--primary-50),#fafafa)', textAlign: 'center' }}>
        <div className="wrap"><div className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>Security</div><h1 className="section-h2">Security controls you can verify</h1><p className="section-lead" style={{ margin: '0 auto', maxWidth: 680 }}>A factual overview of the safeguards implemented in the RingSlot application. No online service can promise perfect security.</p></div>
      </section>
      <section style={{ padding: '56px 0 76px' }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
            {CONTROLS.map(([title, body]) => <div className="card" key={title} style={{ padding: 24 }}><h2 style={{ fontSize: 17, marginBottom: 8, color: 'var(--text)' }}>{title}</h2><p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, margin: 0 }}>{body}</p></div>)}
          </div>
          <div className="card" style={{ marginTop: 24, padding: 26, background: 'var(--surface-2)' }}>
            <h2 style={{ fontSize: 18, marginBottom: 8 }}>Your part</h2>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.75, margin: 0 }}>Use a unique password, protect your API key, verify wallet addresses and networks, never share an OTP, and report suspicious access promptly. Email security reports to <a href="mailto:support@ringslot.shop" style={{ color: 'var(--primary-600)' }}>support@ringslot.shop</a>. Do not include live credentials or OTP codes.</p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}
