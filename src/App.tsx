import { useEffect, useRef, useState } from 'react';
import { CheckCircle, GraduationCap, Users, TrendingUp, Star, Activity, Zap, Globe, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, ArrowRight, ChevronDown, ChevronRight, Clock, Award, BookOpen, Layout, PlayCircle, FileText, Check, Quote } from 'lucide-react';
import { content } from './data/content';
import { PopupModal } from 'react-calendly';
import Chatbot from './components/Chatbot';

type Page = 'home' | 'insights' | 'about' | 'contact' | 'senior-ai-edge';

function trackMetaEvent(eventName: string, parameters?: Record<string, unknown>) {
  window.fbq?.('track', eventName, parameters);
}

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

function SeniorAIEdgePage({ goToSection }: { goToSection: (id: string) => void }) {
  const [openDay, setOpenDay] = useState<number | null>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const days = [
    {
      number: 1,
      title: "The Strategic Diagnosis",
      subtitle: "Day 1: AI Foundations & The 'Diagnose' Framework",
      topics: [
        "The Executive AI Briefing: What is hype vs. what is profit.",
        "Generative AI Landscape: LLMs, Midjourney, and the Agent ecosystem.",
        "The Quanthos 'Diagnose' Method: Identifying the high-value AI opportunities in your workflow.",
        "Security & Ethics for Leaders: Protecting proprietary data in the age of open AI."
      ]
    },
    {
      number: 2,
      title: "The Precision Multiplier",
      subtitle: "Day 2: Prompt Engineering for Professional Standards",
      topics: [
        "Beyond Chatting: Mastering the syntax of professional-grade outputs.",
        "The Personal Prompt Library: Building your own repository of high-impact tools.",
        "Domain-Specific AI: Custom workflows for your specific field (Finance, Strategy, Ops).",
        "Role-Playing AI Agents: How to use AI as a strategic sparring partner."
      ]
    },
    {
      number: 3,
      title: "The Activation Engine",
      subtitle: "Day 3: Building Your 90-Day Implementation Plan",
      topics: [
        "Hands-On Lab: Building a live AI solution for a real task you currently do.",
        "The 90-Day Roadmap Workshop: What to automate first, and how.",
        "Team Activation: How to onboard your staff and lead an AI-native department.",
        "Beyond Text: Audio, Video, and Multimodal AI for senior communication."
      ]
    }
  ];

  const deliverables = [
    { icon: <Clock size={32} />, title: "21 Hours of Intensive Training", body: "3 full days of in-person or live-online training. Not a high-level overview — a deep dive into practical application.", color: "#0891B2" },
    { icon: <BookOpen size={32} />, title: "Personal AI Prompt Library", body: "20 custom-built, professional-grade prompts tailored to your specific role and industry. No generic inputs.", color: "#C026D3" },
    { icon: <FileText size={32} />, title: "Your 90-Day AI Integration Plan", body: "A written plan built during Day 3 mapping which tools you will use, for which tasks, in which sequence. Specific and actionable — not aspirational.", color: "#F59E0B" },
    { icon: <PlayCircle size={32} />, title: "Session Video Recordings", body: "All 21 hours recorded. Revisit any session, share with a colleague, or use to onboard a team member when you return to the office.", color: "#059669" },
    { icon: <Layout size={32} />, title: "Printed Reference Cards", body: "Quick-reference prompt cards and workflow cheat sheets. Designed to stay on your desk, not in a folder.", color: "#7C3AED" },
    { icon: <Award size={32} />, title: "Completion Certificate + 30-Day Access", body: "Formal AI Foundations certification — suitable for LinkedIn and your CV. Plus 30 days of post-program WhatsApp and email access to your trainer.", color: "#EF4444" }
  ];

  const methods = [
    { icon: <GraduationCap size={32} />, title: "Instructor-Led Sessions", body: "Expert trainers who work in your professional world — not academics who study AI from the outside.", color: "#7C3AED" },
    { icon: <Activity size={32} />, title: "Live Demonstrations", body: "Every tool shown on screen in real time, on real professional scenarios. Nothing is theoretical.", color: "#0891B2" },
    { icon: <Zap size={32} />, title: "Hands-On Lab Exercises", body: "You work on your own documents, your own problems, your own professional language — not dummy data.", color: "#C026D3" },
    { icon: <Users size={32} />, title: "Peer Discussion", body: "Small group of maximum 15 means real conversation among professionals at the same level. Not passive attendance.", color: "#059669" },
    { icon: <TrendingUp size={32} />, title: "Individual Coaching Moments", body: "Trainers move around the room during lab sessions. Your specific situation gets addressed — not just the general case.", color: "#F59E0B" },
    { icon: <FileText size={32} />, title: "The 90-Day Plan Workshop", body: "You do not leave with an idea. You leave with a document. Built during the session, reviewed by your trainer.", color: "#EF4444" }
  ];

  const faqs = [
    { q: "I am not technical at all. Will I be lost?", a: "No. This program was specifically designed for professionals with zero technical background. No coding. No IT knowledge. If you can write a professional email, you have all the technical skills this program requires." },
    { q: "I have heard AI is replacing senior professionals. Is that true?", a: "AI is replacing the execution parts of professional work — the drafting, the formatting, the summarising, the repetitive analysis. It is not replacing judgment, relationships, domain expertise, or strategic thinking. Those are exactly what you have built over your career. This program helps you keep the irreplaceable parts and hand off the rest." },
    { q: "I tried ChatGPT and it gave me shallow, generic answers. Is this just more of that?", a: "What you experienced is the output of a basic prompt. The entire point of this program is to teach you how to get professional-grade outputs that match your standard. The difference between a generic result and a genuinely useful one is almost entirely in how you ask. You will not leave here asking basic questions." },
    { q: "Is this relevant to my specific field?", a: "Day 2 includes a session specifically on your domain. The program has been run with professionals in finance, legal, healthcare administration, publishing, engineering management, logistics, education, and consulting. The core methods transfer across every professional field." },
    { q: "What if I fall behind during the sessions?", a: "The group cap of 15 exists precisely for this reason. Trainers notice and respond. Video recordings mean nothing is lost if you need to revisit. And 30-day post-program trainer access means your questions do not stop on the last day." },
    { q: "Can my company send a group of senior professionals?", a: "Yes. For groups of 5 or more from the same organisation, we build a customised version using company-specific scenarios and materials. Contact us directly for a proposal — we will respond within 24 hours." }
  ];

  return (
    <div className="pt-20">
      {/* SECTION 1 - HERO */}
      <section className="relative py-24 px-6 bg-[#0D1137] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1137] via-[#1A0A2E] to-[#0D1137]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full bg-[#C026D3]/10 text-[#C026D3] font-bold text-xs tracking-[3px] mb-6 border border-[#C026D3]/20 uppercase">
              THE SENIOR AI EDGE
            </span>
            <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-[1.1] font-serif">
              Augment Your Experience.<br />Don't Replace It.
            </h1>
            <p className="text-xl md:text-2xl text-[#94A3B8] mb-12 max-w-2xl mx-auto leading-relaxed">
              A 3-day AI foundations program for professionals with 15+ years of experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button onClick={() => goToSection('registration')} className="px-8 py-4 bg-[#C026D3] hover:bg-[#9B1AB0] text-white rounded-xl font-bold transition-all shadow-xl shadow-[#C026D3]/20">
                Reserve Your Seat
              </button>
              <button onClick={() => goToSection('structure')} className="px-8 py-4 border-2 border-[#C026D3] text-[#C026D3] hover:bg-[#C026D3]/5 rounded-xl font-bold transition-all">
                View Curriculum
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - WHO THIS IS FOR */}
      <section className="py-24 px-6 bg-[#F0F4F8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C026D3] text-xs font-bold tracking-[3px] uppercase">WHO THIS IS FOR</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[#1E293B]">Built for Experienced Minds</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "The Senior Leader", desc: "Directors, VPs, and C-Suite executives who need to understand AI's strategic impact without becoming coders." },
              { title: "The Specialist Expert", desc: "Senior consultants, lawyers, doctors, and engineers whose expertise is their product — and who want to multiply it." },
              { title: "The Strategic Consultant", desc: "Experienced advisors who need to integrate AI into their client deliverables to stay competitive." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 rounded-2xl shadow-sm border-l-4 border-[#C026D3]">
                <h3 className="text-xl font-bold text-[#1E293B] mb-4">{item.title}</h3>
                <p className="text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - CORE IDEA */}
      <section className="py-24 px-6 bg-[#060B24] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
            Experience is your unfair advantage.<br />
            <span className="text-[#C026D3]">AI is your multiplier.</span>
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed">
            The Senior AI Edge isn't about learning a new hobby. It's about teaching you to use AI to do the work you already do — but 10x faster, with 100% accuracy, and with zero manual repetition.
          </p>
        </div>
      </section>

      {/* SECTION 4 - STRUCTURE */}
      <section id="structure" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C026D3] text-xs font-bold tracking-[3px] uppercase">PROGRAM STRUCTURE</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[#1E293B]">3 Days of Intensive Transformation</h2>
          </div>
          
          <div className="space-y-4">
            {days.map((day) => (
              <div key={day.number} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all">
                <button 
                  onClick={() => setOpenDay(openDay === day.number ? null : day.number)}
                  className={`w-full flex items-center justify-between p-6 text-left transition-colors ${openDay === day.number ? 'bg-[#C026D3] text-white' : 'bg-white text-[#1E293B] hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-4xl font-bold opacity-30 ${openDay === day.number ? 'text-white' : 'text-[#C026D3]'}`}>0{day.number}</span>
                    <span className="text-xl font-bold">{day.title}</span>
                  </div>
                  {openDay === day.number ? <ChevronDown /> : <ChevronRight />}
                </button>
                {openDay === day.number && (
                  <div className="p-8 bg-gray-50">
                    <h4 className="font-bold text-[#1E293B] mb-6 text-lg">{day.subtitle}</h4>
                    <ul className="space-y-4">
                      {day.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C026D3] shrink-0"></div>
                          <span className="text-[#64748B] leading-relaxed">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - DELIVERABLES */}
      <section className="py-24 px-6 bg-[#060B24] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C026D3] text-xs font-bold tracking-[3px] uppercase">WHAT YOU LEAVE WITH</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Program Deliverables</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deliverables.map((item, idx) => (
              <div key={idx} className="bg-[#0D1B3E] p-8 rounded-2xl border border-white/5 hover:border-[#C026D3]/30 transition-all group" style={{ borderLeft: `4px solid ${item.color}` }}>
                <div className="mb-6" style={{ color: item.color }}>{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - METHODOLOGY */}
      <section className="py-24 px-6 bg-[#F0F4F8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C026D3] text-xs font-bold tracking-[3px] uppercase">HOW IT WORKS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[#1E293B] leading-tight">
              This Is Not a Lecture Series.<br />It Is a Professional Workshop.
            </h2>
            
            <div className="max-w-3xl mx-auto mt-12">
              <div className="w-full h-[72px] rounded-xl overflow-hidden flex shadow-lg">
                <div className="w-[20%] bg-[#7C3AED] flex items-center justify-center text-white font-bold text-sm md:text-base">20% Instruction</div>
                <div className="w-[80%] bg-[#C026D3] flex items-center justify-center text-white font-bold text-sm md:text-base">80% Hands-On Application</div>
              </div>
              <p className="mt-4 text-[#64748B] text-sm">Every concept is introduced, then immediately applied to your own professional material.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {methods.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border-l-4 group transition-all" style={{ borderColor: item.color }}>
                <div className="mb-6" style={{ color: item.color }}>{item.icon}</div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-4">{item.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - INSTRUCTORS */}
      <section className="py-24 px-6 bg-[#0D1137] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[#C026D3] text-xs font-bold tracking-[3px] uppercase">YOUR INSTRUCTORS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Who Teaches This</h2>
            <p className="text-[#94A3B8] mt-4 max-w-xl">
              2 domain experts. One from engineering and AI business. One from strategy and data science. Both active practitioners — nothing they teach is theoretical.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Dr. Amrousy */}
            <div className="bg-[#0D1B3E] p-10 rounded-2xl border border-white/10 shadow-xl border-l-4 border-[#0891B2]">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-[#0891B2]/15 border-2 border-[#0891B2] flex items-center justify-center text-[#0891B2] text-2xl font-bold">AA</div>
                <div>
                  <h3 className="text-2xl font-bold">Dr. Ahmed Amrousy</h3>
                  <p className="text-[#0891B2] text-sm font-semibold uppercase tracking-wider">AI Business Expert · Lead Instructor</p>
                </div>
              </div>
              <div className="h-px bg-[#0891B2]/30 mb-8"></div>
              <ul className="space-y-3">
                {[
                  "AI Business Expert with 25+ Years of Experience",
                  "MBA · DBA (Ongoing)",
                  "AUC Executive Education Instructor",
                  "Mechatronics Engineer",
                  "National TV Guest Expert on AI for Business"
                ].map((cred, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#94A3B8] text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#0891B2]"></div>
                    {cred}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dr. Osama */}
            <div className="bg-[#0D1B3E] p-10 rounded-2xl border border-white/10 shadow-xl border-l-4 border-[#C026D3]">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-[#C026D3]/15 border-2 border-[#C026D3] flex items-center justify-center text-[#C026D3] text-2xl font-bold">ON</div>
                <div>
                  <h3 className="text-2xl font-bold">Dr. Osama M. Naguib</h3>
                  <p className="text-[#C026D3] text-sm font-semibold uppercase tracking-wider">Strategy, BI & Data Science Expert</p>
                </div>
              </div>
              <div className="h-px bg-[#C026D3]/30 mb-8"></div>
              <ul className="space-y-3">
                {[
                  "Strategy & BI Leader with 23+ Years of Experience",
                  "International MBA · ML & Data Analysis Nanodegrees",
                  "Certified MS Power BI Engineer",
                  "BScPhm · TOT Certified — Azure AI",
                  "Former Head of Strategy & BI — Nahdet Misr Publishing Group"
                ].map((cred, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#94A3B8] text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#C026D3]"></div>
                    {cred}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 p-8 md:p-12 bg-[#C026D3]/10 border border-[#C026D3]/30 rounded-2xl relative overflow-hidden">
            <Quote className="absolute top-6 left-6 text-[#C026D3]/20 w-24 h-24" />
            <div className="relative z-10">
              <p className="text-xl md:text-2xl italic font-serif leading-relaxed mb-6">
                "The professionals in this room are not beginners. We build every session around the depth they already carry — and teach them to multiply it."
              </p>
              <p className="text-[#94A3B8] text-sm font-semibold">— Dr. Ahmed Amrousy</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 - INVESTMENT */}
      <section className="py-24 px-6 bg-[#F0F4F8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C026D3] text-xs font-bold tracking-[3px] uppercase">PROGRAM FEES</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[#1E293B]">Your Investment</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Card 1 - Individual */}
            <div className="bg-[#0D1137] text-white p-10 rounded-2xl shadow-2xl border-2 border-[#C026D3] relative transform md:scale-105 z-10 flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C026D3] text-white text-[10px] font-bold tracking-[2px] px-4 py-1.5 rounded-full uppercase">MOST POPULAR</div>
              <h3 className="text-2xl font-bold mb-1">Individual Enrollment</h3>
              <p className="text-[#94A3B8] text-sm mb-8">Open cohort</p>
              
              <div className="mb-8">
                <span className="text-[#64748B] text-lg line-through block">EGP 6,000</span>
                <span className="text-[#C026D3] text-5xl font-bold block mt-1">EGP 5,500</span>
                <span className="text-[#94A3B8] text-xs mt-2 block">Early Registration Price</span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "All 3 days (21 hours)",
                  "Digital training materials",
                  "Personal prompt library (20 prompts)",
                  "90-day integration plan",
                  "Video recordings of all sessions",
                  "Completion certificate",
                  "30-day post-program trainer access"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check size={18} className="text-[#C026D3] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button onClick={() => goToSection('registration')} className="w-full py-4 bg-[#C026D3] hover:bg-[#9B1AB0] text-white rounded-xl font-bold transition-all">
                Reserve Your Seat
              </button>
            </div>

            {/* Card 2 - Corporate */}
            <div className="bg-white p-10 rounded-2xl border border-gray-200 flex flex-col">
              <h3 className="text-2xl font-bold text-[#1E293B] mb-1">Corporate Group</h3>
              <p className="text-[#64748B] text-sm mb-8">5 to 10 participants from the same organization</p>
              
              <div className="mb-8">
                <span className="text-[#1E293B] text-3xl font-bold block">Custom Pricing</span>
                <span className="text-[#64748B] text-xs mt-2 block">Contact us for a group proposal</span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "All individual enrollment inclusions",
                  "Company-specific scenarios and materials",
                  "Private cohort — your team only",
                  "Flexible scheduling",
                  "Custom domain focus for your industry"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#64748B]">
                    <Check size={18} className="text-[#C026D3] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button onClick={() => goToSection('registration')} className="w-full py-4 border-2 border-[#C026D3] text-[#C026D3] hover:bg-[#C026D3]/5 rounded-xl font-bold transition-all">
                Request a Group Proposal
              </button>
            </div>

            {/* Card 3 - In-House */}
            <div className="bg-white p-10 rounded-2xl border border-gray-200 flex flex-col">
              <h3 className="text-2xl font-bold text-[#1E293B] mb-1">Private In-House</h3>
              <p className="text-[#64748B] text-sm mb-8">Your organization, your schedule, your content</p>
              
              <div className="mb-8">
                <span className="text-[#1E293B] text-3xl font-bold block">Custom Proposal</span>
                <span className="text-[#64748B] text-xs mt-2 block">Built around your industry and team</span>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "All individual enrollment inclusions",
                  "Fully customized curriculum",
                  "Delivered at your offices",
                  "Your own internal case studies used",
                  "Up to 20 participants"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#64748B]">
                    <Check size={18} className="text-[#C026D3] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button onClick={() => goToSection('registration')} className="w-full py-4 border-2 border-[#C026D3] text-[#C026D3] hover:bg-[#C026D3]/5 rounded-xl font-bold transition-all">
                Request a Custom Proposal
              </button>
            </div>
          </div>

          <div className="mt-16 max-w-2xl mx-auto text-center space-y-4">
            <p className="text-[#64748B] text-sm leading-relaxed">
              What is included in all programs: All sessions, digital materials, personal prompt library, 90-day integration plan, video recordings, completion certificate, and 30-day post-program trainer access.
            </p>
            <p className="text-[#64748B] text-sm leading-relaxed font-semibold">
              What is not included: Software subscriptions. Most tools used in this program have free tiers sufficient for the full 3 days.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9 - FAQ */}
      <section className="py-24 px-6 bg-[#060B24] text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C026D3] text-xs font-bold tracking-[3px] uppercase">COMMON QUESTIONS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`bg-[#0D1B3E] rounded-xl overflow-hidden border border-white/5 transition-all ${openFaq === idx ? 'border-l-[3px] border-l-[#C026D3]' : ''}`}>
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold">{faq.q}</span>
                  <ChevronDown className={`transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-[#94A3B8] text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 - REGISTRATION */}
      <section id="registration" className="py-24 px-6 bg-[#0D1137] text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-11 gap-16 items-start">
          <div className="lg:col-span-6">
            <span className="text-[#C026D3] text-xs font-bold tracking-[3px] uppercase">NEXT COHORT</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-8 leading-tight">You Have Too Much to Offer to Stand Still.</h2>
            <div className="space-y-6 text-[#94A3B8] text-lg leading-relaxed">
              <p>The professionals who will define the next 10 years are not the youngest in the room. They are the most experienced ones who chose to add AI to what they already know.</p>
              <p>That combination — deep expertise multiplied by AI capability — is the most powerful professional profile in the market right now.</p>
              <p className="font-bold text-white italic">And almost nobody holds it yet.</p>
            </div>

            <div className="mt-12 space-y-6">
              {[
                { icon: "📅", text: "Next cohort date: [Coming Soon — register interest below]", color: "white" },
                { icon: "📍", text: "Location: Cairo, Egypt · In-person or live online", color: "white" },
                { icon: "👥", text: "Group size: Maximum 15 participants", color: "white" },
                { icon: "💰", text: "Early registration fee: EGP 5,500", color: "#C026D3", bold: true }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-base" style={{ color: item.color, fontWeight: item.bold ? 'bold' : 'normal' }}>
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#0D1B3E] p-8 md:p-10 rounded-2xl border border-[#C026D3]/40 shadow-2xl shadow-[#C026D3]/10">
              <h3 className="text-2xl font-bold mb-2">Reserve Your Seat</h3>
              <p className="text-[#94A3B8] text-sm mb-8">Fill in your details and we will contact you within 24 hours to confirm your enrollment.</p>
              
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  trackMetaEvent('Lead', { content_name: 'Senior AI Edge registration' });
                }}
              >
                <div>
                  <input type="text" placeholder="Your full name" required className="w-full bg-[#0D1137] border border-white/15 rounded-xl px-5 py-4 focus:outline-none focus:border-[#C026D3] transition-colors" />
                </div>
                <div>
                  <input type="text" placeholder="Finance Director, VP Operations..." required className="w-full bg-[#0D1137] border border-white/15 rounded-xl px-5 py-4 focus:outline-none focus:border-[#C026D3] transition-colors" />
                </div>
                <div>
                  <select required className="w-full bg-[#0D1137] border border-white/15 rounded-xl px-5 py-4 focus:outline-none focus:border-[#C026D3] transition-colors text-white">
                    <option value="">Years of Experience</option>
                    <option value="15-20">15–20 years</option>
                    <option value="21-25">21–25 years</option>
                    <option value="26-30">26–30 years</option>
                    <option value="30+">30+ years</option>
                  </select>
                </div>
                <div>
                  <input type="text" placeholder="Your organization (optional)" className="w-full bg-[#0D1137] border border-white/15 rounded-xl px-5 py-4 focus:outline-none focus:border-[#C026D3] transition-colors" />
                </div>
                <div>
                  <input type="email" placeholder="Your professional email" required className="w-full bg-[#0D1137] border border-white/15 rounded-xl px-5 py-4 focus:outline-none focus:border-[#C026D3] transition-colors" />
                </div>
                <div>
                  <input type="tel" placeholder="Your phone or WhatsApp number" required className="w-full bg-[#0D1137] border border-white/15 rounded-xl px-5 py-4 focus:outline-none focus:border-[#C026D3] transition-colors" />
                </div>
                <div>
                  <select className="w-full bg-[#0D1137] border border-white/15 rounded-xl px-5 py-4 focus:outline-none focus:border-[#C026D3] transition-colors text-white">
                    <option value="">How did you hear about us?</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Colleague">A colleague</option>
                    <option value="Google">Google Search</option>
                    <option value="Newsletter">Quanthos newsletter</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <textarea rows={3} placeholder="Anything you want us to know before we call" className="w-full bg-[#0D1137] border border-white/15 rounded-xl px-5 py-4 focus:outline-none focus:border-[#C026D3] transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-[#C026D3] hover:bg-[#9B1AB0] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 group">
                  Send My Registration Interest <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
              <p className="mt-4 text-[#64748B] text-[11px] text-center">Your information is never shared. We will contact you by phone or WhatsApp within 24 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11 - FOOTER NOTE */}
      <section className="py-12 px-6 bg-[#060B24] border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#64748B] text-sm leading-relaxed italic">
            A note on programs: The AI Returnship Program — for women returning to work — continues to run as a separate track. The Senior AI Edge is a distinct cohort designed for professionals 15+ years into their careers who are looking for a peer group at their level. Both programs carry the same quality standard.
          </p>
          <div className="mt-8 h-px bg-white/5 w-full"></div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [page, setPage] = useState<Page>('home');
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [showReturnship, setShowReturnship] = useState(true);
  const hasTrackedInitialPageView = useRef(false);

  const t = content[lang];
  const isRTL = lang === 'ar';
  const toggleLang = () => setLang(prev => (prev === 'en' ? 'ar' : 'en'));

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
      const hash = window.location.hash.replace('#', '');
      const nextPage: Page = ['insights', 'about', 'contact', 'senior-ai-edge'].includes(hash)
        ? (hash as Page)
        : 'home';
      setPage(nextPage);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    if (!hasTrackedInitialPageView.current) {
      hasTrackedInitialPageView.current = true;
      return;
    }
    trackMetaEvent('PageView', { page });
  }, [page]);

  if (page === 'senior-ai-edge') {
    return <SeniorAIEdgePage goToSection={goToSection} />;
  }

    "#QUANTHOS: Corporate Profile & Comprehensive Service Portfolio\n##1. Executive Overview\nQuanthos is a premier AI and Data Consultancy dedicated to bridging the critical gap between high-level data strategy and real-world business execution. In an era where businesses are drowning in data but starving for insights, Quanthos provides the missing link: Activation.\n\nWe distinguish ourselves from traditional consultancies by offering a full-stack solution. We do not simply deliver strategic reports and leave; we build the automated systems, engineer the workflows, and train the human talent required to turn those strategies into measurable competitive advantages.\n\nOur Mission: To transform raw data into a decisive engine for growth, efficiency, and market leadership.\nOur Tagline: Insight Diagnosed. Impact Engineered.\n\n##2. The \"Diagnose & Activate\" Methodology\nQuanthos was founded on a unique, dual-phased philosophy that combines scientific rigor with engineering precision. This methodology ensures that every technological investment yields a tangible business return.\n\n###Phase 1: The Diagnosis (The \"Quant\")\nLed by the principles of data science and precision analytics, we approach business challenges like a medical diagnosis. We do not guess; we analyze. By ingesting and modeling historical data, we identify the root causes of inefficiency, churn, or revenue loss. We move beyond \"what happened\" to determine \"why it happened\" and \"what will happen next.\"\n\n###Phase 2: The Activation (The \"Anthos\")\nLed by the principles of engineering and human behavioral psychology, we translate the diagnosis into action. This involves two distinct steps:\n\n1. System Engineering: Building the AI agents, automation workflows, and dashboards that fix the problem.\n2. Human Activation: Training the workforce with hands-on, role-specific skills to ensure they adopt the new tools and processes effectively.\n\n##3. Comprehensive Service Ecosystem\nOur services are organized into four interconnected pillars designed to modernize every aspect of the enterprise:\n\n###Pillar I: Data Strategy & Business Intelligence (The Single Source of Truth)\nQuanthos transforms fragmented data into a clear, actionable roadmap for the C-suite. We specialize in building the infrastructure required for high-stakes decision-making.\n- Predictive Sales & Demand Forecasting: Moving from reactive to proactive inventory and resource planning.\n- Executive Dashboards: Real-time visibility into KPIs across marketing, sales, and operations using Power BI or Tableau.\n- AI-Readiness Assessments: Evaluating data maturity to ensure a smooth transition into large-scale AI implementation.\n- Customer Segmentation & Clustering: Identifying high-value cohorts to optimize marketing spend.\n\n###Pillar II: AI Automation & Digital Workers (The Efficiency Architects)\nWe engineer the workflows that eliminate human error and free up high-value talent for strategic work.\n- Robotic Process Automation (RPA): Automating high-volume, repetitive tasks in finance, HR, and logistics.\n- Custom AI Agents & Web Scrapers: Building specialized digital workers that can research, synthesize, and report autonomously.\n- Workflow Orchestration: Integrating disparate systems (CRM, ERP, Slack) into a seamless, automated ecosystem.\n- Zero-Error Protocols: Implementing validation layers that ensure 100% data accuracy in automated processes.\n\n###Pillar III: Sales & Marketing Engineering (The Revenue Engine)\nQuanthos re-imagines the commercial landscape by applying engineering principles to customer acquisition and retention.\n- AI-Powered Lead Generation & Scoring: Identifying and qualifying prospects with machine-learning precision.\n- Hyper-Personalized Content Engines: Using LLMs to generate tailored communication at scale.\n- CRM Process Engineering: Redesigning sales pipelines to ensure no lead falls through the cracks.\n- Sentiment Analysis & NLP: Using natural language processing to diagnose churn risk before it happens.\n\n###Pillar IV: Corporate Training & Human Enablement (The Resilient Culture)\nWe believe that technology is only as effective as the people using it. We specialize in \"Activation Training\"—hands-on, role-specific enablement.\n- The \"AI Co-Pilot\" Program: Training employees to use Generative AI for personal productivity (writing, coding, research).\n- Role-Specific AI Workshops: Tailored sessions for HR, Finance, and Sales teams on using specialized AI tools.\n- Executive AI Strategy Briefings: Helping leadership teams understand the competitive landscape of AI.\n- Train-the-Trainer Modules: Building internal capacity to sustain technological adoption.\n\n##4. The Talent Foundry\nQuanthos serves as a bridge for the workforce of tomorrow. We are committed to social and economic impact through specialized enablement tracks:\n- The \"Returnship\" Program: A focused enablement track for women returning to work after a career break, providing AI upskilling and practical confidence-building.\n- Future Leaders Track: Helping fresh graduates bridge the gap between academic theory and the practical demands of the modern, AI-native job market.\n- Corporate Upskilling: Empowering existing professionals to master the tools of the future to remain competitive in their fields.\n\n##5. Why Quanthos?\nIn a market saturated with theoretical consultants, Quanthos is the \"Clinic of Growth.\" We don't just tell you what is wrong; we engineer the cure. We are the architects of the automated, data-driven, and human-empowered future of business.\n\nContact Information:\nEgypt: +20 100 124 01 86 | +20 100 900 94 82\nUAE: +971 52 281 8558\nEmail: osama_naguib@hotmail.com";



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
            <button onClick={() => navigateTo('home')} className="hover:text-quanthos-magenta transition-colors">{t.nav.home}</button>
            <button onClick={() => goToSection('talent')} className="hover:text-quanthos-magenta transition-colors">{t.nav.talent}</button>
            <button onClick={() => goToSection('services')} className="hover:text-quanthos-magenta transition-colors">{t.nav.services}</button>
            <button onClick={() => goToSection('portfolio')} className="hover:text-quanthos-magenta transition-colors">{t.nav.portfolio}</button>
            <button onClick={() => navigateTo('insights')} className="hover:text-quanthos-magenta transition-colors">{t.nav.insights}</button>
            <button onClick={() => navigateTo('about')} className="hover:text-quanthos-magenta transition-colors">{t.nav.about}</button>
            <button onClick={() => navigateTo('contact')} className="hover:text-quanthos-magenta transition-colors">{t.labels.footerContact}</button>
          </div>
          <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              trackMetaEvent('Contact', { content_name: 'Consultation booking' });
              setIsCalendlyOpen(true);
            }}
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
           
          <div className="flex justify-center mt-8 mb-6">
            <button
              onClick={() => goToSection('methodology')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-sm font-semibold tracking-wider shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: '#493570', color: '#f2aaff' }}
              aria-label="Go to Methodology"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-quanthos-magenta"></span>
              <span>{lang === 'en' ? t.methodology.title.toUpperCase() : t.methodology.title}</span>
            </button>
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
          <p className="text-xl text-quanthos-panel/90 mb-12 max-w-2xl mx-auto leading-relaxed">{t.hero.sub}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
           <a onClick={() => goToSection('services')} className="px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl text-white cursor-pointer" style={{ backgroundColor: '#634e86' }}>
              {t.hero.cta_primary}
            </a>
           <a onClick={() => goToSection('talent')} className="px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl text-white cursor-pointer" style={{ backgroundColor: '#634e86' }}>
              {t.hero.cta_secondary}
            </a>
          </div>
          {showReturnship && (
            <div className={`fixed top-28 ${isRTL ? 'left-6' : 'right-6'} z-40 bg-quanthos-magenta text-white px-6 py-5 rounded-2xl shadow-xl max-w-sm text-center scale-[0.85]`}>
              <button aria-label="Close" className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} text-white/80 hover:text-white`} onClick={() => setShowReturnship(false)}>✕</button>
              <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-6 w-40 h-40 rounded-full blur-2xl opacity-60 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.2), rgba(227,68,255,0.1))' }}></div>
                <div className="font-bold mb-1 text-lg">{t.labels.returnshipTitle}</div>
              </div>
              <div className="text-xs text-white/90 mb-3 italic">{t.labels.returnshipSubHeadline}</div>
              {t.labels.returnshipAdImageUrl ? (
                <img src={t.labels.returnshipAdImageUrl} alt="Offer" className="mt-3 rounded-xl w-full h-auto border border-white/20" />
              ) : (
                <div className="mt-3 rounded-xl px-4 py-3 bg-white/10 border border-white/20 text-sm leading-relaxed" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
                  <div dangerouslySetInnerHTML={{ __html: t.labels.returnshipOffer }} />
                </div>
              )}
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSe1o7xImAP_qllI2b-ce8dKItamsT6wMGNTNcOOwcn7ixuFPQ/viewform?usp=dialog" className="mt-3 inline-block bg-white text-quanthos-magenta font-bold px-3 py-2 rounded-xl" target="_blank" rel="noopener noreferrer">
                {t.labels.returnshipCTA}
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
              <div key={idx} className={`p-10 rounded-[32px] border transition-all hover:shadow-xl hover:-translate-y-1 ${idx === 0 ? 'bg-quanthos-panel border-gray-100 hover:border-quanthos-blue/30' : 'bg-quanthos-dark text-white border-quanthos-dark hover:border-quanthos-magenta/40'}`}>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {t.talentFoundry.segments.map((seg, idx: number) => (
              <div key={idx} id={idx === 0 ? 'returnship' : undefined} className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-quanthos-magenta hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
                <div className="w-14 h-14 bg-quanthos-lightViolet/20 rounded-2xl flex items-center justify-center text-quanthos-dark mb-6">
                  {'icon' in seg && seg.icon === "Users" && <Users size={28} />}
                  {'icon' in seg && seg.icon === "GraduationCap" && <GraduationCap size={28} />}
                  {'icon' in seg && seg.icon === "TrendingUp" && <TrendingUp size={28} />}
                  {'icon' in seg && seg.icon === "Activity" && <Activity size={28} />}
                </div>
                <h3 className="text-xl font-bold text-quanthos-dark mb-2">{seg.title}</h3>
                <p className="text-sm font-semibold text-quanthos-magenta mb-4">{seg.target}</p>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">{seg.desc}</p>
                {seg.link ? (
                  <button 
                    onClick={() => navigateTo(seg.link as Page)}
                    className="mt-auto mx-auto inline-block px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#634e86' }}
                  >
                    {lang === 'en' ? 'View Program Details' : 'عرض تفاصيل البرنامج'}
                  </button>
                ) : (
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSe1o7xImAP_qllI2b-ce8dKItamsT6wMGNTNcOOwcn7ixuFPQ/viewform?usp=dialog" 
                    className="mt-auto mx-auto inline-block px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" 
                    style={{ backgroundColor: '#634e86' }}
                  >
                    {t.labels.joinNow}
                  </a>
                )}
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

      <section id="evidence" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-quanthos-dark">{t.labels.evidenceTitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {t.evidence?.map((ev: { source: string; stat: string; detail: string; sourceUrl?: string }, idx: number) => (
              <div key={idx} className="bg-quanthos-panel p-8 rounded-2xl border border-gray-100">
                <div className="text-xl font-bold text-quanthos-magenta mb-2">{ev.stat}</div>
                <div className="text-sm font-semibold text-quanthos-dark mb-3">{ev.source}</div>
                <p className="text-gray-700 text-sm mb-4">{ev.detail}</p>
                {ev.sourceUrl && (
                  <a
                    href={ev.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-white bg-quanthos-magenta px-4 py-2 rounded-lg font-semibold"
                  >
                    Source
                  </a>
                )}
              </div>
            ))}
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
                    <a href="/Quanthos Portfolio.pdf" target="_blank" className="inline-block px-6 py-3 bg-quanthos-magenta text-white rounded-xl font-bold shadow-xl">
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
            {(t.portfolio.individuals as { name: string; result: string; detail: string }[]).map((p, idx) => (
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
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 font-semibold text-quanthos-dark">
                    <div className="flex items-center gap-2">
                      <Phone size={18} />
                      <span>+20 100 124 01 86</span>
                    </div>
                    <a href="https://wa.me/201001240186" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:scale-110 transition-transform">
                      <WhatsAppIcon size={20} />
                    </a>
                  </div>
                  <div className="flex items-center gap-3 font-semibold text-quanthos-dark">
                    <div className="flex items-center gap-2">
                      <Phone size={18} />
                      <span>+20 100 900 94 82</span>
                    </div>
                    <a href="https://wa.me/201009009482" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:scale-110 transition-transform">
                      <WhatsAppIcon size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-quanthos-panel">
                <div className="font-semibold text-quanthos-dark mb-1">{t.labels.countryUAE}</div>
                <div className="flex items-center gap-3 font-semibold text-quanthos-dark">
                  <div className="flex items-center gap-2">
                    <Phone size={18} />
                    <span>+971 52 281 8558</span>
                  </div>
                  <a href="https://wa.me/971522818558" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:scale-110 transition-transform">
                    <WhatsAppIcon size={20} />
                  </a>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-quanthos-panel md:col-span-1">
                <a href="mailto:info@quanthos.world" className="flex items-center gap-3 font-semibold text-quanthos-dark hover:text-quanthos-magenta transition-colors">
                  <Mail size={18} />
                  <span>info@quanthos.world</span>
                </a>
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
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>+20 100 124 01 86</span>
                </div>
                <a href="https://wa.me/201001240186" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:scale-110 transition-transform">
                  <WhatsAppIcon size={16} />
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>+20 100 900 94 82</span>
                </div>
                <a href="https://wa.me/201009009482" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:scale-110 transition-transform">
                  <WhatsAppIcon size={16} />
                </a>
              </div>
              <div className="font-semibold mt-2">{t.labels.countryUAE}</div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>+971 52 281 8558</span>
                </div>
                <a href="https://wa.me/971522818558" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:scale-110 transition-transform">
                  <WhatsAppIcon size={16} />
                </a>
              </div>
              <a href="mailto:info@quanthos.world" className="flex items-center gap-2 mt-2 hover:text-quanthos-magenta transition-colors">
                <Mail size={14} />
                <span>info@quanthos.world</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-3">{t.labels.footerQuickLinks}</h4>
            <div className="text-white/80 text-sm space-y-2">
              <button onClick={()=>navigateTo('home')} className="hover:text-quanthos-lightViolet block">{t.nav.home}</button>
              <button onClick={()=>goToSection('talent')} className="hover:text-quanthos-lightViolet block">{t.nav.talent}</button>
              <button onClick={()=>goToSection('services')} className="hover:text-quanthos-lightViolet block">{t.nav.services}</button>
              <button onClick={()=>goToSection('portfolio')} className="hover:text-quanthos-lightViolet block">{t.nav.portfolio}</button>
              <button onClick={()=>navigateTo('insights')} className="hover:text-quanthos-lightViolet block">{t.nav.insights}</button>
              <button onClick={()=>navigateTo('about')} className="hover:text-quanthos-lightViolet block">{t.nav.about}</button>
              <button onClick={()=>navigateTo('contact')} className="hover:text-quanthos-lightViolet block">{t.labels.footerContact}</button>
            </div>
          </div>
          <div className="text-right">
            <img src={logo} alt="Quanthos" style={{ height: '9.375rem' }} className="ml-auto opacity-90 cursor-pointer" onClick={() => { window.location.href = '/'; window.location.reload(); }} />
            <div className="text-white/70 text-lg mt-2">{t.labels.footerTagline}</div>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-center border-t border-white/10 pt-8">
          <h4 className="font-bold mb-4 text-white">Follow Us</h4>
          <div className="flex items-center gap-6">
            <a href="https://facebook.com/Quanthos" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-quanthos-magenta hover:text-white hover:border-quanthos-magenta transition-all">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com/Quanthos" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-quanthos-magenta hover:text-white hover:border-quanthos-magenta transition-all">
              <Instagram size={24} />
            </a>
            <a href="https://www.youtube.com/@QuanthosAI" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-quanthos-magenta hover:text-white hover:border-quanthos-magenta transition-all">
              <Youtube size={24} />
            </a>
            <a href="https://linkedin.com/company/Quanthos" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-quanthos-magenta hover:text-white hover:border-quanthos-magenta transition-all">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-4 text-center text-white/70 text-sm max-w-md mx-auto">
          {t.labels.copyright}
        </div>
      </footer>

      <PopupModal 
        url="https://calendly.com/osbazoka/short-consultation-session" 
        rootElement={document.getElementById('root')!}
        open={isCalendlyOpen}
        onModalClose={() => setIsCalendlyOpen(false)}
      />

      <Chatbot lang={lang} t={t} />
    </div>
  );
}

export default App;
