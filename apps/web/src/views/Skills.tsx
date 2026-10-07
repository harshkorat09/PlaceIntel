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

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<ApiSkill | null>(null);
  const [skillName, setSkillName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await apiClient.get('/skills');
      setSkills(Array.isArray(data) ? data : data.data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openAddModal = () => {
    setEditingSkill(null);
    setSkillName('');
    setIsModalOpen(true);
  };

  const openEditModal = (skill: ApiSkill) => {
    setEditingSkill(skill);
    setSkillName(skill.name);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!skillName.trim()) return;
    try {
      setIsSaving(true);
      if (editingSkill) {
        await apiClient.put(`/skills/${editingSkill.id}`, { name: skillName.trim() });
      } else {
        await apiClient.post('/skills', { name: skillName.trim() });
      }
      await fetchSkills();
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Failed to save skill');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      setLoading(true);
      await apiClient.delete(`/skills/${id}`);
      await fetchSkills();
    } catch (err: any) {
      alert(err.message || 'Failed to delete skill');
      setLoading(false); // Reset loading if error, otherwise fetchSkills handles it
    }
  };

  // Filter Logic
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex flex-col w-full relative">
      {/* Top Context Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg pb-space-xl border-b border-surface-container-high">
        <div className="flex flex-col gap-space-xs max-w-3xl">
          <div className="flex items-center gap-2 font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">
            <span>PlaceIntel Admin</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Curriculum & Competencies</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Skills & Competencies</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Manage skills used in placement requirements, job requisitions, and student competency matrices.
          </p>
        </div>
      </div>

      {/* Key Institutional Metrics Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md py-space-xl">
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between border border-surface-container-low">
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
      <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-low flex flex-col gap-space-md">
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
          {/* Add Skill */}
          <div className="flex items-center gap-space-sm self-end lg:self-auto">
            <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary rounded-lg font-title-sm hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Skill
            </button>
          </div>
        </div>
      </div>

      {/* Primary Skills Data Grid */}
      <div className="mt-space-xl bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-low overflow-hidden flex flex-col min-h-[400px]">
        {/* Table Header Bar */}
        <div className="grid grid-cols-12 px-space-xl py-space-sm bg-surface-container-low font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider items-center">
          <div className="col-span-12 lg:col-span-8">Skill Title & Category</div>
          <div className="hidden lg:block lg:col-span-4 text-right">Actions</div>
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
              <div key={skill.id} className="skill-row grid grid-cols-12 px-space-xl py-space-lg items-center hover:bg-surface-container-low/50 transition-colors group">
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-1 pr-space-md">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="font-title-sm text-title-sm text-primary font-semibold">{skill.name}</span>
                  </div>
                </div>
                <div className="col-span-12 lg:col-span-4 mt-3 lg:mt-0 flex justify-end gap-3 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(skill)} className="text-primary hover:text-primary-container font-title-sm">Edit</button>
                  <button onClick={() => handleDelete(skill.id)} className="text-error hover:text-red-700 font-title-sm">Delete</button>
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
            <div className="font-title-sm text-title-sm text-primary">No skills have been configured yet.</div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-container-high flex justify-between items-center bg-surface-container-low">
              <h3 className="font-title-lg text-primary">{editingSkill ? 'Edit Skill' : 'Add Skill'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-on-surface-variant">Skill Name *</label>
                <input 
                  type="text" 
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full h-11 px-4 bg-surface-container-lowest border border-surface-container-high rounded-lg focus:outline-none focus:border-primary-container"
                  placeholder="e.g. Python, Machine Learning"
                  autoFocus
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
                disabled={!skillName.trim() || isSaving}
                className="px-6 py-2 bg-primary-container text-on-primary rounded-lg font-title-sm hover:bg-primary transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : editingSkill ? 'Save Changes' : 'Save Skill'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
