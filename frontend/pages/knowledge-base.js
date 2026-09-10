import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BASE_URL } from '../utils/seoData';

const CATEGORIES = [
  {
    icon: '🚀',
    title: 'Getting Started',
    description: 'New to RingSlot? Learn how to create your account, make your first deposit, and receive your first verification code.',
    articles: [
      { title: 'How to set up your RingSlot account', href: '/register' },
      { title: 'Completing your first SMS verification', href: '/services' },
      { title: 'Adding funds to your balance', href: '/deposit' },
      { title: 'Dashboard overview and navigation', href: '/dashboard' },
    ],
  },
  {
    icon: '💬',
    title: 'SMS Verification',
    description: 'Understand how one-time passwords work, what affects delivery speed, and how to get the best results from every activation.',
    articles: [
      { title: 'How OTP verification works', href: '/services' },
      { title: 'SMS delivery times and what affects them', href: '/countries' },
      { title: 'Troubleshooting missing verification codes', href: '/contact' },
      { title: 'Supported services and platforms', href: '/services' },
    ],
  },
  {
    icon: '📱',
    title: 'Virtual Numbers',
    description: 'Learn how one-time activation numbers work, which countries are selectable, and how the activation lifecycle ends.',
    articles: [
      { title: 'How one-time activations work', href: '/services' },
      { title: 'Available countries and regions', href: '/countries' },
      { title: 'How long do virtual numbers last?', href: '/faq' },
      { title: 'Why activation numbers are not reusable', href: '/faq' },
    ],
  },
  {
    icon: '💳',
    title: 'Payments & Deposits',
    description: 'Everything about funding your account, accepted payment methods including cryptocurrency, minimum deposits, and our refund policy.',
    articles: [
      { title: 'Accepted payment methods', href: '/deposit' },
      { title: 'How to deposit with cryptocurrency', href: '/deposit' },
      { title: 'Minimum deposit amounts', href: '/faq' },
      { title: 'Refund and cancellation policy', href: '/faq' },
    ],
  },
  {
    icon: '⚡',
    title: 'API Usage',
    description: 'Integrate RingSlot into authorized applications with API-key authentication, supported endpoints, polling, and error handling.',
    articles: [
      { title: 'API authentication with X-API-Key', href: '/api-docs' },
      { title: 'Making your first API request', href: '/api-docs' },
      { title: 'Error codes and how to handle them', href: '/api-docs' },
      { title: 'Polling safely for OTP delivery', href: '/api-docs' },
    ],
  },
  {
    icon: '🔧',
    title: 'Troubleshooting',
    description: 'Having issues? Find solutions for common problems like missing codes, expired numbers, payment failures, and account access.',
    articles: [
      { title: 'Verification code not received', href: '/contact' },
      { title: 'Number expired before code arrived', href: '/faq' },
      { title: 'Payment or deposit not showing up', href: '/contact' },
      { title: 'Account access and login problems', href: '/contact' },
    ],
  },
];

const FAQ_ITEMS = [
  {
    question: 'What is a virtual phone number and how does SMS verification work?',
    answer: 'A virtual phone number can receive an SMS without a physical SIM in your device. For an authorized verification attempt, RingSlot requests an activation from an upstream provider and polls for a message. Delivery time, number type, and acceptance depend on the provider, carrier, country, and sending platform.',
  },
  {
    question: 'How quickly will I receive my verification code?',
    answer: 'Delivery time varies by the sending platform, destination country, carrier routing, and provider. RingSlot checks every five seconds during the 10-minute activation window. Eligible activations that expire without an SMS are refunded to the RingSlot wallet.',
  },
  {
    question: 'Which payment methods does RingSlot accept?',
    answer: 'The deposit screen lists the currencies currently available from the connected payment processor. The minimum deposit is $20 USD equivalent. Confirmation requirements and timing vary by asset, network, and processor status.',
  },
  {
    question: 'What happens if I do not receive a verification code?',
    answer: 'If an eligible activation receives no SMS during the 10-minute window, the order expires and its price is returned automatically to your RingSlot wallet. You can then request a new activation if live inventory is available.',
  },
  {
    question: 'Can I use the same number for multiple verifications?',
    answer: 'No. A single-use activation is for one authorized attempt on one selected service. Once the code arrives or the activation is cancelled or expires, do not rely on that number again. Long-term rentals are not currently available.',
  },
  {
    question: 'Is my personal information required to use RingSlot?',
    answer: 'Registration requires an email address and password. RingSlot also processes security, order, payment-reference, support, device, and operational data and uses third-party infrastructure and service providers. Read the Privacy Policy for details and available requests.',
  },
  {
    question: 'How do I integrate RingSlot with my application using the API?',
    answer: 'RingSlot provides a full REST API for automated verification workflows. After generating an API key in your dashboard, you authenticate requests using the X-API-Key header. The API allows you to purchase numbers, poll for incoming OTP codes, manage active orders, and check your balance -- all programmatically. See our API documentation for endpoint details and code examples.',
  },
  {
    question: 'Which countries and services are supported?',
    answer: 'The dashboard currently lists 90+ selectable countries and dozens of configured services. Live availability is checked during purchase and varies by service, country, and upstream provider.',
  },
];

