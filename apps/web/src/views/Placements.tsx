import { useState, useEffect } from 'react';
import {
  Search, 
  Plus, 
  Clock, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { placementService } from '../api/placementService';
import type { Placement } from '../api/types';





export default function Placements() {
  const [drives, setDrives] = useState<Placement[]>([]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');
  const [minCtc, setMinCtc] = useState(0);

  const fetchDrives = async () => {
    try {
      // Filtering is done client-side for now with mock data
      const data = await placementService.getPlacements();
      setDrives(data);
    } catch (error) {
      console.error('Failed to fetch placements:', error);
    }
  };

  useEffect(() => {
    fetchDrives();
  }, [branchFilter, minCtc, search]);
  
  // Form Drawer Toggle
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // New Drive Form State
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newCtc, setNewCtc] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newCgpa, setNewCgpa] = useState('7.0');
  const [newBranches, setNewBranches] = useState<string[]>(['CSE', 'IT']);
  const [newSkills, setNewSkills] = useState('');

  // Handle Form Submission
  const handleCreateDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName || !newPosition || !newCtc || !newDeadline) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const newPlacement = await placementService.createPlacement({
        companyName: newCompanyName,
        role: newPosition,
        packageRange: newCtc + ' LPA',
        deadline: newDeadline,
        cgpaRequirement: parseFloat(newCgpa),
        description: 'New drive',
        eligibleBranches: newBranches,
        requiredSkills: newSkills.split(',').map(s => s.trim()).filter(s => s),
        status: 'Upcoming'
      });

      setIsFormOpen(false);
      setDrives(prev => [...prev, newPlacement]);
      
      // Reset form
      setNewCompanyName('');
      setNewPosition('');
      setNewCtc('');
      setNewDeadline('');
      setNewCgpa('7.0');
      setNewBranches(['CSE', 'IT']);
      setNewSkills('');
    } catch (error) {
      console.error(error);
      alert('Error creating placement');
    }
  };

  // Toggle Branch Checkbox
  const handleBranchToggle = (branch: string) => {
    if (newBranches.includes(branch)) {
      setNewBranches(newBranches.filter(b => b !== branch));
    } else {
      setNewBranches([...newBranches, branch]);
    }
  };

  // Filter drives
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

  // Helper for Status Badge styling
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
          onClick={() => setIsFormOpen(!isFormOpen)}
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

            <form onSubmit={handleCreateDrive} style={{ marginTop: 'var(--space-md)' }}>
              
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Amazon India" 
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  required
                />
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

              <div className="form-group">
                <label className="form-label">Eligible Branches</label>
                <div className="checkbox-group">
                  {['CSE', 'IT', 'ECE', 'ME', 'EE'].map(branch => (
                    <label 
                      key={branch} 
                      className={`checkbox-btn ${newBranches.includes(branch) ? 'checked' : ''}`}
                    >
                      <input 
                        type="checkbox" 
                        checked={newBranches.includes(branch)}
                        onChange={() => handleBranchToggle(branch)}
                      />
                      {branch}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Required Skills (Comma separated)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. React, Node.js, AWS" 
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setIsFormOpen(false)}
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ flex: 1 }}
                >
                  Schedule Drive
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
