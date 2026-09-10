import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import { BASE_URL } from '../utils/seoData';

const CHECKS = [
  { key: 'api', name: 'API gateway', path: '/health' },
  { key: 'database', name: 'Database', path: '/health/database' },
  { key: 'redis', name: 'Queue and cache', path: '/health/redis' },
  { key: 'providers', name: 'Number providers', path: '/health/providers' },
];

export default function StatusPage() {
  const [checks, setChecks] = useState(() => Object.fromEntries(CHECKS.map(c => [c.key, { state: 'checking' }])));
  const [checkedAt, setCheckedAt] = useState(null);

  async function refresh() {
    const results = await Promise.all(CHECKS.map(async (check) => {
      try {
        const response = await api.get(check.path);
        const healthy = response.status < 400 && response.data?.status === 'ok';
        return [check.key, { state: healthy ? 'operational' : 'degraded', latency: response.data?.latencyMs }];
      } catch (error) {
        const response = error.response;
        if (response) return [check.key, { state: 'degraded', latency: response.data?.latencyMs }];
        return [check.key, { state: 'unavailable' }];
      }
    }));
    setChecks(Object.fromEntries(results));
    setCheckedAt(new Date());
  }

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, 60000);
    return () => clearInterval(timer);
  }, []);

  const values = Object.values(checks);
  const overall = values.some(v => v.state === 'unavailable') ? 'Service interruption'
    : values.some(v => v.state === 'degraded') ? 'Some systems degraded'
    : values.every(v => v.state === 'operational') ? 'All checked systems operational'
    : 'Checking live systems';

  return <div className="page">
    <Head>
      <title>Live System Status | RingSlot</title>
      <meta name="description" content="Live health checks for the RingSlot API, database, queue, and number provider connections." />
      <link rel="canonical" href={`${BASE_URL}/status`} />
      <meta name="robots" content="noindex,follow" />
    </Head>
    <Navbar />
    <main style={{ padding: '116px 0 80px' }}>
      <div className="wrap" style={{ maxWidth: 820 }}>
        <div className="section-tag" style={{ display: 'inline-flex', marginBottom: 14 }}>Live status</div>
        <h1 className="section-h2">{overall}</h1>
        <p className="section-lead" style={{ marginBottom: 30 }}>These checks come directly from the production API and refresh every 60 seconds.</p>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {CHECKS.map((check, index) => {
            const value = checks[check.key];
            const color = value.state === 'operational' ? 'var(--success)' : value.state === 'checking' ? 'var(--warning)' : 'var(--danger)';
            return <div key={check.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '19px 22px', borderBottom: index < CHECKS.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <span aria-hidden="true" style={{ width: 9, height: 9, borderRadius: '50%', background: color, flexShrink: 0 }} />
              <strong style={{ flex: 1, color: 'var(--text)', fontSize: 15 }}>{check.name}</strong>
              {Number.isFinite(value.latency) && <span style={{ color: 'var(--text-3)', fontSize: 12 }}>{value.latency} ms</span>}
              <span style={{ color, fontSize: 13, fontWeight: 700, textTransform: 'capitalize' }}>{value.state}</span>
            </div>;
          })}
        </div>

        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-3)', fontSize: 13 }}>{checkedAt ? `Last checked ${checkedAt.toLocaleTimeString()}` : 'Starting checks…'}</span>
          <button className="btn-outline-purple" onClick={refresh}>Check again</button>
        </div>
        <p style={{ marginTop: 28, padding: 16, border: '1px solid var(--border)', borderRadius: 12, background: 'var(--surface-2)', color: 'var(--text-2)', lineHeight: 1.7 }}>A healthy provider connection does not guarantee inventory for every service and country. If an order fails, no successful charge should be recorded; contact support with the order time if you need help.</p>
      </div>
    </main>
    <Footer />
  </div>;
}
