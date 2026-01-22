
import React, { useState, useEffect } from 'react';
import { UserAccount, ViewState, Transaction, PhishingLog } from './types';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MoneyTransfer from './components/MoneyTransfer';
import PhishingCheck from './components/PhishingCheck';
import SecurityInfo from './components/SecurityInfo';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [user, setUser] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      const savedEmail = localStorage.getItem('securevault_session_email');
      if (savedEmail) {
        const { data, error } = await supabase
          .from('securevault')
          .select('*')
          .eq('email', savedEmail)
          .single();
        
        if (data && !error) {
          setUser(data);
          setView('dashboard');
        }
      }
      setLoading(false);
    };
    initApp();
  }, []);

  const handleRegister = async (newUser: UserAccount) => {
    const { data, error } = await supabase
      .from('securevault')
      .insert([{
        name: newUser.name,
        email: newUser.email,
        pin: newUser.pin,
        balance: 1000,
        transactions: [],
        threat_logs: []
      }])
      .select()
      .single();

    if (error) {
      alert(`Registration error: ${error.message}`);
      return;
    }

    if (data) {
      setUser(data);
      localStorage.setItem('securevault_session_email', data.email);
      setView('dashboard');
    }
  };

  const handleLogin = async (email: string, pin: string) => {
    const { data, error } = await supabase
      .from('securevault')
      .select('*')
      .eq('email', email)
      .eq('pin', pin)
      .maybeSingle();

    if (data && !error) {
      setUser(data);
      localStorage.setItem('securevault_session_email', data.email);
      setView('dashboard');
    } else {
      alert("Verification Failed. Cryptographic Access Blocked for this Identity.");
    }
  };

  const handleTransfer = async (amount: number, recipient: string) => {
    if (user) {
      const newTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        to: recipient,
        amount: amount,
        date: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'completed'
      };

      const updatedTransactions = [...(user.transactions || []), newTransaction];
      const newBalance = user.balance - amount;

      const { data, error } = await supabase
        .from('securevault')
        .update({ 
          balance: newBalance,
          transactions: updatedTransactions 
        })
        .eq('email', user.email)
        .select()
        .single();
      
      if (!error && data) {
        setUser(data);
      }
    }
  };

  const handleSaveThreatLog = async (log: PhishingLog) => {
    if (user) {
      const updatedLogs = [...(user.threat_logs || []), log];
      const { data, error } = await supabase
        .from('securevault')
        .update({ threat_logs: updatedLogs })
        .eq('email', user.email)
        .select()
        .single();
      
      if (!error && data) {
        setUser(data);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('securevault_session_email');
    setUser(null);
    setView('login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="w-12 h-12 border-4 border-premium-gold/20 border-t-premium-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  const isAuthView = view === 'landing' || view === 'register' || view === 'login';

  const renderContent = () => {
    switch (view) {
      case 'landing':
      case 'register':
        return <Register onRegister={handleRegister} onSwitchToLogin={() => setView('login')} />;
      case 'login':
        return <Login onLogin={handleLogin} onSwitchToRegister={() => setView('register')} />;
      case 'dashboard':
        return user ? <Dashboard user={user} onNavigate={setView} onLogout={handleLogout} /> : <Login onLogin={handleLogin} onSwitchToRegister={() => setView('register')} />;
      case 'transfer':
        return user ? <MoneyTransfer balance={user.balance} onTransfer={handleTransfer} onBack={() => setView('dashboard')} /> : null;
      case 'phishing':
        return <PhishingCheck onBack={() => setView('dashboard')} onSaveLog={handleSaveThreatLog} />;
      case 'security':
        return <SecurityInfo onBack={() => setView('dashboard')} />;
      default:
        return <Register onRegister={handleRegister} onSwitchToLogin={() => setView('login')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-gray-100 selection:bg-premium-gold selection:text-black">
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-premium-gold/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full"></div>
      </div>

      {!isAuthView && (
        <header className="px-8 py-8 border-b border-white/5 backdrop-blur-3xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4 cursor-pointer" onClick={() => user ? setView('dashboard') : setView('landing')}>
              <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center shadow-2xl shadow-premium-gold/20">
                <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-black gold-text-gradient tracking-tight">SECUREVAULT</span>
                <span className="text-[10px] font-black text-premium-gold uppercase tracking-[0.4em] opacity-80 leading-none">Elite Network</span>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-12 text-xs font-black uppercase tracking-[0.2em] text-gray-500">
              <button onClick={() => setView('dashboard')} className="hover:text-premium-gold transition-colors">Institutions</button>
              <button className="hover:text-premium-gold transition-colors">Private Wealth</button>
              <button className="hover:text-premium-gold transition-colors">Offshore</button>
              <div className="h-4 w-px bg-white/10"></div>
              <div className="flex items-center space-x-3 text-premium-gold">
                <div className="w-2 h-2 rounded-full bg-premium-gold shadow-[0_0_10px_rgba(197,160,89,1)]"></div>
                <span>Protocol Active</span>
              </div>
            </nav>
          </div>
        </header>
      )}

      <main className={`flex-1 container mx-auto px-4 ${isAuthView ? 'flex items-center justify-center py-0' : 'py-16 md:py-24'}`}>
        {renderContent()}
      </main>

      {!isAuthView && (
        <footer className="py-12 border-t border-white/5 bg-black/40">
          <div className="container mx-auto px-4 text-center space-y-4">
            <div className="flex justify-center space-x-8 text-[10px] font-black uppercase tracking-widest text-gray-600">
              <a href="#" className="hover:text-premium-gold">Privacy Protocol</a>
              <a href="#" className="hover:text-premium-gold">Terms of Access</a>
              <a href="#" className="hover:text-premium-gold">Security Policy</a>
            </div>
            <p className="text-gray-700 text-[10px] font-bold uppercase tracking-[0.3em]">
              © 2024 SecureVault International. Registered Multi-Jurisdictional Institution.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
