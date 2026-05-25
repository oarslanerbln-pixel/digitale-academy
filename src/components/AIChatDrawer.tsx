import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Sparkles, Check, Mail } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';
import './AIChatDrawer.css';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

export default function AIChatDrawer() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message based on language
  useEffect(() => {
    if (messages.length === 0) {
      const getWelcomeMessage = () => {
        const lang = i18n.language;
        if (lang === 'de') {
          return "Hallo! Benötigen Sie Hilfe bei einem 3D SaaS- oder Kinoprojekt? Ich bin der 1618 Digital KI-Assistent. Wie kann ich Sie heute unterstützen? Sie können mir auch gerne Ihre E-Mail-Adresse hinterlassen.";
        }
        return "Hello! Need help with a 3D SaaS or cinematic production project? I am the 1618 Digital AI Representative. How can I help you today? Feel free to leave your email for a follow-up.";
      };

      setMessages([
        {
          id: 'welcome',
          sender: 'agent',
          text: getWelcomeMessage(),
          timestamp: new Date(),
        },
      ]);
    }
  }, [i18n.language, messages.length]);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleDrawer = () => {
    playClick();
    setIsOpen(!isOpen);
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Dynamic Email Extraction from Chat input
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const extractedEmails = textToSend.match(emailRegex);
    if (extractedEmails && extractedEmails.length > 0) {
      // Save email to localStorage/state
      setEmailInput(extractedEmails[0]);
      setIsEmailSubmitted(true);
      localStorage.setItem('lead_email', extractedEmails[0]);
    }

    try {
      // Call Vercel Serverless API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: i18n.language,
          history: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }))
        }),
      });

      if (!response.ok) throw new Error('API Error');
      const data = await response.json();

      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (error) {
      // Fallback response if API fails
      const getFallbackReply = () => {
        const lang = i18n.language;
        if (lang === 'de') return "Entschuldigung, meine Verbindung ist gerade unterbrochen. Bitte senden Sie uns eine E-Mail an contact@1618-digital.de.";
        return "I apologize, my systems are currently experiencing latency. Please reach out directly to contact@1618-digital.de.";
      };
      
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          text: getFallbackReply(),
          timestamp: new Date(),
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    playClick();
    setIsEmailSubmitted(true);
    localStorage.setItem('lead_email', emailInput);
    
    // Add success message in chat from agent
    const emailSuccessMsg = i18n.language === 'de'
      ? `Hervorragend! Ich habe Ihre E-Mail-Adresse (${emailInput}) registriert. Wir werden uns in Kürze bezüglich Ihres Projekts melden.`
      : `Excellent! I've registered your email address (${emailInput}). We will contact you shortly about your project.`;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'agent',
        text: emailSuccessMsg,
        timestamp: new Date(),
      }
    ]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="hud-chat-trigger-btn glow-card"
        onClick={toggleDrawer}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{ '--card-glow': 'var(--accent-cyan)' } as React.CSSProperties}
      >
        <span className="hud-chat-btn-pulse" />
        <MessageSquare size={24} className="hud-chat-icon" />
      </motion.button>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Soft Backdrop overlay */}
            <motion.div
              className="hud-chat-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
            />

            <motion.div
              className="hud-chat-drawer hud-scanline-container"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="hud-chat-header">
                <div className="hud-chat-header-title">
                  <Sparkles size={18} color="var(--accent-cyan)" />
                  <span className="hud-data-text">AI REPRESENTATIVE</span>
                </div>
                <button className="hud-chat-close-btn" onClick={toggleDrawer} onMouseEnter={playTick}>
                  <X size={20} />
                </button>
              </div>

              {/* Lead Collection Bar */}
              <div className="hud-lead-capture-bar">
                {isEmailSubmitted ? (
                  <div className="hud-lead-success">
                    <Check size={14} color="var(--accent-cyan)" />
                    <span>EMAIL CONNECTED: {emailInput}</span>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="hud-lead-form">
                    <Mail size={14} color="var(--text-muted)" />
                    <input
                      type="email"
                      placeholder={i18n.language === 'de' ? "E-Mail hinterlassen" : "Connect email for callback..."}
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                      className="hud-lead-input"
                    />
                    <button type="submit" className="hud-lead-submit-btn">
                      SUBMIT
                    </button>
                  </form>
                )}
              </div>

              {/* Chat Messages */}
              <div className="hud-chat-messages">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`hud-chat-msg-row ${msg.sender === 'user' ? 'is-user' : 'is-agent'}`}
                  >
                    <div className="hud-chat-avatar">
                      {msg.sender === 'user' ? <User size={14} /> : <Sparkles size={14} color="var(--accent-cyan)" />}
                    </div>
                    <div className="hud-chat-bubble">
                      <p className="hud-chat-text">{msg.text}</p>
                      <span className="hud-chat-time">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="hud-chat-msg-row is-agent">
                    <div className="hud-chat-avatar">
                      <Sparkles size={14} color="var(--accent-cyan)" />
                    </div>
                    <div className="hud-chat-bubble is-typing-bubble">
                      <div className="hud-chat-typing-dots">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="hud-chat-input-area">
                <input
                  type="text"
                  placeholder={
                    i18n.language === 'de' 
                      ? "Nachricht schreiben..." 
                      : "Type your transmission..."
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                  className="hud-chat-input"
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  className="hud-chat-send-btn"
                  disabled={!inputValue.trim()}
                >
                  <Send size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
