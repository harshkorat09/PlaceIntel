import { useState } from 'react';
import { 
  Bell, 
  AlertCircle,
  Mail,
  Send,
  Volume2,
  Building,
  Check,
  Trash2,
  Cpu
} from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  description: string;
  category: 'alert' | 'broadcast' | 'recruiter' | 'ai';
  isUnread: boolean;
  timestamp: string;
}

export const initialNotifications: Notification[] = [
  {
    id: 1,
    title: 'Google SDE Registration Closing',
    description: 'Registration window closes in 2 hours. 12 students remain in drafts. Auto-send alert triggered.',
    category: 'alert',
    isUnread: true,
    timestamp: '12 mins ago'
  },
  {
    id: 2,
    title: 'Microsoft PM shortlists uploaded',
    description: 'Recruiting team released initial profile shortlists. 8 candidates advanced to teams interview round.',
    category: 'recruiter',
    isUnread: true,
    timestamp: '1 hour ago'
  },
  {
    id: 3,
    title: 'AutoCAD Bootcamp Broadcast',
    description: 'Announcement dispatch sent to all CSPIT Mechanical engineering students regarding workshop schedules.',
    category: 'broadcast',
    isUnread: false,
    timestamp: '3 hours ago'
  },
  {
    id: 4,
    title: 'Resume Parser Batch Completed',
    description: 'AI engine parsed 32 uploaded student resume files. Candidate skills database refreshed successfully.',
    category: 'ai',
    isUnread: false,
    timestamp: '5 hours ago'
  },
  {
    id: 5,
    title: 'CGPA Cutoff Warning: Neha Patel',
    description: 'Neha Patel (24CSE102) flagged as ineligible for Google SDE drive (CGPA 7.90 < Cutoff 8.00).',
    category: 'alert',
    isUnread: true,
    timestamp: 'Yesterday'
  },
  {
    id: 6,
    title: 'D2D Resume Update notice',
    description: 'Reminder broadcast pushed to all unplaced D2D students (DEPSTAR & CSPIT) to upload 3rd sem credits.',
    category: 'broadcast',
    isUnread: false,
    timestamp: '2 days ago'
  }
];

