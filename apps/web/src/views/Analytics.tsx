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

  // Derived calculations
  const skillsList = Object.entries(data.skillDemand || {}).sort((a, b) => b[1] - a[1]);
  const branchesList = Object.entries(data.branchDistribution || {}).sort((a, b) => b[1] - a[1]);
  const companyPartList = Object.entries(data.companyParticipation || {}).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const packageList = Object.entries(data.packageDistribution || {});
  const yearList = Object.entries(data.yearWisePlacementCounts || {}).sort((a, b) => a[0].localeCompare(b[0]));

  const maxSkillValue = skillsList.length > 0 ? skillsList[0][1] : 1;
  const maxBranchValue = branchesList.length > 0 ? branchesList[0][1] : 1;
  const maxCompanyValue = companyPartList.length > 0 ? companyPartList[0][1] : 1;
  const maxPackageValue = packageList.reduce((max, [_, val]) => Math.max(max, val), 1);
  const maxYearValue = yearList.reduce((max, [_, val]) => Math.max(max, val), 1);

  return (
    <div className="flex flex-col w-full pb-space-3xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-xl bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider mb-space-xs">
            <span>PlaceIntel</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Institutional Intelligence</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Placement Analytics & Trends</h1>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg mb-space-xl">
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-low flex flex-col justify-between">
          <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider mb-space-md">Total Companies</span>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-lg text-headline-lg text-primary">{data.totalCompanies}</span>
            <span className="material-symbols-outlined text-primary-container text-xl">domain</span>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-low flex flex-col justify-between">
          <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider mb-space-md">Total Placements</span>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-lg text-headline-lg text-primary">{data.totalPlacements}</span>
            <span className="material-symbols-outlined text-primary-container text-xl">work</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-low flex flex-col justify-between">
          <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider mb-space-md">Upcoming Drives</span>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-lg text-headline-lg text-primary">{data.upcomingDrives?.length || 0}</span>
            <span className="material-symbols-outlined text-primary-container text-xl">event_upcoming</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-low flex flex-col justify-between">
          <span className="font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider mb-space-md">Top Package Tier</span>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-lg text-headline-lg text-primary">{data.packageDistribution['20+ LPA'] || 0}</span>
            <span className="font-title-sm text-on-surface-variant">20+ LPA Roles</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl mb-space-xl">
        {/* Placements By Year */}
        <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm border border-surface-container-low">
          <h2 className="font-title-lg text-title-lg text-primary mb-space-lg">Placements By Year</h2>
          {yearList.length === 0 ? (
            <div className="text-secondary py-space-xl text-center">No placement data available.</div>
          ) : (
            <div className="flex items-end gap-space-md h-48 mt-space-lg border-b border-surface-container pb-2">
              {yearList.map(([year, count], idx) => {
                const height = Math.max(10, Math.round((count / maxYearValue) * 100));
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 gap-2 group">
                    <span className="font-label-sm text-label-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">{count}</span>
                    <div className="w-full bg-primary-container rounded-t-md transition-all group-hover:bg-primary" style={{ height: `${height}%` }}></div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">{year}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Package Range */}
        <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm border border-surface-container-low">
          <h2 className="font-title-lg text-title-lg text-primary mb-space-lg">Package Range Distribution</h2>
          <div className="flex flex-col gap-space-md">
            {packageList.map(([range, count], idx) => {
              const percentage = maxPackageValue > 0 ? Math.round((count / maxPackageValue) * 100) : 0;
              return (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body-md text-body-md text-primary-container">{range}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{count}</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-xl">
        {/* Branch Distribution */}
        <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm border border-surface-container-low lg:col-span-1">
          <h2 className="font-title-lg text-title-lg text-primary mb-space-lg">Branch Distribution</h2>
          <div className="flex flex-col gap-space-md">
            {branchesList.map(([branch, count], idx) => {
              const percentage = Math.round((count / maxBranchValue) * 100);
              return (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body-md text-body-md text-primary-container">{branch}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{count}</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
            {branchesList.length === 0 && <div className="text-secondary py-space-md text-center">No branch data available.</div>}
          </div>
        </div>

        {/* Skill Demand */}
        <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm border border-surface-container-low lg:col-span-1">
          <h2 className="font-title-lg text-title-lg text-primary mb-space-lg">Top Skill Demand</h2>
          <div className="flex flex-col gap-space-md">
            {skillsList.slice(0, 8).map(([skill, count], idx) => {
              const percentage = Math.round((count / maxSkillValue) * 100);
              return (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body-md text-body-md text-primary-container">{skill}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{count}</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#1B5E20] h-full rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
            {skillsList.length === 0 && <div className="text-secondary py-space-md text-center">No skills data available.</div>}
          </div>
        </div>

        {/* Top Company Participation */}
        <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm border border-surface-container-low lg:col-span-1">
          <h2 className="font-title-lg text-title-lg text-primary mb-space-lg">Company Participation</h2>
          <div className="flex flex-col gap-space-md">
            {companyPartList.map(([company, count], idx) => {
              const percentage = Math.round((count / maxCompanyValue) * 100);
              return (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body-md text-body-md text-primary-container">{company}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{count} drives</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                    <div className="bg-primary-container h-full rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
            {companyPartList.length === 0 && <div className="text-secondary py-space-md text-center">No company data available.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
