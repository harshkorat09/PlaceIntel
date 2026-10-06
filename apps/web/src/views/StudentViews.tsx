


import type { FC } from 'react';

interface StudentViewsProps {
  studentId: string;
}



// Student Mock database matching credentials details
const studentDatabase: Record<string, { name: string; cgpa: number; branch: string; institute: 'DEPSTAR' | 'CSPIT'; email: string; phone: string }> = {};

export const getStudentData = (id: string) => {
  const stored = localStorage.getItem('placeintel_student_credentials');
  if (stored) {
    const credsList = JSON.parse(stored);
    const matched = credsList.find((c: any) => c.enrollmentNo.toUpperCase() === id.toUpperCase());
    if (matched && matched.name) {
      return {
        name: matched.name,
        cgpa: matched.cgpa || 0,
        branch: matched.branch || 'CE',
        institute: matched.institute || 'DEPSTAR',
        email: matched.email,
        phone: '+91 98989 00000', // Default phone
        skills: []
      };
    }
  }

  // Fallback for hardcoded test accounts if not in localStorage
  const record = studentDatabase[id.toUpperCase()];
  if (record) return { ...record, skills: [] };

  const isDepstar = id.toUpperCase().includes('D');
  let branch = 'CSE';
  if (id.toUpperCase().includes('CE')) branch = 'CE';
  else if (id.toUpperCase().includes('IT')) branch = 'IT';

  return {
    name: 'New Student',
    cgpa: 0,
    branch: branch,
    institute: (isDepstar ? 'DEPSTAR' : 'CSPIT') as 'DEPSTAR' | 'CSPIT',
    email: `student.${id.toLowerCase()}@charusat.edu.in`,
    phone: '+91 00000 00000',
    skills: []
  };
};

/* ============================================================================
   1. STUDENT DASHBOARD
   ============================================================================ */
export const StudentDashboard: FC<StudentViewsProps> = ({ studentId }) => {
  const student = getStudentData(studentId);
  


  return (
    <div className="flex flex-col w-full">
      <div className="p-space-lg lg:p-space-xl space-y-space-xl max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="space-y-space-xxs">
            <div className="flex items-center gap-space-xs text-secondary">
              <span className="font-label-uppercase text-label-uppercase bg-secondary-fixed text-on-secondary-fixed px-space-xs py-space-xxs rounded-full">Session 2025–26</span>
              <span className="font-label-regular text-label-regular">•</span>
              <span className="font-label-regular text-label-regular text-secondary">{student.branch} • Semester V</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary-container tracking-tight">Good morning, {student.name.split(' ')[0]}.</h1>
            <p className="font-body-md text-body-md text-secondary">Placement Season 2025–26</p>
          </div>
          <div className="flex items-center gap-space-sm self-start md:self-auto">
            <div className="px-space-md py-space-xs rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-outline text-[20px]">verified</span>
              <div>
                <div className="font-label-uppercase text-label-uppercase text-secondary">Verified CGPA</div>
                <div className="font-title-sm text-title-sm text-primary-container">{student.cgpa.toFixed(2)} / 10.0</div>
              </div>
            </div>
            <div className="px-space-md py-space-xs rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-outline text-[20px]">military_tech</span>
              <div>
                <div className="font-label-uppercase text-label-uppercase text-secondary">Cohort Rank</div>
                <div className="font-title-sm text-title-sm text-primary-container">Top 4% ({student.branch} Dept)</div>
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
            <div className="bg-surface-container-lowest rounded-2xl p-space-xl text-center shadow-sm">
              <span className="material-symbols-outlined text-[48px] text-outline mb-space-sm">inbox</span>
              <h2 className="font-title-lg text-title-lg text-primary-container">No active placement tasks</h2>
              <p className="font-body-md text-body-md text-secondary mt-space-xxs">Explore the job board to find placement opportunities.</p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-space-lg">
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm space-y-space-md">
              <div className="flex items-center justify-between">
                <span className="font-title-sm text-title-sm text-primary-container flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-outline">schedule</span>
                  Institutional Deadlines
                </span>
                <span className="font-label-uppercase text-label-uppercase bg-secondary-fixed text-on-secondary-fixed px-space-xs py-space-xxs rounded">Critical</span>
              </div>
              <div className="space-y-space-sm divide-y divide-surface-container-high">
                <div className="pt-space-xs first:pt-0 space-y-space-xxs">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm text-primary-container">TCS Digital Portal</span>
                    <span className="font-label-uppercase text-label-uppercase text-error">Tomorrow</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary">Endorsement approval and code repos verification closes at 18:00 hrs.</p>
                </div>
                <div className="pt-space-sm space-y-space-xxs">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm text-primary-container">Crest Data Systems</span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary">08 Oct 2026</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary">Campus pre-assessment slot declaration and institutional mock trial.</p>
                </div>
                <div className="pt-space-sm space-y-space-xxs">
                  <div className="flex items-center justify-between">
                    <span className="font-title-sm text-title-sm text-primary-container">InfoChips Assessment</span>
                    <span className="font-label-uppercase text-label-uppercase text-secondary">12 Oct 2026</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary">Embedded systems profile validation requirement.</p>
                </div>
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
                <a className="inline-flex items-center gap-1 font-title-sm text-title-sm text-primary-container pt-space-xxs hover:underline" href="#">
                  <span>Upload Git Repository</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
              </div>
              <div className="space-y-space-xs">
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-secondary font-label-regular text-label-regular">Academic Transcript</span>
                  <span className="font-label-uppercase text-label-uppercase text-on-secondary-container">Verified</span>
                </div>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-secondary font-label-regular text-label-regular">Placement NOC</span>
                  <span className="font-label-uppercase text-label-uppercase text-on-secondary-container">Cleared</span>
                </div>
                <div className="flex items-center justify-between text-body-sm">
                  <span className="text-secondary font-label-regular text-label-regular">Production Project Proof</span>
                  <span className="font-label-uppercase text-label-uppercase text-secondary">Action Req</span>
                </div>
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
                Need historical question patterns for Microsoft Round 1 or average compensation for Computer Engineering cohorts?
              </p>
              <div className="pt-space-xs">
                <button className="w-full py-space-sm rounded-xl bg-surface-container-lowest text-primary-container font-title-sm text-title-sm hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-space-xs">
                  <span>Open Placement Intelligence</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


