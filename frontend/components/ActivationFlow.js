import { useEffect, useState } from 'react';
import Link from 'next/link';
import ServiceLogo from './ServiceLogo';

const SERVICES = [
  { key: 'telegram', name: 'Telegram', number: '+1 424 678 2048', code: '481 902' },
  { key: 'whatsapp', name: 'WhatsApp', number: '+44 7400 123 820', code: '763 145' },
  { key: 'google', name: 'Google', number: '+49 151 234 9081', code: '294 670' },
  { key: 'discord', name: 'Discord', number: '+33 612 345 781', code: '850 217' },
];

const PHASES = [
  { label: 'Checking inventory', detail: 'Matching service and country' },
  { label: 'Number assigned', detail: 'Activation window started' },
  { label: 'Waiting for SMS', detail: 'Dashboard is monitoring' },
  { label: 'Code received', detail: 'Ready to copy securely' },
];

export default function ActivationFlow() {
  const [serviceIndex, setServiceIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  const service = SERVICES[serviceIndex];

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;
    const timer = setInterval(() => {
      setPhase((current) => {
        if (current === PHASES.length - 1) {
          setServiceIndex((index) => (index + 1) % SERVICES.length);
          return 0;
        }
        return current + 1;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="activation-flow" aria-labelledby="activation-flow-title">
      <div className="wrap activation-flow-grid">
        <div>
          <div className="section-tag">Illustrated activation flow</div>
          <h2 id="activation-flow-title" className="section-h2">From service selection to SMS, in one clear flow</h2>
          <p className="section-lead">
            Pick a platform and country. RingSlot checks live inventory, assigns an available number, and monitors the activation while you stay on the dashboard.
          </p>
          <div className="activation-points">
            <span>RingSlot smart routing</span>
            <span>Live inventory check</span>
            <span>10-minute activation window</span>
          </div>
          <Link href="/register" className="activation-link">Check available services <span aria-hidden="true">→</span></Link>
        </div>

        <div className="activation-stage" aria-label="Illustration of a virtual number activation moving from service selection through SMS delivery">
          <div className="activation-orb activation-orb-one" />
          <div className="activation-orb activation-orb-two" />

          <div className="activation-topline">
            <span><i /> System ready</span>
            <span>RingSlot network</span>
          </div>

          <div className="activation-service-row">
            <div className="activation-service-card" key={service.key}>
              <ServiceLogo serviceKey={service.key} displayName={service.name} size={48} />
              <div>
                <small>Selected service</small>
                <strong>{service.name}</strong>
              </div>
            </div>
            <div className="activation-route" aria-hidden="true">
              <span /><span /><span />
            </div>
            <div className="activation-network">
              <div className="activation-rings"><i /><i /><i /></div>
              <small>Routing</small>
            </div>
          </div>

          <div className="activation-phone-card">
            <div className="activation-phone-head">
              <span>{phase === 0 ? 'Preparing activation' : 'Active number'}</span>
              <b>{Math.round(((phase + 1) / PHASES.length) * 100)}%</b>
            </div>
            <div className="activation-progress"><span style={{ width: `${((phase + 1) / PHASES.length) * 100}%` }} /></div>
            <div className="activation-number">{phase > 0 ? service.number : '••• ••• ••• •••'}</div>
            <div className={`activation-message ${phase === 3 ? 'received' : ''}`}>
              <div className="activation-message-icon">{phase === 3 ? '✓' : '···'}</div>
              <div>
                <small>{PHASES[phase].label}</small>
                <strong>{phase === 3 ? service.code : PHASES[phase].detail}</strong>
              </div>
              <span>{phase === 3 ? 'Copy' : 'Live'}</span>
            </div>
          </div>

          <div className="activation-service-dots" aria-hidden="true">
            {SERVICES.map((item, index) => (
              <span key={item.key} className={index === serviceIndex ? 'active' : ''} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .activation-flow{padding:96px 0;background:#fff;overflow:hidden}
        .activation-flow-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(420px,1.1fr);gap:72px;align-items:center}
        .activation-points{display:flex;flex-wrap:wrap;gap:9px;margin:28px 0}
        .activation-points span{font-size:12px;font-weight:700;color:var(--primary-700);background:var(--primary-50);border:1px solid var(--primary-100);border-radius:999px;padding:7px 11px}
        .activation-link{display:inline-flex;gap:9px;align-items:center;color:var(--primary-700);font-weight:750;text-decoration:none}
        .activation-stage{position:relative;min-height:490px;padding:24px;border:1px solid var(--primary-100);border-radius:30px;background:linear-gradient(145deg,#faf5ff 0%,#fff 48%,#f8fafc 100%);box-shadow:0 32px 90px rgba(88,28,135,.14);overflow:hidden}
        .activation-orb{position:absolute;border-radius:50%;filter:blur(4px);pointer-events:none}
        .activation-orb-one{width:260px;height:260px;right:-90px;top:-80px;background:rgba(168,85,247,.12);animation:orb-drift 7s ease-in-out infinite}
        .activation-orb-two{width:180px;height:180px;left:-70px;bottom:-55px;background:rgba(59,130,246,.09);animation:orb-drift 8s ease-in-out infinite reverse}
        .activation-topline{position:relative;display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:750;color:var(--slate-500);letter-spacing:.04em;text-transform:uppercase;margin-bottom:36px}
        .activation-topline span:first-child{display:flex;align-items:center;gap:7px;color:#059669}.activation-topline i{width:7px;height:7px;border-radius:50%;background:#10b981;box-shadow:0 0 0 5px rgba(16,185,129,.12);animation:status-pulse 1.8s ease-out infinite}
        .activation-service-row{position:relative;display:grid;grid-template-columns:minmax(150px,1fr) 80px 92px;align-items:center;gap:12px;margin-bottom:26px}
        .activation-service-card{display:flex;align-items:center;gap:12px;padding:16px;background:#fff;border:1px solid var(--slate-200);border-radius:17px;box-shadow:0 12px 30px rgba(15,23,42,.08);animation:card-enter .45s ease both}
        .activation-service-card small,.activation-network small,.activation-message small{display:block;color:var(--slate-400);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em}
        .activation-service-card strong{display:block;color:var(--slate-900);font-size:15px;margin-top:2px}
        .activation-route{display:flex;align-items:center;justify-content:space-around}.activation-route span{width:7px;height:7px;border-radius:50%;background:var(--primary-300);animation:route-dot 1.5s ease-in-out infinite}.activation-route span:nth-child(2){animation-delay:.2s}.activation-route span:nth-child(3){animation-delay:.4s}
        .activation-network{text-align:center;color:var(--primary-700);font-weight:700}.activation-rings{position:relative;width:62px;height:62px;margin:0 auto 8px}.activation-rings i{position:absolute;inset:0;border:1.5px solid var(--primary-300);border-radius:50%;animation:network-ring 2.2s ease-out infinite}.activation-rings i:nth-child(2){animation-delay:.65s}.activation-rings i:nth-child(3){animation-delay:1.3s}
        .activation-phone-card{position:relative;background:#111827;color:#fff;border-radius:24px;padding:24px;box-shadow:0 24px 50px rgba(15,23,42,.24)}
        .activation-phone-head{display:flex;justify-content:space-between;text-transform:uppercase;font-size:10px;letter-spacing:.08em;color:#94a3b8;font-weight:700}.activation-phone-head b{color:#c4b5fd}
        .activation-progress{height:4px;background:rgba(255,255,255,.09);border-radius:8px;margin:12px 0 24px;overflow:hidden}.activation-progress span{display:block;height:100%;border-radius:8px;background:linear-gradient(90deg,#a855f7,#60a5fa);transition:width .45s ease}
        .activation-number{font-family:'JetBrains Mono',monospace;font-weight:750;font-size:clamp(19px,3vw,27px);letter-spacing:-.03em;margin-bottom:22px;min-height:41px}
        .activation-message{display:grid;grid-template-columns:38px 1fr auto;align-items:center;gap:12px;padding:13px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.09);border-radius:14px;transition:all .35s ease}.activation-message.received{background:rgba(16,185,129,.12);border-color:rgba(52,211,153,.28)}
        .activation-message-icon{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;background:rgba(168,85,247,.2);color:#d8b4fe;font-weight:800}.activation-message.received .activation-message-icon{background:#10b981;color:#fff}
        .activation-message strong{display:block;font-size:13px;margin-top:2px}.activation-message>span{font-size:10px;font-weight:800;color:#c4b5fd;text-transform:uppercase}.activation-message.received>span{color:#6ee7b7}
        .activation-service-dots{display:flex;justify-content:center;gap:7px;margin-top:20px}.activation-service-dots span{width:6px;height:6px;border-radius:9px;background:var(--slate-300);transition:all .3s}.activation-service-dots span.active{width:24px;background:var(--primary-500)}
        @keyframes card-enter{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}
        @keyframes route-dot{0%,100%{opacity:.25;transform:translateX(-3px)}50%{opacity:1;transform:translateX(3px)}}
        @keyframes network-ring{0%{transform:scale(.25);opacity:1}100%{transform:scale(1);opacity:0}}
        @keyframes status-pulse{0%{box-shadow:0 0 0 0 rgba(16,185,129,.35)}100%{box-shadow:0 0 0 9px rgba(16,185,129,0)}}
        @keyframes orb-drift{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(-18px,16px,0)}}
        @media(max-width:900px){.activation-flow-grid{grid-template-columns:1fr;gap:42px}.activation-stage{min-height:460px}}
        @media(max-width:560px){.activation-flow{padding:72px 0}.activation-stage{padding:18px;min-height:450px}.activation-service-row{grid-template-columns:1fr 46px 68px}.activation-service-card{padding:12px}.activation-network{transform:scale(.86)}.activation-number{font-size:19px}}
        @media(prefers-reduced-motion:reduce){.activation-flow *{animation:none!important;transition:none!important}}
      `}</style>
    </section>
  );
}
