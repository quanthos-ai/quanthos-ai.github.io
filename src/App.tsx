import { useState, useEffect, useRef } from 'react';
import { CheckCircle, GraduationCap, Users, TrendingUp, Star, Activity, Zap, MessageCircle, Send, X, Globe, Phone, Mail } from 'lucide-react';
import { content } from './data/content';
import { PopupModal } from 'react-calendly';

const osamaImg = new URL('../assets/Osama-DrCAYwX-.svg', import.meta.url).href;
const amrousyImg = new URL('../assets/Amrousy-BD9BxXFd.svg', import.meta.url).href;
const logo = new URL('../assets/Quanthos Transparent White Letters.svg', import.meta.url).href;
const collaboratorsImg = new URL('../assets/Collaborators.svg', import.meta.url).href;
const pillarImg1 = new URL('../assets/4 Pillars Images/1. Growth CLinic.png', import.meta.url).href;
const pillarImg2 = new URL('../assets/4 Pillars Images/2. AI Autiomation.png', import.meta.url).href;
const pillarImg3 = new URL('../assets/4 Pillars Images/3. Sales and marketing meeting.png', import.meta.url).href;
const pillarImg4 = new URL('../assets/4 Pillars Images/4. AI Training.png', import.meta.url).href;

function WhatsAppIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.21 6.37 2.21 11.83c0 2.09.64 4.04 1.86 5.72L2 22l4.57-1.99c1.62.89 3.45 1.36 5.47 1.36 5.46 0 9.83-4.37 9.83-9.83S17.5 2 12.04 2zm0 17.88c-1.73 0-3.33-.5-4.67-1.36l-.33-.2-2.71 1.18.58-2.86-.22-.33c-1.1-1.54-1.69-3.37-1.69-5.27 0-4.73 3.85-8.58 8.58-8.58s8.58 3.85 8.58 8.58-3.85 8.58-8.58 8.58zm4.94-4.94c-.27-.14-1.57-.77-1.82-.86-.24-.09-.42-.14-.6.14-.18.27-.69.86-.85 1.03-.16.18-.31.2-.58.07-.27-.14-1.16-.43-2.2-1.37-.81-.72-1.36-1.6-1.52-1.88-.16-.27-.02-.42.12-.57.13-.13.27-.33.4-.5.13-.18.18-.31.27-.52.09-.18.04-.36-.02-.5-.07-.14-.6-1.45-.82-1.98-.22-.53-.44-.46-.6-.46-.16 0-.33-.02-.5-.02-.18 0-.46.07-.7.33-.24.27-.91.89-.91 2.17 0 1.28.93 2.52 1.06 2.7.13.18 1.83 2.79 4.43 3.91.62.27 1.1.43 1.47.55.62.2 1.18.17 1.62.1.49-.07 1.57-.64 1.8-1.26.22-.62.22-1.15.15-1.26-.07-.11-.25-.18-.53-.31z" />
    </svg>
  );
}

type Page = 'home' | 'about' | 'insights' | 'contact';

