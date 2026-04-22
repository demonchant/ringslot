/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Users, 
  BarChart3, 
  DollarSign, 
  Settings, 
  Activity, 
  ShieldAlert, 
  Check, 
  X, 
  Search,
  ArrowUpRight,
  TrendingUp,
  History
} from 'lucide-react';
import { useState } from 'react';

export default function AdminPanel({ setView }) {
  const [activeTab, setActiveTab] = useState('Overview');

  const stats = [
    { label: 'Total Profit', value: '$12,842.15', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Total Revenue', value: '$45,201.80', icon: DollarSign, color: 'text-primary-400' },
    { label: 'Total Orders', value: '142,012', icon: BarChart3, color: 'text-indigo-400' },
    { label: 'Active Users', value: '8,421', icon: Users, color: 'text-blue-400' },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-2xl px-8 h-20 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-12">
          <button onClick={() => setView('landing')} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#9333ea] rounded-xl flex items-center justify-center text-white p-2">
              <div className="grid grid-cols-2 gap-1 w-full h-full">
                <div className="bg-white rounded-[2px]"></div>
                <div className="bg-white rounded-[2px]"></div>
                <div className="bg-white rounded-[2px]"></div>
                <div className="bg-white/50 rounded-[2px]"></div>
              </div>
            </div>
            <span className="font-display font-black text-2xl tracking-tight">RingSlot</span>
            <span className="bg-primary-500/20 text-primary-400 text-[10px] font-black uppercase px-2 py-0.5 rounded ml-2">Admin</span>
          </button>

          <nav className="hidden lg:flex items-center gap-2">
            {['Overview', 'Users', 'Orders', 'Providers', 'Markup'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <button onClick={() => setView('dashboard')} className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all">
          Exit Admin
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                      <stat.icon size={24} />
                    </div>
                    <ArrowUpRight size={20} className="text-slate-600 group-hover:text-white transition-all" />
                  </div>
                  <p className="text-xs font-black uppercase text-slate-500 tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black font-mono">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
               <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10">
                  <h3 className="text-2xl font-black mb-8 italic">Recent Orders</h3>
                  <div className="space-y-4">
                    {[
                      { user: 'user1@email.com', svc: 'Telegram', price: '$0.15', status: 'Success' },
                      { user: 'test99@gmail.com', svc: 'WhatsApp', price: '$0.12', status: 'Pending' },
                      { user: 'dev_alex@dev.io', svc: 'Google', price: '$0.14', status: 'Success' },
                      { user: 'crypto_knight@web3.com', svc: 'Discord', price: '$0.10', status: 'Failed' },
                    ].map((order, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5">
                        <div>
                          <p className="text-sm font-bold">{order.user}</p>
                          <p className="text-[10px] uppercase font-black text-slate-500">{order.svc}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-primary-400">{order.price}</p>
                          <p className={`text-[10px] font-black uppercase ${order.status === 'Success' ? 'text-green-500' : 'text-red-500'}`}>{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10">
                  <h3 className="text-2xl font-black mb-8 italic">System Health</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'API Uptime', val: '99.98%' },
                      { label: 'DB Latency', val: '12ms' },
                      { label: 'Provider Sync', val: 'Active' },
                      { label: 'Memory Usage', val: '42%' },
                    ].map((h, i) => (
                      <div key={i} className="bg-black/40 border border-white/5 p-6 rounded-3xl">
                        <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest block mb-2">{h.label}</span>
                        <span className="text-xl font-black text-primary-500">{h.val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-6 rounded-3xl bg-primary-500/5 border border-primary-500/10 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Activity className="text-primary-500" size={20} />
                        <span className="text-sm font-bold">All systems operational</span>
                     </div>
                     <button className="text-[10px] font-black uppercase tracking-widest text-primary-500 hover:underline">View Logs</button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black italic">Manage Users</h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input className="bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-sm font-bold w-80 outline-none focus:ring-2 focus:ring-primary-500" placeholder="Search by email or ID..." />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="pb-4 text-[10px] font-black uppercase text-slate-500 tracking-widest px-4">User</th>
                    <th className="pb-4 text-[10px] font-black uppercase text-slate-500 tracking-widest px-4">Balance</th>
                    <th className="pb-4 text-[10px] font-black uppercase text-slate-500 tracking-widest px-4">Orders</th>
                    <th className="pb-4 text-[10px] font-black uppercase text-slate-500 tracking-widest px-4">Status</th>
                    <th className="pb-4 text-[10px] font-black uppercase text-slate-500 tracking-widest px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { email: 'oladapodamiey@gmail.com', bal: '$14.20', orders: 152, status: 'Active' },
                    { email: 'guest_82@web.de', bal: '$0.00', orders: 0, status: 'Active' },
                    { email: 'scammer_detect@security.com', bal: '$1,200.00', orders: 42, status: 'Banned' },
                  ].map((u, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="py-6 px-4 font-bold text-sm">{u.email}</td>
                      <td className="py-6 px-4 font-mono font-bold text-primary-400">{u.bal}</td>
                      <td className="py-6 px-4 text-slate-500 font-bold">{u.orders}</td>
                      <td className="py-6 px-4">
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${u.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-6 px-4 text-right">
                         <button className="text-slate-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'Markup' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10">
              <h3 className="text-2xl font-black mb-2 italic">Global Pricing</h3>
              <p className="text-slate-500 font-medium mb-10">Set the default profit margin for all services.</p>
              
              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-black/50 border border-white/5 space-y-6">
                  <div>
                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest block mb-4">Markup Multiplier</label>
                    <div className="flex items-center gap-6">
                      <input type="range" className="flex-1 accent-primary-500" min="1" max="5" step="0.1" defaultValue="1.5" />
                      <span className="text-3xl font-black font-mono text-primary-500">1.5x</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-primary-500/5 border border-primary-500/10 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                    Profit Margin: 50%
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-2">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block">Base Avg</span>
                      <span className="text-xl font-black font-mono">$0.1000</span>
                   </div>
                   <div className="p-6 rounded-3xl bg-primary-500/10 border border-primary-500/20 space-y-2">
                      <span className="text-[10px] font-black uppercase text-primary-500 tracking-widest block">Retail Avg</span>
                      <span className="text-xl font-black font-mono">$0.1500</span>
                   </div>
                </div>

                <button className="w-full py-5 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-primary-700 shadow-xl shadow-primary-600/20">
                  Update All Services
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
