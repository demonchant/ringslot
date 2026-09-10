import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BASE_URL } from '../utils/seoData';
import api from '../utils/api';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'RingSlot',
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.svg`,
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@ringslot.shop',
        contactType: 'customer service',
        availableLanguage: 'English',
        areaServed: 'Worldwide',
      },
    },
    {
      '@type': 'ContactPage',
      name: 'Contact Us - RingSlot Support',
      description: 'Send a support or pre-sale message to the RingSlot team.',
      url: `${BASE_URL}/contact`,
      mainEntity: {
        '@type': 'Organization',
        name: 'RingSlot',
        email: 'support@ringslot.shop',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE_URL}/contact` },
      ],
    },
  ],
};

const CATEGORIES = [
  'General Inquiry',
  'Technical Support',
  'Billing & Payments',
  'API & Integration',
  'Bug Report',
  'Feature Request',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', category: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/contact', form);
      if (response.status === 201 && response.data?.success) {
        setSubmitted(true);
      } else {
        setError(response.data?.error || 'We could not send your message. Please try again.');
      }
    } catch {
      setError('We could not reach support. Please email support@ringslot.shop.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Contact Us - RingSlot Support</title>
        <meta name="description" content="Contact RingSlot about virtual number activations, orders, deposits, account access, API integration, or responsible-use questions." />
        <meta name="keywords" content="contact RingSlot, SMS verification support, virtual number help, RingSlot customer service" />
        <link rel="canonical" href={`${BASE_URL}/contact`} />
        <meta property="og:title" content="Contact Us - RingSlot Support" />
        <meta property="og:description" content="Send a support or pre-sale message to the RingSlot team." />
        <meta property="og:url" content={`${BASE_URL}/contact`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      </Head>

      <div className="page">
        <Navbar />

        <main style={{ paddingTop: 68 }}>
          {/* Hero */}
          <section style={{ padding: '60px 0 40px', background: 'linear-gradient(180deg, var(--primary-50), #fafafa)', textAlign: 'center' }}>
            <div className="wrap">
              <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 16 }}>Contact Us</div>
              <h1 className="section-h2">Get in Touch</h1>
              <p className="section-lead" style={{ margin: '0 auto 0' }}>
                Have a question or need help? We're here for you.
              </p>
            </div>
          </section>

          {/* Two-column: Form + Info */}
          <section style={{ padding: '48px 0 80px' }}>
            <div className="wrap">
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>

                {/* Left column — Contact Form */}
                <div style={{ flex: '1 1 520px', minWidth: 0 }}>
                  <div className="card" style={{ padding: 32 }}>
                    {submitted ? (
                      <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>
                          &#x2713;
                        </div>
                        <h2 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
                          Message Sent!
                        </h2>
                        <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 400, margin: '0 auto 24px' }}>
                          Your message was saved. Our team will reply to <strong style={{ color: 'var(--text)' }}>{form.email}</strong> as soon as practical.
                        </p>
                        <button
                          className="btn-outline-purple"
                          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', category: '', message: '' }); }}
                        >
                          Send another message
                        </button>
                      </div>
                    ) : (
                      <>
                        <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4, letterSpacing: '-0.02em' }}>
                          Send us a message
                        </h2>
                        <p style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 28, lineHeight: 1.6 }}>
                          Fill out the form and our team will respond promptly.
                        </p>

                        <form onSubmit={handleSubmit}>
                          {error && <div className="alert alert-error" role="alert" style={{ marginBottom: 18 }}>{error}</div>}
                          <div className="field">
                            <label className="label" htmlFor="contact-name">Name</label>
                            <input
                              className="input"
                              id="contact-name"
                              name="name"
                              type="text"
                              placeholder="Your full name"
                              value={form.name}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="field">
                            <label className="label" htmlFor="contact-email">Email</label>
                            <input
                              className="input"
                              id="contact-email"
                              name="email"
                              type="email"
                              placeholder="you@example.com"
                              value={form.email}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="field">
                            <label className="label" htmlFor="contact-category">Category</label>
                            <select
                              className="input"
                              id="contact-category"
                              name="category"
                              value={form.category}
                              onChange={handleChange}
                              required
                              style={{ appearance: 'none', cursor: 'pointer', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23666\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                            >
                              <option value="">Select a category</option>
                              {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>

                          <div className="field">
                            <label className="label" htmlFor="contact-message">Message</label>
                            <textarea
                              className="input"
                              id="contact-message"
                              name="message"
                              rows={5}
                              placeholder="Describe your question or issue..."
                              value={form.message}
                              onChange={handleChange}
                              required
                              style={{ resize: 'vertical', fontFamily: 'inherit' }}
                            />
                          </div>

                          <button className="btn-purple" type="submit" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Sending…' : 'Send Message'}
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>

                {/* Right column — Contact Info */}
                <div style={{ flex: '1 1 320px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

                  {/* Email Support */}
                  <div className="card" style={{ padding: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                        &#x2709;
                      </div>
                      <div>
                        <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
                          Email Support
                        </h3>
                        <a href="mailto:support@ringslot.shop" style={{ fontSize: 14, color: 'var(--primary-600)', fontWeight: 600, textDecoration: 'none', display: 'block', marginBottom: 4 }}>
                          support@ringslot.shop
                        </a>
                        <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0, lineHeight: 1.5 }}>
                          Replies are handled by email
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Knowledge Base */}
                  <Link href="/knowledge-base" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: 24, cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                          &#x1F4D6;
                        </div>
                        <div>
                          <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
                            Knowledge Base
                          </h3>
                          <p style={{ fontSize: 14, color: 'var(--primary-600)', fontWeight: 600, margin: '0 0 4px' }}>
                            Find instant answers
                          </p>
                          <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0, lineHeight: 1.5 }}>
                            Guides, tutorials, and how-tos
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* FAQ */}
                  <Link href="/faq" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: 24, cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                          &#x2753;
                        </div>
                        <div>
                          <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
                            FAQ
                          </h3>
                          <p style={{ fontSize: 14, color: 'var(--primary-600)', fontWeight: 600, margin: '0 0 4px' }}>
                            Common questions answered
                          </p>
                          <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0, lineHeight: 1.5 }}>
                            Quick answers to popular topics
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* API Docs */}
                  <Link href="/api-docs" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ padding: 24, cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                          &#x1F4BB;
                        </div>
                        <div>
                          <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
                            API Docs
                          </h3>
                          <p style={{ fontSize: 14, color: 'var(--primary-600)', fontWeight: 600, margin: '0 0 4px' }}>
                            Technical documentation
                          </p>
                          <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0, lineHeight: 1.5 }}>
                            REST API reference and guides
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Response Time Banner */}
          <section style={{ padding: '0 0 64px' }}>
            <div className="wrap">
              <div className="card" style={{ padding: '36px 40px', background: 'linear-gradient(135deg, var(--primary-50), var(--surface))', border: '1px solid var(--primary-100, var(--border))' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, border: '1px solid var(--border)' }}>
                    &#x23F1;
                  </div>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                      Support by email
                    </h2>
                    <p style={{ fontSize: 14, color: 'var(--text-2)', margin: 0, lineHeight: 1.7 }}>
                      Include the relevant order or payment reference and approximate time so the team can investigate efficiently. Never include a password, wallet private key, or OTP code.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding: '64px 0', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
            <div className="wrap" style={{ textAlign: 'center' }}>
              <h2 className="font-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
                Looking for quick answers?
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-2)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.7 }}>
                Browse our FAQ for instant answers to common questions or explore our knowledge base for detailed guides.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/faq">
                  <button className="btn-purple">Browse FAQ</button>
                </Link>
                <Link href="/knowledge-base">
                  <button className="btn-outline-purple">Knowledge Base</button>
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
