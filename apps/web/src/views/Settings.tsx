export default function Settings() {
  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1180px] w-full mx-auto space-y-space-xl pb-space-3xl">
        <div className="flex flex-col gap-1 border-b border-surface-container-high/60 pb-space-lg">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-uppercase text-label-uppercase tracking-wider">
            <span>PlaceIntel Admin</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary-container font-semibold">System Configuration</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pt-2">
            <div className="space-y-1">
              <h1 className="font-headline-md text-headline-md text-primary tracking-tight">Admin Settings & Placement Policies</h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                Configure institutional placement rules, academic session timelines, notification broadcasts, and audit protocols.
              </p>
            </div>
            <div className="flex items-center gap-space-xs shrink-0 self-start md:self-auto">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
              <span className="font-label-regular text-label-regular text-on-surface-variant">Live Synchronized</span>
              <span className="text-surface-container-highest px-1">•</span>
              <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">REV 2026.4</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-space-lg">
          {/* Section 1 */}
          <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm border border-surface-container/80 transition-all hover:shadow-md">
            <div className="flex items-start justify-between pb-space-lg border-b border-surface-container">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[22px]">domain</span>
                </div>
                <div>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider uppercase">Governance</span>
                  <h2 className="font-title-md text-title-md text-primary">Academic Session & Institutional Parameters</h2>
                </div>
              </div>
              <span className="px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase tracking-wider uppercase">Active Cohort Scope</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl pt-space-lg">
              <div className="space-y-space-xs">
                <label className="block font-title-sm text-title-sm text-primary">Active Academic Session</label>
                <p className="font-body-sm text-body-sm text-on-surface-variant pb-1">Designates the primary cycle for drives, reports, and applicant metrics.</p>
                <div className="relative">
                  <select className="w-full h-11 px-space-md bg-surface-container-lowest border border-outline-variant/60 rounded-lg font-body-md text-body-md text-primary appearance-none focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all cursor-pointer" defaultValue="2025-26">
                    <option value="2025-26">2025–26 (Active Session)</option>
                    <option value="2024-25">2024–25 (Archived Cycle)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[20px]">expand_more</span>
                </div>
              </div>
              <div className="space-y-space-xs">
                <label className="block font-title-sm text-title-sm text-primary">Institutional Passing Cohort</label>
                <p className="font-body-sm text-body-sm text-on-surface-variant pb-1">Current batch mapped to campus placement eligibility rules.</p>
                <input className="w-full h-11 px-space-md bg-surface-container-low border border-transparent rounded-lg font-body-md text-body-md text-primary font-medium focus:outline-none cursor-not-allowed" readOnly type="text" value="Class of 2026"/>
              </div>
              <div className="space-y-space-xs">
                <label className="block font-title-sm text-title-sm text-primary">Minimum Placement CGPA Threshold</label>
                <p className="font-body-sm text-body-sm text-on-surface-variant pb-1">Default floor filter for automated portal company registrations.</p>
                <div className="relative">
                  <input className="w-full h-11 px-space-md bg-surface-container-lowest border border-outline-variant/60 rounded-lg font-body-md text-body-md text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" defaultValue="6.50 / 10.00" type="text" />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">verified</span>
                </div>
              </div>
              <div className="space-y-space-xs">
                <label className="block font-title-sm text-title-sm text-primary">Maximum Backlog Allowance</label>
                <p className="font-body-sm text-body-sm text-on-surface-variant pb-1">Strict restriction across tier 1 and tier 2 scheduled assessments.</p>
                <div className="relative">
                  <input className="w-full h-11 px-space-md bg-surface-container-lowest border border-outline-variant/60 rounded-lg font-body-md text-body-md text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" defaultValue="0 Active Backlogs (Strict Enforcement)" type="text" />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">gavel</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm border border-surface-container/80 transition-all hover:shadow-md">
            <div className="flex items-start justify-between pb-space-lg border-b border-surface-container">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[22px]">policy</span>
                </div>
                <div>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider uppercase">Arbitration</span>
                  <h2 className="font-title-md text-title-md text-primary">Placement Drive & Offer Allocation Protocols</h2>
                </div>
              </div>
              <span className="px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-uppercase text-label-uppercase tracking-wider uppercase">TPO Enforced</span>
            </div>
            <div className="divide-y divide-surface-container pt-space-xs">
              {/* Policy Row 1 */}
              <div className="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title-sm text-title-sm text-primary">Dual-Offer / Super Dream Upgrade Policy</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold">Active Policy</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Allow candidates holding Prime Tier ({"<"}₹10 LPA) to attempt up to 2 Super Dream drives ({">"}₹15 LPA) before permanent offer lock.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input defaultChecked className="sr-only peer" type="checkbox"/>
                  <div className="w-12 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                </label>
              </div>
              {/* Policy Row 2 */}
              <div className="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title-sm text-title-sm text-primary">Single Offer Lock Enforcement</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold">Mandatory</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Lock candidate applications once an offer is accepted unless Super Dream tier criteria are explicitly authorized by Dean of Career Services.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input defaultChecked className="sr-only peer" type="checkbox"/>
                  <div className="w-12 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                </label>
              </div>
              {/* Policy Row 3 */}
              <div className="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title-sm text-title-sm text-primary">Drive Hall Ticket Auto-Generation</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold">System Logic</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Automatically issue proctored assessment hall tickets with verified seat allotments 48 hours prior to company drive date.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input defaultChecked className="sr-only peer" type="checkbox"/>
                  <div className="w-12 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm border border-surface-container/80 transition-all hover:shadow-md">
            <div className="flex items-start justify-between pb-space-lg border-b border-surface-container">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[22px]">hub</span>
                </div>
                <div>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider uppercase">Infrastructure</span>
                  <h2 className="font-title-md text-title-md text-primary">System Access & Institutional Node</h2>
                </div>
              </div>
              <span className="px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase tracking-wider uppercase">Verified Hardware</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-lg">
              <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between space-y-space-md border border-surface-container">
                <div className="space-y-1">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">Connected Node</span>
                  <h3 className="font-title-sm text-title-sm text-primary">CHARUSAT TPO Central Liaison</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant pt-1">Active secure TLS bridge via institutional fiber line.</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                    </span>
                    <span className="font-label-regular text-label-regular font-medium text-emerald-800">Operational</span>
                  </div>
                  <span className="font-label-regular text-label-regular text-on-surface-variant font-mono bg-surface-container px-2 py-0.5 rounded">12ms latency</span>
                </div>
              </div>
              <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between space-y-space-md border border-surface-container">
                <div className="space-y-1">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">Admin Security Policy</span>
                  <h3 className="font-title-sm text-title-sm text-primary">Two-Factor Authentication</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant pt-1">Institutional SSO & hardware token verification enforced for rank-holders.</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-label-regular text-label-regular text-primary font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">lock</span> SSO Enforced
                  </span>
                  <button className="font-label-uppercase text-label-uppercase text-primary-container font-semibold hover:underline" type="button">Configure</button>
                </div>
              </div>
              <div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col justify-between space-y-space-md border border-surface-container">
                <div className="space-y-1">
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase">Compliance Audit</span>
                  <h3 className="font-title-sm text-title-sm text-primary">Audit Trail Logging</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant pt-1">Immutable ledger storing all CGPA changes, slot assignments, and offer records.</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-label-regular text-label-regular text-emerald-800 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span> Active (Retention: 7y)
                  </span>
                  <button className="font-label-uppercase text-label-uppercase text-primary-container font-semibold hover:underline" type="button">View Logs</button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm border border-surface-container/80 transition-all hover:shadow-md">
            <div className="flex items-start justify-between pb-space-lg border-b border-surface-container">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[22px]">forward_to_inbox</span>
                </div>
                <div>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider uppercase">Communication</span>
                  <h2 className="font-title-md text-title-md text-primary">Broadcast & Notification Gateway</h2>
                </div>
              </div>
              <span className="px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase tracking-wider uppercase">SMS & In-App Dispatch</span>
            </div>
            <div className="divide-y divide-surface-container pt-space-xs">
              {/* Notification Toggle 1 */}
              <div className="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div className="space-y-1 max-w-2xl">
                  <span className="font-title-sm text-title-sm text-primary">Automatic Drive Deadline Reminders</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Broadcast automated reminders at exactly 48 hours and 24 hours prior to application cutoff timestamps across registered student batches.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input defaultChecked className="sr-only peer" type="checkbox"/>
                  <div className="w-12 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                </label>
              </div>
              {/* Notification Toggle 2 */}
              <div className="py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                <div className="space-y-1 max-w-2xl">
                  <span className="font-title-sm text-title-sm text-primary">Corporate Partner Auto-Acknowledgment</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Automatically dispatch institutional signed confirmation receipts and candidate pool stats to HR partners upon circular release.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input defaultChecked className="sr-only peer" type="checkbox"/>
                  <div className="w-12 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                </label>
              </div>
            </div>
          </section>
        </div>

        {/* Action Bar */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md sticky bottom-6 z-30 backdrop-blur-md bg-white/95">
          <div className="flex items-center gap-space-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px] text-primary">info</span>
            <span className="font-body-sm text-body-sm">Unsaved policy changes will require secondary two-factor validation.</span>
          </div>
          <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
            <button className="px-space-lg h-11 rounded-xl text-primary font-title-sm text-title-sm hover:bg-surface-container transition-all flex items-center justify-center" type="button">
              Cancel / Discard
            </button>
            <button className="group px-space-xl h-11 rounded-xl bg-primary-container text-on-primary font-title-sm text-title-sm hover:bg-tertiary transition-all shadow-sm flex items-center justify-center gap-space-xs" type="button">
              <span>Save Changes</span>
              <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
