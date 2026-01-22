
import React, { useState, useEffect } from 'react';

interface MoneyTransferProps {
  balance: number;
  onTransfer: (amount: number, recipient: string) => void;
  onBack: () => void;
}

const MoneyTransfer: React.FC<MoneyTransferProps> = ({ balance, onTransfer, onBack }) => {
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    
    if (!mobile || isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid mobile number and amount.");
      return;
    }
    
    // Enforce ₹500 minimum balance
    if (balance - numAmount < 500) {
      alert("Transaction declined. A minimum balance of ₹500 must be maintained in your vault.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call for premium feel
    setTimeout(() => {
      onTransfer(numAmount, mobile);
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Auto-redirect back to dashboard after showing success for 3 seconds
      setTimeout(() => {
        onBack();
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto p-12 bg-premium-slate border border-premium-gold/30 rounded-[2.5rem] shadow-2xl text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 gold-gradient rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-premium-gold/40">
          <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-display font-bold gold-text-gradient mb-4">Transfer Complete</h2>
        <p className="text-gray-300 font-medium leading-relaxed mb-8">
          Your transaction is successful. Eagerly waiting for the next
        </p>
        <div className="flex justify-center items-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] text-premium-gold/60">
          <div className="w-1.5 h-1.5 rounded-full bg-premium-gold animate-ping"></div>
          <span>Returning to Vault...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-12 bg-premium-slate border border-white/5 rounded-[2.5rem] shadow-2xl">
      <button onClick={onBack} className="text-gray-500 hover:text-premium-gold mb-10 flex items-center space-x-2 group text-xs font-black uppercase tracking-widest transition-all">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Vault Overview</span>
      </button>

      <h2 className="text-3xl font-display font-bold gold-text-gradient mb-8">Asset Dispersal</h2>
      
      <div className="p-6 bg-black/40 border border-premium-gold/10 rounded-2xl mb-10">
        <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest block mb-2">Available Capital</span>
        <span className="text-white font-bold text-2xl">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        <p className="text-[10px] text-premium-gold/40 font-bold mt-2 italic">Note: ₹500 minimum balance requirement apply.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Recipient Identifier (Mobile)</label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-premium-gold/40 font-bold">+91</span>
            <input
              type="tel"
              required
              className="w-full pl-16 pr-5 py-5 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-premium-gold/50 transition-all font-medium"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
              placeholder="00000 00000"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Dispersal Amount</label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-premium-gold/40 font-bold">₹</span>
            <input
              type="number"
              required
              min="1"
              step="0.01"
              className="w-full pl-10 pr-5 py-5 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-premium-gold/50 transition-all font-medium"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-5 gold-gradient text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-premium-gold/10 transition-all transform hover:scale-[1.01] active:scale-95 flex items-center justify-center space-x-4 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Verifying Protocol...</span>
            </>
          ) : (
            <span>Authorize Movement</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default MoneyTransfer;
