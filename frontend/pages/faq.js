import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BASE_URL } from '../utils/seoData';

const FAQ_SECTIONS = [
  {
    id: 'general',
    title: 'General',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    questions: [
      {
        q: 'What is RingSlot?',
        a: 'RingSlot provides one-time virtual number activations for legitimate SMS verification, privacy, and authorized testing. The dashboard includes 90+ selectable countries and dozens of configured services. Live inventory and third-party acceptance are not guaranteed.',
      },
      {
        q: 'How does SMS verification work on RingSlot?',
        a: 'Register for an account, deposit funds via cryptocurrency, choose a configured service and country, then request a one-time number. The dashboard monitors for an incoming SMS during the activation window. Assignment, delivery time, inventory, and third-party acceptance can vary.',
      },
      {
        q: 'Which services does RingSlot support?',
        a: 'RingSlot lists dozens of configured services, including messaging, email, social, commerce, and developer platforms. Browse the public services directory for the current catalog; actual availability is checked when an activation is requested.',
      },
      {
        q: 'Is RingSlot legal to use?',
        a: 'Yes, RingSlot provides legitimate virtual phone numbers for privacy-conscious users who need SMS verification without sharing their personal phone numbers. Virtual numbers are widely used by businesses for testing, developers for QA, and individuals who value their privacy. Always use RingSlot responsibly and in compliance with the terms of service of the platforms you are verifying with.',
      },
    ],
  },
  {
    id: 'numbers',
    title: 'Numbers',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    questions: [
      {
        q: 'How long is a virtual number active?',
        a: 'One-time activation numbers are monitored for 10 minutes after purchase. If an eligible activation expires without an SMS, its price is automatically returned to your RingSlot wallet. Long-term rentals are not currently available.',
      },
      {
        q: 'Can I receive multiple OTP codes on one number?',
        a: 'No. One-time activation numbers are designed for a single authorized verification attempt. RingSlot does not currently offer reusable or long-term rental numbers.',
      },
      {
        q: 'Can I reuse a number?',
        a: 'No. A one-time activation cannot be reused after it is completed, cancelled, or expired. Do not rely on it for account recovery or ongoing two-factor authentication.',
      },
      {
        q: 'Which countries are available?',
        a: 'The dashboard currently lists 90+ selectable countries. Each country has different service availability and pricing, which is checked against upstream provider inventory when you request an activation.',
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payments',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    questions: [
      {
        q: 'What payment methods are accepted?',
        a: 'We accept cryptocurrency payments including Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), USDT (TRC-20 and ERC-20), and several other major cryptocurrencies through our integrated payment processor. Cryptocurrency payments ensure maximum privacy, fast processing, and global accessibility without bank restrictions or geographic limitations.',
      },
      {
        q: 'What is the minimum deposit?',
        a: 'The minimum deposit is $20 USD equivalent. Activation prices start from $0.10 but vary by service, country, and live upstream inventory.',
      },
      {
        q: 'What is your refund policy?',
        a: 'If an eligible activation receives no SMS during the 10-minute activation window, its purchase price is returned automatically to your RingSlot wallet. Waiting orders may be cancellable earlier. See the Refund Policy for exclusions and wallet-deposit terms.',
      },
      {
        q: 'How long do deposits take?',
        a: 'The payment processor determines the required confirmations and status. Confirmation time varies by asset, network traffic, fees, and processor availability. RingSlot credits the matching pending deposit after a signed finished-payment notification is verified.',
      },
    ],
  },
  {
    id: 'api',
    title: 'API',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    questions: [
      {
        q: 'How does API authentication work?',
        a: 'All API requests require your unique API key passed in the X-API-Key header. Generate your API key from the Settings page in your RingSlot dashboard. Keep your key secure and never share it publicly. If compromised, you can regenerate a new key at any time from the dashboard, which immediately invalidates the old one.',
      },
      {
        q: 'What are the API rate limits?',
        a: 'Standard accounts are limited to 60 requests per minute across all API endpoints. This is sufficient for most use cases including automated verification flows. If you need higher throughput for bulk operations or enterprise integrations, contact our support team to discuss custom rate limit increases tailored to your usage patterns.',
      },
      {
        q: 'Does RingSlot support webhooks?',
        a: 'Customer-configurable outbound webhooks are not currently available. API clients should poll the order SMS endpoint for status changes.',
      },
      {
        q: 'Where can I find API documentation?',
        a: 'Full REST API documentation with request/response examples, authentication guides, error code references, and SDK snippets is available on our API documentation page. The docs cover all endpoints including number purchase, SMS retrieval, balance management, and webhook configuration with examples in cURL, Python, Node.js, and PHP.',
      },
    ],
  },
];

const ALL_QUESTIONS = FAQ_SECTIONS.flatMap(section =>
  section.questions.map(q => ({ ...q, section: section.id }))
);

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ALL_QUESTIONS.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${BASE_URL}/faq` },
  ],
};

function ChevronIcon({ open }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: 'transform 0.2s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function FaqPage() {
  const [openId, setOpenId] = useState(null);

  function toggle(id) {
    setOpenId(prev => (prev === id ? null : id));
  }

  return (
    <>
      <Head>
        <title>FAQ - Frequently Asked Questions | RingSlot</title>
        <meta name="description" content="Find answers to common questions about RingSlot virtual phone numbers, SMS verification, payments, API usage, and more. Get help with your account." />
        <meta name="keywords" content="RingSlot FAQ, virtual number questions, SMS verification help, OTP service FAQ, virtual phone number support" />
        <link rel="canonical" href={`${BASE_URL}/faq`} />
        <meta property="og:title" content="FAQ - Frequently Asked Questions | RingSlot" />
        <meta property="og:description" content="Find answers to common questions about RingSlot virtual phone numbers, SMS verification, payments, and API usage." />
        <meta property="og:url" content={`${BASE_URL}/faq`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      </Head>

      <div className="page">
        <Navbar />

        <main style={{ paddingTop: 68 }}>
          {/* Hero */}
          <section style={{ padding: '60px 0 40px', background: 'linear-gradient(180deg, var(--primary-50), #fafafa)', textAlign: 'center' }}>
            <div className="wrap">
              <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>Support</div>
              <h1 className="section-h2">Frequently Asked Questions</h1>
              <p className="section-lead" style={{ margin: '0 auto', maxWidth: 560 }}>
                Everything you need to know about RingSlot virtual numbers, payments, and our API.
              </p>
            </div>
          </section>

          {/* FAQ Sections */}
          <section style={{ padding: '48px 0 80px' }}>
            <div className="wrap" style={{ maxWidth: 800 }}>
              {FAQ_SECTIONS.map((section, sectionIdx) => (
                <div key={section.id} style={{ marginBottom: sectionIdx < FAQ_SECTIONS.length - 1 ? 48 : 0 }}>
                  {/* Section Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'var(--primary-50)',
                      color: 'var(--primary-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {section.icon}
                    </div>
                    <h2 className="font-display" style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: 'var(--text)',
                      margin: 0,
                      letterSpacing: '-0.01em',
                    }}>
                      {section.title}
                    </h2>
                  </div>

                  {/* Questions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {section.questions.map((item, qIdx) => {
                      const itemId = `${section.id}-${qIdx}`;
                      const isOpen = openId === itemId;

                      return (
                        <div
                          key={itemId}
                          className="card"
                          style={{
                            padding: 0,
                            overflow: 'hidden',
                            border: isOpen ? '1px solid var(--primary-200, var(--border))' : '1px solid var(--border)',
                            transition: 'border-color 0.2s ease',
                          }}
                        >
                          <button
                            onClick={() => toggle(itemId)}
                            aria-expanded={isOpen}
                            aria-controls={`answer-${itemId}`}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: 16,
                              padding: '16px 20px',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              textAlign: 'left',
                              fontSize: 15,
                              fontWeight: 600,
                              color: 'var(--text)',
                              lineHeight: 1.5,
                            }}
                          >
                            <span>{item.q}</span>
                            <ChevronIcon open={isOpen} />
                          </button>

                          <div
                            id={`answer-${itemId}`}
                            role="region"
                            style={{
                              maxHeight: isOpen ? 400 : 0,
                              overflow: 'hidden',
                              transition: 'max-height 0.3s ease',
                            }}
                          >
                            <div style={{
                              padding: '0 20px 16px',
                              fontSize: 14,
                              color: 'var(--text-2)',
                              lineHeight: 1.7,
                            }}>
                              {item.a}
                              {/* Internal links for relevant questions */}
                              {item.q === 'Which services does RingSlot support?' && (
                                <span style={{ display: 'block', marginTop: 8 }}>
                                  <Link href="/services" style={{ color: 'var(--primary-600)', fontWeight: 500, textDecoration: 'none' }}>
                                    View all supported services →
                                  </Link>
                                </span>
                              )}
                              {item.q === 'Which countries are available?' && (
                                <span style={{ display: 'block', marginTop: 8 }}>
                                  <Link href="/countries" style={{ color: 'var(--primary-600)', fontWeight: 500, textDecoration: 'none' }}>
                                    Browse all available countries →
                                  </Link>
                                </span>
                              )}
                              {item.q === 'Where can I find API documentation?' && (
                                <span style={{ display: 'block', marginTop: 8 }}>
                                  <Link href="/api-docs" style={{ color: 'var(--primary-600)', fontWeight: 500, textDecoration: 'none' }}>
                                    Read the API documentation →
                                  </Link>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section style={{ padding: '64px 0', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
            <div className="wrap" style={{ textAlign: 'center' }}>
              <h2 className="font-display" style={{
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: 12,
                letterSpacing: '-0.02em',
              }}>
                Still have questions?
              </h2>
              <p style={{
                fontSize: 16,
                color: 'var(--text-2)',
                marginBottom: 28,
                maxWidth: 520,
                margin: '0 auto 28px',
                lineHeight: 1.6,
              }}>
                Our support team is here to help. Check our knowledge base for detailed guides or reach out directly.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact">
                  <button className="btn-purple">Contact support</button>
                </Link>
                <Link href="/knowledge-base">
                  <button className="btn-outline-purple">Knowledge base</button>
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
