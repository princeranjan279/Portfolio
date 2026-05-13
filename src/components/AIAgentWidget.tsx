import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, X, MessageSquare, ArrowRight } from 'lucide-react';
import './AIAgentWidget.css';

const QUERIES = [
  "I need a new website built.",
  "I want to improve my SEO/GEO.",
  "I need help with Meta Ads.",
  "I have a custom requirement."
];

const AIAgentWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);
  const navigate = useNavigate();
  const chatRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setSelectedQuery(null); // reset when opening
  };

  const handleQueryClick = (query: string) => {
    setSelectedQuery(query);
  };

  const handleConnectClick = () => {
    setIsOpen(false);
    navigate(`/contact?query=${encodeURIComponent(selectedQuery || '')}`);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="ai-agent-wrapper" ref={chatRef}>
      {isOpen && (
        <div className="ai-chat-window animate-fadeInUp">
          <div className="ai-chat-header">
            <div className="ai-chat-title">
              <Bot size={20} />
              <span>Prince's AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="ai-close-btn" aria-label="Close Chat">
              <X size={18} />
            </button>
          </div>
          
          <div className="ai-chat-body">
            <div className="ai-message ai-message-bot">
              Hi there! 👋 I'm Prince's digital assistant. How can we help you grow your business today?
            </div>
            
            {!selectedQuery ? (
              <div className="ai-options-container">
                {QUERIES.map((query, idx) => (
                  <button 
                    key={idx} 
                    className="ai-option-btn" 
                    onClick={() => handleQueryClick(query)}
                  >
                    {query}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <div className="ai-message ai-message-user animate-fadeIn">
                  {selectedQuery}
                </div>
                <div className="ai-message ai-message-bot animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                  Great! Prince specializes in this. Let's get you connected directly with him to discuss the details.
                </div>
                <button 
                  className="ai-connect-btn animate-fadeIn" 
                  style={{ animationDelay: '0.6s' }}
                  onClick={handleConnectClick}
                >
                  Connect with Prince <ArrowRight size={16} />
                </button>
                <button 
                  className="ai-back-btn animate-fadeIn"
                  style={{ animationDelay: '0.6s' }}
                  onClick={() => setSelectedQuery(null)}
                >
                  Ask something else
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <button 
        className={`ai-trigger-btn ${isOpen ? 'is-open' : ''}`}
        onClick={toggleChat}
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && <span className="ai-pulse-ring"></span>}
      </button>
    </div>
  );
};

export default AIAgentWidget;
