import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Mail, Smartphone, ArrowRight, Laptop } from 'lucide-react';

interface PaymentSuccessPageProps {
  navigate: (path: string) => void;
  isDarkMode: boolean;
}

export function PaymentSuccessPage({ navigate, isDarkMode }: PaymentSuccessPageProps) {
  useEffect(() => {
    document.title = 'Payment Successful | ConciseCap';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="max-w-[720px] mx-auto px-4 py-12 text-center font-sans space-y-8 select-none text-left md:text-center">
      
      {/* Dynamic Celebration Entrance */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="space-y-6"
      >
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-extrabold bg-emerald-400/5 border border-emerald-400/15 py-1 px-3.5 rounded-full inline-block">
            Subscription Confirmed
          </span>
          <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-white leading-tight">
            Checkout Complete!
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Thank you for subscribing to the <span className="text-blue-400 font-semibold font-sans">ConciseCap Team</span> Plan! Your company workspace is now active and operational.
          </p>
        </div>
      </motion.div>

      {/* Workspace Activation Code Box */}
      <div className="p-6 rounded-2xl border bg-slate-950/60 border-slate-800/80 shadow-xl space-y-4 max-w-lg mx-auto text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full" />
        
        <div className="flex justify-between items-center pb-3 border-b border-slate-900">
          <span className="text-xs font-mono text-slate-400 uppercase">Secure License Key:</span>
          <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
            CAP-TEAM-992A
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Next steps for your contractor team:
          </h3>

          <ul className="space-y-3">
            {[
              { icon: Mail, label: 'Email Receipt', text: 'We have dispatched a full invoice details and configuration receipt to your contact address.' },
              { icon: Laptop, label: 'Office Portal Active', text: 'Initialize your secure synchronized workspace from any office terminal.' },
              { icon: Smartphone, label: 'Deploy to Crew Phones', text: 'Install the ConciseCap native application directly on field technician devices.' },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <li key={idx} className="flex gap-3 items-start">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/10 shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{step.label}</h4>
                    <p className="text-[11px] text-slate-400 leading-normal">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Interactive Actions */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
        <button 
          onClick={() => {
            window.location.href = 'https://app.concisecap.com';
          }}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
        >
          <span>Open ConciseCap App</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button 
          onClick={() => navigate('/')}
          className="w-full sm:w-auto px-6 py-3 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-950/20 text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
        >
          Return to home
        </button>
      </div>

      {/* Trust Signoff */}
      <div className="flex items-center justify-center gap-2 text-[10.5px] text-slate-500 opacity-80 pt-4">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Enterprise pilot program authorized under Stripe subscription protocol v3.</span>
      </div>

    </div>
  );
}
