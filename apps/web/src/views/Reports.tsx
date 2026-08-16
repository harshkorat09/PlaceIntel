import { useState } from 'react';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  RefreshCw, 
  Calendar,
  Clock,
  Archive,
  BarChart,
  Settings
} from 'lucide-react';

interface HistoricalReport {
  id: number;
  name: string;
  category: 'Accreditation' | 'Brochure' | 'Audit Log';
  format: 'PDF' | 'XLSX';
  dateCreated: string;
  size: string;
}

const initialReports: HistoricalReport[] = [
  {
    id: 1,
    name: 'AY_2026_NIRF_Placement_Data.xlsx',
    category: 'Accreditation',
    format: 'XLSX',
    dateCreated: 'Today, 11:20 AM',
    size: '124 KB'
  },
  {
    id: 2,
    name: 'CHARUSAT_Placement_Brochure_2026.pdf',
    category: 'Brochure',
    format: 'PDF',
    dateCreated: 'Yesterday, 04:45 PM',
    size: '8.4 MB'
  },
  {
    id: 3,
    name: 'DEPSTAR_NBA_Tier1_Placement_Audit.pdf',
    category: 'Accreditation',
    format: 'PDF',
    dateCreated: '3 days ago',
    size: '2.1 MB'
  },
  {
    id: 4,
    name: 'CSPIT_Candidate_Hires_Master_2025.xlsx',
    category: 'Audit Log',
    format: 'XLSX',
    dateCreated: 'July 15, 2025',
    size: '342 KB'
  }
];

