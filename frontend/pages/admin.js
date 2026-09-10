import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import AdminSupport from '../components/AdminSupport';
import api from '../utils/api';

const OWNER_TABS = ['Overview', 'Users', 'Orders', 'Suppliers', 'Profit pricing', 'Withdrawals', 'Support'];
const STAFF_TABS = ['Users', 'Orders', 'Support'];
const money = (value) => `$${Number(value || 0).toFixed(4)}`;

export default function Admin() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab] = useState('Users');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [providers, setProviders] = useState([]);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const [markupForm, setMarkupForm] = useState({ service: '', markup: '' });
  const [withdrawForm, setWithdrawForm] = useState({ amount: '', method: 'crypto_usdt', destination: '' });
  const isOwner = currentUser?.role === 'superadmin';
  const tabs = useMemo(() => isOwner ? OWNER_TABS : STAFF_TABS, [isOwner]);

  useEffect(() => {
    async function load() {
      try {
        const { data: me } = await api.get('/me');
        if (!['admin', 'superadmin'].includes(me?.role)) return router.replace('/dashboard');
        setCurrentUser(me);
        const cached = JSON.parse(localStorage.getItem('rs_user') || '{}');
        localStorage.setItem('rs_user', JSON.stringify({ ...cached, ...me }));
        setTab(me.role === 'superadmin' ? 'Overview' : 'Users');
        const [userResult, orderResult] = await Promise.all([api.get('/admin/users'), api.get('/admin/orders')]);
        setUsers(userResult.data || []);
        setOrders(orderResult.data || []);
        if (me.role === 'superadmin') {
          const [statsResult, providerResult, serviceResult] = await Promise.all([
            api.get('/admin/stats'), api.get('/admin/providers'), api.get('/admin/services'),
          ]);
          setStats(statsResult.data);
          setProviders(providerResult.data || []);
          setServices(serviceResult.data || []);
        }
      } catch (error) {
        if ([401, 403].includes(error.response?.status)) router.replace('/dashboard');
        else setMessage(error.response?.data?.error || 'Could not load the admin workspace');
      }
    }
    load();
  }, [router]);

  async function toggleUser(user) {
    try {
      await api.post('/admin/users/toggle', { userId: user.id, isActive: !user.is_active });
      setUsers((items) => items.map((item) => item.id === user.id ? { ...item, is_active: !item.is_active } : item));
    } catch (error) { setMessage(error.response?.data?.error || 'Could not update account'); }
  }

  async function changeRole(userId, role) {
    try {
      await api.post('/admin/users/role', { userId, role });
      setUsers((items) => items.map((item) => item.id === userId ? { ...item, role } : item));
      setMessage('Staff permissions updated');
    } catch (error) { setMessage(error.response?.data?.error || 'Could not update role'); }
  }

  async function toggleProvider(provider) {
    try {
      await api.post('/admin/providers/toggle', { providerName: provider.provider_name, enabled: !provider.enabled });
      setProviders((items) => items.map((item) => item.id === provider.id ? { ...item, enabled: !item.enabled } : item));
    } catch (error) { setMessage(error.response?.data?.error || 'Could not update supplier'); }
  }

  async function saveMarkup(event) {
    event.preventDefault();
    try {
      await api.post('/admin/markup', markupForm);
      setServices((items) => items.map((item) => item.service_key === markupForm.service ? { ...item, markup: markupForm.markup } : item));
      setMessage('Profit pricing updated');
    } catch (error) { setMessage(error.response?.data?.error || 'Could not update pricing'); }
  }

  async function recordWithdrawal(event) {
    event.preventDefault();
    try {
      const { data } = await api.post('/admin/withdraw', withdrawForm);
      setMessage(`Withdrawal record created: ${data.withdrawalId}`);
      setWithdrawForm({ amount: '', method: 'crypto_usdt', destination: '' });
    } catch (error) { setMessage(error.response?.data?.error || 'Could not record withdrawal'); }
  }

  if (!currentUser) return <div className="page"><Navbar /><main style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>Loading secure workspace…</main></div>;

  return (
    <div className="page">
      <Navbar />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '6.5rem 1.5rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
          <div><h1 style={{ margin: 0, color: 'var(--text)' }}>{isOwner ? 'Owner Control Center' : 'Admin Workspace'}</h1><p style={{ color: 'var(--text-3)', margin: '6px 0 0' }}>{isOwner ? 'Protected supplier, pricing, profit, staff, and operations controls.' : 'Customer and support operations.'}</p></div>
          <span className="badge" style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>{isOwner ? 'Super admin' : 'Admin'}</span>
        </div>
        {message && <div className="alert" role="status" style={{ marginBottom: 16 }}>{message} <button onClick={() => setMessage('')} style={{ float: 'right', border: 0, background: 'none', cursor: 'pointer' }}>×</button></div>}
        <nav aria-label="Administration sections" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderBottom: '1px solid var(--border)', marginBottom: 24 }}>
          {tabs.map((name) => <button key={name} onClick={() => setTab(name)} style={{ padding: '10px 14px', border: 0, borderBottom: tab === name ? '2px solid var(--accent)' : '2px solid transparent', background: 'none', color: tab === name ? 'var(--accent)' : 'var(--text-3)', fontWeight: 700, cursor: 'pointer' }}>{name}</button>)}
        </nav>

        {tab === 'Overview' && isOwner && <section><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 16 }}>{[
          ['Net profit', money(stats?.totalProfit)], ['Customer revenue', money(stats?.totalRevenue)], ['Orders', stats?.totalOrders || 0], ['Customers', stats?.totalUsers || 0],
        ].map(([label, value]) => <div className="card" key={label}><small style={{ color: 'var(--text-3)' }}>{label}</small><div style={{ fontSize: 26, fontWeight: 800, color: 'var(--accent)', marginTop: 6 }}>{value}</div></div>)}</div></section>}

        {tab === 'Users' && <section className="card" style={{ overflowX: 'auto' }}><table className="table"><thead><tr><th>Email</th><th>Balance</th><th>Orders</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>{users.map((user) => <tr key={user.id}>
          <td>{user.email}</td><td>{money(user.balance)}</td><td>{user.order_count || 0}</td>
          <td>{isOwner && user.role !== 'superadmin' ? <select className="input" aria-label={`Role for ${user.email}`} value={user.role} onChange={(e) => changeRole(user.id, e.target.value)} style={{ minWidth: 105 }}><option value="user">User</option><option value="admin">Admin</option></select> : <span className="badge">{user.role === 'superadmin' ? 'Owner' : user.role}</span>}</td>
          <td style={{ color: user.is_active ? 'var(--success)' : 'var(--danger)' }}>{user.is_active ? 'Active' : 'Disabled'}</td>
          <td><button className={`btn btn-sm ${user.is_active ? 'btn-danger' : 'btn-ghost'}`} disabled={user.id === currentUser.id || user.role === 'superadmin' || (!isOwner && user.role === 'admin')} onClick={() => toggleUser(user)}>{user.is_active ? 'Disable' : 'Enable'}</button></td>
        </tr>)}</tbody></table></section>}

        {tab === 'Orders' && <section className="card" style={{ overflowX: 'auto' }}><table className="table"><thead><tr><th>User</th><th>Service</th><th>Number</th><th>Status</th><th>Charged</th>{isOwner && <><th>Supplier</th><th>Cost</th><th>Profit</th></>}</tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td>{order.email}</td><td>{order.service}</td><td className="font-mono">{order.phone_number}</td><td><span className={`badge badge-${order.status}`}>{order.status}</span></td><td>{money(order.user_price)}</td>{isOwner && <><td>{order.provider}</td><td>{money(order.provider_price)}</td><td style={{ color: 'var(--success)' }}>{money(order.profit)}</td></>}</tr>)}</tbody></table></section>}

        {tab === 'Suppliers' && isOwner && <section className="card">{providers.map((provider) => <div key={provider.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}><div><strong>{provider.provider_name}</strong><div style={{ color: 'var(--text-3)', fontSize: 13 }}>{provider.base_url} · priority {provider.priority}</div></div><button className={`btn btn-sm ${provider.enabled ? 'btn-danger' : 'btn-ghost'}`} onClick={() => toggleProvider(provider)}>{provider.enabled ? 'Disable' : 'Enable'}</button></div>)}</section>}

        {tab === 'Profit pricing' && isOwner && <section className="card" style={{ maxWidth: 560 }}><h2 style={{ marginTop: 0 }}>Service profit pricing</h2><p style={{ color: 'var(--text-2)' }}>Your customer price is supplier cost × multiplier. For example, 1.50 adds a 50% markup.</p><form onSubmit={saveMarkup}><label className="label">Service</label><select className="input" required value={markupForm.service} onChange={(e) => { const service = services.find((item) => item.service_key === e.target.value); setMarkupForm({ service: e.target.value, markup: service?.markup || '' }); }}><option value="">Select service…</option>{services.map((service) => <option key={service.service_key} value={service.service_key}>{service.display_name} (×{service.markup})</option>)}</select><label className="label" style={{ marginTop: 16 }}>Markup multiplier</label><input className="input" required type="number" min="1" max="10" step="0.01" value={markupForm.markup} onChange={(e) => setMarkupForm({ ...markupForm, markup: e.target.value })} /><button className="btn btn-primary" style={{ marginTop: 18 }}>Save pricing</button></form></section>}

        {tab === 'Withdrawals' && isOwner && <section className="card" style={{ maxWidth: 560 }}><h2 style={{ marginTop: 0 }}>Record owner withdrawal</h2><p style={{ color: 'var(--text-2)' }}>This creates an accounting record; it does not automatically send funds.</p><form onSubmit={recordWithdrawal}><label className="label">Amount (USD)</label><input className="input" required type="number" min="0.01" step="0.01" value={withdrawForm.amount} onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })} /><label className="label" style={{ marginTop: 16 }}>Method</label><select className="input" value={withdrawForm.method} onChange={(e) => setWithdrawForm({ ...withdrawForm, method: e.target.value })}><option value="crypto_usdt">USDT</option><option value="crypto_btc">Bitcoin</option></select><label className="label" style={{ marginTop: 16 }}>Destination address</label><input className="input font-mono" required value={withdrawForm.destination} onChange={(e) => setWithdrawForm({ ...withdrawForm, destination: e.target.value })} /><button className="btn btn-primary" style={{ marginTop: 18 }}>Record withdrawal</button></form></section>}
        {tab === 'Support' && <AdminSupport />}
      </main>
    </div>
  );
}
