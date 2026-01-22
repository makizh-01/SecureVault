
import React from 'react';
import { UserAccount, ViewState } from '../types';

interface DashboardProps {
  user: UserAccount;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, onLogout }) => {
  // Ensure transactions is at least an empty array for mapping
  const transactions = user.transactions || [];

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center justify-between p-10 bg-premium-slate border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-premium-gold/5 blur-[100px] -mr-32 -mt-32"></div>
        
        <div className="flex items-center space-x-8 z-10">
          <div className="w-20 h-20 rounded-2xl gold-gradient flex items-center justify-center text-3xl font-black text-black shadow-xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-1">{user.name}</h2>
            <p className="text-premium-gold font-medium tracking-widest text-xs uppercase opacity-80">Premium Account Tier</p>
          </div>
        </div>
        
        <div className="mt-8 md:mt-0 text-center md:text-right z-10">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-2">Verified Liquid Assets</p>
          <p className="text-5xl font-display font-bold gold-text-gradient">₹{user.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <button
          onClick={() => onNavigate('transfer')}
          className="group p-10 bg-premium-slate border border-white/5 hover:border-premium-gold/30 text-left rounded-[2rem] transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-premium-gold/5"
        >
          <div className="w-14 h-14 rounded-2xl bg-premium-gold/10 flex items-center justify-center mb-8 group-hover:bg-premium-gold/20 transition-all">
            <svg className="w-7 h-7 text-premium-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Global Transfer</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Secure, instant capital movement across international networks.</p>
        </button>

        <button
          onClick={() => onNavigate('phishing')}
          className="group p-10 bg-premium-slate border border-white/5 hover:border-emerald-500/30 text-left rounded-[2rem] transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/5"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 group-hover:bg-emerald-500/20 transition-all">
            <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Threat Analyzer</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Advanced AI scanning for digital assets and communication integrity.</p>
        </button>

        <button
          onClick={() => onNavigate('security')}
          className="group p-10 bg-premium-slate border border-white/5 hover:border-amber-500/30 text-left rounded-[2rem] transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/5"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-8 group-hover:bg-amber-500/20 transition-all">
            <svg className="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Elite Defense</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Intelligence briefings on evolving cyber threat landscapes.</p>
        </button>
      </div>

      {/* Transaction History Section */}
      <div className="p-10 bg-premium-slate border border-white/5 rounded-[2.5rem] shadow-2xl">
        <h3 className="text-2xl font-display font-bold text-white mb-8 border-b border-white/5 pb-4">Recent Dispersals</h3>
        {transactions.length > 0 ? (
          <div className="space-y-4">
            {[...transactions].reverse().map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-6 bg-black/20 border border-white/5 rounded-2xl hover:bg-white/5 transition-all group">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 rounded-xl bg-premium-gold/5 flex items-center justify-center border border-premium-gold/10 group-hover:border-premium-gold/30 transition-all">
                    <svg className="w-6 h-6 text-premium-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold tracking-tight">Sent to +91 {tx.to}</p>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mt-1">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white">-₹{tx.amount.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mt-1">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-gray-600 font-medium italic">No ledger entries detected. Start a transfer to initialize history.</p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-12">
        <button 
          onClick={onLogout}
          className="px-10 py-4 bg-transparent hover:bg-white/5 text-gray-500 hover:text-white rounded-2xl border border-white/5 transition-all text-xs font-black uppercase tracking-[0.2em]"
        >
          Terminate Session
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
