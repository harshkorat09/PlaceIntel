import { useState, useEffect } from 'react';
import { 
  Cpu, 
  Mail, 
  Lock, 
  Loader2, 
  User, 
  AlertCircle
} from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../api/client';
import { useNavigate } from 'react-router-dom';

interface StudentCredential {
  enrollmentNo: string;
  password: string;
  isFirstTime: boolean;
}

export default function Auth() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@placeintel.com');
  const [enrollmentNo, setEnrollmentNo] = useState('student.24dcse045@charusat.edu.in');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  
  // Login Role: officer vs student
  const [loginRole, setLoginRole] = useState<'officer' | 'student'>('officer');
  
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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const identifier = loginRole === 'officer' ? email : enrollmentNo;
    if (!identifier || !password) return;

    setIsLoading(true);
    
    try {
      const res = await apiClient.post('/auth/login', {
        email: identifier,
        password: password
      });

      if (res.success && res.data?.token) {
        login(res.data.token, res.data.user);
        navigate('/');
      } else {
        setErrorMessage(res.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            
            {/* Role Switcher */}
            <div style={{ display: 'flex', gap: 'var(--space-sm)', backgroundColor: 'var(--background)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <button 
                type="button"
                className="btn" 
                style={{ flex: 1, padding: '6px', fontSize: '12px', borderRadius: 'var(--radius-sm)', border: 'none', backgroundColor: loginRole === 'officer' ? 'var(--card)' : 'transparent', color: loginRole === 'officer' ? 'var(--primary)' : 'var(--text-secondary)', boxShadow: loginRole === 'officer' ? 'var(--shadow-sm)' : 'none', fontWeight: loginRole === 'officer' ? '700' : '500' }}
                onClick={() => {
                  setLoginRole('officer');
                  setPassword('admin123');
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
                  setPassword('student123');
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
      </div>
    </div>
  );
}
