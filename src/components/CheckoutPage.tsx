import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Lock, 
  Users, 
  ArrowLeft, 
  Plus, 
  Minus, 
  ShieldCheck, 
  ArrowRight,
  Info
} from 'lucide-react';

interface CheckoutPageProps {
  navigate: (path: string) => void;
  isDarkMode: boolean;
}

export function CheckoutPage({ navigate, isDarkMode }: CheckoutPageProps) {
  const [totalUsers, setTotalUsers] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectError, setRedirectError] = useState<string | null>(null);

  // Set the SEO metadata dynamically for the get-started route
  useEffect(() => {
    document.title = 'Start Using ConciseCap | Field Documentation Software for Contractors';
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Start using ConciseCap to capture job-site photos, notes, signatures, equipment details, proof of work, and invoice-ready job records for your contractor team.');

    // Update Open Graph (OG) title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', 'Start Using ConciseCap');

    // Update Open Graph (OG) description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', 'Launch pricing for contractor teams. Capture job-site photos, notes, signatures, proof of work, and invoice-ready job records with ConciseCap.');
  }, []);

  // Pricing formula values
  const extraUsers = Math.max(0, totalUsers - 5);
  const extraCost = extraUsers * 5;
  const firstMonthTotal = 9 + extraCost;
  const recurringMonthTotal = 29 + extraCost;

  const handleIncrement = () => {
    setTotalUsers(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (totalUsers > 5) {
      setTotalUsers(prev => prev - 1);
    }
  };

  const handleCheckoutInit = async () => {
    setIsRedirecting(true);
    setRedirectError(null);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalUsers }),
      });

      if (!response.ok) {
        throw new Error('Could not initialize checkout gateway.');
      }

      const data = await response.json();
      if (data.url) {
        // Safe redirect to either real Stripe Checkout or local Stripe Simulation route
        window.location.href = data.url;
      } else {
        throw new Error('No redirect gateway URL was returned.');
      }
    } catch (err: any) {
      console.error(err);
      setRedirectError('Temporary checkout handshake issue. Please try again or contact support.');
      setIsRedirecting(false);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 font-sans transition-colors duration-300">
      
      {/* Absolute Loading Overlay during Stripe integration redirect handshake */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin" />
                <Lock className="w-6 h-6 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h3 className="text-white font-mono font-bold text-xs uppercase tracking-widest">
                Handshaking Secure Gateway
              </h3>
              <p className="text-slate-400 text-[11px] font-mono">
                Connecting with Stripe Checkout server...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Home Button */}
      <div className="mb-6 sm:mb-8 text-left">
        <button 
          onClick={() => navigate('/')}
          id="btn-checkout-back"
          className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform text-blue-500" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: GREETING, METADATA & INCLUSION CHECKLIST (7 Cols) */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className="space-y-4">

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white leading-tight">
              Start using ConciseCap
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              Field documentation software for contractors who need cleaner job records, faster approvals, and fewer missing details between the field and office.
            </p>
          </div>

          {/* WHAT'S INCLUDED SECTION */}
          <div className="p-6 rounded-2xl border bg-slate-900/40 border-slate-800/80">
            <h3 className="text-xs font-mono tracking-widest uppercase font-extrabold mb-5 text-blue-400 flex items-center gap-2">
              <span>What’s included</span>
              <span className="h-px flex-1 bg-slate-800" />
            </h3>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {[
                'Field photo and note capture',
                'Customer signatures and proof of work',
                '15GB of storage for free',
                'Equipment and job-site details',
                'Organized job records',
                'Office review workflow',
                'Invoice-ready packages',
                'Searchable job history',
                'Support for HVAC, roofing, plumbing, electrical, inspections, and other trades'
              ].map((inc, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300 leading-tight">
                    {inc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* WHAT HAPPENS NEXT SECTION */}
          <div className="p-6 rounded-2xl border bg-slate-950/20 border-slate-900 space-y-4">
            <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" />
              <span>What happens after checkout</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              After checkout, you’ll be able to set up your company workspace, add team members, and start documenting jobs from the field.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                { step: '1', title: 'Secure checkout', desc: 'Complete checkout on Stripe.' },
                { step: '2', title: 'Set up company', desc: 'Provision your secure workspace.' },
                { step: '3', title: 'Invite your team', desc: 'Deploy app to crew devices.' }
              ].map((s, index) => (
                <div key={index} className="p-3 bg-slate-900/20 rounded-xl border border-slate-900 space-y-1.5 text-left">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-mono text-xs font-bold">
                    {s.step}
                  </div>
                  <h4 className="text-xs font-bold text-white tracking-tight">{s.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-tight">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE PRICING CARD & STRIPE GATEWAY TRIGGER (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-950 to-[#0e1628] border border-slate-800 shadow-2xl relative overflow-hidden text-left">
            
            {/* Visual background lights */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
            
            {/* Package details */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-extrabold bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  Launch Offer
                </span>
                <h2 className="text-2xl font-serif tracking-tight text-white">
                  ConciseCap Team
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Launch pricing for early contractor teams.
                </p>
              </div>
            </div>

            {/* Pricing Details Hero */}
            <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-900/20 mb-6 space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-serif font-black text-white">$9</span>
                <span className="text-sm font-mono text-slate-300">first month</span>
              </div>
              <div className="text-xs text-slate-400">
                Then <span className="text-slate-200 font-semibold">$29/month</span> after your first month
              </div>
            </div>

            {/* Interactive User Add-on Calculator (Extremely Delightful B2B Feature) */}
            <div className="space-y-4 pb-6 border-b border-slate-900">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Included Seats:</span>
                <span className="text-white font-semibold font-mono">Up to 5 users</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span>Configure extra crew:</span>
                    <span className="text-[10px] font-mono text-blue-400 bg-blue-400/5 px-1.5 py-0.5 rounded border border-blue-400/10">
                      $5/user/month
                    </span>
                  </label>
                  
                  {/* Plus/Minus counter */}
                  <div className="flex items-center gap-2.5 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
                    <button 
                      type="button"
                      onClick={handleDecrement}
                      disabled={totalUsers <= 5}
                      className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-800 opacity-80 hover:opacity-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 cursor-pointer text-xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-mono font-bold text-white w-5 text-center select-none">
                      {totalUsers}
                    </span>
                    <button 
                      type="button"
                      onClick={handleIncrement}
                      className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-800 text-slate-300 cursor-pointer text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {extraUsers > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] text-blue-400/90 bg-blue-500/5 border border-blue-500/10 p-2.5 rounded-xl flex justify-between items-center"
                  >
                    <span>+{extraUsers} additional team members</span>
                    <span className="font-mono font-bold font-semibold">+${extraCost}/month</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Total pricing break down */}
            <div className="space-y-2 pt-6 pb-6 text-xs text-slate-300 font-sans">
              <div className="flex justify-between">
                <span>First month pricing:</span>
                <span className="text-white font-bold font-mono">${firstMonthTotal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Monthly recurring thereafter:</span>
                <span className="text-slate-300 font-mono">${recurringMonthTotal}/mo</span>
              </div>
            </div>

            {/* SECURE STRIPE GATEWAY CTA */}
            <div className="space-y-4">
              <button
                type="button"
                id="btn-checkout-stripe"
                onClick={handleCheckoutInit}
                className="w-full text-center relative py-3.5 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-widest cursor-pointer bg-blue-600 hover:bg-blue-500 hover:scale-[1.01] active:scale-[0.99] text-white transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 shrink-0 text-blue-200" />
                <span>Continue to secure checkout</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform" />
              </button>

              {redirectError && (
                <p className="text-red-400 text-[11px] font-mono text-center">
                  {redirectError}
                </p>
              )}

              {/* Secure Trust Stamp */}
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 text-[10.5px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Secure checkout powered by Stripe.</span>
                </div>
                <div className="text-[10px] text-center text-slate-500 block">
                  Cancel anytime.
                </div>
              </div>
            </div>

          </div>

          {/* Optional extra security disclaimer */}
          <div className="flex p-4 rounded-2xl bg-slate-900/10 border border-slate-900/40 items-start gap-2.5 text-left">
            <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 leading-normal">
              Direct checkout redirects to Stripe SSL servers. ConciseCap never stores, processes, or transmits credit card information on this server domain.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
