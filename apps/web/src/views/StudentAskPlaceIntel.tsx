import { useState, useRef } from 'react';

export function StudentAskPlaceIntel() {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placeholder, setPlaceholder] = useState('Ask anything about campus placements, packages, eligibility, or official circulars...');
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyPrompt = (text: string) => {
    setInputValue(text.trim());
    textareaRef.current?.focus();
  };

  const submitInquiry = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim().length > 0) {
      setIsSubmitting(true);
      setInputValue("Consulting 42 verified university circulars...");
      
      setTimeout(() => {
        setInputValue("");
        setIsSubmitting(false);
        setPlaceholder("Query queued for institutional validation. Type a follow-up...");
      }, 1200);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitInquiry();
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen relative">
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Top Metadata Breadcrumb & Live Sync Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-lg">
          <div className="flex items-center gap-space-xs text-secondary font-label-uppercase text-label-uppercase">
            <span>Institutional Intelligence</span>
            <span className="text-outline">/</span>
            <span className="text-primary-container font-semibold">Grounded Candidate Advisory</span>
          </div>
          <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-space-xxs rounded-full self-start md:self-auto">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-container"></span>
            <span className="font-label-regular text-label-regular text-primary-container tracking-tight">Synchronized with 42 Official Placement Circulars</span>
            <span className="text-secondary font-label-regular text-label-regular">• Updated Today, 08:30 AM</span>
          </div>
        </div>

        {/* Editorial Page Header */}
        <div className="flex flex-col gap-space-xs mb-space-2xl">
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Ask PlaceIntel</h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-3xl">
            Get verified guidance grounded in official CHARUSAT placement circulars, recruiter rubrics, and your audited academic dossier.
          </p>
        </div>

        {/* Prompt Inspiration Cards Grid */}
        <div className="mb-space-2xl">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest">Audited Inquiries for Aarav Mehta (21IT084)</span>
            <span className="font-label-regular text-label-regular text-outline hidden sm:inline">Click to populate prompt context</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Inspiration 1 */}
            <button 
              type="button"
              className="group text-left p-space-lg rounded-xl bg-surface-container-lowest hover:bg-surface-container transition-colors shadow-sm flex flex-col justify-between min-h-[148px]" 
              onClick={() => applyPrompt("Which companies visiting campus offer >₹12 LPA for Computer Engineering and allow a single backlog?")}
            >
              <div className="flex items-start justify-between gap-space-xs w-full mb-space-sm">
                <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed">Eligibility & Backlogs</span>
                <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary-container transition-colors">north_east</span>
              </div>
              <p className="font-title-sm text-title-sm text-primary line-clamp-3">Which companies visiting campus offer &gt;₹12 LPA for Computer Engineering and allow a single backlog?</p>
            </button>
            {/* Inspiration 2 */}
            <button 
              type="button"
              className="group text-left p-space-lg rounded-xl bg-surface-container-lowest hover:bg-surface-container transition-colors shadow-sm flex flex-col justify-between min-h-[148px]" 
              onClick={() => applyPrompt("Why am I an 94% FIT for Microsoft IDC and what is my biggest technical gap?")}
            >
              <div className="flex items-start justify-between gap-space-xs w-full mb-space-sm">
                <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed">Match Analysis</span>
                <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary-container transition-colors">north_east</span>
              </div>
              <p className="font-title-sm text-title-sm text-primary line-clamp-3">Why am I an 94% FIT for Microsoft IDC and what is my biggest technical gap?</p>
            </button>
            {/* Inspiration 3 */}
            <button 
              type="button"
              className="group text-left p-space-lg rounded-xl bg-surface-container-lowest hover:bg-surface-container transition-colors shadow-sm flex flex-col justify-between min-h-[148px]" 
              onClick={() => applyPrompt("What are the exact evaluation rounds and service agreement clauses for TCS Digital?")}
            >
              <div className="flex items-start justify-between gap-space-xs w-full mb-space-sm">
                <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed">Recruiter Policy</span>
                <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary-container transition-colors">north_east</span>
              </div>
              <p className="font-title-sm text-title-sm text-primary line-clamp-3">What are the exact evaluation rounds and service agreement clauses for TCS Digital?</p>
            </button>
            {/* Inspiration 4 */}
            <button 
              type="button"
              className="group text-left p-space-lg rounded-xl bg-surface-container-lowest hover:bg-surface-container transition-colors shadow-sm flex flex-col justify-between min-h-[148px]" 
              onClick={() => applyPrompt("How competitive is my 8.92 CGPA against the 2024 placement intake data?")}
            >
              <div className="flex items-start justify-between gap-space-xs w-full mb-space-sm">
                <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed">Cohort Benchmark</span>
                <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary-container transition-colors">north_east</span>
              </div>
              <p className="font-title-sm text-title-sm text-primary line-clamp-3">How competitive is my 8.92 CGPA against the 2024 placement intake data?</p>
            </button>
          </div>
        </div>

        {/* Active Advisory Session Thread */}
        <div className="space-y-space-xl mb-space-3xl pb-24">
          {/* User Query Card */}
          <div className="flex items-start gap-space-md">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-1">
              <span className="font-title-sm text-title-sm">AM</span>
            </div>
            <div className="flex-1 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-space-xs mb-space-xs">
                <span className="font-title-sm text-title-sm text-primary">Aarav Mehta</span>
                <span className="font-label-regular text-label-regular text-secondary">Logged from Student Portal • 09:41 AM</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface">
                "Which roles fit my profile best, and what should I prepare before the Microsoft technical interview on 08 October?"
              </p>
              <div className="mt-space-md pt-space-sm flex flex-wrap items-center gap-space-sm text-secondary font-label-regular text-label-regular border-t border-surface-container">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-outline">verified_user</span>
                  Evaluated profile: B.Tech CSE (8.92 CGPA)
                </span>
                <span>•</span>
                <span>Candidate Dossier: Verified Grade Card (Sem 1-6)</span>
              </div>
            </div>
          </div>

          {/* Institutional Advisor Response Card */}
          <div className="flex items-start gap-space-md">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-1">
              <span className="material-symbols-outlined text-[20px]">account_balance</span>
            </div>
            <div className="flex-1 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm space-y-space-xl">
              {/* Institutional Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md gap-space-xs border-b border-surface-container">
                <div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title-md text-title-md text-primary-container">Institutional Placement Intelligence Dossier</span>
                    <span className="font-label-uppercase text-label-uppercase bg-secondary-fixed text-on-secondary-fixed px-space-xs py-space-xxs rounded-full">Audited</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary mt-0.5">Reference ID: TPO-INTEL-2025-084-REC • Generated for Academic Clearance</p>
                </div>
                <div className="flex items-center gap-space-xs self-start sm:self-auto">
                  <button className="px-space-sm py-space-xxs rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm transition-colors flex items-center gap-1" type="button">
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    <span className="font-label-regular text-label-regular">Export Memo</span>
                  </button>
                </div>
              </div>

              {/* Section 1: Executive Role Match Summary */}
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded bg-primary-container text-on-primary">Section 01</span>
                    <h2 className="font-title-md text-title-md text-primary">Executive Role Match Summary</h2>
                  </div>
                  <span className="font-label-regular text-label-regular text-secondary">Cohort Benchmark: Top 4.8%</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Based on your audited academic transcript (8.92 CGPA), verified repository contributions in distributed systems, and absence of active backlogs, our rubric maps you across three high-tier hiring drives:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
                  {/* Role 1 */}
                  <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-space-xs">
                        <span className="font-title-sm text-title-sm text-primary">Software Engineer</span>
                        <span className="font-label-uppercase text-label-uppercase bg-[#E8F5E9] text-[#1B5E20] px-space-xs py-space-xxs rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]"></span> 94% FIT
                        </span>
                      </div>
                      <p className="font-label-regular text-label-regular text-secondary mb-space-sm">Microsoft IDC • Hyderabad / Bengaluru</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">CTC: ₹44.5 LPA (Base ₹18.0 LPA). Drive date: Oct 08, 2025.</p>
                    </div>
                    <div className="pt-space-xs bg-surface-container-lowest/60 p-space-xs rounded-lg">
                      <div className="flex justify-between font-label-regular text-label-regular text-secondary mb-1">
                        <span>Rubric Confidence</span>
                        <span className="font-semibold text-primary">High</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                  </div>
                  {/* Role 2 */}
                  <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-space-xs">
                        <span className="font-title-sm text-title-sm text-primary">Cloud Automation Engineer</span>
                        <span className="font-label-uppercase text-label-uppercase bg-[#E8F5E9] text-[#1B5E20] px-space-xs py-space-xxs rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]"></span> 92% FIT
                        </span>
                      </div>
                      <p className="font-label-regular text-label-regular text-secondary mb-space-sm">Crest Data Systems • Ahmedabad</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">CTC: ₹14.0 LPA. Drive date: Oct 14, 2025.</p>
                    </div>
                    <div className="pt-space-xs bg-surface-container-lowest/60 p-space-xs rounded-lg">
                      <div className="flex justify-between font-label-regular text-label-regular text-secondary mb-1">
                        <span>Rubric Confidence</span>
                        <span className="font-semibold text-primary">Verified</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                  {/* Role 3 */}
                  <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-space-xs">
                        <span className="font-title-sm text-title-sm text-primary">Full Stack Specialist</span>
                        <span className="font-label-uppercase text-label-uppercase bg-secondary-fixed text-on-secondary-fixed px-space-xs py-space-xxs rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 90% FIT
                        </span>
                      </div>
                      <p className="font-label-regular text-label-regular text-secondary mb-space-sm">Bacancy Technology • Vadodara</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">CTC: ₹9.5 LPA. Drive date: Oct 20, 2025.</p>
                    </div>
                    <div className="pt-space-xs bg-surface-container-lowest/60 p-space-xs rounded-lg">
                      <div className="flex justify-between font-label-regular text-label-regular text-secondary mb-1">
                        <span>Rubric Confidence</span>
                        <span className="font-semibold text-primary">Standard</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Microsoft Round 1 Breakdown */}
              <div className="space-y-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded bg-primary-container text-on-primary">Section 02</span>
                  <h2 className="font-title-md text-title-md text-primary">Microsoft Technical Interview (Round 1) Evaluation Matrix</h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Sourced directly from the official recruiter briefing document (Circular Reference: <span className="font-mono text-primary font-medium">TPO/2026/MSFT-01</span>), Round 1 will be conducted on Microsoft Teams via Codility screen share.
                </p>
                <div className="bg-surface-container-low rounded-xl p-space-lg space-y-space-md">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                    <div className="space-y-1">
                      <div className="font-label-uppercase text-label-uppercase text-secondary">Component A</div>
                      <div className="font-title-sm text-title-sm text-primary">Live Algorithmic Coding</div>
                      <p className="font-body-sm text-body-sm text-secondary">
                        45 minutes. Expect 2 medium-to-hard LeetCode equivalents. Primary emphasis on Graph traversals (DFS/BFS), Trie implementations, and sliding window boundaries.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="font-label-uppercase text-label-uppercase text-secondary">Component B</div>
                      <div className="font-title-sm text-title-sm text-primary">Concurrency & Thread Safety</div>
                      <p className="font-body-sm text-body-sm text-secondary">
                        15 minutes. Verification of thread synchronization, race conditions in shared state, and mutex vs semaphore mechanics in multithreaded systems.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <div className="font-label-uppercase text-label-uppercase text-secondary">Component C</div>
                      <div className="font-title-sm text-title-sm text-primary">Distributed Caching Semantics</div>
                      <p className="font-body-sm text-body-sm text-secondary">
                        15 minutes. Cache eviction policies (LRU/LFU), Cache stampede mitigations, and read-through vs write-behind caching trade-offs.
                      </p>
                    </div>
                  </div>
                  {/* Audited candidate alert box */}
                  <div className="p-space-md rounded-lg bg-surface-container-lowest flex items-start gap-space-sm border border-surface-variant">
                    <span className="material-symbols-outlined text-primary-container text-[20px] mt-0.5">info</span>
                    <div className="space-y-1">
                      <div className="font-title-sm text-title-sm text-primary">Identified Technical Gap for Candidate 21IT084</div>
                      <p className="font-body-sm text-body-sm text-secondary">
                        Your institutional coursework exhibits high performance in Data Structures (Grade: AA) and Operating Systems (Grade: AB), but your project portfolio lacks direct demonstration of distributed transaction handling (2PC / Saga). Anticipate depth queries here.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Recommended 48-Hour Preparation Checklist */}
              <div className="space-y-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded bg-primary-container text-on-primary">Section 03</span>
                  <h2 className="font-title-md text-title-md text-primary">Recommended 48-Hour Preparation Checklist</h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Execution strategy prioritized according to historical weightings published by Microsoft IDC recruiting panels.
                </p>
                <div className="space-y-space-xs">
                  {/* Checklist Item 1 */}
                  <div className="flex items-start gap-space-sm p-space-md rounded-lg bg-surface-container-low">
                    <div className="w-5 h-5 rounded border border-outline flex items-center justify-center shrink-0 mt-0.5 bg-surface-container-lowest">
                      <span className="material-symbols-outlined text-[16px] text-primary-container font-bold">check</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-space-xs">
                        <span className="font-title-sm text-title-sm text-primary">Review Raft Consensus & Leader Election States</span>
                        <span className="font-label-uppercase text-label-uppercase text-secondary">High Priority • Core Architecture</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary mt-1">
                        Revisit Section 5 of the Ongaro-Ousterhout paper. Be prepared to step through how split-brain votes are resolved during network partitions.
                      </p>
                    </div>
                  </div>
                  {/* Checklist Item 2 */}
                  <div className="flex items-start gap-space-sm p-space-md rounded-lg bg-surface-container-low">
                    <div className="w-5 h-5 rounded border border-outline flex items-center justify-center shrink-0 mt-0.5 bg-surface-container-lowest">
                      <span className="material-symbols-outlined text-[16px] text-primary-container font-bold">check</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-space-xs">
                        <span className="font-title-sm text-title-sm text-primary">Implement Deadlock Detection (Banker's Algorithm & Wait-For Graphs)</span>
                        <span className="font-label-uppercase text-label-uppercase text-secondary">High Priority • Operating Systems</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary mt-1">
                        Practice rapid handwritten cycle detection using Tarjan's or Kahn's topological sort on directed resource allocation graphs.
                      </p>
                    </div>
                  </div>
                  {/* Checklist Item 3 */}
                  <div className="flex items-start gap-space-sm p-space-md rounded-lg bg-surface-container-low">
                    <div className="w-5 h-5 rounded border border-outline flex items-center justify-center shrink-0 mt-0.5 bg-surface-container-lowest">
                      <span className="material-symbols-outlined text-[16px] text-primary-container font-bold">check</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-space-xs">
                        <span className="font-title-sm text-title-sm text-primary">Audit Memory Bounds & Pointer Arithmetic in C++</span>
                        <span className="font-label-uppercase text-label-uppercase text-secondary">Medium Priority • Systems Coding</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary mt-1">
                        Review smart pointer lifecycle semantics (<code className="text-xs bg-surface-container px-1 py-0.5 rounded font-mono">std::unique_ptr</code>, <code className="text-xs bg-surface-container px-1 py-0.5 rounded font-mono">std::shared_ptr</code>) and circular reference mitigations with weak pointers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Relevant Source Circulars */}
              <div className="space-y-space-sm pt-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-uppercase text-label-uppercase px-space-xs py-space-xxs rounded bg-primary-container text-on-primary">Section 04</span>
                  <h2 className="font-title-md text-title-md text-primary">Official Source Documents</h2>
                </div>
                <p className="font-body-sm text-body-sm text-secondary">
                  Every point in this advisory memo is directly tied to an audited institutional document filed with the University Registrar:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xxs">
                  <div className="p-space-md rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-variant">
                    <div className="flex items-center gap-space-sm min-w-0">
                      <div className="w-8 h-8 rounded bg-surface-container-lowest flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px] text-primary-container">description</span>
                      </div>
                      <div className="truncate">
                        <div className="font-title-sm text-title-sm text-primary truncate">TPO/2026/MSFT-01</div>
                        <div className="font-label-regular text-label-regular text-secondary">Official Microsoft Campus Drive Notification</div>
                      </div>
                    </div>
                    <button type="button" className="shrink-0 p-space-xs rounded hover:bg-surface-container-high text-secondary transition-colors" title="Download Document">
                      <span className="material-symbols-outlined text-[18px]">download</span>
                    </button>
                  </div>
                  <div className="p-space-md rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-variant">
                    <div className="flex items-center gap-space-sm min-w-0">
                      <div className="w-8 h-8 rounded bg-surface-container-lowest flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px] text-primary-container">article</span>
                      </div>
                      <div className="truncate">
                        <div className="font-title-sm text-title-sm text-primary truncate">CE Dept Rubric 2025</div>
                        <div className="font-label-regular text-label-regular text-secondary">Internal Technical Vetting Norms & Backlog Rules</div>
                      </div>
                    </div>
                    <button type="button" className="shrink-0 p-space-xs rounded hover:bg-surface-container-high text-secondary transition-colors" title="Download Document">
                      <span className="material-symbols-outlined text-[18px]">download</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Advisor Metadata Footer */}
              <div className="pt-space-md flex flex-wrap items-center justify-between gap-space-md font-label-regular text-label-regular text-secondary border-t border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="flex items-center gap-1 text-primary-container font-semibold">
                    <span className="material-symbols-outlined text-[16px]">verified</span> Institutional Integrity Guarantee
                  </span>
                  <span>•</span>
                  <span>Model: PlaceIntel Gov-Audit-V2</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <button type="button" className="hover:text-primary transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">thumb_up</span> Helpful
                  </button>
                  <span>•</span>
                  <button type="button" className="hover:text-primary transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">flag</span> Report Discrepancy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Query Composer Fixed Bottom Area */}
      <div className="fixed bottom-0 left-0 lg:left-72 right-0 z-30 p-space-md lg:p-space-xl bg-gradient-to-t from-background via-background to-transparent pointer-events-none flex justify-center">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_-4px_24px_rgba(0,0,0,0.06)] border border-surface-variant transition-all pointer-events-auto w-full">
          {/* Input Form */}
          <form className="flex flex-col gap-space-xs" onSubmit={submitInquiry}>
            <div className="relative flex items-center">
              <textarea 
                ref={textareaRef}
                className="w-full p-space-sm pl-space-md pr-32 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-all resize-none border border-transparent focus:border-outline-variant" 
                placeholder={placeholder} 
                rows={2}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSubmitting}
              ></textarea>
              <div className="absolute right-space-sm bottom-space-sm flex items-center gap-space-xs">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:bg-primary transition-all flex items-center gap-space-xxs shadow-sm disabled:opacity-50"
                >
                  <span>Inquire</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
            {/* Shortcuts & Status */}
            <div className="flex flex-wrap items-center justify-between px-space-xs font-label-regular text-label-regular text-secondary pt-1">
              <div className="flex items-center gap-space-md">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-surface-container-low rounded text-[10px] font-mono text-on-surface border border-outline-variant">Enter</kbd> to submit query
                </span>
                <span className="hidden sm:inline-flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-surface-container-low rounded text-[10px] font-mono text-on-surface border border-outline-variant">Shift + Enter</kbd> for new line
                </span>
              </div>
              <div className="flex items-center gap-space-xs text-outline">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>Official Institutional Record Mode Active</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
