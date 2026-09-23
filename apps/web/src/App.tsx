import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Building2, 
  BarChart3, 
  Sparkles, 
  Settings as SettingsIcon, 
  ShieldAlert, 
  LogOut, 
  Search,
  ChevronDown
} from 'lucide-react';

// Import views
import Dashboard from './views/Dashboard';
import Placements from './views/Placements';
import Companies from './views/Companies';
import Analytics from './views/Analytics';
import AIAssistant from './views/AIAssistant';
import Settings from './views/Settings';
import AdminPanel from './views/AdminPanel';
import Auth from './views/Auth';
import { StudentDashboard, getStudentData } from './views/StudentViews';
import { StudentJobs } from './views/StudentJobs';
import { StudentProfile } from './views/StudentProfile';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function DashboardLayout() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const student = user?.role === 'STUDENT' ? getStudentData(String(user.userId)) : null;
  const userInitials = student ? student.name.split(' ').map((n: string) => n[0]).join('') : 'AD';
  const userName = student ? student.name : 'Dr. Amit Das';
  const userEmail = user?.email || 'placement.dir@univ.edu';

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo-icon">PI</div>
            <span className="logo-text">PlaceIntel</span>
          </div>

          <nav className="sidebar-menu">
            <div className="menu-label">Main Menu</div>
            <NavLink to="/" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`} end>
              <LayoutDashboard size={16} />
              Dashboard
            </NavLink>
            <NavLink to="/placements" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
              <Briefcase size={16} />
              {user?.role === 'ADMIN' ? 'Placement Drives' : 'Job Openings'}
            </NavLink>
            
            <NavLink to="/companies" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
              <Building2 size={16} />
              {user?.role === 'ADMIN' ? 'Companies' : 'Recruiters'}
            </NavLink>

            <NavLink to="/analytics" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
              <BarChart3 size={16} />
              Analytics
            </NavLink>

            <div className="menu-label" style={{ marginTop: 'var(--space-md)' }}>AI & Automation</div>
            <NavLink to="/ai-assistant" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
              <Sparkles size={16} />
              AI Assistant
            </NavLink>

            <div className="menu-label" style={{ marginTop: 'var(--space-md)' }}>System</div>
            <NavLink to="/settings" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
              <SettingsIcon size={16} />
              {user?.role === 'ADMIN' ? 'Settings' : 'My Profile'}
            </NavLink>

            {user?.role === 'ADMIN' && (
              <NavLink to="/admin" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                <ShieldAlert size={16} />
                Admin Panel
              </NavLink>
            )}
          </nav>

          {/* Sidebar Footer - Profile Info */}
          <div className="sidebar-footer">
            <div className="user-avatar" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>{userInitials}</div>
            <div className="user-info">
              <div className="user-name">{userName}</div>
              <div className="user-email">{userEmail}</div>
            </div>
            <button 
              className="icon-btn" 
              onClick={logout} 
              title="Logout"
              style={{ color: 'var(--text-secondary)' }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </aside>

        {/* Main Panel */}
        <div className="main-wrapper">
          {/* Header */}
          <header className="main-header">
            <div className="header-search">
              <Search size={16} className="text-tertiary" style={{ color: 'var(--text-tertiary)' }} />
              <input 
                type="text" 
                placeholder="Search companies or drives..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="header-actions">
              <div style={{ position: 'relative' }}>
                <div 
                  style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', cursor: 'pointer' }}
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>Placement Office</span>
                  <ChevronDown size={14} style={{ color: 'var(--text-secondary)' }} />
                </div>
                
                {showProfileDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '32px',
                    right: 0,
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    width: '180px',
                    zIndex: 20,
                    padding: 'var(--space-xs)'
                  }}>
                    <NavLink 
                      to="/settings" 
                      className="menu-item" 
                      onClick={() => setShowProfileDropdown(false)}
                      style={{ padding: '8px var(--space-sm)' }}
                    >
                      <SettingsIcon size={14} /> Profile Settings
                    </NavLink>
                    <div 
                      className="menu-item" 
                      onClick={() => {
                        setShowProfileDropdown(false);
                        logout();
                      }}
                      style={{ padding: '8px var(--space-sm)', color: 'var(--danger)', borderTop: '1px solid var(--border)', marginTop: '4px' }}
                    >
                      <LogOut size={14} /> Sign Out
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Routing Contents */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ProtectedRoute>{user?.role === 'ADMIN' ? <Dashboard /> : <StudentDashboard studentId={String(user?.userId)} />}</ProtectedRoute>} />
              <Route path="/placements" element={<ProtectedRoute>{user?.role === 'ADMIN' ? <Placements /> : <StudentJobs studentId={String(user?.userId)} />}</ProtectedRoute>} />
              
              <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminPanel /></ProtectedRoute>} />
              
              <Route path="/companies" element={<ProtectedRoute><Companies role={user?.role === 'ADMIN' ? 'officer' : 'student'} /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics role={user?.role === 'ADMIN' ? 'officer' : 'student'} /></ProtectedRoute>} />
              <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute>{user?.role === 'ADMIN' ? <Settings /> : <StudentProfile studentId={String(user?.userId)} />}</ProtectedRoute>} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/*" element={<DashboardLayout />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
