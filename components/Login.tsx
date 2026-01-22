
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, pin: string) => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');

  const handleKeypadClick = (num: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };

  const handleClear = () => setPin('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && pin.length === 4) {
      onLogin(email, pin);
    } else if (!email) {
      alert("Please enter your registered email identifier.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto min-h-[80vh] items-stretch gap-8 lg:gap-0 animate-in fade-in duration-1000">
      
      {/* Left Column: Brand Identity */}
      <div className="flex-1 flex flex-col justify-center items-start p-8 lg:p-20 relative overflow-hidden">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-premium-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="w-20 h-20 gold-gradient rounded-3xl flex items-center justify-center shadow-2xl shadow-premium-gold/30 mb-8">
            <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-6xl lg:text-8xl font-display font-black gold-text-gradient tracking-tighter leading-none">
            SECURE<br/>VAULT
          </h1>
          <div className="space-y-2">
            <p className="text-gray-400 text-sm font-black uppercase tracking-[0.5em]">Institutional Private Banking</p>
            <div className="flex items-center space-x-4">
              <span className="h-px w-12 bg-premium-gold/30"></span>
              <span className="text-[10px] text-premium-gold font-bold uppercase tracking-widest opacity-60 italic">Established MMXXIV</span>
            </div>
          </div>
          <p className="text-gray-500 max-w-md text-lg font-medium leading-relaxed pt-8">
            Accessing the world's most resilient digital asset management infrastructure. 
            Enter your cryptographic credentials to proceed to the main terminal.
          </p>
        </div>
      </div>

      {/* Right Column: Interactive Login Details */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-12">
        <div className="relative w-full max-w-lg py-12 px-8 bg-premium-slate/40 backdrop-blur-3xl border border-white/5 rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-premium-gold/10 rounded-full animate-[spin_25s_linear_infinite]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-premium-gold/5 rounded-full animate-[spin_18s_linear_infinite_reverse]"></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-black gold-text-gradient tracking-tight mb-2 uppercase">Terminal Entry</h2>
              <div className="flex items-center justify-center space-x-2 text-[9px] font-black text-gray-500 uppercase tracking-[0.4em]">
                <span>Biometric Signature Required</span>
              </div>
            </div>

            {/* Email Identification */}
            <div className="mb-8">
              <label className="block text-[10px] font-black text-premium-gold/60 uppercase tracking-widest mb-3 ml-1">Identity Access Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-premium-gold/40 transition-all font-medium placeholder:text-gray-700"
                placeholder="secure@vault.com"
              />
            </div>

            {/* PIN Entry Visualization */}
            <div className="flex justify-center items-center space-x-5 mb-10 h-16">
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`relative flex items-center justify-center transition-all duration-500 ${pin.length > i ? 'scale-110' : 'scale-100'}`}
                >
                  <div className={`w-11 h-11 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center ${pin.length > i ? 'border-premium-gold bg-premium-gold/5 shadow-[0_0_20px_rgba(197,160,89,0.3)]' : 'border-white/10 bg-white/5'}`}>
                    {pin.length > i && (
                      <div className="w-2.5 h-2.5 rounded-full bg-premium-gold shadow-[0_0_15px_#C5A059] animate-in zoom-in"></div>
                    )}
                  </div>
                  {pin.length === i && (
                    <div className="absolute -inset-1.5 border-2 border-premium-gold/20 rounded-[1.2rem] animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Unique Geometric Keypad */}
            <div className="grid grid-cols-3 gap-3 max-w-[320px] mx-auto mb-10">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleKeypadClick(num.toString())}
                  className="h-14 rounded-2xl bg-black/40 border border-white/5 text-lg font-display font-bold text-white hover:bg-premium-gold/10 hover:border-premium-gold/30 active:scale-90 transition-all group overflow-hidden relative"
                >
                  <span className="relative z-10">{num}</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-premium-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              ))}
              <button 
                onClick={handleClear} 
                className="h-14 rounded-2xl text-[9px] font-black text-gray-500 uppercase tracking-widest hover:text-red-400 active:scale-95 transition-all bg-red-500/5 border border-red-500/10"
              >
                Reset
              </button>
              <button
                onClick={() => handleKeypadClick('0')}
                className="h-14 rounded-2xl bg-black/40 border border-white/5 text-lg font-display font-bold text-white hover:bg-premium-gold/10 hover:border-premium-gold/30 active:scale-90 transition-all group relative overflow-hidden"
              >
                <span className="relative z-10">0</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-premium-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <button
                onClick={handleSubmit}
                className="h-14 rounded-2xl gold-gradient text-black font-black uppercase tracking-tighter text-[10px] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-premium-gold/10"
              >
                Decrypt
              </button>
            </div>

            <div className="text-center pt-6 border-t border-white/5">
              <button 
                onClick={onSwitchToRegister}
                className="group inline-flex items-center space-x-2 text-gray-500 hover:text-premium-gold transition-colors"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">Enroll New Asset Node?</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
