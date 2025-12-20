import { useState, useEffect, useRef } from 'react';
import { CheckCircle, GraduationCap, Users, TrendingUp, Star, Activity, Zap, MessageCircle, Send, X, Globe, Phone, Mail } from 'lucide-react';
import { content } from './data/content';
import { PopupModal } from 'react-calendly';
import Chatbot from './components/Chatbot';

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
  // decision tree implemented via classifyIntent + answerFaq
  function classifyIntent(input: string) {
    const txt = input.toLowerCase();
    const intents = [
      { id: 'services', keys: ['services','clinic','growth','عيادة','خدمات','النمو','ركائز'] },
      { id: 'returnship', keys: ['returnship','عودة','نساء','momken','seat','ممكن'] },
      { id: 'contact', keys: ['contact','phone','email','whatsapp','اتصل','هاتف','بريد','واتساب'] },
      { id: 'about', keys: ['about','quanthos','نبذة','عن','كوانثوس'] },
      { id: 'methodology', keys: ['methodology','diagnose','activate','منهجية','تشخيص','تفعيل'] },
      { id: 'portfolio', keys: ['portfolio','case','studies','محفظة','دراسات'] },
      { id: 'insights', keys: ['insight','insights','رؤى','أفكار'] },
      { id: 'booking', keys: ['book','consultation','calendly','احجز','استشارة'] },
    ];
    for (const it of intents) {
      if (it.keys.some(k => txt.includes(k))) return it.id;
    }
    return 'unknown';
  }
  const answerFaq = (input: string) => {
    const intent = classifyIntent(input);
    switch (intent) {
      case 'services': {
        const items = t.services.items.map(i => `• ${i.title}`).join('\n');
        return `${t.services.title}\n${t.services.subtitle}\n${items}`;
      }
      case 'returnship':
        return `${t.labels.returnshipTitle}\n${t.labels.returnshipDiscount}\n${t.labels.returnshipPitch}\n${t.labels.returnshipPrice}`;
      case 'contact':
        return `Egypt: +20 100 124 01 86\nEgypt: +20 100 900 94 82\nUAE: +971 52 281 8558\nEmail: osama_naguib@hotmail.com`;
      case 'about':
        return `${t.about.title}\n${t.about.overview}`;
      case 'methodology':
        return `${t.methodology.title}\n${t.methodology.description}`;
      case 'portfolio':
        return `${t.portfolio.title}\n${t.portfolio.subtitle}`;
      case 'insights':
        return `Insights cover diagnosis, leadership, AI in management, and financial analysis.`;
      case 'booking':
        return `Use "${t.nav.contact}" to open Calendly and schedule a session.`;
      default:
        return `Ask about ${t.services.title}, ${t.talentFoundry.title}, ${t.nav.contact}, or ${t.nav.insights}.`;
    }
  };

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
    "#QUANTHOS: Corporate Profile & Comprehensive Service Portfolio\n##1. Executive Overview\nQuanthos is a premier AI and Data Consultancy dedicated to bridging the critical gap between high-level data strategy and real-world business execution. In an era where businesses are drowning in data but starving for insights, Quanthos provides the missing link: Activation.\n\nWe distinguish ourselves from traditional consultancies by offering a full-stack solution. We do not simply deliver strategic reports and leave; we build the automated systems, engineer the workflows, and train the human talent required to turn those strategies into measurable competitive advantages.\n\nOur Mission: To transform raw data into a decisive engine for growth, efficiency, and market leadership.\nOur Tagline: Insight Diagnosed. Impact Engineered.\n\n##2. The \"Diagnose & Activate\" Methodology\nQuanthos was founded on a unique, dual-phased philosophy that combines scientific rigor with engineering precision. This methodology ensures that every technological investment yields a tangible business return.\n\n###Phase 1: The Diagnosis (The \"Quant\")\nLed by the principles of data science and precision analytics, we approach business challenges like a medical diagnosis. We do not guess; we analyze. By ingesting and modeling historical data, we identify the root causes of inefficiency, churn, or revenue loss. We move beyond \"what happened\" to determine \"why it happened\" and \"what will happen next.\"\n\n###Phase 2: The Activation (The \"Anthos\")\nLed by the principles of engineering and human behavioral psychology, we translate the diagnosis into action. This involves two distinct steps:\n\n1. System Engineering: Building the AI agents, automation workflows, and dashboards that fix the problem.\n2. Human Activation: Training the workforce with hands-on, role-specific skills to ensure they adopt the new tools and processes effectively.\n\n##3. Comprehensive Service Ecosystem\nOur services are organized into four interconnected pillars designed to modernize every aspect of the enterprise:\n\n###Pillar I: Data Strategy & Business Intelligence (The Single Source of Truth)\nQuanthos transforms fragmented data into a clear, actionable roadmap for the C-suite. We specialize in building the infrastructure required for high-stakes decision-making.\n- Predictive Sales & Demand Forecasting: Moving from reactive to proactive inventory and resource planning.\n- Executive Dashboards: Real-time visibility into KPIs across marketing, sales, and operations using Power BI or Tableau.\n- AI-Readiness Assessments: Evaluating data maturity to ensure a smooth transition into large-scale AI implementation.\n- Customer Segmentation & Clustering: Identifying high-value cohorts to optimize marketing spend.\n\n###Pillar II: AI Automation & Digital Workers (The Efficiency Architects)\nWe engineer the workflows that eliminate human error and free up high-value talent for strategic work.\n- Robotic Process Automation (RPA): Automating high-volume, repetitive tasks in finance, HR, and logistics.\n- Custom AI Agents & Web Scrapers: Building specialized digital workers that can research, synthesize, and report autonomously.\n- Workflow Orchestration: Integrating disparate systems (CRM, ERP, Slack) into a seamless, automated ecosystem.\n- Zero-Error Protocols: Implementing validation layers that ensure 100% data accuracy in automated processes.\n\n###Pillar III: Sales & Marketing Engineering (The Revenue Engine)\nQuanthos re-imagines the commercial landscape by applying engineering principles to customer acquisition and retention.\n- AI-Powered Lead Generation & Scoring: Identifying and qualifying prospects with machine-learning precision.\n- Hyper-Personalized Content Engines: Using LLMs to generate tailored communication at scale.\n- CRM Process Engineering: Redesigning sales pipelines to ensure no lead falls through the cracks.\n- Sentiment Analysis & NLP: Using natural language processing to diagnose churn risk before it happens.\n\n###Pillar IV: Corporate Training & Human Enablement (The Resilient Culture)\nWe believe that technology is only as effective as the people using it. We specialize in \"Activation Training\"—hands-on, role-specific enablement.\n- The \"AI Co-Pilot\" Program: Training employees to use Generative AI for personal productivity (writing, coding, research).\n- Role-Specific AI Workshops: Tailored sessions for HR, Finance, and Sales teams on using specialized AI tools.\n- Executive AI Strategy Briefings: Helping leadership teams understand the competitive landscape of AI.\n- Train-the-Trainer Modules: Building internal capacity to sustain technological adoption.\n\n##4. The Talent Foundry\nQuanthos serves as a bridge for the workforce of tomorrow. We are committed to social and economic impact through specialized enablement tracks:\n- The \"Returnship\" Program: A focused enablement track for women returning to work after a career break, providing AI upskilling and practical confidence-building.\n- Future Leaders Track: Helping fresh graduates bridge the gap between academic theory and the practical demands of the modern, AI-native job market.\n- Corporate Upskilling: Empowering existing professionals to master the tools of the future to remain competitive in their fields.\n\n##5. Why Quanthos?\nIn a market saturated with theoretical consultants, Quanthos is the \"Clinic of Growth.\" We don't just tell you what is wrong; we engineer the cure. We are the architects of the automated, data-driven, and human-empowered future of business.\n\nContact Information:\nEgypt: +20 100 124 01 86 | +20 100 900 94 82\nUAE: +971 52 281 8558\nEmail: osama_naguib@hotmail.com";

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
      const fallbackAssistant = (input: string) => answerFaq(input);
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
            <button onClick={() => goToSection('talent')} className="hover:text-quanthos-magenta transition-colors">{t.nav.talent}</button>
            <button onClick={() => goToSection('services')} className="hover:text-quanthos-magenta transition-colors">{t.nav.services}</button>
            <button onClick={() => goToSection('portfolio')} className="hover:text-quanthos-magenta transition-colors">{t.nav.portfolio}</button>
            <button onClick={() => navigateTo('insights')} className="hover:text-quanthos-magenta transition-colors">{t.nav.insights}</button>
            <button onClick={() => navigateTo('contact')} className="hover:text-quanthos-magenta transition-colors">{t.labels.footerContact}</button>
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
           <div className="absolute left-1/2 -translate-x-1/2 top-36 w-[420px] h-[420px] rounded-full blur-[100px] opacity-60 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(227,68,255,0.35), rgba(109,124,255,0.2))' }}></div>
           
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
          <p className="text-xl text-quanthos-panel/90 mb-12 max-w-2xl mx-auto leading-relaxed">{t.hero.sub}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
           <a onClick={() => goToSection('services')} className="px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl text-white cursor-pointer" style={{ backgroundColor: '#634e86' }}>
              {t.hero.cta_primary}
            </a>
            <a onClick={() => goToSection('talent')} className="px-8 py-4 rounded-xl font-bold transition-all shadow-xl text-white cursor-pointer" style={{ backgroundColor: '#634e86' }}>
              {t.hero.cta_secondary}
            </a>
          </div>
           {showReturnship && (
            <div className="fixed top-28 right-6 z-40 bg-quanthos-magenta text-white px-6 py-5 rounded-2xl shadow-xl max-w-sm text-center scale-[0.85]">
              <button aria-label="Close" className="absolute top-2 right-2 text-white/80 hover:text-white" onClick={() => setShowReturnship(false)}>✕</button>
              <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-40 h-40 rounded-full blur-2xl opacity-60 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.2), rgba(227,68,255,0.1))' }}></div>
                <div className="font-bold mb-1">{t.labels.returnshipTitle}</div>
              </div>
              {t.labels.returnshipAdImageUrl ? (
                <img src={t.labels.returnshipAdImageUrl} alt="Returnship Program Offer" className="mt-3 rounded-xl w-full h-auto border border-white/20" />
              ) : (
                <>
                  <div className="text-sm">{t.labels.returnshipDiscount}</div>
                  <div className="mt-3 rounded-xl px-4 py-3 bg-white/10 border border-white/20">
                    <div className="text-sm font-semibold">{t.labels.returnshipPitch}</div>
                    <div className="text-sm mt-2">{t.labels.returnshipPrice}</div>
                  </div>
                </>
              )}
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSe1o7xImAP_qllI2b-ce8dKItamsT6wMGNTNcOOwcn7ixuFPQ/viewform?usp=dialog" className="mt-3 inline-block bg-white text-quanthos-magenta font-bold px-3 py-2 rounded-xl" target="_blank" rel="noopener noreferrer">
                {t.labels.secureSeat}
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
            <span className="text-quanthos-magenta font-bold tracking-wider uppercase text-sm">{t.labels.empowerment}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-quanthos-dark">{t.talentFoundry.title}</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{t.talentFoundry.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {t.talentFoundry.segments.map((seg, idx) => (
              <div key={idx} id={idx === 0 ? 'returnship' : undefined} className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-quanthos-magenta hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
                <div className="w-14 h-14 bg-quanthos-lightViolet/20 rounded-2xl flex items-center justify-center text-quanthos-dark mb-6">
                  {idx === 0 && <Users size={28} />}
                  {idx === 1 && <GraduationCap size={28} />}
                  {idx === 2 && <TrendingUp size={28} />}
                </div>
                <h3 className="text-xl font-bold text-quanthos-dark mb-2">{seg.title}</h3>
                <p className="text-sm font-semibold text-quanthos-magenta mb-4">{seg.target}</p>
                <p className="text-gray-600 leading-relaxed text-sm">{seg.desc}</p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSe1o7xImAP_qllI2b-ce8dKItamsT6wMGNTNcOOwcn7ixuFPQ/viewform?usp=dialog" className="mt-auto mx-auto inline-block px-4 py-2 rounded-lg text-white font-semibold" style={{ backgroundColor: '#634e86' }}>
                  {t.labels.joinNow}
                </a>
              </div>
            ))}
          </div>

          {/* Success Stories */}
          <div className="bg-quanthos-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-quanthos-magenta/10 to-transparent"></div>
            <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2 relative z-0">
              <Star className="text-quanthos-magenta fill-quanthos-magenta" /> {t.labels.successTitle}
            </h3>
            <div className="grid md:grid-cols-2 gap-8 relative z-0">
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

      <section id="portfolio" className="py-24 px-6 bg-quanthos-dark text-white relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-quanthos-dark via-quanthos-dark to-[#2a1b4a]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4">{t.portfolio.title}</h2>
                  <p className="text-quanthos-lightViolet">{t.portfolio.subtitle}</p>
                  <div className="mt-6">
                    <a href="Quanthos Portfolio.pdf" target="_blank" className="inline-block px-6 py-3 bg-quanthos-magenta text-white rounded-xl font-bold shadow-xl">
                      {t.portfolio.download}
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
          <h2 className="text-2xl font-bold text-quanthos-dark mb-8">{t.labels.collaborators}</h2>
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
          <section id="methodology-about" className="py-24 px-6 bg-white relative">
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
          <section className="py-16 px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold text-quanthos-dark">{t.team.title}</h2>
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.nav.insights}</h1>
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.labels.footerContact}</h1>
              <p className="text-quanthos-lightViolet">{t.contact.subtitle}</p>
            </div>
          </section>
          <section className="py-16 px-6 bg-white">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-quanthos-panel">
                <div className="font-semibold text-quanthos-dark mb-1">{t.labels.countryEgypt}</div>
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
                <div className="font-semibold text-quanthos-dark mb-1">{t.labels.countryUAE}</div>
                <div className="flex items-center gap-3 font-semibold text-quanthos-dark mb-2"><Phone size={18} /> +971 52 281 8558</div>
                <a href="https://wa.me/971522818558" className="inline-flex items-center gap-2 text-green-600 font-medium" aria-label="WhatsApp">
                  <WhatsAppIcon size={20} className="text-green-600" />
                </a>
              </div>
              <div className="p-6 rounded-2xl bg-quanthos-panel md:col-span-3">
                <div className="flex items-center gap-3 font-semibold text-quanthos-dark"><Mail size={18} /> osama_naguib@hotmail.com</div>
                <div className="flex items-center gap-3 font-semibold text-quanthos-dark"><Mail size={18} /> ahmedamrousy@gmail.com</div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="text-white py-16 bg-[#493570]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold mb-3">{t.labels.footerContact}</h4>
            <div className="text-white/80 text-sm space-y-2">
              <div className="font-semibold">{t.labels.countryEgypt}</div>
              <div className="flex items-center gap-2"><Phone size={14} /> +20 100 124 01 86 <a href="https://wa.me/201001240186" className="inline-flex items-center ml-2 text-green-500"><WhatsAppIcon size={18} className="text-green-500" /></a></div>
              <div className="flex items-center gap-2"><Phone size={14} /> +20 100 900 94 82 <a href="https://wa.me/201009009482" className="inline-flex items-center ml-2 text-green-500"><WhatsAppIcon size={18} className="text-green-500" /></a></div>
              <div className="font-semibold mt-2">{t.labels.countryUAE}</div>
              <div className="flex items-center gap-2"><Phone size={14} /> +971 52 281 8558 <a href="https://wa.me/971522818558" className="inline-flex items-center ml-2 text-green-500"><WhatsAppIcon size={18} className="text-green-500" /></a></div>
              <div className="flex items-center gap-2 mt-2"><Mail size={14} /> osama_naguib@hotmail.com</div>
              <div className="flex items-center gap-2 mt-2"><Mail size={14} /> ahmedamrousy@gmail.com</div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3">{t.labels.footerQuickLinks}</h4>
            <div className="text-white/80 text-sm space-y-2">
              <button onClick={()=>navigateTo('about')} className="hover:text-quanthos-lightViolet block">{t.nav.about}</button>
              <button onClick={()=>goToSection('methodology')} className="hover:text-quanthos-lightViolet block">{t.nav.methodology}</button>
              <button onClick={()=>goToSection('talent')} className="hover:text-quanthos-lightViolet block">{t.nav.talent}</button>
              <button onClick={()=>goToSection('services')} className="hover:text-quanthos-lightViolet block">{t.nav.services}</button>
              <button onClick={()=>goToSection('portfolio')} className="hover:text-quanthos-lightViolet block">{t.nav.portfolio}</button>
              <button onClick={()=>navigateTo('insights')} className="hover:text-quanthos-lightViolet block">{t.nav.insights}</button>
              <button onClick={()=>navigateTo('contact')} className="hover:text-quanthos-lightViolet block">{t.labels.footerContact}</button>
            </div>
          </div>
          <div className="text-right">
            <img src={logo} alt="Quanthos" style={{ height: '9.375rem' }} className="ml-auto opacity-90 cursor-pointer" onClick={() => { window.location.href = '/'; window.location.reload(); }} />
            <div className="text-white/70 text-[150%] mt-2" style={{ width: '20rem' }}>{t.labels.footerTagline}</div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-4 text-center text-white/70 text-sm max-w-md mx-auto">
          {t.labels.copyright}
        </div>
      </footer>

      <button
        onClick={() => setIsChatOpen(prev => !prev)}
        className="fixed bottom-6 right-6 bg-quanthos-magenta text-white rounded-full px-5 py-3 shadow-xl hover:bg-[#d633f0] flex items-center gap-2 z-[9999]"
      >
        <MessageCircle size={20} />
        {t.labels.askQuanthos}
      </button>

      <div className={`${isChatOpen ? 'block' : 'hidden'} fixed bottom-24 right-6 w-[min(420px,90vw)] bg-white border border-gray-200 rounded-2xl shadow-2xl z-[9999]`}>
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

      <Chatbot />
    </div>
  );
}

export default App;
