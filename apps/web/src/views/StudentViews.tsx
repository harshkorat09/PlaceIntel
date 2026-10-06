import { useState, useEffect, type FC } from 'react';
import { profileService } from '../api/profileService';
import { placementService } from '../api/placementService';
import type { StudentProfileData, Placement } from '../api/types';
import { Link } from 'react-router-dom';

interface StudentViewsProps {
  studentId: string;
}

export const StudentDashboard: FC<StudentViewsProps> = ({ studentId }) => {
  const [profile, setProfile] = useState<StudentProfileData | null>(null);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profData, placeData] = await Promise.all([
          profileService.getProfile(studentId),
          placementService.getPlacements()
        ]);
        setProfile(profData);
        setPlacements(placeData);
      } catch (err: any) {
        console.error("Failed to load dashboard data", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex w-full min-h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex w-full min-h-[60vh] flex-col items-center justify-center space-y-4">
        <span className="material-symbols-outlined text-4xl text-error">error</span>
        <h2 className="text-xl text-error font-semibold">{error || "Unable to load profile data"}</h2>
        <p className="text-secondary text-sm">Please try refreshing the page.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 mt-4 bg-surface-container rounded-lg font-medium hover:bg-surface-container-high transition-colors">
          Retry
        </button>
      </div>
    );
  }

  // Sort deadlines ascending
  const upcomingDeadlines = placements
    .filter(p => p.deadline)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3); // top 3 upcoming

  return (
    <div className="flex flex-col w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-space-xl w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="space-y-space-xxs">
            <div className="flex items-center gap-space-xs text-secondary">
              <span className="font-label-uppercase text-label-uppercase bg-secondary-fixed text-on-secondary-fixed px-space-xs py-space-xxs rounded-full">Session 2025–26</span>
              <span className="font-label-regular text-label-regular">•</span>
              <span className="font-label-regular text-label-regular text-secondary">{profile.branch || 'CE'} • Semester V</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary-container tracking-tight">Good morning, {profile.name.split(' ')[0]}.</h1>
            <p className="font-body-md text-body-md text-secondary">Placement Season 2025–26</p>
          </div>
          <div className="flex items-center gap-space-sm self-start md:self-auto">
            <div className="px-space-md py-space-xs rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-outline text-[20px]">verified</span>
              <div>
                <div className="font-label-uppercase text-label-uppercase text-secondary">Verified CGPA</div>
                <div className="font-title-sm text-title-sm text-primary-container">{profile.cgpa.toFixed(2)} / 10.0</div>
              </div>
            </div>
            <div className="px-space-md py-space-xs rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-outline text-[20px]">military_tech</span>
              <div>
                <div className="font-label-uppercase text-label-uppercase text-secondary">Cohort Rank</div>
                <div className="font-title-sm text-title-sm text-primary-container">Top 4% ({profile.branch || 'CE'} Dept)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-primary-container text-on-primary p-space-lg lg:p-space-xl shadow-md">
          <div className="absolute -right-16 -top-24 w-96 h-96 rounded-full bg-tertiary-container opacity-40 pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center">
            <div className="lg:col-span-8 space-y-space-md">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="font-label-uppercase text-label-uppercase bg-secondary-container text-on-secondary-container px-space-xs py-space-xxs rounded-full">System Check</span>
              </div>
              <div>
                <p className="font-label-uppercase text-label-uppercase text-on-primary-container tracking-wider">Next Strategic Milestone</p>
                <h2 className="font-headline-md text-headline-md text-surface-container-lowest mt-space-xxs">Keep your profile updated</h2>
                <p className="font-body-md text-body-md text-on-primary-container mt-space-xs max-w-2xl">
                  Opportunities will appear here once the placement session begins.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 bg-tertiary-container/80 rounded-xl p-space-lg space-y-space-md">
              <div className="flex items-center justify-between">
                <span className="font-label-uppercase text-label-uppercase text-on-primary-container">Profile Readiness</span>
                <span className="font-title-sm text-title-sm text-secondary-fixed">87% Active</span>
              </div>
              <div className="w-full bg-primary h-2 rounded-full overflow-hidden">
                <div className="bg-secondary-fixed h-full rounded-full" style={{ width: '87%' }}></div>
              </div>
              <p className="font-body-sm text-body-sm text-on-primary-container">Strong technical profile • 1 pending document for institutional verification.</p>
              <div className="pt-space-xs flex items-center justify-between">
                <div>
                  <div className="font-label-uppercase text-label-uppercase text-on-primary-container">Primary Target Role</div>
                  <div className="font-title-sm text-title-sm text-surface-container-lowest">Software Engineer</div>
                </div>
                <div className="text-right">
                  <div className="font-label-uppercase text-label-uppercase text-on-primary-container">Target FIT Score</div>
                  <div className="font-headline-sm text-headline-sm text-secondary-fixed">94<span className="text-label-regular text-on-primary-container">/100</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          <div className="lg:col-span-8 space-y-space-xl">
            <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm">
              <div className="flex items-center justify-between mb-space-md">
                <h2 className="font-title-lg text-title-lg text-primary-container">Recent Opportunities</h2>
                <Link to="/placements" className="text-primary hover:underline text-title-sm">View All</Link>
              </div>
              {placements.length > 0 ? (
                <div className="flex flex-col gap-space-md">
                  {placements.slice(0, 3).map(p => (
                    <Link key={p.id} to={`/placements/${p.id}`} className="block p-space-md bg-surface-container-low hover:bg-surface-container-high rounded-xl transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-title-md text-primary">{p.companyName}</div>
                          <div className="font-body-sm text-secondary">{p.role}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-title-sm text-primary">{p.packageRange}</div>
                          <div className="font-label-regular text-on-surface-variant">Deadline: {p.deadline}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-space-xl text-secondary">
                  <span className="material-symbols-outlined text-[48px] text-outline mb-space-sm">inbox</span>
                  <h2 className="font-title-lg text-title-lg text-primary-container">No active placement tasks</h2>
                  <p className="font-body-md text-body-md text-secondary mt-space-xxs">Explore the job board to find placement opportunities.</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-space-lg">
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-space-md">
              <div className="flex items-center justify-between">
                <span className="font-title-sm text-title-sm text-primary-container flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-outline">schedule</span>
                  Upcoming Deadlines
                </span>
                <span className="font-label-uppercase text-label-uppercase bg-secondary-fixed text-on-secondary-fixed px-space-xs py-space-xxs rounded">Critical</span>
              </div>
              <div className="space-y-space-sm divide-y divide-surface-container-high">
                {upcomingDeadlines.length > 0 ? (
                  upcomingDeadlines.map((p, idx) => (
                    <div key={idx} className="pt-space-xs first:pt-0 space-y-space-xxs">
                      <div className="flex items-center justify-between">
                        <Link to={`/placements/${p.id}`} className="font-title-sm text-title-sm text-primary-container hover:underline">{p.companyName}</Link>
                        <span className="font-label-uppercase text-label-uppercase text-error">{p.deadline}</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary">{p.role} applications closing soon.</p>
                    </div>
                  ))
                ) : (
                  <div className="pt-space-xs text-secondary font-body-sm">No upcoming deadlines.</div>
                )}
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-space-md">
              <div className="flex items-center justify-between">
                <span className="font-title-sm text-title-sm text-primary-container flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-outline">tune</span>
                  Placement Optimization
                </span>
                <span className="font-label-regular text-label-regular text-secondary">+13% Potential</span>
              </div>
              <div className="p-space-md rounded-xl bg-secondary-fixed text-on-secondary-fixed space-y-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                  <span className="font-title-sm text-title-sm">Profile Recommendation</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant leading-relaxed">
                  Add 1 production SQL / Database Sharding project to verify backend competency. This will unlock <strong>3 more Tier-1 institutional recruitment tracks</strong>.
                </p>
                <Link to="/profile" className="inline-flex items-center gap-1 font-title-sm text-title-sm text-primary-container pt-space-xxs hover:underline">
                  <span>Update Profile</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="bg-primary-container text-on-primary rounded-2xl p-space-lg shadow-md space-y-space-sm relative overflow-hidden">
              <div className="flex items-center gap-space-xs">
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest text-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">psychology</span>
                </div>
                <div>
                  <h3 className="font-title-sm text-title-sm text-surface-container-lowest">Ask PlaceIntel</h3>
                  <p className="font-label-regular text-label-regular text-on-primary-container">Institutional Placement Intelligence</p>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-primary-container leading-relaxed">
                Need historical question patterns for Round 1 or average compensation for Engineering cohorts?
              </p>
              <div className="pt-space-xs">
                <Link to="/ask-placeintel" className="w-full py-space-sm rounded-xl bg-surface-container-lowest text-primary-container font-title-sm text-title-sm hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-space-xs">
                  <span>Open Placement Intelligence</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
