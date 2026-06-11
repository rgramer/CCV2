import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Fan, 
  Layers, 
  Wrench, 
  Plug, 
  ShieldCheck, 
  HardHat, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Globe,
  Camera,
  FileCheck
} from 'lucide-react';

interface IndustriesPageProps {
  currentPath: string;
  navigate: (path: string) => void;
  isDarkMode: boolean;
  setShowPrivacy: (show: boolean) => void;
}

const INDUSTRIES_DATA = [
  {
    id: 'hvac',
    name: 'HVAC',
    icon: Fan,
    color: 'from-sky-500/10 to-blue-500/5',
    borderColor: 'group-hover:border-sky-500/40',
    iconColor: 'text-sky-500 dark:text-sky-400',
    path: '/industries/hvac',
    description: 'Document installs, service calls, equipment details, model plates, job photos, signatures, and proof of work.',
    detailedSummary: 'ConciseCap provides specialized HVAC field kits. Instantly capture combustion analysis sheets, electrical connection photos, ductwork compliance ratings, and manufacturer identification plates. Our processing engine ensures your EPA forms are fully cross-referenced with local compliance mandates.',
    checklists: [
      'Model & serial plate text extraction',
      'Before & after airflow measurements',
      'Gas pressure & line voltage metrics',
      'Customer signature on EPA compliance logs',
      'Indoor/outdoor unit quality photos'
    ]
  },
  {
    id: 'roofing',
    name: 'Roofing',
    icon: Layers,
    color: 'from-amber-600/10 to-orange-600/5',
    borderColor: 'group-hover:border-orange-500/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
    path: '/industries/roofing',
    description: 'Capture roof photos, inspection notes, before-and-after evidence, repair details, and customer approvals.',
    detailedSummary: 'Roofing compliance and insurance payouts rely on bulletproof photo evidence. ConciseCap organizes massive high-definition photo files by roof face/slope automatically. Capture close-up flashing details, underlayment conditions, and final cleanup sweeps.',
    checklists: [
      'Drip edge and valley flashing photos',
      'Underlayment fastening pattern confirmations',
      'Torn shingle & deck rot diagnostics',
      'Final yard sweep magnetic rake confirmations',
      'Interactive hail damage mapping checklists'
    ]
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: Wrench,
    color: 'from-indigo-500/10 to-blue-500/5',
    borderColor: 'group-hover:border-indigo-500/40',
    iconColor: 'text-indigo-500 dark:text-indigo-400',
    path: '/industries/plumbing',
    description: 'Track leak repairs, fixture installs, line work, job-site photos, signatures, and service documentation.',
    detailedSummary: 'Water damage liabilities can crush plumbing teams. ConciseCap provides instant timestamped and geotagged proof of hydrostatic tests, pressure tests, and clean visual weld/braze connections before drywall closure.',
    checklists: [
      'PSI test log and gauge pressure hold photos',
      'Open trench sewer slope slope verification',
      'Thermal imaging validation of hot/cold supplies',
      'Sump pump float-switch activation videos',
      'Water heater valve connection confirmations'
    ]
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: Plug,
    color: 'from-yellow-500/10 to-amber-500/5',
    borderColor: 'group-hover:border-yellow-500/40',
    iconColor: 'text-amber-500 dark:text-amber-400',
    path: '/industries/electrical',
    description: 'Document panels, wiring work, inspections, completed repairs, safety notes, and proof of service.',
    detailedSummary: 'Electrical documentation requires extreme structural clarity. ConciseCap structures panel schedules (breaker mapping), service upgrades, and wire routing pathways so code inspectors can pre-approve and stamp plans.',
    checklists: [
      'Panel layout legibility and labeling compliance',
      'Grounding electrode connection photos',
      'Conduit run fastening & bend limit checks',
      'GFCIs/AFCIs trip-test digital reports',
      'Maser junction box insulation wrap documentation'
    ]
  },
  {
    id: 'inspections',
    name: 'Inspections',
    icon: ShieldCheck,
    color: 'from-emerald-500/10 to-teal-500/5',
    borderColor: 'group-hover:border-emerald-500/40',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
    path: '/industries/inspections',
    description: 'Create organized records with photos, notes, defects, timestamps, signatures, and final reports.',
    detailedSummary: 'Third-party inspections require absolute, unassailable evidence. Form-rich checklist structures with mandatory step gates ensure inspection agents never miss a load-bearing calculation, egress clearance, or fire seal.',
    checklists: [
      'Unbiased high-definition photo verification',
      'Defect logging with critical priority tags',
      'Egress window & smoke alarm checks',
      'Foundation concrete crack inspection records',
      'Multi-inspector field sign-off workflows'
    ]
  },
  {
    id: 'general-contracting',
    name: 'General Contracting',
    icon: HardHat,
    color: 'from-slate-500/10 to-zinc-500/5',
    borderColor: 'group-hover:border-slate-500/40',
    iconColor: 'text-slate-500 dark:text-slate-300',
    path: '/industries/general-contracting',
    description: 'Keep project photos, field notes, approvals, job details, and invoice-ready records in one place.',
    detailedSummary: 'General contractors orchestrate multiple tier-two specialty trades. Eliminate finger-pointing. Use ConciseCap to capture standard progress milestones, daily logs, trade transitions, and change requests.',
    checklists: [
      'Daily site status reports with weather telemetry',
      'Subcontractor turnover condition reviews',
      'Client change order signature captures',
      'Material delivery count & receipt photos',
      'Pre-slab pour reinforcement inspection logs'
    ]
  }
];

