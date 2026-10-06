import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { companyService } from '../api/companyService';
import type { Company } from '../api/types';

export function StudentCompanyDetails() {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await companyService.getCompanyById(id);
          setCompany(data);
        }
      } catch (err) {
        console.error("Failed to load company details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading || !company) {
    return (
      <div className="flex w-full min-h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Sub-Header / Breadcrumb Line */}
      <div className="px-space-xl py-space-sm bg-surface-container-lowest shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-space-xs font-label-regular text-label-regular text-secondary">
          <Link to="/companies" className="hover:text-primary-container transition-colors">Institutions</Link>
          <span className="text-outline">/</span>
          <Link to="/companies" className="hover:text-primary-container transition-colors">Companies</Link>
          <span className="text-outline">/</span>
          <span className="font-title-sm text-title-sm text-primary-container">{company.name}</span>
        </div>
        <div className="flex items-center gap-space-sm hidden sm:flex">
          <span className="inline-flex items-center gap-1.5 px-space-xs py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            {company.status === 'Active' ? 'Tier-1 Institutional Recruiter' : 'Accredited Partner'}
          </span>
          <span className="font-label-regular text-label-regular text-secondary">CHARUSAT Verified Dossier</span>
        </div>
      </div>
      
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-space-xl">
        {/* Corporate Header Banner */}
        <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
            <div className="flex items-start gap-space-lg">
              {/* Institutional Brand Monogram */}
              <div className="w-20 h-20 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-md text-headline-md tracking-tight shadow-md flex-shrink-0">
                {company.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col gap-space-xxs">
                <div className="flex flex-wrap items-center gap-space-sm">
                  <h1 className="font-headline-lg text-headline-lg text-primary-container tracking-tight">
                    {company.name}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-space-xs py-space-xxs rounded-full bg-surface-container font-label-uppercase text-label-uppercase text-primary-container">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    Drive Status: {company.status}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-secondary">
                  {company.sector}
                </p>
                <div className="flex flex-wrap items-center gap-space-md mt-space-xxs text-secondary font-label-regular text-label-regular">
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
              <Link to="/placements" className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow hover:bg-primary transition-all group">
                <span>View Active Openings</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3-Column Metrics Snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-secondary">
              <span className="font-label-uppercase text-label-uppercase tracking-wider">Historical Hires</span>
              <span className="material-symbols-outlined text-outline">assignment_turned_in</span>
            </div>
            <div className="mt-space-md">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-headline-lg text-primary-container">{company.hiresDepstar + company.hiresCspit}</span>
                <span className="font-title-sm text-title-sm text-secondary">Total Hires</span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mt-space-xxs">
                Total recruits from recent academic sessions.
              </p>
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
                <span className="font-headline-lg text-headline-lg text-primary-container">{company.hiresDepstar}</span>
                <span className="font-title-sm text-title-sm text-secondary">DEPSTAR</span>
              </div>
              <div className="flex items-baseline gap-space-xs mt-1">
                <span className="font-headline-lg text-headline-lg text-primary-container">{company.hiresCspit}</span>
                <span className="font-title-sm text-title-sm text-secondary">CSPIT</span>
              </div>
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
                <span className="font-headline-lg text-headline-lg text-primary-container">₹{company.avgPackage}</span>
                <span className="font-title-sm text-title-sm text-secondary">LPA Mean</span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary mt-space-xxs">
                Base compensation baseline for undergraduate placements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
