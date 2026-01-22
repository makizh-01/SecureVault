
import React, { useState } from 'react';
import { UserAccount } from '../types';

interface RegisterProps {
  onRegister: (user: UserAccount) => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    pin: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || formData.pin.length < 4) {
      alert("Please fill all fields and provide a 4-digit PIN");
      return;
    }
    onRegister({
      ...formData,
      balance: 1000, // Initial minimum balance requirement of ₹1,000
      transactions: [] // Initialize empty history
    });
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-8 p-10 bg-premium-slate/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-2xl">
      <div className="text-center">
        <h2 className="text-4xl font-display font-bold gold-text-gradient mb-2">SecureVault</h2>
        <p className="text-gray-400 text-sm tracking-wide uppercase">Private Wealth Management</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-premium-gold/60 uppercase tracking-widest mb-2">Full Name</label>
          <input
            type="text"
            required
            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-premium-gold/50 transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Identity Name"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-premium-gold/60 uppercase tracking-widest mb-2">Email Access</label>
          <input
            type="email"
            required
            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-premium-gold/50 transition-all"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="secure@vault.com"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-premium-gold/60 uppercase tracking-widest mb-2">Access Key</label>
          <input
            type="password"
            required
            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-premium-gold/50 transition-all"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-premium-gold/60 uppercase tracking-widest mb-2">Vault PIN (4 Digits)</label>
          <input
            type="password"
            maxLength={4}
            required
            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-premium-gold/50 transition-all text-center tracking-[1em]"
            value={formData.pin}
            onChange={(e) => setFormData({ ...formData, pin: e.target.value.replace(/\D/g, '') })}
            placeholder="0000"
          />
        </div>

        <button
          type="submit"
          className="w-full py-5 gold-gradient text-black font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-premium-gold/20 hover:brightness-110 transition-all transform hover:scale-[1.01] active:scale-95"
        >
          Initialize Vault
        </button>
      </form>

      <div className="text-center">
        <button 
          onClick={onSwitchToLogin}
          className="text-gray-500 hover:text-premium-gold text-xs font-bold uppercase tracking-widest transition-colors"
        >
          Existing Account Access
        </button>
      </div>
    </div>
  );
};

export default Register;
