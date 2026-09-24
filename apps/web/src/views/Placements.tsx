import { useState, useEffect, useRef } from 'react';
import {
  Search, 
  Plus, 
  Clock, 
  Sparkles,
  AlertCircle,
  Upload,
  X,
  FileText
} from 'lucide-react';
import { placementService } from '../api/placementService';
import { apiClient } from '../api/client';
import type { Placement } from '../api/types';

// ---------------------------------------------------------------------------
// Types for real API entities
// ---------------------------------------------------------------------------
interface ApiCompany { id: number; name: string; }
interface ApiBranch  { id: number; name: string; }
interface ApiSkill   { id: number; name: string; }

export default function Placements() {
  const [drives, setDrives] = useState<Placement[]>([]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');
  const [minCtc, setMinCtc] = useState(0);

  // ---------------------------------------------------------------------------
  // Reference data loaded from the real API
  // ---------------------------------------------------------------------------
  const [companies, setCompanies] = useState<ApiCompany[]>([]);
  const [allBranches, setAllBranches] = useState<ApiBranch[]>([]);
  const [allSkills, setAllSkills] = useState<ApiSkill[]>([]);

  const fetchDrives = async () => {
    try {
      const data = await placementService.getPlacements();
      setDrives(data);
    } catch (error) {
      console.error('Failed to fetch placements:', error);
    }
  };

  useEffect(() => {
    fetchDrives();
  }, [branchFilter, minCtc, search]);

  // Load companies, branches, and skills once on mount
  useEffect(() => {
    apiClient.get('/companies')
      .then(r => setCompanies(r || []))
      .catch(e => console.error('Failed to load companies', e));

    apiClient.get('/branches')
      .then(r => setAllBranches(r || []))
      .catch(e => console.error('Failed to load branches', e));

    apiClient.get('/skills')
      .then(r => setAllSkills(r || []))
      .catch(e => console.error('Failed to load skills', e));
  }, []);

  // ---------------------------------------------------------------------------
  // Form Drawer Toggle
  // ---------------------------------------------------------------------------
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Refresh companies when Schedule Drive drawer is opened
  useEffect(() => {
    if (isFormOpen) {
      apiClient.get('/companies')
        .then(r => setCompanies(r || []))
        .catch(e => console.error('Failed to refresh companies', e));
    }
  }, [isFormOpen]);

  // New Drive Form State — IDs for company/branches/skills
  const [newCompanyId, setNewCompanyId] = useState<number | ''>('');
  const [newPosition, setNewPosition] = useState('');
  const [newCtc, setNewCtc] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newCgpa, setNewCgpa] = useState('7.0');
  const [newBranchIds, setNewBranchIds] = useState<number[]>([]);
  const [newSkillIds, setNewSkillIds] = useState<number[]>([]);

  // Optional PDF notice
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | 'warn'; message: string } | null>(null);

  // ---------------------------------------------------------------------------
  // Handle Form Submission
  // ---------------------------------------------------------------------------
  const handleCreateDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyId || !newPosition || !newCtc || !newDeadline) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { placement, noticeResult } = await placementService.createPlacement(
        {
          companyId: Number(newCompanyId),
          position: newPosition,
          ctc: parseFloat(newCtc),
          deadline: newDeadline,
          cgpaCutoff: parseFloat(newCgpa),
          description: 'Scheduled via Placement Officer portal.',
          branchIds: newBranchIds,
          skillIds: newSkillIds,
        },
        pdfFile ?? undefined,
      );

      // Determine final status message
      if (pdfFile && noticeResult && !noticeResult.success) {
        setSubmitStatus({
          type: 'warn',
          message: `Placement created (ID: ${placement.id}), but notice ingestion failed: ${noticeResult.message}`,
        });
      } else if (pdfFile && noticeResult?.success) {
        setSubmitStatus({
          type: 'success',
          message: `Placement created and notice ingested successfully.`,
        });
      } else {
        setSubmitStatus({ type: 'success', message: 'Placement created successfully.' });
      }

      setDrives(prev => [...prev, placement]);

      // Reset form
      setNewCompanyId('');
      setNewPosition('');
      setNewCtc('');
      setNewDeadline('');
      setNewCgpa('7.0');
      setNewBranchIds([]);
      setNewSkillIds([]);
      setPdfFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (error: any) {
      console.error(error);
      setSubmitStatus({ type: 'error', message: error?.message || 'Error creating placement.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Toggle Branch / Skill checkboxes
  // ---------------------------------------------------------------------------
  const handleBranchToggle = (id: number) => {
    setNewBranchIds(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const handleSkillToggle = (id: number) => {
    setNewSkillIds(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // ---------------------------------------------------------------------------
  // PDF file handling
  // ---------------------------------------------------------------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.type !== 'application/pdf') {
      alert('Only PDF files are accepted.');
      e.target.value = '';
      setPdfFile(null);
      return;
    }
    setPdfFile(file);
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ---------------------------------------------------------------------------
  // Filter drives
  // ---------------------------------------------------------------------------
  const filteredDrives = drives.filter(drive => {
    const matchesSearch = 
      drive.companyName.toLowerCase().includes(search.toLowerCase()) ||
      drive.role.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = 
      statusFilter === 'All' || 
      drive.status.toLowerCase().replace(' ', '') === statusFilter.toLowerCase().replace(' ', '');
      
    const matchesBranch = 
      branchFilter === 'All' || 
      drive.eligibleBranches.includes(branchFilter);
      
    const ctcValue = parseFloat(drive.packageRange);
    const matchesCtc = !isNaN(ctcValue) ? ctcValue >= minCtc : true;
    
    return matchesSearch && matchesStatus && matchesBranch && matchesCtc;
  });

  // ---------------------------------------------------------------------------
  // Helper for Status Badge styling
  // ---------------------------------------------------------------------------
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Registration Open':
        return <span className="badge badge-info">{status}</span>;
      case 'Shortlisting':
        return <span className="badge badge-warning">{status}</span>;
      case 'Ongoing':
        return <span className="badge badge-warning" style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)' }}>{status}</span>;
      case 'Upcoming':
        return <span className="badge" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-secondary)' }}>{status}</span>;
      case 'Completed':
        return <span className="badge badge-success">{status}</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Placement Drives</h1>
          <p className="page-subtitle">Schedule, track, and manage corporate recruitment drives for students.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => { setIsFormOpen(!isFormOpen); setSubmitStatus(null); }}
        >
          <Plus size={16} />
          {isFormOpen ? 'Close Scheduler' : 'Schedule New Drive'}
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="drives-layout">
        
        {/* Drives List Pane */}
        <div className="drives-list-pane">
          
          {/* Filters Bar */}
          <div className="filters-bar">
            <div className="filter-input-group">
              <Search size={16} style={{ color: 'var(--text-tertiary)' }} />
              <input 
                type="text" 
                placeholder="Search company or job designation..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Registration Open">Registration Open</option>
              <option value="Shortlisting">Shortlisting</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>

            <select 
              className="filter-select"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option value="All">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
              <option value="EE">EE</option>
            </select>

            <select 
              className="filter-select"
              value={minCtc.toString()}
              onChange={(e) => setMinCtc(Number(e.target.value))}
            >
              <option value="0">Any Package</option>
              <option value="10">CTC &gt; 10 LPA</option>
              <option value="20">CTC &gt; 20 LPA</option>
              <option value="30">CTC &gt; 30 LPA</option>
            </select>

            {(search || statusFilter !== 'All' || branchFilter !== 'All' || minCtc > 0) && (
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSearch('');
                  setStatusFilter('All');
                  setBranchFilter('All');
                  setMinCtc(0);
                }}
                style={{ padding: '6px 10px' }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Drives Grid */}
          <div className="drives-grid">
            {filteredDrives.length === 0 ? (
              <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-xl)' }}>
                <AlertCircle size={36} style={{ color: 'var(--text-tertiary)', margin: '0 auto var(--space-md)' }} />
                <h3>No drives match your filters</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-xs)', fontSize: '13px' }}>Try adjusting your search keywords, branch eligibility, or compensation parameters.</p>
              </div>
            ) : (
              filteredDrives.map(drive => {
                return (
                  <div key={drive.id} className="card drive-card">
                    {/* Header */}
                    <div className="drive-card-header">
                      <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                        <div className="company-logo-badge">
                          {drive.companyName.charAt(0)}
                        </div>
                        <div className="drive-title-block">
                          <span className="drive-company-name">{drive.companyName}</span>
                          <span className="drive-role">{drive.role}</span>
                        </div>
                      </div>
                      <div className="drive-badge-container">
                        {renderStatusBadge(drive.status)}
                      </div>
                    </div>

                    {/* Details Box */}
                    <div className="drive-details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Compensation</span>
                        <span className="detail-value" style={{ color: 'var(--primary)', fontWeight: '600' }}>{drive.packageRange}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">CGPA Cutoff</span>
                        <span className="detail-value">≽ {drive.cgpaRequirement.toFixed(1)}</span>
                      </div>
                      <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                        <span className="detail-label">Registration Deadline</span>
                        <span className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} style={{ color: 'var(--text-secondary)' }} />
                          {drive.deadline}
                        </span>
                      </div>
                      <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                        <span className="detail-label">Eligible Branches</span>
                        <span className="detail-value">{drive.eligibleBranches.join(', ')}</span>
                      </div>
                    </div>

                    {/* Core Skills */}
                    <div className="skills-list">
                      {drive.requiredSkills?.map((skill: string, i: number) => (
                        <span key={i} className="skill-tag">{skill}</span>
                      ))}
                    </div>

                    {/* Bottom Actions */}
                    <div style={{ display: 'flex', gap: 'var(--space-sm)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-md)', marginTop: 'var(--space-xs)' }}>
                      <button 
                        className="btn btn-primary btn-sm" 
                        style={{ padding: '6px 10px', display: 'flex', gap: '4px', backgroundColor: 'var(--secondary)', color: 'white' }}
                        title="AI Matching Index"
                      >
                        <Sparkles size={12} style={{ color: 'var(--accent)' }} />
                        <span>AI Match</span>
                      </button>
                    </div>


                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Schedule Drive Form Drawer */}
        {isFormOpen && (
          <div className="card drives-form-pane">
            <div className="card-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-sm)' }}>
              <span>Schedule Recruitment Drive</span>
            </div>

            {/* Submission status banner */}
            {submitStatus && (
              <div
                style={{
                  marginTop: 'var(--space-md)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  backgroundColor:
                    submitStatus.type === 'success' ? 'rgba(34,197,94,0.1)' :
                    submitStatus.type === 'warn'    ? 'rgba(234,179,8,0.1)' :
                                                     'rgba(239,68,68,0.1)',
                  color:
                    submitStatus.type === 'success' ? 'var(--success, #16a34a)' :
                    submitStatus.type === 'warn'    ? '#b45309' :
                                                     'var(--danger, #dc2626)',
                  border: `1px solid ${
                    submitStatus.type === 'success' ? 'rgba(34,197,94,0.3)' :
                    submitStatus.type === 'warn'    ? 'rgba(234,179,8,0.3)' :
                                                     'rgba(239,68,68,0.3)'
                  }`,
                }}
              >
                <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '1px' }} />
                <span>{submitStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleCreateDrive} style={{ marginTop: 'var(--space-md)' }}>
              
              {/* Company dropdown (real API) */}
              <div className="form-group">
                <label className="form-label">Company *</label>
                <select
                  className="form-control"
                  value={newCompanyId}
                  onChange={(e) => setNewCompanyId(e.target.value ? Number(e.target.value) : '')}
                  required
                >
                  <option value="">— Select a company —</option>
                  {companies.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Job Designation *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Cloud Engineer" 
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">CTC Package (LPA) *</label>
                  <input 
                    type="number" 
                    step="0.1"
                    className="form-control" 
                    placeholder="e.g. 18.5" 
                    value={newCtc}
                    onChange={(e) => setNewCtc(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Min CGPA Cutoff</label>
                  <select 
                    className="form-control"
                    value={newCgpa}
                    onChange={(e) => setNewCgpa(e.target.value)}
                  >
                    <option value="6.0">≽ 6.0 CGPA</option>
                    <option value="6.5">≽ 6.5 CGPA</option>
                    <option value="7.0">≽ 7.0 CGPA</option>
                    <option value="7.5">≽ 7.5 CGPA</option>
                    <option value="8.0">≽ 8.0 CGPA</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Registration Deadline *</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  required
                />
              </div>

              {/* Eligible Branches — resolved to IDs */}
              <div className="form-group">
                <label className="form-label">Eligible Branches</label>
                <div className="checkbox-group">
                  {allBranches.map(branch => (
                    <label 
                      key={branch.id} 
                      className={`checkbox-btn ${newBranchIds.includes(branch.id) ? 'checked' : ''}`}
                    >
                      <input 
                        type="checkbox" 
                        checked={newBranchIds.includes(branch.id)}
                        onChange={() => handleBranchToggle(branch.id)}
                      />
                      {branch.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Required Skills — resolved to IDs */}
              <div className="form-group">
                <label className="form-label">Required Skills</label>
                <div className="checkbox-group" style={{ flexWrap: 'wrap', gap: '6px' }}>
                  {allSkills.map(skill => (
                    <label 
                      key={skill.id} 
                      className={`checkbox-btn ${newSkillIds.includes(skill.id) ? 'checked' : ''}`}
                    >
                      <input 
                        type="checkbox" 
                        checked={newSkillIds.includes(skill.id)}
                        onChange={() => handleSkillToggle(skill.id)}
                      />
                      {skill.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Optional PDF Notice Upload */}
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={14} />
                  Placement Notice PDF
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 400 }}>(Optional)</span>
                </label>

                {pdfFile ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--secondary-light, rgba(79,70,229,0.05))',
                    }}
                  >
                    <FileText size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {pdfFile.name}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', flexShrink: 0 }}>
                      {(pdfFile.size / 1024).toFixed(0)} KB
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: 'var(--text-tertiary)', flexShrink: 0 }}
                      title="Remove file"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="pdf-upload"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '16px',
                      borderRadius: '8px',
                      border: '1.5px dashed var(--border)',
                      cursor: 'pointer',
                      color: 'var(--text-tertiary)',
                      fontSize: '13px',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <Upload size={18} />
                    <span>Click to upload PDF notice</span>
                    <span style={{ fontSize: '11px' }}>Max 10 MB · PDF only</span>
                    <input
                      id="pdf-upload"
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => { setIsFormOpen(false); setSubmitStatus(null); }}
                  style={{ flex: 1 }}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ flex: 1 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Scheduling…' : 'Schedule Drive'}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
