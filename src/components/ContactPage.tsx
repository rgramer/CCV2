import { useEffect } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';

interface ContactPageProps {
  navigate: (path: string) => void;
  isDarkMode: boolean;
}

export function ContactPage({ navigate, isDarkMode }: ContactPageProps) {
  useEffect(() => {
    document.title = 'Contact | ConciseCap';
  }, []);

  return (
    <div className="py-16 text-center max-w-2xl mx-auto space-y-6 px-4">
      <button 
        onClick={() => navigate('/')}
        className={`flex items-center gap-2 mb-4 text-xs font-mono font-bold uppercase tracking-wider mx-auto group transition-colors cursor-pointer ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
      >
        <ArrowLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
        Back to Home
      </button>

      <h1 className={`text-4xl font-serif tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        Want to chat?
      </h1>
      


      <div className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-slate-900/40 border-white/5' : 'bg-slate-50 border-slate-200'} space-y-4`}>
        <div className="mx-auto w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-1">
          <Mail className="w-5 h-5" />
        </div>
        <p className="text-xs font-mono font-bold uppercase text-blue-400">Direct Email</p>
        <a href="mailto:russel@infogito.com" className="text-xl sm:text-2xl font-bold hover:underline text-blue-500 block break-all font-mono">
          russel@infogito.com
        </a>
        <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          Standard response times are under 24 hours.
        </p>
      </div>

      <button 
        onClick={() => navigate('/')} 
        className={`px-6 py-2.5 rounded-lg border text-xs font-mono font-bold uppercase tracking-widest cursor-pointer transition-colors ${isDarkMode ? 'bg-slate-900 border-white/10 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
      >
        Return to Home
      </button>
    </div>
  );
}
