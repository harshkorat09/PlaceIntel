import { useState } from 'react';
import { 
  Search, 
  Download, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  ShieldCheck,
  X
} from 'lucide-react';

interface JobHistory {
  company: string;
  role: string;
  status: 'Applied' | 'Interviewing' | 'Selected' | 'Rejected';
  date: string;
}

interface Student {
  id: number;
  name: string;
  rollNo: string;
  email: string;
  phone: string;
  institute: 'DEPSTAR' | 'CSPIT';
  branch: 'CE' | 'CSE' | 'IT' | 'AI & ML' | 'EC' | 'EE' | 'ME' | 'CL';
  cgpa: number;
  placedStatus: 'Placed' | 'Unplaced';
  placementDetails?: {
    company: string;
    package: number; // LPA
  };
  skills: string[];
  resumePreviewText: string;
  jobHistory: JobHistory[];
  isVerified: boolean;
}

const initialStudents: Student[] = [
  {
    id: 1,
    name: 'Aditya Vardhan',
    rollNo: '24DCSE045',
    email: 'aditya.v@depstar.ac.in',
    phone: '+91 98765 43210',
    institute: 'DEPSTAR',
    branch: 'CSE',
    cgpa: 9.4,
    placedStatus: 'Placed',
    placementDetails: {
      company: 'Google India',
      package: 32.0
    },
    skills: ['React', 'TypeScript', 'Node.js', 'C++', 'System Design'],
    resumePreviewText: `EXPERIENCE:
Software Engineering Intern at TechCorp (May 2025 - July 2025)
- Engineered a real-time logging dashboard using React, WebSocket, and Express.
- Optimized backend SQL query latency by indexing key columns, reducing load times by 30%.

PROJECTS:
- Distributed Web Crawler (Go, Redis): Parallel scraper processing 500+ URLs/min.
- PlaceIntel Frontend Core: Developed a design system using native CSS variables.`,
    jobHistory: [
      { company: 'Google India', role: 'Software Engineer', status: 'Selected', date: 'Jul 25, 2026' },
      { company: 'Microsoft', role: 'Program Manager', status: 'Applied', date: 'Jul 20, 2026' }
    ],
    isVerified: true
  },
  {
    id: 2,
    name: 'Kriti Sharma',
    rollNo: '24DIT012',
    email: 'kriti.s@depstar.ac.in',
    phone: '+91 98765 12345',
    institute: 'DEPSTAR',
    branch: 'IT',
    cgpa: 8.9,
    placedStatus: 'Placed',
    placementDetails: {
      company: 'Microsoft',
      package: 28.0
    },
    skills: ['Python', 'Docker', 'PostgreSQL', 'Kubernetes', 'FastAPI'],
    resumePreviewText: `EXPERIENCE:
DevOps Intern at CloudScale Inc (Jun 2025 - Aug 2025)
- Maintained Docker files and managed CI/CD deployments using GitHub Actions.
- Scaled Kubernetes clusters to handle high spikes in incoming telemetry data.

PROJECTS:
- AutoDeploy CLI: CLI tool written in Python to deploy containerized scripts to AWS ECS.
- FitScore Calculator: Parsed resumes using NLP matching scores.`,
    jobHistory: [
      { company: 'Microsoft', role: 'Program Manager', status: 'Selected', date: 'Jul 28, 2026' },
      { company: 'Google India', role: 'Software Engineer', status: 'Rejected', date: 'Jul 15, 2026' }
    ],
    isVerified: true
  },
  {
    id: 3,
    name: 'Rahul Verma',
    rollNo: '24EC084',
    email: 'rahul.v@cspit.ac.in',
    phone: '+91 99999 88888',
    institute: 'CSPIT',
    branch: 'EC',
    cgpa: 7.8,
    placedStatus: 'Unplaced',
    skills: ['Embedded Systems', 'Verilog', 'C', 'Python', 'RTOS'],
    resumePreviewText: `EXPERIENCE:
Hardware Intern at IoT-Hub (Jul 2025 - Sep 2025)
- Wrote firmware in embedded C for ESP32 microcontrollers sensing temperature logs.
- Tested signal latency of serial bus modules on oscilloscope.

PROJECTS:
- Smart Irrigation system: IoT gateway sending soil moisture updates to Firebase.
- FPGA-based ALU: Designed an 8-bit arithmetic logic unit using Verilog.`,
    jobHistory: [
      { company: 'Deloitte US', role: 'Technology Consultant', status: 'Applied', date: 'Aug 02, 2026' },
      { company: 'Goldman Sachs', role: 'Systems Analyst', status: 'Rejected', date: 'Aug 01, 2026' },
      { company: 'Microsoft', role: 'Program Manager', status: 'Interviewing', date: 'Jul 29, 2026' }
    ],
    isVerified: false
  },
  {
    id: 4,
    name: 'Sneha Patel',
    rollNo: '24CSE102',
    email: 'sneha.p@cspit.ac.in',
    phone: '+91 97777 66666',
    institute: 'CSPIT',
    branch: 'CSE',
    cgpa: 9.1,
    placedStatus: 'Placed',
    placementDetails: {
      company: 'Goldman Sachs',
      package: 22.0
    },
    skills: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'Git'],
    resumePreviewText: `EXPERIENCE:
Full Stack Intern at FintechLabs (May 2025 - Jul 2025)
- Implemented bank ledger REST APIs using Spring Boot and Hibernate.
- Constructed React tables with virtualized scrolling for high load ledgers.

PROJECTS:
- Micro-Transactions Ledger: High throughput transactional storage system.
- Secure Vault: Encrypted password vault with biometric triggers.`,
    jobHistory: [
      { company: 'Goldman Sachs', role: 'Systems Analyst', status: 'Selected', date: 'Jul 30, 2026' },
      { company: 'Google India', role: 'Software Engineer', status: 'Rejected', date: 'Jul 18, 2026' }
    ],
    isVerified: true
  },
  {
    id: 5,
    name: 'Kabir Shah',
    rollNo: '24ME015',
    email: 'kabir.s@cspit.ac.in',
    phone: '+91 95555 44444',
    institute: 'CSPIT',
    branch: 'ME',
    cgpa: 7.2,
    placedStatus: 'Unplaced',
    skills: ['SolidWorks', 'Thermodynamics', 'AutoCAD', 'Finite Element Analysis'],
    resumePreviewText: `EXPERIENCE:
Trainee Intern at GearWorks Industries (Jun 2025 - Aug 2025)
- Simulated load bearing capacity of automotive transmission gears.
- Reduced machine downtime by assisting in standard oil lubrication upgrades.

PROJECTS:
- Hybrid Car Chassis: Structural safety model designed on SolidWorks.
- FEA Shell Analysis: Thermal expansion analyzer for alloy containers.`,
    jobHistory: [
      { company: 'Tata Motors', role: 'Graduate Engineer Trainee', status: 'Rejected', date: 'Jul 28, 2026' }
    ],
    isVerified: true
  },
  {
    id: 6,
    name: 'Riya Patel',
    rollNo: '24EE033',
    email: 'riya.p@cspit.ac.in',
    phone: '+91 91111 22222',
    institute: 'CSPIT',
    branch: 'EE',
    cgpa: 8.2,
    placedStatus: 'Unplaced',
    skills: ['MATLAB', 'Power Electronics', 'Control Systems', 'C++'],
    resumePreviewText: `EXPERIENCE:
Electrical Systems Trainee at GridTech (May 2025 - Jul 2025)
- Plotted frequency loads using MATLAB Simulink for power grid networks.
- Drafted schematic boards for grid relay modules.

PROJECTS:
- DC-DC Boost Converter: High efficiency circuit module with solar cells.
- Smart Grid Meter: Interactive microgrid telemetry controller.`,
    jobHistory: [
      { company: 'Tata Motors', role: 'Graduate Engineer Trainee', status: 'Rejected', date: 'Jul 28, 2026' }
    ],
    isVerified: true
  },
  {
    id: 7,
    name: 'Rohit Shah',
    rollNo: '24DCE090',
    email: 'rohit.s@depstar.ac.in',
    phone: '+91 92222 33333',
    institute: 'DEPSTAR',
    branch: 'CE',
    cgpa: 8.5,
    placedStatus: 'Placed',
    placementDetails: {
      company: 'Deloitte US',
      package: 14.0
    },
    skills: ['SQL', 'Tableau', 'Excel', 'Cloud Basics', 'Python'],
    resumePreviewText: `EXPERIENCE:
Data Analyst Intern at InsightCorp (Jun 2025 - Aug 2025)
- Automated data formatting from CSV pipelines to SQL Server databases.
- Generated client dashboard reports in Tableau mapping customer churn metrics.

PROJECTS:
- ChurnPredict: Python model predicting retail customer dropouts.
- Cloud Hosting Cost Estimator: Excel sheets tracing service usages.`,
    jobHistory: [
      { company: 'Deloitte US', role: 'Technology Consultant', status: 'Selected', date: 'Aug 01, 2026' },
      { company: 'Goldman Sachs', role: 'Systems Analyst', status: 'Rejected', date: 'Jul 20, 2026' }
    ],
    isVerified: true
  },
  {
    id: 8,
    name: 'Devanshu Patel',
    rollNo: '24AIML002',
    email: 'dev.p@cspit.ac.in',
    phone: '+91 94444 55555',
    institute: 'CSPIT',
    branch: 'AI & ML',
    cgpa: 8.8,
    placedStatus: 'Unplaced',
    skills: ['Python', 'TensorFlow', 'Scikit-Learn', 'SQL', 'NLP'],
    resumePreviewText: `EXPERIENCE:
Machine Learning Intern at AI Solutions (Jun 2025 - Aug 2025)
- Trained Convolutional Neural Networks (CNNs) for anomaly detection in images.
- Wrote data preprocessing pipelines for text extraction files.

PROJECTS:
- Recommendation Engine: Real-time movie recommender matching collaborative profiles.
- Spam Classifier: Naive Bayes text classifier in Python.`,
    jobHistory: [
      { company: 'Microsoft', role: 'Program Manager', status: 'Interviewing', date: 'Aug 02, 2026' }
    ],
    isVerified: true
  },
  {
    id: 9,
    name: 'Janki Amin',
    rollNo: '24CL005',
    email: 'janki.a@cspit.ac.in',
    phone: '+91 93333 44444',
    institute: 'CSPIT',
    branch: 'CL',
    cgpa: 7.5,
    placedStatus: 'Unplaced',
    skills: ['AutoCAD', 'STAAD Pro', 'Civil Engineering', 'Project Management'],
    resumePreviewText: `EXPERIENCE:
Structural Design Trainee at BuildDraft (May 2025 - Jul 2025)
- Drafted building plan layouts in AutoCAD meeting municipal guidelines.
- Calculated concrete shear load thresholds on STAAD Pro.

PROJECTS:
- Earthquake-Resistant Column: Modeled structural columns under high loads.
- Sustainable Drainage Design: Rainwater harvesting plan mapping.`,
    jobHistory: [],
    isVerified: false
  },
  {
    id: 10,
    name: 'Deep Shah',
    rollNo: '24CE022',
    email: 'deep.s@cspit.ac.in',
    phone: '+91 96666 77777',
    institute: 'CSPIT',
    branch: 'CE',
    cgpa: 8.3,
    placedStatus: 'Placed',
    placementDetails: {
      company: 'Tata Motors',
      package: 8.5
    },
    skills: ['C++', 'Python', 'SQL', 'Git', 'Linux'],
    resumePreviewText: `EXPERIENCE:
Systems Intern at NetCore (May 2025 - Jul 2025)
- Configured cron tasks and bash scripts to backup Linux file servers.
- Wrote optimized C++ scripts processing packet telemetry logs.

PROJECTS:
- Web Server in C++: Multi-threaded server handling TCP connections.
- Query Optimizer: Local parsing parser for SQL command structures.`,
    jobHistory: [
      { company: 'Tata Motors', role: 'Graduate Engineer Trainee', status: 'Selected', date: 'Jul 28, 2026' }
    ],
    isVerified: true
  },
  {
    id: 11,
    name: 'Meet Patel',
    rollNo: 'D25DCE002',
    email: 'meet.p@depstar.ac.in',
    phone: '+91 90000 11111',
    institute: 'DEPSTAR',
    branch: 'CE',
    cgpa: 8.4,
    placedStatus: 'Unplaced',
    skills: ['C++', 'Java', 'Data Structures', 'Linux'],
    resumePreviewText: `EXPERIENCE:
Project Trainee at WebSolutions (Jun 2025 - Aug 2025)
- Assisted in building a client reservation page using HTML/CSS and Vanilla JS.
- Automated testing profiles using Selenium.

PROJECTS:
- D2D Course Credits Analyzer: Academic project calculating course equivalency index.
- SocketChat: Local network chat app using C++ socket programming.`,
    jobHistory: [
      { company: 'Goldman Sachs', role: 'Systems Analyst', status: 'Applied', date: 'Aug 04, 2026' }
    ],
    isVerified: true
  },
  {
    id: 12,
    name: 'Riddhi Shah',
    rollNo: 'D25CSE018',
    email: 'riddhi.s@cspit.ac.in',
    phone: '+91 90000 22222',
    institute: 'CSPIT',
    branch: 'CSE',
    cgpa: 8.6,
    placedStatus: 'Placed',
    placementDetails: {
      company: 'Tata Consultancy Services',
      package: 4.5
    },
    skills: ['Java', 'SQL', 'HTML/CSS', 'Python'],
    resumePreviewText: `EXPERIENCE:
Technical Volunteer at Computer Society (Jul 2025 - Dec 2025)
- Designed responsive layouts for club event registration pages.
- Standardized document sharing pipelines.

PROJECTS:
- Placement Funnel Tracker: Custom dashboard built in HTML, CSS and JS.
- Resume Optimizer: Basic TF-IDF text keyword parser.`,
    jobHistory: [
      { company: 'Tata Consultancy Services', role: 'System Engineer', status: 'Selected', date: 'Aug 01, 2026' }
    ],
    isVerified: true
  }
];

