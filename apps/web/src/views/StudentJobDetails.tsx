import { useState, useEffect, type FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { placementService } from '../api/placementService';
import type { Placement } from '../api/types';

export const StudentJobDetails: FC<{ studentId: string }> = ({ studentId }) => {
  const { id } = useParams<{ id: string }>();
  const [placement, setPlacement] = useState<Placement | null>(null);
  const [fitScoreData, setFitScoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        if (!id) return;
        
        const data = await placementService.getPlacementById(id);
        if (!data) throw new Error('Placement not found');
        setPlacement(data);
        
        const fitData = await placementService.getFitScore(id);
        setFitScoreData(fitData.data);
      } catch (err: any) {
        setError(err.message || 'Error fetching details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !placement) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center flex-col gap-4">
        <span className="material-symbols-outlined text-[48px] text-error">error</span>
        <h2 className="font-headline-sm text-error">{error || 'Placement not found'}</h2>
        <Link to="/placements" className="text-primary hover:underline">Back to Placements</Link>
      </div>
    );
  }

  const overallScore = fitScoreData?.score || 0;
  const isHighMatch = overallScore >= 80;
  const isMediumMatch = overallScore >= 50 && overallScore < 80;
  
  const scoreColor = isHighMatch ? 'text-[#1B5E20]' : isMediumMatch ? 'text-[#8C5800]' : 'text-error';

  return (
    <div className="flex flex-col w-full" data-student-id={studentId}>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-space-xl">
        
        {/* Top Meta Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-xs">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-regular text-label-regular">
            <Link to="/placements" className="hover:text-primary-container transition-colors">Opportunities</Link>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="hover:text-primary-container transition-colors">{placement.companyName}</span>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-primary-container font-title-sm text-title-sm">{placement.role}</span>
          </div>
          <div className="flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-surface-container-high text-secondary font-label-uppercase text-label-uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            <span>Audit Ref: PL-{placement.id}-2026</span>
          </div>
        </div>

        {/* Job Hero Header Card */}
        <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg md:p-space-xl flex flex-col gap-space-lg relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-space-lg relative z-10">
            <div className="flex items-start gap-space-md max-w-3xl">
              <div className="w-16 h-16 rounded-xl bg-primary-container text-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm font-headline-md">
                {placement.companyName.substring(0, 1).toUpperCase()}
              </div>
              <div className="flex flex-col gap-space-xxs">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="font-title-sm text-title-sm text-primary-container">{placement.companyName}</span>
                  <span className="text-outline">•</span>
                  <span className="px-space-xs py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase">{placement.status}</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-primary-container tracking-tight">
                  {placement.role}
                </h1>
              </div>
            </div>
          </div>

          {/* Key Metadata Strips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md pt-space-md bg-surface-container-low/60 -mx-space-lg md:-mx-space-xl -mb-space-lg md:-mb-space-xl p-space-lg">
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Institutional CTC</span>
              <span className="font-headline-sm text-headline-sm text-primary-container mt-space-xxs">{placement.packageRange}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-secondary">CGPA Cutoff</span>
              <span className="font-title-sm text-title-sm text-primary-container mt-space-xxs">{placement.cgpaRequirement.toFixed(2)}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Campus Drive Date</span>
              <span className="font-title-sm text-title-sm text-primary-container mt-space-xxs">{placement.driveDate || 'TBD'}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Placement Deadline</span>
              <span className="font-title-sm text-title-sm text-error mt-space-xxs">{placement.deadline}</span>
            </div>
          </div>
        </section>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          <div className="lg:col-span-8 flex flex-col gap-space-xl">
            
            {/* SIGNATURE SECTION: Fit Score */}
            <section className="bg-secondary-fixed/50 rounded-xl p-space-lg md:p-space-xl flex flex-col gap-space-lg shadow-sm relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md">
                  <div className="w-16 h-16 rounded-xl bg-primary-container text-on-primary flex flex-col items-center justify-center shrink-0 shadow-md">
                    <span className="font-headline-md text-headline-md leading-none">{overallScore}</span>
                    <span className="font-label-uppercase text-label-uppercase text-on-primary-container tracking-wider">FIT SCORE</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <span className={`w-2.5 h-2.5 rounded-full ${scoreColor.replace('text-', 'bg-')}`}></span>
                      <span className={`font-label-uppercase text-label-uppercase ${scoreColor}`}>
                        {isHighMatch ? 'High Confidence Recommendation' : isMediumMatch ? 'Moderate Compatibility' : 'Low Compatibility'}
                      </span>
                    </div>
                    <h2 className="font-headline-sm text-headline-sm text-primary-container">
                      Verdict: {isHighMatch ? 'You should decisively apply.' : 'Review missing criteria before applying.'}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="font-label-regular text-[11px] text-secondary opacity-80 mt-1">
                * Fit Score indicates academic and skill compatibility and is not a guarantee of selection.
              </div>
              
              {fitScoreData && (
                <div className="flex flex-col gap-space-sm mt-space-sm">
                  {fitScoreData.analysis?.map((item: string, idx: number) => {
                    const isSuccess = item.includes('satisfied') || item.includes('Meets') || item.includes('Matched') || item.includes('Contribution: 60');
                    return (
                      <div key={idx} className={`p-space-md rounded-lg flex flex-col justify-between gap-space-sm ${isSuccess ? 'bg-[#E8F5E9]' : 'bg-error-container'}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-title-sm text-title-sm text-primary-container">{item}</span>
                          <span className="material-symbols-outlined">{isSuccess ? 'check_circle' : 'cancel'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Role Responsibilities */}
            <section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg md:p-space-xl flex flex-col gap-space-lg">
              <div className="flex flex-col">
                <span className="font-label-uppercase text-label-uppercase text-secondary">Description</span>
                <h3 className="font-headline-sm text-headline-sm text-primary-container">Role Details & Requirements</h3>
              </div>
              <div className="flex flex-col gap-space-md">
                <p className="font-body-md text-body-md text-secondary leading-relaxed whitespace-pre-wrap">
                  {placement.description || 'No detailed description provided by the institutional coordinator.'}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
                    <span className="font-title-sm text-title-sm text-primary-container flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary-container text-[18px]">account_tree</span>
                      Eligible Branches
                    </span>
                    <ul className="list-disc list-inside font-body-sm text-body-sm text-secondary flex flex-col gap-space-xxs">
                      {placement.eligibleBranches.length > 0 ? (
                        placement.eligibleBranches.map((b, i) => <li key={i}>{b}</li>)
                      ) : (
                        <li>Open to all branches</li>
                      )}
                    </ul>
                  </div>
                  <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
                    <span className="font-title-sm text-title-sm text-primary-container flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary-container text-[18px]">code</span>
                      Required Skills
                    </span>
                    <ul className="list-disc list-inside font-body-sm text-body-sm text-secondary flex flex-col gap-space-xxs">
                      {placement.requiredSkills.length > 0 ? (
                        placement.requiredSkills.map((s, i) => <li key={i}>{s}</li>)
                      ) : (
                        <li>General aptitude</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-space-xl">
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
              <span className="font-label-uppercase text-label-uppercase text-secondary">Placement Notice</span>
              {placement.attachmentUrl ? (
                <a href={placement.attachmentUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-primary-container hover:bg-tertiary-container text-on-primary py-2.5 rounded-xl font-title-sm text-title-sm shadow-sm transition-all flex items-center justify-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Download Notice</span>
                </a>
              ) : (
                <div className="text-center p-space-md bg-surface-container-low rounded-xl text-secondary text-body-sm font-body-sm">
                  Placement notice not available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