export function IndustriesPage({ currentPath, navigate, isDarkMode, setShowPrivacy }: IndustriesPageProps) {
  
  // SEO Meta Update on component mount or path change
  useEffect(() => {
    const isSubPage = currentPath !== '/industries';
    const subPageId = isSubPage ? currentPath.split('/').pop() : '';
    const currentIndustry = INDUSTRIES_DATA.find(i => i.id === subPageId);

    if (currentIndustry) {
      document.title = `${currentIndustry.name} Documentation Software | ConciseCap`;
    } else {
      document.title = 'Industries | ConciseCap';
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content', 
        currentIndustry 
          ? `${currentIndustry.name} documentation simplified: ${currentIndustry.description} Optimized for field contractors.`
          : 'ConciseCap helps HVAC, roofing, plumbing, electrical, inspection, and general contracting teams capture job-site photos, notes, signatures, equipment details, and proof of work.'
      );
    }
    
    // Smooth scroll to top on path change
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [currentPath]);

  // Find if we are on a specific sub-page
  const isSubPage = currentPath !== '/industries';
  const subPageId = isSubPage ? currentPath.split('/').pop() : '';
  const currentIndustry = INDUSTRIES_DATA.find(i => i.id === subPageId);

  // If sub-page doesn't match any supported industry, default to listing
  const renderContent = () => {
    if (isSubPage && currentIndustry) {
      // Industry Sub-page View
      const IconComp = currentIndustry.icon;
      return (
        <motion.div
          key="sub-page"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
          className="w-full pb-20"
        >
          {/* Breadcrumbs and Back Button */}
          <button 
            onClick={() => navigate('/industries')}
            className={`flex items-center gap-2 mb-8 text-xs font-mono font-bold uppercase tracking-wider ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors cursor-pointer group`}
          >
            <ArrowLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
            Back to Industries
          </button>

          {/* Core Industry Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                <div className={`p-3.5 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-850/80' 
                    : 'bg-slate-50 border-slate-200'
                } shadow-sm`}>
                  <IconComp className={`w-7 h-7 ${currentIndustry.iconColor}`} />
                </div>
                <div>
                  <span className={`text-[10px] font-mono tracking-widest uppercase font-extrabold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    CONCISECAP FOR CONTRACTORS
                  </span>
                  <h1 className={`text-4xl md:text-5xl font-serif tracking-tight mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {currentIndustry.name}
                  </h1>
                </div>
              </div>

              <p className={`text-lg md:text-xl font-light leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {currentIndustry.description}
              </p>

              <div className={`h-[1px] w-full ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />

              <div className="space-y-4">
                <h4 className={`text-sm font-mono tracking-wider font-extrabold uppercase ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  Industry Solution Overview
                </h4>
                <p className={`text-sm md:text-base leading-relaxed ${isDarkMode ? 'text-slate-300/80' : 'text-slate-600'}`}>
                  {currentIndustry.detailedSummary}
                </p>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400/80' : 'text-slate-500'}`}>
                  With ConciseCap's zero-lag visual compiler, technicians can complete standard checklists even in offline basements, subways, and concrete vaults. Once network connectivity re-establishes, data is compiled, sorted, and routed directly to management dashboards securely.
                </p>
              </div>
            </div>

            {/* Checklist Card */}
            <div className="lg:col-span-5">
              <div className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-white/5 shadow-2xl' : 'bg-slate-50 border-slate-200/60 shadow-xl'}`}>
                <h3 className={`text-base font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  Key Field Verifications Needed
                </h3>
                
                <ul className="space-y-4">
                  {currentIndustry.checklists.map((item, idx) => (
                    <li key={idx} className="flex gap-3 start items-start">
                      <div className="p-0.5 rounded-full bg-blue-500/10 text-blue-400 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className={`text-xs md:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className={`h-[1px] w-full my-6 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5 text-cyan-400 shrink-0" />
                    <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Auto-Tagged Field Captures Included</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Standard Office PDF Packager Output Ready</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/get-started')}
                  className={`mt-8 w-full flex items-center justify-center gap-2.5 py-3 rounded-lg text-xs font-mono font-bold uppercase tracking-widest text-center cursor-pointer transition-all duration-300 hover:scale-[1.01] ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-black text-white hover:bg-neutral-900'}`}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    // Main Listing View
    return (
      <div className="w-full">
        {/* 1. Hero Section */}
        <header className="py-12 md:py-16 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight mt-6 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Field documentation software for every job that needs proof.
            </h1>
            <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed ${isDarkMode ? 'text-slate-300/95' : 'text-slate-600'}`}>
              ConciseCap helps contractors capture job-site photos, notes, signatures, equipment details, and proof of work — then turn completed jobs into clean, invoice-ready packages.
            </p>
            <p className={`text-xs sm:text-sm max-w-xl mx-auto mt-4 leading-relaxed font-mono tracking-tight opacity-75 ${isDarkMode ? 'text-blue-400/80' : 'text-blue-600'}`}>
              Built for field teams that need better records, faster approvals, and fewer missing details between the job site and the office.
            </p>
          </motion.div>
        </header>

        {/* 2. Industry Cards Section */}
        <section className="py-8">
          <div className="text-center mb-10">
            <h2 className={`text-2xl font-serif italic ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              Built for every field trade.
            </h2>
            <div className={`h-[1px] w-12 mx-auto mt-4 ${isDarkMode ? 'bg-blue-500/30' : 'bg-blue-600/30'}`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {INDUSTRIES_DATA.map((industry, index) => {
              const IconComp = industry.icon;
              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => navigate(industry.path)}
                  className={`group relative flex flex-col justify-between p-6 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                    isDarkMode 
                      ? 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/40 shadow-sm' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-2.5 rounded-lg border transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-900 border-slate-800 group-hover:border-slate-700' 
                          : 'bg-slate-100 border-slate-200 group-hover:border-slate-300'
                      }`}>
                        <IconComp className={`w-5 h-5 ${industry.iconColor}`} />
                      </div>
                    </div>

                    <h3 className={`text-base font-bold font-sans tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900 group-hover:text-blue-600'}`}>
                      {industry.name}
                    </h3>

                    <p className={`text-xs leading-relaxed mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {industry.description}
                    </p>
                  </div>

                  <div className={`flex items-center gap-1.5 text-[10px] font-mono font-extrabold uppercase tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-all`}>
                    <span>Deploy {industry.name}</span>
                    <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 min-h-[calc(100vh-300px)] flex flex-col justify-between pointer-events-auto select-none">
      
      {/* Dynamic Main Body Content */}
      <div className="flex-1 flex flex-col justify-center py-6">
        {renderContent()}
      </div>

      {/* 3. Bottom CTA Section (renders if on the main listing page or specific subpage) */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`w-full py-16 px-8 rounded-3xl text-center border mb-16 relative overflow-hidden ${
          isDarkMode 
            ? 'bg-gradient-to-b from-[#0e1628]/80 to-[#0b101d] border-white/5 shadow-2xl' 
            : 'bg-gradient-to-b from-slate-50 to-slate-100 border-slate-200 shadow-md'
        }`}
      >
        <div className="absolute inset-0 bg-blue-500/5 blur-[120px] -z-10" />
        
        <h2 className={`text-3xl md:text-4xl font-serif italic tracking-tight leading-tight mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Missing job-site details cost time, trust, and revenue.
        </h2>
        
        <p className={`text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
          Built for contractors who need cleaner job records, faster approvals, and fewer back-and-forth messages between the field and office.
        </p>
        
        <button 
          onClick={() => navigate('/get-started')}
          className={`inline-flex items-center gap-3 px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.01] cursor-pointer rounded-lg ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-500 text-white' 
              : 'bg-black text-white hover:bg-neutral-900'
          }`}
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

    </div>
  );
}
