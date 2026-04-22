import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogoIcon } from './LogoIcon';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'API', href: '/#api' },
    { name: 'Help', href: '/#support' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid transparent',
      padding: scrolled ? '12px 0' : '24px 0'
    }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <LogoIcon size={34} color="#9333ea" />
          <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--slate-900)', letterSpacing: '-0.04em' }}>RingSlot</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'none', lg: 'flex', alignItems: 'center', gap: 40 }}>
          {navLinks.map(l => (
            <Link key={l.name} href={l.href} style={{ fontSize: 14, fontWeight: 700, color: 'var(--slate-600)', textDecoration: 'none', transition: '0.2s', letterSpacing: '0.01em' }}
              onMouseEnter={e => e.target.style.color = 'var(--primary-600)'}
              onMouseLeave={e => e.target.style.color = 'var(--slate-600)'}>
              {l.name}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary" style={{ padding: '10px 24px', borderRadius: 12 }}>Launch App</button>
          </Link>
          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'flex', lg: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
            <div style={{ width: 20, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{ height: 2, background: 'var(--slate-900)', borderRadius: 2, transform: mobileOpen ? 'rotate(45deg) translateY(5px)' : 'none', transition: '0.2s' }} />
              <div style={{ height: 2, background: 'var(--slate-900)', borderRadius: 2, opacity: mobileOpen ? 0 : 1, transition: '0.2s' }} />
              <div style={{ height: 2, background: 'var(--slate-900)', borderRadius: 2, transform: mobileOpen ? 'rotate(-45deg) translateY(-5px)' : 'none', transition: '0.2s' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#fff', zIndex: -1,
        transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '100px 24px 40px', display: 'flex', flexDirection: 'column', gap: 32
      }}>
        {navLinks.map(l => (
          <Link key={l.name} href={l.href} onClick={() => setMobileOpen(false)} style={{ fontSize: 24, fontWeight: 800, color: 'var(--slate-900)', textDecoration: 'none' }}>
            {l.name}
          </Link>
        ))}
        <div style={{ marginTop: 'auto' }}>
          <Link href="/dashboard" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>Launch Dashboard</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
