import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [branches, setBranches] = useState<any[]>([]);
  useEffect(() => {
    apiClient.get('/branches').then(res => setBranches(res.data)).catch(console.error);
  }, []);

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    rollno: '',
    branch: 'B.Tech Computer Engineering',
    cgpa: '',
    batch: 'Class of 2025',
    password: '',
    confirmPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const parsedCgpa = parseFloat(formData.cgpa);
    if (isNaN(parsedCgpa) || parsedCgpa < 0 || parsedCgpa > 10) {
      setErrorMessage("CGPA must be a number between 0 and 10");
      return;
    }

    setIsLoading(true);
    try {
      // Assuming a signup endpoint exists in apiClient
      const res = await apiClient.post('/auth/register', {
        name: formData.fullname,
        email: formData.email,
        password: formData.password,
        role: 'STUDENT',
        rollNo: formData.rollno,
        branch: formData.branch,
        cgpa: parseFloat(formData.cgpa),
        batch: formData.batch
      });

      if (res && res.token) {
        login(res.token, res.user);
        navigate('/');
      } else {
        setErrorMessage('Registration failed. Please check your details and try again.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen antialiased selection:bg-secondary-container selection:text-on-secondary-fixed">
      <main className="min-h-screen w-full bg-surface">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-md lg:py-space-xl flex items-center justify-center">
            
            {/* Master Split Frame */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
              
              {/* LEFT BRAND COLUMN (Deep Navy #07203F) */}
              <div 
                className="lg:col-span-5 bg-primary-container text-on-primary flex flex-col justify-between p-space-lg lg:p-space-2xl relative overflow-hidden rounded-[32px] shadow-sm" 
                style={{ background: 'linear-gradient(145deg, rgb(7, 32, 63) 0%, rgb(3, 16, 36) 100%)' }}
              >
                <div 
                  className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-30" 
                  style={{ background: 'radial-gradient(circle, rgba(245, 243, 225, 0.12) 0%, rgba(7, 32, 63, 0.4) 60%, transparent 75%)' }}
                ></div>
                <div 
                  className="absolute top-1/2 -right-20 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-20" 
                  style={{ background: 'radial-gradient(circle, rgba(245, 243, 225, 0.08) 0%, transparent 70%)' }}
                ></div>
                <div 
                  className="absolute -bottom-20 left-10 w-72 h-72 rounded-full pointer-events-none blur-3xl opacity-25" 
                  style={{ background: 'radial-gradient(circle, rgba(245, 243, 225, 0.08) 0%, transparent 75%)' }}
                ></div>
                
                <div className="relative z-10 flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between gap-space-xs">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-inner">
                        <span className="material-symbols-outlined text-headline-sm" style={{ fontVariationSettings: '"FILL" 1' }}>insights</span>
                      </div>
                      <div>
                        <span className="font-headline-sm text-headline-sm tracking-tight text-white block leading-none font-semibold">PlaceIntel</span>
                        <span className="font-caption text-caption tracking-widest uppercase block mt-1 text-[#BAC7D5]">Campus Placement Intelligence</span>
                      </div>
                    </div>
                    <span 
                      className="hidden sm:block font-label-sm text-label-sm px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border text-[#F5F3E1] text-center whitespace-nowrap font-medium" 
                      style={{ borderColor: 'rgba(245, 243, 225, 0.2)' }}
                    >
                      • Academic Cycle 2025
                    </span>
                  </div>
                  
                  <div className="mt-space-md inline-flex items-center gap-1.5 self-start">
                    <span className="font-caption text-caption uppercase tracking-wider text-[#BAC7D5] font-semibold">› STUDENT ONBOARDING GATEWAY</span>
                  </div>
                  
                  <div className="mt-space-xs">
                    <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                      {'}'}Your placement journey{' '}
                      <span 
                        style={{ 
                          background: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(245, 243, 225) 60%, rgb(186, 199, 213) 100%)', 
                          WebkitBackgroundClip: 'text', 
                          WebkitTextFillColor: 'transparent', 
                          fontWeight: 700 
                        }}
                      >
                        starts here.
                      </span>
                    </h1>
                    <p className="font-body-md text-body-md text-[#BAC7D5] mt-space-sm leading-relaxed max-w-lg">
                      Create your PlaceIntel profile and discover opportunities tailored to your verified CGPA, skills, and departmental eligibility.
                    </p>
                  </div>
                </div>
                
                <div className="relative z-10 my-space-lg flex flex-col gap-space-sm">
                  <div 
                    className="rounded-xl p-4 border backdrop-blur-sm flex flex-col gap-1" 
                    style={{ borderColor: 'rgba(245, 243, 225, 0.15)', background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(245, 243, 225, 0.02))' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="uppercase tracking-wider font-semibold text-[#F5F3E1]" style={{ fontSize: '11px' }}>01 • ELIGIBILITY AUDIT</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5F3E1]"></span>
                    </div>
                    <h3 className="text-white font-semibold text-label-md mt-0.5">Deterministic Criteria Match</h3>
                    <p className="text-[#BAC7D5] leading-relaxed" style={{ fontSize: '12px' }}>Instant cross-referencing against official university notices and departmental cutoffs.</p>
                  </div>
                  
                  <div 
                    className="rounded-xl p-4 border backdrop-blur-sm flex flex-col gap-1" 
                    style={{ borderColor: 'rgba(245, 243, 225, 0.15)', background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(245, 243, 225, 0.02))' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="uppercase tracking-wider font-semibold text-[#F5F3E1]" style={{ fontSize: '11px' }}>02 • INSTITUTIONAL FEEDS</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5F3E1]"></span>
                    </div>
                    <h3 className="text-white font-semibold text-label-md mt-0.5">Direct TPO Circular Sync</h3>
                    <p className="text-[#BAC7D5] leading-relaxed" style={{ fontSize: '12px' }}>Real-time verification of active drives, salary brackets, and schedule milestones.</p>
                  </div>
                  
                  <div 
                    className="rounded-xl p-4 border backdrop-blur-sm flex flex-col gap-1" 
                    style={{ borderColor: 'rgba(245, 243, 225, 0.15)', background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(245, 243, 225, 0.02))' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="uppercase tracking-wider font-semibold text-[#F5F3E1]" style={{ fontSize: '11px' }}>03 • COHORT BENCHMARKING</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5F3E1]"></span>
                    </div>
                    <h3 className="text-white font-semibold text-label-md mt-0.5">Verified Standing & Insights</h3>
                    <p className="text-[#BAC7D5] leading-relaxed" style={{ fontSize: '12px' }}>Transparent percentile tracking across CE/CSE without guesswork or misinformation.</p>
                  </div>
                </div>
                
                <div className="relative z-10 pt-space-xs flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-body-lg text-[#F5F3E1]" style={{ fontVariationSettings: '"FILL" 1' }}>verified_user</span>
                    <span className="font-label-sm text-label-sm font-medium tracking-wide uppercase text-[#F5F3E1]">Built for CHARUSAT University Students</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-space-xs">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[#F5F3E1]" style={{ background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(245, 243, 225, 0.15)' }}>
                      <span className="material-symbols-outlined text-caption text-[#F5F3E1]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                      <span className="font-label-sm text-label-sm">Deterministic Verification</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[#F5F3E1]" style={{ background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(245, 243, 225, 0.15)' }}>
                      <span className="material-symbols-outlined text-caption text-[#F5F3E1]" style={{ fontVariationSettings: '"FILL" 1' }}>rss_feed</span>
                      <span className="font-label-sm text-label-sm">Verified TPO Feeds</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[#F5F3E1]" style={{ background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(245, 243, 225, 0.15)' }}>
                      <span className="material-symbols-outlined text-caption text-[#F5F3E1]" style={{ fontVariationSettings: '"FILL" 1' }}>tune</span>
                      <span className="font-label-sm text-label-sm">Personalized Fit</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT REGISTRATION CARD (Pure White #FFFFFF) */}
              <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg lg:p-space-2xl flex flex-col justify-between rounded-[32px] shadow-sm border border-surface-container-highest/60">
                <div>
                  <div className="flex items-center justify-between pb-space-sm">
                    <span className="font-caption text-caption uppercase tracking-wider text-secondary">
                      Step 01 / Account Creation
                    </span>
                  </div>
                  
                  <div className="mt-space-xs">
                    <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                      Create your account.
                    </h2>
                    <p className="font-body-sm text-body-sm text-secondary mt-1">
                      Start exploring campus placement opportunities with verified university telemetry.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mt-space-sm p-space-sm rounded-lg bg-error-container text-on-error-container flex items-start gap-space-xs">
                      <span className="material-symbols-outlined text-title-md shrink-0">error</span>
                      <div className="flex-1">
                        <span className="font-label-sm text-label-sm block font-medium">Registration Error</span>
                        <p className="font-body-sm text-body-sm mt-0.5">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  <form className="mt-space-md flex flex-col gap-space-md" onSubmit={handleSignup}>
                    {/* SECTION 1: CANDIDATE IDENTITY */}
                    <div className="flex flex-col gap-space-xs">
                      <span className="font-caption text-caption uppercase tracking-wider text-secondary">Candidate Identity</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                        <div className="flex flex-col gap-1">
                          <label className="font-label-sm text-label-sm text-on-surface" htmlFor="fullname">Full Name</label>
                          <div className="relative">
                            <input 
                              className="w-full h-11 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary-container bg-surface-container-low/60" 
                              id="fullname" 
                              placeholder="e.g. Harsh Patel" 
                              required 
                              type="text" 
                              value={formData.fullname}
                              onChange={handleInputChange}
                              disabled={isLoading}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-label-sm text-label-sm text-on-surface" htmlFor="email">Institutional Email</label>
                          <div className="relative">
                            <input 
                              className={`w-full h-11 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary-container bg-surface-container-low/60 ${errorMessage ? 'ring-1 ring-error bg-error-container/20' : ''}`} 
                              id="email" 
                              placeholder="student@charusat.edu.in" 
                              required 
                              type="email" 
                              value={formData.email}
                              onChange={handleInputChange}
                              disabled={isLoading}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: ACADEMIC CREDENTIALS */}
                    <div className="flex flex-col gap-space-xs">
                      <span className="font-caption text-caption uppercase tracking-wider text-secondary">Academic Credentials</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                        <div className="flex flex-col gap-1">
                          <label className="font-label-sm text-label-sm text-on-surface" htmlFor="rollno">Roll Number / Enrollment</label>
                          <input 
                            className="w-full h-11 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md uppercase placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary-container bg-surface-container-low/60" 
                            id="rollno" 
                            placeholder="21BCE042" 
                            required 
                            type="text" 
                            value={formData.rollno}
                            onChange={handleInputChange}
                            disabled={isLoading}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-label-sm text-label-sm text-on-surface" htmlFor="branch">Department / Major</label>
                          <select 
                            className="w-full h-11 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container bg-surface-container-low/60" 
                            id="branch"
                            value={formData.branch}
                            onChange={handleInputChange}
                            disabled={isLoading}
                          >
                            {branches.map(b => (
                              <option key={b.id} value={b.name}>{b.degree} {b.name}</option>
                            ))}
                            {branches.length === 0 && <option>B.Tech Computer Engineering</option>}
                          </select>
                        </div>
                      </div>
                      
                      {/* Row 2: CGPA & Batch */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm mt-1">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <label className="font-label-sm text-label-sm text-on-surface" htmlFor="cgpa">Current Cumulative CGPA</label>
                            <span className="font-caption text-caption text-secondary">Synced via Dean Portal</span>
                          </div>
                          <div className="relative">
                            <input 
                              className="w-full h-11 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md font-semibold placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary-container bg-surface-container-low/60" 
                              id="cgpa" 
                              placeholder="e.g. 9.14" 
                              required 
                              type="text" 
                              value={formData.cgpa}
                              onChange={handleInputChange}
                              disabled={isLoading}
                            />
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-caption text-caption text-secondary">/ 10.0</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-label-sm text-label-sm text-on-surface" htmlFor="batch">Passing Out Batch</label>
                          <select 
                            className="w-full h-11 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container bg-surface-container-low/60" 
                            id="batch"
                            value={formData.batch}
                            onChange={handleInputChange}
                            disabled={isLoading}
                          >
                            <option>Class of 2025</option>
                            <option>Class of 2026</option>
                            <option>Class of 2027</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: SECURITY & PASSWORD */}
                    <div className="flex flex-col gap-space-xs">
                      <span className="font-caption text-caption uppercase tracking-wider text-secondary">Security & Encryption</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                        <div className="flex flex-col gap-1">
                          <label className="font-label-sm text-label-sm text-on-surface" htmlFor="password">Password</label>
                          <div className="relative">
                            <input 
                              className="w-full h-11 pl-3.5 pr-10 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary-container bg-surface-container-low/60" 
                              id="password" 
                              placeholder="Minimum 8 characters" 
                              required 
                              type={showPassword ? "text" : "password"} 
                              value={formData.password}
                              onChange={handleInputChange}
                              disabled={isLoading}
                            />
                            <button 
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface p-1" 
                              onClick={() => setShowPassword(!showPassword)} 
                              type="button"
                              disabled={isLoading}
                            >
                              <span className="material-symbols-outlined text-body-md">
                                {showPassword ? 'visibility_off' : 'visibility'}
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-label-sm text-label-sm text-on-surface" htmlFor="confirmPassword">Confirm Password</label>
                          <div className="relative">
                            <input 
                              className="w-full h-11 pl-3.5 pr-10 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary-container bg-surface-container-low/60" 
                              id="confirmPassword" 
                              placeholder="Repeat password" 
                              required 
                              type={showConfirmPassword ? "text" : "password"} 
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              disabled={isLoading}
                            />
                            <button 
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface p-1" 
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                              type="button"
                              disabled={isLoading}
                            >
                              <span className="material-symbols-outlined text-body-md">
                                {showConfirmPassword ? 'visibility_off' : 'visibility'}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Affirmation Checkbox */}
                    <label className="flex items-start gap-2.5 cursor-pointer mt-1 select-none">
                      <input 
                        className="mt-1 w-4 h-4 rounded text-primary-container focus:ring-0 focus:ring-offset-0 accent-primary-container cursor-pointer" 
                        type="checkbox" 
                        defaultChecked
                        required
                        disabled={isLoading}
                      />
                      <span className="font-body-sm text-body-sm text-secondary leading-snug">
                        I confirm that academic credentials match my official university transcript and agree to Placement Cell compliance protocols.
                      </span>
                    </label>

                    {/* Primary Action Button */}
                    <div className="mt-space-xs">
                      <button 
                        className="w-full h-12 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed" 
                        type="submit"
                        disabled={isLoading}
                      >
                        <span>{isLoading ? 'Creating account...' : 'Create account'}</span>
                        {!isLoading && <span className="material-symbols-outlined text-body-lg">arrow_forward</span>}
                        {isLoading && <span className="material-symbols-outlined text-body-lg animate-spin">progress_activity</span>}
                      </button>
                    </div>
                  </form>

                  {/* Secondary SSO Authentication Option */}
                  <div className="mt-space-md flex flex-col gap-space-sm">
                    <div className="relative flex items-center justify-center">
                      <div className="w-full h-[1px] bg-surface-container-highest"></div>
                      <span className="absolute px-3 bg-surface-container-lowest font-caption text-caption text-secondary uppercase tracking-widest">or</span>
                    </div>
                    <button 
                      className="w-full h-11 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md flex items-center justify-center gap-2.5 hover:bg-surface-container transition-colors" 
                      type="button"
                      disabled={isLoading}
                    >
                      <span className="material-symbols-outlined text-body-lg text-secondary">account_balance</span>
                      <span>Continue with Institutional SSO</span>
                    </button>
                  </div>
                </div>

                {/* Footer Direct Links & Institutional Accreditation */}
                <div className="mt-space-lg pt-space-sm border-t border-surface-container-highest/60 flex flex-col sm:flex-row items-center justify-between gap-space-xs">
                  <div className="font-body-sm text-body-sm text-secondary">
                    Already registered?{' '}
                    <Link to="/login" className="font-label-sm text-label-sm font-semibold text-primary-container hover:underline ml-1">
                      Log in
                    </Link>
                  </div>
                  <div className="flex items-center gap-1.5 text-secondary">
                    <span className="material-symbols-outlined text-caption">domain</span>
                    <span className="font-caption text-caption">CHARUSAT University Placement Cell</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
