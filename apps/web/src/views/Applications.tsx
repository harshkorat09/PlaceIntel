import { useState } from 'react';
import { 
  Search, 
  Sparkles,
  AlertCircle,
  X,
  CheckCircle,
  TrendingUp,
  FileText,
  UserCheck
} from 'lucide-react';

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
  drivePackage: number; // LPA
  status: 'Applied' | 'Interviewing' | 'Selected' | 'Rejected';
  appliedDate: string;
  timeline: { date: string; stage: string; note: string }[];
}

export const initialApplications: Application[] = [
  {
    id: 1,
    studentName: 'Aditya Vardhan',
    rollNo: '24DCSE045',
    email: 'aditya.v@depstar.ac.in',
    institute: 'DEPSTAR',
    branch: 'CSE',
    cgpa: 9.42,
    driveCompany: 'Google India',
    driveRole: 'Software Dev Engineer (SDE)',
    driveCutoff: 8.0,
    drivePackage: 32.0,
    status: 'Selected',
    appliedDate: 'Aug 02, 2026',
    timeline: [
      { date: 'Aug 05, 2026', stage: 'Selected', note: 'Offer accepted at ₹32.0 LPA.' },
      { date: 'Aug 03, 2026', stage: 'Interviewing', note: 'Completed 3 technical rounds.' },
      { date: 'Aug 02, 2026', stage: 'Applied', note: 'Successfully submitted resume.' }
    ]
  },
  {
    id: 2,
    studentName: 'Neha Patel',
    rollNo: '24CSE102',
    email: 'neha.p@cspit.ac.in',
    institute: 'CSPIT',
    branch: 'CSE',
    cgpa: 7.90,
    driveCompany: 'Google India',
    driveRole: 'Software Dev Engineer (SDE)',
    driveCutoff: 8.0,
    drivePackage: 32.0,
    status: 'Rejected',
    appliedDate: 'Aug 02, 2026',
    timeline: [
      { date: 'Aug 03, 2026', stage: 'Rejected', note: 'Disqualified: CGPA (7.90) below Google cutoff threshold (8.00).' },
      { date: 'Aug 02, 2026', stage: 'Applied', note: 'Successfully submitted resume.' }
    ]
  },
  {
    id: 3,
    studentName: 'Meet Patel',
    rollNo: 'D25DCE002',
    email: 'meet.p@depstar.ac.in',
    institute: 'DEPSTAR',
    branch: 'CE',
    cgpa: 8.40,
    driveCompany: 'Goldman Sachs',
    driveRole: 'Systems Analyst',
    driveCutoff: 7.5,
    drivePackage: 22.0,
    status: 'Interviewing',
    appliedDate: 'Aug 04, 2026',
    timeline: [
      { date: 'Aug 05, 2026', stage: 'Interviewing', note: 'Cleared Online Coding Round. Scheduled for Technical Round 1.' },
      { date: 'Aug 04, 2026', stage: 'Applied', note: 'Successfully submitted resume.' }
    ]
  },
  {
    id: 4,
    studentName: 'Riddhi Shah',
    rollNo: 'D25CSE018',
    email: 'riddhi.s@cspit.ac.in',
    institute: 'CSPIT',
    branch: 'CSE',
    cgpa: 8.60,
    driveCompany: 'TCS (Tata Consultancy)',
    driveRole: 'System Engineer',
    driveCutoff: 6.5,
    drivePackage: 4.5,
    status: 'Selected',
    appliedDate: 'Aug 01, 2026',
    timeline: [
      { date: 'Aug 03, 2026', stage: 'Selected', note: 'Hired at ₹4.5 LPA. Awaiting offer letter.' },
      { date: 'Aug 01, 2026', stage: 'Applied', note: 'Successfully submitted resume.' }
    ]
  },
  {
    id: 5,
    studentName: 'Rohit Shah',
    rollNo: '24DCE090',
    email: 'rohit.s@depstar.ac.in',
    institute: 'DEPSTAR',
    branch: 'CE',
    cgpa: 8.50,
    driveCompany: 'Deloitte US',
    driveRole: 'Technology Consultant',
    driveCutoff: 7.0,
    drivePackage: 14.0,
    status: 'Selected',
    appliedDate: 'Aug 01, 2026',
    timeline: [
      { date: 'Aug 04, 2026', stage: 'Selected', note: 'Hired at ₹14.0 LPA.' },
      { date: 'Aug 02, 2026', stage: 'Interviewing', note: 'Cleared Case Study Presentation.' },
      { date: 'Aug 01, 2026', stage: 'Applied', note: 'Successfully submitted resume.' }
    ]
  },
  {
    id: 6,
    studentName: 'Janki Amin',
    rollNo: '24CL005',
    email: 'janki.a@cspit.ac.in',
    institute: 'CSPIT',
    branch: 'CL',
    cgpa: 7.50,
    driveCompany: 'Tata Motors',
    driveRole: 'Graduate Engineer Trainee',
    driveCutoff: 7.0,
    drivePackage: 8.5,
    status: 'Applied',
    appliedDate: 'Aug 05, 2026',
    timeline: [
      { date: 'Aug 05, 2026', stage: 'Applied', note: 'Successfully submitted resume.' }
    ]
  },
  {
    id: 7,
    studentName: 'Devanshu Patel',
    rollNo: '24AIML002',
    email: 'dev.p@cspit.ac.in',
    institute: 'CSPIT',
    branch: 'AI & ML',
    cgpa: 8.80,
    driveCompany: 'Microsoft',
    driveRole: 'Program Manager',
    driveCutoff: 8.0,
    drivePackage: 28.0,
    status: 'Interviewing',
    appliedDate: 'Aug 03, 2026',
    timeline: [
      { date: 'Aug 05, 2026', stage: 'Interviewing', note: 'Cleared preliminary screening. Scheduled for Lead Interview.' },
      { date: 'Aug 03, 2026', stage: 'Applied', note: 'Successfully submitted resume.' }
    ]
  },
  {
    id: 8,
    studentName: 'Riya Patel',
    rollNo: '24EE033',
    email: 'riya.p@cspit.ac.in',
    institute: 'CSPIT',
    branch: 'EE',
    cgpa: 8.20,
    driveCompany: 'Tata Motors',
    driveRole: 'Graduate Engineer Trainee',
    driveCutoff: 7.0,
    drivePackage: 8.5,
    status: 'Rejected',
    appliedDate: 'Jul 28, 2026',
    timeline: [
      { date: 'Aug 01, 2026', stage: 'Rejected', note: 'Disqualified in interview panel round.' },
      { date: 'Jul 29, 2026', stage: 'Interviewing', note: 'Selected for Panel interview.' },
      { date: 'Jul 28, 2026', stage: 'Applied', note: 'Successfully submitted resume.' }
    ]
  }
];

