import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../api/client';
import { useNavigate, Link } from 'react-router-dom';

interface StudentCredential {
  enrollmentNo: string;
  password: string;
  isFirstTime: boolean;
}

export default function Auth() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('admin@placeintel.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize default student credentials in localStorage
  useEffect(() => {
    const existing = localStorage.getItem('placeintel_student_credentials');
    if (!existing) {
      const defaultCreds: StudentCredential[] = [
        { enrollmentNo: '24DCSE045', password: 'temp123', isFirstTime: true },
        { enrollmentNo: 'D25CSE018', password: 'temp123', isFirstTime: true }
      ];
      localStorage.setItem('placeintel_student_credentials', JSON.stringify(defaultCreds));
    }
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!email || !password) return;

    setIsLoading(true);
    
    try {
      const res = await apiClient.post('/auth/login', {
        email: email,
        password: password
      });

      if (res && res.token) {
        login(res.token, res.user);
        navigate('/');
      } else {
        setErrorMessage(res.message || 'Login failed');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body { overscroll-behavior: none; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="bg-surface font-body-md text-on-surface min-h-screen antialiased selection:bg-secondary-container selection:text-on-secondary-fixed">
        <main className="min-h-screen w-full bg-surface">
          <div className="flex flex-col w-full">
            <div className="w-full flex items-center justify-center p-4 sm:p-6 lg:p-10 xl:p-14">
              <div className="w-full max-w-[1360px] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                
                {/* LEFT COLUMN: ATMOSPHERIC BRAND EXPERIENCE */}
                <section className="lg:col-span-7 bg-primary-container text-on-primary rounded-[32px] p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between relative overflow-hidden shadow-xl">
                  {/* Radial ambient warmth inside container */}
                  <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary-fixed/5 blur-2xl pointer-events-none"></div>
                  
                  {/* Top Header & Identity */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary-container shadow-sm">
                        <span className="material-symbols-outlined text-title-md" style={{ fontVariationSettings: '"FILL" 1' }}>insights</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md tracking-tight text-surface-container-lowest">PlaceIntel</span>
                        <span className="font-caption text-caption uppercase tracking-wider text-secondary-container">Campus Intelligence Matrix</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 bg-tertiary-container/80 px-3 py-1.5 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                      <span className="font-label-sm text-label-sm text-surface-container-lowest">System Online · Cycle 2025</span>
                    </div>
                  </div>
                  
                  {/* Central Editorial Content */}
                  <div className="relative z-10 my-10 lg:my-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary-container/15 text-secondary-container mb-6">
                      <span className="font-label-sm text-label-sm font-semibold">{"}"} SECURE INSTANCE GATEWAY</span>
                    </div>
                    <h1 className="font-headline-lg text-headline-lg lg:font-display-lg lg:text-display-lg text-surface-container-lowest tracking-tight max-w-xl">
                      {"}"} Too many placement questions. One place to find the answers.
                    </h1>
                    <p className="font-body-lg text-body-lg text-surface-container-highest/80 max-w-lg mt-4 leading-relaxed">
                      Explore opportunities, understand eligibility, compare companies and make your next move with confidence.
                    </p>
                    
                    {/* Authentic Candidate Focus Card */}
                    <div className="mt-6 relative w-full flex items-center justify-center overflow-hidden">
                      <img 
                        alt="From Questions to Placement" 
                        className="w-full max-w-lg object-contain transition-transform duration-700 hover:scale-105 pointer-events-none select-none" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK9lI1WYy4DCIEq9PXQFSWPyEmxJmWuBkwBtMKlA_BuYWIIZpBVux-eCoRTJtJOXXsPfnd_p1RbiFS5-grAjraIr7-2B9z5vI-bnnT45488LdtEon8ACwV6_AC8c6Oz4BHqd0Hu3CGjuc69vnbioCvtOErfkgBboGd9gd7bOKWT_Y-JDb8lyPLCSqZ1gJHtV6dpR7G15NGBFxQjpKgQQJQqjrOmPU6TQgSCsuDA9EKDQd6DMIqwzpdcZNFd6fVkHNu_A" 
                        style={{ mixBlendMode: 'lighten', WebkitMaskImage: 'radial-gradient(black 55%, transparent 95%)', maskImage: 'radial-gradient(black 55%, transparent 95%)' }} 
                      />
                    </div>
                  </div>
                  
                  {/* Bottom Metric Ribbon */}
                  <div className="relative z-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-tertiary-container/40 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-surface-container-lowest/10 text-secondary-container">
                        <span className="material-symbols-outlined text-title-md">verified</span>
                      </div>
                      <div>
                        <p className="font-label-md text-label-md text-surface-container-lowest font-semibold">Curated Placement Guidance</p>
                        <p className="font-caption text-caption text-surface-container-highest/70">Clear eligibility criteria &amp; honest company insights</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-secondary-container">
                      <span className="material-symbols-outlined text-[16px]">school</span>
                      <span className="font-label-sm text-label-sm font-medium">Built for Students</span>
                    </div>
                  </div>
                </section>
                
                {/* RIGHT COLUMN: FOCUSED AUTHENTICATION EXPERIENCE */}
                <section className="lg:col-span-5 bg-surface-container-lowest text-on-surface rounded-[28px] p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-sm relative">
                  
                  {/* Top Status Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-label-sm text-label-sm text-secondary tracking-wide uppercase">Workspace Access</span>
                    </div>
                    
                    {/* Main Greeting */}
                    <div className="mb-8">
                      <h2 className="font-headline-md text-headline-md text-primary-container tracking-tight">
                        Welcome back.
                      </h2>
                      <p className="font-body-md text-body-md text-secondary mt-1">
                        Continue to your PlaceIntel workspace.
                      </p>
                    </div>
                    
                    {/* Inline Error Banner */}
                    {errorMessage && (
                      <div className="mb-6 p-3.5 rounded-lg bg-error-container text-on-error-container">
                        <div className="flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-title-md shrink-0">error</span>
                          <div className="text-body-sm font-body-sm leading-snug">
                            {errorMessage}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Authentication Form */}
                    <form className="space-y-5" onSubmit={handleSignIn}>
                      {/* Email Input Group */}
                      <div className="space-y-1.5">
                        <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="email">
                          Institutional or Personal Email
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[20px]">
                            alternate_email
                          </span>
                          <input 
                            className="w-full pl-10 pr-4 py-3 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-hidden focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all" 
                            id="email" 
                            name="email" 
                            placeholder="e.g. harsh.patel@charusat.edu.in" 
                            required 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      
                      {/* Password Input Group */}
                      <div className="space-y-1.5">
                        <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">
                          Password
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[20px]">
                            lock
                          </span>
                          <input 
                            className="w-full pl-10 pr-11 py-3 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-hidden focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all" 
                            id="password" 
                            name="password" 
                            placeholder="••••••••••••" 
                            required 
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                          />
                          <button 
                            aria-label="Toggle password visibility" 
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary-container transition-colors" 
                            onClick={() => setShowPassword(!showPassword)} 
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Auxiliary Options Row */}
                      <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            defaultChecked 
                            className="w-4 h-4 rounded text-primary-container accent-primary-container focus:ring-primary-container cursor-pointer" 
                            type="checkbox" 
                          />
                          <span className="font-body-sm text-body-sm text-secondary">Remember this device</span>
                        </label>
                        <a className="font-label-sm text-label-sm text-primary-container hover:underline font-semibold" href="#">
                          Forgot password?
                        </a>
                      </div>
                      
                      {/* Primary Submission CTA Button */}
                      <button 
                        className="w-full mt-4 bg-primary-container hover:bg-primary-container/90 text-on-primary font-label-md text-label-md py-3.5 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer" 
                        type="submit" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-on-primary inline-block" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                            </svg>
                            <span className="ml-2 font-label-md">Signing in...</span>
                          </>
                        ) : (
                          <span>Log in to Workspace &rarr;</span>
                        )}
                      </button>
                    </form>
                    
                    <div className="relative my-7">
                      <div className="w-full h-px bg-surface-container-high"></div>
                    </div>
                  </div>
                  
                  {/* Footer Section */}
                  <div className="mt-8 pt-6 bg-surface-container-lowest">
                    <div className="p-3 rounded-lg bg-surface-container-low text-secondary flex items-center justify-center gap-2 text-center mb-4">
                      <span className="material-symbols-outlined text-[18px]">shield</span>
                      <span className="font-caption text-caption">Unified Institutional Access &middot; Students &amp; Placement Administrators</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-center text-secondary">
                      Don't have an account?{' '}
                      <a className="text-primary-container font-semibold hover:underline" href="#">
                        Request access through your TPO
                      </a> 
                      {' '}or{' '}
                      <Link className="text-primary-container font-semibold hover:underline" to="/signup">
                        Sign up
                      </Link>
                    </p>
                  </div>
                  
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
