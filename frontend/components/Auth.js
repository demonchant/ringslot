/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useState } from 'react';

export default function Auth({ setMode, close }) {
  const [currentMode, setCurrentMode] = useState('login');
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[3rem] overflow-hidden shadow-2xl relative"
      >
        <button onClick={close} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors">
          <ArrowRight className="rotate-45" />
        </button>

        <div className="p-12">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white p-2">
              <div className="grid grid-cols-2 gap-1 w-full h-full">
                <div className="bg-white rounded-[2px]"></div>
                <div className="bg-white rounded-[2px]"></div>
                <div className="bg-white rounded-[2px]"></div>
                <div className="bg-white/50 rounded-[2px]"></div>
              </div>
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-black italic mb-2">
              {currentMode === 'login' ? 'Welcome back' : currentMode === 'register' ? 'Join RingSlot' : 'Reset password'}
            </h2>
            <p className="text-slate-500 font-bold">
              {currentMode === 'login' ? 'Access your private number dashboard.' : currentMode === 'register' ? 'Create an account in 30 seconds.' : 'We will send you a reset link.'}
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {currentMode === 'register' && (
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-4">Full Name</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-16 pr-6 font-bold outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm" placeholder="John Doe" />
                </div>
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-16 pr-6 font-bold outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm" placeholder="you@example.com" />
              </div>
            </div>

            {currentMode !== 'forgot' && (
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-4">Password</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="password" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-16 pr-6 font-bold outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm" placeholder="••••••••" />
                </div>
              </div>
            )}

            {currentMode === 'login' && (
              <div className="text-right">
                <button onClick={() => setCurrentMode('forgot')} className="text-xs font-black uppercase text-slate-500 hover:text-primary-600 transition-colors">Forgot password?</button>
              </div>
            )}

            <button className="w-full py-5 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-700 shadow-xl shadow-primary-600/30 transition-all mt-4 flex items-center justify-center gap-3">
              {currentMode === 'login' ? 'Sign In' : currentMode === 'register' ? 'Create Account' : 'Send Link'}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-10 text-center">
             <p className="text-sm font-bold text-slate-500 mb-2">
               {currentMode === 'login' ? "Don't have an account?" : "Already have an account?"}
             </p>
             <button 
               onClick={() => setCurrentMode(currentMode === 'login' ? 'register' : 'login')}
               className="text-xs font-black uppercase text-primary-600 hover:underline tracking-widest"
             >
               {currentMode === 'login' ? 'Register Now' : 'Sign In instead'}
             </button>
          </div>
        </div>

        <div className="bg-primary-50 p-8 flex items-center justify-center gap-8 border-t border-primary-100">
           <div className="flex items-center gap-2">
             <ShieldCheck size={16} className="text-primary-600" />
             <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">End-to-End Encryption</span>
           </div>
           <div className="flex items-center gap-2">
             <Check size={16} className="text-primary-600" />
             <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Secure Audit</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
