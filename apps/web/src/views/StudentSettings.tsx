import { useAuth } from '../contexts/AuthContext';

export function StudentSettings() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-full min-h-screen pb-space-3xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-2xl pb-space-lg border-b border-surface-container-high">
        <div className="space-y-space-xxs">
          <div className="flex items-center gap-space-xs text-secondary mb-space-xxs">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="font-label-uppercase text-label-uppercase tracking-wider">PlaceIntel Central</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Account & Security</h1>
          <p className="font-body-md text-body-md text-secondary max-w-2xl">
            View your institutional account credentials and authentication details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        <div className="lg:col-span-8 flex flex-col gap-space-xl">
          <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm border border-surface-variant/50">
            <div className="flex items-center justify-between pb-space-md mb-space-lg border-b border-surface-container-high">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-primary">Institutional Account Details</h3>
                  <p className="font-body-sm text-body-sm text-secondary">Verified institutional identity parameters</p>
                </div>
              </div>
              <span className="font-label-uppercase text-label-uppercase px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed">SSO Tied</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg mb-space-lg">
              <div className="space-y-1.5">
                <label className="block font-label-uppercase text-label-uppercase text-secondary">Student Roll Identifier / User ID</label>
                <div className="relative flex items-center">
                  <input className="w-full h-11 px-3 bg-surface-container-low text-on-surface font-title-sm text-title-sm rounded-lg focus:outline-none cursor-not-allowed" readOnly type="text" value={user?.userId || ''} />
                  <div className="absolute right-3 flex items-center gap-1 text-emerald-700">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block font-label-uppercase text-label-uppercase text-secondary">Official Academic Email</label>
                <div className="relative flex items-center">
                  <input className="w-full h-11 px-3 bg-surface-container-low text-on-surface font-title-sm text-title-sm rounded-lg focus:outline-none cursor-not-allowed" readOnly type="email" value={user?.email || ''} />
                  <span className="material-symbols-outlined text-outline text-[18px] absolute right-3">lock</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <div className="flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-primary-container text-[24px] mt-0.5">security</span>
                <div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title-sm text-title-sm text-primary">Authentication Method</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Validated
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary">Secured by JWT Token Authentication</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
