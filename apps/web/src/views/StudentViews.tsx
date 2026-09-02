import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  ArrowUpRight, 
  Sparkles, 
  Activity, 
  Briefcase, 
  AlertCircle, 
  Send, 
  Cpu, 
  Upload,
  Lock
} from 'lucide-react';
import { apiClient } from '../api/client';

interface StudentViewsProps {
  studentId: string;
}

interface Drive {
  id: number;
  companyName: string;
  position: string;
  ctc: number;
  deadline: string;
  cgpaCutoff: number;
  eligibleBranches: string[];
  status: string;
  activeRound: string;
  appliedCount: number;
  shortlistedCount: number;
  offeredCount: number;
  skills: string[];
}

interface Application {
  id: number;
  studentName: string;
  rollNo: string;
  email: string;
  institute: 'DEPSTAR' | 'CSPIT';
  branch: string;
  cgpa: number;
  driveCompany: string;
  driveRole: string;
  driveCutoff: number;
  drivePackage: number;
  status: 'Applied' | 'Interviewing' | 'Selected' | 'Rejected';
  appliedDate: string;
  timeline: { date: string; stage: string; note: string }[];
}

// Student Mock database matching credentials details
const studentDatabase: Record<string, { name: string; cgpa: number; branch: string; institute: 'DEPSTAR' | 'CSPIT'; email: string; phone: string }> = {
  '24DCSE045': { name: 'Aditya Vardhan', cgpa: 8.72, branch: 'CSE', institute: 'DEPSTAR', email: 'aditya.v@depstar.ac.in', phone: '+91 98989 12345' },
  'D25CSE018': { name: 'Riddhi Shah', cgpa: 9.15, branch: 'CSE', institute: 'CSPIT', email: 'riddhi.s@cspit.ac.in', phone: '+91 99778 88665' },
  '24DCE001': { name: 'Devang Patel', cgpa: 8.45, branch: 'CE', institute: 'DEPSTAR', email: 'devang@depstar.ac.in', phone: '+91 90909 88877' }
};

export const getStudentData = (id: string) => {
  const stored = localStorage.getItem('placeintel_student_credentials');
  if (stored) {
    const credsList = JSON.parse(stored);
    const matched = credsList.find((c: any) => c.enrollmentNo.toUpperCase() === id.toUpperCase());
    if (matched && matched.name) {
      return {
        name: matched.name,
        cgpa: matched.cgpa || 0,
        branch: matched.branch || 'CE',
        institute: matched.institute || 'DEPSTAR',
        email: matched.email,
        phone: '+91 98989 00000', // Default phone
        skills: []
      };
    }
  }

  // Fallback for hardcoded test accounts if not in localStorage
  const record = studentDatabase[id.toUpperCase()];
  if (record) return { ...record, skills: [] };

  const isDepstar = id.toUpperCase().includes('D');
  let branch = 'CSE';
  if (id.toUpperCase().includes('CE')) branch = 'CE';
  else if (id.toUpperCase().includes('IT')) branch = 'IT';
  
  return {
    name: 'New Student',
    cgpa: 0,
    branch: branch,
    institute: (isDepstar ? 'DEPSTAR' : 'CSPIT') as 'DEPSTAR' | 'CSPIT',
    email: `student.${id.toLowerCase()}@charusat.edu.in`,
    phone: '+91 00000 00000',
    skills: []
  };
};

/* ============================================================================
   1. STUDENT DASHBOARD
   ============================================================================ */