const isD2D = (rollNo: string) => rollNo.toUpperCase().startsWith('D');

const BRANCH_MAPPING = {
  DEPSTAR: [
    { code: 'CE', name: 'CE (Computer Eng.)' },
    { code: 'CSE', name: 'CSE (Computer Science & Eng.)' },
    { code: 'IT', name: 'IT (Information Tech.)' }
  ],
  CSPIT: [
    { code: 'CE', name: 'CE (Computer Eng.)' },
    { code: 'IT', name: 'IT (Information Tech.)' },
    { code: 'CSE', name: 'CSE (Computer Science & Eng.)' },
    { code: 'AI & ML', name: 'AI & ML (AI / ML)' },
    { code: 'EC', name: 'EC (Electronics & Comm.)' },
    { code: 'EE', name: 'EE (Electrical Eng.)' },
    { code: 'ME', name: 'ME (Mechanical Eng.)' },
    { code: 'CL', name: 'CL (Civil Eng.)' }
  ]
};

export default function Students() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState('');
  const [instituteFilter, setInstituteFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');
  const [placedFilter, setPlacedFilter] = useState('All');
  const [minCgpa, setMinCgpa] = useState(0);

  // Determine available branches based on selected institute
  const getAvailableBranches = () => {
    if (instituteFilter === 'DEPSTAR') {
      return BRANCH_MAPPING.DEPSTAR;
    } else if (instituteFilter === 'CSPIT') {
      return BRANCH_MAPPING.CSPIT;
    } else {
      // Merge unique branches for "All" option
      const allBranchesMap = new Map();
      BRANCH_MAPPING.DEPSTAR.forEach(b => allBranchesMap.set(b.code, b));
      BRANCH_MAPPING.CSPIT.forEach(b => allBranchesMap.set(b.code, b));
      return Array.from(allBranchesMap.values());
    }
  };

  // Handle Institute Filter Change
  const handleInstituteFilterChange = (inst: string) => {
    setInstituteFilter(inst);
    
    // Reset branch if currently selected branch doesn't exist in new institute
    if (inst === 'DEPSTAR') {
      const depstarCodes = BRANCH_MAPPING.DEPSTAR.map(b => b.code);
      if (branchFilter !== 'All' && !depstarCodes.includes(branchFilter)) {
        setBranchFilter('All');
      }
    } else if (inst === 'CSPIT') {
      const cspitCodes = BRANCH_MAPPING.CSPIT.map(b => b.code);
      if (branchFilter !== 'All' && !cspitCodes.includes(branchFilter)) {
        setBranchFilter('All');
      }
    }
  };
  
  // Selected Student for Side Drawer
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

  // Toggle Verification State
  const handleToggleVerification = (studentId: number) => {
    setStudents(students.map(s => {
      if (s.id === studentId) {
        return { ...s, isVerified: !s.isVerified };
      }
      return s;
    }));
  };

  // Selected student object
  const selectedStudent = students.find(s => s.id === selectedStudentId);

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      student.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()));

    const matchesInstitute = instituteFilter === 'All' || student.institute === instituteFilter;
    const matchesBranch = branchFilter === 'All' || student.branch === branchFilter;
    const matchesPlaced = placedFilter === 'All' || student.placedStatus === placedFilter;
    const matchesCgpa = student.cgpa >= minCgpa;

    return matchesSearch && matchesInstitute && matchesBranch && matchesPlaced && matchesCgpa;
  });

  // Render timeline dot status
  const getTimelineDotClass = (status: string) => {
    switch (status) {
      case 'Selected':
        return 'success';
      case 'Interviewing':
        return 'active';
      case 'Rejected':
        return 'danger';
      default:
        return '';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Students Registry</h1>
          <p className="page-subtitle">Track student verifications, GPA stats, resume parses, and hiring status for CHARUSAT (DEPSTAR & CSPIT).</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <button className="btn btn-secondary btn-sm">
            <Download size={14} />
            Export CSV
          </button>
          <button className="btn btn-primary btn-sm">Upload Student List</button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="students-layout">
        
        {/* Left List Pane */}
        <div className="students-list-pane">
          
          {/* Filters Bar */}
          <div className="filters-bar">
            <div className="filter-input-group">
              <Search size={16} style={{ color: 'var(--text-tertiary)' }} />
              <input 
                type="text" 
                placeholder="Search name, ID, or skills..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select 
              className="filter-select"
              value={instituteFilter}
              onChange={(e) => handleInstituteFilterChange(e.target.value)}
            >
              <option value="All">All Institutes</option>
              <option value="DEPSTAR">DEPSTAR</option>
              <option value="CSPIT">CSPIT</option>
            </select>

            <select 
              className="filter-select"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option value="All">All Branches</option>
              {getAvailableBranches().map(branch => (
                <option key={branch.code} value={branch.code}>
                  {branch.name}
                </option>
              ))}
            </select>

            <select 
              className="filter-select"
              value={placedFilter}
              onChange={(e) => setPlacedFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Placed">Placed</option>
              <option value="Unplaced">Unplaced</option>
            </select>

            <select 
              className="filter-select"
              value={minCgpa.toString()}
              onChange={(e) => setMinCgpa(Number(e.target.value))}
            >
              <option value="0">Any CGPA</option>
              <option value="7.0">CGPA &gt; 7.0</option>
              <option value="8.0">CGPA &gt; 8.0</option>
              <option value="9.0">CGPA &gt; 9.0</option>
            </select>

            {(search || instituteFilter !== 'All' || branchFilter !== 'All' || placedFilter !== 'All' || minCgpa > 0) && (
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSearch('');
                  setInstituteFilter('All');
                  setBranchFilter('All');
                  setPlacedFilter('All');
                  setMinCgpa(0);
                }}
                style={{ padding: '6px 10px' }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Student List Table */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Roll Number</th>
                    <th>Institute & Branch</th>
                    <th>CGPA</th>
                    <th>Placement Status</th>
                    <th>Profile Verification</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
                        <AlertCircle size={32} style={{ color: 'var(--text-tertiary)', margin: '0 auto var(--space-md)' }} />
                        <h3>No students match your query</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-xs)', fontSize: '13px' }}>Try modifying your filter parameters or search term.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map(student => (
                      <tr 
                        key={student.id} 
                        style={{ cursor: 'pointer', backgroundColor: selectedStudentId === student.id ? 'var(--secondary-light)' : 'transparent' }}
                        onClick={() => setSelectedStudentId(student.id)}
                      >
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                            <div className="user-avatar" style={{ width: '32px', height: '32px', fontSize: '12px' }}>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{student.name}</span>
                              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{student.email}</span>
                            </div>
                          </div>
                        </td>
                        <td style={{ fontFamily: 'monospace', fontSize: '12.5px', fontWeight: '600', letterSpacing: '0.2px', color: 'var(--text-primary)' }}>
                          {student.rollNo}
                          {isD2D(student.rollNo) && (
                            <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', marginLeft: 'var(--space-xs)', fontSize: '9px', padding: '1px 5px', fontWeight: '700' }}>
                              D2D
                            </span>
                          )}
                        </td>
                        <td>
                          <span className="badge" style={{ backgroundColor: student.institute === 'DEPSTAR' ? 'var(--primary-light)' : 'var(--secondary-light)', color: student.institute === 'DEPSTAR' ? 'var(--primary)' : 'var(--text-primary)', fontWeight: '600' }}>
                            {student.institute}
                          </span>
                          <span style={{ marginLeft: 'var(--space-sm)', color: 'var(--text-secondary)' }}>{student.branch}</span>
                        </td>
                        <td style={{ fontWeight: '600' }}>{student.cgpa.toFixed(2)}</td>
                        <td>
                          {student.placedStatus === 'Placed' ? (
                            <span className="badge badge-success" style={{ display: 'flex', width: 'fit-content', gap: '4px' }}>
                              <CheckCircle size={10} />
                              <span>{student.placementDetails?.company} ({student.placementDetails?.package} LPA)</span>
                            </span>
                          ) : (
                            <span className="badge" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-secondary)' }}>Unplaced</span>
                          )}
                        </td>
                        <td>
                          {student.isVerified ? (
                            <span className="badge badge-info" style={{ gap: '4px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
                              <ShieldCheck size={12} />
                              <span>Verified</span>
                            </span>
                          ) : (
                            <span className="badge" style={{ gap: '4px', backgroundColor: 'var(--danger-light)', color: 'var(--danger)' }}>
                              <AlertCircle size={12} />
                              <span>Pending Review</span>
                            </span>
                          )}
                        </td>
                        <td>
                          <button 
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '4px 8px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStudentId(student.id);
                            }}
                          >
                            View Profile
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sliding Right Drawer Pane */}
        {selectedStudent && (
          <div className="card student-drawer-pane">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="avatar-lg">
                {selectedStudent.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button 
                className="icon-btn" 
                onClick={() => setSelectedStudentId(null)}
                style={{ padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Title Block */}
            <div className="drawer-profile-header">
              <span className="drawer-profile-name">{selectedStudent.name}</span>
              <span className="drawer-profile-roll" style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: '600' }}>
                Roll ID: {selectedStudent.rollNo}
                {isD2D(selectedStudent.rollNo) && (
                  <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', marginLeft: 'var(--space-xs)', fontSize: '9px', padding: '1px 5px', fontWeight: '700' }}>
                    D2D Admission
                  </span>
                )}
              </span>
              {selectedStudent.isVerified ? (
                <span className="badge badge-success" style={{ gap: '4px', marginTop: 'var(--space-xs)' }}>
                  <ShieldCheck size={12} />
                  <span>Profile Verified</span>
                </span>
              ) : (
                <span className="badge badge-warning" style={{ gap: '4px', marginTop: 'var(--space-xs)' }}>
                  <AlertCircle size={12} />
                  <span>Verification Required</span>
                </span>
              )}
            </div>

            {/* Info Grid */}
            <div className="profile-meta-grid">
              <div className="detail-item">
                <span className="detail-label">Institute</span>
                <span className="detail-value" style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{selectedStudent.institute}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Branch</span>
                <span className="detail-value">{selectedStudent.branch}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">CGPA</span>
                <span className="detail-value" style={{ color: 'var(--primary)', fontWeight: '600' }}>{selectedStudent.cgpa.toFixed(2)} / 10.0</span>
              </div>
              <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                <span className="detail-label">Status</span>
                <span className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {selectedStudent.placedStatus === 'Placed' ? (
                    <span style={{ color: 'var(--accent)', fontWeight: '600' }}>
                      Placed at {selectedStudent.placementDetails?.company} (₹{selectedStudent.placementDetails?.package} LPA)
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>Available for Recruitment Drives</span>
                  )}
                </span>
              </div>
            </div>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <Mail size={14} style={{ color: 'var(--text-tertiary)' }} />
                <span>{selectedStudent.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <Phone size={14} style={{ color: 'var(--text-tertiary)' }} />
                <span>{selectedStudent.phone}</span>
              </div>
            </div>

            {/* Skills */}
            <div>
              <span className="detail-label" style={{ display: 'block', marginBottom: 'var(--space-sm)' }}>Core Skillset</span>
              <div className="skills-list">
                {selectedStudent.skills.map((skill, i) => (
                  <span key={i} className="skill-tag" style={{ padding: '4px 10px', fontSize: '12px' }}>{skill}</span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="timeline-container">
              <span className="detail-label">Application Status Timeline</span>
              <div className="app-timeline">
                {selectedStudent.jobHistory.length === 0 ? (
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>No job applications recorded yet.</span>
                ) : (
                  selectedStudent.jobHistory.map((history, i) => (
                    <div key={i} className="timeline-step">
                      <div className={`timeline-dot ${getTimelineDotClass(history.status)}`}></div>
                      <div className="timeline-step-details">
                        <div>
                          <div className="timeline-step-title">{history.company}</div>
                          <div className="timeline-step-role">{history.role}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                          <span className={`badge ${
                            history.status === 'Selected' ? 'badge-success' : 
                            history.status === 'Rejected' ? 'badge-danger' : 
                            history.status === 'Interviewing' ? 'badge-info' : 'badge'
                          }`} style={{ fontSize: '10px', padding: '1px 6px' }}>
                            {history.status}
                          </span>
                          <span className="timeline-step-date">{history.date}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Resume Text Preview */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
                <span className="detail-label">Parsed Resume Highlights</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <FileText size={12} />
                  <span>Resume.pdf</span>
                </span>
              </div>
              <div className="resume-text-box">
                {selectedStudent.resumePreviewText}
              </div>
            </div>

            {/* Drawer Actions */}
            <div style={{ display: 'flex', gap: 'var(--space-sm)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-md)', marginTop: 'var(--space-xs)' }}>
              <button 
                className="btn btn-secondary" 
                style={{ flex: 1 }}
                onClick={() => handleToggleVerification(selectedStudent.id)}
              >
                {selectedStudent.isVerified ? 'Revoke Verify' : 'Approve Profile'}
              </button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, backgroundColor: 'var(--secondary)' }}
                onClick={() => alert(`Initiating resume download for ${selectedStudent.name}...`)}
              >
                <Download size={14} />
                Download PDF
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
