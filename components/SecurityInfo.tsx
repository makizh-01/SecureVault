
import React from 'react';

const ATTACKS = [
  {
    title: "Domain Spoofing",
    description: "Malicious entities replicate authentic digital interfaces to harvest high-level credentials.",
    cause: "Exploitation of visual similarity and human pattern recognition.",
    detection: "Verify encryption certificates and character-level domain authenticity."
  },
  {
    title: "Smishing Protocol",
    description: "Urgent telecommunication alerts designed to provoke immediate, unverified actions.",
    cause: "Engineered urgency through simulated account emergencies.",
    detection: "SecureVault communicates sensitive updates exclusively through the authorized application."
  },
  {
    title: "Precision Phishing",
    description: "Highly targeted data extraction based on harvested social and professional intelligence.",
    cause: "Detailed reconnaissance of target metadata.",
    detection: "Analyze internal communications for uncharacteristic linguistic patterns."
  },
  {
    title: "Vishing (Voice Hijacking)",
    description: "Simulated authority figures requesting bypass credentials or transaction overrides.",
    cause: "Social engineering via telephonic pressure.",
    detection: "SecureVault personnel will never request PIN or password credentials via voice link."
  }
];

interface SecurityInfoProps { onBack: () => void; }

const SecurityInfo: React.FC<SecurityInfoProps> = ({ onBack }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="bg-premium-slate border border-white/5 rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 gold-gradient opacity-30"></div>
        
        <button onClick={onBack} className="text-gray-500 hover:text-premium-gold mb-12 flex items-center space-x-2 group text-xs font-black uppercase tracking-widest transition-all">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Vault Overview</span>
        </button>

        <h2 className="text-5xl font-display font-bold gold-text-gradient mb-6">Security Intelligence</h2>
        <p className="text-gray-500 text-lg mb-16 max-w-2xl font-medium leading-relaxed">Advanced briefings on current threat vectors targeting high-net-worth digital environments.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ATTACKS.map((attack, i) => (
            <div key={i} className="p-10 bg-black/40 border border-white/5 rounded-[2rem] hover:border-premium-gold/20 transition-all group">
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-premium-gold transition-colors">{attack.title}</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-premium-gold uppercase tracking-[0.3em] mb-2">Technical Definition</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{attack.description}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-2">Primary Vector</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{attack.cause}</p>
                </div>
                <div className="pt-6 border-t border-white/5">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-2">Countermeasure</p>
                  <p className="text-white/70 text-sm font-bold italic leading-relaxed">"{attack.detection}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-12 gold-gradient rounded-[2.5rem] shadow-2xl shadow-premium-gold/10 flex flex-col md:flex-row items-center justify-between text-black">
        <div className="mb-8 md:mb-0 max-w-lg">
          <h3 className="text-3xl font-display font-black mb-3">SecureVault Guarantee</h3>
          <p className="font-bold opacity-80 leading-relaxed">Multi-layer institutional protection and 24/7 proactive AI threat suppression included for all clients.</p>
        </div>
        <button className="px-12 py-5 bg-black text-premium-gold font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
          Secure Hotline
        </button>
      </div>
    </div>
  );
};

export default SecurityInfo;
