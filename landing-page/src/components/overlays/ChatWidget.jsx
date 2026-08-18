/* ==========================================================================
   PLAIN-ENGLISH GUIDE  ·  THE ASK IGNITHO AI CHAT BUBBLE

   WHERE YOU SEE THIS
     Bottom-right corner of every page.

   WHAT IS IN HERE
     · The closed bubble, and the chat panel it opens into: a greeting,
       the message list, a typing indicator, and a text box.

   WORTH KNOWING
     The answers are WRITTEN IN ADVANCE and matched on keywords — this
     is not connected to a live assistant. If nothing matches, it falls
     back to a general reply.
   ========================================================================== */

import { useEffect, useRef, useState } from 'react';
import { Bot, Minimize2, Send } from 'lucide-react';
import { scrollEase } from '../../lib/scrollEase.js';

const GREETING = {
  sender: 'bot',
  text: 'Hello! I am the Ignitho AI Assistant. How can I assist your executive team today?'
};

/* Canned answers, matched on keywords. First hit wins, so the more specific
   topics come before the general one. */
const REPLIES = [
  {
    match: ['roi', 'cost', 'save'],
    text: 'On average, Ignitho AI reduces routine operational overhead by 60% to 80% and cuts AI cloud API spending by up to 40% via CostPilot routing'
  },
  {
    match: ['security', 'hipaa', 'compliance', 'fda'],
    text: 'Ignitho AI is ISO 27001 certified and SOC2 Type II compliant. Our Fortress security firewall prevents data leaks, prompt attacks, and PII violations automatically'
  },
  {
    match: ['deploy', 'time', 'fast'],
    text: 'Because Ignitho AI relies on modular, pre-built accelerators, deployment takes days rather than custom multi-month software engineering cycles'
  }
];

const FALLBACK =
  'Ignitho AI delivers pre-built, multi-agent AI accelerators that automate complex business workflows securely. Would you like to schedule an executive briefing with our leadership team?';

const answerFor = (query) => {
  const q = query.toLowerCase();
  return REPLIES.find((r) => r.match.some((m) => q.includes(m)))?.text ?? FALLBACK;
};

/* Entirely self-contained — the rest of the page does not know it exists. */
export function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([GREETING]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: scrollEase() });
  }, [chatMessages, isChatOpen, isTyping]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    setChatMessages((prev) => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setChatMessages((prev) => [...prev, { sender: 'bot', text: answerFor(query) }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[55] md:bottom-7 md:right-7">
      {!isChatOpen ? (
        <button
          onClick={() => setIsChatOpen(true)}
          className="group flex items-center gap-3 rounded-full bg-ig-ink py-3.5 pl-5 pr-6 text-white shadow-[0_16px_36px_-18px_rgba(22,6,58,0.7)] transition-colors duration-300 hover:bg-ig-violet-500"
        >
          <span className="relative">
            <Bot className="h-4 w-4" strokeWidth={2} />
            <span className="absolute -right-1.5 -top-1.5 h-2 w-2 rounded-full bg-ig-sky" />
          </span>
          <span className="font-mono text-[11.5px] font-bold tracking-[0.05em]">
            Ask Ignitho AI
          </span>
        </button>
      ) : (
        /* `overflow-hidden` is what makes the radius real — without it the
           header rule and the scroll area square the corners back off */
        <div className="pop-br flex h-[calc(100vh_-_7rem)] max-h-[520px] w-[calc(100vw_-_2.5rem)] max-w-[370px] flex-col overflow-hidden rounded-[22px] border border-ig-sky/25 bg-ig-console text-white shadow-[0_28px_64px_-28px_rgba(3,3,3,0.75)]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <h4 className="text-[13px] font-extrabold tracking-[-0.01em]">
                Ignitho AI Executive Assistant
              </h4>
              <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[11.5px] tracking-[0.05em] text-ig-sky">
                <span className="h-1.5 w-1.5 rounded-full bg-ig-sky" />
                Online • Governed AI
              </span>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              aria-label="Minimize"
              className="text-white/45 transition-colors hover:text-white"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`msg-in flex gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ig-sky/30 text-ig-sky">
                    <Bot className="h-3.5 w-3.5" />
                  </span>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'rounded-br-md bg-ig-teal text-white'
                      : 'rounded-bl-md border border-white/10 bg-white/[0.05] text-white/80'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="msg-in flex items-center gap-2.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ig-sky/30 text-ig-sky">
                  <Bot className="h-3.5 w-3.5" />
                </span>
                <span className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-4 py-3">
                  <span className="dot-1 h-1.5 w-1.5 rounded-full bg-ig-sky" />
                  <span className="dot-2 h-1.5 w-1.5 rounded-full bg-ig-sky" />
                  <span className="dot-3 h-1.5 w-1.5 rounded-full bg-ig-sky" />
                </span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-white/10 px-3 py-2.5">
            {["What's the ROI?", 'HIPAA Compliance?', 'Deployment Time?'].map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="rounded-full border border-ig-sky/25 px-3 py-1.5 font-mono text-[11px] font-bold tracking-[0.03em] text-ig-sky transition-colors duration-300 hover:border-ig-teal-ring hover:bg-ig-teal hover:text-white"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              type="text"
              placeholder="Ask about Ignitho AI ROI, security, or deployment..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 font-mono text-[11px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-ig-teal-ring"
            />
            <button
              onClick={() => handleSendMessage()}
              aria-label="Send"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ig-teal text-white transition-colors duration-300 hover:bg-ig-teal-hover"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
