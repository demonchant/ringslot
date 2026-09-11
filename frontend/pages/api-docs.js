import Head from 'next/head';
import Navbar from '../components/Navbar';
import ApiDocs from '../components/ApiDocs';
import Footer from '../components/Footer';

export default function ApiDocsPage() {
  return (
    <>
      <Head>
        <title>API Documentation — RingSlot</title>
        <meta name="description" content="Full REST API for virtual phone numbers and OTP. X-API-Key authentication. Buy numbers, poll OTPs, manage orders." />
        <link rel="canonical" href="https://www.ringslot.shop/api-docs" />
      </Head>
      <div className="page">
        <Navbar />
        <div style={{ paddingTop:68 }}>
          <ApiDocs />
        </div>
        <Footer />
      </div>
    </>
  );
}
