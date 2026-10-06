import { useState } from 'react';
import { Link } from 'react-router-dom';

type CycleKey = '2025-26' | '2024-25';
type DeptKey = 'all' | 'ce' | 'it' | 'ece';

const dataset = {
  '2025-26': {
    all: { rate: '78.4%', avg: '₹9.84', max: '₹44.0', partners: '64' },
    ce: { rate: '83.2%', avg: '₹10.50', max: '₹44.0', partners: '58' },
    it: { rate: '80.1%', avg: '₹9.90', max: '₹32.0', partners: '52' },
    ece: { rate: '71.5%', avg: '₹8.40', max: '₹22.5', partners: '41' }
  },
  '2024-25': {
    all: { rate: '89.6%', avg: '₹8.92', max: '₹38.5', partners: '82' },
    ce: { rate: '92.4%', avg: '₹9.40', max: '₹38.5', partners: '78' },
    it: { rate: '90.2%', avg: '₹8.85', max: '₹28.0', partners: '70' },
    ece: { rate: '85.1%', avg: '₹7.95', max: '₹18.0', partners: '54' }
  }
};

export function PlacementMarket() {
  const [cycle, setCycle] = useState<CycleKey>('2025-26');
  const [dept, setDept] = useState<DeptKey>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const currentData = dataset[cycle][dept] || dataset['2025-26']['all'];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => {
        setExportComplete(false);
      }, 2000);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Command / Context Sub-Header */}
      <section className="w-full px-space-xl py-space-xl bg-surface-container-lowest shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xxs max-w-3xl">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-uppercase text-label-uppercase text-on-primary-container bg-surface-container px-space-xs py-space-xxs rounded-full">Institutional Census Node • Real-Time Market</span>
              <span className="text-outline text-label-regular">•</span>
              <span className="font-label-regular text-label-regular text-secondary">Cycle Verification ID: #PI-2025-C8</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Placement Market Intelligence</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Verified hiring trends, compensation benchmarks, and departmental clearance rates across CHARUSAT academic cycles.
            </p>
          </div>
          {/* Controls & Filters */}
          <div className="flex flex-wrap items-center gap-space-sm bg-surface-container-low p-space-xs rounded-xl">
            <div className="flex items-center bg-surface-container-lowest rounded-lg px-space-sm py-space-xs shadow-sm">
              <label className="font-label-uppercase text-label-uppercase text-secondary pr-space-xs">Academic Cycle:</label>
              <select 
                className="font-title-sm text-title-sm text-primary bg-transparent focus:outline-none cursor-pointer" 
                value={cycle}
                onChange={(e) => setCycle(e.target.value as CycleKey)}
              >
                <option value="2025-26">2025–26 (Active Ongoing)</option>
                <option value="2024-25">2024–25 (Audited Historical)</option>
              </select>
            </div>
            <div className="flex items-center bg-surface-container-lowest rounded-lg px-space-sm py-space-xs shadow-sm">
              <label className="font-label-uppercase text-label-uppercase text-secondary pr-space-xs">Cohort:</label>
              <select 
                className="font-title-sm text-title-sm text-primary bg-transparent focus:outline-none cursor-pointer"
                value={dept}
                onChange={(e) => setDept(e.target.value as DeptKey)}
              >
                <option value="all">All Departments (Consolidated)</option>
                <option value="ce">Computer Engineering (CSPIT / DEPSTAR)</option>
                <option value="it">Information Technology</option>
                <option value="ece">Electronics & Communication</option>
              </select>
            </div>
            <button 
              onClick={handleExport}
              className="flex items-center gap-space-xxs px-space-sm py-space-xs bg-primary-container text-on-primary rounded-lg font-title-sm text-title-sm hover:bg-tertiary-container transition-all"
            >
              {isExporting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                  <span>Generating...</span>
                </>
              ) : exportComplete ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">done</span>
                  <span>Report Ready</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Cohort Brief</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Space */}
      <div className="w-full px-space-xl py-space-2xl space-y-space-2xl max-w-7xl mx-auto mb-space-2xl">
        {/* KPI Metric Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {/* Metric 1: Rate */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Aggregate Clearance</span>
              <span className="flex items-center text-label-uppercase font-label-uppercase px-space-xs py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span>+6.2% YoY
              </span>
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-hero text-headline-lg text-primary tracking-tight">{currentData.rate}</span>
              <span className="font-label-regular text-label-regular text-outline">of 840 candidates</span>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between">
              <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mr-3">
                <div className="bg-primary-container h-full rounded-full transition-all duration-500" style={{ width: currentData.rate }}></div>
              </div>
              <span className="font-label-regular text-label-regular text-secondary shrink-0">Ongoing</span>
            </div>
          </div>
          
          {/* Metric 2: Average Package */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Mean Annual Package</span>
              <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded-full bg-surface-container-low text-secondary">CTC INR</span>
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-hero text-headline-lg text-primary tracking-tight">{currentData.avg}</span>
              <span className="font-headline-sm text-headline-sm text-secondary">LPA</span>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between text-secondary font-label-regular text-label-regular">
              <span>Median CE/IT: ₹9.20 LPA</span>
              <span className="text-on-primary-container font-label-uppercase">Audited</span>
            </div>
          </div>

          {/* Metric 3: Highest Package */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Peak Compensation</span>
              <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded-full bg-secondary-container text-on-secondary-container">Super Dream</span>
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-hero text-headline-lg text-primary tracking-tight">{currentData.max}</span>
              <span className="font-headline-sm text-headline-sm text-secondary">LPA</span>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between text-secondary font-label-regular text-label-regular">
              <span className="text-primary font-title-sm truncate">Microsoft IDC</span>
              <span className="text-outline">Hyderabad Node</span>
            </div>
          </div>

          {/* Metric 4: Partner Firms */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Corporate Partners</span>
              <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded-full bg-primary-fixed text-on-primary-fixed">64 Scheduled</span>
            </div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-display-hero text-headline-lg text-primary tracking-tight">{currentData.partners}</span>
              <span className="font-body-md text-body-md text-secondary">Enterprises</span>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between text-secondary font-label-regular text-label-regular">
              <span>38 Conducted</span>
              <span className="text-primary-container font-title-sm">26 Active Pipeline</span>
            </div>
          </div>
        </section>

        {/* Visual Layer: Editorial Split Analytics */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Left Column: Compensation Dispersal & Tiers (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-xs">
                <h2 className="font-title-md text-title-md text-primary">Compensation Dispersal & Hiring Tiers</h2>
                <span className="font-label-uppercase text-label-uppercase text-secondary bg-surface-container px-space-xs py-space-xxs rounded">Policy Index 2025</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-xl">
                Distribution of validated full-time institutional offers by CTC band. Candidates holding Prime tier are permitted single re-attempt into Super Dream.
              </p>

              {/* Architectural Visual Segmented Bar */}
              <div className="w-full mb-space-xl">
                <div className="flex items-center justify-between mb-space-xs font-label-regular text-label-regular text-secondary">
                  <span>Overall Offer Breakdown Ratio</span>
                  <span>100% Validated Base</span>
                </div>
                <div className="h-6 w-full rounded-md overflow-hidden flex bg-surface-container-high">
                  <div className="h-full bg-primary-container transition-all relative group cursor-pointer" style={{ width: '24%' }}>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-tertiary text-on-tertiary font-label-regular text-label-regular py-1 px-2 rounded shadow-md pointer-events-none whitespace-nowrap z-20">
                      Marquee ({'>'}15 LPA): 24%
                    </div>
                  </div>
                  <div className="h-full bg-surface-tint transition-all relative group cursor-pointer" style={{ width: '38%' }}>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-tertiary text-on-tertiary font-label-regular text-label-regular py-1 px-2 rounded shadow-md pointer-events-none whitespace-nowrap z-20">
                      Dream (10–15 LPA): 38%
                    </div>
                  </div>
                  <div className="h-full bg-secondary-fixed-dim transition-all relative group cursor-pointer" style={{ width: '32%' }}>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-tertiary text-on-tertiary font-label-regular text-label-regular py-1 px-2 rounded shadow-md pointer-events-none whitespace-nowrap z-20">
                      Prime (6–10 LPA): 32%
                    </div>
                  </div>
                  <div className="h-full bg-surface-dim transition-all relative group cursor-pointer" style={{ width: '6%' }}>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-tertiary text-on-tertiary font-label-regular text-label-regular py-1 px-2 rounded shadow-md pointer-events-none whitespace-nowrap z-20">
                      Base (4–6 LPA): 6%
                    </div>
                  </div>
                </div>
              </div>

              {/* Tier Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                {/* Tier 1 */}
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-3 h-3 rounded bg-primary-container"></span>
                      <span className="font-title-sm text-title-sm text-primary">Marquee / Super Dream</span>
                    </div>
                    <span className="font-title-sm text-title-sm text-primary">24%</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary mb-space-sm">{'>'} ₹15.0 LPA Threshold</p>
                  <div className="flex items-center justify-between text-secondary font-label-regular text-label-regular">
                    <span>161 Offer Confirmations</span>
                    <span className="text-primary-container font-title-sm">Top 15th percentile</span>
                  </div>
                </div>

                {/* Tier 2 */}
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-3 h-3 rounded bg-surface-tint"></span>
                      <span className="font-title-sm text-title-sm text-primary">Dream Tier</span>
                    </div>
                    <span className="font-title-sm text-title-sm text-primary">38%</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary mb-space-sm">₹10.0 – ₹15.0 LPA</p>
                  <div className="flex items-center justify-between text-secondary font-label-regular text-label-regular">
                    <span>254 Offer Confirmations</span>
                    <span className="text-primary-container font-title-sm">Standard Engineering Mean</span>
                  </div>
                </div>

                {/* Tier 3 */}
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-3 h-3 rounded bg-secondary-fixed-dim"></span>
                      <span className="font-title-sm text-title-sm text-primary">Prime Tier</span>
                    </div>
                    <span className="font-title-sm text-title-sm text-primary">32%</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary mb-space-sm">₹6.0 – ₹10.0 LPA</p>
                  <div className="flex items-center justify-between text-secondary font-label-regular text-label-regular">
                    <span>214 Offer Confirmations</span>
                    <span className="text-secondary font-label-regular">Dual Attempt Eligible</span>
                  </div>
                </div>

                {/* Tier 4 */}
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-3 h-3 rounded bg-surface-dim"></span>
                      <span className="font-title-sm text-title-sm text-primary">Base Tier</span>
                    </div>
                    <span className="font-title-sm text-title-sm text-primary">6%</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary mb-space-sm">₹4.0 – ₹6.0 LPA</p>
                  <div className="flex items-center justify-between text-secondary font-label-regular text-label-regular">
                    <span>40 Offer Confirmations</span>
                    <span className="text-secondary font-label-regular">Mass Clearance Band</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-space-lg pt-space-md flex items-center justify-between font-label-regular text-label-regular text-secondary">
              <span>Historical Parity: Tracked against NAAC / NIRF standard metric definitions</span>
              <span className="text-primary">Source: CHARUSAT T&P Audit Cell</span>
            </div>
          </div>

          {/* Right Column: Institutional Atmosphere / Highlights (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            {/* Deep Navy Atmospheric Card */}
            <div className="bg-primary-container text-on-primary p-space-xl rounded-xl shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-uppercase text-label-uppercase text-on-primary-container">Placement Directive</span>
                  <span className="font-label-uppercase text-label-uppercase bg-tertiary-container text-surface-bright px-space-xs py-space-xxs rounded">Policy Mandate</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-primary mb-space-xs">Dual-Offer Provision Status</h3>
                <p className="font-body-sm text-body-sm text-on-primary-container leading-relaxed mb-space-lg">
                  Active for students placed in Prime tier ({'<'} ₹10 LPA). Candidates remain qualified to sit for designated Super Dream ({'>'} ₹15 LPA) on-campus drives without forfeiting current retention agreement.
                </p>
                
                <div className="bg-tertiary-container p-space-md rounded-lg space-y-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm text-on-primary">Eligible Prime Candidates:</span>
                    <span className="font-title-sm text-title-sm text-surface-bright">214 Students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body-sm text-body-sm text-on-primary-container">Utilized Super Dream Attempts:</span>
                    <span className="font-body-sm text-body-sm text-surface-bright">89 (41.5%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body-sm text-body-sm text-on-primary-container">Successful Upgrades:</span>
                    <span className="font-body-sm text-body-sm text-surface-bright">31 Students</span>
                  </div>
                </div>
              </div>
              <div className="mt-space-lg pt-space-sm flex items-center justify-between text-on-primary-container font-label-regular text-label-regular">
                <span>Administered by Dean's Office</span>
                <span className="text-on-primary flex items-center">Verified Directive <span className="material-symbols-outlined text-[16px] ml-1">verified</span></span>
              </div>
            </div>

            {/* Archival Cream Card: Market Observation */}
            <div className="bg-secondary-fixed text-on-secondary-fixed p-space-xl rounded-xl shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-space-xs mb-space-xs">
                  <span className="material-symbols-outlined text-[20px] text-on-secondary-fixed">psychology</span>
                  <span className="font-label-uppercase text-label-uppercase text-on-secondary-fixed">Lead Industry Observation</span>
                </div>
                <h4 className="font-title-md text-title-md text-on-secondary-fixed mb-space-xs">Engineering Evaluation Pivot</h4>
                <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant leading-relaxed">
                  “Tier-1 product enterprises are prioritizing concurrent systems, transactional consistency, and live distributed environment debugging above isolated LeetCode memorization in technical rounds.”
                </p>
              </div>
              <div className="mt-space-md pt-space-xs flex items-center justify-between font-label-regular text-label-regular text-on-secondary-fixed-variant">
                <span>Corporate Feedback Council</span>
                <span className="font-title-sm text-title-sm text-on-secondary-fixed">October 2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skill Demand & Tech Stacks vs Company Participation */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Tech Stacks Demand Matrix (6 cols) */}
          <div className="lg:col-span-6 bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-xs">
                <h3 className="font-title-md text-title-md text-primary">In-Demand Technical Stacks</h3>
                <span className="font-label-uppercase text-label-uppercase text-secondary">Tier-1 Role Frequency</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                Evaluation criteria pulled from validated job descriptions and campus assessment questionnaires.
              </p>
              
              <div className="space-y-space-md">
                {/* Stack 1 */}
                <div>
                  <div className="flex justify-between items-center mb-space-xxs">
                    <span className="font-title-sm text-title-sm text-primary">Distributed Systems & Java / Spring Boot</span>
                    <span className="font-title-sm text-title-sm text-primary">42% of Tier-1 roles</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-primary-container h-full rounded-full transition-all duration-500" style={{ width: '42%' }}></div>
                  </div>
                  <div className="flex justify-between text-secondary font-label-regular text-label-regular mt-1">
                    <span>Microservices, Kafka, Redis, Concurrency</span>
                    <span>Demand Index: High</span>
                  </div>
                </div>
                
                {/* Stack 2 */}
                <div>
                  <div className="flex justify-between items-center mb-space-xxs">
                    <span className="font-title-sm text-title-sm text-primary">Full-Stack React / Next.js / TypeScript</span>
                    <span className="font-title-sm text-title-sm text-primary">38% of Tier-1 roles</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-surface-tint h-full rounded-full transition-all duration-500" style={{ width: '38%' }}></div>
                  </div>
                  <div className="flex justify-between text-secondary font-label-regular text-label-regular mt-1">
                    <span>State architecture, SSR, Node runtime</span>
                    <span>Demand Index: Strong</span>
                  </div>
                </div>
                
                {/* Stack 3 */}
                <div>
                  <div className="flex justify-between items-center mb-space-xxs">
                    <span className="font-title-sm text-title-sm text-primary">Cloud Infrastructure (AWS / Azure / Docker)</span>
                    <span className="font-title-sm text-title-sm text-primary">29% of Tier-1 roles</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '29%' }}></div>
                  </div>
                  <div className="flex justify-between text-secondary font-label-regular text-label-regular mt-1">
                    <span>Containerization, CI/CD Pipelines, Serverless</span>
                    <span>Demand Index: Steady</span>
                  </div>
                </div>
                
                {/* Stack 4 */}
                <div>
                  <div className="flex justify-between items-center mb-space-xxs">
                    <span className="font-title-sm text-title-sm text-primary">AI / ML Engineering & Data Pipeline Architecture</span>
                    <span className="font-title-sm text-title-sm text-primary">18% of Tier-1 roles</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary-fixed-dim h-full rounded-full transition-all duration-500" style={{ width: '18%' }}></div>
                  </div>
                  <div className="flex justify-between text-secondary font-label-regular text-label-regular mt-1">
                    <span>Vector Databases, Python, PyTorch, LLM Orchestration</span>
                    <span>Demand Index: Emerging Peak</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-space-xl p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-primary-container">lightbulb</span>
                <span className="font-body-sm text-body-sm text-on-surface">Curricular Alignment Action</span>
              </div>
              <span className="font-label-uppercase text-label-uppercase text-secondary">Labs active in Semester 7</span>
            </div>
          </div>

          {/* Company Participation Categorical Directory (6 cols) */}
          <div className="lg:col-span-6 bg-surface-container-lowest p-space-xl rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-xs">
                <h3 className="font-title-md text-title-md text-primary">Corporate Participation Spectrum</h3>
                <span className="font-label-uppercase text-label-uppercase text-secondary">64 Active Partners</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">
                Stratified hiring accounts conducting structured assessment and on-site clearance.
              </p>
              
              <div className="space-y-space-md">
                {/* Category 1 */}
                <div className="bg-surface-container-low p-space-md rounded-lg">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-title-sm text-title-sm text-primary">Tier-1 Product Enterprises</span>
                    <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded bg-secondary-container text-on-secondary-container">Package: ₹16 - 44 LPA</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary mb-space-sm">High-density technical screening, multi-tier system rounds, system design.</p>
                  <div className="flex flex-wrap gap-space-xs">
                    <span className="font-label-regular text-label-regular bg-surface-container-lowest text-primary px-space-sm py-space-xxs rounded shadow-sm font-medium">Microsoft IDC</span>
                    <span className="font-label-regular text-label-regular bg-surface-container-lowest text-primary px-space-sm py-space-xxs rounded shadow-sm font-medium">Amazon</span>
                    <span className="font-label-regular text-label-regular bg-surface-container-lowest text-primary px-space-sm py-space-xxs rounded shadow-sm font-medium">Sophos Technologies</span>
                    <span className="font-label-regular text-label-regular bg-surface-container-lowest text-primary px-space-sm py-space-xxs rounded shadow-sm font-medium">Infocusp</span>
                  </div>
                </div>
                
                {/* Category 2 */}
                <div className="bg-surface-container-low p-space-md rounded-lg">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-title-sm text-title-sm text-primary">High-Growth FinTech & Scale-ups</span>
                    <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded bg-surface-container-high text-on-surface-variant">Package: ₹9 - 15 LPA</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary mb-space-sm">Domain-specific cloud platforms, full-stack velocity, fintech pipelines.</p>
                  <div className="flex flex-wrap gap-space-xs">
                    <span className="font-label-regular text-label-regular bg-surface-container-lowest text-primary px-space-sm py-space-xxs rounded shadow-sm font-medium">Crest Data Systems</span>
                    <span className="font-label-regular text-label-regular bg-surface-container-lowest text-primary px-space-sm py-space-xxs rounded shadow-sm font-medium">Bacancy Technology</span>
                    <span className="font-label-regular text-label-regular bg-surface-container-lowest text-primary px-space-sm py-space-xxs rounded shadow-sm font-medium">TatvaSoft</span>
                  </div>
                </div>
                
                {/* Category 3 */}
                <div className="bg-surface-container-low p-space-md rounded-lg">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-title-sm text-title-sm text-primary">Global Enterprise & Specialist Units</span>
                    <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded bg-surface-container-high text-on-surface-variant">Package: ₹7 - 11 LPA</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary mb-space-sm">High-capacity specialist bands with nationwide merit rankings.</p>
                  <div className="flex flex-wrap gap-space-xs">
                    <span className="font-label-regular text-label-regular bg-surface-container-lowest text-primary px-space-sm py-space-xxs rounded shadow-sm font-medium">TCS Digital</span>
                    <span className="font-label-regular text-label-regular bg-surface-container-lowest text-primary px-space-sm py-space-xxs rounded shadow-sm font-medium">Infosys SP (Specialist)</span>
                    <span className="font-label-regular text-label-regular bg-surface-container-lowest text-primary px-space-sm py-space-xxs rounded shadow-sm font-medium">LTIMindtree</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-space-lg pt-space-xs flex items-center justify-between text-secondary font-label-regular text-label-regular">
              <span>Drive Schedule: Updated bi-weekly</span>
              <Link to="/companies" className="text-primary-container font-title-sm hover:underline flex items-center">
                Inspect All 64 Partners <span className="material-symbols-outlined text-[16px] ml-0.5">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Student Advisory & Actionable Readiness Checklist */}
        <section className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-lg">
            <div>
              <span className="font-label-uppercase text-label-uppercase text-secondary">Student Career Advisory</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">Preparation Protocol For Upcoming Cycle Windows</h3>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-regular text-label-regular text-secondary">Phase 3 Assessment Windows Commencing</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {/* Checklist Card 1 */}
            <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center mb-space-sm shadow-sm">
                  <span className="material-symbols-outlined text-primary-container text-[20px]">code_blocks</span>
                </div>
                <h4 className="font-title-sm text-title-sm text-primary mb-space-xs">Concurrency & System Execution</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Focus rigorous revision on deadlock handling, thread safety, thread pools, and memory profiling. Practice live refactoring of synchronized routines.
                </p>
              </div>
              <div className="pt-space-xs font-label-uppercase text-label-uppercase text-primary-container flex items-center">
                <span>High Impact in Technical Rounds</span>
              </div>
            </div>
            
            {/* Checklist Card 2 */}
            <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center mb-space-sm shadow-sm">
                  <span className="material-symbols-outlined text-primary-container text-[20px]">cloud_sync</span>
                </div>
                <h4 className="font-title-sm text-title-sm text-primary mb-space-xs">Distributed Architecture Audits</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Prepare practical system design narratives for scale: database sharding, caching tiers with Redis, and eventual consistency trade-offs.
                </p>
              </div>
              <div className="pt-space-xs font-label-uppercase text-label-uppercase text-primary-container flex items-center">
                <span>Critical For {'>'} ₹12 LPA Bands</span>
              </div>
            </div>
            
            {/* Checklist Card 3 */}
            <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center mb-space-sm shadow-sm">
                  <span className="material-symbols-outlined text-primary-container text-[20px]">gavel</span>
                </div>
                <h4 className="font-title-sm text-title-sm text-primary mb-space-xs">Compliance & Dual Offer Adherence</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Review and sign clearance declarations prior to Super Dream testing. Ensure your primary acceptance letters are on file with the placement secretariat.
                </p>
              </div>
              <div className="pt-space-xs font-label-uppercase text-label-uppercase text-primary-container flex items-center">
                <span>Mandatory Institutional Compliance</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
