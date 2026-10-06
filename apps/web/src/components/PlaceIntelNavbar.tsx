import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  isEnd?: boolean;
  isSpecial?: boolean;
}

interface PlaceIntelNavbarProps {
  navItems: NavItem[];
  userRoleLabel: string;
  userRoleIcon: string;
  userIdentifier: string;
  userSubIdentifier?: string;
  roleType: 'STUDENT' | 'ADMIN';
}

export function PlaceIntelNavbar({ 
  navItems, 
  userRoleLabel, 
  userRoleIcon,
  userIdentifier, 
  userSubIdentifier, 
  roleType 
}: PlaceIntelNavbarProps) {
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Distinct rounded inner navigation pill styling
  // Added whitespace-nowrap to prevent awkward wrapping of text like "Ask PlaceIntel"
  const navItemClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-1.5 px-4 py-1.5 rounded-full font-title-sm text-title-sm transition-all duration-200 whitespace-nowrap ${
      isActive 
        ? 'bg-[#07203F] text-white shadow-sm' 
        : 'bg-transparent text-[#667085] hover:text-[#07203F] hover:bg-surface-container-lowest'
    }`;

  const specialNavItemClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-1.5 px-4 py-1.5 rounded-full font-title-sm text-title-sm transition-all duration-200 whitespace-nowrap ${
      isActive 
        ? 'bg-[#07203F] text-white shadow-sm' 
        : 'bg-[#F5F3E1]/40 text-[#07203F] hover:bg-[#F5F3E1] border border-transparent'
    }`;

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[76px] bg-background z-50 flex items-center justify-center">
        {/* Full width container with controlled spacing. Uses a 3-zone flex layout */}
        <div className="w-full h-full px-6 xl:px-10 flex items-center justify-between gap-6 max-w-[1920px]">
          
          {/* =========================================
              LEFT ZONE: Branding
          ========================================= */}
          <div className="flex flex-1 items-center justify-start gap-4 min-w-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#07203F] flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-white text-[20px]">hub</span>
              </div>
              <span className="font-title-md text-title-md text-[#031024] tracking-tight hidden sm:block font-bold">PlaceIntel</span>
            </div>
            
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-[#667085] border border-surface-variant shrink-0 ml-2">
              <span className="material-symbols-outlined text-[16px]">{userRoleIcon}</span>
              <span className="font-label-uppercase text-[11px] tracking-wider font-semibold">{userRoleLabel}</span>
            </div>
          </div>
          
          {/* =========================================
              CENTER ZONE: Navigation Pill
          ========================================= */}
          <div className="flex-none flex items-center justify-center">
            <nav className="hidden xl:flex items-center gap-1 p-1.5 bg-surface-container-low border border-surface-container-high rounded-full shadow-inner">
              {navItems.map((item) => (
                <React.Fragment key={item.path}>
                  {item.isSpecial && <div className="w-px h-5 bg-surface-container-high mx-1"></div>}
                  <NavLink 
                    to={item.path} 
                    className={item.isSpecial ? specialNavItemClass : navItemClass} 
                    end={item.isEnd}
                  >
                    {item.icon && <span className="material-symbols-outlined text-[16px]">{item.icon}</span>}
                    {item.label}
                  </NavLink>
                </React.Fragment>
              ))}
            </nav>
            {/* Fallback for lg screens (tablet/small desktop) to avoid collision */}
            <nav className="hidden lg:flex xl:hidden items-center gap-0.5 p-1 bg-surface-container-low border border-surface-container-high rounded-full shadow-inner">
              {navItems.map((item) => (
                <React.Fragment key={item.path}>
                  {item.isSpecial && <div className="w-px h-5 bg-surface-container-high mx-0.5"></div>}
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `flex items-center gap-1 px-3 py-1.5 rounded-full font-title-sm text-[13px] transition-all duration-200 whitespace-nowrap ${isActive ? 'bg-[#07203F] text-white' : 'text-[#667085] hover:bg-surface-container-lowest hover:text-[#07203F]'}`}
                    end={item.isEnd}
                  >
                    {item.icon && <span className="material-symbols-outlined text-[14px]">{item.icon}</span>}
                    {item.label}
                  </NavLink>
                </React.Fragment>
              ))}
            </nav>
          </div>
          
          {/* =========================================
              RIGHT ZONE: Account Controls
          ========================================= */}
          <div className="flex flex-1 items-center justify-end min-w-0">
            <div className="flex items-center gap-4">
              
              {/* Settings / Profile Icons */}
              {roleType === 'STUDENT' && (
                <div className="hidden lg:flex items-center gap-2">
                  <NavLink to="/profile" className={({ isActive }) => `w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-[#07203F]/10 text-[#07203F]' : 'text-[#667085] hover:bg-surface-container-low hover:text-[#07203F]'}`} title="Profile">
                     <span className="material-symbols-outlined text-[20px]">badge</span>
                  </NavLink>
                  <NavLink to="/settings" className={({ isActive }) => `w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-[#07203F]/10 text-[#07203F]' : 'text-[#667085] hover:bg-surface-container-low hover:text-[#07203F]'}`} title="Settings">
                     <span className="material-symbols-outlined text-[20px]">settings</span>
                  </NavLink>
                </div>
              )}
              
              {roleType === 'ADMIN' && (
                <div className="hidden lg:flex items-center gap-2">
                  <NavLink to="/settings" className={({ isActive }) => `w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-[#07203F]/10 text-[#07203F]' : 'text-[#667085] hover:bg-surface-container-low hover:text-[#07203F]'}`} title="Settings">
                     <span className="material-symbols-outlined text-[20px]">settings</span>
                  </NavLink>
                </div>
              )}

              {/* Vertical Divider */}
              <div className="hidden lg:block w-px h-8 bg-surface-container-high mx-2"></div>

              {/* User Identity */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="font-title-sm text-title-sm text-[#031024] leading-none truncate max-w-[160px] font-bold">{userIdentifier}</span>
                  {userSubIdentifier && (
                    <span className="font-label-regular text-[12px] text-[#667085] truncate max-w-[160px] mt-1">
                      {userSubIdentifier}
                    </span>
                  )}
                </div>
                <div className="w-10 h-10 rounded-full bg-[#07203F] flex items-center justify-center text-white font-title-sm shadow-sm shrink-0 font-bold border-2 border-surface-container-lowest outline outline-1 outline-surface-container-high">
                  {roleType === 'ADMIN' ? (
                    <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                  ) : (
                    getInitials(userIdentifier)
                  )}
                </div>
              </div>
              
              {/* Logout Action */}
              <button 
                onClick={logout}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-[#667085] hover:bg-[#FFF0F0] hover:text-[#B3261E] transition-colors shrink-0 ml-2 border border-transparent hover:border-[#F9DEDC]"
                title="Logout"
              >
                <span className="material-symbols-outlined text-[22px]">logout</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low text-[#667085] hover:bg-surface-container-high shrink-0 ml-1 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[76px] left-0 right-0 bg-surface-container-lowest border-b border-surface-container shadow-xl z-40 p-4 flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-76px)]">
          <div className="bg-surface-container-low rounded-2xl p-2 flex flex-col gap-1">
            {navItems.map((item) => (
              <React.Fragment key={item.path}>
                {item.isSpecial && <div className="h-px bg-surface-container w-full my-2"></div>}
                <NavLink 
                  to={item.path} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-3.5 rounded-xl font-title-md text-title-md transition-colors ${
                    isActive ? 'bg-[#07203F] text-white font-bold' : 'text-[#667085] hover:bg-surface-container-lowest hover:text-[#07203F]'
                  }`}
                  end={item.isEnd}
                >
                  {item.icon && <span className="material-symbols-outlined text-[22px]">{item.icon}</span>}
                  {item.label}
                </NavLink>
              </React.Fragment>
            ))}
          </div>
          
          <div className="h-px bg-surface-container w-full my-3"></div>
          
          <div className="flex flex-col gap-1">
            {roleType === 'STUDENT' && (
              <>
                <NavLink to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-title-sm text-title-sm text-[#667085] hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-[20px]">badge</span> Profile
                </NavLink>
              </>
            )}
            <NavLink to="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-title-sm text-title-sm text-[#667085] hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-[20px]">settings</span> Settings
            </NavLink>
          </div>
          
          <div className="h-px bg-surface-container w-full my-3"></div>
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl font-title-sm text-title-sm text-[#B3261E] hover:bg-[#FFF0F0] text-left w-full transition-colors">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
        </div>
      )}
    </>
  );
}