export default function Reports() {
  const [reports, setReports] = useState<HistoricalReport[]>(initialReports);
  
  // Form State
  const [reportType, setReportType] = useState('NBA Placement Audit Report');
  const [departmentScope, setDepartmentScope] = useState('All');
  const [academicCycle, setAcademicCycle] = useState('2026');
  const [exportFormat, setExportFormat] = useState('PDF');

  // Compilation States
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilePercent, setCompilePercent] = useState(0);
  const [compileStep, setCompileStep] = useState('');

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCompiling) return;

    setIsCompiling(true);
    setCompilePercent(0);
    setCompileStep('[1/3] Reading CHARUSAT Placement Registry Database...');

    // Phase 1 loader
    setTimeout(() => {
      setCompilePercent(35);
      setCompileStep('[2/3] Analyzing CGPA threshold cutoffs and D2D profiles...');
    }, 800);

    // Phase 2 loader
    setTimeout(() => {
      setCompilePercent(70);
      setCompileStep('[3/3] Compiling SVG charts and packing PDF booklets...');
    }, 1800);

    // Finish loader
    setTimeout(() => {
      setCompilePercent(100);
      setCompileStep('Report Pack compiled successfully!');
      
      const fileCode = Math.floor(1000 + Math.random() * 9000);
      const categoryMap: Record<string, 'Accreditation' | 'Brochure' | 'Audit Log'> = {
        'NBA Placement Audit Report': 'Accreditation',
        'NAAC Criterion 5.2.1 Data Pack': 'Accreditation',
        'NIRF Institution Data Sheet': 'Accreditation',
        'Recruitment Brochure Booklet': 'Brochure',
        'Student Detailed Offer Log': 'Audit Log'
      };

      const newReport: HistoricalReport = {
        id: reports.length + 1,
        name: `${departmentScope === 'All' ? 'CHARUSAT' : departmentScope}_${reportType.replace(/ /g, '_')}_${fileCode}.${exportFormat.toLowerCase()}`,
        category: categoryMap[reportType] || 'Audit Log',
        format: exportFormat as 'PDF' | 'XLSX',
        dateCreated: 'Just now',
        size: exportFormat === 'PDF' ? '1.8 MB' : '92 KB'
      };

      setReports([newReport, ...reports]);
      
      setTimeout(() => {
        setIsCompiling(false);
        alert(`Successfully generated report "${newReport.name}"! Available for download in logs.`);
      }, 500);

    }, 2800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Placement Reports</h1>
          <p className="page-subtitle">Configure custom parameters to build accredited placement files, corporate brochures, and candidate audits.</p>
        </div>
      </div>

      {/* Reports Summary KPI row */}
      <div className="applications-metrics-grid">
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Archive size={20} />
          </div>
          <div>
            <span className="kpi-value">{reports.length}</span>
            <span className="kpi-label">Total Exported Reports</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)' }}>
            <Clock size={20} />
          </div>
          <div>
            <span className="kpi-value">Today</span>
            <span className="kpi-label">Last Generated Registry</span>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="kpi-icon" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-secondary)' }}>
            <BarChart size={20} />
          </div>
          <div>
            <span className="kpi-value">NBA/NAAC</span>
            <span className="kpi-label">Format Standards Supported</span>
          </div>
        </div>

      </div>

      <div className="analytics-grid-two">
        
        {/* Left Card - Form Parameterizer */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="card-title" style={{ display: 'flex', gap: '6px', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-sm)' }}>
            <Settings size={16} style={{ color: 'var(--primary)' }} />
            <span>Configure Document Parameters</span>
          </div>

          <form onSubmit={handleGenerateReport} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-xs)' }}>
            
            <div className="form-group">
              <label className="form-label">Select Report Type *</label>
              <select 
                className="form-control"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                disabled={isCompiling}
              >
                <option value="NBA Placement Audit Report">NBA Tier-1 Placement Audit (Standard Output)</option>
                <option value="NAAC Criterion 5.2.1 Data Pack">NAAC Criterion 5.2.1 (Student Offer Records)</option>
                <option value="NIRF Institution Data Sheet">NIRF Institution Placements Spreadsheet</option>
                <option value="Recruitment Brochure Booklet">CHARUSAT Recruitment Brochure Booklet</option>
                <option value="Student Detailed Offer Log">Student Detailed Offers & Package Registry Log</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Department Scope *</label>
              <select 
                className="form-control"
                value={departmentScope}
                onChange={(e) => setDepartmentScope(e.target.value)}
                disabled={isCompiling}
              >
                <option value="All">All CHARUSAT Departments (DEPSTAR & CSPIT)</option>
                <option value="DEPSTAR">DEPSTAR Constituent Only (CE, CSE, IT)</option>
                <option value="CSPIT">CSPIT Constituent Only (All 8 engineering branches)</option>
              </select>
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
              <div className="form-group">
                <label className="form-label">Academic Cycle *</label>
                <select 
                  className="form-control"
                  value={academicCycle}
                  onChange={(e) => setAcademicCycle(e.target.value)}
                  disabled={isCompiling}
                >
                  <option value="2026">AY 2025-2026 (Active)</option>
                  <option value="2025">AY 2024-2025 (Archive)</option>
                  <option value="2024">AY 2023-2024 (Archive)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Export File Format *</label>
                <select 
                  className="form-control"
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  disabled={isCompiling}
                >
                  <option value="PDF">Aesthetic PDF Booklet</option>
                  <option value="XLSX">Audit Excel Spreadsheet (XLSX)</option>
                </select>
              </div>
            </div>

            {/* Progress indicator */}
            {isCompiling && (
              <div style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)', marginTop: 'var(--space-xs)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  <span>Compiling Document...</span>
                  <span>{compilePercent}%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--border)', borderRadius: 'var(--radius-full)', overflow: 'hidden', margin: '8px 0' }}>
                  <div style={{ width: `${compilePercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)', transition: 'width 0.3s ease', borderRadius: 'var(--radius-full)' }}></div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <RefreshCw size={11} className="spinner-icon" style={{ color: 'var(--primary)' }} />
                  <span>{compileStep}</span>
                </div>
              </div>
            )}

            {!isCompiling && (
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '10px', marginTop: 'var(--space-sm)' }}
              >
                <FileText size={14} />
                <span>Compile and Dispatch Report</span>
              </button>
            )}

          </form>

        </div>

        {/* Right Card - Export Logs */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div className="card-title" style={{ display: 'flex', gap: '6px', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-sm)' }}>
            <Archive size={16} style={{ color: 'var(--accent)' }} />
            <span>Historical Generated Packets</span>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Standard</th>
                  <th>Created</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                        {report.format === 'PDF' ? (
                          <FileText size={16} style={{ color: 'var(--danger)', flexShrink: 0 }} />
                        ) : (
                          <FileSpreadsheet size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                          <span style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={report.name}>
                            {report.name}
                          </span>
                          <span style={{ fontSize: '10.5px', color: 'var(--text-tertiary)' }}>{report.size}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${report.category === 'Accreditation' ? 'badge-info' : report.category === 'Brochure' ? 'badge-success' : 'badge-warning'}`}>
                        {report.category}
                      </span>
                    </td>
                    <td style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                      {report.dateCreated}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="icon-btn"
                        onClick={() => alert(`Initiating secure local download for ${report.name}...`)}
                        style={{ padding: '6px', color: 'var(--primary)' }}
                        title="Download file"
                      >
                        <Download size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-tertiary)', marginTop: 'auto' }}>
            <Calendar size={12} />
            <span>Files are encrypted at rest and cached for up to 30 days.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
