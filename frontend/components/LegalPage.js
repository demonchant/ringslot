import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { BASE_URL } from '../utils/seoData';

export default function LegalPage({ title, description, path, children }) {
  return (
    <>
      <Head>
        <title>{title} | RingSlot</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${BASE_URL}${path}`} />
        <meta property="og:title" content={`${title} | RingSlot`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${BASE_URL}${path}`} />
        <meta property="og:type" content="website" />
      </Head>
      <div className="page">
        <Navbar />
        <main style={{ padding: '116px 0 80px' }}>
          <article className="wrap" style={{ maxWidth: 820 }}>
            <p className="section-tag" style={{ display: 'inline-flex', marginBottom: 14 }}>Legal &amp; trust</p>
            <h1 className="section-h2" style={{ marginBottom: 10 }}>{title}</h1>
            <p style={{ color: 'var(--text-3)', fontSize: 14, marginBottom: 38 }}>Effective September 9, 2026</p>
            <div className="legal-copy">{children}</div>
          </article>
        </main>
        <Footer />
        <style jsx global>{`
          .legal-copy h2 { margin: 34px 0 10px; font-size: 21px; color: var(--text); }
          .legal-copy p, .legal-copy li { color: var(--text-2); font-size: 15px; line-height: 1.8; }
          .legal-copy ul { padding-left: 22px; margin: 10px 0; }
          .legal-copy a { color: var(--primary-600); }
          .legal-note { padding: 16px 18px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface-2); }
        `}</style>
      </div>
    </>
  );
}
