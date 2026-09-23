import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  MessageSquare, 
  Cpu,
  FileText,
  AlertCircle
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/AuthContext';
import { getStudentData } from './StudentViews';
import { chatService } from '../api/chatService';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  source_notice?: string;
  isError?: boolean;
}

const suggestedPrompts = [
  'What is the eligibility for TCS?',
  'Which companies offer high packages?',
  'What skills are commonly required?',
  'Show me companies visiting next week.'
];

export default function AIAssistant() {
  const { user } = useAuth();
  
  const isStudent = user?.role === 'STUDENT';
  const student = isStudent ? getStudentData(String(user.userId)) : null;
  const userName = isStudent ? student?.name : 'Placement Officer';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${userName}! I am your AI Placement Assistant. You can ask me about upcoming placement drives, company criteria, or general placement information.`
    }
  ]);
  
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatLogsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatLogsRef.current) {
      chatLogsRef.current.scrollTop = chatLogsRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    // Append User Message
    const userMsg: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: queryText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const response = await chatService.askQuestion(queryText);
      
      const aiMsg: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: response.answer,
        source_notice: response.source_notice
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chat API Error:', error);
      const errorMsg: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: 'Unable to connect to the placement assistant right now. Please try again in a moment.',
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: `Hello ${userName}! I am your AI Placement Assistant. You can ask me about upcoming placement drives, company criteria, or general placement information.`
      }
    ]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', height: '100%' }}>
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Placement Assistant</h1>
          <p className="page-subtitle">
            Get answers about placement drives, eligibility criteria, and interview preparation directly from the university guidelines.
          </p>
        </div>
        <div>
          <button className="btn btn-secondary btn-sm" onClick={handleClearChat}>
            New Conversation
          </button>
        </div>
      </div>

      {/* Chat workspace layout */}
      <div className="ai-chat-layout" style={{ height: 'calc(100vh - 200px)' }}>
        
        {/* Left Suggestions Pane */}
        <div className="chat-prompts-sidebar">
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', height: '100%' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', display: 'flex', gap: '4px', alignItems: 'center' }}>
              <MessageSquare size={16} style={{ color: 'var(--primary)' }} />
              Suggested Prompts
            </span>
            
            <div className="prompt-chips-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {suggestedPrompts.map((prompt, pIdx) => (
                <button 
                  key={pIdx} 
                  className="prompt-chip"
                  onClick={() => handleSendQuery(prompt)}
                  disabled={isTyping}
                  style={{ textAlign: 'left', whiteSpace: 'normal', height: 'auto', padding: '10px' }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Chat Arena */}
        <div className="chat-arena" style={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
          
          {/* Arena Header */}
          <div className="chat-arena-header" style={{ padding: 'var(--space-md)', borderBottom: '1px solid var(--border)' }}>
            <div className="user-avatar" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', width: '32px', height: '32px' }}>
              <Cpu size={16} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--text-primary)' }}>PlaceIntel Assistant</span>
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="chat-status-indicator"></span>
                AI Agent Active
              </span>
            </div>
          </div>

          {/* Logs Area */}
          <div className="chat-logs-area" ref={chatLogsRef} style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-lg)' }}>
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}
              >
                <span className="chat-bubble-sender">
                  {msg.sender === 'user' ? userName : 'PlaceIntel AI'}
                </span>
                
                {/* Message Body */}
                <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  {msg.isError ? (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', color: 'var(--danger)' }}>
                      <AlertCircle size={16} style={{ marginTop: '2px' }} />
                      <span>{msg.text}</span>
                    </div>
                  ) : msg.sender === 'ai' && msg.id !== 1 ? (
                    <div className="markdown-body">
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                  )}
                </div>

                {/* Source Notice Component */}
                {msg.source_notice && (
                  <div style={{
                    marginTop: 'var(--space-md)',
                    padding: '8px 12px',
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}>
                    <FileText size={14} style={{ color: 'var(--text-secondary)' }} />
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                      Source: {msg.source_notice}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Stream Typing Indicator */}
            {isTyping && (
              <div className="chat-bubble ai">
                <span className="chat-bubble-sender">PlaceIntel AI</span>
                <div className="typing-dots" style={{ padding: '8px 0' }}>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Input Form */}
          <form 
            className="chat-input-area" 
            style={{ padding: 'var(--space-md)', borderTop: '1px solid var(--border)', display: 'flex', gap: 'var(--space-sm)' }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(inputQuery);
            }}
          >
            <div className="chat-input-wrapper" style={{ flex: 1 }}>
              <input 
                type="text" 
                placeholder="Ask about placement opportunities..." 
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                disabled={isTyping}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isTyping || !inputQuery.trim()}
              style={{ padding: '10px 16px', display: 'flex', gap: '6px', alignItems: 'center' }}
            >
              <Send size={14} />
              <span>Ask AI</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
