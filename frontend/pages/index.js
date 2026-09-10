import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ActivationFlow from '../components/ActivationFlow';
import PhoneSelector from '../components/PhoneSelector';
import HowItWorks from '../components/HowItWorks';
import VisualBanner from '../components/VisualBanner';
import ServiceGrid from '../components/ServiceGrid';
import WhyRingSlot from '../components/WhyRingSlot';
import Coverage from '../components/Coverage';
import Pricing from '../components/Pricing';
import ApiDocs from '../components/ApiDocs';
import Support from '../components/Support';
import Footer from '../components/Footer';
import Link from 'next/link';

const SCHEMA = {
  '@context':'https://schema.org',
  '@graph':[
    {'@type':'WebSite','@id':'https://ringslot.shop/#website',url:'https://ringslot.shop',name:'RingSlot',
      description:'Virtual phone numbers for legitimate SMS verification, privacy, and software testing.'},
    {'@type':'Service',name:'RingSlot virtual number activations',serviceType:'Virtual phone number activation',
      description:'One-time virtual number activations for SMS verification, subject to inventory and third-party platform rules.',url:'https://ringslot.shop'},
    {'@type':'Organization',name:'RingSlot',url:'https://ringslot.shop',logo:'https://ringslot.shop/favicon.svg',
      contactPoint:{'@type':'ContactPoint',email:'support@ringslot.shop',contactType:'customer service',availableLanguage:'English'}},
  ],
};

export default function Home() {
  return (
    <>
      <Head>
        <title>RingSlot — Virtual Phone Numbers for SMS Verification | From $0.10</title>
        <meta name="description" content="Request one-time virtual phone number activations across 90+ selectable countries and dozens of configured services. Prices from $0.10, subject to inventory." />
        <meta name="keywords" content="virtual phone number, receive SMS online, temporary phone number, OTP verification, disposable phone number, virtual number telegram" />
        <link rel="canonical" href="https://ringslot.shop/" />
        <meta property="og:title" content="RingSlot — Virtual Phone Numbers for SMS Verification" />
        <meta property="og:description" content="90+ selectable countries and dozens of configured services. Pay crypto. From $0.10, subject to inventory." />
        <meta property="og:url" content="https://ringslot.shop/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://ringslot.shop/hero-backdrop.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.4} }
          @keyframes rs-spin { to{transform:rotate(360deg)} }
          body { background:#fafafa; color:var(--slate-900); }
        `}</style>
      </Head>

      <div style={{ minHeight:'100vh', background:'#fafafa' }}>
        <Navbar />
        <main>
          <Hero />
          <ActivationFlow />
          <PhoneSelector />
          <HowItWorks />
          <VisualBanner />
          <ServiceGrid />
          <WhyRingSlot />
          <Coverage />
          <Pricing />
          <ApiDocs />
          <Support />

          {/* Final CTA */}
          <section style={{ padding:'96px 0', background:'linear-gradient(135deg,var(--primary-600) 0%,var(--primary-900) 100%)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, right:0, width:500, height:500, background:'rgba(255,255,255,0.06)', borderRadius:'50%', transform:'translate(30%,-30%)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', bottom:0, left:0, width:400, height:400, background:'rgba(255,255,255,0.04)', borderRadius:'50%', transform:'translate(-30%,30%)', pointerEvents:'none' }} />
            <div className="wrap" style={{ position:'relative', zIndex:1, textAlign:'center' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:24, fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.9)', letterSpacing:'.08em', textTransform:'uppercase', marginBottom:24 }}>
                Get started
              </div>
              <h2 className="font-display" style={{ fontSize:'clamp(32px,5vw,56px)', fontWeight:700, color:'#fff', marginBottom:16, letterSpacing:'-0.04em', lineHeight:1.1 }}>
                Start in 60 seconds
              </h2>
              <p style={{ fontSize:18, color:'rgba(255,255,255,0.7)', marginBottom:40, maxWidth:480, margin:'0 auto 40px', lineHeight:1.75 }}>
                Create your account, deposit crypto, and receive your first OTP. No SIM card required.
              </p>
              <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
                <Link href="/register">
                  <button style={{ padding:'16px 36px', background:'#fff', color:'var(--primary-700)', border:'none', borderRadius:14, fontWeight:700, fontSize:16, cursor:'pointer', boxShadow:'0 8px 32px rgba(0,0,0,0.2)', transition:'all .2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform='none'}>
                    Create free account →
                  </button>
                </Link>
                <Link href="/api-docs">
                  <button style={{ padding:'16px 32px', background:'rgba(255,255,255,0.1)', color:'#fff', border:'1.5px solid rgba(255,255,255,0.3)', borderRadius:14, fontWeight:600, fontSize:16, cursor:'pointer', backdropFilter:'blur(8px)', transition:'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.2)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.transform='none'; }}>
                    API docs
                  </button>
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
