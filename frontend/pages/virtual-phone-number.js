import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BASE_URL } from '../utils/seoData';

const FAQS = [
  {
    question: 'Where can I get a virtual phone number for SMS verification?',
    answer: 'RingSlot offers one-time virtual phone number activations for legitimate SMS verification and authorized testing. Choose a configured service and country, then RingSlot checks live upstream inventory before purchase.',
  },
  {
    question: 'How much does a RingSlot virtual number cost?',
    answer: 'Configured prices start from $0.10 per one-time activation. The price shown before purchase depends on the service, country, and currently available provider inventory.',
  },
  {
    question: 'Can a RingSlot number receive calls or be kept long term?',
    answer: 'No. RingSlot currently provides one-time SMS activations with a 10-minute monitoring window. It does not currently provide voice calls, permanent numbers, or long-term rentals.',
  },
  {
    question: 'Is it legal to use a virtual phone number?',
    answer: 'Permitted uses depend on your location and the third-party service involved. Use RingSlot only when you are authorized, follow applicable law and platform rules, and never use it for fraud, spam, impersonation, or account abuse.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Where to Get a Virtual Phone Number for SMS',
      url: `${BASE_URL}/virtual-phone-number`,
      description: 'A practical guide to choosing and getting a one-time virtual phone number for legitimate SMS verification with RingSlot.',
      isPartOf: { '@type': 'WebSite', name: 'RingSlot', url: BASE_URL },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Virtual phone number', item: `${BASE_URL}/virtual-phone-number` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
  ],
};

const STEPS = [
  ['Create an account', 'Register with your email and secure your account.'],
  ['Choose a service and country', 'Review the displayed price and availability for your intended, authorized use.'],
  ['Fund your wallet', 'Add funds using a payment method currently offered by the payment processor.'],
  ['Request the activation', 'Copy the assigned number and watch the dashboard for the incoming SMS during the activation window.'],
];

export default function VirtualPhoneNumberPage() {
  return (
    <div className="page">
      <Head>
        <title>Where to Get a Virtual Phone Number for SMS | RingSlot</title>
        <meta name="description" content="Looking for where to get a virtual phone number? RingSlot offers one-time SMS activations across 90+ selectable countries, from $0.10 subject to live inventory." />
        <link rel="canonical" href={`${BASE_URL}/virtual-phone-number`} />
        <meta property="og:title" content="Get a Virtual Phone Number for SMS | RingSlot" />
        <meta property="og:description" content="Choose a service and country, check live availability, and request a one-time number for legitimate SMS verification." />
        <meta property="og:url" content={`${BASE_URL}/virtual-phone-number`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RingSlot" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <section style={{ padding: '76px 0 64px', background: 'linear-gradient(180deg,var(--primary-50),#fff)' }}>
          <div className="wrap-sm" style={{ textAlign: 'center' }}>
            <div className="section-tag">Virtual phone numbers</div>
            <h1 className="section-h2">Where can I get a virtual phone number for SMS?</h1>
            <p className="section-lead" style={{ margin: '0 auto 28px', maxWidth: 720 }}>
              RingSlot provides one-time virtual phone number activations for legitimate SMS verification, privacy, and authorized software testing. Select a service and country, see the price before purchase, and check live inventory in your dashboard.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/register"><button className="btn-purple">Get a virtual number</button></Link>
              <Link href="/services"><button className="btn-outline-purple">Browse services</button></Link>
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 0' }}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
              {[
                ['90+ selectable countries', 'Choose from configured locations. Availability varies by service and live provider inventory.'],
                ['Dozens of configured services', 'Find common online services and review the exact activation price before buying.'],
                ['From $0.10', 'There is no subscription for one-time activations. Live prices can change with supply.'],
              ].map(([title, text]) => (
                <article className="card" key={title}>
                  <h2 className="font-display" style={{ fontSize: 19, marginBottom: 10 }}>{title}</h2>
                  <p style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 0', background: 'var(--surface-2)', borderBlock: '1px solid var(--border)' }}>
          <div className="wrap-sm">
            <div className="section-tag">How it works</div>
            <h2 className="section-h2" style={{ fontSize: 'clamp(26px,3vw,38px)' }}>Get a one-time virtual number in four steps</h2>
            <div style={{ display: 'grid', gap: 14, marginTop: 28 }}>
              {STEPS.map(([title, text], index) => (
                <div className="card" key={title} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 16, alignItems: 'start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 20, display: 'grid', placeItems: 'center', background: 'var(--primary-100)', color: 'var(--primary-700)', fontWeight: 800 }}>{index + 1}</div>
                  <div>
                    <h3 className="font-display" style={{ fontSize: 17, marginBottom: 5 }}>{title}</h3>
                    <p style={{ color: 'var(--text-2)' }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 0' }}>
          <div className="wrap-sm">
            <h2 className="section-h2" style={{ fontSize: 'clamp(26px,3vw,38px)' }}>What to check before choosing a provider</h2>
            <p className="section-lead" style={{ maxWidth: 'none' }}>
              A useful virtual-number provider should disclose its pricing, activation window, refund rules, support route, and limits. RingSlot publishes these details in its <Link href="/pricing">pricing</Link>, <Link href="/refund-policy">refund policy</Link>, <Link href="/faq">FAQ</Link>, and <Link href="/acceptable-use">acceptable-use policy</Link>. One-time numbers are not guaranteed to be accepted by every third-party platform, and SMS arrival depends on that platform and upstream inventory.
            </p>
          </div>
        </section>

        <section style={{ padding: '64px 0', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
          <div className="wrap-sm">
            <div className="section-tag">Questions and answers</div>
            <h2 className="section-h2" style={{ fontSize: 'clamp(26px,3vw,38px)' }}>Virtual number FAQ</h2>
            <div style={{ display: 'grid', gap: 14, marginTop: 28 }}>
              {FAQS.map(({ question, answer }) => (
                <article className="card" key={question}>
                  <h3 className="font-display" style={{ fontSize: 17, marginBottom: 8 }}>{question}</h3>
                  <p style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 0', textAlign: 'center' }}>
          <div className="wrap-sm">
            <h2 className="section-h2" style={{ fontSize: 'clamp(26px,3vw,38px)' }}>Ready to check availability?</h2>
            <p className="section-lead" style={{ margin: '0 auto 26px' }}>Create an account, choose your intended service and country, and review the live price before you buy.</p>
            <Link href="/register"><button className="btn-purple">Create an account</button></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
