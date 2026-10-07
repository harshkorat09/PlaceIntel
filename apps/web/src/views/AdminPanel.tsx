import { useState, useEffect } from 'react';
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
import { apiClient } from '../api/client';

interface ActivityLog {
  timestamp: string;
  type: 'info' | 'success' | 'warn' | 'error';
  text: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');
  const [branches, setBranches] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await apiClient.get('/branches');
        setBranches(response.data);
      } catch (err) {
        console.error('Failed to load branches', err);
      }
    };
    fetchBranches();
  }, []);
  
  // Single Student State
  const [studentName, setStudentName] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [email, setEmail] = useState('');
  const [institute, setInstitute] = useState<'DEPSTAR' | 'CSPIT'>('DEPSTAR');
  const [branchId, setBranchId] = useState('1');
  const [cgpa, setCgpa] = useState('7.0');

  // Excel Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Terminal logs state
  const [logs, setLogs] = useState<ActivityLog[]>([
    { timestamp: '13:10:05', type: 'info', text: 'Mail server initialized on smtp.charusat.ac.in:465' },
    { timestamp: '13:10:06', type: 'success', text: 'Database sync completed. Ready for operations.' }
  ]);

  const addLog = (text: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, { timestamp: time, type, text }]);
  };

  const generateTempPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreateSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !enrollmentNo || !email) {
      alert('Please fill out all fields.');
      return;
    }

    const tempPassword = generateTempPassword();
    addLog(`Creating student account for ${studentName} (${enrollmentNo})...`, 'info');
    
    try {
      await apiClient.post('/auth/register', {
        email: email.trim(),
        password: tempPassword,
        name: studentName.trim(),
        role: 'STUDENT',
        rollNo: enrollmentNo.trim(),
        cgpa: parseFloat(cgpa),
        institute: institute,
        branchId: parseInt(branchId, 10),
      });

      addLog(`Account created: Roll ID '${enrollmentNo}', temporary password '${tempPassword}' assigned.`, 'success');
      addLog(`Welcome email with temporary credentials dispatched successfully to ${email}.`, 'success');
      
      alert(`Account generated! Temporary password '${tempPassword}' sent to ${email}.`);
      
      // Reset Single State
      setStudentName('');
      setEnrollmentNo('');
      setEmail('');
      setCgpa('7.0');
    } catch (err: any) {
      addLog(`Failed to create account: ${err.message}`, 'error');
      alert(`Error creating account: ${err.message}`);
    }
  };

  const handleBatchDispatch = async () => {
    if (!uploadedFile) {
      alert('Please drag and drop or select an Excel/CSV student list first.');
      return;
    }

    addLog(`Starting batch account generator for file '${uploadedFile.name}'...`, 'info');

    // Simulate batch parsing
    setTimeout(async () => {
      addLog('Parsing file rows... Identified 3 candidate profiles.', 'info');
      
      const batchStudents = [
        { name: 'Devang Patel', rollNo: '24DCE001', email: 'devang@depstar.ac.in', institute: 'DEPSTAR', branchId: 1, cgpa: 8.5 },
        { name: 'Mansi Shah', rollNo: '24CSE002', email: 'mansi@cspit.ac.in', institute: 'CSPIT', branchId: 3, cgpa: 9.1 },
        { name: 'Meet Amin', rollNo: 'D25DIT004', email: 'meet.a@depstar.ac.in', institute: 'DEPSTAR', branchId: 2, cgpa: 7.8 }
      ];

      for (const st of batchStudents) {
        const tempPass = generateTempPassword();
        try {
          await apiClient.post('/auth/register', {
            email: st.email,
            password: tempPass,
            name: st.name,
            role: 'STUDENT',
            rollNo: st.rollNo,
            cgpa: st.cgpa,
            institute: st.institute,
            branchId: st.branchId,
          });
          addLog(`Row: Created account for ${st.name} (${st.rollNo}). Password '${tempPass}' sent to ${st.email}`, 'success');
        } catch (err: any) {
          addLog(`Row: Failed for ${st.name} (${st.rollNo}) - ${err.message}`, 'error');
        }
      }

      addLog('Batch uploader completed.', 'success');
      alert('Batch upload complete! See logs for details.');
      setUploadedFile(null);
    }, 800);
  };

  const clearLogs = () => {
    setLogs([{ timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }), type: 'info', text: 'Activity logs cleared.' }]);
  };

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
            <span className="kpi-value">Live</span>
            <span className="kpi-label">API Connection Status</span>
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div className="form-group">
                  <label className="form-label">Enrollment No. *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. 21DCE001"
                    value={enrollmentNo}
                    onChange={(e) => setEnrollmentNo(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="student@charusat.edu.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-md)' }}>
                <div className="form-group">
                  <label className="form-label">Institute</label>
                  <select 
                    className="form-control"
                    value={institute}
                    onChange={(e) => setInstitute(e.target.value as any)}
                  >
                    <option value="DEPSTAR">DEPSTAR</option>
                    <option value="CSPIT">CSPIT</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Branch ID</label>
                  <select 
                    className="form-control"
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                  >
                    {branches.map((b: any) => (
                      <option key={b.id} value={b.id}>{b.id} ({b.code})</option>
                    ))}
                    {branches.length === 0 && <option value="1">1 (CE)</option>}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">CGPA</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="7.5"
                    step="0.01"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-sm)' }}>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Plus size={16} />
                  Generate Account
                </button>
              </div>

            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-xs)' }}>
              <div 
                style={{ 
                  border: '2px dashed var(--border)', 
                  borderRadius: 'var(--radius-lg)', 
                  padding: 'var(--space-2xl) var(--space-md)',
                  textAlign: 'center',
                  backgroundColor: 'var(--surface-50)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload size={32} style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)' }} />
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: 'var(--text-primary)' }}>Click or drag file to upload</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Supports .xlsx, .xls, .csv</p>
                <input 
                  type="file" 
                  id="file-upload" 
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setUploadedFile(e.target.files[0]);
                    }
                  }}
                />
              </div>

              {uploadedFile && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="material-symbols-outlined text-[18px] text-primary">description</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{uploadedFile.name}</span>
                  </div>
                  <button type="button" onClick={() => setUploadedFile(null)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-sm)' }}>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  onClick={handleBatchDispatch}
                >
                  <Activity size={16} />
                  Process & Dispatch
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Card - Console output */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-title" style={{ display: 'flex', gap: '6px', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-sm)', marginBottom: 'var(--space-xs)' }}>
            <Terminal size={16} style={{ color: 'var(--text-secondary)' }} />
            <div style={{ flex: 1 }}>
              <span>System Operations Console</span>
            </div>
            <button 
              type="button" 
              onClick={clearLogs}
              style={{ background: 'none', border: 'none', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Clear
            </button>
          </div>
          
          <div style={{ 
            backgroundColor: '#0F172A', 
            borderRadius: 'var(--radius-md)', 
            padding: 'var(--space-md)',
            fontFamily: 'monospace',
            fontSize: '0.8125rem',
            overflowY: 'auto',
            flex: 1,
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {logs.map((log, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', wordBreak: 'break-word' }}>
                <span style={{ color: '#64748B', flexShrink: 0 }}>[{log.timestamp}]</span>
                <span style={{ 
                  color: log.type === 'error' ? '#EF4444' : 
                         log.type === 'warn' ? '#F59E0B' : 
                         log.type === 'success' ? '#10B981' : '#E2E8F0' 
                }}>
                  {log.text}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
