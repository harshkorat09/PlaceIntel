import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { companyService } from '../api/companyService';
import type { Company } from '../api/types';

export function StudentCompanies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [packageFilter, setPackageFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('package');
  const [activeLifecycle, setActiveLifecycle] = useState('Active Recruiter');

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
  const getStatusStyle = (status: string) => {
    if (status.includes('Active')) return { bg: 'bg-[#E8F5E9]', text: 'text-[#1B5E20]', dot: 'bg-[#1B5E20]' };
    if (status.includes('Upcoming') || status.includes('Scheduled')) return { bg: 'bg-[#FFF8E1]', text: 'text-[#8C5800]', dot: 'bg-[#8C5800]' };
    if (status.includes('Concluded')) return { bg: 'bg-[#EDE7F6]', text: 'text-[#4A148C]', dot: 'bg-[#4A148C]' };
    return { bg: 'bg-[#E0F2FE]', text: 'text-[#0369A1]', dot: 'bg-[#0369A1]' };
  };

  // Filtering Logic
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = searchQuery === '' || 
                          company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          company.sector.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Naive industry mapping based on sector text since we don't have industryId
    const matchesIndustry = industryFilter === 'all' || company.sector.toLowerCase().includes(industryFilter.toLowerCase());
    
    let matchesPackage = true;
    if (packageFilter !== 'all') {
      matchesPackage = company.avgPackage >= parseInt(packageFilter);
    }
    
    return matchesSearch && matchesIndustry && matchesPackage && 
           (activeLifecycle === 'Active Recruiter' ? company.status.includes('Active') : 
            activeLifecycle === 'Upcoming Drives' ? company.status.includes('Upcoming') : 
            activeLifecycle === 'Concluded' ? company.status.includes('Concluded') : true);
  }).sort((a, b) => {
    if (sortOrder === 'package') return b.avgPackage - a.avgPackage;
    if (sortOrder === 'hired') return (b.hiresDepstar + b.hiresCspit) - (a.hiresDepstar + a.hiresCspit);
    return 0;
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
            <div className="flex flex-col px-space-sm py-space-xxs">
              <span className="font-label-uppercase text-label-uppercase text-secondary">ACTIVE DIRECTORY</span>
              <div className="flex items-baseline gap-space-xs mt-space-xxs">
                <span className="font-headline-md text-headline-md text-primary-container">{companies.length}</span>
                <span className="font-label-regular text-label-regular text-secondary">Partners</span>
              </div>
            </div>
            <div className="flex flex-col px-space-sm py-space-xxs">
              <span className="font-label-uppercase text-label-uppercase text-secondary">DEPT. PLACEMENTS</span>
              <div className="flex items-baseline gap-space-xs mt-space-xxs">
                <span className="font-headline-md text-headline-md text-primary-container">
                  {companies.reduce((sum, c) => sum + c.hiresDepstar, 0)}
                </span>
                <span className="font-label-regular text-label-regular text-secondary">DEPSTAR</span>
              </div>
            </div>
            <div className="flex flex-col px-space-sm py-space-xxs">
              <span className="font-label-uppercase text-label-uppercase text-secondary">AVERAGE DRIVE PACKAGE</span>
              <div className="flex items-baseline gap-space-xs mt-space-xxs">
                <span className="font-headline-md text-headline-md text-primary-container">
                  ₹{companies.length ? (companies.reduce((sum, c) => sum + c.avgPackage, 0) / companies.length).toFixed(1) : 0}
                </span>
                <span className="font-label-regular text-label-regular text-secondary">LPA Median</span>
              </div>
            </div>
            <div className="flex flex-col px-space-sm py-space-xxs">
              <span className="font-label-uppercase text-label-uppercase text-secondary">DEPT. PLACEMENTS</span>
              <div className="flex items-baseline gap-space-xs mt-space-xxs">
                <span className="font-headline-md text-headline-md text-primary-container">
                  {companies.reduce((sum, c) => sum + c.hiresCspit, 0)}
                </span>
                <span className="font-label-regular text-label-regular text-secondary">CSPIT</span>
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
                    <option value="cloud">Cloud & Infrastructure</option>
                    <option value="cyber">Cybersecurity</option>
                    <option value="enterprise">Enterprise Software</option>
                    <option value="fintech">FinTech</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-space-xs text-secondary text-[18px] pointer-events-none">expand_more</span>
                </div>
              </div>
              
              {/* Minimum CTC Filter */}
              <div className="relative">
                <label className="font-label-uppercase text-label-uppercase text-secondary block mb-space-xxs">Minimum Package</label>
                <div className="relative flex items-center">
                  <select 
                    value={packageFilter}
                    onChange={(e) => setPackageFilter(e.target.value)}
                    className="appearance-none h-10 pl-space-md pr-9 bg-surface-container-low rounded-lg font-title-sm text-title-sm text-primary-container focus:outline-none cursor-pointer"
                  >
                    <option value="all">Any CTC</option>
                    <option value="8">&gt; ₹8 LPA</option>
                    <option value="15">&gt; ₹15 LPA</option>
                    <option value="25">&gt; ₹25 LPA</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-space-xs text-secondary text-[18px] pointer-events-none">expand_more</span>
                </div>
              </div>
              
              {/* Sort Order */}
              <div className="relative">
                <label className="font-label-uppercase text-label-uppercase text-secondary block mb-space-xxs">Ranking Criteria</label>
                <div className="relative flex items-center">
                  <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="appearance-none h-10 pl-space-md pr-9 bg-surface-container-low rounded-lg font-title-sm text-title-sm text-primary-container focus:outline-none cursor-pointer"
                  >
                    <option value="package">Package: High to Low</option>
                    <option value="hired">Historical Hires</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-space-xs text-secondary text-[18px] pointer-events-none">sort</span>
                </div>
              </div>
            </div>
            
            {/* Hiring Status Pills */}
            <div className="flex flex-col items-start lg:items-end">
              <label className="font-label-uppercase text-label-uppercase text-secondary mb-space-xxs">Drive Lifecycle</label>
              <div className="flex items-center gap-space-xxs bg-surface-container-low p-1 rounded-lg">
                <button 
                  onClick={() => setActiveLifecycle('Active Recruiter')}
                  className={`px-space-sm py-1.5 rounded-lg font-title-sm text-title-sm transition-all ${activeLifecycle === 'Active Recruiter' ? 'bg-surface-container-lowest text-primary-container shadow-xs' : 'text-secondary hover:text-primary-container hover:bg-surface-container-lowest/50'}`}
                >
                  Actively Hiring
                </button>
                <button 
                  onClick={() => setActiveLifecycle('Upcoming Drives')}
                  className={`px-space-sm py-1.5 rounded-lg font-title-sm text-title-sm transition-all ${activeLifecycle === 'Upcoming Drives' ? 'bg-surface-container-lowest text-primary-container shadow-xs' : 'text-secondary hover:text-primary-container hover:bg-surface-container-lowest/50'}`}
                >
                  Upcoming Drives
                </button>
                <button 
                  onClick={() => setActiveLifecycle('Concluded')}
                  className={`px-space-sm py-1.5 rounded-lg font-title-sm text-title-sm transition-all ${activeLifecycle === 'Concluded' ? 'bg-surface-container-lowest text-primary-container shadow-xs' : 'text-secondary hover:text-primary-container hover:bg-surface-container-lowest/50'}`}
                >
                  Concluded
                </button>
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
              const styles = getStatusStyle(company.status);

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
                      <span className={`inline-flex items-center gap-1.5 px-space-xs py-1 rounded-full ${styles.bg} ${styles.text} font-label-uppercase text-label-uppercase shrink-0`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`}></span>
                        {company.status}
                      </span>
                    </div>
                    
                    {/* Urgency Ribbon */}
                    <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1.5 rounded-lg mb-space-lg">
                      <span className="material-symbols-outlined text-[16px] text-secondary">work</span>
                      <span className="font-label-regular text-label-regular text-secondary">
                        Partner Information
                      </span>
                    </div>
                    
                    {/* Key Metrics Modular Strip */}
                    <div className="grid grid-cols-3 gap-space-xs bg-surface-container-low p-space-sm rounded-xl mb-space-lg text-center">
                      <div className="flex flex-col">
                        <span className="font-label-uppercase text-label-uppercase text-secondary">DEPSTAR</span>
                        <span className="font-title-sm text-title-sm text-primary-container mt-0.5">{company.hiresDepstar} Hired</span>
                      </div>
                      <div className="flex flex-col border-x border-surface-container-high">
                        <span className="font-label-uppercase text-label-uppercase text-secondary">CSPIT</span>
                        <span className="font-title-sm text-title-sm text-primary-container mt-0.5">{company.hiresCspit} Hired</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-uppercase text-label-uppercase text-secondary">AVERAGE</span>
                        <span className="font-title-sm text-title-sm text-primary-container mt-0.5">₹{company.avgPackage} LPA</span>
                      </div>
                    </div>
                    
                    {/* Notes section instead of mock target cadres */}
                    {company.notes && (
                      <div className="mb-space-lg">
                        <span className="font-label-uppercase text-label-uppercase text-secondary block mb-space-xxs">NOTES</span>
                        <div className="font-body-sm text-body-sm text-on-surface line-clamp-2">
                          {company.notes}
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

        {/* ARCHIVAL RECRUITMENT INTELLIGENCE & CALLOUT */}
        <section className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-md max-w-xl">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
              <span className="material-symbols-outlined text-[24px]">analytics</span>
            </div>
            <div className="flex flex-col">
              <h4 className="font-title-md text-title-md text-primary-container">Institutional Fit Engine v2.5 Active</h4>
              <p className="font-body-sm text-body-sm text-secondary mt-0.5">FIT Scores reflect real-time weighting across your semester CGPA, verified GitHub architecture repositories, coding benchmarks, and completed department mock drives.</p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <button className="px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-dim font-title-sm text-title-sm text-primary-container transition-colors" type="button">
              Download Historical Intake PDF
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
