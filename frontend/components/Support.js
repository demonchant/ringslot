import { useState } from 'react';

const FAQS = [
  { q: "How fast do I get the SMS code?", a: "Codes are typically delivered within 5–15 seconds after the service sends them. Our system polls in real-time." },
  { q: "What if I don't receive the code?", a: "If no code is received within 15 minutes, the order is automatically cancelled and your credits are fully refunded." },
  { q: "Can I reuse a number later?", a: "Temporary numbers are disposable. If you need a long-term solution, check our 'Private SIM' or 'Rentals' section in the dashboard." },
  { q: "What payment methods do you accept?", a: "We accept all major Credit/Debit cards (Visa, Mastercard), Apple Pay, Google Pay, and a wide range of Cryptocurrencies." }
];

export default function Support() {
  const [open, setOpen] = useState(0);

  return (
    <section id="support" style={{ padding: '120px 0', background: '#fff' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 64 }}>
          <div>
            <div className="section-tag">Support Center</div>
            <h2 className="section-h2" style={{ marginBottom: 32 }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FAQS.map((f, i) => (
                <div key={i} style={{ borderRadius: 16, border: '1.5px solid var(--slate-100)', overflow: 'hidden', transition: '0.2s' }}>
                  <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none', background: '#fff', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--slate-900)' }}>{f.q}</span>
                    <span style={{ fontSize: 20, transform: open === i ? 'rotate(180deg)' : 'none', transition: '0.2s', opacity: 0.3 }}>▼</span>
                  </button>
                  {open === i && (
                    <div style={{ padding: '0 24px 20px', fontSize: 15, color: 'var(--slate-500)', lineHeight: 1.6 }}>{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--slate-50)', borderRadius: 40, padding: 48, display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <h3 className="font-display" style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Still have questions?</h3>
              <p style={{ fontSize: 16, color: 'var(--slate-500)', lineHeight: 1.6 }}>Our dedicated support team is available 24/7 to help you with any issues or custom requests.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#fff', padding: 24, borderRadius: 20, border: '1.5px solid var(--slate-100)', display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary-50)', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>✉️</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '.05em' }}>Email Support</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--slate-900)' }}>support@ringslot.com</div>
                </div>
              </div>
              <div style={{ background: '#fff', padding: 24, borderRadius: 20, border: '1.5px solid var(--slate-100)', display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary-50)', color: 'var(--primary-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>💬</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '.05em' }}>Live Support</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--slate-900)' }}>Available in Dashboard</div>
                </div>
              </div>
            </div>

            <button className="btn-purple" style={{ width: '100%', marginTop: 'auto' }}>Open a Ticket</button>
          </div>
        </div>
      </div>
    </section>
  );
}
