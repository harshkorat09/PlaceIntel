import { useState, useEffect } from 'react';
import { 
  Cpu, 
  Mail, 
  Lock, 
  Loader2, 
  User, 
  AlertCircle, 
  ShieldAlert
} from 'lucide-react';

interface AuthProps {
  onLoginSuccess: (role: 'officer' | 'student', identifier: string) => void;
}

interface StudentCredential {
  enrollmentNo: string;
  password: string;
  isFirstTime: boolean;
}

export default function Auth({ onLoginSuccess }: AuthProps) {
  const [email, setEmail] = useState('placement.dir@univ.edu');
  const [enrollmentNo, setEnrollmentNo] = useState('24DCSE045');
  const [password, setPassword] = useState('temp123');
  const [isLoading, setIsLoading] = useState(false);
  
  // Login Role: officer vs student
  const [loginRole, setLoginRole] = useState<'officer' | 'student'>('officer');
  
  // Forced password reset states
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Inline error state
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

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const identifier = loginRole === 'officer' ? email : enrollmentNo;
    if (!identifier || !password) return;

    setIsLoading(true);
    
    // Simulate 1.2s verification delay
    setTimeout(() => {
      setIsLoading(false);
      
      if (loginRole === 'student') {
        const stored = localStorage.getItem('placeintel_student_credentials');
        const credsList: StudentCredential[] = stored ? JSON.parse(stored) : [];
        const matched = credsList.find(c => c.enrollmentNo.toUpperCase() === enrollmentNo.trim().toUpperCase());
        
        if (matched && matched.password === password) {
          if (matched.isFirstTime) {
            setIsResettingPassword(true);
          } else {
            onLoginSuccess('student', enrollmentNo.trim().toUpperCase());
          }
        } else {
          setErrorMessage('Invalid student credentials. Try 24DCSE045 and temp123.');
        }
      } else {
        // Placement Officer login check
        if (email.trim() === 'placement.dir@univ.edu' && password === '12345678') {
          onLoginSuccess('officer', email.trim());
        } else {
          setErrorMessage('Invalid officer email or password. Hint: 12345678');
        }
      }
    }, 1200);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!newPassword || newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    
    // Simulate saving delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Update credentials array in localStorage
      const stored = localStorage.getItem('placeintel_student_credentials');
      const credsList: StudentCredential[] = stored ? JSON.parse(stored) : [];
      const updated = credsList.map(c => {
        if (c.enrollmentNo.toUpperCase() === enrollmentNo.trim().toUpperCase()) {
          return { ...c, password: newPassword, isFirstTime: false };
        }
        return c;
      });
      localStorage.setItem('placeintel_student_credentials', JSON.stringify(updated));

      alert('Password updated successfully! Logging you in...');
      onLoginSuccess('student', enrollmentNo.trim().toUpperCase());
    }, 1200);
  };

  return (
    <div className="auth-wrapper">
      {/* Aurora glow backdrops */}
      <div className="auth-blur-circle indigo"></div>
      <div className="auth-blur-circle emerald"></div>
      
      <div className="auth-card">
        
        {/* Brand Header */}
        <div className="auth-brand-header">
          <div className="auth-brand-logo">
            <Cpu size={24} />
          </div>
          <span className="auth-brand-title">PlaceIntel</span>
          <span className="auth-brand-subtitle">AI-Powered Placement Intelligence Platform</span>
        </div>

        {/* Inline Error Alerts */}
        {errorMessage && (
          <div className="auth-error-alert">
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* First Time Reset Password View */}
        {isResettingPassword ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            
            <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: 'var(--radius-md)', display: 'flex', gap: 'var(--space-sm)' }}>
              <ShieldAlert size={20} style={{ color: 'var(--danger)', flexShrink: 0 }} />
              <div>
                <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>First-Time Password Change</span>
                <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  For security, you must replace the temporary password sent by your administrator before accessing the dashboard.
                </p>
              </div>
            </div>

            <form onSubmit={handleSavePassword} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-xs)' }}>
              
              <div className="form-group">
                <label className="form-label">Create New Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={14} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-tertiary)' }} />
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Min. 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ paddingLeft: '36px' }}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={14} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-tertiary)' }} />
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ paddingLeft: '36px' }}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '10px', marginTop: 'var(--space-xs)' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={14} className="spinner-icon" style={{ marginRight: '6px' }} />
                    <span>Saving Password...</span>
                  </>
                ) : (
                  <span>Save Password & Log In</span>
                )}
              </button>

            </form>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            
            {/* Role Switcher */}
            <div style={{ display: 'flex', gap: 'var(--space-sm)', backgroundColor: 'var(--background)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <button 
                type="button"
                className="btn" 
                style={{ flex: 1, padding: '6px', fontSize: '12px', borderRadius: 'var(--radius-sm)', border: 'none', backgroundColor: loginRole === 'officer' ? 'var(--card)' : 'transparent', color: loginRole === 'officer' ? 'var(--primary)' : 'var(--text-secondary)', boxShadow: loginRole === 'officer' ? 'var(--shadow-sm)' : 'none', fontWeight: loginRole === 'officer' ? '700' : '500' }}
                onClick={() => {
                  setLoginRole('officer');
                  setPassword('12345678');
                  setErrorMessage(null);
                }}
              >
                Placement Officer
              </button>
              <button 
                type="button"
                className="btn" 
                style={{ flex: 1, padding: '6px', fontSize: '12px', borderRadius: 'var(--radius-sm)', border: 'none', backgroundColor: loginRole === 'student' ? 'var(--card)' : 'transparent', color: loginRole === 'student' ? 'var(--primary)' : 'var(--text-secondary)', boxShadow: loginRole === 'student' ? 'var(--shadow-sm)' : 'none', fontWeight: loginRole === 'student' ? '700' : '500' }}
                onClick={() => {
                  setLoginRole('student');
                  setPassword('temp123');
                  setErrorMessage(null);
                }}
              >
                Student Portal
              </button>
            </div>

            <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              
              {/* Account Input Identifier */}
              {loginRole === 'officer' ? (
                <div className="form-group">
                  <label className="form-label">University Email *</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={14} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-tertiary)' }} />
                    <input 
                      type="email" 
                      className="form-control" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ paddingLeft: '36px' }}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">Student Enrollment No. *</label>
                  <div style={{ position: 'relative' }}>
                    <User size={14} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-tertiary)' }} />
                    <input 
                      type="text" 
                      className="form-control" 
                      value={enrollmentNo}
                      onChange={(e) => setEnrollmentNo(e.target.value)}
                      style={{ paddingLeft: '36px', fontFamily: 'monospace', fontWeight: '600' }}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              {/* Password input */}
              <div className="form-group">
                <label className="form-label">Portal Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={14} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-tertiary)' }} />
                  <input 
                    type="password" 
                    className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: '36px' }}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" id="remember-me" defaultChecked style={{ accentColor: 'var(--primary)', cursor: 'pointer' }} />
                  <label htmlFor="remember-me" style={{ fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}>
                    Remember me
                  </label>
                </div>
                <span 
                  onClick={() => alert('Password reset verification link sent to your registered university email.')}
                  style={{ fontSize: '12.5px', color: 'var(--primary)', cursor: 'pointer', fontWeight: '500' }}
                >
                  Forgot Password?
                </span>
              </div>

              {/* Walkthrough Tooltip Hint */}
              {loginRole === 'student' && (
                <div style={{ backgroundColor: 'var(--primary-light)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(79, 70, 229, 0.1)', fontSize: '11.5px', color: 'var(--primary)', lineHeight: '1.4', marginTop: 'var(--space-xs)' }}>
                  <strong>Walkthrough Hint:</strong> Sign in with password <code>temp123</code> to test the first-time password change prompt.
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '10px', marginTop: 'var(--space-sm)' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={14} className="spinner-icon" style={{ marginRight: '6px' }} />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <span>Sign In to PlaceIntel</span>
                )}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
