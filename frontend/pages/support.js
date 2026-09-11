import Head from 'next/head';
import Navbar from '../components/Navbar';
import Support from '../components/Support';
import Footer from '../components/Footer';

export default function SupportPage() {
  return (
    <>
      <Head>
        <title>Support — RingSlot</title>
        <meta name="description" content="Get help with RingSlot virtual numbers, activation orders, deposits, account access, and API use." />
        <link rel="canonical" href="https://www.ringslot.shop/support" />
      </Head>
      <div className="page">
        <Navbar />
        <div style={{ paddingTop:68 }}>
          <Support headingLevel="h1" />
        </div>
        <Footer />
      </div>
    </>
  );
}
