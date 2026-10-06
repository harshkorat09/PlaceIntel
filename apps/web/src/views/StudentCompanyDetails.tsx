import { Link } from 'react-router-dom';

export function StudentCompanyDetails() {

  // In a real app, you would fetch company data based on the ID.
  // Using static mock data based on the provided HTML design.

  return (
    <div className="flex flex-col w-full">
      {/* Sub-Header / Breadcrumb Line */}
      <div className="px-space-xl py-space-sm bg-surface-container-lowest shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-space-xs font-label-regular text-label-regular text-secondary">
          <Link to="#" className="hover:text-primary-container transition-colors">Institutions</Link>
          <span className="text-outline">/</span>
          <Link to="/companies" className="hover:text-primary-container transition-colors">Companies</Link>
          <span className="text-outline">/</span>
          <span className="font-title-sm text-title-sm text-primary-container">Microsoft IDC</span>
        </div>
        <div className="flex items-center gap-space-sm hidden sm:flex">
          <span className="inline-flex items-center gap-1.5 px-space-xs py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            Tier-1 Institutional Recruiter
          </span>
          <span className="font-label-regular text-label-regular text-secondary">CHARUSAT Verified Dossier · Q1 2026</span>
        </div>
      </div>
      
      <div className="max-w-[1440px] w-full mx-auto px-space-xl py-space-xl flex flex-col gap-space-xl">
        {/* Corporate Header Banner */}
        <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
            <div className="flex items-start gap-space-lg">
              {/* Institutional Brand Monogram */}
              <div className="w-20 h-20 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-md text-headline-md tracking-tight shadow-md flex-shrink-0">
                MS
              </div>
              <div className="flex flex-col gap-space-xxs">
                <div className="flex flex-wrap items-center gap-space-sm">
                  <h1 className="font-headline-lg text-headline-lg text-primary-container tracking-tight">
                    Microsoft IDC
                  </h1>
                  <span className="font-label-regular text-label-regular text-secondary">
                    (India Development Center)
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-space-xs py-space-xxs rounded-full bg-surface-container font-label-uppercase text-label-uppercase text-primary-container">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    Drive Status: Ongoing
                  </span>
                </div>
                <p className="font-body-md text-body-md text-secondary">
                  Enterprise Cloud & Operating Systems Architecture · Core Engineering Systems
                </p>
                <div className="flex flex-wrap items-center gap-space-md mt-space-xxs text-secondary font-label-regular text-label-regular">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                    Bengaluru, Hyderabad, Noida
                  </span>
                  <span className="text-outline-variant">•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-outline">corporate_fare</span>
                    Global Engineering Division
                  </span>
                  <span className="text-outline-variant">•</span>
                  <span className="flex items-center gap-1 text-primary-container font-title-sm">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    Full Accreditation Granted
                  </span>
                </div>
              </div>
            </div>
            
            {/* Drive Action Box */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-space-xs flex-shrink-0">
              <div className="px-space-sm py-space-xs rounded-lg bg-surface-container-low text-right">
                <span className="font-label-uppercase text-label-uppercase text-secondary block">Cohort Drive Pipeline</span>
                <span className="font-title-sm text-title-sm text-primary-container">Selection Cycle 2025–26</span>
              </div>
              <a href="#active-drives" className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow hover:bg-primary transition-all group">
                <span>View Active Openings (3 Roles)</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3-Column Metrics Snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary">
              <span className="font-label-uppercase text-label-uppercase tracking-wider">Available Requisitions</span>
              <span className="material-symbols-outlined text-outline">assignment_turned_in</span>
            </div>
            <div className="mt-space-md">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-headline-lg text-primary-container">23</span>
                <span className="font-title-sm text-title-sm text-secondary">Open Roles</span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mt-space-xxs">
                Campus Drive & Entry-Level IDC mandates active for 2026 Batch.
              </p>
            </div>
            <div className="mt-space-md pt-space-xs bg-surface-container-low rounded-lg p-space-xs flex items-center justify-between font-label-regular text-label-regular">
              <span className="text-secondary">Direct Campus Intakes:</span>
              <span className="font-title-sm text-title-sm text-primary-container">14 Roles</span>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary">
              <span className="font-label-uppercase text-label-uppercase tracking-wider">Institutional Representation</span>
              <span className="material-symbols-outlined text-outline">groups</span>
            </div>
            <div className="mt-space-md">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-headline-lg text-primary-container">48</span>
                <span className="font-title-sm text-title-sm text-secondary">CHARUSAT Alumni</span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mt-space-xxs">
                Stationed within Azure Core, Windows Kernel, and Office 365.
              </p>
            </div>
            <div className="mt-space-md pt-space-xs bg-surface-container-low rounded-lg p-space-xs flex items-center justify-between font-label-regular text-label-regular">
              <span className="text-secondary">Retention Index (3 Yr):</span>
              <span className="font-title-sm text-title-sm text-primary-container">91.4%</span>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary">
              <span className="font-label-uppercase text-label-uppercase tracking-wider">Remuneration Benchmark</span>
              <span className="material-symbols-outlined text-outline">monetization_on</span>
            </div>
            <div className="mt-space-md">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-headline-lg text-primary-container">₹14.2</span>
                <span className="font-title-sm text-title-sm text-secondary">LPA Mean</span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mt-space-xxs">
                Base compensation baseline for undergraduate placements.
              </p>
            </div>
            <div className="mt-space-md pt-space-xs bg-surface-container-low rounded-lg p-space-xs flex items-center justify-between font-label-regular text-label-regular">
              <span className="text-secondary">Apex Package Record:</span>
              <span className="font-title-sm text-title-sm text-primary-container">₹44.0 LPA</span>
            </div>
          </div>
        </div>

        {/* Signature "YOUR POSITION" Intelligence Section */}
        <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-md">
            <div>
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                <span className="font-label-uppercase text-label-uppercase text-primary-container">Institutional Fit Engine</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-primary-container tracking-tight mt-space-xxs">
                Candidate Alignment & Competency Position
              </h2>
              <p className="font-body-sm text-body-sm text-secondary">
                Synthesized against Aarav Mehta’s academic records (21IT084) & historical Microsoft IDC hiring patterns.
              </p>
            </div>
            <div className="mt-space-sm md:mt-0 flex items-center gap-space-xs">
              <span className="px-space-sm py-space-xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-title-sm text-title-sm">
                Top Tier Match (Rank #4 / 320 in Cohort)
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl mt-space-md pt-space-md border-t border-surface-container">
            {/* Target Role Comparison (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-title-sm text-title-sm text-primary-container">Target Institutional Role Matches</span>
                <span className="font-label-regular text-label-regular text-secondary">Model Version: v4.8 Alpha</span>
              </div>
              
              {/* Role 1 */}
              <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-title-sm text-title-sm text-primary-container block">
                      Software Engineer (FTE 2026)
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary">
                      Cloud & Enterprise Security Systems · Hyderabad / Bengaluru
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-sm text-headline-sm text-primary-container leading-none">94%</span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary block mt-0.5">Your Fit</span>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden my-space-xxs">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '94%' }}></div>
                </div>
                <div className="flex items-center justify-between text-secondary font-label-regular text-label-regular pt-space-xxs">
                  <span className="flex items-center gap-1 text-primary-container">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Exceptional Match: CGPA 9.18 + Advanced Multithreading / Concurrency Verification
                  </span>
                  <span className="font-label-uppercase text-label-uppercase text-primary-container">Preferred Target</span>
                </div>
              </div>
              
              {/* Role 2 */}
              <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-title-sm text-title-sm text-primary-container block">
                      Data Platform Engineer
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary">
                      Synapse Analytics Infrastructure · Noida
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-sm text-headline-sm text-primary-container leading-none">82%</span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary block mt-0.5">Your Fit</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden my-space-xxs">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '82%' }}></div>
                </div>
                <div className="flex items-center justify-between text-secondary font-label-regular text-label-regular pt-space-xxs">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-outline">tune</span>
                    Strong Match: Distributed storage satisfied; Advanced SQL optimization recommended
                  </span>
                  <span className="font-label-uppercase text-label-uppercase text-secondary">Secondary Target</span>
                </div>
              </div>
              
              {/* Role 3 */}
              <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-title-sm text-title-sm text-primary-container block">
                      Cloud Infrastructure Engineer
                    </span>
                    <span className="font-body-sm text-body-sm text-secondary">
                      Azure Core Fabric Management · Hyderabad
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-headline-sm text-headline-sm text-primary-container leading-none">76%</span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary block mt-0.5">Your Fit</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden my-space-xxs">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '76%' }}></div>
                </div>
                <div className="flex items-center justify-between text-secondary font-label-regular text-label-regular pt-space-xxs">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-outline">info</span>
                    Moderate Match: Core networking valid; Docker/K8s practical verification required
                  </span>
                  <span className="font-label-uppercase text-label-uppercase text-secondary">Tertiary Target</span>
                </div>
              </div>
            </div>
            
            {/* Candidate Competency Vector (5 cols) */}
            <div className="lg:col-span-5 bg-surface-container rounded-xl p-space-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-title-sm text-title-sm text-primary-container">Microsoft Technical Benchmarks</span>
                  <span className="font-label-uppercase text-label-uppercase text-secondary">Candidate Vector</span>
                </div>
                <p className="font-body-sm text-body-sm text-secondary mb-space-md">
                  Evaluated against 420+ successful IDC undergraduate engineering intakes.
                </p>
                
                <div className="flex flex-col gap-space-md">
                  {/* Metric 1 */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center font-label-regular text-label-regular">
                      <span className="text-on-surface font-title-sm">Data Structures & Algorithms</span>
                      <span className="text-primary-container font-title-sm">98% · Exceeds Benchmark</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                      <div className="h-full bg-primary-container rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  {/* Metric 2 */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center font-label-regular text-label-regular">
                      <span className="text-on-surface font-title-sm">Distributed Systems</span>
                      <span className="text-primary-container font-title-sm">88% · Satisfies Target</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                      <div className="h-full bg-primary-container rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  {/* Metric 3 */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center font-label-regular text-label-regular">
                      <span className="text-on-surface font-title-sm">High-Level System Design</span>
                      <span className="text-primary-container font-title-sm">84% · Satisfies Target</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                      <div className="h-full bg-primary-container rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                  {/* Metric 4 */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center font-label-regular text-label-regular">
                      <span className="text-on-surface font-title-sm">Production SQL & Warehousing</span>
                      <span className="text-error font-title-sm">68% · Action Required</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                      <div className="h-full bg-outline rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-space-lg p-space-sm rounded-lg bg-surface-container-lowest border border-surface-variant">
                <div className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-primary-container">lightbulb</span>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-primary-container">Recommended Strategic Move</span>
                    <span className="font-body-sm text-body-sm text-secondary">
                      Complete the CHARUSAT Relational Indexing Masterlab before the IDC Technical Round 1 schedule.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restrained Hiring Trends & Skills Demand */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* 4-Year Longitudinal Hiring Volume (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-xxs">
                <span className="font-title-md text-title-md text-primary-container">Longitudinal Hiring Trends</span>
                <span className="font-label-uppercase text-label-uppercase text-secondary">CHARUSAT Placement Registry</span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mb-space-lg">
                Institutional candidate absorption rate across four consecutive academic cycles.
              </p>
              
              {/* SVG Visual Chart of Trends */}
              <div className="p-space-md bg-surface-container-low rounded-xl">
                <div className="h-44 w-full flex items-end justify-between px-space-md pt-space-md">
                  {/* 2022 */}
                  <div className="flex flex-col items-center gap-space-xs w-1/5">
                    <span className="font-title-sm text-title-sm text-primary-container">32</span>
                    <div className="w-full bg-secondary-fixed rounded-t-lg transition-all" style={{ height: '80px' }}></div>
                    <span className="font-label-regular text-label-regular text-secondary">2022</span>
                  </div>
                  {/* 2023 */}
                  <div className="flex flex-col items-center gap-space-xs w-1/5">
                    <span className="font-title-sm text-title-sm text-primary-container">38</span>
                    <div className="w-full bg-secondary-fixed rounded-t-lg transition-all" style={{ height: '100px' }}></div>
                    <span className="font-label-regular text-label-regular text-secondary">2023</span>
                  </div>
                  {/* 2024 */}
                  <div className="flex flex-col items-center gap-space-xs w-1/5">
                    <span className="font-title-sm text-title-sm text-primary-container">44</span>
                    <div className="w-full bg-secondary-fixed rounded-t-lg transition-all" style={{ height: '125px' }}></div>
                    <span className="font-label-regular text-label-regular text-secondary">2024</span>
                  </div>
                  {/* 2025 Projected */}
                  <div className="flex flex-col items-center gap-space-xs w-1/5">
                    <span className="font-title-sm text-title-sm text-primary-container">48</span>
                    <div className="w-full bg-primary-container rounded-t-lg transition-all" style={{ height: '145px' }}></div>
                    <span className="font-title-sm text-title-sm text-primary-container">2025 (P)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-space-md mt-space-lg pt-space-md text-secondary border-t border-surface-container">
              <div>
                <span className="font-label-uppercase text-label-uppercase block">CAGR (4-Yr)</span>
                <span className="font-title-md text-title-md text-primary-container mt-1 block">+14.4%</span>
              </div>
              <div>
                <span className="font-label-uppercase text-label-uppercase block">PPO Conversion</span>
                <span className="font-title-md text-title-md text-primary-container mt-1 block">78.2%</span>
              </div>
              <div>
                <span className="font-label-uppercase text-label-uppercase block">FTE Clearance</span>
                <span className="font-title-md text-title-md text-primary-container mt-1 block">96.0%</span>
              </div>
            </div>
          </div>
          
          {/* Demanded Competencies & Stack Breakdown (5 cols) */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-xxs">
                <span className="font-title-md text-title-md text-primary-container">Core Stack Demand</span>
                <span className="font-label-uppercase text-label-uppercase text-secondary">IDC Evaluation Weight</span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mb-space-lg">
                High-leverage engineering skills prioritized during direct campus interviews.
              </p>
              
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px] text-primary-container">terminal</span>
                    <span className="font-title-sm text-title-sm text-primary-container">C++ / Memory Management</span>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded bg-secondary-fixed text-on-secondary-fixed">
                    Primary Metric
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px] text-primary-container">cloud_sync</span>
                    <span className="font-title-sm text-title-sm text-primary-container">Distributed Caching & Raft</span>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded bg-secondary-fixed text-on-secondary-fixed">
                    High Priority
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px] text-primary-container">sync_alt</span>
                    <span className="font-title-sm text-title-sm text-primary-container">Concurrency & Multithreading</span>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded bg-secondary-fixed text-on-secondary-fixed">
                    High Priority
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px] text-primary-container">deployed_code</span>
                    <span className="font-title-sm text-title-sm text-primary-container">Go / Microservices Infrastructure</span>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded bg-surface-container-high text-secondary">
                    Standard Weight
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[18px] text-primary-container">cloud</span>
                    <span className="font-title-sm text-title-sm text-primary-container">Azure Platform Fundamentals</span>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded bg-surface-container-high text-secondary">
                    Desirable
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-space-md pt-space-xs flex items-center justify-between text-secondary font-label-regular text-label-regular border-t border-surface-container">
              <span>Source: IDC Technical Panel 2025 Guidelines</span>
              <span className="text-primary-container font-title-sm">Updated 12 hrs ago</span>
            </div>
          </div>
        </div>

        {/* Current Active Institutional Drives at Microsoft */}
        <div className="flex flex-col gap-space-md" id="active-drives">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                <span className="font-label-uppercase text-label-uppercase text-primary-container">Direct Campus Opportunities</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary-container tracking-tight mt-space-xxs">
                Current Active Institutional Drives
              </h3>
            </div>
            <span className="font-label-regular text-label-regular text-secondary">
              Exclusive to Department of Computer Science & Engineering (B.Tech / M.Tech)
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {/* Drive Card 1: Software Engineer FTE */}
            <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-uppercase text-label-uppercase text-secondary block">
                      Mandate Ref: MSFT-IDC-CSE-2026
                    </span>
                    <h4 className="font-title-md text-title-md text-primary-container mt-1">
                      Software Engineer — Intern + Full-Time (FTE) 2026
                    </h4>
                  </div>
                  <span className="px-space-xs py-space-xxs rounded-full bg-error-container text-on-error-container font-label-uppercase text-label-uppercase">
                    Closes in 3 Days
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-space-md my-space-md text-secondary font-label-regular text-label-regular">
                  <span className="flex items-center gap-1 font-title-sm text-title-sm text-primary-container">
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                    ₹44.0 LPA Total CTC
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                    Hyderabad / Bengaluru
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">school</span>
                    Min 8.0 CGPA
                  </span>
                </div>
                
                <p className="font-body-sm text-body-sm text-secondary">
                  Core responsibilities include kernel-level service optimization, distributed data pipelines, and hyper-scale compute coordination. All rounds conducted on-campus.
                </p>
                
                <div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-variant/50">
                  <span className="font-label-regular text-label-regular text-secondary">Candidate Eligibility Dossier:</span>
                  <span className="font-title-sm text-title-sm text-primary-container flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Verified Eligible
                  </span>
                </div>
              </div>
              
              <div className="mt-space-xl pt-space-md flex items-center justify-between border-t border-surface-container">
                <span className="font-label-regular text-label-regular text-secondary">
                  Direct submission via Institutional Token
                </span>
                <button className="inline-flex items-center gap-space-xs px-space-lg py-space-xs rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow hover:bg-primary transition-all group">
                  <span>Apply via PlaceIntel</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">send</span>
                </button>
              </div>
            </div>
            
            {/* Drive Card 2: Cloud Support & Systems Associate */}
            <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-uppercase text-label-uppercase text-secondary block">
                      Mandate Ref: MSFT-CSS-2026-A
                    </span>
                    <h4 className="font-title-md text-title-md text-primary-container mt-1">
                      Cloud Support & Systems Associate
                    </h4>
                  </div>
                  <span className="px-space-xs py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase">
                    Application Open
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-space-md my-space-md text-secondary font-label-regular text-label-regular">
                  <span className="flex items-center gap-1 font-title-sm text-title-sm text-primary-container">
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                    ₹16.0 LPA Total CTC
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                    Bengaluru Hub
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">school</span>
                    Min 7.0 CGPA
                  </span>
                </div>
                
                <p className="font-body-sm text-body-sm text-secondary">
                  Operational triage, Azure enterprise hybrid topology maintenance, and complex customer telemetry investigation. Ideal for system networking and telemetry enthusiasts.
                </p>
                
                <div className="mt-space-md p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-variant/50">
                  <span className="font-label-regular text-label-regular text-secondary">Candidate Eligibility Dossier:</span>
                  <span className="font-title-sm text-title-sm text-primary-container flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Verified Eligible
                  </span>
                </div>
              </div>
              
              <div className="mt-space-xl pt-space-md flex items-center justify-between border-t border-surface-container">
                <span className="font-label-regular text-label-regular text-secondary">
                  Review prerequisites & curriculum match
                </span>
                <button className="inline-flex items-center gap-space-xs px-space-lg py-space-xs rounded-lg bg-surface-container-low text-primary-container font-title-sm text-title-sm hover:bg-surface-container-high transition-colors group">
                  <span>View Criteria</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">visibility</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Disclaimer & Contact Footer Reference */}
        <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-[20px] text-outline">help_center</span>
            <div className="flex flex-col">
              <span className="font-title-sm text-title-sm text-primary-container">Institutional Placement Desk Notice</span>
              <span className="font-body-sm text-body-sm text-secondary">
                Microsoft IDC round shortlists will be finalized directly by the institutional liaison office. For questions regarding slotting, contact placement-cell@charusat.ac.in.
              </span>
            </div>
          </div>
          <button className="flex-shrink-0 px-space-sm py-space-xs rounded-lg bg-surface-container-lowest text-secondary font-label-regular text-label-regular hover:text-primary-container transition-colors shadow-sm">
            Download Placement Guidelines PDF
          </button>
        </div>
      </div>
    </div>
  );
}
