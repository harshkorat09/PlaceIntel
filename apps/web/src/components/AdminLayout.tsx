import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PlaceIntelNavbar, type NavItem } from './PlaceIntelNavbar';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  // Real data only
  const userRole = user?.role === 'ADMIN' ? 'System Admin' : 'Placement Officer';
  const userEmail = user?.email || 'Admin';

  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/', isEnd: true },
    { label: 'Placement Drives', path: '/placements' },
    { label: 'Companies', path: '/companies' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Skills', path: '/skills' },
    { label: 'Branches', path: '/branches' },
    { label: 'Assistant', path: '/ai-assistant', icon: 'psychology', isSpecial: true },
  ];

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col w-full overflow-x-hidden relative">
      <PlaceIntelNavbar 
        navItems={navItems}
        userRoleLabel={userRole}
        userRoleIcon="shield"
        userIdentifier={userEmail}
        userSubIdentifier={userRole}
        roleType="ADMIN"
      />
      
      {/* Main Content Area */}
      <main className="w-full pt-24 px-4 sm:px-6 lg:px-8 pb-8 flex-grow flex flex-col bg-background">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest py-4 px-4 sm:px-6 lg:px-8 border-t border-surface-container mt-auto relative z-10">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between text-secondary font-label-regular text-xs gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            <span>System Active &bull; Admin Operations</span>
          </div>
          <span>PlaceIntel Institutional Intelligence</span>
        </div>
      </footer>
    </div>
  );
}
