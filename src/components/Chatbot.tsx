import React, { useState, useEffect, useRef } from 'react';
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
  text: string | React.ReactNode;
  sender: 'bot' | 'user';
  options?: { label: string; action: string }[];
};

type TContent = {
  methodology: { title: string; description: string };
  services: { subtitle: string; items: { title: string }[] };
  labels: { returnshipTitle: string; returnshipPitch: string; returnshipDiscount: string; returnshipPrice: string };
};

export default function Chatbot({ lang, t }: { lang: 'en' | 'ar'; t: TContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showOptions, setShowOptions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isRTL = lang === 'ar';

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
        isRTL ? "مرحبًا! كيف يمكنني مساعدتك؟" : "Welcome! How can I help you?",
        [
          { label: isRTL ? "🏢 شركة / بزنس" : "🏢 Company / Business", action: "business_start" },
          { label: isRTL ? "👤 فرد / لنفسي" : "👤 Individual / For me", action: "talent_start" }
        ]
      );
    }
  }, [isOpen, messages.length, isRTL]);
 
  useEffect(() => {
    setMessages([]);
    setShowOptions(true);
  }, [lang]);

  const addBotMessage = (text: string | React.ReactNode, options?: { label: string; action: string }[]) => {
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
          `${t.methodology.title}\n${t.methodology.description}\n\n${isRTL ? "ماذا تريد؟" : "What are you looking for?"}`,
          [
            { label: isRTL ? "الخدمات" : "Services", action: "biz_services" },
            { label: isRTL ? "حجز استشارة" : "Book Consultation", action: "biz_consult" },
            { label: isRTL ? "واتساب" : "WhatsApp", action: "biz_wa" }
          ]
        );
        break;

      case "biz_services":
        addBotMessage(
          <div className="space-y-2">
            <p>{t.services.subtitle}</p>
            <ul className="list-disc pl-4 text-sm">
              {t.services.items.map((i, idx) => (
                <li key={idx}><b>{i.title}</b></li>
              ))}
            </ul>
            <p className="mt-2 text-xs">{isRTL ? "هل تريد مناقشة مشروع محدد؟" : "Do you want to discuss a specific project?"}</p>
          </div>,
          [
            { label: isRTL ? "حجز استشارة" : "Book Consultation", action: "biz_consult" },
            { label: isRTL ? "دراسات الحالة" : "Case Studies", action: "biz_cases" },
            { label: isRTL ? "رجوع" : "Back", action: "business_start" }
          ]
        );
        break;

      case "biz_cases":
        addBotMessage(
          isRTL
            ? "لقد ساعدنا شركات على تحقيق:\n📉 خفض 25% في تأخيرات الخدمة\n⚡ توفير 95% من الوقت في المالية\n📈 زيادة 12% في هامش الربح\n\nهل ترغب في نتائج مماثلة؟"
            : "We've helped companies achieve:\n📉 25% reduction in service delays\n⚡ 95% time saved in Finance\n📈 12% profit margin increase\n\nReady to get similar results?",
          [
            { label: isRTL ? "نعم، احجز الآن" : "Yes, Let's Book", action: "biz_consult" },
            { label: isRTL ? "رجوع" : "Back", action: "business_start" }
          ]
        );
        break;

      case "biz_consult":
        addBotMessage(
          <div>
            {isRTL ? "يمكنك حجز جلسة استشارية قصيرة مباشرة هنا:" : "You can book a short consultation session directly here:"}
            <br/>
            <a href={LINKS.calendly} target="_blank" rel="noopener noreferrer" className="text-quanthos-magenta underline font-bold mt-2 block">
              {isRTL ? "📅 افتح Calendly" : "📅 Open Calendly"}
            </a>
          </div>,
          [{ label: isRTL ? "ابدأ من جديد" : "Start Over", action: "restart" }]
        );
        break;

      case "biz_wa":
        addBotMessage(
          <div>
            {isRTL ? "يمكنك الدردشة مباشرة مع فريق الشركات عبر واتساب:" : "You can chat with our Business Team directly on WhatsApp:"}
            <br/>
            <a href={LINKS.waBusiness} target="_blank" rel="noopener noreferrer" className="text-green-500 underline font-bold mt-2 block">
              {isRTL ? "💬 افتح واتساب" : "💬 Open WhatsApp"}
            </a>
          </div>,
          [{ label: isRTL ? "ابدأ من جديد" : "Start Over", action: "restart" }]
        );
        break;

      case "talent_start":
        addBotMessage(
          isRTL
            ? "مصنع المواهب مصمم لك. أي خيار يناسبك؟"
            : "The 'Talent Foundry' is designed for you. Which describes you best?",
          [
            { label: isRTL ? "👩💼 نساء عائدات للعمل" : "👩💼 Women Returning to Work", action: "talent_returnship" },
            { label: isRTL ? "🎓 خريج جديد" : "🎓 Fresh Graduate", action: "talent_grad" },
            { label: isRTL ? "📈 رفع مهارات مهني" : "📈 Professional Upskilling", action: "talent_pro" }
          ]
        );
        break;

      case "talent_returnship":
        addBotMessage(
          <div className="space-y-2">
            <div className="font-semibold">{t.labels.returnshipTitle}</div>
            <div>{t.labels.returnshipPitch}</div>
            <div>{t.labels.returnshipDiscount}</div>
            <div className="font-bold">{t.labels.returnshipPrice}</div>
          </div>,
          [
            { label: isRTL ? "سجل الآن" : "Register Now", action: "talent_register" },
            { label: isRTL ? "تحدث مع خبير" : "Talk to Expert", action: "talent_wa" },
            { label: isRTL ? "رجوع" : "Back", action: "talent_start" }
          ]
        );
        break;

      case "talent_grad":
        addBotMessage(
          isRTL
            ? "مسار القادة الجدد يسد الفجوة بين الجامعة والسوق. تعلم مهام الذكاء الاصطناعي العملية المطلوبة."
            : "The Future Leaders Track bridges the gap between uni and the real market. Learn the actual AI workflows employers are desperate for.",
          [
            { label: isRTL ? "سجل الآن" : "Register Now", action: "talent_register" },
            { label: isRTL ? "تحدث مع خبير" : "Talk to Expert", action: "talent_wa" },
            { label: isRTL ? "رجوع" : "Back", action: "talent_start" }
          ]
        );
        break;

      case "talent_pro":
        addBotMessage(
          isRTL
            ? "رفع مهارات الشركات: أتمتة العمل المتكرر وركز على الاستراتيجية باستخدام الذكاء الاصطناعي."
            : "Corporate Upskilling: Learn Generative AI to automate manual tasks and focus on strategy.",
          [
            { label: isRTL ? "سجل الآن" : "Register Now", action: "talent_register" },
            { label: isRTL ? "تحدث مع خبير" : "Talk to Expert", action: "talent_wa" },
            { label: isRTL ? "رجوع" : "Back", action: "talent_start" }
          ]
        );
        break;

      case "talent_register":
        addBotMessage(
          <div>
            {isRTL ? "احجز مقعدك عبر هذا النموذج:" : "Secure your spot by filling this form:"}
            <br/>
            <a href={LINKS.registrationForm} target="_blank" rel="noopener noreferrer" className="text-quanthos-magenta underline font-bold mt-2 block">
              {isRTL ? "📝 افتح نموذج التسجيل" : "📝 Open Registration Form"}
            </a>
          </div>,
          [{ label: isRTL ? "ابدأ من جديد" : "Start Over", action: "restart" }]
        );
        break;

      case "talent_wa": {
        const waLink = getTalentWhatsApp();
        addBotMessage(
          <div>
            {isRTL ? "تحدث مع مستشار التدريب عبر واتساب:" : "Chat with our Training Advisor on WhatsApp:"}
            <br/>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-green-500 underline font-bold mt-2 block">
              {isRTL ? "💬 افتح محادثة واتساب" : "💬 Open WhatsApp Chat"}
            </a>
          </div>,
          [{ label: isRTL ? "ابدأ من جديد" : "Start Over", action: "restart" }]
        );
        break;
      }

      case "restart":
        addBotMessage(
          isRTL ? "كيف يمكنني مساعدتك؟" : "How else can I help you?",
          [
            { label: isRTL ? "🏢 شركة / بزنس" : "🏢 Company / Business", action: "business_start" },
            { label: isRTL ? "👤 فرد / لنفسي" : "👤 Individual / For me", action: "talent_start" }
          ]
        );
        break;

      default:
        addBotMessage(isRTL ? "لست متأكدًا مما تريده. جرب أحد هذه الخيارات:" : "I'm not sure how to help with that. Try one of these options:", 
          [
            { label: isRTL ? "🏢 شركة" : "🏢 Company", action: "business_start" },
            { label: isRTL ? "👤 فرد" : "👤 Individual", action: "talent_start" }
          ]
        );
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 md:w-96 mb-4 overflow-hidden flex flex-col h-[500px]">
          <div className="bg-gradient-to-r from-quanthos-dark to-quanthos-magenta p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-full">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">{isRTL ? "مساعد كوانثوس" : "Quanthos Assistant"}</h3>
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
                {isRTL ? "اختر خيارًا أعلاه للمتابعة" : "Choose an option above to continue"}
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
            {isRTL ? "تحتاج مساعدة؟ تحدث معنا!" : "Need help? Chat with us!"}
          </span>
        )}
      </button>
    </div>
  );
}
