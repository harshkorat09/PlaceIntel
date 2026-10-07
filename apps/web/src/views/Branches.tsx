import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

type Branch = {
  id: number;
  name: string;
  code: string;
  degree: string;
};

export default function Branches() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('all');
  
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [branchName, setBranchName] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [degreeLevel, setDegreeLevel] = useState('B.Tech');
  const [isSaving, setIsSaving] = useState(false);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get('/branches');
      setBranches(Array.isArray(data) ? data : data.data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch branches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const openAddModal = () => {
    setEditingBranch(null);
    setBranchName('');
    setBranchCode('');
    setDegreeLevel('B.Tech');
    setIsModalOpen(true);
  };

  const openEditModal = (branch: Branch) => {
    setEditingBranch(branch);
    setBranchName(branch.name);
    setBranchCode(branch.code);
    setDegreeLevel(branch.degree);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!branchName.trim() || !branchCode.trim() || !degreeLevel.trim()) return;
    try {
      setIsSaving(true);
      const payload = {
        name: branchName.trim(),
        code: branchCode.trim(),
        degree: degreeLevel.trim(),
      };
      if (editingBranch) {
        await apiClient.put(`/branches/${editingBranch.id}`, payload);
      } else {
        await apiClient.post('/branches', payload);
      }
      await fetchBranches();
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Failed to save branch');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this branch?')) return;
    try {
      setLoading(true);
      await apiClient.delete(`/branches/${id}`);
      await fetchBranches();
    } catch (err: any) {
      alert(err.message || 'Failed to delete branch');
      setLoading(false);
    }
  };

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = 
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      branch.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.degree.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (degreeFilter !== 'all') {
      return matchesSearch && branch.degree.toLowerCase() === degreeFilter.toLowerCase();
    }
    return matchesSearch;
  });

  return (
    <div className="flex flex-col w-full relative">
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
      </div>

      {/* Main Management Workbench: Search, Filters & View Toggle */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-low p-space-lg mb-space-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-lg">
          <div className="flex items-center gap-space-md flex-1">
            <div className="relative w-full max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input 
                className="w-full h-10 pl-9 pr-4 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container/20 shadow-sm transition-all" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search branch name, code, or degree..." 
                type="text"
              />
            </div>
            
            <select 
              className="h-10 px-3 bg-surface-container-low rounded-lg font-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/20 shadow-sm cursor-pointer" 
              value={degreeFilter}
              onChange={(e) => setDegreeFilter(e.target.value)}
            >
              <option value="all">All Degrees</option>
              {Array.from(new Set(branches.map(b => b.degree).filter(Boolean))).sort().map(degree => (
                <option key={degree} value={degree}>{degree}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-space-sm self-end md:self-auto">
            <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary rounded-lg font-title-sm hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Branch
            </button>
            <div className="w-px h-6 bg-surface-container mx-1 hidden sm:block"></div>
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
          </div>
        </div>
        
        {/* Data Container */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center py-12 text-error">
            {error}
          </div>
        ) : filteredBranches.length === 0 ? (
          <div className="py-space-3xl flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant mb-space-sm">
              <span className="material-symbols-outlined text-[24px]">search_off</span>
            </div>
            <div className="font-title-sm text-title-sm text-primary">No academic branches have been configured yet.</div>
          </div>
        ) : viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-uppercase text-label-uppercase uppercase tracking-wider">
                  <th className="py-3 px-space-md rounded-l-lg">Branch & Code</th>
                  <th className="py-3 px-space-md">Degree Level</th>
                  <th className="py-3 px-space-md rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
                {filteredBranches.map(branch => (
                  <tr key={branch.id} className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-space-md px-space-md">
                      <div className="flex flex-col">
                        <span className="font-title-sm text-title-sm text-primary font-semibold group-hover:text-primary-container">{branch.name}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-label-uppercase text-label-uppercase text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">{branch.code}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-space-md px-space-md">
                      <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase">{branch.degree}</span>
                    </td>
                    <td className="py-space-md px-space-md text-right opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => openEditModal(branch)} className="text-primary hover:text-primary-container font-title-sm">Edit</button>
                        <button onClick={() => handleDelete(branch.id)} className="text-error hover:text-red-700 font-title-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {filteredBranches.map(branch => (
              <div key={branch.id} className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-title-md text-title-md text-primary leading-snug">{branch.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-label-uppercase text-label-uppercase bg-surface-container-high px-2 py-0.5 rounded text-on-surface">{branch.code}</span>
                      <span className="font-label-uppercase text-label-uppercase bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded">{branch.degree}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-surface-container flex justify-end gap-3 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(branch)} className="text-primary hover:text-primary-container font-title-sm">Edit</button>
                  <button onClick={() => handleDelete(branch.id)} className="text-error hover:text-red-700 font-title-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-container-high flex justify-between items-center bg-surface-container-low">
              <h3 className="font-title-lg text-primary">{editingBranch ? 'Edit Branch' : 'Add Branch'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant">Branch Name *</label>
                <input 
                  type="text" 
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="w-full h-11 px-4 bg-surface-container-lowest border border-surface-container-high rounded-lg focus:outline-none focus:border-primary-container"
                  placeholder="e.g. Computer Science & Engineering"
                  autoFocus
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant">Branch Code *</label>
                <input 
                  type="text" 
                  value={branchCode}
                  onChange={(e) => setBranchCode(e.target.value)}
                  className="w-full h-11 px-4 bg-surface-container-lowest border border-surface-container-high rounded-lg focus:outline-none focus:border-primary-container"
                  placeholder="e.g. CSE"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant">Degree Level *</label>
                <input 
                  type="text" 
                  value={degreeLevel}
                  onChange={(e) => setDegreeLevel(e.target.value)}
                  className="w-full h-11 px-4 bg-surface-container-lowest border border-surface-container-high rounded-lg focus:outline-none focus:border-primary-container"
                  placeholder="e.g. B.Tech, M.Tech, MCA"
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-surface-container-low flex justify-end gap-3 border-t border-surface-container-high">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 font-title-sm text-secondary hover:text-primary transition-colors"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={!branchName.trim() || !branchCode.trim() || !degreeLevel.trim() || isSaving}
                className="px-6 py-2 bg-primary-container text-on-primary rounded-lg font-title-sm hover:bg-primary transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : editingBranch ? 'Save Changes' : 'Save Branch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
