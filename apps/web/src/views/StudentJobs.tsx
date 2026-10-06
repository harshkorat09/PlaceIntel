import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { placementService } from '../api/placementService';
import type { Placement } from '../api/types';

export function StudentJobs() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [selectedPlacement, setSelectedPlacement] = useState<Placement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1)); // Fixed to Oct 2026 to match original design, or use new Date()
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        setLoading(true);
        const data = await placementService.getPlacements();
        setPlacements(data);
        if (data.length > 0) {
          setSelectedPlacement(data[0]);
        }
      } catch (err: any) {
        console.error("Failed to fetch placements:", err);
        setError("Unable to load placement drives. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlacements();
  }, []);

  // Generate Calendar Days (Simplified for the current month)
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay(); // 0 is Sunday
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  let firstDay = getFirstDayOfMonth(year, month) - 1; // Adjust for Monday start
  if (firstDay === -1) firstDay = 6;
  
  const days = [];
  // Previous month padding
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: '', isCurrentMonth: false, date: null });
  }
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    days.push({ day: i, isCurrentMonth: true, date: d });
  }
  // Next month padding to complete grid
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({ day: '', isCurrentMonth: false, date: null });
  }

  // Helper to find events for a day
  const getEventsForDay = (date: Date | null) => {
    if (!date) return { drives: [], deadlines: [] };
    const dateStr = date.toISOString().split('T')[0];
    
    const drives = placements.filter(p => p.driveDate === dateStr);
    const deadlines = placements.filter(p => p.deadline === dateStr);
    
    return { drives, deadlines };
  };

  const getMonogram = (name: string) => name ? name.substring(0, 1).toUpperCase() : 'C';

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-space-md">
        {/* Sub-Header & Global Calendar Navigation Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-xl">
          <div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-uppercase text-label-uppercase tracking-wider uppercase mb-space-xxs">
              <span>PlaceIntel Candidate</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-semibold">Placement Calendar</span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary tracking-tight">Institutional Placement Schedule</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
              Track upcoming campus placement drives, registration deadlines, and technical assessments.
            </p>
          </div>
          
          {/* Actions & View Selectors */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="bg-surface-container-high p-1 rounded-xl flex items-center shadow-sm">
              <button onClick={() => setViewMode('month')} className={`px-space-md py-1.5 rounded-lg font-title-sm text-title-sm transition-all flex items-center gap-1 ${viewMode === 'month' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`} type="button">
                <span className="material-symbols-outlined text-[18px]">calendar_view_month</span>
                Month View
              </button>
              <button onClick={() => setViewMode('list')} className={`px-space-md py-1.5 rounded-lg font-title-sm text-title-sm transition-all flex items-center gap-1 ${viewMode === 'list' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`} type="button">
                <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                List View
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Sub-Controller Bar */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md mb-space-lg flex flex-wrap items-center justify-between gap-space-md shadow-sm">
          <div className="flex items-center gap-space-md">
            <div className="flex items-center bg-surface-container-low rounded-xl p-1">
              <button 
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-all" type="button"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <span className="px-space-md font-title-md text-title-md text-primary min-w-[170px] text-center">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button 
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-all" type="button"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="px-space-md py-1.5 bg-surface-container rounded-lg font-label-uppercase text-label-uppercase uppercase text-primary font-bold hover:bg-surface-container-high transition-colors" type="button"
            >
              Today
            </button>
          </div>
          
          {/* Quick Meta Filters */}
          <div className="flex items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
              <span>Drives & Events</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
              <span>Deadlines</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-space-3xl flex items-center justify-center">
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
            
            {/* Primary Calendar Canvas (8 cols on XL) */}
            <div className="xl:col-span-8 bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col">
              
              {viewMode === 'month' ? (
              <div className="overflow-x-auto w-full">
                <div className="min-w-[700px]">
                  {/* Weekday Headers */}
                  <div className="grid grid-cols-7 bg-surface-container-low text-center py-space-sm font-label-uppercase text-label-uppercase uppercase tracking-wider text-on-surface-variant">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                  
                  {/* Calendar Days Grid */}
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
                              <div 
                                key={`drive-${drive.id}`} 
                                onClick={() => setSelectedPlacement(drive)}
                                className="bg-primary-container text-on-primary rounded px-1.5 py-1 text-[10px] leading-tight font-medium shadow-sm truncate hover:bg-tertiary-container"
                                title={`${drive.companyName} Drive`}
                              >
                                {drive.companyName}
                              </div>
                            ))}
                            {deadlines.map(deadline => (
                              <div 
                                key={`dl-${deadline.id}`} 
                                onClick={() => setSelectedPlacement(deadline)}
                                className="bg-error-container text-on-error-container rounded px-1.5 py-1 text-[10px] leading-tight font-bold truncate hover:bg-error/20"
                                title={`${deadline.companyName} Deadline`}
                              >
                                {deadline.companyName}
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
                /* LIST VIEW */
                <div className="p-space-md flex flex-col gap-2">
                  {placements.length > 0 ? (
                    placements.map(p => (
                      <div key={p.id} onClick={() => setSelectedPlacement(p)} className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container-high cursor-pointer transition-colors flex items-center justify-between">
                        <div>
                          <div className="font-title-md text-primary">{p.companyName}</div>
                          <div className="font-body-sm text-on-surface-variant">{p.role}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-title-sm text-primary">{p.driveDate ? `Drive: ${p.driveDate}` : 'No Drive Date'}</div>
                          <div className="font-label-regular text-error">Deadline: {p.deadline}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-space-3xl text-secondary">No placements scheduled.</div>
                  )}
                </div>
              )}
              
              {/* Calendar Status Footer */}
              <div className="p-space-md bg-surface-container-low flex flex-wrap items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-primary">sync</span>
                  <span>Placement Engine Sync: All schedules up to date</span>
                </div>
                <div className="flex items-center gap-space-sm font-label-uppercase text-label-uppercase">
                  <span>Eligible Drives: <strong className="text-primary">{placements.length}</strong></span>
                </div>
              </div>
            </div>
            
            {/* Right Side Panel: Selected Drive Details */}
            <div className="xl:col-span-4 flex flex-col gap-space-lg">
              
              {selectedPlacement ? (
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-xl flex flex-col relative overflow-hidden">
                  {/* Header Banner with Status Badge */}
                  <div className="flex items-start justify-between gap-space-sm mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-headline-sm shadow-sm">
                        {getMonogram(selectedPlacement.companyName)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-title-md text-title-md text-primary leading-tight">
                            {selectedPlacement.companyName}
                          </h2>
                          <span className="material-symbols-outlined text-surface-tint text-[18px]" title="Verified Recruiter">verified</span>
                        </div>
                        <span className="font-label-regular text-label-regular text-on-surface-variant">Status: {selectedPlacement.status}</span>
                      </div>
                    </div>
                    {/* Status Badge */}
                    <div className="px-space-xs py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] font-label-uppercase text-label-uppercase uppercase flex items-center gap-1.5 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]"></span>
                      <span>Active</span>
                    </div>
                  </div>
                  
                  {/* Position & CTC Tier */}
                  <div className="mb-space-lg">
                    <h3 className="font-headline-sm text-headline-sm text-primary tracking-tight">{selectedPlacement.role}</h3>
                    <div className="mt-space-sm p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
                      <div>
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">Cost To Company (CTC)</span>
                        <div className="font-title-md text-title-md text-primary font-bold">
                          {selectedPlacement.packageRange}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">CGPA Cutoff</span>
                        <div className="font-title-sm text-title-sm text-primary">
                          {selectedPlacement.cgpaRequirement.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Drive Chronology Data Strip */}
                  <div className="flex flex-col gap-space-sm py-space-sm mb-space-md border-y border-surface-container">
                    <div className="flex items-center justify-between py-1">
                      <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">event_upcoming</span>
                        Main Drive Date
                      </span>
                      <span className="font-title-sm text-title-sm text-primary font-bold">
                        {selectedPlacement.driveDate ? selectedPlacement.driveDate : 'To Be Decided'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="font-body-sm text-body-sm text-error flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">timer</span>
                        Application Deadline
                      </span>
                      <span className="font-title-sm text-title-sm text-error font-bold">
                        {selectedPlacement.deadline}
                      </span>
                    </div>
                  </div>
                  
                  {/* Eligible Branches */}
                  <div className="mb-space-md">
                    <label className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase block mb-space-xs">
                      Eligible Academic Branches
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPlacement.eligibleBranches.length > 0 ? (
                        selectedPlacement.eligibleBranches.map((branch, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-surface-container text-primary font-label-uppercase text-label-uppercase">
                            {branch}
                          </span>
                        ))
                      ) : (
                        <span className="text-body-sm text-on-surface-variant">All Branches</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Required Skills */}
                  <div className="mb-space-lg">
                    <label className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase block mb-space-xs">
                      Required Competencies
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPlacement.requiredSkills.length > 0 ? (
                        selectedPlacement.requiredSkills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-body-sm text-body-sm font-medium">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-body-sm text-on-surface-variant">General Eligibility</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Student Actions Grid */}
                  <div className="flex flex-col gap-space-xs mt-auto">
                    <Link to={`/placements/${selectedPlacement.id}`} className="w-full bg-primary-container hover:bg-tertiary-container text-on-primary py-2.5 rounded-xl font-title-sm text-title-sm shadow-sm transition-all flex items-center justify-center gap-space-xs transform active:scale-[0.98]">
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                      <span>View Full Details & Apply</span>
                    </Link>
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
      </div>
    </div>
  );
}
