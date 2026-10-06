import type { FC } from 'react';
import { Link } from 'react-router-dom';


export const StudentJobDetails: FC<{ studentId: string }> = ({ studentId }) => {



  // studentId can be used for fetching job details
  return (
    <div className="flex flex-col w-full" data-student-id={studentId}>
      {/* Content Canvas Container */}
      <div className="w-full max-w-[1440px] mx-auto px-space-md md:px-margin-desktop py-space-lg flex flex-col gap-space-xl">
        
        {/* Top Meta Breadcrumb & Institutional Timestamp */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-xs">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-regular text-label-regular">
            <Link to="/placements" className="hover:text-primary-container transition-colors">Opportunities</Link>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="hover:text-primary-container transition-colors">Microsoft India Development Center</span>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-primary-container font-title-sm text-title-sm">Software Engineer (Campus Drive 2026)</span>
          </div>
          <div className="flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high text-secondary font-label-uppercase text-label-uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            <span>Audit Ref: MSFT-IND-CAMPUS-2026</span>
          </div>
        </div>

        {/* Job Hero Header Card */}
        <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg md:p-space-xl flex flex-col gap-space-lg relative overflow-hidden">
          {/* Decorative Atmospheric Glow (Constrained) */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-space-lg relative z-10">
            {/* Main Job Title & Identity */}
            <div className="flex items-start gap-space-md max-w-3xl">
              <div className="w-16 h-16 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0 shadow-sm">
                <svg className="shrink-0" fill="none" height="34" viewBox="0 0 24 24" width="34">
                  <rect fill="#F25022" height="10" width="10" x="1" y="1"></rect>
                  <rect fill="#7FBA00" height="10" width="10" x="13" y="1"></rect>
                  <rect fill="#00A4EF" height="10" width="10" x="1" y="13"></rect>
                  <rect fill="#FFB900" height="10" width="10" x="13" y="13"></rect>
                </svg>
              </div>
              <div className="flex flex-col gap-space-xxs">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="font-title-sm text-title-sm text-primary-container">Microsoft IDC</span>
                  <span className="text-outline">•</span>
                  <span className="px-space-xs py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase">Tier-1 Marquee</span>
                  <span className="px-space-xs py-space-xxs rounded-full bg-error-container text-on-error-container font-label-uppercase text-label-uppercase">Closes in 3 days</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-primary-container tracking-tight">
                  Software Engineer — Intern + Full-Time (FTE) 2026
                </h1>
                <p className="font-body-md text-body-md text-secondary">
                  Core Engineering Divisions: Azure Core Cloud, Developer Division, Microsoft 365 Substrate
                </p>
              </div>
            </div>

            {/* Action Panel */}
            <div className="flex flex-wrap lg:flex-col items-center lg:items-end gap-space-sm shrink-0">

              <div className="flex items-center gap-space-xs">
                <a className="p-space-xs rounded-lg bg-surface-container-low hover:bg-surface-container-high text-secondary hover:text-primary-container transition-colors" href="#" title="Download Official Circular PDF">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                </a>
              </div>
            </div>
          </div>

          {/* Key Metadata Strips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md pt-space-md bg-surface-container-low/60 -mx-space-lg md:-mx-space-xl -mb-space-lg md:-mb-space-xl p-space-lg">
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Institutional CTC</span>
              <span className="font-headline-sm text-headline-sm text-primary-container mt-space-xxs">₹44.0 LPA</span>
              <span className="font-label-regular text-label-regular text-outline">Base ₹18.5 LPA + $30k RSUs</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Work Locations</span>
              <span className="font-title-sm text-title-sm text-primary-container mt-space-xxs">Bengaluru / Hyd / Noida</span>
              <span className="font-label-regular text-label-regular text-outline">On-Campus / Hybrid Node</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Campus Drive Date</span>
              <span className="font-title-sm text-title-sm text-primary-container mt-space-xxs">18 October 2026</span>
              <span className="font-label-regular text-label-regular text-outline">Slot 01 (Day Zero Priority)</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Placement Deadline</span>
              <span className="font-title-sm text-title-sm text-error mt-space-xxs">15 Oct 2026, 23:59 IST</span>
              <span className="font-label-regular text-label-regular text-outline">Strict institutional lock</span>
            </div>

          </div>
        </section>

        {/* Main Grid Content: 8 Columns Core + 4 Columns Right Context */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Primary Core: 8 Cols */}
          <div className="lg:col-span-8 flex flex-col gap-space-xl">
            {/* SIGNATURE SECTION: 'Should I Apply?' Fit Analysis */}
            <section className="bg-secondary-fixed/50 rounded-xl p-space-lg md:p-space-xl flex flex-col gap-space-lg shadow-sm relative overflow-hidden">
              {/* Top Verdict Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md">
                  <div className="w-16 h-16 rounded-xl bg-primary-container text-on-primary flex flex-col items-center justify-center shrink-0 shadow-md">
                    <span className="font-headline-md text-headline-md leading-none">94</span>
                    <span className="font-label-uppercase text-label-uppercase text-on-primary-container tracking-wider">FIT SCORE</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1B5E20]"></span>
                      <span className="font-label-uppercase text-label-uppercase text-[#1B5E20]">High Confidence Recommendation</span>
                    </div>
                    <h2 className="font-headline-sm text-headline-sm text-primary-container">
                      Verdict: You should decisively apply.
                    </h2>
                  </div>
                </div>
                <div className="px-space-md py-space-xs rounded-lg bg-surface-container-lowest/80 text-primary-container font-label-regular text-label-regular flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary-container">verified</span>
                  <span>Based on Sem 1-4 Audited Cohort Records</span>
                </div>
              </div>

              {/* Editorial Assessment Text */}
              <div className="p-space-md rounded-lg bg-surface-container-lowest">
                <p className="font-body-md text-body-md text-primary-container leading-relaxed">
                  Your academic score <strong className="font-semibold text-primary">8.92 CGPA</strong> comfortably clears Microsoft’s 8.00 cutoff. Your proficiency in Data Structures & Algorithms (<span className="font-semibold text-[#1B5E20]">98th percentile</span> institutional rank) and modern distributed systems matches the core engineering cohort requirements.
                </p>
              </div>

              {/* Skill Match Breakdown Grid */}
              <div className="flex flex-col gap-space-sm">
                <span className="font-label-uppercase text-label-uppercase text-secondary">Competency Vector Alignment</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
                  {/* Skill 1 */}
                  <div className="p-space-md rounded-lg bg-surface-container-lowest flex flex-col justify-between gap-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-title-sm text-title-sm text-primary-container">Algorithms & DS</span>
                      <span className="font-title-sm text-title-sm text-[#1B5E20]">98%</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-primary-container h-full rounded-full" style={{ width: '98%' }}></div>
                    </div>
                    <div className="flex items-center gap-space-xxs text-[#1B5E20] font-label-regular text-label-regular">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      <span>Exceeds Target Threshold</span>
                    </div>
                  </div>
                  {/* Skill 2 */}
                  <div className="p-space-md rounded-lg bg-surface-container-lowest flex flex-col justify-between gap-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-title-sm text-title-sm text-primary-container">System Architecture</span>
                      <span className="font-title-sm text-title-sm text-primary-container">88%</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-primary-container h-full rounded-full" style={{ width: '88%' }}></div>
                    </div>
                    <div className="flex items-center gap-space-xxs text-secondary font-label-regular text-label-regular">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      <span>Fully Satisfied</span>
                    </div>
                  </div>
                  {/* Skill 3 (Gap Identified) */}
                  <div className="p-space-md rounded-lg bg-surface-container-lowest flex flex-col justify-between gap-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-title-sm text-title-sm text-primary-container">Production SQL</span>
                      <span className="font-title-sm text-title-sm text-[#8C5800]">68%</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div className="bg-[#8C5800] h-full rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    <div className="flex items-center gap-space-xxs text-[#8C5800] font-label-regular text-label-regular">
                      <span className="material-symbols-outlined text-[14px]">info</span>
                      <span>Action: Review query plans & locks</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Eligibility Criteria & Verification Matrix */}
            <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg md:p-space-xl flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-uppercase text-label-uppercase text-secondary">Institutional Governance</span>
                  <h3 className="font-headline-sm text-headline-sm text-primary-container">Eligibility Criteria & Candidate Status</h3>
                </div>
                <span className="font-label-regular text-label-regular text-on-surface-variant">Validated via CHARUSAT Registry</span>
              </div>

              {/* Structured Table / Matrix */}
              <div className="overflow-x-auto">
                <table className="w-full text-left font-body-sm text-body-sm">
                  <thead>
                    <tr className="bg-surface-container-low text-secondary font-label-uppercase text-label-uppercase">
                      <th className="py-space-sm px-space-md rounded-l-lg">Parameter</th>
                      <th className="py-space-sm px-space-md">Required Threshold</th>
                      <th className="py-space-sm px-space-md">Aarav Mehta's Record</th>
                      <th className="py-space-sm px-space-md rounded-r-lg text-right">Audit Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high">
                    <tr>
                      <td className="py-space-md px-space-md font-title-sm text-title-sm text-primary-container">Cumulative GPA</td>
                      <td className="py-space-md px-space-md text-secondary">Minimum 8.00 / 10.00</td>
                      <td className="py-space-md px-space-md font-semibold text-primary-container">8.92 CGPA (Sem 1-4 Audited)</td>
                      <td className="py-space-md px-space-md text-right">
                        <span className="inline-flex items-center gap-1 px-space-xs py-space-xxs rounded-full bg-[#E8F5E9] text-[#1B5E20] font-label-uppercase text-label-uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]"></span>
                          Satisfied
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-space-md px-space-md font-title-sm text-title-sm text-primary-container">Active Backlogs</td>
                      <td className="py-space-md px-space-md text-secondary">0 Active Standing Allowed</td>
                      <td className="py-space-md px-space-md font-semibold text-primary-container">0 Active (Clean Academic Dossier)</td>
                      <td className="py-space-md px-space-md text-right">
                        <span className="inline-flex items-center gap-1 px-space-xs py-space-xxs rounded-full bg-[#E8F5E9] text-[#1B5E20] font-label-uppercase text-label-uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]"></span>
                          Satisfied
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-space-md px-space-md font-title-sm text-title-sm text-primary-container">Eligible Streams</td>
                      <td className="py-space-md px-space-md text-secondary">B.Tech CE, IT, CSE</td>
                      <td className="py-space-md px-space-md font-semibold text-primary-container">B.Tech Computer Engineering (CE)</td>
                      <td className="py-space-md px-space-md text-right">
                        <span className="inline-flex items-center gap-1 px-space-xs py-space-xxs rounded-full bg-[#E8F5E9] text-[#1B5E20] font-label-uppercase text-label-uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]"></span>
                          Eligible
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-space-md px-space-md font-title-sm text-title-sm text-primary-container">Internship Commitment</td>
                      <td className="py-space-md px-space-md text-secondary">Mandatory 6-Month (Jan–June 2026)</td>
                      <td className="py-space-md px-space-md font-semibold text-primary-container">NOC Pre-Approved by Dean</td>
                      <td className="py-space-md px-space-md text-right">
                        <span className="inline-flex items-center gap-1 px-space-xs py-space-xxs rounded-full bg-[#E8F5E9] text-[#1B5E20] font-label-uppercase text-label-uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E20]"></span>
                          Clearance Issued
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Hiring Process / 4-Stage Pathway */}
            <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg md:p-space-xl flex flex-col gap-space-lg">
              <div className="flex flex-col">
                <span className="font-label-uppercase text-label-uppercase text-secondary">Sequential Progression</span>
                <h3 className="font-headline-sm text-headline-sm text-primary-container">Hiring Process & Evaluation Timeline</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md relative">
                {/* Stage 1 */}
                <div className="flex flex-col p-space-md rounded-lg bg-surface-container-low relative">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary font-label-uppercase text-label-uppercase flex items-center justify-center">1</span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary">18 Oct 2026</span>
                  </div>
                  <h4 className="font-title-sm text-title-sm text-primary-container mb-space-xxs">Online Coding Round</h4>
                  <p className="font-body-sm text-body-sm text-secondary">HackerRank Platform. 3 Problems (Algorithmic / Graph theory / Array optimization). 90 mins.</p>
                </div>
                {/* Stage 2 */}
                <div className="flex flex-col p-space-md rounded-lg bg-surface-container-low relative">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary font-label-uppercase text-label-uppercase flex items-center justify-center">2</span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary">22 Oct 2026</span>
                  </div>
                  <h4 className="font-title-sm text-title-sm text-primary-container mb-space-xxs">Technical Round 1</h4>
                  <p className="font-body-sm text-body-sm text-secondary">Data Structures & Systems. Deep dive into time-space complexity and multi-threading primitives.</p>
                </div>
                {/* Stage 3 */}
                <div className="flex flex-col p-space-md rounded-lg bg-surface-container-low relative">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary font-label-uppercase text-label-uppercase flex items-center justify-center">3</span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary">23 Oct 2026</span>
                  </div>
                  <h4 className="font-title-sm text-title-sm text-primary-container mb-space-xxs">Technical Round 2</h4>
                  <p className="font-body-sm text-body-sm text-secondary">High-Level & Low-Level Design. Real-time distributed sync, caching, resilience protocols.</p>
                </div>
                {/* Stage 4 */}
                <div className="flex flex-col p-space-md rounded-lg bg-surface-container-low relative">
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary font-label-uppercase text-label-uppercase flex items-center justify-center">4</span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary">24 Oct 2026</span>
                  </div>
                  <h4 className="font-title-sm text-title-sm text-primary-container mb-space-xxs">Leadership & HR</h4>
                  <p className="font-body-sm text-body-sm text-secondary">Behavioral alignment with Microsoft Cultural Attributes: Growth Mindset, Customer Obsession.</p>
                </div>
              </div>
            </section>

            {/* Role Responsibilities & Detailed Requirements */}
            <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg md:p-space-xl flex flex-col gap-space-lg">
              <div className="flex flex-col">
                <span className="font-label-uppercase text-label-uppercase text-secondary">Engineering Charter</span>
                <h3 className="font-headline-sm text-headline-sm text-primary-container">Role Responsibilities & Technical Mandate</h3>
              </div>
              <div className="flex flex-col gap-space-md">
                <div>
                  <h4 className="font-title-sm text-title-sm text-primary-container mb-space-xxs">What You Will Build</h4>
                  <p className="font-body-md text-body-md text-secondary leading-relaxed">
                    As a Software Engineer at Microsoft IDC, you will own critical subsystems in enterprise scale solutions impacting billions of users. You will architect, implement, benchmark, and deploy resilient microservices across Azure infrastructure, modern Office platforms, or next-generation developer tooling.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
                    <span className="font-title-sm text-title-sm text-primary-container flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary-container text-[18px]">terminal</span>
                      Core Responsibilities
                    </span>
                    <ul className="list-disc list-inside font-body-sm text-body-sm text-secondary flex flex-col gap-space-xxs">
                      <li>Design clean, scalable APIs in C#, C++, Java, or Go.</li>
                      <li>Implement automated validation and telemetry monitors.</li>
                      <li>Optimize low-latency query paths on distributed storage.</li>
                      <li>Collaborate with Principal Engineers in threat modeling.</li>
                    </ul>
                  </div>
                  <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
                    <span className="font-title-sm text-title-sm text-primary-container flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary-container text-[18px]">code</span>
                      Target Competencies
                    </span>
                    <ul className="list-disc list-inside font-body-sm text-body-sm text-secondary flex flex-col gap-space-xxs">
                      <li>Solid grasp of OOP, Design Patterns, and Memory Safety.</li>
                      <li>Strong fundamentals in OS, Concurrency, and Networking.</li>
                      <li>Familiarity with Cloud Native patterns (Docker, Kubernetes).</li>
                      <li>Demonstrated passion for open-source contributions.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Institutional Summary & Historic Intelligence (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-xl">
            {/* Campus Coordinator Dossier */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Drive Coordination</span>
              <div className="flex items-center gap-space-sm">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container font-title-sm text-title-sm">
                  DR
                </div>
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm text-primary-container">Prof. D. Ramanujan</span>
                  <span className="font-body-sm text-body-sm text-secondary">Lead Faculty Coordinator, Dept of CE</span>
                  <span className="font-label-regular text-label-regular text-outline">Office: Tech-Block 3, Room 412</span>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-space-xxs">
                <span className="font-label-regular text-label-regular text-secondary">Institutional Directives:</span>
                <p className="font-body-sm text-body-sm text-primary-container">
                  "Attendance for the pre-placement talk on 17th Oct is mandatory for shortlisted candidates. Ensure your verified resumes on PlaceIntel are locked by Oct 15th."
                </p>
              </div>
            </div>
            
            {/* Historical Benchmark Analytics Card */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-label-uppercase text-label-uppercase text-secondary">Campus Historicals</span>
                <span className="px-space-xs py-space-xxs rounded bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase">2025 Audit</span>
              </div>
              
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-primary-container">14</span>
                  <span className="font-body-sm text-body-sm text-secondary">Students Selected</span>
                </div>
                <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-primary-container">₹42.5 LPA</span>
                  <span className="font-body-sm text-body-sm text-secondary">Avg Cohort CTC</span>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs pt-space-xs">
                <span className="font-label-regular text-label-regular text-secondary">Past Selection Ratio</span>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden flex">
                  <div className="bg-primary-container h-full" style={{ width: '14%' }} title="Selected (14%)"></div>
                  <div className="bg-surface-tint h-full" style={{ width: '32%' }} title="Interviews (32%)"></div>
                  <div className="bg-surface-variant h-full" style={{ width: '54%' }} title="Assessments (54%)"></div>
                </div>
                <div className="flex items-center justify-between font-label-regular text-label-regular text-outline pt-space-xxs">
                  <span>98 Assessed</span>
                  <span>31 Interviewed</span>
                  <span>14 Placed</span>
                </div>
              </div>

              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-primary-container shrink-0 mt-0.5">analytics</span>
                <p className="font-body-sm text-body-sm text-secondary">
                  Students with CGPA {'>'} 8.8 had an <strong className="text-primary-container">82% conversion rate</strong> in final technical rounds last session.
                </p>
              </div>
            </div>

            {/* Institutional Document Requirements */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Pre-Flight Checklist</span>
              <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-primary-container">
                <div className="flex items-center justify-between p-space-xs rounded bg-surface-container-low">
                  <span className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px] text-[#1B5E20]">check_circle</span>
                    Official Sem 1-4 Transcript
                  </span>
                  <span className="font-label-uppercase text-label-uppercase text-[#1B5E20]">Attached</span>
                </div>
                <div className="flex items-center justify-between p-space-xs rounded bg-surface-container-low">
                  <span className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px] text-[#1B5E20]">check_circle</span>
                    College ID Card Scan
                  </span>
                  <span className="font-label-uppercase text-label-uppercase text-[#1B5E20]">Attached</span>
                </div>
                <div className="flex items-center justify-between p-space-xs rounded bg-surface-container-low">
                  <span className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px] text-[#8C5800]">warning</span>
                    Updated GitHub Dossier
                  </span>
                  <span className="font-label-uppercase text-label-uppercase text-[#8C5800]">Sync Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
