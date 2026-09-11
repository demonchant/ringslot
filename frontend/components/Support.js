import Link from 'next/link';

const FAQS = [
  { q:'Can I use RingSlot legally?', a:'Virtual numbers have legitimate uses, but laws and platform rules vary. You must have authority for your activity and comply with local law, our Acceptable Use Policy, and the third-party platform’s terms.' },
  { q:'What cryptocurrencies do you accept?', a:'The deposit screen shows the currencies currently supported by our payment processor. Confirmation time and network fees vary by asset.' },
  { q:'What if no OTP arrives?', a:'After 10 minutes with no OTP, a full automatic refund is credited to your wallet. You can also cancel manually at any time before the OTP arrives.' },
  { q:'How fast does the OTP arrive?', a:'Usually 5–30 seconds after purchasing. The dashboard polls every 5 seconds and displays the code the moment it arrives.' },
  { q:'Do you have a REST API?', a:'Yes. All accounts include full API access at no extra cost. Generate your X-API-Key in the dashboard. See the API docs for full reference.' },
  { q:'Can I rent a number long-term?', a:'Not currently. RingSlot offers one-time activation numbers while a reliable long-term rental lifecycle is being developed.' },
];

export default function Support({ headingLevel = 'h2' }) {
  const Heading = headingLevel;
  return (
    <section id="support" style={{ padding:'96px 0', background:'#fff' }}>
      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:80, alignItems:'start' }}>

          {/* Left */}
          <div>
            <div className="section-tag" style={{ display:'inline-flex' }}>Support</div>
            <Heading className="section-h2">Help when you need it</Heading>
            <p className="section-lead" style={{ marginBottom:32 }}>
              Send a detailed message and our support team will follow up by email.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:32 }}>
              {[{icon:'✉️',t:'Email support',d:'Use the contact form for account and pre-sale questions.'},{icon:'🔧',t:'Technical help',d:'Include an order ID and timestamp so we can investigate.'},{icon:'↩️',t:'Automatic refunds',d:'Eligible expired activations return funds to your wallet.'}].map(({ icon,t,d }) => (
                <div key={t} style={{ display:'flex', gap:14, alignItems:'flex-start', background:'var(--primary-50)', border:'1px solid var(--primary-100)', borderRadius:14, padding:'16px 20px' }}>
                  <span style={{ fontSize:22 }}>{icon}</span>
                  <div>
                    <div className="font-display" style={{ fontSize:14, fontWeight:700, color:'var(--slate-900)', marginBottom:2 }}>{t}</div>
                    <div style={{ fontSize:13, color:'var(--slate-500)' }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <Link href="/contact"><button className="btn-purple">Contact support</button></Link>
              <a href="mailto:support@ringslot.shop"><button className="btn-outline-purple">Email us</button></a>
            </div>
          </div>

          {/* Right — FAQ */}
          <div>
            <h3 className="font-display" style={{ fontSize:22, fontWeight:700, color:'var(--slate-900)', marginBottom:24 }}>Frequently asked</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {FAQS.map(({ q, a }, i) => (
                <FaqItem key={q} q={q} a={a} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }) {
  const { useState } = require('react');
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:'1px solid var(--slate-100)' }}>
      <button onClick={() => setOpen(!open)} style={{ width:'100%', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 0', textAlign:'left', gap:16 }}>
        <span className="font-display" style={{ fontSize:15, fontWeight:700, color:'var(--slate-900)' }}>{q}</span>
        <span style={{ fontSize:20, color:'var(--primary-500)', transform:open?'rotate(45deg)':'none', transition:'transform .2s', display:'inline-block', lineHeight:1, flexShrink:0 }}>+</span>
      </button>
      {open && <div style={{ paddingBottom:18, fontSize:14, color:'var(--slate-500)', lineHeight:1.75 }}>{a}</div>}
    </div>
  );
}