export default function Notifications({ role = 'officer' }: { role?: 'officer' | 'student' }) {
  const isAdmin = role === 'officer';
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const stored = localStorage.getItem('placeintel_announcements');
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem('placeintel_announcements', JSON.stringify(initialNotifications));
    return initialNotifications;
  });
  const [activeTab, setActiveTab] = useState<'all' | 'alert' | 'broadcast' | 'recruiter' | 'ai'>('all');

  // Broadcast Composer State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('All');
  const [broadcastChannel, setBroadcastChannel] = useState('Portal');
  const [broadcastBody, setBroadcastBody] = useState('');

  // Handle Mark All as Read
  const handleMarkAllRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, isUnread: false }));
      localStorage.setItem('placeintel_announcements', JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleRead = (id: number) => {
    setNotifications(prev => {
      const updated = prev.map(n => {
        if (n.id === id) {
          return { ...n, isUnread: !n.isUnread };
        }
        return n;
      });
      localStorage.setItem('placeintel_announcements', JSON.stringify(updated));
      return updated;
    });
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem('placeintel_announcements', JSON.stringify(updated));
      return updated;
    });
  };

  // Submit Broadcast Announcement
  const handlePublishBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody) {
      alert('Please fill out all required fields.');
      return;
    }

    const newNotice: Notification = {
      id: notifications.length + 1,
      title: broadcastTitle,
      description: `Target: ${broadcastTarget} via ${broadcastChannel}. ${broadcastBody}`,
      category: 'broadcast',
      isUnread: false,
      timestamp: 'Just now'
    };

    const updated = [newNotice, ...notifications];
    setNotifications(updated);
    localStorage.setItem('placeintel_announcements', JSON.stringify(updated));
    setBroadcastTitle('');
    setBroadcastBody('');
    alert(`Successfully broadcasted "${broadcastTitle}" to ${broadcastTarget} students!`);
  };

  // Filtered Notifications List — students only see broadcasts
  const filteredNotifs = notifications.filter(n => {
    // Students should only see broadcast notifications (not CGPA warnings, AI logs, recruiter internals)
    if (!isAdmin && n.category !== 'broadcast') return false;
    if (activeTab === 'all') return true;
    return n.category === activeTab;
  });

  // Calculate Metrics
  const unreadCount = notifications.filter(n => n.isUnread).length;
  const broadcastCount = notifications.filter(n => n.category === 'broadcast').length;
  const aiSuccessCount = 1024; // Mock parsed count

  const renderIcon = (category: string) => {
    switch (category) {
      case 'alert':
        return <AlertCircle size={16} style={{ color: 'var(--danger)' }} />;
      case 'broadcast':
        return <Volume2 size={16} style={{ color: 'var(--accent)' }} />;
      case 'recruiter':
        return <Building size={16} style={{ color: 'var(--primary)' }} />;
      default:
        return <Cpu size={16} style={{ color: 'var(--text-secondary)' }} />;
    }
  };

  const renderIconContainerBg = (category: string) => {
    switch (category) {
      case 'alert':
        return 'var(--danger-light)';
      case 'broadcast':
        return 'rgba(16, 185, 129, 0.1)';
      case 'recruiter':
        return 'var(--primary-light)';
      default:
        return 'var(--secondary-light)';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Notifications & Broadcasts</h1>
          <p className="page-subtitle">Track real-time system warnings, review recruiter status changes, and dispatch notices to student groups.</p>
        </div>
        {isAdmin && (
          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
          >
            <Check size={14} />
            Mark All as Read
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <div className="applications-metrics-grid">
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger)' }}>
            <Bell size={20} />
          </div>
          <div>
            <span className="kpi-value">{unreadCount}</span>
            <span className="kpi-label">Unread System Alerts</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)' }}>
            <Volume2 size={20} />
          </div>
          <div>
            <span className="kpi-value">{broadcastCount}</span>
            <span className="kpi-label">Total Student Broadcasts</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Mail size={20} />
          </div>
          <div>
            <span className="kpi-value">550</span>
            <span className="kpi-label">Campaign Emails Sent</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-secondary)' }}>
            <Cpu size={20} />
          </div>
          <div>
            <span className="kpi-value">{aiSuccessCount}</span>
            <span className="kpi-label">AI Resumes Parsed</span>
          </div>
        </div>

      </div>

      {/* Workspace split layout */}
      <div className="notifications-layout">
        
        {/* Left Feed Pane */}
        <div className="notifications-feed-pane">
          
          {/* Tabs bar — show all tabs for admin, only relevant for students */}
          <div className="notifications-tabs-bar">
            <button className={`notifications-tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>{isAdmin ? 'All Alerts' : 'All Notices'}</button>
            {isAdmin && <button className={`notifications-tab-btn ${activeTab === 'alert' ? 'active' : ''}`} onClick={() => setActiveTab('alert')}>System Warnings</button>}
            <button className={`notifications-tab-btn ${activeTab === 'broadcast' ? 'active' : ''}`} onClick={() => setActiveTab('broadcast')}>Student Broadcasts</button>
            {isAdmin && <button className={`notifications-tab-btn ${activeTab === 'recruiter' ? 'active' : ''}`} onClick={() => setActiveTab('recruiter')}>Recruiter Updates</button>}
            {isAdmin && <button className={`notifications-tab-btn ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>AI Parser Logs</button>}
          </div>

          {/* Cards List feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {filteredNotifs.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
                <Check size={32} style={{ color: 'var(--accent)', margin: '0 auto var(--space-md)' }} />
                <h3>Your feed is completely clear!</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-xs)', fontSize: '13px' }}>No active notifications found under this category tab.</p>
              </div>
            ) : (
              filteredNotifs.map(notif => (
                <div 
                  key={notif.id}
                  className={`notification-card ${notif.isUnread ? 'unread' : ''}`}
                  onClick={() => handleToggleRead(notif.id)}
                >
                  {/* Category icon */}
                  <div className="notification-icon-container" style={{ backgroundColor: renderIconContainerBg(notif.category) }}>
                    {renderIcon(notif.category)}
                  </div>

                  {/* Body details */}
                  <div style={{ flex: 1, minWidth: 0, paddingRight: 'var(--space-lg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600', fontSize: '13.5px', color: 'var(--text-primary)' }}>{notif.title}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{notif.timestamp}</span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{notif.description}</p>
                  </div>

                  {/* Unread blue dot */}
                  {notif.isUnread && <div className="unread-indicator-dot"></div>}

                  {/* Actions — admin only */}
                  {isAdmin && (
                    <button 
                      className="icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNotification(notif.id);
                      }}
                      style={{ position: 'absolute', bottom: 'var(--space-md)', right: 'var(--space-md)', opacity: 0.6, padding: '4px' }}
                      title="Dismiss notification"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}

                </div>
              ))
            )}
          </div>

        </div>

        {/* Right Announcement Composer Panel — admin only */}
        {isAdmin && (
          <div className="card composer-sidebar" style={{ position: 'static', border: '1px solid var(--border)', boxShadow: 'none' }}>
          <div className="card-title" style={{ display: 'flex', gap: '6px', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-sm)' }}>
            <Volume2 size={16} style={{ color: 'var(--primary)' }} />
            <span>Create Student Announcement</span>
          </div>

          <form onSubmit={handlePublishBroadcast} style={{ marginTop: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            
            <div className="form-group">
              <label className="form-label">Notice Title *</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Google Interview Guidelines"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Student Segment *</label>
              <select 
                className="form-control"
                value={broadcastTarget}
                onChange={(e) => setBroadcastTarget(e.target.value)}
              >
                <option value="All Students">All Registered Candidates</option>
                <option value="Unplaced Students">Unplaced Candidates Only</option>
                <option value="DEPSTAR Candidates">DEPSTAR Candidates (CE/CSE/IT)</option>
                <option value="CSPIT Candidates">CSPIT Candidates (All 8 branches)</option>
                <option value="D2D Students">D2D Students Only</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Dispatch Channel *</label>
              <select 
                className="form-control"
                value={broadcastChannel}
                onChange={(e) => setBroadcastChannel(e.target.value)}
              >
                <option value="Portal Banner">Portal Banner Alert</option>
                <option value="Portal & Email notification">Portal & Email reminder</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Announcement Text Body *</label>
              <textarea 
                className="form-control"
                rows={4}
                placeholder="Write notice text instructions to display on student portal interfaces..."
                value={broadcastBody}
                onChange={(e) => setBroadcastBody(e.target.value)}
                required
                style={{ fontFamily: 'var(--font-sans)', resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 'var(--space-sm)' }}
            >
              <Send size={14} />
              <span>Broadcast Announcement</span>
            </button>

          </form>
        </div>
        )}

      </div>

    </div>
  );
}
