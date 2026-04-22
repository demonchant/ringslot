import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PhoneSelector from '../components/PhoneSelector';
import HowItWorks from '../components/HowItWorks';
import VisualBanner from '../components/VisualBanner';
import ServiceGrid from '../components/ServiceGrid';
import Coverage from '../components/Coverage';
import WhyRingSlot from '../components/WhyRingSlot';
import Pricing from '../components/Pricing';
import Support from '../components/Support';
import Footer from '../components/Footer';
import Dashboard from '../components/Dashboard';
import AdminPanel from '../components/AdminPanel';
import ApiDocs from '../components/ApiDocs';
import Auth from '../components/Auth';
import CustomCursor from '../components/CustomCursor';
import Comparison from '../components/Comparison';
import Blog from '../components/Blog';

export default function Home() {
  const [currentView, setCurrentView] = useState('landing');
  const [blogArticle, setBlogArticle] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const setView = (view) => setCurrentView(view);

  if (currentView === 'dashboard') {
    return <Dashboard setView={setView} />;
  }

  if (currentView === 'admin') {
    return <AdminPanel setView={setView} />;
  }

  if (currentView === 'compare') {
    return (
      <>
        <Head>
          <title>Compare Virtual Number Services | RingSlot</title>
        </Head>
        <Navbar setView={setView} currentView={currentView} onAuth={(mode) => { setAuthMode(mode); setShowAuth(true); }} />
        <Comparison />
        <Footer />
      </>
    );
  }

  if (currentView === 'blog' && blogArticle) {
    return <Blog articleId={blogArticle} onBack={() => { setCurrentView('landing'); setBlogArticle(null); }} />;
  }

  return (
    <div className="min-h-screen bg-[#fafafa] transition-colors duration-500 selection:bg-primary-100 selection:text-primary-900 md:cursor-none cursor-auto">
      <Head>
        <title>RingSlot | Professional Virtual Phone Numbers for SMS Verification</title>
        <meta name="description" content="Professional virtual phone number service for SMS verification in 170+ countries. Get OTP codes instantly for Telegram, WhatsApp, and Google. Pay with Crypto." />
      </Head>
      
      <CustomCursor />
      
      <Navbar 
        setView={setView} 
        currentView={currentView} 
        onAuth={(mode) => { setAuthMode(mode); setShowAuth(true); }}
      />
      
      <main>
        <Hero />
        <PhoneSelector />
        <HowItWorks />
        <VisualBanner />

        <div className="bg-primary-50 py-4 text-center">
           <p className="text-primary-900 text-xs font-bold uppercase tracking-widest px-4">
             RingSlot is rated one of the best virtual phone number services for SMS verification in 2026.
           </p>
        </div>
        
        <ServiceGrid />
        <WhyRingSlot />
        <Coverage />
        <Pricing />
        
        <button 
          onClick={() => setCurrentView('compare')}
          className="w-full text-center py-12 bg-slate-50 border-y border-slate-100 text-slate-400 hover:text-primary-600 font-black uppercase tracking-widest text-xs transition-colors"
        >
          View Comparison Table →
        </button>

        <ApiDocs />
        <Support />
        
        {/* Footer Blog Links for SEO */}
        <div className="max-w-7xl mx-auto px-4 py-8 border-t border-slate-100 flex flex-wrap gap-8 justify-center">
            <button onClick={() => { setBlogArticle('virtual-phone-numbers-guide-2026'); setCurrentView('blog'); }} className="text-xs font-bold text-slate-400 hover:text-primary-600 transition-colors uppercase tracking-widest">Guide: Virtual Numbers 2026</button>
            <button onClick={() => { setBlogArticle('virtual-number-service-comparison-2026'); setCurrentView('blog'); }} className="text-xs font-bold text-slate-400 hover:text-primary-600 transition-colors uppercase tracking-widest">Tested: 7 Best Services</button>
        </div>

        <section className="py-24 bg-primary-600 text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Start in 60 seconds</h2>
            <p className="text-xl text-primary-100 mb-12 font-medium leading-relaxed">
               Create your account, deposit crypto, and receive your first OTP. No SIM card required.
            </p>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="bg-white text-primary-600 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-primary-50 transition-all shadow-2xl active:scale-95"
            >
              Get started
            </button>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
        </section>
      </main>
      
      <Footer />

      <AnimatePresence mode="wait">
        {showAuth && <Auth mode={authMode} setMode={setAuthMode} close={() => setShowAuth(false)} />}
      </AnimatePresence>
    </div>
  );
}
