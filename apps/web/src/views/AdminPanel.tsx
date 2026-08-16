import { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Terminal, 
  UserPlus, 
  Activity, 
  Users, 
  Database,
  Trash2
} from 'lucide-react';

interface ActivityLog {
  timestamp: string;
  type: 'info' | 'success' | 'warn' | 'error';
  text: string;
}

interface StudentCredential {
  enrollmentNo: string;
  password: string;
  isFirstTime: boolean;
  name: string;
  email: string;
  institute: string;
  branch: string;
  cgpa: number;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');
  
  // Single Student State
  const [studentName, setStudentName] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [email, setEmail] = useState('');
  const [institute, setInstitute] = useState<'DEPSTAR' | 'CSPIT'>('DEPSTAR');
  const [branch, setBranch] = useState('CE');

  // Excel Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Terminal logs state
  const [logs, setLogs] = useState<ActivityLog[]>([
    { timestamp: '13:10:05', type: 'info', text: 'Mail server initialized on smtp.charusat.ac.in:465' },
    { timestamp: '13:10:06', type: 'success', text: 'Database sync completed. 842 Student accounts active.' }
  ]);

  const addLog = (text: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, { timestamp: time, type, text }]);
  };

  // Helper to generate a unique random password
  const generateTempPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'; // Omitted similar looking chars (O, 0, l, 1, I)
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreateSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !enrollmentNo || !email) {
      alert('Please fill out all fields.');
      return;
    }

    const tempPassword = generateTempPassword();
    addLog(`Creating student account for ${studentName} (${enrollmentNo})...`, 'info');
    
    setTimeout(() => {
      // Sync with localStorage credentials database
      const stored = localStorage.getItem('placeintel_student_credentials');
      const credsList: StudentCredential[] = stored ? JSON.parse(stored) : [];
      
      // Filter out existing and append new
      const filtered = credsList.filter(c => c.enrollmentNo.toUpperCase() !== enrollmentNo.trim().toUpperCase());
      const updated = [
        ...filtered,
        { 
          enrollmentNo: enrollmentNo.trim(), 
          password: tempPassword, 
          isFirstTime: true,
          name: studentName.trim(),
          email: email.trim(),
          institute: institute,
          branch: branch,
          cgpa: 0
        }
      ];
      localStorage.setItem('placeintel_student_credentials', JSON.stringify(updated));

      addLog(`Account created: Roll ID '${enrollmentNo}', temporary password '${tempPassword}' assigned.`, 'success');
      addLog(`Welcome email with temporary credentials dispatched successfully to ${email}.`, 'success');
      
      alert(`Account generated! Temporary password '${tempPassword}' sent to ${email}.`);
      
      // Reset Single State
      setStudentName('');
      setEnrollmentNo('');
      setEmail('');
    }, 1000);
  };

  const handleBatchDispatch = () => {
    if (!uploadedFile) {
      alert('Please drag and drop or select an Excel/CSV student list first.');
      return;
    }

    addLog(`Starting batch account generator for file '${uploadedFile.name}'...`, 'info');

    // Simulate batch dispatch logs
    setTimeout(() => {
      addLog('Parsing file rows... Identified 3 candidate profiles.', 'info');
    }, 800);

    const batchStudents = [
      { name: 'Devang Patel', rollNo: '24DCE001', email: 'devang@depstar.ac.in', institute: 'DEPSTAR', branch: 'CE' },
      { name: 'Mansi Shah', rollNo: '24CSE002', email: 'mansi@cspit.ac.in', institute: 'CSPIT', branch: 'CSE' },
      { name: 'Meet Amin', rollNo: 'D25DIT004', email: 'meet.a@depstar.ac.in', institute: 'DEPSTAR', branch: 'IT' }
    ];

    setTimeout(() => {
      const stored = localStorage.getItem('placeintel_student_credentials');
      let credsList: StudentCredential[] = stored ? JSON.parse(stored) : [];

      batchStudents.forEach(st => {
        const tempPass = generateTempPassword();
        
        // Remove duplicates and push
        credsList = credsList.filter(c => c.enrollmentNo.toUpperCase() !== st.rollNo.toUpperCase());
        credsList.push({ 
          enrollmentNo: st.rollNo, 
          password: tempPass, 
          isFirstTime: true,
          name: st.name,
          email: st.email,
          institute: st.institute,
          branch: st.branch,
          cgpa: 0
        });

        addLog(`Row: Created account for ${st.name} (${st.rollNo}). Password '${tempPass}' sent to ${st.email}`, 'success');
      });

      localStorage.setItem('placeintel_student_credentials', JSON.stringify(credsList));
      addLog('Batch uploader completed. 3 welcome emails sent, 0 failures.', 'success');
      
      alert('Batch upload complete! Student accounts generated with unique temporary passwords in SMTP logs.');
      setUploadedFile(null);
    }, 1800);
  };

  const clearLogs = () => {
    setLogs([{ timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }), type: 'info', text: 'Activity logs cleared.' }]);
  };

  // Branch Selector mapping
  const branchOptions = institute === 'DEPSTAR' 
    ? ['CE', 'CSE', 'IT'] 
    : ['CE', 'IT', 'CSE', 'AI & ML', 'EC', 'EE', 'ME', 'CL'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin Management</h1>
          <p className="page-subtitle">Configure student portal databases, trigger batch email dispatches, and check system logs.</p>
        </div>
      </div>

      {/* Admin stats */}
      <div className="applications-metrics-grid">
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Users size={20} />
          </div>
          <div>
            <span className="kpi-value">842</span>
            <span className="kpi-label">Student Portal Accounts</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)' }}>
            <Database size={20} />
          </div>
          <div>
            <span className="kpi-value">Active</span>
            <span className="kpi-label">Mail SMTP Server Status</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-secondary)' }}>
            <Activity size={20} />
          </div>
          <div>
            <span className="kpi-value">98.4%</span>
            <span className="kpi-label">AI CV Parser Success Rate</span>
          </div>
        </div>

      </div>

      {/* Main split grid */}
      <div className="analytics-grid-two">
        
        {/* Left Card - Creator forms */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="card-title" style={{ display: 'flex', gap: '6px', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-sm)' }}>
            <UserPlus size={16} style={{ color: 'var(--primary)' }} />
            <span>Create Student Accounts</span>
          </div>

          {/* Form Tabs */}
          <div className="notifications-tabs-bar">
            <button 
              className={`notifications-tab-btn ${activeTab === 'single' ? 'active' : ''}`}
              onClick={() => setActiveTab('single')}
            >
              Single Candidate Register
            </button>
            <button 
              className={`notifications-tab-btn ${activeTab === 'batch' ? 'active' : ''}`}
              onClick={() => setActiveTab('batch')}
            >
              Excel/CSV Batch Import
            </button>
          </div>

          {activeTab === 'single' ? (
            <form onSubmit={handleCreateSingle} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-xs)' }}>
              
              <div className="form-group">
                <label className="form-label">Student Name *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Aditya Patel"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Enrollment Number (Roll ID) *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. 24DCSE045 or D25CE010"
                  value={enrollmentNo}
                  onChange={(e) => setEnrollmentNo(e.target.value)}
                  style={{ fontFamily: 'monospace', fontWeight: '600' }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Registered Email Address *</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="student@depstar.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">University Institute</label>
                <select 
                  className="form-control"
                  value={institute}
                  onChange={(e) => {
                    setInstitute(e.target.value as any);
                    setBranch(e.target.value === 'DEPSTAR' ? 'CE' : 'CE');
                  }}
                >
                  <option value="DEPSTAR">DEPSTAR</option>
                  <option value="CSPIT">CSPIT</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Engineering Branch</label>
                <select 
                  className="form-control"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  {branchOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '10px', marginTop: 'var(--space-sm)' }}
              >
                <Plus size={14} />
                <span>Create Account & Send Credentials</span>
              </button>

            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-xs)' }}>
              
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Upload a structured Excel sheet or CSV list of candidates. PlaceIntel will generate logins, assign unique temporary passwords, and send invite emails automatically.
              </p>

              {/* Drag drop area */}
              <div 
                style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-xl)', textAlign: 'center', backgroundColor: 'var(--background)', cursor: 'pointer', transition: 'border-color var(--transition-fast)' }}
                onClick={() => {
                  // Simulate file selection
                  const mockFile = new File(['student_list.xlsx'], 'AY_2026_Candidate_Master.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                  setUploadedFile(mockFile);
                  addLog(`Selected excel file: '${mockFile.name}' for batch parse.`, 'info');
                }}
              >
                <Upload size={32} style={{ color: 'var(--text-tertiary)', margin: '0 auto var(--space-md)' }} />
                {uploadedFile ? (
                  <div>
                    <span style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--primary)', display: 'block' }}>{uploadedFile.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>{(uploadedFile.size / 1024).toFixed(1)} KB · Ready to Import</span>
                  </div>
                ) : (
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', display: 'block' }}>Drag & Drop Excel List</span>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '4px', display: 'block' }}>or click to browse local files (XLSX, CSV)</span>
                  </div>
                )}
              </div>

              {uploadedFile && (
                <button 
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '10px' }}
                  onClick={handleBatchDispatch}
                >
                  <Plus size={14} />
                  <span>Batch Dispatch Credentials</span>
                </button>
              )}

            </div>
          )}
        </div>

        {/* Right Card - Live Activity logs */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-sm)' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <Terminal size={16} style={{ color: 'var(--accent)' }} />
              <span>Mail Server Activity logs</span>
            </div>
            <button className="icon-btn text-secondary" onClick={clearLogs} title="Clear terminal logs" style={{ padding: '4px' }}>
              <Trash2 size={13} />
            </button>
          </div>

          {/* Terminal log panel */}
          <div style={{ backgroundColor: '#0C0A09', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px', fontFamily: 'monospace', fontSize: '12px', height: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', color: '#A8A29E' }}>
            {logs.map((log, idx) => {
              let logColor = '#A8A29E'; // Info
              if (log.type === 'success') logColor = '#22C55E'; // Green
              else if (log.type === 'warn') logColor = '#EAB308'; // Amber
              else if (log.type === 'error') logColor = '#EF4444'; // Red

              return (
                <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', borderBottom: '1px solid #1C1917', paddingBottom: '4px' }}>
                  <span style={{ color: '#78716C' }}>[{log.timestamp}]</span>
                  <span style={{ color: logColor, flex: 1, wordBreak: 'break-all' }}>{log.text}</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
            <Activity size={12} className="text-tertiary" />
            <span>Connection secured. Live telemetry streaming active over WebSockets.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