export function StudentDashboard({ studentId }: StudentViewsProps) {
  const student = getStudentData(studentId);
  const [apps, setApps] = useState<Application[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  
  useEffect(() => {
    const storedApps = localStorage.getItem('placeintel_student_applications');
    if (storedApps) {
      setApps(JSON.parse(storedApps));
    }
    
    const storedNotifs = localStorage.getItem('placeintel_announcements');
    if (storedNotifs) {
      const parsed = JSON.parse(storedNotifs);
      setAnnouncements(parsed.filter((n: any) => n.category === 'broadcast').slice(0, 3));
    }

    const storedEvents = localStorage.getItem('placeintel_calendar_events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents).slice(0, 3));
    }
  }, []);

  const myApps = apps.filter(a => a.rollNo.toUpperCase() === studentId.toUpperCase());
  const isPlaced = myApps.some(a => a.status === 'Selected');
  const activeOffers = myApps.filter(a => a.status === 'Selected');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      {/* Header banner */}
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">Welcome back, {student.name}</h1>
          <p className="page-subtitle">Inspect active corporate selections statistics, package distributions, and recruitment velocity calendars.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="applications-metrics-grid">
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Activity size={20} />
          </div>
          <div>
            <span className="kpi-value">{myApps.length}</span>
            <span className="kpi-label">Active Job Applications</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <span className="kpi-value">{isPlaced ? 'Placed' : 'In Progress'}</span>
            <span className="kpi-label">My Placement Status</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--warning-light)', color: 'var(--warning)' }}>
            <ArrowUpRight size={20} />
          </div>
          <div>
            <span className="kpi-value">
              {activeOffers.length > 0 ? `₹${Math.max(...activeOffers.map(o => o.drivePackage)).toFixed(1)} LPA` : '₹12.4 LPA'}
            </span>
            <span className="kpi-label">{activeOffers.length > 0 ? 'My Active Offer Package' : 'CHARUSAT Avg Package'}</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-secondary)' }}>
            <Sparkles size={20} />
          </div>
          <div>
            <span className="kpi-value">75.0%</span>
            <span className="kpi-label">Season Placement Rate</span>
          </div>
        </div>

      </div>

      <div className="dashboard-grid">
        
        {/* Spline Area velocity curve */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-title">
            <span>University Hiring Velocity (AY 2025-2026)</span>
            <span className="badge badge-info">Cumulative Offers</span>
          </div>
          
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
            Visualizing monthly student selections cumulative growth curve since season launch.
          </p>

          <div className="chart-container" style={{ position: 'relative', width: '100%', height: '240px' }}>
            <svg viewBox="0 0 500 240" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <line x1="0" y1="200" x2="500" y2="200" stroke="var(--border)" strokeWidth="1" strokeDasharray="3" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="var(--border)" strokeWidth="1" strokeDasharray="3" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="var(--border)" strokeWidth="1" strokeDasharray="3" />
              <line x1="0" y1="20" x2="500" y2="20" stroke="var(--border)" strokeWidth="1" strokeDasharray="3" />

              <defs>
                <linearGradient id="studentAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path d="M 0 200 Q 100 180 150 120 T 300 60 T 450 30 T 500 20 L 500 200 Z" fill="url(#studentAreaGrad)" />
              <path d="M 0 200 Q 100 180 150 120 T 300 60 T 450 30 T 500 20" fill="none" stroke="var(--primary)" strokeWidth="3" />

              <circle cx="150" cy="120" r="5" fill="var(--primary)" />
              <text x="140" y="105" fontSize="9px" fontWeight="600" fill="var(--text-primary)">180 Offers (Oct)</text>

              <circle cx="300" cy="60" r="5" fill="var(--primary)" />
              <text x="290" y="45" fontSize="9px" fontWeight="600" fill="var(--text-primary)">390 Offers (Jan)</text>

              <circle cx="500" cy="20" r="5" fill="var(--primary)" />
              <text x="440" y="15" fontSize="9px" fontWeight="600" fill="var(--primary)">631 Offers (Active)</text>

              <text x="0" y="220" fontSize="9px" fill="var(--text-tertiary)">July</text>
              <text x="150" y="220" fontSize="9px" fill="var(--text-tertiary)">Oct</text>
              <text x="300" y="220" fontSize="9px" fill="var(--text-tertiary)">Jan</text>
              <text x="500" y="220" fontSize="9px" fill="var(--text-tertiary)">June</text>
            </svg>
          </div>
        </div>

        {/* Right card - Applied companies tracker pipeline */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="card-title">
            <span>My Applications Pipeline Status</span>
          </div>

          {myApps.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', padding: 'var(--space-md)' }}>
              <Briefcase size={36} style={{ color: 'var(--text-tertiary)', marginBottom: '8px' }} />
              <h3 style={{ fontSize: '14px', color: 'var(--text-primary)' }}>No active applications</h3>
              <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>Explore the "Job Openings" tab to apply to active drives.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', overflowY: 'auto', maxHeight: '280px' }}>
              {myApps.map(app => (
                <div key={app.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{app.driveCompany}</strong>
                    <span className={`badge ${app.status === 'Selected' ? 'badge-success' : app.status === 'Rejected' ? 'badge-danger' : 'badge-info'}`}>
                      {app.status}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Position Target: {app.driveRole}</span>
                  
                  {/* Minified pipeline tracker indicator bar */}
                  <div style={{ display: 'flex', height: '4px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginTop: '4px' }}>
                    <div style={{ width: '25%', backgroundColor: 'var(--accent)' }}></div>
                    <div style={{ width: '25%', backgroundColor: app.status !== 'Applied' ? 'var(--accent)' : 'var(--border)' }}></div>
                    <div style={{ width: '25%', backgroundColor: (app.status === 'Interviewing' || app.status === 'Selected') ? 'var(--accent)' : 'var(--border)' }}></div>
                    <div style={{ width: '25%', backgroundColor: app.status === 'Selected' ? 'var(--accent)' : 'var(--border)' }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      <div className="dashboard-grid">
        
        {/* Recent Announcements */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="card-title" style={{ display: 'flex', gap: '8px', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
            <AlertCircle size={16} style={{ color: 'var(--primary)' }} />
            <span>Recent Placement Cell Notices</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {announcements.length === 0 ? (
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>No recent notices.</span>
            ) : (
              announcements.map(ann => (
                <div key={ann.id} style={{ padding: '8px', borderLeft: '3px solid var(--primary)', backgroundColor: 'var(--background)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>{ann.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{ann.timestamp}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="card-title" style={{ display: 'flex', gap: '8px', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
            <Briefcase size={16} style={{ color: 'var(--accent)' }} />
            <span>Upcoming Calendar Events</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {events.length === 0 ? (
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>No upcoming events scheduled.</span>
            ) : (
              events.map(ev => (
                <div key={ev.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '8px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', textAlign: 'center', minWidth: '45px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase' }}>{ev.type}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>{ev.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Day {ev.day} at {ev.time}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

/* ============================================================================
   2. STUDENT JOB OPENINGS (EXPLORE AND APPLY)
   ============================================================================ */
export function StudentJobs({ studentId }: StudentViewsProps) {
  const student = getStudentData(studentId);
  const [drives, setDrives] = useState<Drive[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [search, setSearch] = useState('');

  // Initialized sync variables
  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const res = await apiClient.get('/placements');
        if (res.success) setDrives(res.data);
      } catch (err) {
        console.error('Failed to fetch drives', err);
      }
    };
    fetchDrives();

    // Currently apps are still in local storage until applications API is fully modeled
    const storedApps = localStorage.getItem('placeintel_student_applications');
    if (storedApps) setApps(JSON.parse(storedApps));
  }, []);

  // Check student eligibility
  const checkEligibility = (drive: Drive) => {
    // 1. Check if drive is active
    if (drive.status === 'Completed' || drive.status === 'Selection Done') {
      return { eligible: false, reason: 'Drive Completed' };
    }
    
    // 2. Check deadline
    const deadlineDate = new Date(drive.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (deadlineDate < today) {
      return { eligible: false, reason: 'Deadline Passed' };
    }

    // 3. Check CGPA
    const isCgpaOk = student.cgpa >= drive.cgpaCutoff;
    if (!isCgpaOk) return { eligible: false, reason: `CGPA below ${drive.cgpaCutoff}` };

    // 4. Check Branch
    const isBranchOk = drive.eligibleBranches.some(b => b.toUpperCase().trim() === student.branch.toUpperCase().trim());
    if (!isBranchOk) return { eligible: false, reason: `Branch restriction (${drive.eligibleBranches.join(', ')})` };
    
    return { eligible: true };
  };

  // Submit Application click handler
  const handleApply = (drive: Drive) => {
    // Match by drive ID + rollNo to prevent conflicts if company has multiple drives
    const isApplied = apps.some(a => a.driveCompany === drive.companyName && a.driveRole === drive.position && a.rollNo === studentId.toUpperCase());
    if (isApplied) return;

    const newApp: Application = {
      id: apps.length > 0 ? Math.max(...apps.map(a => a.id)) + 1 : 1,
      studentName: student.name,
      rollNo: studentId.toUpperCase(),
      email: student.email,
      institute: student.institute,
      branch: student.branch,
      cgpa: student.cgpa,
      driveCompany: drive.companyName,
      driveRole: drive.position,
      driveCutoff: drive.cgpaCutoff,
      drivePackage: drive.ctc,
      status: 'Applied',
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      timeline: [
        { 
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), 
          stage: 'Applied', 
          note: 'Resume submitted successfully via student portal.' 
        }
      ]
    };

    const updatedApps = [newApp, ...apps];
    setApps(updatedApps);
    localStorage.setItem('placeintel_student_applications', JSON.stringify(updatedApps));

    // Also update drive appliedCount in local storage
    const updatedDrives = drives.map(d => {
      if (d.id === drive.id) {
        return { ...d, appliedCount: d.appliedCount + 1 };
      }
      return d;
    });
    setDrives(updatedDrives);
    localStorage.setItem('placeintel_placement_drives', JSON.stringify(updatedDrives));

    alert(`Successfully applied to ${drive.companyName}! Your profile has been added to the coordinator's applications tracker.`);
  };

  // Filter drives list
  const filtered = drives.filter(d => 
    d.companyName.toLowerCase().includes(search.toLowerCase()) ||
    d.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">Active Job Openings</h1>
          <p className="page-subtitle">Verify CGPA cutoffs, eligible branches, and apply to recruitment drives registered by the placement cell.</p>
        </div>
      </div>

      {/* Filter search bar */}
      <div className="filters-bar">
        <div className="filter-input-group" style={{ flex: 1 }}>
          <input 
            type="text" 
            placeholder="Search company name, target position, or technologies..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Drives Grid */}
      <div className="drives-grid">
        {filtered.map(drive => {
          const check = checkEligibility(drive);
          const isApplied = apps.some(a => a.driveCompany === drive.companyName && a.driveRole === drive.position && a.rollNo === studentId.toUpperCase());

          return (
            <div key={drive.id} className="card drive-card" style={{ borderLeft: isApplied ? '4px solid var(--accent)' : '1px solid var(--border)' }}>
              <div className="drive-card-header">
                <div className="company-logo-badge">{drive.companyName[0]}</div>
                <div className="drive-badge-container">
                  {isApplied ? (
                    <span className="badge badge-success">Applied</span>
                  ) : check.eligible ? (
                    <span className="badge badge-success">Eligible to Apply</span>
                  ) : (
                    <span className="badge badge-danger" title={check.reason}>Ineligible</span>
                  )}
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>Package: {drive.ctc.toFixed(1)} LPA</span>
                </div>
              </div>

              <div className="drive-title-block">
                <span className="drive-company-name">{drive.companyName}</span>
                <span className="drive-role">{drive.position}</span>
              </div>

              <div className="resume-text-box" style={{ fontSize: '12px', lineHeight: '1.4', marginTop: '10px', marginBottom: '4px', padding: '8px', maxHeight: '60px' }}>
                Full-time role targeting core computer science fundamentals. Strong grasp of algorithms, data structures, and system design required. Bond details as per company policy.
              </div>

              <div className="drive-details-grid" style={{ gridTemplateColumns: '1fr', padding: '10px 0', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Cutoff Limit:</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{drive.cgpaCutoff.toFixed(2)} CGPA</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Eligible Branches:</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '11px' }}>{drive.eligibleBranches.join(', ')}</span>
                </div>
                {drive.skills && drive.skills.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
                    {drive.skills.map(skill => (
                      <span key={skill} className="badge" style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: 'var(--background)' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Deadline: {drive.deadline}</span>
                {isApplied ? (
                  <button className="btn btn-secondary btn-sm" disabled style={{ opacity: 0.8 }}>
                    ✓ Applied
                  </button>
                ) : check.eligible ? (
                  <button className="btn btn-primary btn-sm" onClick={() => handleApply(drive)}>
                    Apply Now
                  </button>
                ) : (
                  <span style={{ fontSize: '11px', color: 'var(--danger)', fontWeight: '600' }}>
                    {check.reason}
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

/* ============================================================================
   3. STUDENT AI INTERVIEW ASSISTANT
   ============================================================================ */
export function StudentAIAssistant({ studentId }: StudentViewsProps) {
  const student = getStudentData(studentId);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: `Hi ${student.name}! I am your AI Placement assistant. Ask me to 'review resume', 'practice interview', or clarify eligibility queries.` }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    const prompt = chatInput.toLowerCase();
    setChatInput('');
    setIsAiTyping(true);

    const fetchChat = async () => {
      try {
        const res = await apiClient.post('/chat', { question: prompt });
        if (res.success && res.data) {
          const reply = res.data.answer + (res.data.source_notice ? `\n\n[Source: ${res.data.source_notice}]` : '');
          setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
        } else {
          setChatMessages(prev => [...prev, { sender: 'ai', text: 'Error connecting to the intelligence server.' }]);
        }
      } catch (err) {
        console.error(err);
        setChatMessages(prev => [...prev, { sender: 'ai', text: 'Error connecting to the intelligence server.' }]);
      } finally {
        setIsAiTyping(false);
      }
    };
    
    fetchChat();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', height: 'calc(100vh - 120px)' }}>
      
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">AI Career Assistant</h1>
          <p className="page-subtitle">Practice technical coding questions, request resume feedback, and verify mock behavioral answers.</p>
        </div>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, padding: 0 }}>
        
        {/* Chat header */}
        <div style={{ padding: 'var(--space-md)', borderBottom: '1px solid var(--border)', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Sparkles size={16} style={{ color: 'var(--primary)' }} />
          <span style={{ fontWeight: '600', fontSize: '13px' }}>Conversational Practice Arena</span>
        </div>

        {/* Messages feed */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {chatMessages.map((msg, idx) => (
            <div 
              key={idx} 
              style={{ 
                alignSelf: msg.sender === 'ai' ? 'flex-start' : 'flex-end',
                maxWidth: '80%',
                backgroundColor: msg.sender === 'ai' ? 'var(--background)' : 'var(--primary)',
                color: msg.sender === 'ai' ? 'var(--text-primary)' : 'white',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '13px',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
                border: msg.sender === 'ai' ? '1px solid var(--border)' : 'none'
              }}
            >
              {msg.text}
            </div>
          ))}

          {isAiTyping && (
            <div style={{ alignSelf: 'flex-start', backgroundColor: 'var(--background)', padding: '10px 14px', borderRadius: 'var(--radius-md)', display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span className="spinner-icon"><Cpu size={12} /></span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>AI is formulating response...</span>
            </div>
          )}
        </div>

        {/* Quick prompt suggestions chips */}
        <div style={{ display: 'flex', gap: 'var(--space-xs)', padding: 'var(--space-sm) var(--space-md)', borderTop: '1px dashed var(--border)', overflowX: 'auto' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setChatInput('Review my CV strengths and weaknesses')}>
            Review CV
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setChatInput('Practice mock technical coding interview')}>
            Technical Mock Prep
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setChatInput('Give me mock behavioral questions')}>
            Behavioral Mock Prep
          </button>
        </div>

        {/* Composer Form input */}
        <form onSubmit={handleSend} style={{ padding: 'var(--space-md)', borderTop: '1px solid var(--border)', display: 'flex', gap: 'var(--space-sm)' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Type message or click a helper prompt chip..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={isAiTyping}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary" disabled={isAiTyping}>
            <Send size={14} />
          </button>
        </form>

      </div>

    </div>
  );
}

/* ============================================================================
   4. STUDENT PROFILE SETTINGS & RESUME UPLOADER
   ============================================================================ */
export function StudentProfile({ studentId }: StudentViewsProps) {
  const student = getStudentData(studentId);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [resumeName, setResumeName] = useState('Default_Academic_Resume.pdf');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    if (!newPassword || newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    const stored = localStorage.getItem('placeintel_student_credentials');
    if (stored) {
      const credsList = JSON.parse(stored);
      const updated = credsList.map((c: any) => {
        if (c.enrollmentNo.toUpperCase() === studentId.trim().toUpperCase()) {
          return { ...c, password: newPassword };
        }
        return c;
      });
      localStorage.setItem('placeintel_student_credentials', JSON.stringify(updated));
      alert('Password updated successfully!');
      setIsChangingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleUpload = () => {
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(null), 1000);
          setResumeName(`${student.name.replace(/ /g, '_')}_Resume_Parsed.pdf`);
          alert('New CV file uploaded. Skill tags synchronized successfully!');
          return 100;
        }
        return prev + 30;
      });
    }, 300);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div>
          <h1 className="page-title">Placement Profile</h1>
          <p className="page-subtitle">Verify academic CGPA credentials and manage your active recruiting resume PDF.</p>
        </div>
      </div>

      <div className="analytics-grid-two">
        
        {/* Left card - details */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          
          <div className="drawer-profile-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <div className="avatar-lg" style={{ width: '80px', height: '80px', fontSize: '28px' }}>
              {student.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <h3 className="drawer-profile-name" style={{ marginTop: '12px' }}>{student.name}</h3>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>Roll ID: {studentId}</span>
          </div>

          <div className="profile-meta-grid" style={{ gridTemplateColumns: '1fr', padding: 'var(--space-md)', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Institute:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{student.institute}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Academic Branch:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{student.branch} Engineering</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Email Address:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{student.email}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Verified CGPA:</span>
              <strong style={{ color: 'var(--primary)', fontWeight: '700' }}>{student.cgpa > 0 ? student.cgpa.toFixed(2) : 'Not Updated'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Extracted Skills:</span>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '180px' }}>
                {student.skills && student.skills.length > 0 ? (
                  student.skills.map(skill => (
                    <span key={skill} className="badge badge-info" style={{ fontSize: '10px', padding: '2px 6px' }}>{skill}</span>
                  ))
                ) : (
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>No skills extracted yet</span>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Phone Number:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{student.phone}</strong>
            </div>
          </div>
          
          {!isChangingPassword ? (
            <button className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start', marginTop: 'auto' }} onClick={() => setIsChangingPassword(true)}>
              <Lock size={14} style={{ marginRight: '6px' }} />
              Change Password
            </button>
          ) : (
            <form onSubmit={handlePasswordChange} style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Change Account Password</span>
              {passwordError && <span style={{ fontSize: '11px', color: 'var(--danger)' }}>{passwordError}</span>}
              <input 
                type="password" 
                className="form-control" 
                placeholder="New Password (min 6 chars)" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ fontSize: '12px', padding: '6px 10px' }}
                required
              />
              <input 
                type="password" 
                className="form-control" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ fontSize: '12px', padding: '6px 10px' }}
                required
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" className="btn btn-primary btn-sm" style={{ flex: 1 }}>Save</button>
                <button type="button" className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => setIsChangingPassword(false)}>Cancel</button>
              </div>
            </form>
          )}

        </div>

        {/* Right card - resume upload */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          
          <div className="card-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
            <span>Placement Resume PDF</span>
          </div>

          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Upload your verified resume PDF. Our parser will extract core technical keywords for the recruiter matchmaking algorithm.
          </p>

          <div 
            style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-xl)', textAlign: 'center', backgroundColor: 'var(--background)', cursor: 'pointer' }}
            onClick={handleUpload}
          >
            <Upload size={32} style={{ color: 'var(--text-tertiary)', margin: '0 auto var(--space-md)' }} />
            {uploadProgress !== null ? (
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary)', marginBottom: '6px' }}>Uploading & Analyzing CV... {uploadProgress}%</div>
                <div style={{ height: '6px', background: 'var(--border)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: `${uploadProgress}%`, height: '100%', backgroundColor: 'var(--primary)' }}></div>
                </div>
              </div>
            ) : (
              <div>
                <span style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--primary)', display: 'block' }}>{resumeName}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>Click or drop to upload updated PDF file</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: 'auto', borderTop: '1px dashed var(--border)', paddingTop: '10px' }}>
            <AlertCircle size={12} style={{ color: 'var(--accent)' }} />
            <span>Credentials locked and verified by University registrar T&P desk.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
