import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

type Branch = {
  id: string | number;
  name: string;
  code: string;
  deptCode: string;
  degree: string;
  students: number;
  sections: number;
  placedPercent: number;
  placedCount: number;
  meanCTC: string;
  activeDrives: number;
  colorPrimary: string;
  colorSecondary: string;
  colorBg: string;
  textColor: string;
  isAIML?: boolean;
};
export default function Branches() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('all');
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    apiClient.get('/branches').then((data: any) => {
      const formatted = (data || []).map((b: any, index: number) => ({
        id: b.id,
        name: b.name,
        code: b.name.substring(0, 4).toUpperCase(),
        deptCode: `#0${(index % 5) + 1}-A`,
        degree: 'B.Tech',
        students: 0,
        sections: 0,
        placedPercent: 0,
        placedCount: 0,
        meanCTC: '-',
        activeDrives: 0,
        colorPrimary: 'bg-primary-container',
        colorSecondary: 'text-primary',
        colorBg: 'bg-surface-container',
        textColor: 'text-primary'
      }));
      setBranches(formatted);
    });
  }, []);

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Page Context & Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-2xl">
        <div className="flex flex-col gap-space-xxs">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-uppercase text-label-uppercase tracking-wider">
            <span className="hover:text-primary transition-colors cursor-pointer">PlaceIntel Admin</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary-container font-semibold">Academic Structure</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">Branches & Academic Divisions</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Manage academic branches used for placement eligibility, drive criteria, and departmental cohort tracking.
          </p>
        </div>
        
        {/* Primary Actions & Academic Cohort Filter */}
        <div className="flex items-center gap-space-sm flex-wrap">
          <div className="flex items-center bg-surface-container-low px-space-sm py-2 rounded-lg gap-space-xs shadow-sm">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">filter_alt</span>
            <select 
              className="bg-transparent font-title-sm text-title-sm text-primary focus:outline-none cursor-pointer" 
              value={degreeFilter}
              onChange={(e) => setDegreeFilter(e.target.value)}
            >
              <option value="all">All Degrees (B.Tech, M.Tech, MCA)</option>
              <option value="btech">Undergraduate (B.Tech)</option>
              <option value="mtech">Postgraduate (M.Tech)</option>
              <option value="mca">Postgraduate (MCA)</option>
            </select>
          </div>
        </div>
      </div>



      {/* Main Management Workbench: Search, Filters & View Toggle */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg mb-space-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-lg">
          <div className="flex items-center gap-space-md flex-1">
            <div className="relative w-full max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input 
                className="w-full h-10 pl-9 pr-4 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest shadow-sm transition-all" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search branch name, code, or degree..." 
                type="text"
              />
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-on-surface-variant font-label-regular text-label-regular">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              <span>{filteredBranches.length} Institutional Branches</span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs self-end md:self-auto">
            <button 
              className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`} 
              onClick={() => setViewMode('table')}
              title="Table View" 
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">table_rows</span>
            </button>
            <button 
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`} 
              onClick={() => setViewMode('grid')}
              title="Card Grid View" 
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
            </button>
            <div className="w-px h-6 bg-surface-container mx-1"></div>
          </div>
        </div>
        
        {/* Data Container */}
        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-uppercase text-label-uppercase uppercase tracking-wider">
                  <th className="py-3 px-space-md rounded-l-lg">Branch & Code</th>
                  <th className="py-3 px-space-md rounded-r-lg">Degree Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
                {filteredBranches.map(branch => (
                  <tr key={branch.id} className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-space-md px-space-md">
                      <div className="flex items-center gap-space-sm">
                        <div className={`w-10 h-10 rounded-xl ${branch.colorBg} flex items-center justify-center font-title-sm text-title-sm ${branch.textColor} font-bold`}>
                          {branch.id}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-title-sm text-title-sm text-primary font-semibold group-hover:text-primary-container">{branch.name}</span>
                            {branch.isAIML && (
                              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-uppercase text-[10px] font-bold">Highest CTC</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-label-uppercase text-label-uppercase text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">{branch.code}</span>
                            <span className="text-xs text-secondary">Dept Code: {branch.deptCode}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-space-md px-space-md">
                      <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase">{branch.degree}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {filteredBranches.map(branch => (
              <div key={branch.id} className="bg-surface rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className={`w-12 h-12 rounded-xl ${branch.colorBg} flex items-center justify-center font-title-md text-title-md ${branch.textColor} font-bold`}>
                      {branch.id}
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-primary leading-snug">{branch.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-label-uppercase text-label-uppercase bg-surface-container-high px-2 py-0.5 rounded text-on-surface">{branch.code}</span>
                        <span className="font-label-uppercase text-label-uppercase bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded">{branch.degree}</span>
                      </div>
                    </div>
                  </div>
                  {/* Actions intentionally removed to reflect read-only backend API */}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Table Footer / Archival Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-lg mt-space-md text-on-surface-variant text-body-sm font-body-sm">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">history_edu</span>
            <span>Curricular Academic Registry updated for Placement Cycle 2025-26.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs">Showing {filteredBranches.length} of 5 departments</span>
          </div>
        </div>
      </div>

      {/* Departmental Cohort & Cross-Disciplinary Eligibility Rules Overview Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
        {/* Policy Card 1: Default Placement Criteria */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container text-[20px]">policy</span>
              <span className="font-title-sm text-title-sm text-primary">Cross-Branch Eligibility Rules</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Drives designated as “Tier-1 Software” permit students from CE, IT, and CSE concurrently without separate departmental approval.
            </p>
          </div>
          <div className="mt-space-lg flex items-center justify-between bg-surface-container-low p-space-sm rounded-xl">
            <span className="font-label-uppercase text-label-uppercase text-on-surface-variant">Auto-Harmonize Cohorts</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input defaultChecked className="sr-only peer" type="checkbox"/>
              <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-container"></div>
            </label>
          </div>
        </div>
        
        {/* Policy Card 2: Faculty Placement Officers */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container text-[20px]">badge</span>
              <span className="font-title-sm text-title-sm text-primary">Departmental Liaisons</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              5 designated faculty coordinators are authenticated to approve special waivers for students crossing placement tiers.
            </p>
          </div>
          <div className="mt-space-lg flex items-center justify-between bg-surface-container-low p-space-sm rounded-xl text-primary font-body-sm text-body-sm">
            <span>Manage Access Control</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container text-[20px]">history</span>
              <span className="font-title-sm text-title-sm text-primary">Academic Sync Logs</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Branch capacity and student enrollment metrics are synced automatically via the Institutional ERP connector.
            </p>
          </div>
          <div className="mt-space-lg flex items-center gap-2 bg-surface-container-low p-space-sm rounded-xl text-on-surface-variant font-label-regular text-label-regular">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Last ERP sync: 4 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
