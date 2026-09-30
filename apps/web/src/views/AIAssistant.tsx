import { useState, useRef, useEffect } from 'react';
import {
  Send,
  MessageSquare,
  Cpu,
  FileText,
  AlertCircle,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/AuthContext';
import { getStudentData } from './StudentViews';
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

const suggestedPrompts = [
  'What is the eligibility for TCS?',
  'Which companies offer high packages?',
  'What skills are commonly required?',
  'Show me companies visiting next week.',
];

const GREETING_ID = 0; // stable ID so the greeting is never duplicated

export default function AIAssistant() {
  const { user } = useAuth();

  const isStudent = user?.role === 'STUDENT';
  const student = isStudent ? getStudentData(String(user?.id || user?.userId)) : null;
  const userName = isStudent ? student?.name : 'Placement Officer';

  const greeting: Message = {
    id: GREETING_ID,
    sender: 'ai',
    text: `Hello ${userName}! I am your AI Placement Assistant. You can ask me about upcoming placement drives, company criteria, or general placement information.`,
  };

  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // sessionId is the persistent ChatSession ID from the backend.
  // It is null until the first message is sent or history is loaded.
  const [sessionId, setSessionId] = useState<number | null>(null);

  const chatLogsRef = useRef<HTMLDivElement>(null);

  // ── Load persisted history on mount ─────────────────────────────
  useEffect(() => {
    // Only load history when the user is authenticated.
    if (!(user?.id || user?.userId)) return;

    let cancelled = false;

    const loadHistory = async () => {
      setIsLoadingHistory(true);
      try {
        const history = await chatService.getHistory();

        if (cancelled) return;

        if (history.session_id && history.messages.length > 0) {
          setSessionId(history.session_id);

          // Convert backend messages to UI Message objects.
          // Insert the greeting first, then append the persisted messages.
          const restored: Message[] = [greeting];

          history.messages.forEach((m, index) => {
            restored.push({
              // Use negative indices so IDs never clash with Date.now() values.
              id: -(index + 1),
              sender: m.role === 'USER' ? 'user' : 'ai',
              text: m.content,
            });
          });

          setMessages(restored);
        }
        // If there is no prior session, keep the greeting-only state.
      } catch {
        // History load failure is non-fatal; start fresh.
      } finally {
        if (!cancelled) setIsLoadingHistory(false);
      }
    };

    loadHistory();

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userId]);

  // ── Auto-scroll chat to bottom ────────────────────────────────────
  useEffect(() => {
    if (chatLogsRef.current) {
      chatLogsRef.current.scrollTop = chatLogsRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // ── Send a question ───────────────────────────────────────────────
  const handleSendQuery = async (queryText: string) => {
    const trimmedQuery = queryText.trim();

    if (!trimmedQuery || isTyping) {
      return;
    }

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: trimmedQuery,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      // Pass the active session ID so the backend reuses the same
      // ChatSession instead of creating a new one.
      const response = await chatService.askQuestion(trimmedQuery, sessionId);

      // Capture the session ID returned by the backend.
      // On the first message this will be a newly created session.
      // On follow-up messages it will be the same session.
      if (response.session_id) {
        setSessionId(response.session_id);
      }

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
        text: 'Unable to connect to the placement assistant right now. Please try again in a moment.',
        isError: true,
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // ── New Conversation (explicit user action) ───────────────────────
  const handleClearChat = () => {
    // Reset state — a new session will be created by the backend
    // on the next message the user sends.
    setSessionId(null);
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: `Hello ${userName}! I am your AI Placement Assistant. You can ask me about upcoming placement drives, company criteria, or general placement information.`,
      },
    ]);
    setInputQuery('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-lg)',
        height: '100%',
      }}
    >
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Placement Assistant</h1>

          <p className="page-subtitle">
            Get answers about placement drives, eligibility criteria, and
            interview preparation directly from the university guidelines.
          </p>
        </div>

        <div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleClearChat}
            disabled={isTyping || isLoadingHistory}
          >
            New Conversation
          </button>
        </div>
      </div>

      {/* Chat workspace */}
      <div
        className="ai-chat-layout"
        style={{ height: 'calc(100vh - 200px)' }}
      >
        {/* Left Suggestions Pane */}
        <div className="chat-prompts-sidebar">
          <div
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              height: '100%',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
              }}
            >
              <MessageSquare
                size={16}
                style={{ color: 'var(--primary)' }}
              />

              Suggested Prompts
            </span>

            <div
              className="prompt-chips-list"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm)',
              }}
            >
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="prompt-chip"
                  onClick={() => handleSendQuery(prompt)}
                  disabled={isTyping || isLoadingHistory}
                  style={{
                    textAlign: 'left',
                    whiteSpace: 'normal',
                    height: 'auto',
                    padding: '10px',
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Chat Arena */}
        <div
          className="chat-arena"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            flex: 1,
          }}
        >
          {/* Arena Header */}
          <div
            className="chat-arena-header"
            style={{
              padding: 'var(--space-md)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div
              className="user-avatar"
              style={{
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                width: '32px',
                height: '32px',
              }}
            >
              <Cpu size={16} />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span
                style={{
                  fontSize: '13.5px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                }}
              >
                PlaceIntel Assistant
              </span>

              <span
                style={{
                  fontSize: '10px',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span className="chat-status-indicator"></span>
                {isLoadingHistory ? 'Loading conversation…' : 'AI Agent Active'}
              </span>
            </div>
          </div>

          {/* Chat Logs */}
          <div
            className="chat-logs-area"
            ref={chatLogsRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 'var(--space-lg)',
            }}
          >
            {/* Loading skeleton while history is being fetched */}
            {isLoadingHistory && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: 'var(--space-lg)',
                  color: 'var(--text-secondary)',
                  fontSize: '13px',
                }}
              >
                Restoring conversation…
              </div>
            )}

            {!isLoadingHistory &&
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-bubble ${
                    msg.sender === 'user' ? 'user' : 'ai'
                  }`}
                >
                  <span className="chat-bubble-sender">
                    {msg.sender === 'user' ? userName : 'PlaceIntel AI'}
                  </span>

                  {/* Message Body */}
                  <div
                    style={{
                      fontSize: '13px',
                      lineHeight: '1.6',
                    }}
                  >
                    {msg.isError ? (
                      <div
                        style={{
                          display: 'flex',
                          gap: '8px',
                          alignItems: 'flex-start',
                          color: 'var(--danger)',
                        }}
                      >
                        <AlertCircle
                          size={16}
                          style={{ marginTop: '2px' }}
                        />

                        <span>{msg.text}</span>
                      </div>
                    ) : msg.sender === 'ai' && msg.id !== GREETING_ID ? (
                      <div className="markdown-body">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <span style={{ whiteSpace: 'pre-wrap' }}>
                        {msg.text}
                      </span>
                    )}
                  </div>

                  {/* Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div
                      style={{
                        marginTop: 'var(--space-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-sm)',
                      }}
                    >
                      {msg.sources.map((source, index) => (
                        <div
                          key={`${source.notice}-${index}`}
                          style={{
                            padding: '8px 12px',
                            backgroundColor: 'var(--background)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <FileText
                            size={14}
                            style={{
                              color: 'var(--text-secondary)',
                              flexShrink: 0,
                            }}
                          />

                          <span
                            style={{
                              fontSize: '11px',
                              color: 'var(--text-secondary)',
                              fontWeight: '500',
                            }}
                          >
                            Source: {source.notice}
                            {' · '}
                            Page{source.pages.length > 1 ? 's' : ''}{' '}
                            {source.pages.join(', ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-bubble ai">
                <span className="chat-bubble-sender">
                  PlaceIntel AI
                </span>

                <div
                  className="typing-dots"
                  style={{ padding: '8px 0' }}
                >
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
            style={{
              padding: 'var(--space-md)',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: 'var(--space-sm)',
            }}
            onSubmit={(event) => {
              event.preventDefault();
              handleSendQuery(inputQuery);
            }}
          >
            <div
              className="chat-input-wrapper"
              style={{ flex: 1 }}
            >
              <input
                type="text"
                placeholder="Ask about placement opportunities..."
                value={inputQuery}
                onChange={(event) =>
                  setInputQuery(event.target.value)
                }
                disabled={isTyping || isLoadingHistory}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isTyping || isLoadingHistory || !inputQuery.trim()}
              style={{
                padding: '10px 16px',
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
              }}
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