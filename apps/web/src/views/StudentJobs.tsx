import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { placementService } from '../api/placementService';
import type { Placement } from '../api/types';

interface StudentJobsProps {
  studentId: string;
}

export function StudentJobs({ studentId }: StudentJobsProps) {
  const [drives, setDrives] = useState<Placement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [branchFilter] = useState('');
  const [skillFilter] = useState('');

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        setIsLoading(true);
        const data = await placementService.getPlacements({
          search,
          branch: branchFilter,
          skills: skillFilter
        });
        setDrives(data);
      } catch (err) {
        setError('Failed to fetch placement drives.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDrives();
  }, [studentId, search, branchFilter, skillFilter]);

  const filteredDrives = drives;

  if (isLoading) return <div style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>Loading opportunities...</div>;
  if (error) return <div style={{ padding: 'var(--space-xl)', color: 'var(--danger)', textAlign: 'center' }}>{error}</div>;

  return (
    <div className="flex flex-col w-full">
      <div className="px-space-xl py-space-xl max-w-[1440px] mx-auto w-full flex flex-col gap-space-xl">
        {/* Top Context & Header */}
        <div className="flex flex-col gap-space-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="flex flex-col gap-space-xxs max-w-2xl">
              <div className="flex items-center gap-space-xs text-primary-container">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span className="font-label-uppercase text-label-uppercase text-secondary tracking-wider">CHARUSAT Placement Division • Verified Stream</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Opportunities</h1>
              <p className="font-body-md text-body-md text-secondary">Explore verified campus placement drives matching your academic eligibility and verified credentials.</p>
            </div>
            <div className="flex items-center gap-space-sm self-start md:self-auto bg-surface-container-low px-space-md py-space-xs rounded-xl shadow-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px] text-primary-container">verified_user</span>
                <span className="font-label-uppercase text-label-uppercase text-primary-container">Audit Status</span>
              </div>
              <span className="text-secondary font-label-regular text-label-regular">•</span>
              <span className="font-body-sm text-body-sm text-secondary">Verified for 14 Active Drives</span>
            </div>
          </div>
          {/* Search & Filtering Bar */}
          <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
            <div className="relative flex items-center w-full">
              <span className="material-symbols-outlined absolute left-4 text-outline text-[20px]">search</span>
              <input 
                className="w-full h-12 pl-12 pr-28 rounded-lg bg-surface-container-low font-body-md text-body-md text-primary placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-all" 
                placeholder="Search by role, company, skill (e.g. Distributed Systems, React, Python)..." 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute right-3 hidden sm:flex items-center gap-1 bg-surface-container px-space-xs py-0.5 rounded text-secondary font-label-regular text-label-regular">
                <kbd className="font-title-sm text-label-uppercase">⌘</kbd>
                <kbd className="font-title-sm text-label-uppercase">K</kbd>
              </div>
            </div>
            {/* Filter Chips & Selectors */}
            <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
              {/* Tier Badges */}
              <div className="flex flex-wrap items-center gap-space-xs">
                <button className="px-space-sm py-1.5 rounded-full bg-primary-container text-on-primary font-label-uppercase text-label-uppercase transition-all">All Packages</button>
                <button className="px-space-sm py-1.5 rounded-full bg-surface-container hover:bg-secondary-container text-secondary font-label-uppercase text-label-uppercase transition-all">Marquee (₹20+ LPA)</button>
                <button className="px-space-sm py-1.5 rounded-full bg-surface-container hover:bg-secondary-container text-secondary font-label-uppercase text-label-uppercase transition-all">Super Dream (₹15–20 LPA)</button>
                <button className="px-space-sm py-1.5 rounded-full bg-surface-container hover:bg-secondary-container text-secondary font-label-uppercase text-label-uppercase transition-all">Dream (₹10–15 LPA)</button>
                <button className="px-space-sm py-1.5 rounded-full bg-surface-container hover:bg-secondary-container text-secondary font-label-uppercase text-label-uppercase transition-all">Prime (₹6–10 LPA)</button>
              </div>
              {/* Dropdowns */}
              <div className="flex flex-wrap items-center gap-space-xs">
                <div className="relative flex items-center bg-surface-container-low px-space-sm py-1.5 rounded-lg text-primary font-body-sm text-body-sm cursor-pointer hover:bg-surface-container transition-colors">
                  <span className="text-secondary mr-1 font-label-regular text-label-regular">Dept:</span>
                  <span className="font-title-sm text-title-sm">CE / IT</span>
                  <span className="material-symbols-outlined text-[18px] ml-1 text-secondary">expand_more</span>
                </div>
                <div className="relative flex items-center bg-surface-container-low px-space-sm py-1.5 rounded-lg text-primary font-body-sm text-body-sm cursor-pointer hover:bg-surface-container transition-colors">
                  <span className="text-secondary mr-1 font-label-regular text-label-regular">Status:</span>
                  <span className="font-title-sm text-title-sm">Active Only</span>
                  <span className="material-symbols-outlined text-[18px] ml-1 text-secondary">expand_more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        {/* Main Content Workspace (8-col cards + 4-col intelligence rail) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Opportunities Stream (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-xxs">
              <div className="flex items-center gap-space-xs">
                <span className="font-title-md text-title-md text-primary tracking-tight">Active Matched Roles</span>
                <span className="px-space-xs py-0.5 rounded-full bg-surface-container font-label-uppercase text-label-uppercase text-secondary">5 Direct Matches</span>
              </div>
              <div className="flex items-center gap-space-xs text-secondary font-label-regular text-label-regular">
                <span>Sort by:</span>
                <span className="font-title-sm text-primary cursor-pointer flex items-center">
                  Highest FIT Score <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
                </span>
              </div>
            </div>
            
            {filteredDrives.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-xl p-space-xl text-center shadow-sm">
                <span className="material-symbols-outlined text-[48px] text-outline mb-space-sm">inbox</span>
                <h2 className="font-title-lg text-title-lg text-primary-container">No active matched roles</h2>
                <p className="font-body-md text-body-md text-secondary mt-space-xxs">Check back later or adjust your filters.</p>
              </div>
            ) : (
              filteredDrives.map(drive => (
                <div key={drive.id} className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col gap-space-md">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
                    <div className="flex items-start gap-space-md">
                      <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center font-headline-sm text-headline-sm text-primary shrink-0">
                        {drive.companyName.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-wrap items-center gap-space-xs">
                          <span className="font-title-sm text-title-sm text-primary">{drive.companyName}</span>
                          <span className="px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase">Eligible</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary tracking-tight">{drive.role}</h3>
                        <div className="flex flex-wrap items-center gap-x-space-sm text-secondary font-body-sm text-body-sm pt-space-xxs">
                          <span className="font-title-sm text-title-sm text-primary">{drive.packageRange}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> Pan-India</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs border-t border-surface-container-high mt-space-xs">
                    <span className="font-label-regular text-label-regular text-secondary">Deadline: {drive.deadline}</span>
                    <div className="flex items-center gap-space-sm">
                      <Link to={`/placements/${drive.id}`} className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm hover:bg-primary transition-all flex items-center gap-space-xxs shadow-sm">
                        <span>View Details</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar Intelligence Rail (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            {/* Cohort Standing Indicator Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-label-uppercase text-label-uppercase text-secondary tracking-wider">Cohort Standing</span>
                <span className="px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-uppercase text-label-uppercase">Verified Top Tier</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-headline-lg text-headline-lg text-primary tracking-tight leading-none">Top 8%</span>
                  <p className="font-body-sm text-body-sm text-secondary pt-1">Computer Engineering Class of 2026</p>
                </div>
                {/* Minimal Cohort Sparkline SVG */}
                <div className="w-24 h-12">
                  <svg className="w-full h-full text-primary-container overflow-visible" fill="none" viewBox="0 0 100 40">
                    <path d="M0 35 Q 25 32, 50 18 T 100 5" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
                    <circle cx="100" cy="5" fill="currentColor" r="4"></circle>
                    <path d="M0 35 Q 25 32, 50 18 T 100 5 V 40 H 0 Z" fill="currentColor" fillOpacity="0.06"></path>
                  </svg>
                </div>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between text-body-sm font-body-sm">
                <span className="text-secondary">Eligible Drives</span>
                <span className="font-title-sm text-title-sm text-primary">48 / 52 Institutional</span>
              </div>
            </div>


            {/* In-Demand Skills Module */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <h4 className="font-title-sm text-title-sm text-primary">In-Demand Skills</h4>
                <span className="font-label-uppercase text-label-uppercase text-secondary">CE 2026 Batch</span>
              </div>
              <div className="flex flex-col gap-space-md">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-body-sm font-body-sm">
                    <span className="font-title-sm text-title-sm text-primary">React & TypeScript</span>
                    <span className="text-secondary font-label-regular text-label-regular">19 drives</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-primary-container h-full w-[85%] rounded-full"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-body-sm font-body-sm">
                    <span className="font-title-sm text-title-sm text-primary">Spring Boot & Java Microservices</span>
                    <span className="text-secondary font-label-regular text-label-regular">14 drives</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-primary-container h-full w-[65%] rounded-full"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-body-sm font-body-sm">
                    <span className="font-title-sm text-title-sm text-primary">Docker, Kubernetes & CI/CD</span>
                    <span className="text-secondary font-label-regular text-label-regular">11 drives</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-primary-container h-full w-[50%] rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="pt-space-xs">
                <a className="font-label-uppercase text-label-uppercase text-primary-container hover:text-primary flex items-center gap-1 transition-colors" href="#">
                  <span>View Full Skill Breakdown Matrix</span>
                  <span className="material-symbols-outlined text-[16px]">trending_flat</span>
                </a>
              </div>
            </div>

            {/* Career Office Bulletin Card */}
            <div className="bg-surface-container-low p-space-md rounded-xl flex items-start gap-space-sm shadow-sm">
              <span className="material-symbols-outlined text-[20px] text-primary-container shrink-0 mt-0.5">school</span>
              <div className="flex flex-col">
                <span className="font-title-sm text-title-sm text-primary">Notice from T&P Cell</span>
                <p className="font-body-sm text-body-sm text-secondary pt-0.5">
                  Resume updates for Round 2 drives freeze on 18 October, 23:59 IST. Ensure all hackathons and certifications are verified by your faculty advisor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
