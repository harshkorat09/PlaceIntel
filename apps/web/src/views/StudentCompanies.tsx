import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function StudentCompanies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [packageFilter, setPackageFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('fit');
  const [activeLifecycle, setActiveLifecycle] = useState('Actively Hiring');

  const companies = [
    {
      id: 1,
      name: 'Microsoft IDC',
      sector: 'Technology / Cloud & Systems',
      monogram: 'MS',
      monogramBg: 'bg-primary-container text-surface-container-lowest',
      statusText: 'Active Drive',
      statusColor: 'bg-[#E8F5E9] text-[#1B5E20]',
      statusDot: 'bg-[#1B5E20]',
      closingIn: '3 days',
      closingIcon: 'schedule',
      openRoles: 23,
      alumniHired: 48,
      compensation: '₹18.5 - 44.0 LPA',
      targetCadres: ['Software Engineer (FTE)', 'Cloud Infrastructure Architect'],
      fitScore: 94,
      cohortTier: 'Top 5% Cohort',
      lifecycle: 'Actively Hiring',
      industryId: 'cloud',
      minPackage: 18.5,
    },
    {
      id: 2,
      name: 'Sophos Technologies',
      sector: 'Cybersecurity / Network Systems',
      monogram: 'SP',
      monogramBg: 'bg-primary-container text-surface-container-lowest',
      statusText: 'Active Drive',
      statusColor: 'bg-[#E8F5E9] text-[#1B5E20]',
      statusDot: 'bg-[#1B5E20]',
      closingIn: '9 days',
      closingIcon: 'schedule',
      openRoles: 8,
      alumniHired: 24,
      compensation: '₹14.0 LPA',
      targetCadres: ['Cybersecurity & Systems Associate', 'Network Security Engineer'],
      fitScore: 89,
      cohortTier: 'High Compatibility',
      lifecycle: 'Actively Hiring',
      industryId: 'cyber',
      minPackage: 14.0,
    },
    {
      id: 3,
      name: 'Crest Data Systems',
      sector: 'Cloud Automation & Security',
      monogram: 'CDS',
      monogramBg: 'bg-primary-container text-surface-container-lowest',
      statusText: 'Interviews Scheduled',
      statusColor: 'bg-[#FFF8E1] text-[#8C5800]',
      statusDot: 'bg-[#8C5800]',
      closingIn: 'Oct 28',
      closingIcon: 'event_available',
      closingPrefix: 'Technical Rounds begin',
      openRoles: 14,
      alumniHired: 38,
      compensation: '₹9.0 - 15.0 LPA',
      targetCadres: ['Cloud Automation Engineer', 'DevOps Specialist'],
      fitScore: 92,
      cohortTier: 'Top 10% Cohort',
      lifecycle: 'Upcoming Drives',
      industryId: 'cloud',
      minPackage: 9.0,
    },
    {
      id: 4,
      name: 'Bacancy Technology',
      sector: 'Full Stack & Cloud Native',
      monogram: 'BT',
      monogramBg: 'bg-primary-container text-surface-container-lowest',
      statusText: 'Active Drive',
      statusColor: 'bg-[#E8F5E9] text-[#1B5E20]',
      statusDot: 'bg-[#1B5E20]',
      closingIn: '15 days',
      closingIcon: 'schedule',
      openRoles: 12,
      alumniHired: 42,
      compensation: '₹8.5 - 11.0 LPA',
      targetCadres: ['Full Stack Engineer', 'Node.js Backend Lead'],
      fitScore: 90,
      cohortTier: 'Top 15% Cohort',
      lifecycle: 'Actively Hiring',
      industryId: 'enterprise',
      minPackage: 8.5,
    },
    {
      id: 5,
      name: 'Infocusp Innovations',
      sector: 'AI / Machine Learning & Data',
      monogram: 'IN',
      monogramBg: 'bg-primary-container text-surface-container-lowest',
      statusText: 'Active Shortlisting',
      statusColor: 'bg-[#E0F2FE] text-[#0369A1]',
      statusDot: 'bg-[#0369A1]',
      closingIn: 'in progress',
      closingIcon: 'data_thresholding',
      closingPrefix: 'Screening round',
      openRoles: 6,
      alumniHired: 18,
      compensation: '₹14.0 - 18.0 LPA',
      targetCadres: ['Machine Learning Engineer', 'NLP Specialist'],
      fitScore: 91,
      cohortTier: 'Top 10% Cohort',
      lifecycle: 'Actively Hiring',
      industryId: 'enterprise',
      minPackage: 14.0,
    },
    {
      id: 6,
      name: 'TCS Digital Cadre',
      sector: 'Digital Systems & Enterprise Solutions',
      monogram: 'TCS',
      monogramBg: 'bg-primary-container text-surface-container-lowest',
      statusText: 'NQT Active',
      statusColor: 'bg-[#EDE7F6] text-[#4A148C]',
      statusDot: 'bg-[#4A148C]',
      closingIn: 'Open',
      closingIcon: 'fact_check',
      closingPrefix: 'National Qualifier Test portal',
      openRoles: 150,
      alumniHired: 140,
      compensation: '₹9.0 - 11.5 LPA',
      targetCadres: ['Systems Engineer (Digital Cadre)', 'Cloud Integrator'],
      fitScore: 96,
      cohortTier: 'Top 2% Cohort',
      lifecycle: 'Actively Hiring',
      industryId: 'enterprise',
      minPackage: 9.0,
    },
  ];

  // Filtering Logic
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = searchQuery === '' || 
                          company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          company.sector.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = industryFilter === 'all' || company.industryId === industryFilter;
    
    let matchesPackage = true;
    if (packageFilter !== 'all') {
      matchesPackage = company.minPackage >= parseInt(packageFilter);
    }
    
    // In this mock, we just use activeLifecycle as a loose filter for demonstration if needed, 
    // but the HTML shows it as a tab filter.
    // matchesLifecycle removed due to unused warnings
    return matchesSearch && matchesIndustry && matchesPackage && 
           (activeLifecycle === 'Actively Hiring' ? company.lifecycle === 'Actively Hiring' : 
            activeLifecycle === 'Upcoming Drives' ? company.lifecycle === 'Upcoming Drives' : 
            activeLifecycle === 'Concluded' ? company.lifecycle === 'Concluded' : true);
  }).sort((a, b) => {
    if (sortOrder === 'fit') return b.fitScore - a.fitScore;
    if (sortOrder === 'roles') return b.openRoles - a.openRoles;
    if (sortOrder === 'package') return b.minPackage - a.minPackage;
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
      <div className="px-margin-mobile md:px-margin-desktop py-space-xl flex flex-col gap-space-2xl max-w-[1440px] mx-auto w-full">
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
                <span className="font-headline-md text-headline-md text-primary-container">64</span>
                <span className="font-label-regular text-label-regular text-secondary">Partners</span>
              </div>
            </div>
            <div className="flex flex-col px-space-sm py-space-xxs">
              <span className="font-label-uppercase text-label-uppercase text-secondary">CURRENT CADRES</span>
              <div className="flex items-baseline gap-space-xs mt-space-xxs">
                <span className="font-headline-md text-headline-md text-primary-container">213</span>
                <span className="font-label-regular text-label-regular text-secondary">Open Roles</span>
              </div>
            </div>
            <div className="flex flex-col px-space-sm py-space-xxs">
              <span className="font-label-uppercase text-label-uppercase text-secondary">AVERAGE DRIVE PACKAGE</span>
              <div className="flex items-baseline gap-space-xs mt-space-xxs">
                <span className="font-headline-md text-headline-md text-primary-container">₹12.8</span>
                <span className="font-label-regular text-label-regular text-secondary">LPA Median</span>
              </div>
            </div>
            <div className="flex flex-col px-space-sm py-space-xxs">
              <span className="font-label-uppercase text-label-uppercase text-secondary">YOUR ELIGIBILITY</span>
              <div className="flex items-baseline gap-space-xs mt-space-xxs">
                <span className="font-headline-md text-headline-md text-primary-container">88%</span>
                <span className="font-label-regular text-label-regular text-secondary">Cohort Tier 1</span>
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
                    <option value="all">All Industries (64)</option>
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
                    <option value="fit">Highest FIT Match</option>
                    <option value="roles">Most Open Roles</option>
                    <option value="package">Package: High to Low</option>
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
                  onClick={() => setActiveLifecycle('Actively Hiring')}
                  className={`px-space-sm py-1.5 rounded-lg font-title-sm text-title-sm transition-all ${activeLifecycle === 'Actively Hiring' ? 'bg-surface-container-lowest text-primary-container shadow-xs' : 'text-secondary hover:text-primary-container hover:bg-surface-container-lowest/50'}`}
                >
                  Actively Hiring <span className="font-label-regular text-label-regular text-secondary ml-1">(18)</span>
                </button>
                <button 
                  onClick={() => setActiveLifecycle('Upcoming Drives')}
                  className={`px-space-sm py-1.5 rounded-lg font-title-sm text-title-sm transition-all ${activeLifecycle === 'Upcoming Drives' ? 'bg-surface-container-lowest text-primary-container shadow-xs' : 'text-secondary hover:text-primary-container hover:bg-surface-container-lowest/50'}`}
                >
                  Upcoming Drives <span className="font-label-regular text-label-regular text-secondary ml-1">(12)</span>
                </button>
                <button 
                  onClick={() => setActiveLifecycle('Concluded')}
                  className={`px-space-sm py-1.5 rounded-lg font-title-sm text-title-sm transition-all ${activeLifecycle === 'Concluded' ? 'bg-surface-container-lowest text-primary-container shadow-xs' : 'text-secondary hover:text-primary-container hover:bg-surface-container-lowest/50'}`}
                >
                  Concluded <span className="font-label-regular text-label-regular text-secondary ml-1">(34)</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* COMPANIES GRID LIST */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg">
          {filteredCompanies.map((company) => (
            <article key={company.id} className="flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-md transition-all duration-200">
              <div>
                {/* Top Row: Monogram, Header Info & Status */}
                <div className="flex items-start justify-between gap-space-sm mb-space-md">
                  <div className="flex items-center gap-space-md">
                    <div className={`w-12 h-12 rounded-xl ${company.monogramBg} font-title-md text-title-md flex items-center justify-center tracking-tight font-semibold select-none shadow-xs`}>
                      {company.monogram}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-title-md text-title-md text-primary-container tracking-tight">{company.name}</h3>
                      <span className="font-body-sm text-body-sm text-secondary">{company.sector}</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-space-xs py-1 rounded-full ${company.statusColor} font-label-uppercase text-label-uppercase shrink-0`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${company.statusDot}`}></span>
                    {company.statusText}
                  </span>
                </div>
                
                {/* Urgency Ribbon */}
                <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1.5 rounded-lg mb-space-lg">
                  <span className="material-symbols-outlined text-[16px] text-secondary">{company.closingIcon}</span>
                  <span className="font-label-regular text-label-regular text-secondary">
                    {company.closingPrefix ? `${company.closingPrefix} ` : 'Application Closes in '}
                    <strong className="text-primary-container font-semibold">{company.closingIn}</strong>
                  </span>
                </div>
                
                {/* Key Metrics Modular Strip */}
                <div className="grid grid-cols-3 gap-space-xs bg-surface-container-low p-space-sm rounded-xl mb-space-lg text-center">
                  <div className="flex flex-col">
                    <span className="font-label-uppercase text-label-uppercase text-secondary">OPEN ROLES</span>
                    <span className="font-title-sm text-title-sm text-primary-container mt-0.5">{company.openRoles}{company.openRoles >= 150 ? '+' : ''} Roles</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-uppercase text-label-uppercase text-secondary">ALUMNI HIRED</span>
                    <span className="font-title-sm text-title-sm text-primary-container mt-0.5">{company.alumniHired}{company.alumniHired >= 140 ? '+' : ''} Alumni</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-uppercase text-label-uppercase text-secondary">COMPENSATION</span>
                    <span className="font-title-sm text-title-sm text-primary-container mt-0.5">{company.compensation}</span>
                  </div>
                </div>
                
                {/* Top Roles Under Recruitment */}
                <div className="mb-space-lg">
                  <span className="font-label-uppercase text-label-uppercase text-secondary block mb-space-xxs">TARGET CADRES</span>
                  <div className="flex flex-wrap gap-space-xs">
                    {company.targetCadres.map((role, idx) => (
                      <span key={idx} className="inline-flex items-center px-space-xs py-1 rounded bg-surface-container font-body-sm text-body-sm text-on-surface">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Card Footer: Candidate Fit & Action Dossier */}
              <div className="pt-space-md flex flex-col gap-space-md">
                <div className="flex items-center justify-between bg-secondary-fixed/50 px-space-sm py-2 rounded-lg">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary-container text-[18px]">verified</span>
                    <span className="font-title-sm text-title-sm text-primary-container">{company.fitScore} FIT Score</span>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase text-on-secondary-fixed bg-secondary-fixed px-space-xs py-0.5 rounded-full">
                    {company.cohortTier}
                  </span>
                </div>
                <Link to={`/companies/${company.id}`} className="w-full h-11 bg-primary-container hover:bg-tertiary text-surface-container-lowest font-title-sm text-title-sm rounded-xl flex items-center justify-center gap-space-xs transition-colors group">
                  <span>View Company Dossier</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </article>
          ))}
          {filteredCompanies.length === 0 && (
            <div className="col-span-full py-space-3xl flex flex-col items-center justify-center text-center text-secondary">
              <span className="material-symbols-outlined text-[48px] mb-space-sm opacity-50">search_off</span>
              <h3 className="font-headline-sm text-headline-sm text-primary-container mb-2">No hiring partners found</h3>
              <p className="font-body-md text-body-md max-w-md">Try adjusting your filters or search terms to explore other cadres.</p>
            </div>
          )}
        </section>

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
