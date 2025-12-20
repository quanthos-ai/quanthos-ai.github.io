import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';

const LINKS = {
  calendly: "https://calendly.com/osbazoka/short-consultation-session",
  registrationForm: "https://docs.google.com/forms/d/e/1FAIpQLSe1o7xImAP_qllI2b-ce8dKItamsT6wMGNTNcOOwcn7ixuFPQ/viewform",
  waBusiness: "https://wa.me/201001240186",
  waTalentPrimary: "https://wa.me/201001240186",
  waTalentSecondary: "https://wa.me/201009009482"
};

type Message = {
  id: string;
  text: string | JSX.Element;
  sender: 'bot' | 'user';
  options?: { label: string; action: string }[];
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showOptions, setShowOptions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getTalentWhatsApp = () => {
    const count = parseInt(localStorage.getItem('quanthos_wa_count') || '0');
    const newCount = count + 1;
    localStorage.setItem('quanthos_wa_count', newCount.toString());
    if (newCount % 3 === 0) {
      return LINKS.waTalentSecondary;
    }
    return LINKS.waTalentPrimary;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      addBotMessage(
        "Hi! / السلام عليكم 👋 \nWelcome to Quanthos. \n\nI can help you find the right service. Are you here for your Company or for Yourself?",
        [
          { label: "🏢 Company / بزنس", action: "business_start" },
          { label: "👤 Individual / لنفسي", action: "talent_start" }
        ]
      );
    }
  }, [isOpen]);

  const addBotMessage = (text: string | JSX.Element, options?: { label: string; action: string }[]) => {
    setMessages(prev => [...prev, { 
      id: Date.now().toString(), 
      text, 
      sender: 'bot', 
      options 
    }]);
    setShowOptions(true);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { 
      id: Date.now().toString(), 
      text, 
      sender: 'user' 
    }]);
    setShowOptions(false);
  };

  const handleOptionClick = (action: string, label: string) => {
    addUserMessage(label);
    setTimeout(() => {
      handleLogic(action);
    }, 600);
  };

  const handleLogic = (action: string) => {
    switch (action) {
      case "business_start":
        addBotMessage(
          "Great! At Quanthos, we use the 'Diagnose & Activate' methodology. We don't just give reports; we build systems to fix problems.\n\nWhat are you looking for?",
          [
            { label: "Services (الخدمات)", action: "biz_services" },
            { label: "Book Consultation (حجز استشارة)", action: "biz_consult" },
            { label: "Chat on WhatsApp (واتساب)", action: "biz_wa" }
          ]
        );
        break;

      case "biz_services":
        addBotMessage(
          <div className="space-y-2">
            <p>We offer 4 Growth Pillars:</p>
            <ul className="list-disc pl-4 text-sm">
              <li><b>Strategy & BI:</b> Dashboards & Forecasting</li>
              <li><b>AI Automation:</b> RPA & Agents</li>
              <li><b>Sales Activation:</b> Lead Gen & NLP</li>
              <li><b>Corporate Training:</b> Upskilling teams</li>
            </ul>
            <p className="mt-2 text-xs">Do you want to discuss a specific project?</p>
          </div>,
          [
            { label: "Book Consultation", action: "biz_consult" },
            { label: "See Case Studies", action: "biz_cases" },
            { label: "Back / رجوع", action: "business_start" }
          ]
        );
        break;

      case "biz_cases":
        addBotMessage(
          "We've helped companies achieve:\n📉 25% reduction in service delays\n⚡ 95% time saved in Finance\n📈 12% profit margin increase\n\nReady to get similar results?",
          [
            { label: "Yes, Let's Book", action: "biz_consult" },
            { label: "Back / رجوع", action: "business_start" }
          ]
        );
        break;

      case "biz_consult":
        addBotMessage(
          <div>
            You can book a short consultation session directly here:
            <br/>
            <a href={LINKS.calendly} target="_blank" rel="noopener noreferrer" className="text-quanthos-magenta underline font-bold mt-2 block">
              📅 Open Calendly
            </a>
          </div>,
          [{ label: "Start Over", action: "restart" }]
        );
        break;

      case "biz_wa":
        addBotMessage(
          <div>
            Sure! You can chat with our Business Team directly on WhatsApp:
            <br/>
            <a href={LINKS.waBusiness} target="_blank" rel="noopener noreferrer" className="text-green-500 underline font-bold mt-2 block">
              💬 Open WhatsApp
            </a>
          </div>,
          [{ label: "Start Over", action: "restart" }]
        );
        break;

      case "talent_start":
        addBotMessage(
          "Awesome! 🚀 The 'Talent Foundry' is designed for you. Which describes you best?",
          [
            { label: "👩💼 Women Returning to Work", action: "talent_returnship" },
            { label: "🎓 Fresh Graduate", action: "talent_grad" },
            { label: "📈 Professional Upskilling", action: "talent_pro" }
          ]
        );
        break;

      case "talent_returnship":
        addBotMessage(
          "The **Returnship Program** is perfect for you. We help you rebuild confidence and master AI tools to re-enter the market as a leader, not a junior.\n\nCurrently 1500 L.E (50% OFF if you register now!)",
          [
            { label: "Register Now (سجل الآن)", action: "talent_register" },
            { label: "Talk to Expert (واتساب)", action: "talent_wa" },
            { label: "Back", action: "talent_start" }
          ]
        );
        break;

      case "talent_grad":
        addBotMessage(
          "The **Future Leaders Track** bridges the gap between uni and the real market. Learn the actual AI workflows employers are desperate for.",
          [
            { label: "Register Now", action: "talent_register" },
            { label: "Talk to Expert", action: "talent_wa" },
            { label: "Back", action: "talent_start" }
          ]
        );
        break;

      case "talent_pro":
        addBotMessage(
          "**Corporate Upskilling**: Stop doing busy work. Learn Generative AI to automate manual tasks and focus on strategy.",
          [
            { label: "Register Now", action: "talent_register" },
            { label: "Talk to Expert", action: "talent_wa" },
            { label: "Back", action: "talent_start" }
          ]
        );
        break;

      case "talent_register":
        addBotMessage(
          <div>
            Secure your spot by filling this form:
            <br/>
            <a href={LINKS.registrationForm} target="_blank" rel="noopener noreferrer" className="text-quanthos-magenta underline font-bold mt-2 block">
              📝 Open Registration Form
            </a>
          </div>,
          [{ label: "Start Over", action: "restart" }]
        );
        break;

      case "talent_wa":
        const waLink = getTalentWhatsApp();
        addBotMessage(
          <div>
            Chat with our Training Advisor on WhatsApp:
            <br/>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-green-500 underline font-bold mt-2 block">
              💬 Open WhatsApp Chat
            </a>
          </div>,
          [{ label: "Start Over", action: "restart" }]
        );
        break;

      case "restart":
        addBotMessage(
          "How else can I help you?",
          [
            { label: "🏢 Company / بزنس", action: "business_start" },
            { label: "👤 Individual / لنفسي", action: "talent_start" }
          ]
        );
        break;

      default:
        addBotMessage("I'm not sure how to help with that. Try one of these options:", 
          [
            { label: "🏢 Company", action: "business_start" },
            { label: "👤 Individual", action: "talent_start" }
          ]
        );
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 md:w-96 mb-4 overflow-hidden flex flex-col h-[500px]">
          <div className="bg-gradient-to-r from-quanthos-dark to-quanthos-magenta p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-full">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Quanthos AI Assistant</h3>
                <span className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user' 
                      ? 'bg-quanthos-magenta text-white rounded-br-none' 
                      : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            {showOptions && messages[messages.length - 1]?.options ? (
              <div className="flex flex-wrap gap-2">
                {messages[messages.length - 1].options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(opt.action, opt.label)}
                    className="px-4 py-2 bg-quanthos-panel hover:bg-quanthos-blue/10 border border-quanthos-blue/20 text-quanthos-dark rounded-full text-xs font-semibold transition-all active:scale-95"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center text-xs text-gray-400">
                Choose an option above to continue
              </div>
            )}
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center w-14 h-14 bg-quanthos-magenta text-white rounded-full shadow-lg hover:bg-quanthos-dark hover:scale-110 transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        
        {!isOpen && (
          <span className="absolute right-16 bg-white text-quanthos-dark px-3 py-1 rounded-lg shadow-md text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Need help? Chat with us!
          </span>
        )}
      </button>
    </div>
  );
}
