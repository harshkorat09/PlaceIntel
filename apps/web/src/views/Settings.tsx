import { useState } from 'react';
import { 
  User,
  Building,
  Mail,
  Phone,
  Bell,
  Settings as SettingsIcon,
  CheckCircle2
} from 'lucide-react';

export default function Settings() {
  // Profile state
  const [name, setName] = useState('Dr. Amit Das');
  const [role, setRole] = useState('Director, Training & Placement');
  const [email, setEmail] = useState('placement.dir@univ.edu');
  const [phone, setPhone] = useState('+91 98765 43210');

  // University state
  const [academicYear, setAcademicYear] = useState('2026');
  const [defaultCutoff, setDefaultCutoff] = useState('7.5');
  const [d2dSemester, setD2dSemester] = useState('3');

  // Integration toggles
  const [autoAiParser, setAutoAiParser] = useState(true);
  const [deadlineAlerts, setDeadlineAlerts] = useState(true);
  const [recruiterMessages, setRecruiterMessages] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);

  // Status flags for save feedback
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Portal Settings</h1>
          <p className="page-subtitle">Configure placement coordinators profile, define academic year cycles, and set system automation triggers.</p>
        </div>
      </div>

      <div className="settings-layout">
        
        {/* Left Column - Profile Settings */}
        <div className="settings-col-left">
          
          {/* Profile Card */}
          <div className="card" style={{ textAlign: 'center', position: 'relative' }}>
            
            {profileSuccess && (
              <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', backgroundColor: 'var(--accent-light)', color: 'var(--accent)', fontSize: '12px', padding: '6px 12px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <CheckCircle2 size={12} />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <div className="avatar-lg" style={{ margin: 'var(--space-md) auto var(--space-sm)', width: '72px', height: '72px', fontSize: '24px' }}>
              AD
            </div>

            <h3 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>{name}</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{role}</span>

            <form onSubmit={handleSaveProfile} style={{ textAlign: 'left', marginTop: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <User size={13} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--text-tertiary)' }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ paddingLeft: '32px' }}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Role Designation *</label>
                <div style={{ position: 'relative' }}>
                  <Building size={13} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--text-tertiary)' }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ paddingLeft: '32px' }}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={13} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--text-tertiary)' }} />
                  <input 
                    type="email" 
                    className="form-control" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: '32px' }}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Contact Number *</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={13} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--text-tertiary)' }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ paddingLeft: '32px' }}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 'var(--space-xs)' }}
              >
                Save Profile
              </button>

            </form>
          </div>

        </div>

        {/* Right Column - University & Integration Settings */}
        <div className="settings-col-right">
          
          <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            
            {/* University Configuration Card */}
            <div className="card">
              <div className="card-title" style={{ display: 'flex', gap: '6px', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                <SettingsIcon size={16} style={{ color: 'var(--primary)' }} />
                <span>University Configurations</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Active Academic Year</label>
                    <select 
                      className="form-control"
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value)}
                    >
                      <option value="2026">AY 2025-2026 (Active)</option>
                      <option value="2025">AY 2024-2025</option>
                      <option value="2024">AY 2023-2024</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Base CGPA Cutoff Threshold</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      min="0"
                      max="10"
                      className="form-control" 
                      value={defaultCutoff}
                      onChange={(e) => setDefaultCutoff(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">D2D Direct Admission Semester Default</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={d2dSemester}
                    onChange={(e) => setD2dSemester(e.target.value)}
                  />
                  <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                    Defines the starting semester for D2D student credit calculations (e.g. 3rd Semester / 2nd Year).
                  </p>
                </div>

              </div>
            </div>

            {/* Automation & Systems Preferences Card */}
            <div className="card" style={{ position: 'relative' }}>
              
              {settingsSuccess && (
                <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', backgroundColor: 'var(--accent-light)', color: 'var(--accent)', fontSize: '12px', padding: '6px 12px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <CheckCircle2 size={12} />
                  <span>System settings updated successfully!</span>
                </div>
              )}

              <div className="card-title" style={{ display: 'flex', gap: '6px', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                <Bell size={16} style={{ color: 'var(--accent)' }} />
                <span>Automation & Portal Settings</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                
                {/* Toggle 1 */}
                <div className="toggle-switch-row">
                  <div style={{ flex: 1, paddingRight: 'var(--space-md)' }}>
                    <span style={{ fontWeight: '600', fontSize: '13.5px', color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                      Auto AI Resume CV Parser
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                      Automatically parse skills badges and keywords when a candidate uploads their PDF resume file.
                    </span>
                  </div>
                  <label className="toggle-switch-control">
                    <input 
                      type="checkbox" 
                      className="switch-control-input"
                      checked={autoAiParser}
                      onChange={(e) => setAutoAiParser(e.target.checked)}
                    />
                    <span className="switch-control-slider"></span>
                  </label>
                </div>

                {/* Toggle 2 */}
                <div className="toggle-switch-row">
                  <div style={{ flex: 1, paddingRight: 'var(--space-md)' }}>
                    <span style={{ fontWeight: '600', fontSize: '13.5px', color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                      Drive Deadline Alerts
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                      Send portal notifications and email warnings to eligible unplaced profiles 24 hours prior to drive close.
                    </span>
                  </div>
                  <label className="toggle-switch-control">
                    <input 
                      type="checkbox" 
                      className="switch-control-input"
                      checked={deadlineAlerts}
                      onChange={(e) => setDeadlineAlerts(e.target.checked)}
                    />
                    <span className="switch-control-slider"></span>
                  </label>
                </div>

                {/* Toggle 3 */}
                <div className="toggle-switch-row">
                  <div style={{ flex: 1, paddingRight: 'var(--space-md)' }}>
                    <span style={{ fontWeight: '600', fontSize: '13.5px', color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                      Recruiter Message Alerts
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                      Notify the Training & Placement coordinator when a registered employer logs feedback notes.
                    </span>
                  </div>
                  <label className="toggle-switch-control">
                    <input 
                      type="checkbox" 
                      className="switch-control-input"
                      checked={recruiterMessages}
                      onChange={(e) => setRecruiterMessages(e.target.checked)}
                    />
                    <span className="switch-control-slider"></span>
                  </label>
                </div>

                {/* Toggle 4 */}
                <div className="toggle-switch-row">
                  <div style={{ flex: 1, paddingRight: 'var(--space-md)' }}>
                    <span style={{ fontWeight: '600', fontSize: '13.5px', color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                      Weekly Performance Summaries
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                      Compile and email a weekly placement index report directly to the Director and Registrar.
                    </span>
                  </div>
                  <label className="toggle-switch-control">
                    <input 
                      type="checkbox" 
                      className="switch-control-input"
                      checked={weeklySummary}
                      onChange={(e) => setWeeklySummary(e.target.checked)}
                    />
                    <span className="switch-control-slider"></span>
                  </label>
                </div>

              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-lg)' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ padding: '8px 24px' }}
                >
                  Save Settings
                </button>
              </div>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}
