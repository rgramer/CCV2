import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Monitor,
  Smartphone,
  ArrowDown,
  Sparkles,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import ShaderBackground, { ShaderToggles } from "./components/ShaderBackground";
import { WorkflowSection } from "./components/WorkflowSection";
import { TermsOfServicePage } from "./components/TermsOfServicePage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { IndustriesPage } from "./components/IndustriesPage";
import { ContactPage } from "./components/ContactPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { PaymentSuccessPage } from "./components/PaymentSuccessPage";
import { PaymentCancelledPage } from "./components/PaymentCancelledPage";
import { StripeCheckoutSimPage } from "./components/StripeCheckoutSimPage";

export default function App() {
  const [isDarkMode] = useState(true);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/",
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shaderToggles, setShaderToggles] = useState<ShaderToggles>({
    negativeSpace: true,
    airflowStreaks: true,
    conduit: true,
    skyLighting: true,
    circuitOverlay: true,
    intersectionGlow: true,
  });

  const toggleShader = (key: keyof ShaderToggles) => {
    setShaderToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navigate = (path: string) => {
    if (typeof window !== "undefined") {
      const parts = path.split("#");
      const basePath = parts[0];
      const hash = parts[1];

      window.history.pushState(null, "", basePath || "/");
      setCurrentPath(basePath || "/");

      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const isDebug = typeof window !== "undefined" && currentPath === "/debug";

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  if (currentPath === "/stripe-checkout-sim") {
    return <StripeCheckoutSimPage />;
  }

  return (
    <div
      className={`relative min-h-screen h-auto overflow-x-hidden overflow-y-visible md:h-auto md:min-h-screen md:overflow-visible w-full transition-colors duration-700 font-sans ${isDarkMode ? "bg-[#0a0f1c] text-slate-100" : "bg-white text-[#0f172a]"}`}
    >
      <ShaderBackground isDarkMode={isDarkMode} toggles={shaderToggles} />

      {/* Debug Toggles (Bottom Left) - Only shown on /debug page */}
      {isDebug && (
        <div className="absolute bottom-6 left-6 z-50 flex flex-col gap-2 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl pointer-events-auto">
          <h3 className="text-white text-xs font-semibold mb-1 uppercase tracking-wider">
            Shader Elements
          </h3>
          {[
            { key: "negativeSpace", label: "1. Negative Space Fog" },
            { key: "airflowStreaks", label: "2. Airflow Streaks" },
            { key: "conduit", label: "3. Glass Conduit" },
            { key: "skyLighting", label: "4. Sky Lighting" },
            { key: "circuitOverlay", label: "5. Circuit Overlay" },
            { key: "intersectionGlow", label: "6. Intersection Glow" },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-3 text-sm text-gray-200 cursor-pointer hover:text-white transition-colors"
            >
              <input
                type="checkbox"
                checked={shaderToggles[item.key as keyof ShaderToggles]}
                onChange={() => toggleShader(item.key as keyof ShaderToggles)}
                className="accent-blue-500 w-4 h-4 rounded-sm"
              />
              {item.label}
            </label>
          ))}
        </div>
      )}

      {/* Content Overlay */}
      <div className="relative z-10 w-full pointer-events-none">
        {/* Responsive fold layout optimized to show everything before scroll on mobile */}
        <div
          className={`${currentPath === "/" ? "min-h-screen h-auto md:h-auto md:min-h-screen" : "min-h-screen"} flex flex-col justify-between max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20`}
        >
          {/* Compact Navigation */}
          <nav className="flex items-center justify-between py-3 md:py-6 w-full pointer-events-auto shrink-0 select-none relative">
            {/* Logo with optimized responsive sizing (not giant on phones) */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center cursor-pointer"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/");
              }}
            >
              <img
                src="https://r2.concisecap.com/website%20images/ConciseCap%20White%20Logo.webp"
                alt="ConciseCap Logo"
                className="h-28 sm:h-28 md:h-36 lg:h-44 w-auto object-contain transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Desktop Navbar Links (Only visible on Computer width >= 1024px) */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className={`hidden lg:flex items-center gap-6 text-sm font-medium transition-colors ${isDarkMode ? "text-slate-300" : "text-gray-800"} pointer-events-auto`}
            >
              <button
                onClick={() => navigate("/get-started")}
                className={`px-4 py-1.5 text-xs uppercase tracking-wider font-extrabold rounded-lg transition-all duration-300 cursor-pointer select-none shadow-md ${
                  currentPath === "/get-started"
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/#workflow-section-heading")}
                className="hover:text-blue-400 transition-colors cursor-pointer text-xs uppercase tracking-wider font-bold"
              >
                Product
              </button>
              <button
                onClick={() => navigate("/industries")}
                className={`hover:text-blue-400 transition-colors cursor-pointer text-xs uppercase tracking-wider font-bold ${currentPath.startsWith("/industries") ? "text-blue-400 border-b-2 border-blue-500/50 pb-0.5" : ""}`}
              >
                Industries
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="hover:text-blue-400 transition-colors cursor-pointer text-xs uppercase tracking-wider font-bold"
              >
                Contact
              </button>

              <button
                className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-extrabold rounded-lg border border-blue-500/30 hover:bg-blue-500/10 text-blue-500 cursor-pointer transition-all flex items-center gap-1.5 shadow-sm"
                onClick={() => {
                  window.open("https://app.concisecap.com", "_self");
                }}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            </motion.div>

            {/* Mobile & iPad Navigation Actions (Screens < 1024px) */}
            <div className="flex lg:hidden items-center gap-3 pointer-events-auto select-none">
              <button
                onClick={() => navigate("/get-started")}
                className="px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-extrabold rounded-lg bg-blue-600 text-white cursor-pointer active:scale-[0.97] transition-all hover:bg-blue-500 select-none shadow-md shadow-blue-500/10"
              >
                Get Started
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg border transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 ${
                  isDarkMode
                    ? "bg-slate-900/60 border-white/5 text-slate-300 hover:text-white hover:border-white/10"
                    : "bg-slate-100 border-slate-200 text-gray-700 hover:text-black hover:bg-slate-200"
                }`}
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 text-blue-400" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile & iPad Glassmorphism Nav Drawer overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-16 left-4 right-4 sm:top-24 sm:left-8 sm:right-8 z-50 rounded-2xl border pointer-events-auto shadow-2xl backdrop-blur-xl bg-slate-950/95 border-blue-500/25 text-white flex flex-col p-6 space-y-6 lg:hidden"
              >
                <div className="flex flex-col gap-4">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500 border-b border-white/5 pb-2">
                    Menu Navigation
                  </div>

                  {/* Standard Navigation Options */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/");
                      }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left cursor-pointer"
                    >
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                        01.
                      </span>
                      <span className="text-sm font-semibold">Home</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/#workflow-section-heading");
                      }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left cursor-pointer"
                    >
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                        02.
                      </span>
                      <span className="text-sm font-semibold">
                        Product info
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/industries");
                      }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left cursor-pointer"
                    >
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                        03.
                      </span>
                      <span className="text-sm font-semibold">Industries</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/contact");
                      }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left cursor-pointer"
                    >
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                        04.
                      </span>
                      <span className="text-sm font-semibold">Contact</span>
                    </button>
                  </div>

                  <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500 border-b border-white/5 pb-2 pt-2">
                    Quick Access Solutions
                  </div>

                  {/* Industries shortcuts */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "HVAC", path: "/industries/hvac" },
                      { label: "Plumbing", path: "/industries/plumbing" },
                      { label: "Electrical", path: "/industries/electrical" },
                      { label: "Roofing", path: "/industries/roofing" },
                      { label: "Inspections", path: "/industries/inspections" },
                      {
                        label: "Contracting",
                        path: "/industries/general-contracting",
                      },
                    ].map((shortcut) => (
                      <button
                        key={shortcut.label}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate(shortcut.path);
                        }}
                        className="py-2.5 px-1.5 text-[10px] text-center font-bold uppercase tracking-wider rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
                      >
                        {shortcut.label}
                      </button>
                    ))}
                  </div>

                  {/* Primary mobile CTA triggers */}
                  <div className="flex flex-col gap-2 pt-2 pb-1">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/get-started");
                      }}
                      className="w-full text-center py-3 rounded-xl font-bold uppercase tracking-widest bg-blue-600 text-white hover:bg-blue-500 shadow-md text-xs select-none cursor-pointer"
                    >
                      Get Started Today
                    </button>

                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.open("https://app.concisecap.com", "_self");
                      }}
                      className="w-full text-center py-3 rounded-xl font-bold uppercase tracking-widest bg-transparent hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-all text-xs flex items-center justify-center gap-2 select-none cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Login</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dynamic Content Routing Block */}
          {currentPath === "/" ? (
            <>
              {/* Hero Content (Clean & Compact to secure above-the-fold visibility on mobile/phone) */}
              <main className="flex-1 flex flex-col justify-center py-2 sm:py-6 md:py-12 pointer-events-auto select-none overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1,
                  }}
                  className="max-w-4xl"
                >
                  <h1
                    className={`text-4xl sm:text-5xl md:text-7xl lg:text-[76px] leading-[1.05] font-serif tracking-tight transition-colors ${isDarkMode ? "text-white" : "text-[#1a1a24]"}`}
                  >
                    Field documentation
                    <br />
                    <span className="text-white relative z-10 px-1 py-0.5 mt-1 inline-block">
                      <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400">
                        software for contractors.
                      </span>
                    </span>
                  </h1>

                  <p
                    className={`text-xs sm:text-sm md:text-base max-w-xl mt-3 md:mt-5 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Capture job-site photos, notes, signatures, equipment
                    details, and proof of work in one place — so your team can
                    close out jobs faster and send invoice-ready packages with
                    confidence.
                  </p>

                  {/* Comprehensive Premium CTA Layout */}
                  <div className="mt-5 sm:mt-8 flex flex-col gap-4 sm:gap-6">
                    {/* Modernized "Get the App" Section */}
                    <div className="flex flex-col gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}
                      >
                        Download Smartphone Application
                      </span>

                      {/* Ultra-Modern App Badges */}
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Modern App Store Badge */}
                        <a
                          href="https://apps.apple.com"
                          className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg border transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${isDarkMode ? "bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800" : "bg-slate-950 border-slate-900 hover:bg-slate-900 text-white"}`}
                          onClick={(e) => {
                            e.preventDefault();
                            alert(
                              "Secure redirect token generated. Opening ConciseCap on iOS App Store...",
                            );
                          }}
                        >
                          <svg
                            className={`w-5 h-5 fill-current shrink-0 ${isDarkMode ? "text-white" : "text-white"}`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M18.71,19.5 C17.88,20.74 17,21.95 15.66,21.97 C14.32,22 13.89,21.18 12.37,21.18 C10.84,21.18 10.37,21.95 9.1,22 C7.79,22.05 6.8,20.68 5.96,19.47 C4.25,17 2.94,12.45 4.7,9.39 C5.57,7.87 7.13,6.91 8.82,6.88 C10.1,6.86 11.32,7.75 12.11,7.75 C12.89,7.75 14.37,6.68 15.92,6.84 C16.57,6.87 18.39,7.1 19.56,8.82 C19.47,8.88 17.39,10.1 17.41,12.63 C17.44,15.65 20.06,16.66 20.1,16.67 C20.08,16.74 19.67,18.11 18.71,19.5 M15.97,4.17 C16.63,3.37 17.07,2.28 16.95,1 C16,1.04 14.9,1.6 14.24,2.38 C13.68,3.04 13.19,4.14 13.34,5.39 C14.39,5.47 15.4,4.88 15.97,4.17 Z" />
                          </svg>
                          <div className="flex flex-col text-left leading-none">
                            <span className="text-[8px] uppercase tracking-wider font-semibold text-gray-400">
                              Download on the
                            </span>
                            <span className="text-[13px] font-bold tracking-tight mt-0.5">
                              App Store
                            </span>
                          </div>
                        </a>

                        {/* Modern Play Store Badge */}
                        <a
                          href="https://play.google.com"
                          className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg border transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${isDarkMode ? "bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800" : "bg-slate-950 border-slate-900 hover:bg-slate-900 text-white"}`}
                          onClick={(e) => {
                            e.preventDefault();
                            alert(
                              "Secure redirect token generated. Opening ConciseCap on Google Play Store...",
                            );
                          }}
                        >
                          <svg
                            className={`w-5 h-5 fill-current shrink-0 ${isDarkMode ? "text-white" : "text-white"}`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L20.38,12.58C20.77,12.78 20.77,13.22 20.38,13.42L17.87,14.67L15,13L17.87,11.33M3,3.41C3.33,3.41 3.69,3.53 4,3.71L18.82,11.12L13.73,12L3,3.41M3,20.59L13.73,12L18.82,12.88L4,20.29C3.69,20.47 3.33,20.59 3,20.59Z" />
                          </svg>
                          <div className="flex flex-col text-left leading-none">
                            <span className="text-[8px] uppercase tracking-wider font-semibold text-gray-400">
                              Get it on
                            </span>
                            <span className="text-[13px] font-bold tracking-tight mt-0.5">
                              Google Play
                            </span>
                          </div>
                        </a>

                        {/* Desktop portal button inside the button group */}
                        <button
                          className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300 text-xs font-mono font-bold uppercase tracking-widest cursor-pointer ${isDarkMode ? "bg-blue-600 hover:bg-blue-500 text-white hover:scale-[1.01]" : "bg-black text-white hover:bg-neutral-900 hover:scale-[1.01]"}`}
                          onClick={() => {
                            navigate("/get-started");
                          }}
                        >
                          <span>Get Started</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </main>

              {/* Micro scroll hint link (at the custom baseline of raw layout) */}
              <div className="py-2 flex flex-col items-center gap-2 pointer-events-auto shrink-0 select-none pb-4 sm:pb-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="hidden md:inline-block group cursor-pointer"
                  onClick={() => {
                    const target = document.querySelector(
                      "#workflow-section-heading",
                    );
                    target?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <div
                    className={`flex items-center gap-2.5 text-xs font-semibold tracking-wide transition-colors ${isDarkMode ? "text-slate-400 group-hover:text-white" : "text-gray-600"}`}
                  >
                    <span>Scroll down to see field app workflow</span>
                    <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                  </div>
                </motion.div>
              </div>
            </>
          ) : currentPath.startsWith("/industries") ? (
            <div className="pointer-events-auto py-4 sm:py-8">
              <IndustriesPage
                currentPath={currentPath}
                navigate={navigate}
                isDarkMode={isDarkMode}
                setShowPrivacy={(show) => {
                  if (show) navigate("/privacy-policy");
                }}
              />
            </div>
          ) : currentPath === "/contact" ? (
            <div className="pointer-events-auto py-4 sm:py-8">
              <ContactPage navigate={navigate} isDarkMode={isDarkMode} />
            </div>
          ) : currentPath === "/get-started" ? (
            <div className="pointer-events-auto py-4 sm:py-8">
              <CheckoutPage navigate={navigate} isDarkMode={isDarkMode} />
            </div>
          ) : currentPath === "/payment-success" ? (
            <div className="pointer-events-auto py-4 sm:py-8">
              <PaymentSuccessPage navigate={navigate} isDarkMode={isDarkMode} />
            </div>
          ) : currentPath === "/payment-cancelled" ? (
            <div className="pointer-events-auto py-4 sm:py-8">
              <PaymentCancelledPage
                navigate={navigate}
                isDarkMode={isDarkMode}
              />
            </div>
          ) : currentPath === "/support" ? (
            <div className="pointer-events-auto py-4 sm:py-8">
              <SupportPage navigate={navigate} isDarkMode={isDarkMode} />
            </div>
          ) : currentPath === "/privacy-policy" ? (
            <div className="pointer-events-auto py-4 sm:py-8">
              <PrivacyPolicyPage navigate={navigate} isDarkMode={isDarkMode} />
            </div>
          ) : currentPath === "/terms-of-service" ? (
            <div className="pointer-events-auto py-4 sm:py-8">
              <TermsOfServicePage navigate={navigate} isDarkMode={isDarkMode} />
            </div>
          ) : null}
        </div>

        {/* Workflow Section - Visible on all devices, beautifully optimized */}
        {currentPath === "/" && (
          <div
            id="workflow-section-heading"
            className="pointer-events-auto w-full pb-16 md:pb-32 block"
          >
            <WorkflowSection isDarkMode={isDarkMode} navigate={navigate} />
          </div>
        )}

        {/* Universal True Footer - Beautifully optimized for mobile, tablet, and desktop */}
        <footer className="pointer-events-auto w-full py-16 border-t border-black/5 dark:border-white/5">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              {/* ConciseCap Logo on Left (Subtle and professional) */}
              <img
                src="https://r2.concisecap.com/website%20images/ConciseCap%20White%20Logo.webp"
                alt="ConciseCap Logo"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain select-none cursor-pointer"
                referrerPolicy="no-referrer"
                onClick={() => navigate("/")}
              />

              <span
                className={`text-sm opacity-50 ${isDarkMode ? "text-slate-300" : "text-[#0f172a]"}`}
              >
                © 2026 ConciseCap. All rights reserved.
              </span>

              {/* Product links */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1.5 text-xs font-semibold opacity-70 text-slate-400">
                <button
                  onClick={() => navigate("/#workflow-section-heading")}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Product
                </button>
                <span className="opacity-30">·</span>
                <button
                  onClick={() => navigate("/industries")}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Industries
                </button>
                <span className="opacity-30">·</span>
                <button
                  onClick={() => navigate("/support")}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Support
                </button>
                <span className="opacity-30">·</span>
                <button
                  onClick={() => navigate("/contact")}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Contact
                </button>
                <span className="opacity-30">·</span>
                <button
                  onClick={() => navigate("/privacy-policy")}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span className="opacity-30">·</span>
                <button
                  onClick={() => navigate("/terms-of-service")}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </div>
            </div>

            {/* Clickable Infogito logo to Infogito.com */}
            <div className="flex items-center gap-3 md:self-end md:mb-1.5">
              <a
                href="https://infogito.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 opacity-75 hover:opacity-100 transition-all duration-300 hover:scale-[1.01] translate-y-0.5"
              >
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold opacity-45 ${isDarkMode ? "text-slate-400" : "text-gray-500"} pt-0.5`}
                >
                  A product by
                </span>
                <img
                  src="https://r2.concisecap.com/website%20images/Infogito%20Logo.webp"
                  alt="Infogito Logo"
                  className="h-9 sm:h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Support Page component
function SupportPage({
  navigate,
  isDarkMode,
}: {
  navigate: (path: string) => void;
  isDarkMode: boolean;
}) {
  useEffect(() => {
    document.title = "Support | ConciseCap";
  }, []);
  return (
    <div className="py-16 text-center max-w-2xl mx-auto space-y-6 px-4">
      <h1
        className={`text-4xl font-serif tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}
      >
        Support Center
      </h1>
      <p
        className={`text-sm md:text-base leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
      >
        Need assistance with your ConciseCap installation or Office Portal
        synchronization?
      </p>
      <div
        className={`p-6 rounded-2xl border ${isDarkMode ? "bg-slate-900/40 border-white/5" : "bg-slate-50 border-slate-200"} space-y-4`}
      >
        <a
          href="mailto:russel@infogito.com"
          className="text-lg font-bold hover:underline text-blue-500"
        >
          russel@infogito.com
        </a>
      </div>
    </div>
  );
}
