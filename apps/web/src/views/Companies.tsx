import { useState, useEffect } from 'react';
import { companyService } from '../api/companyService';
import type { Company } from '../api/types';

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteModalCompany, setDeleteModalCompany] = useState<Company | null>(null);
  
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyIndustry, setNewCompanyIndustry] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [editCompanyId, setEditCompanyId] = useState<string | null>(null);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyService.getCompanies();
      setCompanies(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      if (editCompanyId) {
        await companyService.updateCompany(editCompanyId, {
          name: newCompanyName,
          sector: newCompanyIndustry || 'Technology'
        });
      } else {
        await companyService.createCompany({
          name: newCompanyName,
          sector: newCompanyIndustry || 'Technology',
          hiresDepstar: 0,
          hiresCspit: 0,
          status: 'Active',
          avgPackage: 0,
          notes: '',
          website: ''
        });
      }
      setIsAddModalOpen(false);
      setNewCompanyName('');
      setNewCompanyIndustry('');
      setEditCompanyId(null);
      fetchCompanies();
    } catch (err) {
      console.error(err);
      setFormError('Failed to add company. Please try again.');
    }
  };

  const handleDeleteCompany = async () => {
    if (!deleteModalCompany) return;
    setFormError(null);
    try {
      await companyService.deleteCompany(deleteModalCompany.id);
      setDeleteModalCompany(null);
      fetchCompanies();
    } catch (err) {
      console.error(err);
      setFormError('Failed to delete company. Please try again.');
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header & Breadcrumb Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-space-lg gap-space-md">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">PlaceIntel Admin</span>
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">chevron_right</span>
            <span className="font-label-uppercase text-label-uppercase text-on-surface uppercase tracking-wider font-semibold">Corporate Directory</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-primary tracking-tight">Companies & Corporate Partners</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Manage registered recruiting enterprises, accreditation credentials, and placement drives.
          </p>
        </div>
        
        {/* Page Primary Actions */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button className="group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-secondary-fixed transition-colors shadow-sm" type="button">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary">download</span>
            <span className="font-title-sm text-title-sm">Download Directory</span>
          </button>
          <button 
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-all shadow-sm" 
            type="button"
            onClick={() => {
              setEditCompanyId(null);
              setNewCompanyName('');
              setNewCompanyIndustry('');
              setIsAddModalOpen(true);
            }}
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span className="font-title-sm text-title-sm font-semibold">Add Company</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-error p-space-xl bg-error-container/20 rounded-xl">{error}</div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant">
                  <th className="py-3.5 px-6 font-label-uppercase text-label-uppercase uppercase tracking-wider">Enterprise & Domain</th>
                  <th className="py-3.5 px-4 font-label-uppercase text-label-uppercase uppercase tracking-wider">Tier Band</th>
                  <th className="py-3.5 px-6 font-label-uppercase text-label-uppercase uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-0" id="companiesTableBody">
                {companies.map(company => (
                  <tr key={company.id} className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-lg bg-primary-container text-on-primary font-bold flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                          {company.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-title-sm text-title-sm text-primary font-semibold truncate">{company.name}</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">{company.sector}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-middle">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase uppercase font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-on-secondary-fixed"></span>
                        Core Product Tier
                      </span>
                    </td>
                    <td className="py-4 px-6 align-middle text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-1.5 rounded-md text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" onClick={() => {
                          setEditCompanyId(company.id);
                          setNewCompanyName(company.name);
                          setNewCompanyIndustry(company.sector || '');
                          setIsAddModalOpen(true);
                        }} title="Edit listing" type="button">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-1.5 rounded-md text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors" onClick={() => setDeleteModalCompany(company)} title="Delete listing" type="button">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {companies.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-secondary">No companies found. Add one to begin.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: Add New Company Dialog */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm transition-opacity duration-200 ${isAddModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`bg-surface-container-lowest rounded-2xl w-full max-w-md mx-4 shadow-2xl overflow-hidden transform transition-transform duration-200 flex flex-col ${isAddModalOpen ? 'scale-100' : 'scale-95'}`}>
          <div className="p-6 bg-surface-container-low flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">Corporate Accreditation</span>
              <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                {editCompanyId ? 'Edit Recruiting Enterprise' : 'Add Recruiting Enterprise'}
              </h2>
            </div>
            <button className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" onClick={() => setIsAddModalOpen(false)} type="button">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <form className="p-6 flex flex-col gap-4" onSubmit={handleAddCompany}>
            {formError && (
              <div className="p-3 rounded-lg bg-error-container text-on-error-container font-body-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {formError}
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-regular text-label-regular text-on-surface font-medium" htmlFor="companyName">Legal Company Name *</label>
              <input 
                className="h-11 px-3.5 bg-surface rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all border border-surface-container" 
                id="companyName" 
                placeholder="e.g. Cisco Systems India" 
                required 
                type="text"
                value={newCompanyName}
                onChange={e => setNewCompanyName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-regular text-label-regular text-on-surface font-medium" htmlFor="industrySector">Industry Sector</label>
              <input 
                className="h-11 px-3.5 bg-surface rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all border border-surface-container" 
                id="industrySector" 
                placeholder="e.g. Cybersecurity, Fintech" 
                type="text"
                value={newCompanyIndustry}
                onChange={e => setNewCompanyIndustry(e.target.value)}
              />
            </div>
            
            <div className="pt-4 flex items-center justify-end gap-3">
              <button className="px-4 py-2.5 rounded-lg text-on-surface hover:bg-surface-container font-title-sm text-title-sm transition-colors" onClick={() => setIsAddModalOpen(false)} type="button">
                Cancel
              </button>
              <button className="px-5 py-2.5 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-title-sm text-title-sm font-semibold transition-all" type="submit">
                {editCompanyId ? 'Save Changes' : 'Confirm & Register'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* MODAL 2: Delete Confirmation Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm transition-opacity duration-200 ${deleteModalCompany ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`bg-surface-container-lowest rounded-2xl w-full max-w-md mx-4 shadow-2xl overflow-hidden transform transition-transform duration-200 p-6 flex flex-col gap-4 ${deleteModalCompany ? 'scale-100' : 'scale-95'}`}>
          <div className="w-12 h-12 rounded-full bg-error-container/60 text-error flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">warning</span>
          </div>
          <div className="flex flex-col gap-1">
            {formError && (
              <div className="p-3 rounded-lg bg-error-container text-on-error-container font-body-sm flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {formError}
              </div>
            )}
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Remove Corporate Partner?</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Are you sure you want to remove {deleteModalCompany?.name} from the active placement roster?
            </p>
          </div>
          <div className="pt-2 flex items-center justify-end gap-3">
            <button className="px-4 py-2 rounded-lg text-on-surface hover:bg-surface-container font-title-sm text-title-sm transition-colors" onClick={() => setDeleteModalCompany(null)} type="button">
              Cancel
            </button>
            <button className="px-4 py-2 rounded-lg bg-error text-on-error hover:bg-on-error-container font-title-sm text-title-sm font-semibold transition-colors" onClick={handleDeleteCompany} type="button">
              Confirm Deletion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
