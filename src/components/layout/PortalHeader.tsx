import { ProtectedByDeepTrustBadge } from '../common/ProtectedByDeepTrustBadge';
import React, { useState } from 'react';
import { useHospital, PortalSection } from '../../context/HospitalContext';
import {
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  Globe,
  ChevronDown,
  Shield,
  User,
  Menu,
  Wifi,
  WifiOff
} from 'lucide-react';

interface PortalHeaderProps {
  onToggleMobileSidebar: () => void;
  onOpenNotifications: () => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  onToggleMobileSidebar,
  onOpenNotifications,
}) => {
  const {
    hospitalConfig,
    portalSection,
    setPortalSection,
    setIsInPortal,
    currentRole,
    currentUser,
    logout,
    isDarkMode,
    toggleDarkMode,
    setIsSearchOpen,
    notifications,
    isOnline,
    offlineQueue,
    setIsQueueModalOpen,
  } = useHospital();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const sectionTitles: Record<PortalSection, string> = {
    dashboard: 'Clinical & Operational Dashboard',
    patients: 'Patient Directory & Electronic Medical Records',
    doctors: 'Specialists & Medical Staff Directory',
    nurses: 'Nursing Stations & Patient Care Units',
    appointments: 'Consultation Scheduling & Triage Queue',
    departments: 'Clinical Institutes & Departmental Wards',
    emergency: 'Level I Emergency & Resuscitation Center',
    admissions: 'Inpatient Admissions & Discharges',
    beds: 'Real-time Ward & Bed Management',
    opd: 'Outpatient Token Queue (OPD)',
    ipd: 'Inpatient Department (IPD) Registry',
    laboratory: 'Pathology & Diagnostic Laboratory Worklist',
    radiology: 'Medical Imaging & Radiology PACS',
    pharmacy: 'Clinical Pharmacy & Formulary Inventory',
    prescriptions: 'Electronic Medical Prescriptions (e-Rx)',
    billing: 'Hospital Billing, Invoicing & Direct Payments',
    insurance: 'Insurance Claims & Third-Party Clearances',
    inventory: 'Biomedical & Consumable Inventory Control',
    blood_bank: 'Blood Bank Registry & Transfusion Units',
    operation_theatre: 'Surgical Suites & Operation Theatre (OT)',
    ambulance: 'Emergency Fleet & Mobile ICU Dispatch',
    staff: 'Human Resources & Shift Roster Management',
    reports: 'Clinical & Administrative Reports Center',
    analytics: 'Healthcare Performance & Operational Analytics',
    notifications: 'Hospital Incident & Alert Center',
    audit_logs: 'Information Security & HIPAA Audit Trail',
    settings: 'Organization Configuration & Hospital Master',
    profile: 'Staff Profile & Security Preferences',
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      
      {/* Left zone: Mobile toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 lg:hidden"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Clean Breadcrumb Navigation */}
        <div className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-200 hidden sm:inline">
            {hospitalConfig.shortName} Portal
          </span>
          <span className="mx-2 text-slate-400 hidden sm:inline">/</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {sectionTitles[portalSection] || 'Portal'}
          </span>
        </div>
      </div>

      {/* Right zone: Search, Role Switcher, Notifications, Theme, User Profile */}
      <div className="flex items-center gap-2">
        <ProtectedByDeepTrustBadge variant="header" className="hidden md:inline-flex" />
        
        {/* Global Search button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800/80 rounded-lg hover:text-slate-600 dark:hover:text-slate-200 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="truncate max-w-[130px]">Search records...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-400">
            âŒ˜K
          </kbd>
        </button>

        {/* Offline / Network Sync Status Button */}
        <button
          onClick={() => setIsQueueModalOpen(true)}
          className={`relative flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg transition-colors border ${
            !isOnline
              ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800 hover:bg-amber-100'
              : offlineQueue.length > 0
              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800 hover:bg-blue-100'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title={!isOnline ? `Offline Mode: ${offlineQueue.length} queued changes` : `Network Online: ${offlineQueue.length} queued changes`}
          aria-label="Offline Sync Status"
        >
          {!isOnline ? (
            <WifiOff className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          ) : (
            <Wifi className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          )}
          <span className="hidden sm:inline font-medium">
            {!isOnline ? 'Offline' : 'Online'}
          </span>
          {offlineQueue.length > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-500 text-white">
              {offlineQueue.length}
            </span>
          )}
        </button>

        {/* Notifications Icon Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Incident Alerts & Notifications"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          )}
        </button>

        {/* Dark/Light mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Switch to Public Website */}
        <button
          onClick={() => {
            setIsInPortal(false);
          }}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          title="View Public Hospital Website"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Public Site</span>
        </button>

        {/* User Account Menu */}
        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-semibold text-xs flex items-center justify-center">
              {currentUser.avatarInitials}
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">
                {currentUser.id}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="font-semibold text-slate-900 dark:text-slate-100">{currentUser.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {currentUser.id}
                  </span>
                  <span className="text-[10px] text-teal-600 dark:text-teal-400 capitalize">
                    {currentUser.role.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setPortalSection('profile');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full px-3 py-1.5 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  My Clinical Profile
                </button>
                {currentRole === 'admin' && (
                  <button
                    onClick={() => {
                      setPortalSection('settings');
                      setProfileMenuOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    Hospital Settings
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsInPortal(false);
                    setProfileMenuOpen(false);
                  }}
                  className="w-full px-3 py-1.5 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  Exit to Public Website
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    logout();
                  }}
                  className="w-full px-3 py-1.5 text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Secure Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

