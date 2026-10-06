import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import views
import Dashboard from './views/Dashboard';
import Placements from './views/Placements';
import Companies from './views/Companies';
import Analytics from './views/Analytics';
import AIAssistant from './views/AIAssistant';
import Settings from './views/Settings';
import Skills from './views/Skills';
import Branches from './views/Branches';
import Auth from './views/Auth';
import { StudentDashboard } from './views/StudentViews';
import { StudentJobs } from './views/StudentJobs';
import { StudentJobDetails } from './views/StudentJobDetails';
import { StudentProfile } from './views/StudentProfile';
import { StudentSettings } from './views/StudentSettings';
import { StudentCompanies } from './views/StudentCompanies';
import { StudentCompanyDetails } from './views/StudentCompanyDetails';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import { StudentLayout } from './components/StudentLayout';
import { AdminLayout } from './components/AdminLayout';
function DashboardLayout() {
  const { user } = useAuth();


  if (user?.role === 'STUDENT') {
    return (
      <StudentLayout>
        <Routes>
          <Route path="/" element={<StudentDashboard studentId={String(user.userId)} />} />
          <Route path="/placements" element={<StudentJobs />} />
          <Route path="/placements/:id" element={<StudentJobDetails studentId={String(user.userId)} />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/settings" element={<StudentSettings />} />
          <Route path="/companies" element={<StudentCompanies />} />
          <Route path="/companies/:id" element={<StudentCompanyDetails />} />
          <Route path="/ask-placeintel" element={<AIAssistant />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </StudentLayout>
    );
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/placements" element={<ProtectedRoute><Placements /></ProtectedRoute>} />
        <Route path="/skills" element={<ProtectedRoute requireAdmin><Skills /></ProtectedRoute>} />
        <Route path="/branches" element={<ProtectedRoute requireAdmin><Branches /></ProtectedRoute>} />
        <Route path="/companies" element={<ProtectedRoute><Companies /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AdminLayout>
  );
}

import Landing from './views/Landing';
import Signup from './views/Signup';

function AppContent() {
  return (
    <Routes>
      <Route path="/welcome" element={<Landing />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Signup />} />
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
