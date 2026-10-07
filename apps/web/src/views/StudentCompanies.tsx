import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { companyService } from '../api/companyService';
import type { Company } from '../api/types';

export function StudentCompanies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const data = await companyService.getCompanies();
        setCompanies(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch companies');
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // Derived styling helpers
  const getMonogram = (name: string) => name.substring(0, 2).toUpperCase();


  // Filtering Logic
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = searchQuery === '' || 
                          company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          company.sector.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Naive industry mapping based on sector text since we don't have industryId
    const matchesIndustry = industryFilter === 'all' || company.sector.toLowerCase().includes(industryFilter.toLowerCase());
    
    return matchesSearch && matchesIndustry;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.getElementById('company-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-space-2xl w-full">
        {/* PAGE HERO & EDITORIAL INTRO */}
        <section className="flex flex-col gap-space-lg">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="flex flex-col max-w-2xl">
              <div className="flex items-center gap-space-xs mb-space-xs">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                <span className="font-label-uppercase text-label-uppercase text-secondary tracking-wider">CAMPUS RECRUITMENT INTELLIGENCE</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-primary-container tracking-tight">Companies Directory</h1>
              <p className="font-body-lg text-body-lg text-secondary mt-space-xxs">Explore institutional hiring partners, examine verified historical intake metrics, and benchmark your candidate FIT matrix against open cadres.</p>
            </div>
            
            {/* SEARCH WRAPPER */}
            <div className="w-full lg:w-[460px] relative">
              <div className="relative flex items-center bg-surface-container-lowest rounded-xl shadow-sm focus-within:shadow-md transition-shadow">
                <span className="material-symbols-outlined absolute left-space-md text-secondary text-[20px] pointer-events-none">search</span>
                <input 
                  id="company-search" 
                  className="w-full h-12 pl-12 pr-16 bg-transparent font-body-md text-body-md text-primary-container placeholder:text-secondary focus:outline-none" 
                  placeholder="Search companies by name, domain, tech stack..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-space-sm flex items-center gap-0.5 bg-surface-container-low px-space-xs py-0.5 rounded text-secondary font-label-regular text-label-regular shadow-xs select-none">
                  <span className="text-[10px]">⌘</span><span>K</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* AGGREGATE SUMMARY STRIP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
            <div className="flex flex-col px-space-sm py-space-xxs">
              <span className="font-label-uppercase text-label-uppercase text-secondary">ACTIVE DIRECTORY</span>
              <div className="flex items-baseline gap-space-xs mt-space-xxs">
                <span className="font-headline-md text-headline-md text-primary-container">{companies.length}</span>
                <span className="font-label-regular text-label-regular text-secondary">Partners</span>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE FILTER ENGINE */}
        <section className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-space-md">
            <div className="flex flex-wrap items-center gap-space-sm">
              {/* Industry Dropdown Filter */}
              <div className="relative">
                <label className="font-label-uppercase text-label-uppercase text-secondary block mb-space-xxs">Industry Sector</label>
                <div className="relative flex items-center">
                  <select 
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                    className="appearance-none h-10 pl-space-md pr-9 bg-surface-container-low rounded-lg font-title-sm text-title-sm text-primary-container focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Industries</option>
                    {Array.from(new Set(companies.map(c => c.sector).filter(Boolean))).sort().map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-space-xs text-secondary text-[18px] pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOADING & ERROR STATES */}
        {loading && (
          <div className="py-space-3xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="py-space-xl text-center text-error font-title-md">
            Error: {error}
          </div>
        )}

        {/* COMPANIES GRID LIST */}
        {!loading && !error && (
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg">
            {filteredCompanies.map((company) => {
              return (
                <article key={company.id} className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-md transition-all duration-200">
                  <div>
                    {/* Top Row: Monogram, Header Info & Status */}
                    <div className="flex items-start justify-between gap-space-sm mb-space-md">
                      <div className="flex items-center gap-space-md">
                        <div className={`w-12 h-12 rounded-xl bg-primary-container text-surface-container-lowest font-title-md text-title-md flex items-center justify-center tracking-tight font-semibold select-none shadow-xs`}>
                          {getMonogram(company.name)}
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-title-md text-title-md text-primary-container tracking-tight">{company.name}</h3>
                          <span className="font-body-sm text-body-sm text-secondary">{company.sector}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Urgency Ribbon */}
                    <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1.5 rounded-lg mb-space-lg">
                      <span className="material-symbols-outlined text-[16px] text-secondary">work</span>
                      <span className="font-label-regular text-label-regular text-secondary">
                        Partner Information
                      </span>
                    </div>
                    
                    
                    {company.description && (
                      <div className="mb-space-lg">
                        <span className="font-label-uppercase text-label-uppercase text-secondary block mb-space-xxs">ABOUT</span>
                        <div className="font-body-sm text-body-sm text-on-surface line-clamp-2">
                          {company.description}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Card Footer: Action Dossier */}
                  <div className="pt-space-md flex flex-col gap-space-md mt-auto">
                    <Link to={`/companies/${company.id}`} className="w-full h-11 bg-primary-container hover:bg-tertiary text-surface-container-lowest font-title-sm text-title-sm rounded-xl flex items-center justify-center gap-space-xs transition-colors group">
                      <span>View Company Dossier</span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                </article>
              );
            })}
            
            {filteredCompanies.length === 0 && (
              <div className="col-span-full py-space-3xl flex flex-col items-center justify-center text-center text-secondary">
                <span className="material-symbols-outlined text-[48px] mb-space-sm opacity-50">search_off</span>
                <h3 className="font-headline-sm text-headline-sm text-primary-container mb-2">No hiring partners found</h3>
                <p className="font-body-md text-body-md max-w-md">Try adjusting your filters or search terms to explore other cadres.</p>
              </div>
            )}
          </section>
        )}

        {/* ARCHIVAL RECRUITMENT INTELLIGENCE */}
        <section className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-md max-w-xl">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
              <span className="material-symbols-outlined text-[24px]">analytics</span>
            </div>
            <div className="flex flex-col">
              <h4 className="font-title-md text-title-md text-primary-container">Institutional Placements</h4>
              <p className="font-body-sm text-body-sm text-secondary mt-0.5">PlaceIntel tracks company data based on historically verified placement drivers and active institutional ties.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
