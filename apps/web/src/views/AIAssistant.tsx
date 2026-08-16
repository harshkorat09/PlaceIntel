import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  MessageSquare, 
  Copy, 
  Check, 
  Cpu
} from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  type?: 'text' | 'table' | 'email';
  tableData?: { name: string; rollNo: string; branch: string; cgpa: number; status: string }[];
  emailSubject?: string;
  emailBody?: string;
}

const suggestedPrompts = [
  {
    category: 'Student Queries',
    prompts: [
      'Show unplaced DEPSTAR CSE students with CGPA > 8.5',
      'Find D2D students in CSPIT who are still unplaced',
      'Who has the highest CGPA in ECE at CSPIT?'
    ]
  },
  {
    category: 'Email Outreach',
    prompts: [
      'Draft a campus invite email to Google HR',
      'Draft a registration reminder to unplaced IT students'
    ]
  },
  {
    category: 'Analytics & Insights',
    prompts: [
      'Summarize Google India recruitment requirements',
      'Predict final placement rate for this season'
    ]
  }
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello Dr. Amit! I am your AI Placement Assistant. You can ask me to search the CHARUSAT student database, draft outreach campaigns, or query company criteria. What can I do for you today?',
      type: 'text'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);

  const chatLogsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatLogsRef.current) {
      chatLogsRef.current.scrollTop = chatLogsRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleCopyEmail = (text: string, msgId: number) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(msgId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleSendQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    // Append User Message
    const userMsg: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: queryText,
      type: 'text'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI response stream
    setTimeout(() => {
      let aiMsg: Message = {
        id: messages.length + 2,
        sender: 'ai',
        text: '',
        type: 'text'
      };

      const normalized = queryText.toLowerCase().trim();

      if (normalized.includes('unplaced depstar cse') && normalized.includes('8.5')) {
        aiMsg.text = 'I scanned the DEPSTAR student records and identified 2 unplaced Computer Science & Engineering (CSE) students with a CGPA exceeding 8.5:';
        aiMsg.type = 'table';
        aiMsg.tableData = [
          { name: 'Arpit Shah', rollNo: '24DCSE012', branch: 'CSE', cgpa: 8.82, status: 'Unplaced' },
          { name: 'Nisha Patel', rollNo: '24DCSE056', branch: 'CSE', cgpa: 8.65, status: 'Unplaced' }
        ];
      } else if (normalized.includes('d2d') && normalized.includes('cspit') && normalized.includes('unplaced')) {
        aiMsg.text = 'I identified 1 unplaced D2D (Diploma to Degree) student in the CSPIT registry matching your criteria:';
        aiMsg.type = 'table';
        aiMsg.tableData = [
          { name: 'Meet Patel', rollNo: 'D25DCE002', branch: 'CE', cgpa: 8.40, status: 'Unplaced' }
        ];
      } else if (normalized.includes('invite email to google')) {
        aiMsg.text = 'Here is a drafted recruitment drive invitation email tailored for Neha Saxena (Lead Talent Partner at Google India). It highlights key stats for DEPSTAR and CSPIT:';
        aiMsg.type = 'email';
        aiMsg.emailSubject = 'Invitation: Campus Recruitment Drive 2026 - CHARUSAT (DEPSTAR & CSPIT)';
        aiMsg.emailBody = `Subject: Invitation: Campus Recruitment Drive 2026 - CHARUSAT (DEPSTAR & CSPIT)

Dear Neha,

Hope you are doing well.

On behalf of the Training & Placement Cell at CHARUSAT, representing Devang Patel Institute (DEPSTAR) and Chandubhai S. Patel Institute (CSPIT), I would like to cordially invite Google India to conduct campus placement interviews for our 2026 graduating batch.

Key highlights of our current batch:
- Combined CSE/IT Pool: 385 highly trained engineering students.
- Average CGPA: 8.42 / 10.00
- Core Competency: React, Node.js, Python, Cloud Computing, and Algorithmic problem-solving.

We would be delighted to host Google India for a campus visit starting late August. Please let us know your preferred dates for a pre-placement talk and assessments.

Looking forward to your positive confirmation.

Warm regards,

Dr. Amit Das
Director, T&P Cell
CHARUSAT University
placement.dir@univ.edu`;
      } else if (normalized.includes('google') && normalized.includes('requirements')) {
        aiMsg.text = 'Google India historically focuses heavily on raw algorithmic problem-solving. Here is a summary of recruiter notes:\n\n- **CGPA Cutoff**: 8.0 Minimum.\n- **Focus Areas**: Advanced Data Structures, Algorithms (Dynamic Programming, Graphs), and core Operating System/Networking concepts.\n- **Feedback Summary**: Students excel in syntax but need more exposure to system design constraints.\n- **Action Recommended**: Schedule mock coding tests for ECE/CSE students prior to the August 12 Google drive.';
      } else if (normalized.includes('placement rate')) {
        aiMsg.text = 'Based on current hiring velocities (631 placed out of 842), company visit pipelines, and historical season curves, PlaceIntel AI models project a season-end final placement rate of **89.5%** for the combined institutions, pacing 4.1% ahead of the previous academic cycle.';
      } else {
        // Fallback response
        aiMsg.text = `I have received your query: "${queryText}". I am currently analyzing the CHARUSAT database registry. If this were connected to the PostgreSQL server, I would execute a semantic index search and return matching data here.`;
      }

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Placement Assistant</h1>
          <p className="page-subtitle">Interact with the database using natural language, compile resumes, and draft automated recruiter campaigns.</p>
        </div>
      </div>

      {/* Chat workspace layout */}
      <div className="ai-chat-layout">
        
        {/* Left Suggestions Pane */}
        <div className="chat-prompts-sidebar">
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', display: 'flex', gap: '4px', alignItems: 'center' }}>
              <MessageSquare size={16} style={{ color: 'var(--primary)' }} />
              Suggested Prompts
            </span>
            
            {suggestedPrompts.map((section, idx) => (
              <div key={idx} style={{ marginTop: idx > 0 ? 'var(--space-sm)' : '0' }}>
                <div className="prompt-section-title">{section.category}</div>
                <div className="prompt-chips-list">
                  {section.prompts.map((prompt, pIdx) => (
                    <button 
                      key={pIdx} 
                      className="prompt-chip"
                      onClick={() => setInputQuery(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Chat Arena */}
        <div className="chat-arena">
          
          {/* Arena Header */}
          <div className="chat-arena-header">
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
          <div className="chat-logs-area" ref={chatLogsRef}>
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}
              >
                <span className="chat-bubble-sender">
                  {msg.sender === 'user' ? 'Placement Officer' : 'PlaceIntel AI'}
                </span>
                
                {/* Standard Text */}
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {msg.text}
                </div>

                {/* Custom Structured Table Output */}
                {msg.type === 'table' && msg.tableData && (
                  <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)', marginTop: 'var(--space-md)' }}>
                    <div className="table-container">
                      <table className="custom-table" style={{ fontSize: '12px' }}>
                        <thead>
                          <tr>
                            <th>Student Name</th>
                            <th>Roll Number</th>
                            <th>Branch</th>
                            <th>CGPA</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {msg.tableData.map((row, rIdx) => (
                            <tr key={rIdx}>
                              <td style={{ fontWeight: '500' }}>{row.name}</td>
                              <td style={{ fontFamily: 'monospace' }}>{row.rollNo}</td>
                              <td>{row.branch}</td>
                              <td style={{ fontWeight: '600' }}>{row.cgpa.toFixed(2)}</td>
                              <td><span className="badge" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-secondary)', fontSize: '10px', padding: '1px 5px' }}>{row.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Custom Copyable Email Output */}
                {msg.type === 'email' && msg.emailBody && (
                  <div className="email-editor-card">
                    <div className="email-editor-header">
                      <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-secondary)' }}>Draft Invitation Message</span>
                      <button 
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '2px 8px', display: 'flex', gap: '4px', fontSize: '11px', backgroundColor: 'var(--card)' }}
                        onClick={() => handleCopyEmail(msg.emailBody || '', msg.id)}
                      >
                        {copiedMessageId === msg.id ? (
                          <>
                            <Check size={12} style={{ color: 'var(--accent)' }} />
                            <span style={{ color: 'var(--accent)' }}>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy Text</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="email-editor-body">
                      {msg.emailBody}
                    </div>
                  </div>
                )}

              </div>
            ))}

            {/* Stream Typing Indicator */}
            {isTyping && (
              <div className="chat-bubble ai">
                <span className="chat-bubble-sender">PlaceIntel AI</span>
                <div className="typing-dots">
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
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(inputQuery);
            }}
          >
            <div className="chat-input-wrapper">
              <input 
                type="text" 
                placeholder="Ask PlaceIntel AI (e.g. 'Show me unplaced CSPIT CSE students with CGPA > 8.5')..." 
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ padding: '10px 16px' }}
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
