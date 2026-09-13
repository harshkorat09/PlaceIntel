import { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles,
  AlertCircle,
  Mail,
  Plus,
  Calendar,
  X,
  ExternalLink
} from 'lucide-react';
import { apiClient } from '../api/client';




export default function Companies({ role = 'officer' }: { role?: 'officer' | 'student' }) {
  const isAdmin = role === 'officer';
  const [companies, setCompanies] = useState<any[]>([]);

  const fetchCompanies = async () => {
    try {
      const res = await apiClient.get('/companies');
      if (res.success) {
        setCompanies(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [volumeFilter, setVolumeFilter] = useState('All');

  // Selected Company for Drawer
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);

  // Form Panel Toggle
  const [isFormOpen, setIsFormOpen] = useState(false);

  // New Company Form State
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newSector, setNewSector] = useState<'Technology' | 'Finance & Banking' | 'Consulting' | 'Automotive' | 'Core Engineering'>('Technology');
  const [newHiresDepstar, setNewHiresDepstar] = useState('0');
  const [newHiresCspit, setNewHiresCspit] = useState('0');
  const [newAvgPackage, setNewAvgPackage] = useState('');
  const [newHrName, setNewHrName] = useState('');
  const [newHrEmail, setNewHrEmail] = useState('');
  const [newHrPhone, setNewHrPhone] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newStatus, setNewStatus] = useState<'Active Recruiter' | 'Outreach'>('Active Recruiter');

  // Form Submission
  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName || !newAvgPackage || !newHrName || !newHrEmail) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const res = await apiClient.post('/companies', {
        name: newCompanyName,
        sector: newSector,
        hiresDepstar: parseInt(newHiresDepstar) || 0,
        hiresCspit: parseInt(newHiresCspit) || 0,
        status: newStatus,
        avgPackage: parseFloat(newAvgPackage),
        notes: newNotes || 'No notes available.',
        website: 'https://' + newCompanyName.toLowerCase().replace(' ', '') + '.com'
      });

      if (res.success) {
        setIsFormOpen(false);
        fetchCompanies();
        
        setNewCompanyName('');
        setNewSector('Technology');
        setNewStatus('Active Recruiter');
        setNewAvgPackage('');
        setNewHrName('');
        setNewHrEmail('');
        setNewHrPhone('');
        setNewHiresDepstar('');
        setNewHiresCspit('');
        setNewNotes('');
      } else {
        alert(res.message || 'Failed to create company');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating company');
    }
  };

  const selectedCompany = companies.find(c => c.id === selectedCompanyId);

  // Filter logic
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.sector.toLowerCase().includes(search.toLowerCase());

    const matchesSector = sectorFilter === 'All' || company.sector === sectorFilter;
    const matchesStatus = statusFilter === 'All' || company.status === statusFilter;
    
    const totalHires = company.hiresDepstar + company.hiresCspit;
    let matchesVolume = true;
    if (volumeFilter === 'High') {
      matchesVolume = totalHires >= 50;
    } else if (volumeFilter === 'Mid') {
      matchesVolume = totalHires >= 10 && totalHires < 50;
    } else if (volumeFilter === 'Low') {
      matchesVolume = totalHires < 10;
    }

    return matchesSearch && matchesSector && matchesStatus && matchesVolume;
  });

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Active Recruiter':
        return <span className="badge badge-success">{status}</span>;
      case 'Outreach':
        return <span className="badge badge-info" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>{status}</span>;
      default:
        return <span className="badge" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-secondary)' }}>{status}</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Company Partners</h1>
          <p className="page-subtitle">Coordinate corporate recruiter relations, check historical volumes, and manage visit schedules.</p>
        </div>
        {isAdmin && (
          <button 
            className="btn btn-primary"
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            <Plus size={16} />
            {isFormOpen ? 'Close Form' : 'Register New Partner'}
          </button>
        )}
      </div>

      {/* Main Grid Layout */}
      <div className="companies-layout">
        
        {/* Left List Pane */}
        <div className="companies-list-pane">
          
          {/* Filters Bar */}
          <div className="filters-bar">
            <div className="filter-input-group">
              <Search size={16} style={{ color: 'var(--text-tertiary)' }} />
              <input 
                type="text" 
                placeholder="Search company name or industry..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select 
              className="filter-select"
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
            >
              <option value="All">All Sectors</option>
              <option value="Technology">Technology</option>
              <option value="Finance & Banking">Finance & Banking</option>
              <option value="Consulting">Consulting</option>
              <option value="Automotive">Automotive</option>
            </select>

            <select 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active Recruiter">Active Recruiter</option>
              <option value="Outreach">Outreach</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select 
              className="filter-select"
              value={volumeFilter}
              onChange={(e) => setVolumeFilter(e.target.value)}
            >
              <option value="All">Any Hire Volume</option>
              <option value="High">High Hires (&ge; 50)</option>
              <option value="Mid">Mid Hires (10 - 49)</option>
              <option value="Low">Low Hires (&lt; 10)</option>
            </select>

            {(search || sectorFilter !== 'All' || statusFilter !== 'All' || volumeFilter !== 'All') && (
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSearch('');
                  setSectorFilter('All');
                  setStatusFilter('All');
                  setVolumeFilter('All');
                }}
                style={{ padding: '6px 10px' }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Companies Grid */}
          <div className="companies-grid">
            {filteredCompanies.length === 0 ? (
              <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-xl)' }}>
                <AlertCircle size={36} style={{ color: 'var(--text-tertiary)', margin: '0 auto var(--space-md)' }} />
                <h3>No partners match your criteria</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-xs)', fontSize: '13px' }}>Try resetting your search string or filter options.</p>
              </div>
            ) : (
              filteredCompanies.map(company => {
                const totalHires = company.hiresDepstar + company.hiresCspit;
                const depstarPct = totalHires === 0 ? 0 : Math.round((company.hiresDepstar / totalHires) * 100);

                return (
                  <div 
                    key={company.id} 
                    className="card company-card"
                    style={{ cursor: 'pointer', border: selectedCompanyId === company.id ? '1px solid var(--primary)' : '1px solid var(--border)' }}
                    onClick={() => setSelectedCompanyId(company.id)}
                  >
                    
                    {/* Header */}
                    <div className="drive-card-header">
                      <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                        <div className="company-logo-badge" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-primary)' }}>
                          {company.name.charAt(0)}
                        </div>
                        <div className="drive-title-block">
                          <span className="drive-company-name">{company.name}</span>
                          <span className="drive-role" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{company.sector}</span>
                        </div>
                      </div>
                      <div className="drive-badge-container">
                        {renderStatusBadge(company.status)}
                      </div>
                    </div>

                    {/* Stats Box */}
                    <div className="drive-details-grid" style={{ padding: '10px 14px' }}>
                      <div className="detail-item">
                        <span className="detail-label">Avg Package</span>
                        <span className="detail-value" style={{ color: 'var(--primary)', fontWeight: '600' }}>₹{company.avgPackage.toFixed(1)} LPA</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Total Hired</span>
                        <span className="detail-value" style={{ fontWeight: '600' }}>{totalHires} Students</span>
                      </div>
                    </div>

                    {/* Hire Splits Bar */}
                    {totalHires > 0 && (
                      <div className="hire-share-container">
                        <div className="hire-share-header">
                          <span>Hires Share Split</span>
                          <span>DEPSTAR {depstarPct}% · CSPIT {100 - depstarPct}%</span>
                        </div>
                        <div className="hire-share-bar">
                          <div className="hire-share-fill" style={{ width: `${depstarPct}%`, backgroundColor: 'var(--primary)' }} title="DEPSTAR hires"></div>
                          <div className="hire-share-fill" style={{ width: `${100 - depstarPct}%`, backgroundColor: 'var(--secondary)' }} title="CSPIT hires"></div>
                        </div>
                        <div className="hire-share-labels">
                          <span>DEPSTAR: {company.hiresDepstar}</span>
                          <span>CSPIT: {company.hiresCspit}</span>
                        </div>
                      </div>
                    )}

                    {/* Core Recruiter Contact */}
                    {company.hrContacts.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: '12px', color: 'var(--text-secondary)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-sm)', marginTop: 'var(--space-xs)' }}>
                        <Mail size={12} style={{ color: 'var(--text-tertiary)' }} />
                        <span>{company.hrContacts[0].name} ({company.hrContacts[0].email})</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 'var(--space-sm)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-sm)' }}>
                      <button 
                        className="btn btn-secondary btn-sm" 
                        style={{ flex: 1, padding: '4px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCompanyId(company.id);
                        }}
                      >
                        Company Profile
                      </button>
                      <button 
                        className="btn btn-primary btn-sm" 
                        style={{ padding: '4px 10px', backgroundColor: 'var(--secondary)' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Drafting campus visit invitation for ${company.name} Talent Acquisition...`);
                        }}
                      >
                        <Calendar size={12} />
                        Invite
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sliding Company Detail Drawer */}
        {selectedCompany && (
          <div className="card company-drawer-pane">
            {/* Close Button Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="avatar-lg" style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--text-primary)', width: '56px', height: '56px', fontSize: '20px' }}>
                {selectedCompany.name.charAt(0)}
              </div>
              <button 
                className="icon-btn" 
                onClick={() => setSelectedCompanyId(null)}
                style={{ padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Profile Header */}
            <div className="drawer-profile-header">
              <span className="drawer-profile-name">{selectedCompany.name}</span>
              <a 
                href={selectedCompany.website} 
                target="_blank" 
                rel="noreferrer" 
                style={{ fontSize: '12px', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px', marginTop: 'var(--space-xs)' }}
              >
                {selectedCompany.website}
                <ExternalLink size={12} />
              </a>
              <div style={{ marginTop: 'var(--space-sm)' }}>
                {renderStatusBadge(selectedCompany.status)}
              </div>
            </div>

            {/* Core Stats */}
            <div className="profile-meta-grid">
              <div className="detail-item">
                <span className="detail-label">Sector</span>
                <span className="detail-value">{selectedCompany.sector}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Avg Package</span>
                <span className="detail-value" style={{ color: 'var(--primary)', fontWeight: '600' }}>₹{selectedCompany.avgPackage.toFixed(1)} LPA</span>
              </div>
              <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                <span className="detail-label">CHARUSAT Footprint</span>
                <span className="detail-value" style={{ fontWeight: '600' }}>
                  {selectedCompany.hiresDepstar + selectedCompany.hiresCspit} Hired Students ({selectedCompany.hiresDepstar} DEPSTAR / {selectedCompany.hiresCspit} CSPIT)
                </span>
              </div>
            </div>

            {/* HR Contact Directory — admin only */}
            {isAdmin && (
              <div style={{ padding: '0 var(--space-md) var(--space-md)' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
                  <Mail size={16} style={{ color: 'var(--text-secondary)' }} />
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>HR Contact Directory</strong>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedCompany.hrContacts?.map((hr: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{hr.name}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{hr.role}</span>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '500' }}>{hr.email}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{hr.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Recruiter Notes — admin only */}
            {isAdmin && (
              <div style={{ padding: 'var(--space-md)' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                  <Sparkles size={16} style={{ color: 'var(--primary)' }} />
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Recruiter Notes & Insights</strong>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', backgroundColor: 'var(--background)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  {selectedCompany.notes}
                </div>
              </div>
            )}

            <div className="timeline-container">
              <span className="detail-label">Recruitment & Visit Timeline</span>
              <div className="app-timeline">
                {selectedCompany.visits?.map((visit: any, i: number) => (
                  <div key={i} className="timeline-step">
                    <div className="timeline-dot active"></div>
                    <div className="timeline-step-details">
                      <div>
                        <div className="timeline-step-title">{visit.event}</div>
                        <div className="timeline-step-role" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{visit.details}</div>
                      </div>
                      <div className="timeline-step-date" style={{ whiteSpace: 'nowrap' }}>
                        {visit.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Actions - admin only */}
            {isAdmin && (
              <div style={{ display: 'flex', gap: 'var(--space-sm)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-md)', marginTop: 'var(--space-xs)' }}>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1 }}
                  onClick={() => alert(`Generating PDF hiring report for ${selectedCompany.name}...`)}
                >
                  Hiring Report
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1, backgroundColor: 'var(--secondary)' }}
                  onClick={() => alert(`Opening interview panel scheduler for ${selectedCompany.name} visit...`)}
                >
                  Schedule Visit
                </button>
              </div>
            )}

          </div>
        )}

        {/* New Company Registration Form Pane — admin only */}
        {isAdmin && isFormOpen && (
          <div className="card drives-form-pane">
            <div className="card-title" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-sm)' }}>
              <span>Add Recruiter Partner</span>
            </div>

            <form onSubmit={handleCreateCompany} style={{ marginTop: 'var(--space-md)' }}>
              
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
                <label className="form-label">Sector / Industry *</label>
                <select 
                  className="form-control"
                  value={newSector}
                  onChange={(e) => setNewSector(e.target.value as any)}
                >
                  <option value="Technology">Technology</option>
                  <option value="Finance & Banking">Finance & Banking</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Core Engineering">Core Engineering</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">DEPSTAR Hires</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={newHiresDepstar}
                    onChange={(e) => setNewHiresDepstar(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">CSPIT Hires</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={newHiresCspit}
                    onChange={(e) => setNewHiresCspit(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Average Package (LPA) *</label>
                <input 
                  type="number" 
                  step="0.1"
                  className="form-control" 
                  placeholder="e.g. 15.5" 
                  value={newAvgPackage}
                  onChange={(e) => setNewAvgPackage(e.target.value)}
                  required
                />
              </div>

              <div style={{ borderBottom: '1px solid var(--border)', margin: 'var(--space-md) 0 var(--space-sm)' }}>
                <span className="detail-label">Recruiter Contact</span>
              </div>

              <div className="form-group">
                <label className="form-label">HR Contact Name *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Neha Shah" 
                  value={newHrName}
                  onChange={(e) => setNewHrName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">HR Email *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="neha@company.com" 
                    value={newHrEmail}
                    onChange={(e) => setNewHrEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">HR Phone</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="+91..." 
                    value={newHrPhone}
                    onChange={(e) => setNewHrPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Recruiter Status</label>
                <select 
                  className="form-control"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                >
                  <option value="Active Recruiter">Active Recruiter</option>
                  <option value="Outreach">Outreach Invitation</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">AI Insights / Feedback Notes</label>
                <textarea 
                  className="form-control" 
                  placeholder="Recruiter comments or placement preparation advice..." 
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  rows={3}
                  style={{ fontFamily: 'var(--font-sans)', resize: 'vertical' }}
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
                  Save Partner
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
