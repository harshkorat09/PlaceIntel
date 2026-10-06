import { useState } from 'react';

export function StudentProfile() {
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownloadPdf = () => {
    setDownloading(true);
    setDownloadComplete(false);
    
    setTimeout(() => {
      setDownloading(false);
      setDownloadComplete(true);
      setTimeout(() => {
        setDownloadComplete(false);
      }, 2500);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin lg:px-margin-desktop py-space-xl flex flex-col gap-space-2xl">
        
        {/* Page Header & Action Bar */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                Candidate Verified • Student ID: 21CE084
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-uppercase text-label-uppercase">
                Semester V
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary-container tracking-tight">
              Student Placement Profile
            </h1>
            <p className="font-body-md text-body-md text-secondary">
              Audited institutional dossier for Campus Recruitment Drive 2025–26.
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-space-sm">
            <button 
              onClick={handleDownloadPdf}
              disabled={downloading}
              className={`inline-flex items-center gap-space-xs px-4 py-2.5 rounded-lg bg-surface-container-lowest text-primary-container font-title-sm text-title-sm shadow-sm hover:bg-surface-container-low transition-colors ${downloading ? 'opacity-80 pointer-events-none' : ''}`}
            >
              {downloading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                  <span>Generating Institutional Dossier...</span>
                </>
              ) : downloadComplete ? (
                <>
                  <span className="material-symbols-outlined text-[18px] text-primary-container">check</span>
                  <span>PDF Dossier Ready (Downloaded)</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                  <span>Download Official Resume PDF</span>
                </>
              )}
            </button>
            <button className="inline-flex items-center gap-space-xs px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-sm hover:bg-primary transition-all group">
              <span className="material-symbols-outlined text-[18px]">edit_document</span>
              <span>Edit Profile</span>
              <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:translate-x-0.5">arrow_forward</span>
            </button>
          </div>
        </header>

        {/* Top Grid: Dossier Summary & Readiness Engine */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Profile Header Summary Card (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col justify-between gap-space-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-lg">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary font-headline-md text-headline-md tracking-tight shadow-md">
                  HK
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <h2 className="font-headline-md text-headline-md text-primary-container tracking-tight">Harsh Korat</h2>
                  <span className="font-label-uppercase text-label-uppercase px-2 py-0.5 rounded bg-surface-container-high text-primary-container">Audited CE</span>
                </div>
                <p className="font-body-md text-body-md text-secondary">
                  B.Tech Computer Engineering • CHARUSAT University (2022–2026)
                </p>
                <div className="flex items-center gap-space-md text-secondary font-label-regular text-label-regular pt-1">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">mail</span> harsh.ce@charusat.edu.in</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">location_on</span> Changa, Gujarat</span>
                </div>
              </div>
            </div>
            {/* Academic Key Stats Row */}
            <div className="grid grid-cols-3 gap-space-sm pt-space-md bg-surface-container-low/70 rounded-xl p-space-md">
              <div className="flex flex-col">
                <span className="font-label-uppercase text-label-uppercase text-secondary">Cumulative GPA</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-headline-md text-headline-md text-primary-container font-semibold">8.92</span>
                  <span className="font-body-sm text-body-sm text-secondary">/ 10.0</span>
                </div>
                <span className="font-label-regular text-label-regular text-primary-container flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span> Dean Audited
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-uppercase text-label-uppercase text-secondary">Cohort Percentile</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-headline-md text-headline-md text-primary-container font-semibold">Top 4%</span>
                </div>
                <span className="font-label-regular text-label-regular text-secondary mt-0.5">Dept. Rank #6 / 148</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-uppercase text-label-uppercase text-secondary">Placement Status</span>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                  <span className="font-title-sm text-title-sm text-primary-container">Open for Hire</span>
                </div>
                <span className="font-label-regular text-label-regular text-secondary mt-0.5">Zero Backlogs</span>
              </div>
            </div>
          </div>

          {/* Profile Strength & Placement Readiness Card (5 cols) */}
          <div className="lg:col-span-5 bg-tertiary-container text-on-tertiary rounded-2xl p-space-xl flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-label-uppercase text-label-uppercase text-on-tertiary-container tracking-wider">Placement Readiness Score</span>
                <span className="font-headline-sm text-headline-sm text-on-tertiary tracking-tight">Institutional Fit Index</span>
              </div>
              <span className="font-headline-md text-headline-md text-primary-fixed-dim font-bold">87%</span>
            </div>
            <div className="my-space-md">
              <div className="w-full h-2 rounded-full bg-surface-container-highest/20 overflow-hidden">
                <div className="h-full bg-primary-fixed-dim rounded-full transition-all duration-700" style={{ width: '87%' }}></div>
              </div>
              <div className="flex justify-between items-center mt-2 text-on-tertiary-container font-label-regular text-label-regular">
                <span>Dossier Quality: Exceptional</span>
                <span>Target: Tier-1 R&D</span>
              </div>
            </div>
            <div className="pt-space-sm bg-tertiary/40 rounded-xl p-space-md flex flex-col gap-space-xs">
              <span className="font-label-uppercase text-label-uppercase text-on-tertiary-container">Strongest Algorithmic Positioning</span>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="text-on-tertiary">Distributed Software Eng.</span>
                  <span className="font-title-sm text-primary-fixed-dim">94 FIT</span>
                </div>
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="text-on-tertiary">Full-Stack Systems & APIs</span>
                  <span className="font-title-sm text-primary-fixed-dim">91 FIT</span>
                </div>
                <div className="flex items-center justify-between font-body-sm text-body-sm">
                  <span className="text-on-tertiary">Cloud Infrastructure (IaC)</span>
                  <span className="font-title-sm text-primary-fixed-dim">88 FIT</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Placement Positioning Matrix (Signature PlaceIntel 4-Pillar Metric) */}
        <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
            <div>
              <span className="font-label-uppercase text-label-uppercase text-secondary">Diagnostic Matrix</span>
              <h3 className="font-headline-sm text-headline-sm text-primary-container">Placement Positioning Pillars</h3>
            </div>
            <div className="flex items-center gap-space-xs text-secondary font-label-regular text-label-regular">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              <span>Calibrated against CHARUSAT Alumni Placement Datasets (2020-2024)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Pillar 1 */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-uppercase text-label-uppercase text-secondary">01. Technical Proficiency</span>
                <span className="material-symbols-outlined text-primary-container text-[20px]">terminal</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-headline-md text-headline-md text-primary-container font-semibold">92</span>
                <span className="font-label-regular text-label-regular text-secondary">/ 100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-primary-container rounded-full" style={{ width: '92%' }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-secondary">Validated through CodeChef, HackerRank & 3 systems builds.</p>
            </div>
            {/* Pillar 2 */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-uppercase text-label-uppercase text-secondary">02. Resume Impact</span>
                <span className="material-symbols-outlined text-primary-container text-[20px]">article</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-headline-md text-headline-md text-primary-container font-semibold">88</span>
                <span className="font-label-regular text-label-regular text-secondary">/ 100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-primary-container rounded-full" style={{ width: '88%' }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-secondary">Quantified bullet points, clear metric attribution, ATS-optimized.</p>
            </div>
            {/* Pillar 3 */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-uppercase text-label-uppercase text-secondary">03. Role Alignment</span>
                <span className="material-symbols-outlined text-primary-container text-[20px]">target</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-headline-md text-headline-md text-primary-container font-semibold">94</span>
                <span className="font-label-regular text-label-regular text-secondary">/ 100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-primary-container rounded-full" style={{ width: '94%' }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-secondary">High relevance toward Core Engineering & Distributed Systems mandates.</p>
            </div>
            {/* Pillar 4 */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-uppercase text-label-uppercase text-secondary">04. Interview Preparedness</span>
                <span className="material-symbols-outlined text-primary-container text-[20px]">record_voice_over</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-headline-md text-headline-md text-primary-container font-semibold">85</span>
                <span className="font-label-regular text-label-regular text-secondary">/ 100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-primary-container rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-secondary">Passed Institutional Mock Technical Board with Grade A rating.</p>
            </div>
          </div>
        </section>

        {/* 2-Column Split: Detailed Core Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left Column: Academic & Technical Dossier (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            {/* About & Career Objective */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-primary-container">About & Career Objective</h3>
                <span className="font-label-uppercase text-label-uppercase text-secondary">Executive Focus</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                Computer Engineering undergraduate focusing on distributed systems architecture, asynchronous data pipelines, and high-concurrency backend services. Proven track record in designing low-latency caching systems, microservices in Go and Spring Boot, and robust data storage strategies. Seeking high-responsibility Software Development Engineer (SDE) roles within engineering-led organizations where algorithmic rigour and cloud infrastructure converge.
              </p>
            </div>
            
            {/* Verified Academic Credentials */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-title-md text-title-md text-primary-container">Verified Academic Credentials</h3>
                  <p className="font-label-regular text-label-regular text-secondary">Department of Computer Engineering, CSPIT - CHARUSAT</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-primary-container font-label-uppercase text-label-uppercase">
                  <span className="material-symbols-outlined text-[16px] text-primary-container">domain_verification</span>
                  Dean Clearance Complete
                </div>
              </div>
              
              {/* Academic Table */}
              <div className="overflow-x-auto rounded-xl bg-surface-container-low">
                <table className="w-full text-left font-body-sm text-body-sm">
                  <thead className="bg-surface-container font-label-uppercase text-label-uppercase text-secondary">
                    <tr>
                      <th className="py-3 px-4">Semester</th>
                      <th className="py-3 px-4">SGPA</th>
                      <th className="py-3 px-4">CGPA Equiv.</th>
                      <th className="py-3 px-4">Active Backlogs</th>
                      <th className="py-3 px-4 text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    <tr className="hover:bg-surface-container-lowest/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-primary-container">Semester I (Fall 2022)</td>
                      <td className="py-3 px-4 text-on-surface">8.70</td>
                      <td className="py-3 px-4 text-secondary">8.70</td>
                      <td className="py-3 px-4 text-secondary">0</td>
                      <td className="py-3 px-4 text-right text-primary-container font-label-uppercase">Audited</td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-primary-container">Semester II (Spring 2023)</td>
                      <td className="py-3 px-4 text-on-surface">8.95</td>
                      <td className="py-3 px-4 text-secondary">8.83</td>
                      <td className="py-3 px-4 text-secondary">0</td>
                      <td className="py-3 px-4 text-right text-primary-container font-label-uppercase">Audited</td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-primary-container">Semester III (Fall 2023)</td>
                      <td className="py-3 px-4 text-on-surface">9.05</td>
                      <td className="py-3 px-4 text-secondary">8.90</td>
                      <td className="py-3 px-4 text-secondary">0</td>
                      <td className="py-3 px-4 text-right text-primary-container font-label-uppercase">Audited</td>
                    </tr>
                    <tr className="hover:bg-surface-container-lowest/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-primary-container">Semester IV (Spring 2024)</td>
                      <td className="py-3 px-4 text-on-surface">9.00</td>
                      <td className="py-3 px-4 font-semibold text-primary-container">8.92</td>
                      <td className="py-3 px-4 text-secondary">0</td>
                      <td className="py-3 px-4 text-right text-primary-container font-label-uppercase">Audited</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between text-secondary font-label-regular text-label-regular px-1">
                <span>Overall Clearance: No disciplinary flags • 100% credit requirements satisfied through Sem IV</span>
                <span>Record Hash: SHA256#21CE084_VERIFIED</span>
              </div>
            </div>
            
            {/* Featured Technical Projects */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-primary-container">Featured Systems Projects</h3>
                <span className="font-label-uppercase text-label-uppercase text-secondary">Production Grade</span>
              </div>
              <div className="flex flex-col gap-space-md">
                {/* Project 1 */}
                <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary-container text-[20px]">layers</span>
                      <h4 className="font-title-sm text-title-sm text-primary-container">Distributed In-Memory Cache</h4>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-uppercase text-label-uppercase px-2 py-0.5 rounded bg-surface-container-high text-primary-container">Go</span>
                      <span className="font-label-uppercase text-label-uppercase px-2 py-0.5 rounded bg-surface-container-high text-primary-container">Raft Protocol</span>
                      <span className="font-label-uppercase text-label-uppercase px-2 py-0.5 rounded bg-surface-container-high text-primary-container">gRPC</span>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                    Engineered a fault-tolerant, horizontally scalable key-value storage engine using Raft consensus for leader election and state machine replication. Benchmarked with custom traffic generators achieving sub-4ms p99 read latencies under a 3-node cluster partition simulation.
                  </p>
                  <div className="flex items-center gap-space-md pt-space-xs text-primary-container font-label-regular text-label-regular">
                    <span className="flex items-center gap-1 font-semibold"><span className="material-symbols-outlined text-[15px]">code</span> github.com/harshkorat/raft-cache</span>
                    <span>•</span>
                    <span>Role: Core Architecture & Consensus Logic</span>
                  </div>
                </div>
                {/* Project 2 */}
                <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary-container text-[20px]">analytics</span>
                      <h4 className="font-title-sm text-title-sm text-primary-container">Campus Placement Analytics Engine</h4>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-uppercase text-label-uppercase px-2 py-0.5 rounded bg-surface-container-high text-primary-container">FastAPI</span>
                      <span className="font-label-uppercase text-label-uppercase px-2 py-0.5 rounded bg-surface-container-high text-primary-container">React</span>
                      <span className="font-label-uppercase text-label-uppercase px-2 py-0.5 rounded bg-surface-container-high text-primary-container">PostgreSQL</span>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                    Constructed high-throughput analytical ingestion pipeline evaluating 1,200+ historical student offer trends and predictive offer likelihood. Integrated indexed search vectors and sub-second SQL aggregation routines for the departmental Placement Cell.
                  </p>
                  <div className="flex items-center gap-space-md pt-space-xs text-primary-container font-label-regular text-label-regular">
                    <span className="flex items-center gap-1 font-semibold"><span className="material-symbols-outlined text-[15px]">code</span> github.com/harshkorat/place-analytics</span>
                    <span>•</span>
                    <span>Role: Full Stack Backend & Data Pipeline Lead</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Internship & Industry Experience */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-primary-container">Industry Experience & Internships</h3>
                <span className="font-label-uppercase text-label-uppercase text-secondary">Verified Record</span>
              </div>
              <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h4 className="font-title-sm text-title-sm text-primary-container">Software Engineering Intern</h4>
                    <p className="font-label-regular text-label-regular text-secondary">TechVanguard Solutions • Ahmedabad, Gujarat</p>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase text-secondary">May 2025 – July 2025 (8 Weeks)</span>
                </div>
                <ul className="list-disc list-inside font-body-sm text-body-sm text-secondary mt-2 space-y-1">
                  <li>Refactored legacy REST microservices to asynchronous worker pools, decreasing average batch payload processing time by 28%.</li>
                  <li>Authored comprehensive automated unit and integration suites (JUnit / PyTest), achieving 84% test coverage across financial transaction ingestion routines.</li>
                  <li>Collaborated with senior infrastructure engineers on Docker containerization and Kubernetes staging rollout manifests.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right Column: Skills, Badges & Verification Meta (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-lg">
            {/* Core Technical Competencies */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-primary-container">Core Competencies</h3>
                <span className="material-symbols-outlined text-secondary text-[20px]">construction</span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div>
                  <span className="font-label-uppercase text-label-uppercase text-secondary block mb-1.5">Languages</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">C++ (STL)</span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">Java</span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">Python</span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">TypeScript</span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">Go</span>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="font-label-uppercase text-label-uppercase text-secondary block mb-1.5">Frameworks & Runtimes</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">Spring Boot</span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">FastAPI</span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">Node.js</span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">React</span>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="font-label-uppercase text-label-uppercase text-secondary block mb-1.5">Systems & Data Infrastructure</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">PostgreSQL</span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">Redis</span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">Apache Kafka</span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">Docker</span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-primary-container font-body-sm text-body-sm">Kubernetes</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Certifications & Credentials */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-primary-container">Certifications & Badges</h3>
                <span className="material-symbols-outlined text-secondary text-[20px]">military_tech</span>
              </div>
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-primary-container text-[22px]">cloud_done</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-title-sm text-title-sm text-primary-container truncate">AWS Certified Cloud Practitioner</span>
                    <span className="font-label-regular text-label-regular text-secondary">Amazon Web Services • Valid to 2027</span>
                    <span className="font-label-uppercase text-label-uppercase text-primary-container mt-1">ID: AWS-908234-CLD</span>
                  </div>
                </div>
                <div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-primary-container text-[22px]">grade</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-title-sm text-title-sm text-primary-container truncate">5-Star Problem Solving</span>
                    <span className="font-label-regular text-label-regular text-secondary">HackerRank Technical Assessment</span>
                    <span className="font-label-uppercase text-label-uppercase text-primary-container mt-1">Gold Badge • Data Structures</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Institutional Placement Cell Sign-Off Box */}
            <div className="bg-secondary-container/40 rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs text-primary-container font-title-sm text-title-sm">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Institutional Assurance</span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                This candidate record has been verified by the CHARUSAT Career Development Cell. Academic credentials, disciplinary standing, and attendance quotients meet all institutional requirements for placement consideration.
              </p>
              <div className="pt-2 flex items-center justify-between text-secondary font-label-regular text-label-regular">
                <span>Audit Officer: Prof. D. Trivedi</span>
                <span>Ref: CDC-2025-CE84</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
