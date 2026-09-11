import Head from 'next/head';
import Navbar from '../components/Navbar';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Pricing — RingSlot Virtual Numbers</title>
        <meta name="description" content="Virtual phone numbers from $0.10 per activation. Pay only for completed orders, with automatic wallet refunds for eligible expired activations." />
        <link rel="canonical" href="https://www.ringslot.shop/pricing" />
      </Head>
      <div style={{ minHeight:'100vh', background:'#fafafa' }}>
        <Navbar />
        <div style={{ paddingTop:68 }}>
          <div style={{ padding:'60px 0 20px', background:'linear-gradient(180deg,var(--primary-50),#fafafa)', textAlign:'center' }}>
            <div className="wrap">
              <div className="section-tag" style={{ display:'inline-flex', marginBottom:16 }}>Pricing</div>
              <h1 className="section-h2">Transparent pricing</h1>
              <p className="section-lead" style={{ margin:'0 auto' }}>Pay only for what you use. No hidden fees.</p>
            </div>
          </div>
          <Pricing />
        </div>
        <Footer />
      </div>
    </>
  );
}
