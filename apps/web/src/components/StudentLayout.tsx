import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getStudentData } from '../views/StudentViews';

export function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const student = user ? getStudentData(String(user.userId)) : null;
  const userName = student ? student.name : 'Harsh Patel';
  const userRoll = student ? String(user?.userId) : '21BCE042';
  const userBranch = student ? student.branch : 'B.Tech CSE';

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col">
          <div className="h-16 px-space-lg flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-surface-container-lowest text-[20px]">hub</span>
              </div>
              <span className="font-title-md text-title-md text-primary-container tracking-tight">PlaceIntel</span>
            </div>
            <span className="font-label-uppercase text-label-uppercase bg-secondary-fixed text-on-secondary-fixed px-space-xs py-space-xxs rounded-full">v2.5</span>
          </div>
          
          <div className="px-space-md py-space-xs">
            <nav className="flex flex-col gap-space-xxs">
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => `flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors ${isActive ? 'bg-primary-container text-on-primary font-title-sm' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
              >
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                <span className="font-title-sm text-title-sm">Dashboard / Overview</span>
              </NavLink>
              
              <NavLink 
                to="/placements" 
                className={({ isActive }) => `flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors ${isActive ? 'bg-primary-container text-on-primary font-title-sm' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
              >
                <span className="material-symbols-outlined text-[20px]">search_insights</span>
                <span className="font-title-sm text-title-sm">Job Discovery</span>
              </NavLink>
              
              <NavLink 
                to="/profile" 
                className={({ isActive }) => `flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors ${isActive ? 'bg-primary-container text-on-primary font-title-sm' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
              >
                <span className="material-symbols-outlined text-[20px]">badge</span>
                <span className="font-title-sm text-title-sm">Profile</span>
              </NavLink>
              
              <NavLink 
                to="/ask-placeintel" 
                className={({ isActive }) => `flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors ${isActive ? 'bg-primary-container text-on-primary font-title-sm' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
              >
                <span className="material-symbols-outlined text-[20px]">psychology</span>
                <span className="font-title-sm text-title-sm">Ask PlaceIntel</span>
              </NavLink>


              <NavLink 
                to="/settings" 
                className={({ isActive }) => `flex items-center gap-space-sm px-space-sm py-space-xs rounded-lg transition-colors ${isActive ? 'bg-primary-container text-on-primary font-title-sm' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}
              >
                <span className="material-symbols-outlined text-[20px]">settings</span>
                <span className="font-title-sm text-title-sm">Settings</span>
              </NavLink>
            </nav>
          </div>
        </div>
        
        <div className="p-space-md m-space-md rounded-xl bg-surface-container-low">
          <div className="flex items-center gap-space-xs mb-space-xxs">
            <div className="w-2 h-2 rounded-full bg-primary-container"></div>
            <span className="font-label-uppercase text-label-uppercase text-primary-container">Institutional Node</span>
          </div>
          <p className="font-body-sm text-body-sm text-secondary">CHARUSAT Placement Cell</p>
          <p className="font-label-regular text-label-regular text-outline">Session 2025-26 active</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-72 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="w-full h-full px-space-xl flex items-center justify-between">
            <div className="flex items-center gap-space-lg">
              <div className="flex items-center gap-space-xs px-space-sm py-space-xxs rounded-full bg-secondary-fixed text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[16px]">school</span>
                <span className="font-label-uppercase text-label-uppercase">Student Candidate</span>
              </div>
              
              <div className="relative flex items-center w-72">
                <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">search</span>
                <input 
                  className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest" 
                  placeholder="Search opportunities, cohorts..." 
                  type="text" 
                />
              </div>
              
              <nav className="hidden xl:flex items-center gap-space-lg">
                <NavLink to="/" className={({ isActive }) => `font-body-sm text-body-sm transition-colors ${isActive ? 'text-primary-container font-title-sm' : 'text-on-surface-variant hover:text-on-surface'}`} end>Overview</NavLink>
                <NavLink to="/placements" className={({ isActive }) => `font-body-sm text-body-sm transition-colors ${isActive ? 'text-primary-container font-title-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Opportunities</NavLink>
                <NavLink to="/companies" className={({ isActive }) => `font-body-sm text-body-sm transition-colors ${isActive ? 'text-primary-container font-title-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Companies</NavLink>
                <NavLink to="/ask-placeintel" className={({ isActive }) => `font-body-sm text-body-sm transition-colors ${isActive ? 'text-primary-container font-title-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>Intelligence</NavLink>
              </nav>
            </div>
            
            <div className="flex items-center gap-space-md">

              <div className="flex items-center gap-space-sm pl-space-sm">
                <div className="flex flex-col text-right">
                  <span className="font-title-sm text-title-sm text-primary-container leading-none">{userName}</span>
                  <span className="font-label-regular text-label-regular text-secondary">{userRoll} &bull; {userBranch}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content Render */}
        <main className="w-full pt-16 bg-background flex-grow">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="w-full bg-surface-container-lowest py-space-sm px-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="w-full flex items-center justify-between text-secondary font-label-regular text-label-regular">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              <span>System Active &bull; Academic Session 2025-26</span>
            </div>
            <span>CHARUSAT University Placement Cell &bull; Institutional Intelligence Division</span>
          </div>
        </footer>
        
      </div>
    </div>
  );
}
