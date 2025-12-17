import { useState } from 'react';
import { Globe, ArrowRight, CheckCircle, Calendar, Download } from 'lucide-react';
import content from './data/content';

type ContentType = {
  [key: string]: any;
};
import { PopupModal } from 'react-calendly';

// Asset Imports
import osamaImg from '/assets/Osama-DrCAYwX-.svg';
import amrousyImg from '/assets/Amrousy-BD9BxXFd.svg';
import logo from '/assets/untitled_design-BMySX4vu.svg';

function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const t = (content as ContentType)[lang];
  const isRTL = lang === 'ar';

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-main text-white overflow-x-hidden selection:bg-quanthos-magenta selection:text-white">
      
      {/* Background Glow Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-quanthos-lightViolet/20 via-transparent to-transparent opacity-50 z-0"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 backdrop-blur-lg bg-quanthos-dark/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Quanthos" className="h-10 w-auto" />
            <span className="text-2xl font-bold tracking-tight text-white hidden sm:block">
              QUANTHOS<span className="text-quanthos-magenta">.</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-medium text-quanthos-panel/90">
              <a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a>
              <a href="#methodology" className="hover:text-white transition-colors">Methodology</a>
              <a href="#services" className="hover:text-white transition-colors">{t.nav.services}</a>
              <a href="#portfolio" className="hover:text-white transition-colors">{t.nav.portfolio}</a>
              <a href="#team" className="hover:text-white transition-colors">{t.nav.team}</a>
            </div>
            <button 
              onClick={toggleLang} 
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all text-sm font-semibold"
            >
              <Globe size={16} />
              <span>{lang === 'en' ? 'AR' : 'EN'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Methodology Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quanthos-blue/20 border border-quanthos-blue/30 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-quanthos-magenta shadow-[0_0_10px_#E344FF]"></span>
            <span className="text-quanthos-lightViolet font-medium text-sm tracking-wide uppercase">
              {t.hero.methodology}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            {t.hero.tagline}
          </h1>
          <p className="text-xl text-quanthos-panel/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.hero.sub}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setIsCalendlyOpen(true)}
              className="px-8 py-4 bg-quanthos-magenta text-white rounded-xl font-bold hover:bg-[#d633f0] hover:shadow-[0_0_20px_rgba(227,68,255,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <Calendar size={20} />
              {t.nav.contact}
            </button>
            <a 
              href="#services"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              {t.hero.cta_primary}
              <ArrowRight size={20} className={isRTL ? "rotate-180" : ""} />
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-black/20 backdrop-blur-sm z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.about.title}</h2>
            <p className="text-quanthos-panel/80 max-w-4xl mx-auto leading-relaxed">{t.about.overview}</p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-24 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.methodology.title}</h2>
            <p className="text-quanthos-panel/70 max-w-3xl mx-auto">{t.methodology.overview}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-quanthos-blue to-quanthos-dark text-white p-8 rounded-[24px]">
              <h3 className="text-2xl font-bold mb-4">{t.methodology.diagnosis.title}</h3>
              <p className="text-blue-100 leading-relaxed">{t.methodology.diagnosis.description}</p>
            </div>

            <div className="bg-gradient-to-br from-quanthos-magenta to-quanthos-pink text-white p-8 rounded-[24px]">
              <h3 className="text-2xl font-bold mb-4">{t.methodology.activation.title}</h3>
              <p className="text-pink-100 leading-relaxed">{t.methodology.activation.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-black/20 backdrop-blur-sm z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.services.title}</h2>
            <p className="text-quanthos-panel/70 max-w-2xl mx-auto">{t.services.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {t.services.pillars.map((pillar: any, idx: number) => (
              <div key={idx} className="group p-8 rounded-[24px] bg-quanthos-panel text-gray-800 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                {/* Accent Gradient Border Effect */}
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-quanthos-blue to-quanthos-magenta opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <h3 className="text-2xl font-bold text-quanthos-dark mb-4">{pillar.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{pillar.description}</p>
                <ul className="space-y-3">
                  {pillar.services.map((service: any, pIdx: number) => (
                    <li key={pIdx} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                      <CheckCircle className="text-quanthos-magenta shrink-0" size={18} />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Stats */}
      <section id="portfolio" className="py-24 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.portfolio.title}</h2>
            <p className="text-quanthos-panel/70">{t.portfolio.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {t.portfolio.caseStudies.map((caseStudy: any, idx: number) => (
              <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <h3 className="text-xl font-bold text-quanthos-magenta mb-4">{caseStudy.title}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-quanthos-lightViolet font-semibold">Challenge: </span>
                    <span className="text-white/80">{caseStudy.challenge}</span>
                  </div>
                  <div>
                    <span className="text-quanthos-blue font-semibold">Diagnosis: </span>
                    <span className="text-white/80">{caseStudy.diagnosis}</span>
                  </div>
                  <div>
                    <span className="text-quanthos-magenta font-semibold">Activation: </span>
                    <span className="text-white/80">{caseStudy.activation}</span>
                  </div>
                  <div>
                    <span className="text-quanthos-pink font-semibold">Result: </span>
                    <span className="text-white font-medium">{caseStudy.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a 
              href="/Quanthos Portfolio.pdf" 
              target="_blank"
              className="inline-flex items-center gap-2 text-white border-b border-quanthos-magenta pb-1 hover:text-quanthos-magenta transition-colors"
            >
              <Download size={18} />
              {t.portfolio.download}
            </a>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="team" className="py-24 px-6 bg-black/20 backdrop-blur-sm z-10 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.team.title}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Osama */}
            <div className="bg-quanthos-panel text-gray-800 p-8 rounded-[24px] shadow-xl text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-quanthos-blue">
                 <img src={osamaImg} alt="Dr. Osama" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-quanthos-dark">{t.team.osama.name}</h3>
              <p className="text-quanthos-magenta font-semibold text-sm mb-4">{t.team.osama.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{t.team.osama.bio}</p>
            </div>

            {/* Amrousy */}
            <div className="bg-quanthos-panel text-gray-800 p-8 rounded-[24px] shadow-xl text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-quanthos-magenta">
                <img src={amrousyImg} alt="Dr. Amrousy" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-quanthos-dark">{t.team.amrousy.name}</h3>
              <p className="text-quanthos-magenta font-semibold text-sm mb-4">{t.team.amrousy.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{t.team.amrousy.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-white/40 text-sm relative z-10">
        <p>© 2025 Quanthos. Insight Diagnosed. Impact Engineered.</p>
      </footer>

      {/* Calendly Integration */}
      <PopupModal 
        url="https://calendly.com/osbazoka/short-consultation-session" 
        rootElement={document.getElementById('root')!}
        open={isCalendlyOpen}
        onModalClose={() => setIsCalendlyOpen(false)}
      />
    </div>
  );
}

export default App;