export default function Applications({ role = 'officer', studentRollNo = '' }: { role?: 'officer' | 'student', studentRollNo?: string }) {
  const isAdmin = role === 'officer';
  const [applications, setApplications] = useState<Application[]>(() => {
    const stored = localStorage.getItem('placeintel_student_applications');
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem('placeintel_student_applications', JSON.stringify(initialApplications));
    return initialApplications;
  });
  const [search, setSearch] = useState('');
  const [driveFilter, setDriveFilter] = useState('All');
  const [instituteFilter, setInstituteFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Selected Application for Drawer
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

  // Status update handler
  const handleUpdateStatus = (appId: number, nextStatus: 'Applied' | 'Interviewing' | 'Selected' | 'Rejected') => {
    setApplications(prev => {
      const updated = prev.map(app => {
        if (app.id === appId) {
          const updatedTimeline = [
            {
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
              stage: nextStatus,
              note: `Status updated manually to ${nextStatus}.`
            },
            ...app.timeline
          ];
          return { ...app, status: nextStatus, timeline: updatedTimeline };
        }
        return app;
      });
      localStorage.setItem('placeintel_student_applications', JSON.stringify(updated));
      return updated;
    });
  };

  // Selected App Object
  const selectedApp = applications.find(a => a.id === selectedAppId);

  // Filter application database
  const filteredApps = applications.filter(app => {
    // If student, ONLY show their own applications
    if (!isAdmin && app.rollNo.toUpperCase() !== studentRollNo.toUpperCase()) {
      return false;
    }

    const matchesSearch = 
      app.studentName.toLowerCase().includes(search.toLowerCase()) ||
      app.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      app.driveCompany.toLowerCase().includes(search.toLowerCase());

    const matchesDrive = driveFilter === 'All' || app.driveCompany === driveFilter;
    const matchesInstitute = instituteFilter === 'All' || app.institute === instituteFilter;
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

    return matchesSearch && matchesDrive && matchesInstitute && matchesStatus;
  });

  // Calculate Metrics
  const totalApps = filteredApps.length;
  const interviewingCount = filteredApps.filter(a => a.status === 'Interviewing').length;
  const selectedCount = filteredApps.filter(a => a.status === 'Selected').length;
  const rejectedCount = filteredApps.filter(a => a.status === 'Rejected').length;

  const isD2D = (rollNo: string) => rollNo.toUpperCase().startsWith('D');

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Selected':
        return <span className="badge badge-success">{status}</span>;
      case 'Interviewing':
        return <span className="badge badge-info" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>{status}</span>;
      case 'Rejected':
        return <span className="badge badge-danger">{status}</span>;
      default:
        return <span className="badge" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-secondary)' }}>{status}</span>;
    }
  };

  // Get unique drive list for dropdown
  const uniqueDrives = Array.from(new Set(applications.map(a => a.driveCompany)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">{isAdmin ? 'Job Applications Tracker' : 'My Applications Timeline'}</h1>
          <p className="page-subtitle">{isAdmin ? 'Cross-reference candidate GPA cutoffs, transition interviews, and generate hiring shortlists.' : 'Track the real-time pipeline status of all your corporate placement applications.'}</p>
        </div>
        {isAdmin && (
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => {
              alert('Exporting filtered shortlist spreadsheet file to Downloads...');
            }}
          >
            <FileText size={14} />
            Export Shortlist
          </button>
        )}
      </div>

      {/* KPI Counters Bar */}
      <div className="applications-metrics-grid">
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <FileText size={20} />
          </div>
          <div>
            <span className="kpi-value">{totalApps}</span>
            <span className="kpi-label">Filtered Applications</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Sparkles size={20} />
          </div>
          <div>
            <span className="kpi-value">{interviewingCount}</span>
            <span className="kpi-label">Active Interviewing</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
            <UserCheck size={20} />
          </div>
          <div>
            <span className="kpi-value">{selectedCount}</span>
            <span className="kpi-label">Hired / Selected</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger)' }}>
            <AlertCircle size={20} />
          </div>
          <div>
            <span className="kpi-value">{rejectedCount}</span>
            <span className="kpi-label">Disqualified / Rejected</span>
          </div>
        </div>

      </div>

      {/* Main Workspace Layout */}
      <div className="applications-layout">
        
        {/* Left Table pane */}
        <div className="applications-list-pane">
          
          {/* Filters Bar — admin only */}
          {isAdmin && (
            <div className="filters-bar">
              
              <div className="filter-input-group">
                <Search size={16} style={{ color: 'var(--text-tertiary)' }} />
                <input 
                  type="text" 
                  placeholder="Search candidate name, ID, or company..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select 
                className="filter-select"
                value={driveFilter}
                onChange={(e) => setDriveFilter(e.target.value)}
              >
                <option value="All">All Companies</option>
                {uniqueDrives.map(drive => (
                  <option key={drive} value={drive}>{drive}</option>
                ))}
              </select>

              <select 
                className="filter-select"
                value={instituteFilter}
                onChange={(e) => setInstituteFilter(e.target.value)}
              >
                <option value="All">All Institutes</option>
                <option value="DEPSTAR">DEPSTAR</option>
                <option value="CSPIT">CSPIT</option>
              </select>

              <select 
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>

              {(search || driveFilter !== 'All' || instituteFilter !== 'All' || statusFilter !== 'All') && (
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSearch('');
                    setDriveFilter('All');
                    setInstituteFilter('All');
                    setStatusFilter('All');
                  }}
                  style={{ padding: '6px 10px' }}
                >
                  Clear Filters
                </button>
              )}

            </div>
          )}

          {/* Data Table */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    {isAdmin && <th>Student Details</th>}
                    {isAdmin && <th>Roll ID</th>}
                    {isAdmin && <th>Branch</th>}
                    <th>Recruiter / Position</th>
                    <th>GPA Cutoff</th>
                    <th>Stage Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
                        <AlertCircle size={32} style={{ color: 'var(--text-tertiary)', margin: '0 auto var(--space-md)' }} />
                        <h3>No applications matches found</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-xs)', fontSize: '13px' }}>Try adjusting search text or filter settings.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredApps.map(app => {
                      const isEligible = app.cgpa >= app.driveCutoff;

                      return (
                        <tr 
                          key={app.id}
                          style={{ cursor: 'pointer', backgroundColor: selectedAppId === app.id ? 'var(--secondary-light)' : 'transparent' }}
                          onClick={() => setSelectedAppId(app.id)}
                        >
                          {isAdmin && (
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                <div className="user-avatar" style={{ width: '30px', height: '30px', fontSize: '11px' }}>
                                  {app.studentName.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{app.studentName}</span>
                                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{app.email}</span>
                                </div>
                              </div>
                            </td>
                          )}
                          {isAdmin && (
                            <td style={{ fontFamily: 'monospace', fontSize: '12.5px', fontWeight: '600', color: 'var(--text-primary)' }}>
                              {app.rollNo}
                              {isD2D(app.rollNo) && (
                                <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', marginLeft: 'var(--space-xs)', fontSize: '9px', padding: '1px 5px', fontWeight: '700' }}>
                                  D2D
                                </span>
                              )}
                            </td>
                          )}
                          {isAdmin && (
                            <td>
                              <span className="badge" style={{ backgroundColor: app.institute === 'DEPSTAR' ? 'var(--primary-light)' : 'var(--secondary-light)', color: app.institute === 'DEPSTAR' ? 'var(--primary)' : 'var(--text-primary)', fontWeight: '600' }}>
                                {app.institute}
                              </span>
                              <span style={{ marginLeft: 'var(--space-sm)', color: 'var(--text-secondary)' }}>{app.branch}</span>
                            </td>
                          )}
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{app.driveCompany}</span>
                              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{app.driveRole}</span>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '12px' }}>{app.cgpa.toFixed(2)}</span>
                              {isEligible ? (
                                <span className="eligibility-flag eligible">
                                  <CheckCircle size={10} />
                                  <span>Eligible (&ge;{app.driveCutoff.toFixed(1)})</span>
                                </span>
                              ) : (
                                <span className="eligibility-flag ineligible">
                                  <AlertCircle size={10} />
                                  <span>Below Cutoff ({app.driveCutoff.toFixed(1)})</span>
                                </span>
                              )}
                            </div>
                          </td>
                          <td>{renderStatusBadge(app.status)}</td>
                          <td>
                            <button 
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '4px 8px' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAppId(app.id);
                              }}
                            >
                              Review Pipeline
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sliding Application Drawer Pane */}
        {selectedApp && (
          <div className="card application-drawer-pane">
            
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="avatar-lg">
                {selectedApp.studentName.split(' ').map(n => n[0]).join('')}
              </div>
              <button 
                className="icon-btn" 
                onClick={() => setSelectedAppId(null)}
                style={{ padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Profile Block */}
            <div className="drawer-profile-header">
              <span className="drawer-profile-name">{selectedApp.studentName}</span>
              <span className="drawer-profile-roll" style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: '600' }}>
                Roll ID: {selectedApp.rollNo}
                {isD2D(selectedApp.rollNo) && (
                  <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', marginLeft: 'var(--space-xs)', fontSize: '9px', padding: '1px 5px', fontWeight: '700' }}>
                    D2D Admission
                  </span>
                )}
              </span>
              <div style={{ marginTop: 'var(--space-sm)' }}>
                {renderStatusBadge(selectedApp.status)}
              </div>
            </div>

            {/* Student & Drive Info Grid */}
            <div className="profile-meta-grid">
              <div className="detail-item">
                <span className="detail-label">Institute</span>
                <span className="detail-value">{selectedApp.institute}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Branch</span>
                <span className="detail-value">{selectedApp.branch}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Student CGPA</span>
                <span className="detail-value" style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{selectedApp.cgpa.toFixed(2)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Drive Cutoff</span>
                <span className="detail-value" style={{ color: 'var(--text-secondary)' }}>{selectedApp.driveCutoff.toFixed(2)}</span>
              </div>
              <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                <span className="detail-label">Position / Company Target</span>
                <span className="detail-value" style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                  {selectedApp.driveRole} at {selectedApp.driveCompany} ({selectedApp.drivePackage.toFixed(1)} LPA)
                </span>
              </div>
            </div>

            {/* Hiring Phase Controller Dropdown — admin only */}
            {isAdmin && (
              <div style={{ padding: 'var(--space-md)', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '8px' }}>
                  <TrendingUp size={14} style={{ color: 'var(--primary)', verticalAlign: 'middle', marginRight: '4px' }} />
                  Update Recruitment Pipeline Stage
                </label>
                <select 
                  className="form-control"
                  value={selectedApp.status}
                  onChange={(e) => handleUpdateStatus(selectedApp.id, e.target.value as any)}
                  style={{ width: '100%', fontSize: '13px' }}
                >
                  <option value="Applied">Applied (Reviewing Resume)</option>
                  <option value="Interviewing">Interviewing (In Progress)</option>
                  <option value="Selected">Selected (Job Offer Accepted)</option>
                  <option value="Rejected">Rejected (Declined/Ineligible)</option>
                </select>
              </div>
            )}

            {/* Application History Audit Logs */}
            <div className="timeline-container">
              <span className="detail-label">Application Pipeline Timeline</span>
              <div className="app-timeline" style={{ marginTop: 'var(--space-md)' }}>
                {selectedApp.timeline.map((step, idx) => (
                  <div key={idx} className="timeline-step">
                    <div className={`timeline-dot ${step.stage === 'Selected' ? 'success' : step.stage === 'Rejected' ? 'danger' : 'active'}`}></div>
                    <div className="timeline-step-details">
                      <div>
                        <div className="timeline-step-title">{step.stage} Stage</div>
                        <div className="timeline-step-role">{step.note}</div>
                      </div>
                      <div className="timeline-step-date">
                        {step.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions — admin only */}
            {isAdmin && (
              <div style={{ display: 'flex', gap: 'var(--space-md)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-md)', marginTop: 'var(--space-xs)' }}>
                <button 
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => alert(`Redirecting to full profile page of ${selectedApp.studentName}...`)}
                >
                  View Profile
                </button>
                <button 
                  className="btn btn-primary"
                  style={{ flex: 1, backgroundColor: 'var(--secondary)' }}
                  onClick={() => alert(`Downloading resume attachment for ${selectedApp.studentName}...`)}
                >
                  Download Resume
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
