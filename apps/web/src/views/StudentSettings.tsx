import { useState } from 'react';


export function StudentSettings() {
  const [activeTab, setActiveTab] = useState('account');
  const [isSaving, setIsSaving] = useState(false);
  const [isResyncing, setIsResyncing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2200);
    }, 900);
  };

  const handleResync = () => {
    setIsResyncing(true);
    setTimeout(() => setIsResyncing(false), 1200);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Meta & Title Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-2xl pb-space-lg border-b border-surface-container-high">
          <div className="space-y-space-xxs">
            <div className="flex items-center gap-space-xs text-secondary mb-space-xxs">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span className="font-label-uppercase text-label-uppercase tracking-wider">CHARUSAT Centralized Placement Gateway</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Settings & Preferences</h1>
            <p className="font-body-md text-body-md text-secondary max-w-2xl">
              Manage your institutional account credentials, recruitment alert feeds, algorithmic visibility, and integration nodes.
            </p>
          </div>
          {/* Quick Session Node Chip */}
          <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-xs rounded-xl self-start md:self-auto">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></div>
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-on-surface">SSO Session Active</span>
              <span className="font-body-sm text-body-sm text-secondary">Token: CHARU-SEC-9921-A</span>
            </div>
          </div>
        </div>

        {/* Main Workspace Grid: Sidebar Tabs + Content Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Sub-Navigation Sidebar (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-variant/50">
              <div className="px-space-sm py-space-xs mb-space-xs">
                <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest">Configuration Tiers</span>
              </div>
              <nav className="flex flex-col gap-space-xxs">
                <button 
                  onClick={() => setActiveTab('account')}
                  className={`w-full flex items-center justify-between px-space-sm py-space-sm rounded-xl text-left transition-all group ${activeTab === 'account' ? 'bg-primary-container text-on-primary' : 'text-on-surface hover:bg-surface-container-low'}`}
                >
                  <div className="flex items-center gap-space-sm">
                    <span className={`material-symbols-outlined text-[20px] ${activeTab === 'account' ? 'text-primary-fixed' : 'text-secondary'}`}>admin_panel_settings</span>
                    <span className="font-title-sm text-title-sm">Account & Security</span>
                  </div>
                  <span className={`material-symbols-outlined text-[18px] transition-transform ${activeTab === 'account' ? 'opacity-80 group-hover:translate-x-0.5' : 'text-outline opacity-40'}`}>chevron_right</span>
                </button>
                <button 
                  onClick={() => setActiveTab('alerts')}
                  className={`w-full flex items-center justify-between px-space-sm py-space-sm rounded-xl text-left transition-colors group ${activeTab === 'alerts' ? 'bg-primary-container text-on-primary' : 'text-on-surface hover:bg-surface-container-low'}`}
                >
                  <div className="flex items-center gap-space-sm">
                    <span className={`material-symbols-outlined text-[20px] ${activeTab === 'alerts' ? 'text-primary-fixed' : 'text-secondary'}`}>notifications_active</span>
                    <span className="font-title-sm text-title-sm">Placement Alerts</span>
                  </div>
                  <span className={`font-label-uppercase text-label-uppercase px-space-xs py-0.5 rounded-full ${activeTab === 'alerts' ? 'bg-surface-container-lowest/20 text-on-primary' : 'bg-secondary-fixed text-on-secondary-fixed'}`}>3 Active</span>
                </button>
                <button 
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full flex items-center justify-between px-space-sm py-space-sm rounded-xl text-left transition-colors group ${activeTab === 'privacy' ? 'bg-primary-container text-on-primary' : 'text-on-surface hover:bg-surface-container-low'}`}
                >
                  <div className="flex items-center gap-space-sm">
                    <span className={`material-symbols-outlined text-[20px] ${activeTab === 'privacy' ? 'text-primary-fixed' : 'text-secondary'}`}>visibility</span>
                    <span className="font-title-sm text-title-sm">Profile Visibility</span>
                  </div>
                  <span className={`material-symbols-outlined text-[18px] transition-transform ${activeTab === 'privacy' ? 'opacity-80 group-hover:translate-x-0.5' : 'text-outline opacity-40'}`}>chevron_right</span>
                </button>
                <button 
                  onClick={() => setActiveTab('integrations')}
                  className={`w-full flex items-center justify-between px-space-sm py-space-sm rounded-xl text-left transition-colors group ${activeTab === 'integrations' ? 'bg-primary-container text-on-primary' : 'text-on-surface hover:bg-surface-container-low'}`}
                >
                  <div className="flex items-center gap-space-sm">
                    <span className={`material-symbols-outlined text-[20px] ${activeTab === 'integrations' ? 'text-primary-fixed' : 'text-secondary'}`}>sync_alt</span>
                    <span className="font-title-sm text-title-sm">Calendar & Integrations</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                </button>
                <button 
                  onClick={() => setActiveTab('connected')}
                  className={`w-full flex items-center justify-between px-space-sm py-space-sm rounded-xl text-left transition-colors group ${activeTab === 'connected' ? 'bg-primary-container text-on-primary' : 'text-on-surface hover:bg-surface-container-low'}`}
                >
                  <div className="flex items-center gap-space-sm">
                    <span className={`material-symbols-outlined text-[20px] ${activeTab === 'connected' ? 'text-primary-fixed' : 'text-secondary'}`}>hub</span>
                    <span className="font-title-sm text-title-sm">Connected Accounts</span>
                  </div>
                  <span className={`material-symbols-outlined text-[18px] transition-transform ${activeTab === 'connected' ? 'opacity-80 group-hover:translate-x-0.5' : 'text-outline opacity-40'}`}>chevron_right</span>
                </button>
              </nav>
            </div>
            
            {/* Student Dossier Snapshot Card */}
            <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col gap-space-md border border-surface-variant/50">
              <div className="flex items-center gap-space-sm">
                <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm">
                  HK
                </div>
                <div className="min-w-0">
                  <h2 className="font-title-md text-title-md text-primary truncate leading-tight">Harsh Korat</h2>
                  <p className="font-body-sm text-body-sm text-secondary truncate">Dep. of Computer Engineering</p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-space-sm rounded-xl space-y-space-xxs">
                <div className="flex justify-between items-center text-body-sm">
                  <span className="text-secondary font-label-regular text-label-regular">Placement Cycle</span>
                  <span className="font-title-sm text-title-sm text-primary">Class of 2025</span>
                </div>
                <div className="flex justify-between items-center text-body-sm">
                  <span className="text-secondary font-label-regular text-label-regular">Institutional Clearance</span>
                  <span className="font-label-uppercase text-label-uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">Approved</span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs text-secondary font-body-sm">
                <span className="material-symbols-outlined text-[16px] text-outline">help_outline</span>
                <span>Managed by CHARUSAT Registrar SSO</span>
              </div>
            </div>
          </div>

          {/* Settings Content Panels (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-xl">
            {/* Section 1: Institutional Account Details */}
            {(activeTab === 'account' || activeTab === 'all') && (
              <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm border border-surface-variant/50">
                <div className="flex items-center justify-between pb-space-md mb-space-lg border-b border-surface-container-high">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">badge</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-primary">Institutional Account Details</h3>
                      <p className="font-body-sm text-body-sm text-secondary">Verified Charotar University of Science and Technology identity parameters</p>
                    </div>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed">SSO Tied</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg mb-space-lg">
                  {/* Roll Number Input */}
                  <div className="space-y-1.5">
                    <label className="block font-label-uppercase text-label-uppercase text-secondary">Student Roll Identifier</label>
                    <div className="relative flex items-center">
                      <input className="w-full h-11 px-3 bg-surface-container-low text-on-surface font-title-sm text-title-sm rounded-lg focus:outline-none cursor-not-allowed" readOnly type="text" defaultValue="21CE048"/>
                      <div className="absolute right-3 flex items-center gap-1 text-emerald-700">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        <span className="font-label-uppercase text-label-uppercase text-[10px]">VERIFIED</span>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-outline">Managed centrally; cannot be altered manually.</p>
                  </div>
                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="block font-label-uppercase text-label-uppercase text-secondary">Official Academic Email</label>
                    <div className="relative flex items-center">
                      <input className="w-full h-11 px-3 bg-surface-container-low text-on-surface font-title-sm text-title-sm rounded-lg focus:outline-none cursor-not-allowed" readOnly type="email" defaultValue="harsh.ce@charusat.edu.in"/>
                      <span className="material-symbols-outlined text-outline text-[18px] absolute right-3">lock</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-outline">Destination for official offer letters & schedules.</p>
                  </div>
                </div>
                {/* Password & MFA Tile */}
                <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                  <div className="flex items-start gap-space-sm">
                    <span className="material-symbols-outlined text-primary-container text-[24px] mt-0.5">security</span>
                    <div>
                      <div className="flex items-center gap-space-xs">
                        <span className="font-title-sm text-title-sm text-primary">Two-Factor Authentication</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Active
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary">Tied to CHARUSAT Mobile Authenticator app • Password updated 45 days ago</p>
                    </div>
                  </div>
                  <button className="px-space-md py-space-xs text-primary-container bg-surface-container-lowest hover:bg-surface-container-high rounded-lg font-title-sm text-title-sm transition-colors self-start md:self-auto shadow-sm border border-surface-variant" type="button">
                    Rotate Key
                  </button>
                </div>
              </section>
            )}

            {/* Section 2: Notification & Drive Alerts */}
            {(activeTab === 'alerts' || activeTab === 'all') && (
              <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm border border-surface-variant/50">
                <div className="flex items-center justify-between pb-space-md mb-space-lg border-b border-surface-container-high">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">notifications</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-primary">Notification & Drive Alerts</h3>
                      <p className="font-body-sm text-body-sm text-secondary">High-priority dispatch triggers for campus recruitment pipelines</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline">tune</span>
                </div>
                <div className="divide-y divide-surface-container-high space-y-space-md">
                  {/* Toggle 1 */}
                  <div className="pt-space-md first:pt-0 flex items-center justify-between gap-space-lg">
                    <div className="space-y-0.5 max-w-xl">
                      <span className="font-title-sm text-title-sm text-primary">SMS & WhatsApp Critical Broadcasts</span>
                      <p className="font-body-sm text-body-sm text-secondary">Immediate priority alerts for interview slot shortlists, GD rounds, and same-day schedule displacements.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                      <input defaultChecked className="sr-only peer" type="checkbox"/>
                      <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                    </label>
                  </div>
                  {/* Toggle 2 */}
                  <div className="pt-space-md flex items-center justify-between gap-space-lg">
                    <div className="space-y-0.5 max-w-xl">
                      <div className="flex items-center gap-space-xs">
                        <span className="font-title-sm text-title-sm text-primary">Intelligent Drive Matching Summary</span>
                        <span className="font-label-uppercase text-label-uppercase bg-secondary-fixed text-on-secondary-fixed px-1.5 py-0.5 rounded text-[10px]">&gt;85% FIT</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary">Consolidated daily morning dispatch of emerging corporate drives filtered against your tech stack and CGPA threshold.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                      <input defaultChecked className="sr-only peer" type="checkbox"/>
                      <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                    </label>
                  </div>
                  {/* Toggle 3 */}
                  <div className="pt-space-md flex items-center justify-between gap-space-lg">
                    <div className="space-y-0.5 max-w-xl">
                      <span className="font-title-sm text-title-sm text-primary">48-Hour Deadline Reminders</span>
                      <p className="font-body-sm text-body-sm text-secondary">Warning pings before recruitment application portals close or institutional registration tokens expire.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                      <input defaultChecked className="sr-only peer" type="checkbox"/>
                      <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                    </label>
                  </div>
                </div>
              </section>
            )}

            {/* Section 3: Placement Data Privacy */}
            {(activeTab === 'privacy' || activeTab === 'all') && (
              <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm border border-surface-variant/50">
                <div className="flex items-center justify-between pb-space-md mb-space-lg border-b border-surface-container-high">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">privacy_tip</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-primary">Placement Data Privacy</h3>
                      <p className="font-body-sm text-body-sm text-secondary">Control algorithmic visibility across institutional recruiters and peers</p>
                    </div>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full">Autonomous</span>
                </div>
                <div className="divide-y divide-surface-container-high space-y-space-md">
                  {/* Toggle 1: Recruiter Discovery */}
                  <div className="pt-space-md first:pt-0 flex items-center justify-between gap-space-lg">
                    <div className="space-y-0.5 max-w-xl">
                      <span className="font-title-sm text-title-sm text-primary">Early Recruiter Discovery Mode</span>
                      <p className="font-body-sm text-body-sm text-secondary">Permit accredited Tier-1 campus hiring partners to index and evaluate your dossier before formal company walk-in rounds.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                      <input defaultChecked className="sr-only peer" type="checkbox"/>
                      <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                    </label>
                  </div>
                  {/* Toggle 2: Cohort Benchmark */}
                  <div className="pt-space-md flex items-center justify-between gap-space-lg">
                    <div className="space-y-0.5 max-w-xl">
                      <span className="font-title-sm text-title-sm text-primary">Cohort Benchmark Percentiles</span>
                      <p className="font-body-sm text-body-sm text-secondary">Anonymously pool your CGPA and coding scorecards into the CHARUSAT 2025 engineering percentile distribution graph.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                      <input defaultChecked className="sr-only peer" type="checkbox"/>
                      <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                    </label>
                  </div>
                </div>
              </section>
            )}

            {/* Section 4: Calendar Integrations */}
            {(activeTab === 'integrations' || activeTab === 'connected' || activeTab === 'all') && (
              <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm border border-surface-variant/50">
                <div className="flex items-center justify-between pb-space-md mb-space-lg border-b border-surface-container-high">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-primary">Calendar Integrations</h3>
                      <p className="font-body-sm text-body-sm text-secondary">Direct bi-directional hook to corporate scheduling and interview agendas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span> Connected
                  </div>
                </div>
                <div className="border border-surface-container-high rounded-xl p-space-lg bg-surface-bright flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                  <div className="flex items-start gap-space-md">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-sm text-primary">
                      <span className="material-symbols-outlined text-[28px]">event_available</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-space-xs">
                        <h4 className="font-title-sm text-title-sm text-primary">Google Calendar / Outlook iCal Bridge</h4>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary">Target feed: <span className="text-on-surface font-medium">harsh.ce@charusat.edu.in</span></p>
                      <div className="flex items-center gap-1.5 pt-1 text-outline font-label-regular text-label-regular">
                        <span className="material-symbols-outlined text-[14px]">history</span>
                        <span>Last synchronized 12 mins ago (Zero conflicts detected)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <button 
                      onClick={handleResync}
                      className="inline-flex items-center gap-1 px-space-md py-space-xs rounded-lg font-title-sm text-title-sm text-primary bg-surface-container hover:bg-surface-container-high transition-colors" 
                      type="button"
                    >
                      <span className={`material-symbols-outlined text-[18px] ${isResyncing ? 'animate-spin' : ''}`}>autorenew</span>
                      <span>{isResyncing ? 'Syncing...' : 'Resync Now'}</span>
                    </button>
                    <button className="inline-flex items-center gap-1 px-space-md py-space-xs rounded-lg font-title-sm text-title-sm text-error hover:bg-error-container/30 transition-colors" type="button">
                      <span>Disconnect</span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Save and Cancel Sticky/Bottom Action Bar */}
            <div className="sticky bottom-4 z-20 bg-surface-container-lowest/95 backdrop-blur-md p-space-md rounded-2xl shadow-lg border border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-xs text-secondary font-body-sm">
                <span className="material-symbols-outlined text-outline text-[18px]">info</span>
                <span>Configurations persist across all enrolled institutional sessions.</span>
              </div>
              <div className="flex items-center gap-space-md w-full sm:w-auto">
                <button className="w-1/2 sm:w-auto px-space-lg py-space-xs rounded-lg font-title-sm text-title-sm text-secondary hover:text-on-surface hover:bg-surface-container-low transition-colors" type="button">
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`w-1/2 sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-space-xs rounded-lg font-title-sm text-title-sm transition-all shadow-sm group ${saveSuccess ? 'bg-emerald-800 text-on-primary' : 'bg-primary-container text-on-primary hover:bg-primary'} disabled:opacity-90 disabled:cursor-not-allowed`} 
                  type="button"
                >
                  {isSaving ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                      <span>Updating Node...</span>
                    </>
                  ) : saveSuccess ? (
                    <>
                      <span className="material-symbols-outlined text-[18px]">check</span>
                      <span>Preferences Saved</span>
                    </>
                  ) : (
                    <>
                      <span>Save Preferences</span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
