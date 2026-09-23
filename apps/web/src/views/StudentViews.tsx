import { useState, useEffect } from 'react';
import {
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  Briefcase,
  AlertCircle,
  Activity
} from 'lucide-react';

interface StudentViewsProps {
  studentId: string;
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


