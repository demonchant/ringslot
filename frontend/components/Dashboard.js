/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Wallet, 
  Search, 
  Smartphone, 
  Clock, 
  Key, 
  Plus, 
  LogOut, 
  Zap, 
  ArrowRight,
  Shield,
  CreditCard,
  RefreshCw,
  History,
  Copy,
  Check,
  X,
  Globe
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { SERVICES } from '../constants';
import COUNTRIES from './CountrySelect';

export default function Dashboard({ setView }) {
  const [activeTab, setActiveTab] = useState('buy');
  const [balance, setBalance] = useState(0.0000);
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [depositMethod, setDepositMethod] = useState(null);
  const [depositAddress, setDepositAddress] = useState('');

  const handleDeposit = (method) => {
    setDepositMethod(method);
    // Simulate address generation
    const addresses = {
      'Bitcoin': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      'Ethereum': '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      'USDT (TRC20)': 'TR7NHqjuSXPabU7vMdb5yXv8aL8wXf4k9J',
      'Litecoin': 'LhYV19J3S3Y4Y8J3S3Y4Y8J3S3Y4Y8J3S'
    };
    setDepositAddress(addresses[method] || '0x...');
  };
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [showCountryDrop, setShowCountryDrop] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [buyError, setBuyError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [copied, setCopied] = useState('');
  
  const timerRef = useRef(null);
  const pollRef = useRef(null);

  // Polling for OTP logic
  const startPolling = (orderId) => {
    clearInterval(pollRef.current);
    pollRef.current = setInterval(() => {
      // Simulate API call
      console.log('Polling for order...', orderId);
      // After some time, simulate receiving an OTP
      if (Math.random() > 0.8) {
        setOrder(prev => prev ? { ...prev, status: 'received', otp: Math.floor(100000 + Math.random() * 900000).toString() } : null);
        clearInterval(pollRef.current);
      }
    }, 5000);
  };

  const handleBuy = (service) => {
    setBuyLoading(true);
    setBuyError('');
    // Simulate API call
    setTimeout(() => {
      if (balance < service.price) {
        setBuyError('Insufficient balance. Please deposit funds.');
        setBuyLoading(false);
        return;
      }
      
      const newOrder = {
        orderId: Math.random().toString(36).substr(2, 9),
        number: selectedCountry.dial + ' ' + Math.floor(100000000 + Math.random() * 900000000),
        service: service.name,
        status: 'waiting',
        price: service.price
      };
      
      setOrder(newOrder);
      setBalance(prev => prev - service.price);
      setCountdown(600); // 10 minutes
      startPolling(newOrder.orderId);
      setBuyLoading(false);
    }, 1500);
  };

  const cancelOrder = () => {
    if (!order) return;
    setBalance(prev => prev + order.price);
    setOrder(null);
    clearInterval(pollRef.current);
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && order && order.status === 'waiting') {
      setOrder(prev => prev ? { ...prev, status: 'expired' } : null);
    }
    return () => clearInterval(timerRef.current);
  }, [countdown, order]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const filteredServices = SERVICES.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary-500/30">
      
      {/* Dashboard Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <button 
              onClick={() => setView('landing')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-[#9333ea] rounded-xl flex items-center justify-center text-white p-2 shadow-lg shadow-primary-600/30">
                <div className="grid grid-cols-2 gap-1 w-full h-full">
                  <div className="bg-white rounded-[2px]"></div>
                  <div className="bg-white rounded-[2px]"></div>
                  <div className="bg-white rounded-[2px]"></div>
                  <div className="bg-white/50 rounded-[2px]"></div>
                </div>
              </div>
              <span className="font-display font-black text-2xl tracking-tight">RingSlot</span>
            </button>

            <nav className="hidden lg:flex items-center gap-10">
               <button onClick={() => setView('landing')} className="text-xs font-bold text-slate-400 hover:text-white transition-colors">Home</button>
               <a href="/#pricing" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">Pricing</a>
               <a href="/#services" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">Services</a>
               <a href="/#coverage" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">Countries</a>
               <a href="/#api" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">API</a>
               <a href="/#support" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">Support</a>
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex bg-white/5 border border-white/20 px-4 lg:px-6 py-2 lg:py-3 rounded-2xl items-center gap-4 lg:gap-10 shadow-2xl shadow-primary-600/10">
              <div className="flex flex-col text-right">
                <span className="text-[9px] lg:text-[11px] font-black uppercase text-slate-500 tracking-widest mb-0.5">Balance</span>
                <span className="text-primary-400 font-mono font-black text-lg lg:text-2xl leading-none">${balance.toFixed(4)}</span>
              </div>
              <button 
                onClick={() => setActiveTab('deposit')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl text-[10px] lg:text-sm font-black flex items-center gap-2 shadow-lg shadow-primary-600/30 transition-all uppercase tracking-widest"
              >
                <Plus size={16} /> <span className="hidden lg:inline">DEPOSIT</span>
              </button>
            </div>
            <button 
              onClick={() => setView('landing')}
              className="text-slate-500 hover:text-white transition-colors p-2"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="w-full md:w-auto">
            <h1 className="text-3xl md:text-5xl font-black mb-2 italic">Dashboard</h1>
            <p className="text-slate-500 font-medium tracking-tight text-sm md:text-base truncate max-w-[280px] md:max-w-none">
              oladapodamiey@gmail.com
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
             <div className="flex-1 bg-white/5 border border-white/10 p-6 rounded-[2rem] flex flex-col justify-center min-w-[200px]">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                   <Wallet size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Available Credit</span>
                </div>
                <div className="text-4xl font-black font-mono text-primary-500">${balance.toFixed(4)}</div>
             </div>
             <div className="flex-1 bg-primary-600 p-6 rounded-[2rem] flex flex-col justify-center cursor-pointer hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 group" onClick={() => setActiveTab('deposit')}>
                <div className="flex items-center gap-2 text-white/70 mb-2">
                   <Plus size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Quick Actions</span>
                </div>
                <div className="text-2xl font-black text-white group-hover:translate-x-1 transition-transform flex items-center gap-2">
                   Top Up Now <ArrowRight size={20} />
                </div>
             </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-1">
          {[
            { id: 'buy', label: 'Buy number', icon: Zap },
            { id: 'rent', label: 'Rent number', icon: Clock },
            { id: 'orders', label: 'Orders', icon: History },
            { id: 'api', label: 'API key', icon: Key },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 rounded-t-2xl font-bold text-sm flex items-center gap-2 transition-all relative ${
                activeTab === tab.id 
                  ? 'text-primary-400 bg-white/5' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabDashboard"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600"
                />
              )}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'buy' && (
                <motion.div 
                  key="buy"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-6"
                >
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl">
                    <h3 className="text-2xl font-black mb-6 italic">Get a number</h3>
                    
                    <div className="relative mb-8">
                      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                      <input 
                        type="text" 
                        placeholder="Search services (Telegram, WhatsApp, etc)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-16 pr-6 focus:ring-2 focus:ring-primary-600 outline-none font-bold"
                      />
                    </div>

                    <div className="mb-8 flex items-center justify-between gap-4">
                      <div className="relative flex-1">
                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-2">Select Country</span>
                        <button 
                          onClick={() => setShowCountryDrop(!showCountryDrop)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/5 transition-all"
                        >
                          <div className="flex items-center gap-2 font-bold">
                            <span>{selectedCountry.flag}</span>
                            <span>{selectedCountry.name}</span>
                          </div>
                          <Globe size={16} className="text-slate-500" />
                        </button>

                        <AnimatePresence>
                          {showCountryDrop && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-50 max-h-[300px] overflow-y-auto overflow-x-hidden custom-scrollbar"
                            >
                              {COUNTRIES.map((cty) => (
                                <button 
                                  key={cty.code}
                                  onClick={() => {
                                    setSelectedCountry(cty);
                                    setShowCountryDrop(false);
                                  }}
                                  className="w-full p-4 flex items-center gap-3 hover:bg-white/5 text-left border-b border-white/5 last:border-0"
                                >
                                  <span>{cty.flag}</span>
                                  <span className="font-bold text-sm">{cty.name}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {buyError && (
                      <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold flex items-center gap-2">
                        <X size={16} /> {buyError}
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                      {filteredServices.map((service) => (
                        <button 
                          key={service.id}
                          onClick={() => handleBuy(service)}
                          disabled={buyLoading}
                          className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-500/50 hover:bg-white/10 transition-all text-left group disabled:opacity-50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white overflow-hidden flex items-center justify-center p-1.5 group-hover:scale-110 transition-transform shrink-0 shadow-lg">
                              <img 
                                src={`https://www.google.com/s2/favicons?domain=${service.domain}&sz=128`} 
                                alt={service.name}
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${service.name}&background=9333ea&color=fff`;
                                }}
                              />
                            </div>
                            <span className="font-bold truncate">{service.name}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-primary-500 font-black text-sm">${service.price}</span>
                            <span className="text-[10px] text-slate-500 font-bold">Standard</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'rent' && (
                <motion.div 
                  key="rent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 overflow-hidden relative"
                >
                  <div className="relative z-10 grid md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-2xl font-black mb-4 italic">Rent a number</h3>
                      <p className="text-slate-400 mb-8 font-medium">Rent a dedicated number for <span className="text-green-400">1 month to 12 months</span>. Receive unlimited SMS on the same number.</p>
                      
                      <div className="space-y-4">
                        <select className="w-full bg-black border border-white/10 p-5 rounded-2xl font-bold appearance-none">
                          <option>Select Service</option>
                          <option>Any Service</option>
                          <option>Social Media</option>
                        </select>
                        <select className="w-full bg-black border border-white/10 p-5 rounded-2xl font-bold appearance-none">
                          <option>United States (+1)</option>
                          <option>United Kingdom (+44)</option>
                          <option>Germany (+49)</option>
                        </select>
                        <button className="w-full py-5 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-primary-700 shadow-xl shadow-primary-600/20 active:scale-95">
                          View Pricing
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h4 className="font-black uppercase text-xs tracking-[0.3em] text-slate-500">How rental works</h4>
                      <div className="space-y-6">
                        {[
                          { icon: Smartphone, title: 'Fixed term', desc: 'Number stays active for the full period.' },
                          { icon: Shield, title: 'Unlimited SMS', desc: 'Receive as many codes as you need.' },
                          { icon: RefreshCw, title: 'Refund policy', desc: 'No SMS in first 24h? Full refund.' }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary-400 shrink-0">
                              <item.icon size={20} />
                            </div>
                            <div>
                              <p className="font-bold text-sm mb-1">{item.title}</p>
                              <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl">
                    <h3 className="text-2xl font-black mb-8 italic">Order History</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="pb-4 text-[10px] font-black uppercase text-slate-500 tracking-widest px-4">Service</th>
                            <th className="pb-4 text-[10px] font-black uppercase text-slate-500 tracking-widest px-4">Number</th>
                            <th className="pb-4 text-[10px] font-black uppercase text-slate-500 tracking-widest px-4">Date</th>
                            <th className="pb-4 text-[10px] font-black uppercase text-slate-500 tracking-widest px-4 text-right">Price</th>
                            <th className="pb-4 text-[10px] font-black uppercase text-slate-500 tracking-widest px-4 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                            <td className="py-6 px-4 font-bold">Telegram</td>
                            <td className="py-6 px-4 font-mono text-slate-300">+44 20 1234 568</td>
                            <td className="py-6 px-4 text-xs text-slate-500 font-medium">Apr 18, 04:12</td>
                            <td className="py-6 px-4 text-right font-mono font-bold text-primary-400">$0.15</td>
                            <td className="py-6 px-4 text-right">
                              <span className="bg-green-500/10 text-green-400 text-[10px] font-black uppercase px-2 py-1 rounded">Finished</span>
                            </td>
                          </tr>
                          <tr className="group hover:bg-white/[0.02] transition-colors">
                            <td className="py-6 px-4 font-bold">WhatsApp</td>
                            <td className="py-6 px-4 font-mono text-slate-300">+1 202 555 0124</td>
                            <td className="py-6 px-4 text-xs text-slate-500 font-medium">Apr 17, 21:05</td>
                            <td className="py-6 px-4 text-right font-mono font-bold text-primary-400">$0.12</td>
                            <td className="py-6 px-4 text-right">
                              <span className="bg-slate-500/10 text-slate-500 text-[10px] font-black uppercase px-2 py-1 rounded">Cancelled</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'api' && (
                <motion.div key="api" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10">
                    <h3 className="text-2xl font-black mb-2 italic">API Configuration</h3>
                    <p className="text-slate-500 mb-10 font-medium">Use this key to automate your number purchases.</p>
                    
                    <div className="p-8 rounded-3xl bg-black/50 border border-white/5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Your Private Key</span>
                        <button className="text-primary-500 text-xs font-black hover:underline uppercase tracking-widest">Regenerate</button>
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl font-mono text-primary-400 text-lg flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                        <span>rs_pk_test_************************</span>
                        <Plus className="text-slate-600" size={20} />
                      </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <button className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                        <ArrowRight size={18} /> Documentation
                      </button>
                      <button className="flex-1 py-4 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all">
                        Support Center
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'deposit' && (
                <motion.div key="deposit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                   <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10">
                      <h3 className="text-2xl font-black mb-8 italic">Add Funds</h3>
                      
                      {!depositMethod ? (
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-6 text-slate-400 text-sm">
                             <p>Choose your payment method and amount. Funds are credited after <span className="text-white">1 network confirmation</span>.</p>
                             <div className="space-y-2">
                                {['Bitcoin', 'Ethereum', 'USDT (TRC20)', 'Litecoin'].map(c => (
                                  <button 
                                    key={c} 
                                    onClick={() => handleDeposit(c)}
                                    className="w-full p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary-500 flex items-center justify-between transition-all group text-left"
                                  >
                                    <span className="text-white font-bold">{c}</span>
                                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
                                  </button>
                                ))}
                             </div>
                          </div>
                          <div className="bg-black/50 p-8 rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center">
                             <div className="w-20 h-20 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6 font-primary text-3xl font-black italic">!</div>
                             <h4 className="font-bold text-lg mb-2">Secure Payments</h4>
                             <p className="text-slate-500 text-xs font-medium max-w-[200px] mx-auto">All deposits are processed automatically by our secure nodes.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                          <div className="flex items-center gap-4">
                            <button onClick={() => setDepositMethod(null)} className="p-2 text-slate-500 hover:text-white transition-colors">
                              <ArrowRight className="rotate-180" size={20} />
                            </button>
                            <h4 className="text-lg font-bold">Pay with {depositMethod}</h4>
                          </div>

                          <div className="bg-black/40 p-10 rounded-[2rem] border border-white/5 text-center flex flex-col items-center">
                            <div className="bg-white p-4 rounded-3xl mb-8">
                              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${depositAddress}`} alt="QR" className="w-32 h-32" referrerPolicy="no-referrer" />
                            </div>
                            <div className="w-full max-w-md">
                              <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-2">Deposit Address</span>
                              <div className="bg-white/5 border border-white/10 p-4 rounded-xl font-mono text-xs flex items-center justify-between group">
                                <span className="truncate pr-4 text-primary-400">{depositAddress}</span>
                                <button 
                                  onClick={() => copyToClipboard(depositAddress, 'api')} 
                                  className="text-slate-500 group-hover:text-white"
                                >
                                  {copied === 'api' ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                              </div>
                            </div>
                            <div className="mt-10 flex items-center gap-4 text-xs font-bold text-slate-500">
                               <div className="flex items-center gap-2">
                                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-yellow-500" />
                                  Waiting for payment...
                               </div>
                            </div>
                          </div>
                          
                          <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest italic">
                            DO NOT SEND MORE THAN $10,000 PER TRANSACTION.
                          </p>
                        </div>
                      )}
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Activity/Status Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl h-full flex flex-col">
              <h3 className="text-xl font-black mb-8 italic">Active order</h3>
              
              {!order ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center py-20 px-4">
                  <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center text-slate-700 mb-6 border border-white/5 border-dashed">
                    <Smartphone size={40} />
                  </div>
                  <p className="text-slate-500 font-bold mb-2">No active order.</p>
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-600">
                    Select a service and get started.
                  </p>
                </div>
              ) : (
                <div className="flex-grow space-y-6">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4">Phone Number</div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-2xl font-mono font-black text-primary-400">{order.number}</span>
                      <button 
                        onClick={() => copyToClipboard(order.number, 'num')}
                        className="text-slate-500 hover:text-white"
                      >
                        {copied === 'num' ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4 flex justify-between">
                      <span>Verification Code</span>
                      <span className="text-primary-500">{order.status === 'received' ? 'Received' : 'Waiting...'}</span>
                    </div>
                    {order.status === 'received' ? (
                      <div className="flex items-center justify-between">
                        <span className="text-4xl font-mono font-black text-green-400 tracking-widest">{order.otp}</span>
                        <button 
                          onClick={() => copyToClipboard(order.otp, 'otp')}
                          className="text-slate-500 hover:text-white"
                        >
                          {copied === 'otp' ? <Check size={24} /> : <Copy size={24} />}
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-4">
                        <div className="flex gap-2 mb-4">
                          {[0, 1, 2].map(i => (
                            <motion.div 
                              key={i}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                              className="w-2 h-2 rounded-full bg-primary-500"
                            />
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 font-bold">Waiting for SMS...</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold px-2">
                      <span className="text-slate-500">Service</span>
                      <span className="text-white">{order.service}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold px-2">
                      <span className="text-slate-500">Auto-refund in</span>
                      <span className="text-primary-400 font-mono">
                        {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <button 
                      onClick={cancelOrder}
                      className="w-full py-4 rounded-2xl bg-red-500/10 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-500/20 transition-all"
                    >
                      Cancel & Refund
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-8 border-t border-white/5 space-y-4">
                 <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Active Numbers</span>
                    <span className="font-mono text-primary-400 font-bold">{order ? 1 : 0}</span>
                 </div>
                 <div className="flex items-center justify-between py-2">
                    <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Account ID</span>
                    <span className="font-mono text-slate-400 text-[10px]">#rs_8273...</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-900/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/40 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}