function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [page, setPage] = useState<Page>('home');
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [showReturnship, setShowReturnship] = useState(true);

  const t = content[lang];
  const isRTL = lang === 'ar';
  const toggleLang = () => setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  const isAssistantAvailable = true;

  function navigateTo(next: Page) {
    setPage(next);
    window.history.pushState({ page: next }, '', next === 'home' ? '/' : `#${next}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function goToSection(sectionId: string) {
    setPage('home');
    const url = `/#${sectionId}`;
    window.history.pushState({ page: 'home' }, '', url);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      setPage((hash as Page) || 'home');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const corporateContext =
    "#QUANTHOS: Corporate Profile & Comprehensive Service Portfolio\n##1. Executive Overview\nQuanthos is a premier AI and Data Consultancy dedicated to bridging the critical gap between high-level data strategy and real-world business execution. In an era where businesses are drowning in data but starving for insights, Quanthos provides the missing link: Activation.\n\nWe distinguish ourselves from traditional consultancies by offering a full-stack solution. We do not simply deliver strategic reports and leave; we build the automated systems, engineer the workflows, and train the human talent required to turn those strategies into measurable competitive advantages.\n\nOur Mission: To transform raw data into a decisive engine for growth, efficiency, and market leadership.\nOur Tagline: Insight Diagnosed. Impact Engineered.\n\n##2. The \"Diagnose & Activate\" Methodology\nQuanthos was founded on a unique, dual-phased philosophy that combines scientific rigor with engineering precision. This methodology ensures that every technological investment yields a tangible business return.\n\n###Phase 1: The Diagnosis (The \"Quant\")\nLed by the principles of data science and precision analytics, we approach business challenges like a medical diagnosis. We do not guess; we analyze. By ingesting and modeling historical data, we identify the root causes of inefficiency, churn, or revenue loss. We move beyond \"what happened\" to determine \"why it happened\" and \"what will happen next.\"\n\n###Phase 2: The Activation (The \"Anthos\")\nLed by the principles of engineering and human behavioral psychology, we translate the diagnosis into action. This involves two distinct steps:\n\n1. System Engineering: Building the AI agents, automation workflows, and dashboards that fix the problem.\n2. Human Activation: Training the workforce with hands-on, role-specific skills to ensure they adopt the new tools and processes effectively.\n\n##3. Comprehensive Service Ecosystem\nOur services are organized into four interconnected pillars designed to modernize every aspect of the enterprise.\n\n###Pillar I: Data Strategy & Business Intelligence\nWe transform data from a static record-keeping tool into a dynamic asset for decision-making. We build the \"single source of truth\" that aligns the C-suite and operations.\n\n• Predictive Sales & Demand Forecasting\n• Executive Dashboards & BI Frameworks\n• AI-Readiness & Data Maturity Assessments\n• Customer Segmentation & Clustering\n\n###Pillar II: AI Automation & Workflow Orchestration\nWe serve as the architects of organizational efficiency. By deploying \"Digital Workers\" (AI Agents) and robotic process automation, we eliminate the bottleneck of manual tasks.\n\n• Robotic Process Automation (RPA)\n• Custom AI Agents\n• Workflow Integration\n• Error Reduction Protocols\n\n###Pillar III: Sales & Marketing Activation\nWe engineer the revenue engine of the future. By integrating AI into the sales funnel, we empower teams to close more deals faster and with higher precision.\n\n• AI-Powered Lead Generation\n• Hyper-Personalized Content Engines\n• CRM Process Engineering\n• Sentiment Analysis & NLP\n\n###Pillar IV: Corporate AI Training & Enablement\nTechnology is only as powerful as the people using it. We upskill the entire organization to build a resilient, AI-native culture.\n\n• The \"AI Co-Pilot\" Program\n• Role-Specific Workshops";

  // Do not show internal context to users; only use it when sending to the model.

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages, isSending]);

  async function sendToGemini() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
    if (!apiKey) {
      const last = chatMessages[chatMessages.length - 1];
      const userText = last?.text || '';
      const fallbackAssistant = (input: string) => {
        const txt = input.toLowerCase();
        if (txt.includes('service') || txt.includes('clinic') || txt.includes('growth')) {
          const items = t.services.items.slice(0, 4).map(i => `- ${i.title}`).join('\n');
          return `Growth Clinic pillars:\n${items}\n\nWe transform strategy into execution across data, automation, sales/marketing, and training.`;
        }
        if (txt.includes('returnship')) {
          const seg = t.talentFoundry.segments[0];
          return `Returnship Program — ${seg.target}\n${seg.desc}\nRegister via "Join Now" under Talent Foundry or the "Secure your seat" button.`;
        }
        if (txt.includes('contact') || txt.includes('phone') || txt.includes('whatsapp')) {
          return `Contact:\nEgypt: +20 100 124 01 86 (WhatsApp)\nEgypt: +20 100 900 94 82 (WhatsApp)\nUAE: +971 52 281 8558 (WhatsApp)\nEmail: osama_naguib@hotmail.com`;
        }
        return `Quanthos bridges data strategy with real-world execution.\nAsk about Growth Clinic, Returnship, or contact details.`;
      };
      setChatMessages(prev => [
        ...prev,
        { role: 'model', text: fallbackAssistant(userText) },
      ]);
      return;
    }
    setIsSending(true);
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const body = {
        contents: [
          { role: 'user', parts: [{ text: corporateContext }] },
          ...chatMessages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 1024,
        },
      };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }
      type GeminiPart = { text?: string };
      type GeminiContent = { parts?: GeminiPart[] };
      type GeminiCandidate = { content?: GeminiContent };
      type GeminiResponse = { candidates?: GeminiCandidate[] };
      const data: GeminiResponse = await res.json();
      const text =
        (data.candidates?.[0]?.content?.parts || [])
          .map(p => p.text || '')
          .join('') || 'Sorry, I could not generate a response.';
      setChatMessages(prev => [...prev, { role: 'model', text }]);
    } catch (e: unknown) {
      setChatMessages(prev => [
        ...prev,
        { role: 'model', text: 'Error contacting AI service.' },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  async function handleSend() {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user', text: chatInput.trim() }]);
    setChatInput('');
    await sendToGemini();
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white text-quanthos-dark font-sans overflow-x-hidden">
      
      {/* Navigation */}
       <nav className="fixed w-full z-50 bg-[#493570] backdrop-blur-md border-b border-transparent shadow-sm">
         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
           <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Quanthos"
              style={{ height: '4.25rem' }}
              className="w-auto cursor-pointer"
              onClick={() => {
                window.location.href = '/';
                window.location.reload();
              }}
            />
           </div>
          <div className="hidden lg:flex gap-8 text-sm font-medium text-white">
            <button onClick={() => navigateTo('about')} className="hover:text-quanthos-magenta transition-colors">{t.nav.about}</button>
            <button onClick={() => goToSection('methodology')} className="hover:text-quanthos-magenta transition-colors">{t.nav.methodology}</button>
            <button onClick={() => goToSection('talent')} className="hover:text-quanthos-magenta transition-colors">{t.nav.talent}</button>
            <button onClick={() => goToSection('services')} className="hover:text-quanthos-magenta transition-colors">{t.nav.services}</button>
            <button onClick={() => goToSection('portfolio')} className="hover:text-quanthos-magenta transition-colors">{t.nav.portfolio}</button>
            <button onClick={() => navigateTo('insights')} className="hover:text-quanthos-magenta transition-colors">Insights</button>
            <button onClick={() => navigateTo('contact')} className="hover:text-quanthos-magenta transition-colors">Contact Us</button>
          </div>
          <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsCalendlyOpen(true)}
            className="px-6 py-2.5 text-white rounded-full font-semibold transition-all text-sm shadow-lg"
            style={{ backgroundImage: 'linear-gradient(135deg, #E344FF, #6D7CFF)' }}
          >
            {t.nav.contact}
          </button>
          <button 
            onClick={toggleLang}
            className="px-4 py-2.5 bg-white text-quanthos-dark rounded-full border border-gray-200 hover:bg-quanthos-panel transition-all text-sm font-semibold flex items-center gap-2"
          >
            <Globe size={16} />
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
          </div>
         </div>
       </nav>

      {/* Routes */}
      {page === 'home' && (
      <>
      {/* Hero Section */}
       <header className="relative pt-36 pb-24 px-6 bg-gradient-main text-white text-center">
         <div className="max-w-5xl mx-auto">
           <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-quanthos-lightViolet text-sm font-medium mb-8 backdrop-blur-sm">
             {t.methodology.title}
           </div>
           <div className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight mt-6">
             {(() => {
               const parts = t.hero.tagline.split('. ');
               const line1 = parts[0]?.endsWith('.') ? parts[0] : (parts[0] ? parts[0] + '.' : '');
               const line2 = parts[1] || '';
               return (
                 <div className="inline-block">
                   <div>{line1}</div>
                   {line2 && <div>{line2}</div>}
                 </div>
               );
             })()}
           </div>
           <p className="text-xl text-quanthos-panel/90 mb-12 max-w-2xl mx-auto leading-relaxed">Bridging the critical gap between high-level data strategy and real-world business execution.</p>
           <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a onClick={() => goToSection('services')} className="px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl text-white cursor-pointer" style={{ backgroundColor: '#634e86' }}>
              Visit the Growth Clinic
            </a>
            <a onClick={() => goToSection('talent')} className="px-8 py-4 rounded-xl font-bold transition-all shadow-xl text-white cursor-pointer" style={{ backgroundColor: '#634e86' }}>
              Join the Talent Foundary
            </a>
           </div>
           {showReturnship && (
             <div className="fixed top-28 right-6 z-40 bg-quanthos-magenta text-white px-6 py-4 rounded-2xl shadow-xl max-w-sm text-right">
               <button aria-label="Close" className="absolute top-2 right-2 text-white/80 hover:text-white" onClick={() => setShowReturnship(false)}>✕</button>
               <div className="font-bold mb-1">The "Returnship" Program</div>
               <div className="text-sm">Limited-time: 50% discount if registered before end of December or referred by "Momken" Committee.</div>
               <div className="text-sm mt-2"><span className="font-bold">1500 L.E</span> total — 3 Practical Sessions for AI <span className="uppercase">Upskilling</span> and <span className="uppercase">Confidence-Building</span>.</div>
               <a href="#returnship" className="mt-3 inline-block bg-white text-quanthos-magenta font-bold px-3 py-2 rounded-xl">
                 Secure your seat
               </a>
             </div>
           )}
         </div>
       </header>

      {/* Home continues */}
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
              <div key={idx} id={idx === 0 ? 'returnship' : undefined} className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-quanthos-magenta hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-quanthos-lightViolet/20 rounded-2xl flex items-center justify-center text-quanthos-dark mb-6">
                  {idx === 0 && <Users size={28} />}
                  {idx === 1 && <GraduationCap size={28} />}
                  {idx === 2 && <TrendingUp size={28} />}
                </div>
                <h3 className="text-xl font-bold text-quanthos-dark mb-2">{seg.title}</h3>
                <p className="text-sm font-semibold text-quanthos-magenta mb-4">{seg.target}</p>
                <p className="text-gray-600 leading-relaxed text-sm">{seg.desc}</p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSe1o7xImAP_qllI2b-ce8dKItamsT6wMGNTNcOOwcn7ixuFPQ/viewform?usp=dialog" className="mt-6 inline-block px-4 py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#634e86' }}>
                  Join Now
                </a>
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
                 <img
                    src={
                      idx === 0
                        ? pillarImg1
                        : idx === 1
                        ? pillarImg2
                        : idx === 2
                        ? pillarImg3
                        : pillarImg4
                    }
                    alt="pillar"
                    className="w-full h-32 object-cover rounded-xl mb-4"
                    onError={(e) => {
                      const t = e.currentTarget as HTMLImageElement;
                      t.src = 'https://picsum.photos/id/180/600/300';
                    }}
                  />
                  <h3 className="text-xl font-bold text-quanthos-dark mb-3 group-hover:text-quanthos-blue transition-colors">{idx === 0 ? 'Strategy and Businees Intelligence' : item.title}</h3>
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

      <section id="portfolio" className="py-24 px-6 bg-quanthos-dark text-white relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-quanthos-dark via-quanthos-dark to-[#2a1b4a]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4">{t.portfolio.title}</h2>
                  <p className="text-quanthos-lightViolet">{t.portfolio.subtitle}</p>
                  <div className="mt-6">
                    <a href="Quanthos Portfolio.pdf" target="_blank" className="inline-block px-6 py-3 bg-quanthos-magenta text-white rounded-xl font-bold shadow-xl">
                      Download Full Portfolio
                    </a>
                  </div>
                </div>
          <h3 className="text-xl font-bold mb-4">Organizations</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {t.portfolio.orgs.map((study, idx) => (
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
          <h3 className="text-xl font-bold mb-4">Individuals</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.portfolio.individuals.map((p, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="text-2xl font-bold text-white mb-2">{p.name}</div>
                <div className="text-quanthos-magenta font-semibold mb-2">{p.result}</div>
                <div className="text-sm text-gray-300">{p.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborators */}
      <section id="collaborators" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-quanthos-dark mb-8">Collaborators</h2>
          <img src={collaboratorsImg} alt="Quanthos Collaborators" className="w-full h-auto" />
        </div>
      </section>
      </>
      )}

      {page === 'about' && (
        <main className="pt-28">
          <section className="px-6 py-16 bg-gradient-main text-white text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">About Quanthos</h1>
              <p className="text-quanthos-panel/90">{t.about.overview}</p>
            </div>
          </section>
          <section className="py-16 px-6 bg-white">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
              <div className="p-8 rounded-2xl bg-quanthos-panel">
                <h2 className="text-2xl font-bold text-quanthos-dark mb-3">{t.about.whatIsTitle}</h2>
                <p className="text-gray-700">{t.about.whatIsDesc}</p>
              </div>
              <div className="p-8 rounded-2xl bg-quanthos-panel">
                <h2 className="text-2xl font-bold text-quanthos-dark mb-3">{t.about.philosophyTitle}</h2>
                <p className="text-gray-700">{t.about.philosophyDesc}</p>
              </div>
            </div>
          </section>
          <section className="py-16 px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold text-quanthos-dark">Executive Leadership</h2>
            </div>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-4 border-quanthos-blue p-1 bg-white">
                  <img src={osamaImg} alt="Dr. Osama" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-quanthos-dark">{t.team.osama.name}</h3>
                <p className="text-quanthos-blue font-semibold text-sm mb-4">{t.team.osama.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{t.team.osama.bio}</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-4 border-quanthos-magenta p-1 bg-white">
                  <img src={amrousyImg} alt="Dr. Amrousy" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-quanthos-dark">{t.team.amrousy.name}</h3>
                <p className="text-quanthos-magenta font-semibold text-sm mb-4">{t.team.amrousy.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{t.team.amrousy.bio}</p>
              </div>
            </div>
          </section>
        </main>
      )}

      {page === 'insights' && (
        <main className="pt-28">
          <section className="px-6 py-16 bg-quanthos-dark text-white">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Insights</h1>
              <p className="text-quanthos-lightViolet">Strategic ideas on diagnosis, leadership, and activation.</p>
            </div>
          </section>
          <section className="py-16 px-6 bg-white">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
              {[
                { title: "Business Diagnosis", desc: "Hidden signals of structural issues and how to catch them early." },
                { title: "Pre-crisis Readiness", desc: "Build an early warning system tailored to your context." },
                { title: "Leadership Behavior", desc: "Transform leadership style to match growth demands." },
                { title: "AI in Management", desc: "Use AI to diagnose performance with higher accuracy." },
                { title: "Financial Data Analysis", desc: "Read financials to find weaknesses before they hurt." },
                { title: "Operational Excellence", desc: "Five steps to evaluate and optimize internal processes." },
              ].map((i,idx)=>(
                <div key={idx} className="p-6 rounded-2xl bg-quanthos-panel border border-gray-100">
                  <h3 className="font-bold text-quanthos-dark mb-2">{i.title}</h3>
                  <p className="text-gray-700 text-sm">{i.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {page === 'contact' && (
        <main className="pt-28">
          <section className="px-6 py-16 bg-quanthos-dark text-white">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-quanthos-lightViolet">Reach us directly via phone, WhatsApp, or email.</p>
            </div>
          </section>
          <section className="py-16 px-6 bg-white">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-quanthos-panel">
                <div className="font-semibold text-quanthos-dark mb-1">Egypt</div>
                <div className="flex items-center gap-3 font-semibold text-quanthos-dark mb-2"><Phone size={18} /> +20 100 124 01 86</div>
                <a href="https://wa.me/201001240186" className="inline-flex items-center gap-2 text-green-600 font-medium" aria-label="WhatsApp">
                  <WhatsAppIcon size={20} className="text-green-600" />
                </a>
              </div>
              <div className="p-6 rounded-2xl bg-quanthos-panel">
                <div className="flex items-center gap-3 font-semibold text-quanthos-dark mb-2"><Phone size={18} /> +20 100 900 94 82</div>
                <a href="https://wa.me/201009009482" className="inline-flex items-center gap-2 text-green-600 font-medium" aria-label="WhatsApp">
                  <WhatsAppIcon size={20} className="text-green-600" />
                </a>
              </div>
              <div className="p-6 rounded-2xl bg-quanthos-panel">
                <div className="font-semibold text-quanthos-dark mb-1">UAE</div>
                <div className="flex items-center gap-3 font-semibold text-quanthos-dark mb-2"><Phone size={18} /> +971 52 281 8558</div>
                <a href="https://wa.me/971522818558" className="inline-flex items-center gap-2 text-green-600 font-medium" aria-label="WhatsApp">
                  <WhatsAppIcon size={20} className="text-green-600" />
                </a>
              </div>
              <div className="p-6 rounded-2xl bg-quanthos-panel md:col-span-3">
                <div className="flex items-center gap-3 font-semibold text-quanthos-dark"><Mail size={18} /> osama_naguib@hotmail.com</div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-gradient-main text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold mb-3">Contact Us</h4>
            <div className="text-white/80 text-sm space-y-2">
              <div className="font-semibold">Egypt</div>
              <div className="flex items-center gap-2"><Phone size={14} /> +20 100 124 01 86 <a href="https://wa.me/201001240186" className="inline-flex items-center ml-2 text-green-500"><WhatsAppIcon size={18} className="text-green-500" /></a></div>
              <div className="flex items-center gap-2"><Phone size={14} /> +20 100 900 94 82 <a href="https://wa.me/201009009482" className="inline-flex items-center ml-2 text-green-500"><WhatsAppIcon size={18} className="text-green-500" /></a></div>
              <div className="font-semibold mt-2">UAE</div>
              <div className="flex items-center gap-2"><Phone size={14} /> +971 52 281 8558 <a href="https://wa.me/971522818558" className="inline-flex items-center ml-2 text-green-500"><WhatsAppIcon size={18} className="text-green-500" /></a></div>
              <div className="flex items-center gap-2 mt-2"><Mail size={14} /> osama_naguib@hotmail.com</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3">Quick Links</h4>
            <div className="text-white/80 text-sm space-y-2">
              <button onClick={()=>navigateTo('about')} className="hover:text-quanthos-lightViolet block">About</button>
              <button onClick={()=>goToSection('methodology')} className="hover:text-quanthos-lightViolet block">Methodology</button>
              <button onClick={()=>goToSection('talent')} className="hover:text-quanthos-lightViolet block">Talent Foundry</button>
              <button onClick={()=>goToSection('services')} className="hover:text-quanthos-lightViolet block">Services</button>
              <button onClick={()=>goToSection('portfolio')} className="hover:text-quanthos-lightViolet block">Portfolio</button>
              <button onClick={()=>navigateTo('insights')} className="hover:text-quanthos-lightViolet block">Insights</button>
              <button onClick={()=>navigateTo('contact')} className="hover:text-quanthos-lightViolet block">Contact Us</button>
            </div>
          </div>
          <div className="text-right">
            <img src={logo} alt="Quanthos" style={{ height: '9.375rem' }} className="ml-auto opacity-90 cursor-pointer" onClick={() => { window.location.href = '/'; window.location.reload(); }} />
              <div className="text-white/70 text-2xl mt-2" style={{ width: '20rem' }}>Growth Clinic and Talent Foundary</div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-4 text-center text-white/70 text-sm max-w-md mx-auto">
          © Quanthos. All rights reserved.
        </div>
      </footer>

      <button
        onClick={() => setIsChatOpen(prev => !prev)}
        className="fixed bottom-6 right-6 bg-quanthos-magenta text-white rounded-full px-5 py-3 shadow-xl hover:bg-[#d633f0] flex items-center gap-2"
      >
        <MessageCircle size={20} />
        Ask Quanthos
      </button>

      <div className={`${isChatOpen ? 'block' : 'hidden'} fixed bottom-24 right-6 w-[min(420px,90vw)] bg-white border border-gray-200 rounded-2xl shadow-2xl`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="font-semibold text-quanthos-dark">
            Quanthos AI Assistant
            {!isAssistantAvailable && <span className="ml-2 text-xs text-gray-500">(offline)</span>}
          </div>
          <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-quanthos-dark">
            <X size={18} />
          </button>
        </div>
        <div ref={chatRef} className="h-80 overflow-y-auto p-4 space-y-3">
          {chatMessages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`${m.role === 'user' ? 'bg-quanthos-magenta text-white' : 'bg-gray-100 text-quanthos-dark'} px-4 py-2 rounded-xl max-w-[75%] whitespace-pre-wrap`}>
                {m.text}
              </div>
            </div>
          ))}
          {isSending && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-quanthos-dark px-4 py-2 rounded-xl">
                Thinking...
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 p-3 border-t border-gray-100">
          <input
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about Quanthos services, methodology, training..."
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-quanthos-magenta"
          />
          <button
            onClick={handleSend}
            disabled={isSending || !isAssistantAvailable}
            className="bg-quanthos-magenta text-white rounded-xl px-3 py-2 hover:bg-[#d633f0] disabled:opacity-50 flex items-center gap-1"
          >
            <Send size={16} />
            Send
          </button>
        </div>
      </div>

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
