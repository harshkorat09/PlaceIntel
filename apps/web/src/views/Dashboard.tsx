import { useState, useEffect } from 'react';
import { analyticsService } from '../api/analyticsService';
import { placementService } from '../api/placementService';
import type { AnalyticsData, Placement } from '../api/types';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [aData, pData] = await Promise.all([
          analyticsService.getDescriptiveAnalytics(),
          placementService.getPlacements()
        ]);
        setAnalytics(aData);
        setPlacements(pData);
      } catch (err: any) {
        console.error('Failed to load dashboard data', err);
        setError("Unable to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full min-h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="flex w-full min-h-[60vh] flex-col items-center justify-center space-y-4">
        <span className="material-symbols-outlined text-4xl text-error">error</span>
        <h2 className="text-xl text-error font-semibold">{error || "Unable to load dashboard data"}</h2>
        <button onClick={() => window.location.reload()} className="px-4 py-2 mt-4 bg-surface-container rounded-lg font-medium hover:bg-surface-container-high transition-colors">
          Retry
        </button>
      </div>
    );
  }

  const isEmpty = placements.length === 0 && analytics.totalCompanies === 0;

  // Active drives are placements with deadlines in the future or no deadline
  const activeDrives = placements.filter(p => !p.deadline || new Date(p.deadline) >= new Date());

  // Upcoming deadlines (next 3)
  const upcomingDeadlines = placements
    .filter(p => p.deadline)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-col w-full gap-space-xl">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div className="flex flex-col gap-space-xxs max-w-3xl">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-uppercase text-label-uppercase tracking-wider uppercase">
            <span>PlaceIntel Admin</span>
            <span className="text-outline-variant font-semibold">/</span>
            <span className="text-primary font-semibold">Institutional Placement Console</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Placement Administration Dashboard</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Consolidated operational oversight of active campus drives, company partnerships, and institutional placement milestones for Academic Session 2025–26.
          </p>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center gap-space-sm shrink-0">
          <Link to="/placements" className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary-container text-on-primary font-title-sm text-title-sm hover:bg-primary transition-all group shadow-sm">
            <span className="material-symbols-outlined text-[19px]">add</span>
            <span>Schedule Drive</span>
            <span className="transition-transform group-hover:translate-x-1 inline-block">→</span>
          </Link>
        </div>
      </section>
      
      {isEmpty ? (
        <section className="flex flex-col items-center justify-center min-h-[40vh] bg-surface-container-lowest rounded-2xl shadow-sm p-12 text-center">
          <span className="material-symbols-outlined text-[48px] text-secondary opacity-50 mb-4">monitoring</span>
          <h2 className="font-title-lg text-title-lg text-primary-container">No placement data available yet.</h2>
          <p className="font-body-md text-secondary mt-2">Schedule your first drive to start tracking analytics.</p>
        </section>
      ) : (
        <>
      {/* Row 1: KPI Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* Active Drives */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">Active Drives</span>
              <span className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">{activeDrives.length}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[22px]">calendar_today</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-regular text-label-regular">
              <span className="w-1.5 h-1.5 rounded-full bg-on-secondary-fixed"></span>
              {placements.length} total recorded
            </span>
          </div>
        </div>
        
        {/* Registered Companies */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">Registered Companies</span>
              <span className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">{analytics.totalCompanies}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[22px]">corporate_fare</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-regular text-label-regular">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              Consistent growth
            </span>
          </div>
        </div>
        
        {/* Placement Clearance */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">Total Hires (Est)</span>
              <span className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">{analytics.totalPlacements}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-[22px]">check_circle</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full rounded-full" style={{ width: '78.4%' }}></div>
            </div>
            <span className="font-label-regular text-label-regular text-on-surface-variant shrink-0">Target 90% benchmark</span>
          </div>
        </div>
        
        {/* Apex Package */}
        <div className="bg-primary-container p-space-lg rounded-2xl flex flex-col justify-between text-on-primary shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-on-primary-container uppercase tracking-wider">Avg Apex Package</span>
              <span className="font-headline-lg text-headline-lg text-on-primary tracking-tight mt-1">₹44.0 <span className="font-title-sm text-title-sm font-normal text-on-primary-container">LPA</span></span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-tertiary-container flex items-center justify-center text-on-tertiary">
              <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-label-regular text-label-regular">
              <span className="w-1.5 h-1.5 rounded-full bg-inverse-primary"></span>
              Tier-1
            </span>
          </div>
        </div>
      </section>
      
      {/* Row 2: Two Column Split Layout (2/3 & 1/3) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Column: Active & Upcoming Placement Drives (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md gap-3">
              <div>
                <h2 className="font-title-md text-title-md text-primary">Active Placement Drives</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Real-time scheduling, registration cadences, and corporate recruitment statuses.</p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Link to="/placements" className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-regular text-label-regular hover:bg-surface-container-high transition-colors">
                  View All
                </Link>
              </div>
            </div>
            {/* Drives Table */}
            <div className="overflow-x-auto -mx-space-lg px-space-lg">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-label-uppercase text-label-uppercase uppercase tracking-wider">
                    <th className="py-3 px-4 rounded-l-lg">Company & Role</th>
                    <th className="py-3 px-4">Package</th>
                    <th className="py-3 px-4">Drive Date</th>
                    <th className="py-3 px-4">Deadline</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm">
                  {placements.length > 0 ? (
                    placements.slice(0, 5).map(p => (
                      <tr key={p.id} className="hover:bg-surface-container-low/70 transition-colors">
                        <td className="py-4 px-4 align-top">
                          <div className="flex flex-col">
                            <span className="font-title-sm text-title-sm text-primary">{p.companyName}</span>
                            <span className="text-on-surface-variant text-label-regular font-label-regular">{p.role}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 align-top font-title-sm text-title-sm text-primary whitespace-nowrap">
                          {p.packageRange}
                        </td>
                        <td className="py-4 px-4 align-top whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-primary font-medium">{p.driveDate || 'TBD'}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 align-top whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-primary font-medium">{p.deadline}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-secondary">No active drives found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Right Column: Deadlines & Quick Administration (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* Placement Activity & Deadlines Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
            <div className="flex items-center justify-between pb-space-sm">
              <h2 className="font-title-md text-title-md text-primary">Placement Activity & Deadlines</h2>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">notifications_active</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Immediate institutional deadlines requiring operational oversight.</p>
            {/* Timeline Items */}
            <div className="relative pl-6 space-y-space-md before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container">
              {upcomingDeadlines.length > 0 ? (
                upcomingDeadlines.map((p, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-surface-container-lowest flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-error"></div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="font-label-uppercase text-label-uppercase text-error uppercase">{p.deadline}</span>
                        <span className="font-label-regular text-label-regular text-on-surface-variant">Deadline</span>
                      </div>
                      <span className="font-title-sm text-title-sm text-primary mt-0.5">{p.companyName} Window Closes</span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Student verification and resume freeze required.</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-secondary font-body-sm">No upcoming deadlines.</div>
              )}
            </div>
          </div>
          
          {/* Quick Administration Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm">
            <h2 className="font-title-md text-title-md text-primary mb-1">Quick Administration</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Administrative shortcuts for rapid cohort and policy execution.</p>
            <div className="flex flex-col gap-2">
              <Link to="/placements" className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors group text-left">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-primary">Schedule New Drive</span>
                    <span className="font-label-regular text-label-regular text-on-surface-variant">Create and publish corporate placement round</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-transform group-hover:translate-x-1 text-[20px]">chevron_right</span>
              </Link>
              <Link to="/companies" className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors group text-left">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">domain_add</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-primary">Register Company</span>
                    <span className="font-label-regular text-label-regular text-on-surface-variant">Enroll an enterprise recruiter or Tier-1 partner</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-transform group-hover:translate-x-1 text-[20px]">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </>
      )}
    </div>
  );
}
