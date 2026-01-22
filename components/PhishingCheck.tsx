
import React, { useState } from 'react';
import { analyzeLink, analyzeMessage } from '../services/geminiService';
import { PhishingAnalysis, RiskLevel, PhishingLog } from '../types';

interface PhishingCheckProps {
  onBack: () => void;
  onSaveLog?: (log: PhishingLog) => void;
}

type ScanType = 'link' | 'message';

const PhishingCheck: React.FC<PhishingCheckProps> = ({ onBack, onSaveLog }) => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [scanType, setScanType] = useState<ScanType>('link');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PhishingAnalysis | null>(null);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    try {
      const analysis = scanType === 'link' 
        ? await analyzeLink(url) 
        : await analyzeMessage(message);
      
      setResult(analysis);

      // Persist scan result to Supabase
      if (onSaveLog) {
        onSaveLog({
          timestamp: new Date().toISOString(),
          type: scanType,
          input: scanType === 'link' ? url : message,
          result: analysis
        });
      }
    } catch (e) {
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskStyles = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.LOW: return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case RiskLevel.MEDIUM: return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      case RiskLevel.HIGH: return 'text-red-400 border-red-500/20 bg-red-500/5';
      default: return 'text-gray-400';
    }
  };

  const canScan = scanType === 'link' ? url.trim().length > 0 : message.trim().length > 0;

  return (
    <div className="max-w-3xl mx-auto p-12 bg-premium-slate border border-white/5 rounded-[2.5rem] shadow-2xl">
      <button onClick={onBack} className="text-gray-500 hover:text-premium-gold mb-10 flex items-center space-x-2 group text-xs font-black uppercase tracking-widest transition-all">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Vault Overview</span>
      </button>

      <div className="flex items-center space-x-6 mb-12">
        <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
          <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold text-white">Threat Analysis Engine</h2>
          <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold mt-1">Real-time Digital Integrity Scan</p>
        </div>
      </div>

      <div className="flex p-1 bg-black/40 rounded-2xl mb-8 border border-white/5">
        <button 
          onClick={() => { setScanType('link'); setResult(null); }}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${scanType === 'link' ? 'bg-premium-gold text-black shadow-lg shadow-premium-gold/20' : 'text-gray-500 hover:text-white'}`}
        >
          URL Analysis
        </button>
        <button 
          onClick={() => { setScanType('message'); setResult(null); }}
          className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${scanType === 'message' ? 'bg-premium-gold text-black shadow-lg shadow-premium-gold/20' : 'text-gray-500 hover:text-white'}`}
        >
          Message Integrity
        </button>
      </div>

      <div className="space-y-6">
        {scanType === 'link' ? (
          <input
            type="text"
            className="w-full px-8 py-5 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-premium-gold/50 transition-all placeholder:text-gray-700"
            placeholder="Input suspicious URL for deep packet analysis..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        ) : (
          <textarea
            className="w-full px-8 py-5 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-premium-gold/50 transition-all placeholder:text-gray-700 h-40 resize-none"
            placeholder="Paste suspicious SMS, Email, or communication text here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        )}
        
        <button
          onClick={handleCheck}
          disabled={loading || !canScan}
          className={`w-full py-5 gold-gradient text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-premium-gold/10 transition-all transform hover:scale-[1.01] ${loading || !canScan ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Initializing AI Scan...' : `Analyze ${scanType === 'link' ? 'Link' : 'Message'}`}
        </button>
      </div>

      {result && (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className={`p-8 border rounded-3xl ${getRiskStyles(result.level)}`}>
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 block mb-1">Threat Assessment</span>
                <span className="text-3xl font-display font-black tracking-tight">{result.level.toUpperCase()}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 block mb-1">Probability</span>
                <span className="text-2xl font-display font-bold">{result.riskPercentage}%</span>
              </div>
            </div>
            
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden mb-8 border border-white/5">
              <div 
                className="h-full bg-current transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                style={{ width: `${result.riskPercentage}%` }}
              />
            </div>

            <p className="text-white/80 leading-relaxed font-medium mb-8 text-lg">{result.analysis}</p>
            
            <div className="pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.vulnerabilities.map((v, i) => (
                <div key={i} className="flex items-center space-x-3 text-sm font-bold opacity-80">
                  <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhishingCheck;
