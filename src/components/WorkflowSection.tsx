import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Image as ImageIcon, QrCode, MapPin, Mic, Camera, ShieldCheck, Send } from 'lucide-react';

const styles = `
@keyframes focusPulse {
    0%, 10% { transform: scale(1); border-color: var(--text-dark); border-radius: 0; background: transparent; }
    12%, 18% { transform: scale(0.85); border-color: var(--accent); border-radius: 50%; background: var(--accent-light); }
    20%, 100% { transform: scale(1); border-color: var(--text-dark); border-radius: 0; background: transparent; }
}

@keyframes fullFlash {
    0%, 14.5% { opacity: 0; transform: scale(1); }
    15% { opacity: 1; transform: scale(1.1); filter: blur(2px); }
    16% { opacity: 0.4; transform: scale(1); filter: blur(0px); }
    18%, 100% { opacity: 0; }
}

@keyframes fadeInThumb {
    0%, 5% { opacity: 0; transform: translateY(4px) scale(0.95); }
    10%, 85% { opacity: 1; transform: translateY(0) scale(1); background: var(--border-gray); }
    15%, 80% { background: var(--camera-bg); }
    90%, 100% { opacity: 0; transform: translateY(-4px) scale(0.95); }
}

@keyframes fadeInChip {
    0%, 10% { opacity: 0; transform: translateX(-8px); }
    15%, 85% { opacity: 1; transform: translateX(0); }
    90%, 100% { opacity: 0; transform: translateX(8px); }
}

@keyframes typing {
    0%, 20% { width: 0; border-right: 2px solid var(--text-dark); }
    50% { width: 100%; border-right: 2px solid transparent; }
    100% { width: 100%; }
}

@keyframes stampThud {
    0%, 75% { opacity: 0; transform: scale(1.5) rotate(-12deg); }
    80%, 100% { opacity: 1; transform: scale(1) rotate(-12deg); outline: 2px solid transparent; }
}

@keyframes conveyor {
    from { background-position: 0 0; }
    to { background-position: -20px 0; }
}

@keyframes conveyor-y {
    from { background-position: 0 0; }
    to { background-position: 0 -20px; }
}

.sim-vars {
    --accent: #1E40AF;
    --accent-light: rgba(30, 64, 175, 0.15);
    --text-dark: #0f0f0f;
    --bg-light: #f5f5f4;
    --bg-white: #fafaf9;
    --border-gray: #d6d3d1;
    --camera-bg: #e7e5e4;
    --shadow-color: #f5f5f4;
}

.dark .sim-vars {
    --accent: #3b82f6;
    --accent-light: rgba(59, 130, 246, 0.2);
    --text-dark: #f8fafc;
    --bg-light: #0f172a;
    --bg-white: #1e293b;
    --border-gray: #334155;
    --camera-bg: #0f172a;
    --shadow-color: #0f172a;
}

.workflow-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.panel-heading {
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-dark);
    margin-bottom: 2rem;
    position: relative;
    opacity: 0.8;
}

.panel-heading::before, .panel-heading::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 100px;
    height: 1px;
    background: var(--border-gray);
}
.panel-heading::before { right: 100%; margin-right: 16px; }
.panel-heading::after { left: 100%; margin-left: 16px; }

.phone {
    width: 220px;
    height: 400px;
    border: 2px solid var(--text-dark);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    background: var(--bg-light);
    position: relative;
    overflow: hidden;
    box-shadow: 12px 12px 0 var(--shadow-color);
    margin-bottom: 2rem;
}

.camera {
    height: 140px;
    background: var(--camera-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--border-gray);
    position: relative;
    overflow: hidden;
}

.camera-flash {
    position: absolute;
    inset: -20px;
    background: radial-gradient(circle at center, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 80%);
    opacity: 0;
    animation: fullFlash 10s ease-out infinite;
    mix-blend-mode: screen;
    z-index: 10;
    pointer-events: none;
}

.viewfinder {
    width: 48px;
    height: 48px;
    border: 1px solid var(--text-dark);
    position: relative;
    animation: focusPulse 10s infinite ease-in-out;
}

.thumbnails {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 20px;
}

.thumb {
    height: 56px;
    background: var(--border-gray);
    opacity: 0;
    animation: fadeInThumb 10s infinite;
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-dark);
}
.thumb:nth-child(1) { animation-delay: 0s; }
.thumb:nth-child(2) { animation-delay: 0.5s; }
.thumb:nth-child(3) { animation-delay: 1s; }
.thumb:nth-child(4) { animation-delay: 1.5s; }

.chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0 20px 20px;
}

.chip {
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 4px 8px;
    background: var(--bg-white);
    border: 1px solid var(--border-gray);
    color: var(--text-dark);
    opacity: 0;
    animation: fadeInChip 10s infinite;
    text-transform: uppercase;
}
.chip:nth-child(1) { animation-delay: 0.2s; }
.chip:nth-child(2) { animation-delay: 0.7s; }
.chip:nth-child(3) { animation-delay: 1.2s; }
.chip:nth-child(4) { animation-delay: 1.7s; }

.bridge-horizontal {
    width: 80px;
    height: 2px;
    background-image: repeating-linear-gradient(90deg, var(--text-dark) 0, var(--text-dark) 6px, transparent 6px, transparent 12px);
    background-size: 24px 100%;
    animation: conveyor 1s linear infinite;
    opacity: 0.5;
}

.bridge-vertical {
    width: 2px;
    height: 64px;
    background-image: repeating-linear-gradient(180deg, var(--text-dark) 0, var(--text-dark) 6px, transparent 6px, transparent 12px);
    background-size: 100% 24px;
    animation: conveyor-y 1s linear infinite;
    opacity: 0.5;
}

.document {
    width: 280px;
    height: 380px;
    border: 1px solid var(--text-dark);
    background: var(--bg-white);
    padding: 24px;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 12px 12px 0 var(--shadow-color);
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    margin-bottom: 2rem;
}

.doc-anim-header {
    border-bottom: 1px dashed var(--border-gray);
    padding-bottom: 12px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.doc-anim-title {
    font-weight: 700;
    color: var(--text-dark);
}

.doc-generation-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
}

.gen-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.gen-label {
    color: var(--text-dark);
    opacity: 0.7;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.typewriter-container {
    background: var(--bg-light);
    border: 1px solid var(--border-gray);
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.typewriter-text {
    color: var(--text-dark);
    font-size: 0.65rem;
    font-family: inherit;
    /* Hide text initially, no wrapping allowed */
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid transparent; 
    width: 0;
    line-height: 1.4;
}

.extracted-data {
    border: 1px solid var(--text-dark);
    padding: 10px;
    background: var(--bg-white);
}

.extracted-row {
    font-size: 0.65rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
}

.extracted-row:last-child {
    margin-bottom: 0;
}

.extracted-row .key {
    font-weight: 600;
    color: var(--text-dark);
    opacity: 0;
}

.extracted-row .val {
    color: #10b981;
    overflow: hidden;
    white-space: nowrap;
    text-align: right;
    width: 0;
}

.doc-badge-new {
    margin-top: auto;
    border: 1px solid var(--text-dark);
    background: var(--text-dark);
    color: var(--bg-white);
    font-family: ui-sans-serif, system-ui, sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 10px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0;
    transform: translateY(10px);
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
@keyframes hideSpinner {
    0%, 80% { opacity: 1; }
    81%, 100% { opacity: 0; }
}

@keyframes typing1 {
    0% { width: 0; border-color: var(--text-dark); }
    15% { width: 100%; border-color: var(--text-dark); }
    16% { width: 100%; border-color: transparent; }
    95% { width: 100%; border-color: transparent; }
    100% { width: 0; border-color: transparent; }
}

@keyframes typing2 {
    0%, 15% { width: 0; border-color: transparent; }
    16% { width: 0; border-color: var(--text-dark); }
    30% { width: 100%; border-color: var(--text-dark); }
    31% { width: 100%; border-color: transparent; }
    95% { width: 100%; border-color: transparent; }
    100% { width: 0; border-color: transparent; }
}

@keyframes typing3 {
    0%, 30% { width: 0; border-color: transparent; }
    31% { width: 0; border-color: var(--text-dark); }
    45% { width: 100%; border-color: var(--text-dark); }
    46% { width: 100%; border-color: transparent; }
    95% { width: 100%; border-color: transparent; }
    100% { width: 0; border-color: transparent; }
}

@keyframes fadeInData1 { 0%, 49% {opacity: 0;} 50%, 95% {opacity: 1;} 100% {opacity:0;} }
@keyframes fadeInData2 { 0%, 59% {opacity: 0;} 60%, 95% {opacity: 1;} 100% {opacity:0;} }
@keyframes fadeInData3 { 0%, 69% {opacity: 0;} 70%, 95% {opacity: 1;} 100% {opacity:0;} }

@keyframes typingVal1 { 0%, 50% {width: 0;} 55%, 95% {width: 100%;} 100% {width: 0;} }
@keyframes typingVal2 { 0%, 60% {width: 0;} 65%, 95% {width: 100%;} 100% {width: 0;} }
@keyframes typingVal3 { 0%, 70% {width: 0;} 75%, 95% {width: 100%;} 100% {width: 0;} }

@keyframes stampBadge {
    0%, 80% { opacity: 0; transform: translateY(10px) scale(1.05); }
    82%, 95% { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(10px) scale(1.05); }
}

.doc-spinner {
    width: 12px;
    height: 12px;
    border: 2px solid var(--border-gray);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 1s infinite linear, hideSpinner 10s infinite;
}

.typewriter-text.line-1 { animation: typing1 10s steps(25, end) infinite; }
.typewriter-text.line-2 { animation: typing2 10s steps(25, end) infinite; }
.typewriter-text.line-3 { animation: typing3 10s steps(25, end) infinite; }

.extracted-row:nth-child(1) .key { animation: fadeInData1 10s infinite; }
.extracted-row:nth-child(2) .key { animation: fadeInData2 10s infinite; }
.extracted-row:nth-child(3) .key { animation: fadeInData3 10s infinite; }

.typing-val-1 { animation: typingVal1 10s steps(15, end) infinite; }
.typing-val-2 { animation: typingVal2 10s steps(15, end) infinite; }
.typing-val-3 { animation: typingVal3 10s steps(15, end) infinite; }

.doc-badge-new { animation: stampBadge 10s infinite; }

.panel-label {
    font-family: ui-serif, serif;
    font-style: italic;
    font-size: 1.125rem;
    color: var(--text-dark);
    opacity: 0.8;
}
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, y: 0,
    transition: { ease: [0.16, 1, 0.3, 1] as [number, number, number, number], duration: 0.8 }
  }
};

export function WorkflowSection({ isDarkMode, navigate }: { isDarkMode: boolean; navigate?: (path: string) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const yFieldTrans = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yOfficeTrans = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const yField = isLargeScreen ? yFieldTrans : 0;
  const yOffice = isLargeScreen ? yOfficeTrans : 0;

  return (
    <section ref={sectionRef} className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 pb-32 pt-16">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <div className="text-center mb-8 lg:mb-12">
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          From messy field notes to <br className="hidden md:block" />
          <span className="text-blue-500">invoice-ready packages.</span>
        </h2>
      </div>

      {/* Simulation Concept: Simple Blueprint Aesthetic */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className={`sim-vars flex flex-col lg:flex-row items-stretch justify-center w-full max-w-5xl mx-auto mb-32`}
      >
        {/* Left Container */}
        <motion.div style={{ y: yField }} className="w-full flex-1">
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className={`h-full px-6 py-10 lg:px-10 lg:py-14 flex flex-col items-center border transition-all duration-700 hover:border-black/20 dark:hover:border-white/20 ${isDarkMode ? 'bg-gradient-to-b from-white/5 to-white/[0.02] border-white/10 shadow-[0_10px_40px_rgba(255,255,255,0.04)] backdrop-blur-sm rounded-2xl' : 'bg-gradient-to-b from-black/5 to-black/[0.02] border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-sm rounded-2xl'}`}
          >
            <div className="panel-heading">In the Field</div>

          <div className="phone">
             <div className="camera">
                <div className="camera-flash"></div>
                <div className="viewfinder"></div>
             </div>
             
             <div className="thumbnails">
                <div className="thumb"><ImageIcon strokeWidth={1.5} className="w-8 h-8 opacity-50 mx-auto" /></div>
                <div className="thumb"><QrCode strokeWidth={1.5} className="w-8 h-8 opacity-50 mx-auto" /></div>
                <div className="thumb"><MapPin strokeWidth={1.5} className="w-8 h-8 opacity-50 mx-auto" /></div>
                <div className="thumb"><Mic strokeWidth={1.5} className="w-8 h-8 opacity-50 mx-auto" /></div>
             </div>
             
             <div className="chips">
                <span className="chip">Photo</span>
                <span className="chip">Model #</span>
                <span className="chip">Location</span>
                <span className="chip">Voice Note</span>
             </div>
          </div>
          
          <p className="panel-label">Tech captures job-site proof</p>
          </motion.div>
        </motion.div>

        {/* Bridge (Desktop) */}
        <div className="hidden lg:flex items-center justify-center px-4">
            <div className="bridge-horizontal" />
        </div>
        {/* Bridge (Mobile) */}
        <div className="lg:hidden flex items-center justify-center py-4">
            <div className="bridge-vertical" />
        </div>

        {/* Right Container */}
        <motion.div style={{ y: yOffice }} className="w-full flex-1">
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
            className={`h-full px-6 py-10 lg:px-10 lg:py-14 flex flex-col items-center border transition-all duration-700 hover:border-black/20 dark:hover:border-white/20 ${isDarkMode ? 'bg-gradient-to-b from-white/5 to-white/[0.02] border-white/10 shadow-[0_10px_40px_rgba(255,255,255,0.04)] backdrop-blur-sm rounded-2xl' : 'bg-gradient-to-b from-black/5 to-black/[0.02] border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-sm rounded-2xl'}`}
          >
            <div className="panel-heading">Ready to review</div>

          <div className="document">
              <div className="doc-anim-header">
                  <div className="doc-anim-title">JOB_REPORT_4402</div>
                  <div className="doc-spinner"></div>
              </div>
              
              <div className="doc-generation-list">
                  <div className="gen-item">
                      <span className="gen-label">Transcription: Voice Note</span>
                      <div className="typewriter-container">
                          <div className="typewriter-text line-1">Installed new condenser unit.</div>
                          <div className="typewriter-text line-2">Padded, leveled, lines connected.</div>
                          <div className="typewriter-text line-3">Attached photo of model plate.</div>
                      </div>
                  </div>
                  
                  <div className="gen-item">
                      <span className="gen-label">AI Extracted Data</span>
                      <div className="extracted-data">
                          <div className="extracted-row">
                              <span className="key">Model:</span> 
                              <span className="val typing-val-1">Carrier CH-5000</span>
                          </div>
                          <div className="extracted-row">
                              <span className="key">Task:</span> 
                              <span className="val typing-val-2">Condenser Swap</span>
                          </div>
                          <div className="extracted-row">
                              <span className="key">Photos:</span> 
                              <span className="val typing-val-3">Model Plate (Match)</span>
                          </div>
                      </div>
                  </div>
              </div>
              
              <div className="doc-badge-new">Approved Package ✓</div>
          </div>
          
          <p className="panel-label">Photos, notes, and signatures are organized into one job record.</p>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* The 3-Step Process (Waterfall) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-32 max-w-6xl mx-auto px-4"
      >
        {[
          {
            step: "01",
            title: "Capture",
            desc: "Field teams capture photos, notes, signatures, equipment details, location, and proof of work from every job site.",
            icon: Camera
          },
          {
            step: "02",
            title: "Verify",
            desc: "ConciseCap checks each submission for missing details, incomplete records, and documentation gaps before they slow down the office.",
            icon: ShieldCheck
          },
          {
            step: "03",
            title: "Submit",
            desc: "Completed jobs become organized records ready for review, customer approval, invoicing, and payment.",
            icon: Send
          }
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group flex flex-col p-8 md:p-10 rounded-3xl backdrop-blur-xl border shadow-lg transition-colors duration-500 ${
                isDarkMode 
                  ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:border-white/20 shadow-white/5' 
                  : 'bg-black/[0.03] border-black/10 hover:bg-black/[0.08] hover:border-black/20 shadow-black/5'
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <span className={`text-[11px] font-mono font-bold uppercase tracking-widest ${isDarkMode ? 'text-white/50 group-hover:text-white/70' : 'text-black/50 group-hover:text-black/70'} transition-colors`}>
                  Step {item.step}
                </span>
                <div className={`p-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/10 group-hover:bg-white/20 text-white' : 'bg-black/5 group-hover:bg-black/10 text-black'} transition-colors`}>
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className={`text-2xl font-bold tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>{item.title}</h3>
              <p className={`text-base leading-relaxed ${isDarkMode ? 'text-white/70 group-hover:text-white/90' : 'text-black/70 group-hover:text-black/90'} transition-colors`}>
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Founder's Note CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`max-w-3xl mx-auto text-center py-20 px-8 rounded-none transition-colors duration-700 border ${
          isDarkMode ? 'bg-white/5 border-white/20' : 'bg-black/5 border-black/20'
        }`}
      >
        <h2 className={`text-3xl md:text-4xl font-serif italic tracking-tight leading-tight mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Missing job-site details cost time, trust, and revenue.
        </h2>
        <p className={`text-[15px] mb-10 max-w-xl mx-auto leading-relaxed ${isDarkMode ? 'text-white/70' : 'text-black/70'}`}>
          Built for contractors who need cleaner job records, faster approvals, and fewer back-and-forth messages between the field and office.
        </p>
        
        <button 
          onClick={() => {
            if (navigate) {
              navigate('/get-started');
            } else {
              window.location.href = '/get-started';
            }
          }}
          className={`inline-flex items-center gap-3 px-8 py-3 text-[11px] font-mono font-bold uppercase tracking-widest transition-all group border cursor-pointer ${
            isDarkMode 
              ? 'bg-white text-black border-white hover:bg-neutral-100 hover:scale-[1.01]' 
              : 'bg-black text-white border-black hover:bg-neutral-900 hover:scale-[1.01]'
          }`}
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </section>
  );
}
