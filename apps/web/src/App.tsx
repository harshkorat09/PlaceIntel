import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Building2, 
  FileSpreadsheet, 
  BarChart3, 
  ClipboardList, 
  Sparkles, 
  Bell, 
  Calendar as CalendarIcon, 
  Settings as SettingsIcon, 
  ShieldAlert, 
  LogOut, 
  Search,
  ChevronDown
} from 'lucide-react';

// Import views
import Dashboard from './views/Dashboard';
import Placements, { initialDrives } from './views/Placements';
import Students from './views/Students';
import Companies from './views/Companies';
import Applications, { initialApplications } from './views/Applications';
import Analytics from './views/Analytics';
import Reports from './views/Reports';
import AIAssistant from './views/AIAssistant';
import Notifications, { initialNotifications } from './views/Notifications';
import Calendar, { initialEvents } from './views/Calendar';
import Settings from './views/Settings';
import AdminPanel from './views/AdminPanel';
import Auth from './views/Auth';
import { StudentDashboard, StudentJobs, StudentAIAssistant, StudentProfile, getStudentData } from './views/StudentViews';

export default function App() {
  const [user, setUser] = useState<{ role: 'officer' | 'student'; id: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [lastSync, setLastSync] = useState(Date.now());

  // Initialize all storage on app load to ensure students have data
  useEffect(() => {
    if (!localStorage.getItem('placeintel_placement_drives')) {
      localStorage.setItem('placeintel_placement_drives', JSON.stringify(initialDrives));
    }
    if (!localStorage.getItem('placeintel_student_applications')) {
      localStorage.setItem('placeintel_student_applications', JSON.stringify(initialApplications));
    }
    if (!localStorage.getItem('placeintel_calendar_events')) {
      localStorage.setItem('placeintel_calendar_events', JSON.stringify(initialEvents));
    }
    if (!localStorage.getItem('placeintel_announcements')) {
      localStorage.setItem('placeintel_announcements', JSON.stringify(initialNotifications));
    }
    const handleStorageChange = () => {
      setLastSync(Date.now());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Authentication page wrapper
  if (!user) {
    return <Auth onLoginSuccess={(role, id) => setUser({ role, id })} />;
  }

  const student = user.role === 'student' ? getStudentData(user.id) : null;
  const userInitials = student ? student.name.split(' ').map((n: string) => n[0]).join('') : 'AD';
  const userName = student ? student.name : 'Dr. Amit Das';
  const userEmail = student ? user.id : 'placement.dir@univ.edu';

  return (
    <Router>
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
              {user.role === 'officer' ? 'Placement Drives' : 'Job Openings'}
            </NavLink>
            
            {user.role === 'officer' && (
              <NavLink to="/students" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                <Users size={16} />
                Students
              </NavLink>
            )}
            
            <NavLink to="/companies" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
              <Building2 size={16} />
              {user.role === 'officer' ? 'Companies' : 'Recruiters'}
            </NavLink>
            
            <NavLink to="/applications" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
              <FileSpreadsheet size={16} />
              {user.role === 'officer' ? 'Applications' : 'My Applications'}
            </NavLink>

            <NavLink to="/analytics" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
              <BarChart3 size={16} />
              Analytics
            </NavLink>

            {user.role === 'officer' && (
              <NavLink to="/reports" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
                <ClipboardList size={16} />
                Reports
              </NavLink>
            )}

            <div className="menu-label" style={{ marginTop: 'var(--space-md)' }}>AI & Automation</div>
            <NavLink to="/ai-assistant" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
              <Sparkles size={16} />
              AI Assistant
            </NavLink>

            <div className="menu-label" style={{ marginTop: 'var(--space-md)' }}>System</div>
            <NavLink to="/notifications" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
              <Bell size={16} />
              Notifications
            </NavLink>
            <NavLink to="/calendar" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
              <CalendarIcon size={16} />
              Calendar
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}>
              <SettingsIcon size={16} />
              {user.role === 'officer' ? 'Settings' : 'My Profile'}
            </NavLink>

            {user.role === 'officer' && (
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
              onClick={() => setUser(null)} 
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
                placeholder="Search students, companies, or drives..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="header-actions">
              <NavLink to="/notifications" className="icon-btn">
                <Bell size={18} />
                <span className="icon-badge"></span>
              </NavLink>
              <NavLink to="/calendar" className="icon-btn">
                <CalendarIcon size={18} />
              </NavLink>
              
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
                        setUser(null);
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

          {/* Page Routing Contents (keyed by lastSync to force remount on cross-tab updates) */}
          <main className="main-content" key={lastSync}>
            <Routes>
              <Route path="/" element={user.role === 'officer' ? <Dashboard /> : <StudentDashboard studentId={user.id} />} />
              <Route path="/placements" element={user.role === 'officer' ? <Placements /> : <StudentJobs studentId={user.id} />} />
              
              {user.role === 'officer' && (
                <>
                  <Route path="/students" element={<Students />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/admin" element={<AdminPanel />} />
                </>
              )}

              <Route path="/companies" element={<Companies role={user.role} />} />
              <Route path="/applications" element={<Applications role={user.role} studentRollNo={user.id} />} />

              <Route path="/analytics" element={<Analytics role={user.role} />} />
              <Route path="/ai-assistant" element={user.role === 'officer' ? <AIAssistant /> : <StudentAIAssistant studentId={user.id} />} />
              <Route path="/notifications" element={<Notifications role={user.role} />} />
              <Route path="/calendar" element={<Calendar role={user.role} />} />
              <Route path="/settings" element={user.role === 'officer' ? <Settings /> : <StudentProfile studentId={user.id} />} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
