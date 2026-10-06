import { useState, useEffect } from 'react';
import { placementService } from '../api/placementService';
import { companyService } from '../api/companyService';
import { apiClient } from '../api/client';
import type { Placement, Company } from '../api/types';

export default function Placements() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1)); 
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPlacement, setSelectedPlacement] = useState<Placement | null>(null);
  const [editPlacementId, setEditPlacementId] = useState<string | null>(null);

  // Form State
  const [formCompanyId, setFormCompanyId] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formMinPackage, setFormMinPackage] = useState('');
  const [formMaxPackage, setFormMaxPackage] = useState('');
  const [formFile, setFormFile] = useState<File | null>(null);
  const [formCgpa, setFormCgpa] = useState('7.0');
  const [formDeadline, setFormDeadline] = useState('');
  const [formDriveDate, setFormDriveDate] = useState('');
  const [formBranchIds, setFormBranchIds] = useState<number[]>([]);
  const [formSkillIds, setFormSkillIds] = useState<number[]>([]);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [pData, cData, bData, sData] = await Promise.all([
        placementService.getPlacements(),
        companyService.getCompanies(),
        apiClient.get('/branches'),
        apiClient.get('/skills')
      ]);
      setPlacements(pData);
      setCompanies(cData);
      setBranches(bData);
      setSkills(sData);
      if (pData.length > 0) setSelectedPlacement(pData[0]);
    } catch (err: any) {
      console.error(err.message || 'Failed to fetch placements');
      setError("Unable to load placement drives. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAddPlacement = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (formDriveDate && formDeadline) {
      if (new Date(formDriveDate) < new Date(formDeadline)) {
        setFormError("Drive date cannot be earlier than the application deadline.");
        return;
      }
    }
    try {
      if (editPlacementId) {
        await placementService.updatePlacement(editPlacementId, {
          position: formRole,
          description: formDesc,
          minPackage: formMinPackage ? parseFloat(formMinPackage) : null,
          maxPackage: formMaxPackage ? parseFloat(formMaxPackage) : null,
          cgpaCutoff: parseFloat(formCgpa) || 0,
          deadline: formDeadline,
          driveDate: formDriveDate || undefined,
          branchIds: formBranchIds,
          skillIds: formSkillIds
        });
      } else {
        await placementService.createPlacement({
          companyId: parseInt(formCompanyId),
          position: formRole,
          description: formDesc,
          minPackage: formMinPackage ? parseFloat(formMinPackage) : null,
          maxPackage: formMaxPackage ? parseFloat(formMaxPackage) : null,
          cgpaCutoff: parseFloat(formCgpa) || 0,
          deadline: formDeadline,
          driveDate: formDriveDate || undefined,
          branchIds: formBranchIds,
          skillIds: formSkillIds
        }, formFile);
      }
      setIsAddModalOpen(false);
      setEditPlacementId(null);
      fetchAll();
    } catch (err) {
      console.error(err);
      setFormError('Failed to schedule drive. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this drive?')) return;
    try {
      await apiClient.delete(`/placements/${id}`);
      setSelectedPlacement(null);
      fetchAll();
    } catch (err) {
      console.error(err);
      setFormError('Failed to delete drive. Please try again.');
    }
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  let firstDay = getFirstDayOfMonth(year, month) - 1;
  if (firstDay === -1) firstDay = 6;
  
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: '', isCurrentMonth: false, date: null });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) });
  }
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({ day: '', isCurrentMonth: false, date: null });
  }

  const getEventsForDay = (date: Date | null) => {
    if (!date) return { drives: [], deadlines: [] };
    const dateStr = date.toISOString().split('T')[0];
    
    const drives = placements.filter(p => p.driveDate === dateStr);
    const deadlines = placements.filter(p => p.deadline === dateStr);
    
    return { drives, deadlines };
  };

  return (
    <div className="flex flex-col w-full">
      {/* Sub-Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-xl">
        <div>
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-uppercase text-label-uppercase tracking-wider uppercase mb-space-xxs">
            <span>PlaceIntel Admin</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Drives Management</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-primary tracking-tight">Placement Drives Calendar</h1>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="bg-surface-container-high p-1 rounded-xl flex items-center shadow-sm">
            <button onClick={() => setViewMode('month')} className={`px-space-md py-1.5 rounded-lg font-title-sm text-title-sm transition-all flex items-center gap-1 ${viewMode === 'month' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'}`} type="button">
              <span className="material-symbols-outlined text-[18px]">calendar_view_month</span>
              Month
            </button>
            <button onClick={() => setViewMode('list')} className={`px-space-md py-1.5 rounded-lg font-title-sm text-title-sm transition-all flex items-center gap-1 ${viewMode === 'list' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant'}`} type="button">
              <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
              List
            </button>
          </div>
          <button 
            className="bg-primary-container hover:bg-tertiary-container text-on-primary px-space-md py-2.5 rounded-xl font-title-sm text-title-sm shadow-md flex items-center gap-space-xs transition-all" 
            onClick={() => {
              setEditPlacementId(null);
              setFormCompanyId('');
              setFormRole('');
              setFormDesc('');
              setFormMinPackage('');
              setFormMaxPackage('');
              setFormFile(null);
              setFormCgpa('7.0');
              setFormDeadline('');
              setFormDriveDate('');
              setFormBranchIds([]);
              setFormSkillIds([]);
              setIsAddModalOpen(true);
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Schedule Drive</span>
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl p-space-md mb-space-lg flex flex-wrap items-center justify-between gap-space-md shadow-sm">
        <div className="flex items-center gap-space-md">
          <div className="flex items-center bg-surface-container-low rounded-xl p-1">
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-all" type="button">
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <span className="px-space-md font-title-md text-title-md text-primary min-w-[170px] text-center">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-all" type="button">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
          <button onClick={() => setCurrentDate(new Date())} className="px-space-md py-1.5 bg-surface-container rounded-lg font-label-uppercase text-label-uppercase uppercase text-primary font-bold hover:bg-surface-container-high transition-colors" type="button">
            Today
          </button>
        </div>
        <div className="flex items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
            <span>Drives</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
            <span>Deadlines</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="flex w-full min-h-[40vh] flex-col items-center justify-center space-y-4">
          <span className="material-symbols-outlined text-4xl text-error">error</span>
          <h2 className="text-xl text-error font-semibold">{error}</h2>
          <button onClick={() => window.location.reload()} className="px-4 py-2 mt-4 bg-surface-container rounded-lg font-medium hover:bg-surface-container-high transition-colors">
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter-lg items-start">
          <div className="xl:col-span-8 bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col">
            {viewMode === 'month' ? (
              <div className="overflow-x-auto w-full">
                <div className="min-w-[700px]">
                  <div className="grid grid-cols-7 bg-surface-container-low text-center py-space-sm font-label-uppercase text-label-uppercase uppercase tracking-wider text-on-surface-variant">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
                <div className="grid grid-cols-7 gap-px bg-surface-container">
                  {days.map((d, idx) => {
                    const { drives, deadlines } = getEventsForDay(d.date);
                    return (
                      <div key={idx} className={`min-h-[110px] p-2 flex flex-col justify-between transition-colors ${d.isCurrentMonth ? 'bg-surface-container-lowest' : 'bg-surface-container-low opacity-40'} ${drives.length > 0 || deadlines.length > 0 ? 'hover:bg-surface-container-low cursor-pointer' : ''}`}>
                        <span className={`font-title-sm text-title-sm ${drives.length > 0 ? 'text-primary font-bold' : deadlines.length > 0 ? 'text-error font-bold' : 'text-on-surface-variant'}`}>
                          {d.day}
                        </span>
                        <div className="mt-1 flex flex-col gap-1 overflow-hidden">
                          {drives.map(drive => (
                            <div key={`d-${drive.id}`} onClick={() => setSelectedPlacement(drive)} className="bg-primary-container text-on-primary rounded px-1.5 py-1 text-[10px] leading-tight font-medium shadow-sm truncate">
                              {drive.companyName} Drive
                            </div>
                          ))}
                          {deadlines.map(deadline => (
                            <div key={`dl-${deadline.id}`} onClick={() => setSelectedPlacement(deadline)} className="bg-error-container text-on-error-container rounded px-1.5 py-1 text-[10px] leading-tight font-bold truncate">
                              {deadline.companyName} DL
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                </div>
              </div>
            ) : (
              <div className="p-space-md flex flex-col gap-2">
                {placements.length > 0 ? (
                  placements.map(p => {
                    const isPast = p.driveDate ? new Date(p.driveDate).getTime() < new Date().getTime() : new Date(p.deadline).getTime() < new Date().getTime();
                    return (
                    <div key={p.id} onClick={() => setSelectedPlacement(p)} className={`p-space-md rounded-xl transition-colors flex items-center justify-between cursor-pointer ${isPast ? 'bg-surface-container-low/40 hover:bg-surface-container-low opacity-60' : 'bg-surface-container-low hover:bg-surface-container-high'}`}>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-title-md text-primary">{p.companyName}</div>
                          {isPast && <span className="font-label-sm text-label-sm bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant">Past</span>}
                        </div>
                        <div className="font-body-sm text-on-surface-variant">{p.role}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-title-sm text-primary">{p.driveDate ? `Drive: ${p.driveDate}` : 'No Drive Date'}</div>
                        <div className="font-label-regular text-error">Deadline: {p.deadline}</div>
                      </div>
                    </div>
                  )})
                ) : (
                  <div className="text-center p-space-3xl text-secondary">No placements found.</div>
                )}
              </div>
            )}
          </div>
          
          <div className="xl:col-span-4 flex flex-col gap-space-lg">
            {selectedPlacement ? (
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-xl flex flex-col relative overflow-hidden">
                <div className="flex items-start justify-between gap-space-sm mb-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-headline-sm shadow-sm">
                      {selectedPlacement.companyName.substring(0,1)}
                    </div>
                    <div>
                      <h2 className="font-title-md text-title-md text-primary leading-tight">{selectedPlacement.companyName}</h2>
                      <span className="font-label-regular text-label-regular text-on-surface-variant">Drive ID: PL-{selectedPlacement.id}</span>
                    </div>
                  </div>
                  <div className="px-space-xs py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] font-label-uppercase text-label-uppercase uppercase flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]"></span>
                    <span>{selectedPlacement.status}</span>
                  </div>
                </div>
                <div className="mb-space-lg">
                  <h3 className="font-headline-sm text-headline-sm text-primary tracking-tight">{selectedPlacement.role}</h3>
                  <div className="mt-space-sm p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
                    <div>
                      <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">CTC Package</span>
                      <div className="font-title-md text-title-md text-primary font-bold">{selectedPlacement.packageRange}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-space-sm py-space-sm mb-space-md border-y border-surface-container">
                  <div className="flex items-center justify-between py-1">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Drive Date</span>
                    <span className="font-title-sm text-title-sm text-primary">{selectedPlacement.driveDate || 'TBD'}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="font-body-sm text-body-sm text-error">Deadline</span>
                    <span className="font-title-sm text-title-sm text-error font-bold">{selectedPlacement.deadline}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs mt-auto">
                  <button onClick={() => {
                    const cId = companies.find(c => c.name === selectedPlacement.companyName)?.id || '';
                    const bIds = branches.filter(b => selectedPlacement.eligibleBranches.includes(b.name)).map(b => b.id);
                    const sIds = skills.filter(s => selectedPlacement.requiredSkills.includes(s.name)).map(s => s.id);
                    
                    setEditPlacementId(selectedPlacement.id);
                    setFormCompanyId(String(cId));
                    setFormRole(selectedPlacement.role);
                    setFormDesc(selectedPlacement.description);
                    setFormMinPackage(selectedPlacement.minPackage != null ? String(selectedPlacement.minPackage) : '');
                    setFormMaxPackage(selectedPlacement.maxPackage != null ? String(selectedPlacement.maxPackage) : '');
                    setFormFile(null);
                    setFormCgpa(String(selectedPlacement.cgpaRequirement));
                    setFormDeadline(selectedPlacement.deadline);
                    setFormDriveDate(selectedPlacement.driveDate || '');
                    setFormBranchIds(bIds);
                    setFormSkillIds(sIds);
                    setIsAddModalOpen(true);
                  }} className="bg-surface-container-low hover:bg-surface-container-high text-primary py-2 rounded-xl font-title-sm text-title-sm transition-all flex items-center justify-center gap-1.5" type="button">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    <span>Edit Drive</span>
                  </button>
                  <button onClick={() => handleDelete(selectedPlacement.id)} className="bg-error-container hover:bg-error/20 text-on-error-container py-2 rounded-xl font-title-sm text-title-sm transition-all flex items-center justify-center gap-1.5" type="button">
                    <span className="material-symbols-outlined text-[18px]">block</span>
                    <span>Cancel Drive</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-xl flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <span className="material-symbols-outlined text-[48px] text-secondary opacity-50 mb-space-md">calendar_today</span>
                <h3 className="font-title-md text-title-md text-primary-container">No Drive Selected</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 max-w-[250px]">
                  Select a scheduled event or deadline from the calendar to view details.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Add New Placement */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm transition-opacity duration-200 ${isAddModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`bg-surface-container-lowest rounded-2xl w-full max-w-2xl mx-4 shadow-2xl overflow-hidden transform transition-transform duration-200 flex flex-col ${isAddModalOpen ? 'scale-100' : 'scale-95'}`}>
          <div className="p-6 bg-surface-container-low flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
              {editPlacementId ? 'Edit Placement Drive' : 'Schedule Placement Drive'}
            </h2>
            <button className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" onClick={() => setIsAddModalOpen(false)} type="button">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <form className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto" onSubmit={handleAddPlacement}>
            {formError && (
              <div className="p-3 rounded-lg bg-error-container text-on-error-container font-body-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {formError}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-regular text-label-regular text-on-surface font-medium">Company *</label>
                <select disabled={!!editPlacementId} required className={`h-11 px-3.5 bg-surface rounded-lg border border-surface-container focus:ring-2 focus:ring-primary-container/20 ${editPlacementId ? 'opacity-70 cursor-not-allowed' : ''}`} value={formCompanyId} onChange={e => setFormCompanyId(e.target.value)}>
                  <option value="">Select Company</option>
                  {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-regular text-label-regular text-on-surface font-medium">Role *</label>
                <input required className="h-11 px-3.5 bg-surface rounded-lg border border-surface-container focus:ring-2 focus:ring-primary-container/20" type="text" value={formRole} onChange={e => setFormRole(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-regular text-label-regular text-on-surface font-medium">Min Package (LPA)</label>
                <input className="h-11 px-3.5 bg-surface rounded-lg border border-surface-container focus:ring-2 focus:ring-primary-container/20" type="number" step="0.1" value={formMinPackage} onChange={e => setFormMinPackage(e.target.value)} placeholder="e.g. 6.0" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-regular text-label-regular text-on-surface font-medium">Max Package (LPA)</label>
                <input className="h-11 px-3.5 bg-surface rounded-lg border border-surface-container focus:ring-2 focus:ring-primary-container/20" type="number" step="0.1" value={formMaxPackage} onChange={e => setFormMaxPackage(e.target.value)} placeholder="e.g. 10.0" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-regular text-label-regular text-on-surface font-medium">CGPA Cutoff *</label>
                <input required className="h-11 px-3.5 bg-surface rounded-lg border border-surface-container focus:ring-2 focus:ring-primary-container/20" type="number" step="0.1" value={formCgpa} onChange={e => setFormCgpa(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-regular text-label-regular text-on-surface font-medium">Deadline (YYYY-MM-DD) *</label>
                <input required className="h-11 px-3.5 bg-surface rounded-lg border border-surface-container focus:ring-2 focus:ring-primary-container/20" type="text" value={formDeadline} onChange={e => setFormDeadline(e.target.value)} placeholder="2026-10-15" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-regular text-label-regular text-on-surface font-medium">Drive Date (YYYY-MM-DD)</label>
              <input className="h-11 px-3.5 bg-surface rounded-lg border border-surface-container focus:ring-2 focus:ring-primary-container/20" type="text" value={formDriveDate} onChange={e => setFormDriveDate(e.target.value)} placeholder="Optional" />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="font-label-regular text-label-regular text-on-surface font-medium">Eligible Branches (Ctrl+Click to select multiple)</label>
              <select multiple className="h-24 px-3.5 py-2 bg-surface rounded-lg border border-surface-container focus:ring-2 focus:ring-primary-container/20" value={formBranchIds.map(String)} onChange={e => setFormBranchIds(Array.from(e.target.selectedOptions, option => parseInt(option.value)))}>
                {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-regular text-label-regular text-on-surface font-medium">Required Skills (Ctrl+Click to select multiple)</label>
              <select multiple className="h-24 px-3.5 py-2 bg-surface rounded-lg border border-surface-container focus:ring-2 focus:ring-primary-container/20" value={formSkillIds.map(String)} onChange={e => setFormSkillIds(Array.from(e.target.selectedOptions, option => parseInt(option.value)))}>
                {skills.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-regular text-label-regular text-on-surface font-medium">Description</label>
              <textarea className="p-3.5 bg-surface rounded-lg border border-surface-container focus:ring-2 focus:ring-primary-container/20" rows={3} value={formDesc} onChange={e => setFormDesc(e.target.value)}></textarea>
            </div>
            {!editPlacementId && (
              <div className="flex flex-col gap-1.5">
                <label className="font-label-regular text-label-regular text-on-surface font-medium">Placement Notice PDF</label>
                <input type="file" accept="application/pdf" className="p-2 border border-surface-container rounded-lg font-body-sm bg-surface" onChange={e => setFormFile(e.target.files?.[0] || null)} />
              </div>
            )}
            
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-surface-container">
              <button className="px-4 py-2.5 rounded-lg text-on-surface hover:bg-surface-container font-title-sm text-title-sm transition-colors" onClick={() => setIsAddModalOpen(false)} type="button">
                Cancel
              </button>
              <button className="px-5 py-2.5 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-title-sm text-title-sm font-semibold transition-all" type="submit">
                {editPlacementId ? 'Save Changes' : 'Schedule Drive'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
