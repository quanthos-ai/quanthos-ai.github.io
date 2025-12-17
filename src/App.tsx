import { useState } from 'react';
import { CheckCircle, GraduationCap, Users, TrendingUp, Star, Activity, Zap } from 'lucide-react';
import { content } from './data/content';
import { PopupModal } from 'react-calendly';

// Assets
import osamaImg from './assets/Osama.svg';
import amrousyImg from './assets/Amrousy.svg';
import logo from './assets/untitled_design.svg';

function App() {
  const [lang] = useState<'en'>('en');
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const t = content[lang];

  return (
    <div className="min-h-screen bg-white text-quanthos-dark font-sans overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Quanthos" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-quanthos-dark hidden sm:block">
              QUANTHOS<span className="text-quanthos-magenta">.</span>
            </span>
          </div>
          <div className="hidden lg:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#methodology" className="hover:text-quanthos-magenta transition-colors">{t.nav.methodology}</a>
            <a href="#talent" className="hover:text-quanthos-magenta transition-colors">{t.nav.talent}</a>
            <a href="#services" className="hover:text-quanthos-magenta transition-colors">{t.nav.services}</a>
            <a href="#portfolio" className="hover:text-quanthos-magenta transition-colors">{t.nav.portfolio}</a>
            <a href="#team" className="hover:text-quanthos-magenta transition-colors">{t.nav.team}</a>
          </div>
          <button 
            onClick={() => setIsCalendlyOpen(true)}
            className="px-6 py-2.5 bg-quanthos-blue text-white rounded-full font-semibold hover:bg-quanthos-dark transition-all text-sm shadow-lg shadow-quanthos-blue/30"
          >
            {t.nav.contact}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-36 pb-24 px-6 bg-gradient-main text-white text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-quanthos-lightViolet text-sm font-medium mb-8 backdrop-blur-sm">
            {t.methodology.title}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">{t.hero.tagline}</h1>
          <p className="text-xl text-quanthos-panel/90 mb-12 max-w-2xl mx-auto leading-relaxed">{t.hero.sub}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a href="#services" className="px-8 py-4 bg-white text-quanthos-dark rounded-xl font-bold hover:bg-quanthos-panel hover:scale-105 transition-all shadow-xl">
              {t.hero.cta_primary}
            </a>
            <a href="#talent" className="px-8 py-4 border border-white/30 bg-white/5 text-white rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm">
              {t.hero.cta_secondary}
            </a>
          </div>
        </div>
      </header>

      {/* Methodology Section */}
      <section id="methodology" className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-quanthos-dark mb-4">{t.methodology.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.methodology.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {t.methodology.phases.map((phase, idx) => (
              <div key={idx} className={`p-10 rounded-[32px] border transition-all hover:shadow-xl ${idx === 0 ? 'bg-quanthos-panel border-gray-100' : 'bg-quanthos-dark text-white border-quanthos-dark'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${idx === 0 ? 'bg-quanthos-blue/10 text-quanthos-blue' : 'bg-quanthos-magenta text-white'}`}>
                    {idx === 0 ? <Activity size={24} /> : <Zap size={24} />}
                  </div>
                  <span className={`font-bold tracking-widest uppercase text-sm ${idx === 0 ? 'text-quanthos-blue' : 'text-quanthos-magenta'}`}>{phase.step}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{phase.name}</h3>
                <p className={`leading-relaxed ${idx === 0 ? 'text-gray-600' : 'text-gray-300'}`}>{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talent Foundry Section (Preserved) */}
      <section id="talent" className="py-24 px-6 bg-quanthos-panel relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-quanthos-lightViolet/20 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-quanthos-magenta font-bold tracking-wider uppercase text-sm">Empowerment</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-quanthos-dark">{t.talentFoundry.title}</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{t.talentFoundry.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {t.talentFoundry.segments.map((seg, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-quanthos-magenta hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-quanthos-lightViolet/20 rounded-2xl flex items-center justify-center text-quanthos-dark mb-6">
                  {idx === 0 && <Users size={28} />}
                  {idx === 1 && <GraduationCap size={28} />}
                  {idx === 2 && <TrendingUp size={28} />}
                </div>
                <h3 className="text-xl font-bold text-quanthos-dark mb-2">{seg.title}</h3>
                <p className="text-sm font-semibold text-quanthos-magenta mb-4">{seg.target}</p>
                <p className="text-gray-600 leading-relaxed text-sm">{seg.desc}</p>
              </div>
            ))}
          </div>

          {/* Success Stories */}
          <div className="bg-quanthos-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-quanthos-magenta/10 to-transparent"></div>
            <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2 relative z-10">
              <Star className="text-quanthos-magenta fill-quanthos-magenta" /> Success Stories
            </h3>
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              {t.talentFoundry.successStories.map((story, idx) => (
                <div key={idx} className="bg-white/10 p-6 rounded-xl backdrop-blur-md border border-white/5">
                  <p className="text-lg italic text-quanthos-lightViolet mb-4">"{story.quote}"</p>
                  <div>
                    <div className="font-bold">{story.name}</div>
                    <div className="text-sm text-gray-400">{story.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Pillars */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t.services.title}</h2>
            <p className="text-gray-600">{t.services.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {t.services.items.map((item, idx) => (
              <div key={idx} className="group bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-2xl hover:border-quanthos-blue/20 transition-all duration-300">
                <h3 className="text-xl font-bold text-quanthos-dark mb-3 group-hover:text-quanthos-blue transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-6">{item.desc}</p>
                <ul className="space-y-4">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle size={18} className="text-quanthos-magenta shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proven Portfolio */}
      <section id="portfolio" className="py-24 px-6 bg-quanthos-dark text-white relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-quanthos-dark via-quanthos-dark to-[#2a1b4a]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t.portfolio.title}</h2>
            <p className="text-quanthos-lightViolet">{t.portfolio.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.portfolio.cases.map((study, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-quanthos-magenta mb-1 group-hover:scale-110 transition-transform origin-left">{study.metric}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">{study.subMetric}</div>
                </div>
                <div className="h-px w-full bg-white/10 my-4"></div>
                <h4 className="font-bold text-lg mb-2 text-white">{study.title}</h4>
                <p className="text-sm text-quanthos-lightViolet mb-3">{study.desc}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{study.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="team" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">{t.team.title}</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Osama */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-4 border-quanthos-blue p-1 bg-white">
                <img src={osamaImg} alt="Dr. Osama" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-xl font-bold text-quanthos-dark">{t.team.osama.name}</h3>
              <p className="text-quanthos-blue font-semibold text-sm mb-4">{t.team.osama.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{t.team.osama.bio}</p>
            </div>
            
            {/* Amrousy */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-4 border-quanthos-magenta p-1 bg-white">
                <img src={amrousyImg} alt="Dr. Amrousy" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-xl font-bold text-quanthos-dark">{t.team.amrousy.name}</h3>
              <p className="text-quanthos-magenta font-semibold text-sm mb-4">{t.team.amrousy.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{t.team.amrousy.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 text-center border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
           <img src={logo} alt="Quanthos" className="h-8 w-auto mb-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
           <p className="text-gray-400 text-sm">© 2025 Quanthos. {t.hero.tagline}</p>
        </div>
      </footer>

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