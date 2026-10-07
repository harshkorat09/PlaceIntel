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
            Institutional Recruiter
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

        {/* Placement Opportunities Section */}
        <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-surface-container flex flex-col gap-space-lg">
          <div className="flex items-center gap-space-sm border-b border-surface-container pb-space-sm">
            <span className="material-symbols-outlined text-primary-container text-[24px]">work</span>
            <h2 className="font-title-lg text-title-lg text-primary">Placement Opportunities</h2>
          </div>
          <div className="flex flex-col gap-space-md">
            {company.placements && company.placements.length > 0 ? (
              company.placements.map((placement: any) => (
                <Link to={`/placements/${placement.id}`} key={placement.id} className="bg-surface-container-low p-space-md rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md hover:bg-surface-container-high transition-colors">
                  <div>
                    <h4 className="font-title-md text-primary">{placement.position || placement.role}</h4>
                    <p className="font-body-sm text-secondary">
                      Package: {placement.minPackage || '?'} - {placement.maxPackage || '?'} LPA | CGPA Cutoff: {placement.cgpaCutoff}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="font-body-sm text-on-surface">Drive Date: {placement.driveDate || 'TBD'}</p>
                    <p className="font-label-regular text-error">Deadline: {placement.deadline}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-secondary font-body-md">No placement drives found for this company.</p>
            )}
          </div>
        </div>

        {/* Company Dossier Section */}
        <div className="bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-surface-container flex flex-col gap-space-lg">
          <div className="flex items-center gap-space-sm border-b border-surface-container pb-space-sm">
            <span className="material-symbols-outlined text-primary-container text-[24px]">corporate_fare</span>
            <h2 className="font-title-lg text-title-lg text-primary">Company Dossier</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-space-xl">
            <div className="flex-1 flex flex-col gap-space-md">
              <h3 className="font-label-uppercase text-label-uppercase text-secondary tracking-wider">About the Enterprise</h3>
              <p className="font-body-md text-body-md text-on-surface whitespace-pre-wrap leading-relaxed">
                {company.description || 'No corporate description provided for this recruiting partner.'}
              </p>
            </div>
            
            <div className="lg:w-1/3 flex flex-col gap-space-md p-space-lg bg-surface-container-low rounded-lg">
              <h3 className="font-label-uppercase text-label-uppercase text-secondary tracking-wider">Corporate Metadata</h3>
              
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">location_on</span>
                  <div className="flex flex-col">
                    <span className="font-label-regular text-label-regular text-secondary">Headquarters</span>
                    <span className="font-body-sm text-body-sm text-on-surface">{company.location || 'Not Specified'}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">group</span>
                  <div className="flex flex-col">
                    <span className="font-label-regular text-label-regular text-secondary">Global Workforce Size</span>
                    <span className="font-body-sm text-body-sm text-on-surface">{company.size || 'Not Specified'}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">event</span>
                  <div className="flex flex-col">
                    <span className="font-label-regular text-label-regular text-secondary">Founded Year</span>
                    <span className="font-body-sm text-body-sm text-on-surface">{company.foundedYear || 'Not Specified'}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">language</span>
                  <div className="flex flex-col">
                    <span className="font-label-regular text-label-regular text-secondary">Official Website</span>
                    {company.website ? (
                      <a href={company.website} target="_blank" rel="noopener noreferrer" className="font-body-sm text-body-sm text-primary hover:underline break-all">
                        {company.website}
                      </a>
                    ) : (
                      <span className="font-body-sm text-body-sm text-on-surface">Not Specified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
