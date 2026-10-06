import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

type ApiSkill = {
  id: number;
  name: string;
};

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [skills, setSkills] = useState<ApiSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get('/skills');
        setSkills(data.data || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to fetch skills');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Filter Logic
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Top Context Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg pb-space-xl border-b border-surface-container-high">
        <div className="flex flex-col gap-space-xs max-w-3xl">
          <div className="flex items-center gap-2 font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
            <span>PlaceIntel Admin</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Curriculum & Competencies</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Skills Management</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage skills used in placement requirements, job requisitions, and student competency matrices.
          </p>
        </div>
      </div>

      {/* Key Institutional Metrics Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md py-space-xl">
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-uppercase text-label-uppercase uppercase tracking-wider">Indexed Competencies</span>
            <span className="material-symbols-outlined text-[20px] text-primary">psychology</span>
          </div>
          <div className="mt-space-md flex items-baseline gap-space-xs">
            <span className="font-headline-lg text-headline-lg text-primary">{skills.length}</span>
            <span className="font-label-regular text-label-regular text-on-surface-variant">active taxonomy</span>
          </div>
        </div>
      </div>

      {/* Search, Filter Tags & Controls Bar */}
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
            <input 
              className="w-full h-11 pl-11 pr-4 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container/20 transition-all" 
              id="skillSearchInput" 
              onChange={(e) => setSearchQuery(e.target.value)} 
              value={searchQuery}
              placeholder="Search skills..." 
              type="text"
            />
          </div>
          {/* Quick Operations / Status Legend */}
          <div className="flex items-center gap-space-sm self-end lg:self-auto">
            <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">Index Health</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] font-label-uppercase text-label-uppercase uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]"></span> 100% Synced
            </span>
          </div>
        </div>
      </div>

      {/* Primary Skills Data Grid / Architecture Table */}
      <div className="mt-space-xl bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        {/* Table Header Bar */}
        <div className="grid grid-cols-12 px-space-xl py-space-sm bg-surface-container-low font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider items-center">
          <div className="col-span-12 lg:col-span-8">Skill Title & Category</div>
          <div className="hidden lg:block lg:col-span-4 text-right">System Status</div>
        </div>
        
        {loading ? (
          <div className="flex-1 flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex-1 flex justify-center py-12 text-error">
            {error}
          </div>
        ) : (
          <div className="divide-y divide-surface-container-high">
            {filteredSkills.map(skill => (
              <div key={skill.id} className="skill-row grid grid-cols-12 px-space-xl py-space-lg items-center hover:bg-surface-container-low/50 transition-colors">
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-1 pr-space-md">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="font-title-sm text-title-sm text-primary font-semibold">{skill.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase">Core Taxonomy</span>
                  </div>
                </div>
                <div className="hidden lg:block lg:col-span-4 mt-3 lg:mt-0 text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#1B5E20] font-label-uppercase text-label-uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]"></span> Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty State Fallback */}
        {!loading && !error && filteredSkills.length === 0 && (
          <div className="py-space-3xl px-space-xl flex flex-col items-center justify-center text-center flex-1" id="noResultsState">
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-space-sm">
              <span className="material-symbols-outlined text-[24px]">search_off</span>
            </div>
            <div className="font-title-sm text-title-sm text-primary">No competencies matched your filter</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-1">
              Try modifying the search term to review other placement benchmarks.
            </p>
          </div>
        )}
        
        {/* Table Pagination / Audit Summary Footer */}
        <div className="px-space-xl py-space-md bg-surface-container-lowest border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-regular text-label-regular text-on-surface-variant mt-auto">
          <div>Showing <span className="font-semibold text-primary">{filteredSkills.length}</span> of <span className="font-semibold text-primary">{skills.length}</span> indexed institutional skills</div>
        </div>
      </div>
    </div>
  );
}
