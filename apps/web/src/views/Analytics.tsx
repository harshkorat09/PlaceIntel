import { useState } from 'react';
import { 
  Download, 
  TrendingUp,
  FileText,
  UserCheck,
  Building,
  Award,
  BarChart3,
  Percent
} from 'lucide-react';

interface RecruiterHires {
  rank: number;
  company: string;
  hires: number;
  sector: string;
  avgPkg: number;
}

interface BranchStats {
  name: string;
  code: string;
  placed: number;
  total: number;
  rate: number;
}

export default function Analytics({ role = 'officer' }: { role?: 'officer' | 'student' }) {
  const isAdmin = role === 'officer';
  const [accreditationYear, setAccreditationYear] = useState('2026');

  // Recruiter Data
  const recruiters: RecruiterHires[] = [
    { rank: 1, company: 'TCS (Tata Consultancy)', hires: 210, sector: 'Technology', avgPkg: 4.5 },
    { rank: 2, company: 'Deloitte US', hires: 110, sector: 'Consulting', avgPkg: 14.0 },
    { rank: 3, company: 'Google India', hires: 85, sector: 'Technology', avgPkg: 32.0 },
    { rank: 4, company: 'Microsoft', hires: 64, sector: 'Technology', avgPkg: 28.0 },
    { rank: 5, company: 'Goldman Sachs', hires: 42, sector: 'Finance & Banking', avgPkg: 22.0 }
  ];

  // DEPSTAR Branch Data
  const depstarBranches: BranchStats[] = [
    { name: 'Computer Science & Engineering', code: 'CSE', placed: 120, total: 125, rate: 96.0 },
    { name: 'Computer Engineering', code: 'CE', placed: 88, total: 95, rate: 92.6 },
    { name: 'Information Technology', code: 'IT', placed: 118, total: 130, rate: 90.7 }
  ];

  // CSPIT Branch Data
  const cspitBranches: BranchStats[] = [
    { name: 'AI & ML Engineering', code: 'AI & ML', placed: 42, total: 45, rate: 93.3 },
    { name: 'Computer Science & Engineering', code: 'CSE', placed: 165, total: 180, rate: 91.6 },
    { name: 'Computer Engineering', code: 'CE', placed: 110, total: 125, rate: 88.0 },
    { name: 'Information Technology', code: 'IT', placed: 92, total: 105, rate: 87.6 },
    { name: 'Electronics & Communication', code: 'EC', placed: 154, total: 185, rate: 83.2 },
    { name: 'Mechanical Engineering', code: 'ME', placed: 72, total: 125, rate: 57.6 },
    { name: 'Electrical Engineering', code: 'EE', placed: 42, total: 92, rate: 45.6 },
    { name: 'Civil Engineering', code: 'CL', placed: 22, total: 55, rate: 40.0 }
  ];

  const handleDownloadReport = (type: 'NBA' | 'NAAC' | 'NIRF') => {
    alert(`Compiling and downloading the ${type} Accreditation Excel template report for academic year ${accreditationYear}...`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Accreditation & Analytics</h1>
          <p className="page-subtitle">Generate NAAC, NBA, and NIRF compliant placement dashboards, and track year-on-year package growth.</p>
        </div>
        {isAdmin && (
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <select 
              className="filter-select"
              value={accreditationYear}
              onChange={(e) => setAccreditationYear(e.target.value)}
              style={{ padding: '6px 12px' }}
            >
              <option value="2026">AY 2025-2026 (Current)</option>
              <option value="2025">AY 2024-2025</option>
              <option value="2024">AY 2023-2024</option>
            </select>
            <button className="btn btn-primary btn-sm" onClick={() => handleDownloadReport('NBA')}>
              <Download size={14} />
              Export NBA Sheet
            </button>
          </div>
        )}
      </div>

      {/* KPI Counters Grid */}
      <div className="applications-metrics-grid">
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Percent size={20} />
          </div>
          <div>
            <span className="kpi-value">75.0%</span>
            <span className="kpi-label">Placement Rate</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <TrendingUp size={20} />
          </div>
          <div>
            <span className="kpi-value">₹12.4 LPA</span>
            <span className="kpi-label">Average CTC</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
            <Award size={20} />
          </div>
          <div>
            <span className="kpi-value">₹48.5 LPA</span>
            <span className="kpi-label">Highest Package</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-primary)' }}>
            <UserCheck size={20} />
          </div>
          <div>
            <span className="kpi-value">631 / 842</span>
            <span className="kpi-label">Placed Students</span>
          </div>
        </div>

      </div>

      {/* Charts Section */}
      <div className="analytics-grid-two">
        
        {/* Salary Ranges Histogram */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="card-title">
            <BarChart3 size={16} style={{ color: 'var(--primary)' }} />
            <span>Salary Offer Distribution (AY {accreditationYear})</span>
          </div>
          
          <div style={{ padding: 'var(--space-md) 0' }}>
            {/* Inline SVG Histogram */}
            <svg viewBox="0 0 400 200" width="100%" height="100%" style={{ overflow: 'visible' }}>
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="380" y2="20" stroke="var(--border)" strokeDasharray="3 3" />
              <line x1="40" y1="70" x2="380" y2="70" stroke="var(--border)" strokeDasharray="3 3" />
              <line x1="40" y1="120" x2="380" y2="120" stroke="var(--border)" strokeDasharray="3 3" />
              <line x1="40" y1="170" x2="380" y2="170" stroke="var(--border)" />

              {/* Y Axis Labels */}
              <text x="30" y="24" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">250</text>
              <text x="30" y="74" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">150</text>
              <text x="30" y="124" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">50</text>
              <text x="30" y="174" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">0</text>

              {/* Bar 1 (<6 LPA) */}
              <rect x="65" y="65" width="45" height="105" rx="3" fill="var(--secondary)" />
              <text x="87.5" y="58" fontSize="10" fontWeight="600" fill="var(--text-primary)" textAnchor="middle">210</text>
              <text x="87.5" y="185" fontSize="9" fill="var(--text-secondary)" textAnchor="middle">&lt; 6 LPA</text>

              {/* Bar 2 (6-12 LPA) */}
              <rect x="145" y="93" width="45" height="77" rx="3" fill="var(--primary)" />
              <text x="167.5" y="86" fontSize="10" fontWeight="600" fill="var(--text-primary)" textAnchor="middle">154</text>
              <text x="167.5" y="185" fontSize="9" fill="var(--text-secondary)" textAnchor="middle">6-12 LPA</text>

              {/* Bar 3 (12-25 LPA) */}
              <rect x="225" y="62" width="45" height="108" rx="3" fill="var(--primary)" />
              <text x="247.5" y="55" fontSize="10" fontWeight="600" fill="var(--text-primary)" textAnchor="middle">215</text>
              <text x="247.5" y="185" fontSize="9" fill="var(--text-secondary)" textAnchor="middle">12-25 LPA</text>

              {/* Bar 4 (>25 LPA) */}
              <rect x="305" y="144" width="45" height="26" rx="3" fill="var(--accent)" />
              <text x="327.5" y="137" fontSize="10" fontWeight="600" fill="var(--text-primary)" textAnchor="middle">52</text>
              <text x="327.5" y="185" fontSize="9" fill="var(--text-secondary)" textAnchor="middle">&gt; 25 LPA</text>
            </svg>
          </div>
        </div>

        {/* Salary Growth Spline Curve */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="card-title">
            <TrendingUp size={16} style={{ color: 'var(--accent)' }} />
            <span>Average Salary Progression (LPA)</span>
          </div>

          <div style={{ padding: 'var(--space-md) 0' }}>
            <svg viewBox="0 0 400 200" width="100%" height="100%" style={{ overflow: 'visible' }}>
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="380" y2="20" stroke="var(--border)" strokeDasharray="3 3" />
              <line x1="40" y1="70" x2="380" y2="70" stroke="var(--border)" strokeDasharray="3 3" />
              <line x1="40" y1="120" x2="380" y2="120" stroke="var(--border)" strokeDasharray="3 3" />
              <line x1="40" y1="170" x2="380" y2="170" stroke="var(--border)" />

              {/* Y Axis Labels */}
              <text x="30" y="24" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">15 LPA</text>
              <text x="30" y="74" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">10 LPA</text>
              <text x="30" y="124" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">5 LPA</text>
              <text x="30" y="174" fontSize="9" fill="var(--text-tertiary)" textAnchor="end">0 LPA</text>

              {/* Area Under Spline */}
              <path d="M 65 148 L 130 135 L 195 122 L 260 108 L 325 96 L 325 170 L 65 170 Z" fill="rgba(79, 70, 229, 0.05)" />

              {/* Spline Line */}
              <path d="M 65 148 Q 97.5 141.5, 130 135 T 195 122 T 260 108 T 325 96" fill="none" stroke="var(--primary)" strokeWidth="3" />

              {/* Data points */}
              <circle cx="65" cy="148" r="4" fill="var(--primary)" />
              <text x="65" y="138" fontSize="9" fontWeight="600" fill="var(--text-primary)" textAnchor="middle">7.2</text>
              <text x="65" y="185" fontSize="9" fill="var(--text-secondary)" textAnchor="middle">2022</text>

              <circle cx="130" cy="135" r="4" fill="var(--primary)" />
              <text x="130" y="125" fontSize="9" fontWeight="600" fill="var(--text-primary)" textAnchor="middle">8.5</text>
              <text x="130" y="185" fontSize="9" fill="var(--text-secondary)" textAnchor="middle">2023</text>

              <circle cx="195" cy="122" r="4" fill="var(--primary)" />
              <text x="195" y="112" fontSize="9" fontWeight="600" fill="var(--text-primary)" textAnchor="middle">9.8</text>
              <text x="195" y="185" fontSize="9" fill="var(--text-secondary)" textAnchor="middle">2024</text>

              <circle cx="260" cy="108" r="4" fill="var(--primary)" />
              <text x="260" y="98" fontSize="9" fontWeight="600" fill="var(--text-primary)" textAnchor="middle">11.2</text>
              <text x="260" y="185" fontSize="9" fill="var(--text-secondary)" textAnchor="middle">2025</text>

              <circle cx="325" cy="96" r="4" fill="var(--primary)" />
              <text x="325" y="86" fontSize="9" fontWeight="600" fill="var(--text-primary)" textAnchor="middle">12.4</text>
              <text x="325" y="185" fontSize="9" fill="var(--text-secondary)" textAnchor="middle">2026</text>
            </svg>
          </div>
        </div>

      </div>

      {/* Branch wise lists segment */}
      <div className="analytics-grid-two">
        
        {/* DEPSTAR Branches */}
        <div className="card">
          <div className="card-title">DEPSTAR Branch Placement rates</div>
          <div className="dept-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
            {depstarBranches.map((branch, i) => (
              <div key={i} className="dept-item">
                <div className="dept-header">
                  <span className="dept-name" style={{ fontWeight: '500' }}>{branch.name} ({branch.code})</span>
                  <span className="dept-value">{branch.placed}/{branch.total} · {branch.rate.toFixed(1)}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${branch.rate}%`, backgroundColor: 'var(--primary)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CSPIT Branches */}
        <div className="card">
          <div className="card-title">CSPIT Branch Placement rates</div>
          <div className="dept-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
            {cspitBranches.map((branch, i) => (
              <div key={i} className="dept-item">
                <div className="dept-header">
                  <span className="dept-name" style={{ fontWeight: '500' }}>{branch.name} ({branch.code})</span>
                  <span className="dept-value">{branch.placed}/{branch.total} · {branch.rate.toFixed(1)}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${branch.rate}%`, backgroundColor: 'var(--secondary)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top Recruiters & Accreditations exports list */}
      <div className="analytics-grid-two">
        
        {/* Top Recruiters */}
        <div className="card">
          <div className="card-title">
            <Building size={16} style={{ color: 'var(--text-secondary)' }} />
            <span>Top Corporate Recruiters</span>
          </div>
          
          <div className="top-recruiters-list" style={{ marginTop: 'var(--space-md)' }}>
            {recruiters.map((recruiter) => (
              <div key={recruiter.rank} className="recruiter-row">
                <div className="recruiter-row-left">
                  <div className="recruiter-rank">{recruiter.rank}</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: '600', fontSize: '13px', color: 'var(--text-primary)' }}>{recruiter.company}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{recruiter.sector}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: '600', fontSize: '13px', display: 'block', color: 'var(--text-primary)' }}>{recruiter.hires} Hires</span>
                  <span style={{ fontSize: '11px', color: 'var(--primary)' }}>Avg package ₹{recruiter.avgPkg.toFixed(1)} LPA</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accreditation Exporters - Admin Only */}
        {isAdmin && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div className="card-title">
              <FileText size={16} style={{ color: 'var(--primary)' }} />
              <span>Accreditation & Auditing Logs</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>
              Generate and export structured spreadsheets containing verified student list registries, salary offerings, and HR coordinates mapped to specific criteria defined by National Assessment boards.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginTop: 'var(--space-xs)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--background)' }}>
                <div>
                  <span style={{ fontWeight: '600', fontSize: '13px', display: 'block', color: 'var(--text-primary)' }}>National Board of Accreditation (NBA)</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Includes placement indices, median salaries, and higher studies ratio.</span>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => handleDownloadReport('NBA')}>
                  <Download size={12} />
                  NBA Excel
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--background)' }}>
                <div>
                  <span style={{ fontWeight: '600', fontSize: '13px', display: 'block', color: 'var(--text-primary)' }}>NAAC Criteria 5 Template</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Includes student placement listings, employer contacts, and appointment letters logs.</span>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => handleDownloadReport('NAAC')}>
                  <Download size={12} />
                  NAAC Excel
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--background)' }}>
                <div>
                  <span style={{ fontWeight: '600', fontSize: '13px', display: 'block', color: 'var(--text-primary)' }}>NIRF Data Submission Sheet</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Includes placement percentage records, minimum/maximum/median salaries splits.</span>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={() => handleDownloadReport('NIRF')}>
                  <Download size={12} />
                  NIRF Excel
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
