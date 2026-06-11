import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Shield, CreditCard, ArrowLeft, HelpCircle } from "lucide-react";

export function StripeCheckoutSimPage() {
  const [params, setParams] = useState({
    totalUsers: "5",
    additionalUsers: "0",
    firstPrice: "9",
    monthlyPrice: "29",
    successUrl: "/payment-success",
    cancelUrl: "/payment-cancelled",
  });

  const [email, setEmail] = useState("russelgramer@gmail.com");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCvc] = useState("422");
  const [name, setName] = useState("Russel N Gramer");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState("Idle");

  // Load URL query parameters on mount to match configured seats exactly
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setParams({
        totalUsers: searchParams.get("total_users") || "5",
        additionalUsers: searchParams.get("additional_users") || "0",
        firstPrice: searchParams.get("first_price") || "9",
        monthlyPrice: searchParams.get("monthly_price") || "29",
        successUrl: searchParams.get("success_url") || "/payment-success",
        cancelUrl: searchParams.get("cancel_url") || "/payment-cancelled",
      });
    }
  }, []);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStep("Securing channel...");

    setTimeout(() => {
      setSubmitStep("Authorizing secure token on Stripe nodes...");
    }, 1000);

    setTimeout(() => {
      setSubmitStep("Generating monthly B2B contracting credentials...");
    }, 2200);

    setTimeout(() => {
      setSubmitStep("Redirecting back to ConciseCap...");
    }, 3400);

    setTimeout(() => {
      window.location.href = decodeURIComponent(params.successUrl);
    }, 4200);
  };

  const handleCancel = () => {
    window.location.href = decodeURIComponent(params.cancelUrl);
  };

  const addUsers = parseInt(params.additionalUsers) || 0;
  const showExtra = addUsers > 0;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1f36] font-sans flex flex-col md:flex-row relative selection:bg-[#7a95ff]/30 leading-normal">
      {/* Absolute Header Ribbon simulating SSL secure Stripe handoffs */}
      <div className="absolute top-0 inset-x-0 h-1 bg-[#635bff]" />

      {/* 50% LEFT PANEL: Purchase Overview of ConciseCap Subscription */}
      <div className="w-full md:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-between bg-white border-b md:border-b-0 md:border-r border-slate-200">
        <div className="space-y-8 text-left">
          {/* Mock Stripe checkout back navigation arrow */}
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-xs font-semibold text-[#697386] hover:text-[#1a1f36] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-all text-[#635bff]" />
            <span>Cancel and return to ConciseCap</span>
          </button>

          {/* Branded ConciseCap Product Layout */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://r2.concisecap.com/website%20images/ConciseCap%20White%20Logo.webp"
                alt="ConciseCap Logo"
                className="h-10 w-auto object-contain bg-slate-900 rounded-lg p-1.5"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs uppercase font-mono tracking-widest font-extrabold text-[#635bff] bg-[#635bff]/5 border border-[#635bff]/10 py-0.5 px-2 rounded-full">
                Test Mode
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#697386] uppercase tracking-wider block">
                Subscription
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-[#1a1f36]">
                ConciseCap Team Plan
              </h1>
              <p className="text-xs text-[#697386]">
                Includes up to 5 users base + {params.additionalUsers}{" "}
                additional contractor members.
              </p>
            </div>
          </div>

          {/* Pricing detail sidebar */}
          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-semibold text-[#697386]">
                Due today (First Month Offer):
              </span>
              <div className="text-right">
                <span className="text-3xl font-bold font-mono text-[#1a1f36]">
                  ${params.firstPrice}.00
                </span>
                <span className="text-xs text-[#697386] font-mono block">
                  USD
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline text-xs text-[#697386]">
              <span>Recurring pricing thereafter:</span>
              <span className="font-semibold text-[#1a1f36]">
                ${params.monthlyPrice}.00 / month
              </span>
            </div>
          </div>

          {/* High-fidelity purchase item list breakdown */}
          <div className="p-4 rounded-xl bg-[#f8f9fa] border border-slate-200/60 space-y-2.5">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#697386] font-bold">
              Secure subscription lines:
            </h4>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#3c4257]">
                <span>ConciseCap Team - Base (5 Seats)</span>
                <span className="font-mono text-slate-500">$9.00 / 1st mo</span>
              </div>

              {showExtra && (
                <div className="flex justify-between text-[#3c4257]">
                  <span>
                    Extra seats ({params.additionalUsers} @ $5/mo each)
                  </span>
                  <span className="font-mono text-slate-500">
                    +${addUsers * 5}.00 / mo
                  </span>
                </div>
              )}

              <div className="flex justify-between text-slate-400 text-[11px] border-t border-slate-200/50 pt-1.5 mt-1.5">
                <span>Standard Monthly Base (after month 1)</span>
                <span>$29.00 / mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info showing Stripe's actual details */}
        <div className="pt-8 text-left text-[11px] text-[#697386] space-y-1 mt-8 md:mt-0">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#635bff]" />
            <span className="font-semibold">Powered by Stripe</span>
          </div>
          <p className="leading-relaxed">
            Secure, PCI-compliant B2B evaluation portal. Direct payment
            authorization token returned via web hooks on success.
          </p>
        </div>
      </div>

      {/* 50% RIGHT PANEL: High-fidelity replicating Stripe Checkout Credit card Form */}
      <div className="w-full md:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-center bg-[#f8f9fa] relative overflow-hidden">
        {/* Loading overlay during submitting checkout simulation */}
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm p-8"
            >
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-3 border-[#e3e8ee] border-t-[#635bff] animate-spin mx-auto" />
                <h3 className="text-sm font-semibold text-[#1f2937] uppercase tracking-wider font-mono">
                  Confirming Billing Auth
                </h3>
                <p className="text-xs text-[#697386] font-mono animate-pulse">
                  {submitStep}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-md w-full mx-auto space-y-6 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#635bff] bg-[#635bff]/8 border border-[#635bff]/15 px-3 py-1.5 rounded-lg">
              <Shield className="w-4 h-4 shrink-0 text-[#635bff]" />
              <span>
                TEST ENV SANDBOX: Simulated credit card digits are pre-loaded.
                Click pay to test success.
              </span>
            </div>

            <h2 className="text-lg font-bold text-[#1a1f36]">
              Pay with credit card
            </h2>
          </div>

          <form onSubmit={handlePay} className="space-y-5">
            {/* Email form item */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#4f566b] block">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm px-3.5 py-3 rounded-lg border border-[#cfd7df] bg-white outline-none focus:border-[#635bff] focus:shadow-[0_0_0_3px_rgba(99,91,255,0.15)] transition-all text-[#1a1f36]"
                placeholder="russelgramer@gmail.com"
              />
            </div>

            {/* Simulated Card details */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#4f566b] flex justify-between items-center">
                <span>Card Information</span>
                <div className="flex gap-1">
                  <span className="text-[9px] px-1 rounded bg-[#e3e8ee] font-mono text-[#4f566b]">
                    VISA
                  </span>
                  <span className="text-[9px] px-1 rounded bg-[#e3e8ee] font-mono text-[#4f566b]">
                    MC
                  </span>
                  <span className="text-[9px] px-1 rounded bg-[#e3e8ee] font-mono text-[#4f566b]">
                    AMEX
                  </span>
                </div>
              </label>

              <div className="rounded-lg border border-[#cfd7df] bg-white overflow-hidden divide-y divide-[#cfd7df] focus-within:border-[#635bff] focus-within:shadow-[0_0_0_3px_rgba(99,91,255,0.15)] transition-all">
                {/* 1. Visa Row */}
                <div className="flex items-center px-3.5 py-3 relative">
                  <CreditCard className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-sm outline-none bg-transparent font-mono text-[#1a1f36]"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>

                {/* 2. Expiry / CVV row */}
                <div className="grid grid-cols-2 divide-x divide-[#cfd7df]">
                  <div className="px-3.5 py-3">
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full text-sm outline-none bg-transparent font-mono text-[#1a1f36]"
                      placeholder="MM / YY"
                    />
                  </div>
                  <div className="px-3.5 py-3 relative">
                    <input
                      type="text"
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full text-sm outline-none bg-transparent font-mono text-[#1a1f36]"
                      placeholder="CVC"
                      maxLength={4}
                    />
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#4f566b] block">
                Cardholder Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm px-3.5 py-3 rounded-lg border border-[#cfd7df] bg-white outline-none focus:border-[#635bff] focus:shadow-[0_0_0_3px_rgba(99,91,255,0.15)] transition-all text-[#1a1f36]"
                placeholder="Name on credit card"
              />
            </div>

            {/* Country / Region */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#4f566b] block">
                Country or Region
              </label>
              <select className="w-full text-sm px-3 py-3 rounded-lg border border-[#cfd7df] bg-white outline-none focus:border-[#635bff] focus:shadow-[0_0_0_3px_rgba(99,91,255,0.15)] transition-all text-[#1a1f36] appearance-none">
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>

            {/* Security Notice */}
            <p className="text-[11px] text-[#697386] leading-relaxed">
              By subscribing, you agree to authorize transactions to ConciseCap
              for this sandbox testing package. Restored credentials and cancel
              triggers apply seamlessly under testing rules.
            </p>

            {/* Subscribe execution button */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                id="stripe-sim-submit"
                className="w-full py-3.5 px-6 rounded-lg font-semibold text-[#ffffff] bg-[#635bff] hover:bg-[#564fc4] active:scale-[0.99] transition-all cursor-pointer text-sm shadow-[0_2px_4px_rgba(0,0,0,0.08),0_1px_1px_rgba(0,0,0,0.12)] flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
              </button>

              {/* Secure padding layout on stripe platform */}
              <button
                type="button"
                onClick={handleCancel}
                className="w-full text-center text-xs font-medium text-[#697386] hover:text-[#1a1f36] py-1 select-none cursor-pointer"
              >
                Cancel payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
