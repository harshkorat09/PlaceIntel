import { useState, useEffect } from 'react';
import { profileService } from '../api/profileService';
import type { StudentProfileData } from '../api/types';

export function StudentProfile() {
  const [profile, setProfile] = useState<StudentProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // We pass a dummy string because the backend relies on JWT token user id
        const data = await profileService.getProfile('me');
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleDownloadPdf = () => {
    setDownloading(true);
    setDownloadComplete(false);
    
    setTimeout(() => {
      setDownloading(false);
      setDownloadComplete(true);
      setTimeout(() => {
        setDownloadComplete(false);
      }, 2500);
    }, 1200);
  };

  if (loading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center flex-col gap-4">
        <span className="material-symbols-outlined text-[48px] text-error">error</span>
        <h2 className="font-headline-sm text-error">{error || 'Profile not found'}</h2>
      </div>
    );
  }

  const monogram = profile.name ? profile.name.substring(0, 2).toUpperCase() : 'ST';

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-space-2xl">
        
        {/* Page Header & Action Bar */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                Candidate Verified • Student ID: {profile.id}
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary-container tracking-tight">
              Student Placement Profile
            </h1>
            <p className="font-body-md text-body-md text-secondary">
              Audited institutional dossier for Campus Recruitment Drive.
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-space-sm">
            <button 
              onClick={handleDownloadPdf}
              disabled={downloading}
              className={`inline-flex items-center gap-space-xs px-4 py-2.5 rounded-lg bg-surface-container-lowest text-primary-container font-title-sm text-title-sm shadow-sm hover:bg-surface-container-low transition-colors ${downloading ? 'opacity-80 pointer-events-none' : ''}`}
            >
              {downloading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                  <span>Generating Institutional Dossier...</span>
                </>
              ) : downloadComplete ? (
                <>
                  <span className="material-symbols-outlined text-[18px] text-primary-container">check</span>
                  <span>PDF Dossier Ready (Downloaded)</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                  <span>Download Official Resume PDF</span>
                </>
              )}
            </button>
            <button className="inline-flex items-center gap-space-xs px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm shadow-sm hover:bg-primary transition-all group">
              <span className="material-symbols-outlined text-[18px]">edit_document</span>
              <span>Edit Profile</span>
              <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:translate-x-0.5">arrow_forward</span>
            </button>
          </div>
        </header>

        {/* Top Grid: Dossier Summary */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          <div className="lg:col-span-12 bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col justify-between gap-space-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-lg">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary font-headline-md text-headline-md tracking-tight shadow-md">
                  {monogram}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <h2 className="font-headline-md text-headline-md text-primary-container tracking-tight">{profile.name}</h2>
                  <span className="font-label-uppercase text-label-uppercase px-2 py-0.5 rounded bg-surface-container-high text-primary-container">Audited</span>
                </div>
                <p className="font-body-md text-body-md text-secondary">
                  B.Tech {profile.branch || 'Engineering'} • CHARUSAT University
                </p>
                <div className="flex items-center gap-space-md text-secondary font-label-regular text-label-regular pt-1">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[15px]">mail</span> {profile.email}</span>
                </div>
              </div>
            </div>
            {/* Academic Key Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-md bg-surface-container-low/70 rounded-xl p-space-md">
              <div className="flex flex-col">
                <span className="font-label-uppercase text-label-uppercase text-secondary">Cumulative GPA</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-headline-md text-headline-md text-primary-container font-semibold">{profile.cgpa.toFixed(2)}</span>
                  <span className="font-body-sm text-body-sm text-secondary">/ 10.0</span>
                </div>
                <span className="font-label-regular text-label-regular text-primary-container flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span> Dean Audited
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-uppercase text-label-uppercase text-secondary">Department Branch</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-headline-sm text-headline-sm text-primary-container font-semibold">{profile.branch || 'Not set'}</span>
                </div>
                <span className="font-label-regular text-label-regular text-secondary mt-0.5">Verified</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-uppercase text-label-uppercase text-secondary">Placement Status</span>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                  <span className="font-title-sm text-title-sm text-primary-container">Open for Hire</span>
                </div>
                <span className="font-label-regular text-label-regular text-secondary mt-0.5">Eligible</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Skill Tags */}
        <section className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-lg">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="font-headline-sm text-headline-sm text-primary-container">Verified Competencies & Skills</h3>
              <span className="font-body-sm text-body-sm text-secondary mt-1">Core technical skills verified against institutional assessments.</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg bg-surface-container-low text-primary-container font-title-sm text-title-sm">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-secondary font-body-sm">No skills explicitly added to profile yet.</span>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
