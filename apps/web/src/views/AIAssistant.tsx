import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { chatService } from '../api/chatService';

interface ChatSource {
  notice: string;
  pages: number[];
}

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  sources?: ChatSource[];
  isError?: boolean;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatLogsRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll chat to bottom whenever messages or typing state changes.
  useEffect(() => {
    if (chatLogsRef.current) {
      chatLogsRef.current.scrollTop = chatLogsRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendQuery = async (queryText: string) => {
    const trimmedQuery = queryText.trim();
    if (!trimmedQuery || isTyping) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: trimmedQuery,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const response = await chatService.askQuestion(trimmedQuery);
      
      const aiMsg: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.answer,
        sources: response.sources,
      };
      
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chat API Error:', error);
      const errorMsg: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "I'm unable to reach PlaceIntel right now. Please try again.",
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setInputQuery('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuery(inputQuery);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputQuery(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  const SUGGESTED_PROMPTS = [
    {
      title: "Placement Opportunities",
      query: "Which placement drives are currently open for my branch?",
      icon: "work"
    },
    {
      title: "Eligibility & Fit",
      query: "Why is my Fit Score high or low for this placement?",
      icon: "analytics"
    },
    {
      title: "Company Information",
      query: "What are the eligibility requirements for TCS?",
      icon: "domain"
    },
    {
      title: "Placement Insights",
      query: "Which companies currently offer the highest packages?",
      icon: "trending_up"
    }
  ];

  return (
    <div className="flex flex-col w-full h-[calc(100vh-128px)] max-w-4xl mx-auto relative bg-background rounded-2xl overflow-hidden">
      
      {/* Top Bar for New Conversation */}
      <div className="absolute top-0 right-0 z-20 pt-4 pr-4">
        {messages.length > 0 && (
          <button 
            className="px-4 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant font-label-regular text-label-regular transition-colors flex items-center gap-2 shadow-sm border border-surface-container"
            onClick={handleClearChat}
            disabled={isTyping}
            type="button"
            title="Clear local conversation state"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            New Conversation
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div 
        ref={chatLogsRef}
        className="flex-1 overflow-y-auto w-full pb-40 flex flex-col no-scrollbar"
      >
        {messages.length === 0 ? (
          // Empty / Landing State
          <div className="flex flex-col items-center justify-center w-full h-full min-h-[500px] px-4 animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center shadow-sm mb-6">
              <span className="material-symbols-outlined text-[32px] text-on-primary">psychology</span>
            </div>
            <h1 className="font-headline-lg text-[32px] font-semibold text-primary mb-3 text-center tracking-tight">
              How can I help with your placement journey?
            </h1>
            <p className="font-body-lg text-secondary text-center max-w-lg mb-12">
              Ask about placement drives, company requirements, eligibility, skills, packages, and official placement information.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-3xl">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendQuery(prompt.query)}
                  disabled={isTyping}
                  className="flex flex-col items-start text-left p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low border border-surface-container hover:border-outline-variant transition-all shadow-sm group"
                >
                  <div className="flex items-center gap-2 mb-2 text-on-surface-variant group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[18px]">{prompt.icon}</span>
                    <span className="font-title-sm text-title-sm">{prompt.title}</span>
                  </div>
                  <p className="font-body-sm text-secondary line-clamp-2">{prompt.query}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Conversation State
          <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto px-4 pt-16">
            {messages.map((msg) => (
              <div key={msg.id} className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                {msg.sender === 'user' ? (
                  // User Message
                  <div className="self-end max-w-[85%] bg-surface-container-high text-on-surface rounded-3xl rounded-tr-sm px-5 py-3.5 shadow-sm">
                    <p className="font-body-md whitespace-pre-wrap">{msg.text}</p>
                  </div>
                ) : (
                  // AI Message
                  <div className="self-start w-full flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex shrink-0 items-center justify-center mt-1">
                      <span className="material-symbols-outlined text-[16px] text-on-primary">psychology</span>
                    </div>
                    <div className="flex-1 min-w-0 max-w-[90%]">
                      {msg.isError ? (
                        <div className="bg-[#FFF0F0] text-[#B3261E] border border-[#FFDAD6] rounded-xl px-4 py-3 font-body-md flex items-center gap-2 mt-1">
                          <span className="material-symbols-outlined text-[20px]">error</span>
                          {msg.text}
                        </div>
                      ) : (
                        <div className="prose prose-slate max-w-none text-on-surface font-body-md prose-p:my-2 prose-headings:text-primary prose-strong:text-primary marker:text-outline leading-relaxed">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      )}

                      {/* Source Citations */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {msg.sources.map((source, index) => (
                            <div key={`${source.notice}-${index}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-lowest border border-surface-container rounded-full shadow-sm">
                              <span className="material-symbols-outlined text-[14px] text-secondary">description</span>
                              <span className="font-label-regular text-secondary text-[11px] uppercase tracking-wider">
                                {source.notice} {source.pages.length > 0 && `(Pages ${source.pages.join(', ')})`}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading State */}
            {isTyping && (
              <div className="self-start w-full flex items-start gap-4 animate-in fade-in duration-300">
                <div className="w-8 h-8 rounded-full bg-primary-container flex shrink-0 items-center justify-center mt-1 shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-on-primary">psychology</span>
                </div>
                <div className="flex items-center gap-3 bg-surface-container-lowest border border-surface-container rounded-full px-4 py-2 mt-1 shadow-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-[bounce_1s_infinite_0ms]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-[bounce_1s_infinite_150ms]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-[bounce_1s_infinite_300ms]"></div>
                  </div>
                  <span className="font-label-regular text-secondary text-sm">Analyzing placement information...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fixed Bottom Composer */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-background via-background/95 to-transparent pt-8 pb-4 px-4 z-10 pointer-events-none">
        <div className="max-w-3xl mx-auto w-full relative bg-surface-container-lowest rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-surface-container hover:border-surface-container-high transition-colors focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 overflow-hidden pointer-events-auto">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(inputQuery);
            }}
            className="flex flex-col w-full relative"
          >
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="Ask about placement opportunities, eligibility, companies..."
              value={inputQuery}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="w-full min-h-[60px] max-h-[200px] py-4 pl-6 pr-14 bg-transparent resize-none outline-none font-body-lg text-on-surface placeholder:text-outline disabled:opacity-50 no-scrollbar"
            />
            <div className="absolute right-2.5 bottom-2.5">
              <button
                type="submit"
                disabled={isTyping || !inputQuery.trim()}
                className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                title="Send message"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
              </button>
            </div>
          </form>
        </div>
        <div className="text-center mt-3 pointer-events-auto">
          <span className="font-label-regular text-[11px] text-outline">
            PlaceIntel AI uses official placement records. Verify important details with your Placement Officer.
          </span>
        </div>
      </div>

    </div>
  );
}