import { useEffect } from 'react';
import { ArrowLeft, RefreshCw, MessageSquare, ShieldAlert } from 'lucide-react';

interface PaymentCancelledPageProps {
  navigate: (path: string) => void;
  isDarkMode: boolean;
}

export function PaymentCancelledPage({ navigate, isDarkMode }: PaymentCancelledPageProps) {
  useEffect(() => {
    document.title = 'Payment Cancelled | ConciseCap';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="max-w-[640px] mx-auto px-4 py-16 text-center font-sans space-y-8 select-none">
      
      {/* Icon */}
      <div className="mx-auto w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
        <ShieldAlert className="w-8 h-8 text-neutral-400" />
      </div>

      {/* Main Copy */}
      <div className="space-y-3">
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold">
          Handshake Postponed
        </span>
        <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-white leading-tight">
          Checkout Cancelled
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          No worries! You can complete your setup anytime. Your configured seats and field documentation workspace outline have been safely preserved.
        </p>
      </div>

      {/* Quick Troubleshooting Guide */}
      <div className="p-5 rounded-2xl border bg-slate-950/40 border-slate-900 max-w-sm mx-auto text-left space-y-3.5">
        <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
          Troubleshoot checkout:
        </h4>
        <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Verify the credit card digits and expiry inside the Stripe portal.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Avoid using private browsing mode if Stripe blocks session cookies.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Check with your trade office card manager for B2B approval permissions.</span>
          </li>
        </ul>
      </div>

      {/* Interactive back buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-sm mx-auto">
        <button 
          onClick={() => navigate('/get-started')}
          className="w-full sm:flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Checkout</span>
        </button>
        <button 
          onClick={() => navigate('/')}
          className="w-full sm:flex-1 py-3 text-slate-400 hover:text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </button>
      </div>

      {/* Support desk query */}
      <p className="text-[11px] text-slate-500">
        Have questions? Email us directly at{' '}
        <a href="mailto:russel@infogito.com" className="text-blue-400 hover:underline">
          russel@infogito.com
        </a>{' '}
        for rapid trade boarding support.
      </p>

    </div>
  );
}