const HOWTO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Verify an Account with RingSlot',
  description: 'Step-by-step guide to using RingSlot virtual phone numbers for configured SMS verification services.',
  totalTime: 'PT2M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: '0.10',
  },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Create a RingSlot account',
      text: 'Sign up at ringslot.shop with your email address. No phone number or personal documents required.',
      url: `${BASE_URL}/register`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Deposit funds',
      text: 'Add at least $20 USD equivalent using a cryptocurrency currently offered on the deposit screen.',
      url: `${BASE_URL}/deposit`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Select a service and country',
      text: 'Choose the platform you want to verify (e.g., Telegram, WhatsApp) and select a country for your virtual number.',
      url: `${BASE_URL}/services`,
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Receive your verification code',
      text: 'Enter the virtual number for your authorized verification. The dashboard monitors for an OTP during the activation window; arrival time varies.',
    },
  ],
};

const FAQPAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Knowledge Base', item: `${BASE_URL}/knowledge-base` },
  ],
};

const COMBINED_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'RingSlot',
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.svg`,
      contactPoint: { '@type': 'ContactPoint', email: 'support@ringslot.shop', contactType: 'customer service', availableLanguage: 'English' },
    },
    BREADCRUMB_SCHEMA,
    HOWTO_SCHEMA,
    FAQPAGE_SCHEMA,
  ],
};

export default function KnowledgeBasePage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>Knowledge Base - SMS Verification Help & Guides | RingSlot</title>
        <meta name="description" content="Learn everything about SMS verification with RingSlot. Guides on virtual numbers, OTP delivery, API integration, payments, and troubleshooting. Get started in minutes." />
        <meta name="keywords" content="SMS verification guide, virtual number help, OTP troubleshooting, RingSlot knowledge base, API documentation, virtual phone number FAQ" />
        <link rel="canonical" href={`${BASE_URL}/knowledge-base`} />
        <meta property="og:title" content="Knowledge Base - SMS Verification Help & Guides | RingSlot" />
        <meta property="og:description" content="Guides, tutorials, and answers for SMS verification with virtual phone numbers. From getting started to API integration." />
        <meta property="og:url" content={`${BASE_URL}/knowledge-base`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COMBINED_SCHEMA) }} />
      </Head>

      <div className="page">
        <Navbar />

        <main style={{ paddingTop: 68 }}>
          {/* Hero */}
          <section style={{ padding: '60px 0 40px', background: 'linear-gradient(180deg, var(--primary-50), #fafafa)', textAlign: 'center' }}>
            <div className="wrap">
              <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>Knowledge Base</div>
              <h1 className="section-h2">How Can We Help?</h1>
              <p className="section-lead" style={{ margin: '0 auto 32px' }}>
                Guides, tutorials, and answers to help you get the most out of RingSlot virtual numbers and SMS verification.
              </p>
            </div>
          </section>

          {/* Category Grid */}
          <section style={{ padding: '48px 0 64px' }}>
            <div className="wrap">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
                {CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: 'var(--surface-3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        flexShrink: 0,
                      }}>
                        {cat.icon}
                      </div>
                      <h2 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>
                        {cat.title}
                      </h2>
                    </div>

                    <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>
                      {cat.description}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 4 }}>
                      {cat.articles.map((article, aidx) => (
                        <Link key={aidx} href={article.href} style={{ textDecoration: 'none' }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '10px 0',
                            borderTop: aidx === 0 ? '1px solid var(--border)' : 'none',
                            borderBottom: '1px solid var(--border)',
                            cursor: 'pointer',
                            transition: 'color 0.15s',
                          }}
                            onMouseEnter={e => {
                              e.currentTarget.querySelector('.kb-arrow').style.transform = 'translateX(3px)';
                              e.currentTarget.querySelector('.kb-title').style.color = 'var(--primary-600)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.querySelector('.kb-arrow').style.transform = 'none';
                              e.currentTarget.querySelector('.kb-title').style.color = 'var(--text)';
                            }}
                          >
                            <span style={{ fontSize: 12, color: 'var(--primary-400)', flexShrink: 0, lineHeight: 1 }}>&#9656;</span>
                            <span className="kb-title" style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500, flex: 1, transition: 'color 0.15s' }}>
                              {article.title}
                            </span>
                            <span className="kb-arrow" style={{ fontSize: 14, color: 'var(--text-3)', flexShrink: 0, transition: 'transform 0.15s' }}>
                              &#8594;
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section style={{ padding: '64px 0 80px', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
            <div className="wrap" style={{ maxWidth: 800 }}>
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>FAQ</div>
                <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
                  Frequently Asked Questions
                </h2>
                <p style={{ fontSize: 16, color: 'var(--text-2)', maxWidth: 520, margin: '0 auto' }}>
                  Quick answers to the most common questions about SMS verification and virtual numbers.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {FAQ_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="card"
                    style={{ padding: 0, overflow: 'hidden', transition: 'box-shadow 0.2s' }}
                  >
                    <div
                      onClick={() => toggleFaq(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(idx); } }}
                      aria-expanded={openFaq === idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                        padding: '20px 24px',
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', lineHeight: 1.5, flex: 1 }}>
                        {item.question}
                      </span>
                      <span style={{
                        fontSize: 18,
                        color: 'var(--text-3)',
                        flexShrink: 0,
                        transition: 'transform 0.25s ease',
                        transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: openFaq === idx ? 'var(--primary-50)' : 'var(--surface-3)',
                      }}>
                        &#9660;
                      </span>
                    </div>

                    <div style={{
                      maxHeight: openFaq === idx ? 400 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}>
                      <div style={{
                        padding: '0 24px 20px',
                        fontSize: 14,
                        color: 'var(--text-2)',
                        lineHeight: 1.8,
                        borderTop: '1px solid var(--border)',
                        paddingTop: 16,
                      }}>
                        {item.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <p style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 16 }}>
                  Still have questions? Check our full FAQ or contact support.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/faq">
                    <button className="btn-outline-purple">View full FAQ</button>
                  </Link>
                  <Link href="/contact">
                    <button className="btn-outline-purple">Contact support</button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section style={{ padding: '48px 0', borderTop: '1px solid var(--border)' }}>
            <div className="wrap">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                <Link href="/services" style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: 20, textAlign: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>🌐</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Browse Services</span>
                    <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '6px 0 0', lineHeight: 1.5 }}>Dozens of configured services</p>
                  </div>
                </Link>
                <Link href="/countries" style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: 20, textAlign: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>🗺️</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Browse Countries</span>
                    <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '6px 0 0', lineHeight: 1.5 }}>90+ selectable countries</p>
                  </div>
                </Link>
                <Link href="/api-docs" style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: 20, textAlign: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>📄</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>API Documentation</span>
                    <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '6px 0 0', lineHeight: 1.5 }}>REST API reference</p>
                  </div>
                </Link>
                <Link href="/contact" style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: 20, textAlign: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>💬</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Contact Support</span>
                    <p style={{ fontSize: 12, color: 'var(--text-3)', margin: '6px 0 0', lineHeight: 1.5 }}>Web form and email support</p>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '64px 0', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
            <div className="wrap" style={{ textAlign: 'center' }}>
              <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
                Ready to get started?
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-2)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
                Create an account and request one-time activations across 90+ selectable countries, starting at $0.10 subject to inventory.
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
