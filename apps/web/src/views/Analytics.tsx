import { useState, useEffect } from 'react';
import { analyticsService } from '../api/analyticsService';
import type { AnalyticsData } from '../api/types';

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const stats = await analyticsService.getDescriptiveAnalytics();
        setData(stats);
      } catch (err: any) {
        setError(err.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center flex-col gap-4">
        <span className="material-symbols-outlined text-[48px] text-error">error</span>
        <h2 className="font-headline-sm text-error">{error || 'Failed to load analytics'}</h2>
      </div>
    );
  }

  // Calculate some derived values from standard payload
  const skillsList = Object.entries(data.skillDemand || {}).sort((a, b) => b[1] - a[1]);
  const branchesList = Object.entries(data.branchDistribution || {}).sort((a, b) => b[1] - a[1]);
  const maxSkillValue = skillsList.length > 0 ? skillsList[0][1] : 1;
  const maxBranchValue = branchesList.length > 0 ? branchesList[0][1] : 1;

  return (
    <div className="flex flex-col w-full">
      {/* Sub-Header & Administrative Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-2xl pb-space-lg bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm">
        <div className="flex flex-col max-w-3xl">
          <div className="flex items-center gap-space-xs font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider mb-space-xs">
            <span>PlaceIntel Admin</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Institutional Intelligence</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary-container font-semibold">Cohort Telemetry</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Placement Analytics & Institutional Trends</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs leading-relaxed">
            Longitudinal placement statistics, departmental clearance velocity, package dispersal topology, and industry skill demand.
          </p>
        </div>
        
        {/* Administrative Action Bar */}
        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-2 rounded-lg bg-surface-container-low text-primary font-body-sm text-body-sm">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            <span className="font-medium">Live Server Sync</span>
          </div>
        </div>
      </div>

      {/* Row 1: High-Level Institutional KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-space-lg mb-space-2xl">
        {/* KPI 1 */}
        <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">Total Companies</span>
            <span className="p-1.5 rounded-lg bg-surface-container-low text-primary-container">
              <span className="material-symbols-outlined text-[20px]">domain</span>
            </span>
          </div>
          <div className="my-space-md">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-lg text-headline-lg text-primary tracking-tight">{data.totalCompanies}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">Recruiting Partners</span>
            </div>
          </div>
        </div>
        
        {/* KPI 2 */}
        <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">Total Placements</span>
            <span className="p-1.5 rounded-lg bg-secondary-fixed text-primary">
              <span className="material-symbols-outlined text-[20px]">work</span>
            </span>
          </div>
          <div className="my-space-md">
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-lg text-headline-lg text-primary tracking-tight">{data.totalPlacements}</span>
              <span className="font-title-sm text-title-sm text-on-surface-variant">Scheduled Drives</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Comprehensive 2-Column Analytical Topology */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
        
        {/* LEFT COLUMN (6 Cols) - Skill Demand */}
        <div className="lg:col-span-6 flex flex-col gap-space-xl">
          <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg">
              <div>
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">Industry Alignment</span>
                <h2 className="font-headline-sm text-headline-sm text-primary tracking-tight">Technical Competency Demand Mapping</h2>
              </div>
            </div>
            
            <div className="flex flex-col gap-space-md mt-space-md">
              {skillsList.map(([skill, count], idx) => {
                const percentage = Math.round((count / maxSkillValue) * 100);
                return (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-title-sm text-title-sm text-primary-container">{skill}</span>
                      <span className="font-title-sm text-title-sm text-primary">{count} Mentions</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden flex">
                      <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
              {skillsList.length === 0 && <div className="text-secondary p-space-lg">No skills data available.</div>}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (6 Cols) - Branch Distribution */}
        <div className="lg:col-span-6 flex flex-col gap-space-xl">
          <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm h-full flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-space-md relative z-10">
              <div className="flex flex-col">
                <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">Demographics</span>
                <h2 className="font-headline-sm text-headline-sm text-primary tracking-tight">Branch Eligibility Distribution</h2>
              </div>
            </div>
            
            <div className="flex flex-col gap-space-md mt-space-md">
              {branchesList.map(([branch, count], idx) => {
                const percentage = Math.round((count / maxBranchValue) * 100);
                return (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-title-sm text-title-sm text-primary-container">{branch}</span>
                      <span className="font-title-sm text-title-sm text-primary">{count} Drives</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden flex">
                      <div className="bg-tertiary h-full rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })}
              {branchesList.length === 0 && <div className="text-secondary p-space-lg">No branch data available.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
