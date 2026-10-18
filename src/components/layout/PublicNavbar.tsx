import React, { useState } from 'react';
import { useHospital, PublicPage } from '../../context/HospitalContext';
import { PhoneCall, Moon, Sun, Menu, X, ArrowRight, ShieldCheck, HeartPulse, Wifi, WifiOff } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const {
    hospitalConfig,
    publicPage,
    setPublicPage,
    setIsInPortal,
    isDarkMode,
    toggleDarkMode,
    setIsBookModalOpen,
    isOnline,
    offlineQueue,
    setIsQueueModalOpen,
  } = useHospital();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PublicPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'departments', label: 'Departments' },
    { id: 'doctors', label: 'Specialists' },
    { id: 'services', label: 'Services' },
    { id: 'emergency', label: 'Emergency' },
    { id: 'packages', label: 'Health Packages' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Emergency & Quick Info Top Ribbon */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
              <PhoneCall className="w-3 h-3 animate-pulse" />
              24/7 Emergency Trauma Hotline: {hospitalConfig.emergencyPhone}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">
              General Inquiries: {hospitalConfig.phone}
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>{hospitalConfig.traumaLevel}</span>
            <span>·</span>
            <span>Joint Commission Accredited</span>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setPublicPage('home')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-blue-700 transition-colors">
            <HeartPulse className="w-5 h-5" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {hospitalConfig.name}
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map(link => {
            const isActive = publicPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setPublicPage(link.id)}
                className={`transition-colors hover:text-blue-600 dark:hover:text-blue-400 py-1 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                    : ''
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions + theme switch + offline queue */}
        <div className="flex items-center gap-2">
          {/* Offline/Network Sync status */}
          <button
            onClick={() => setIsQueueModalOpen(true)}
            className={`p-2 rounded-lg transition-colors relative ${
              !isOnline
                ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400'
                : offlineQueue.length > 0
                ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={!isOnline ? `Offline Mode: ${offlineQueue.length} queued changes` : `Network Online: ${offlineQueue.length} queued changes`}
            aria-label="Offline Sync Status"
          >
            {!isOnline ? <WifiOff className="w-4 h-4 text-amber-500" /> : <Wifi className="w-4 h-4 text-emerald-500" />}
            {offlineQueue.length > 0 && (
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            )}
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsBookModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
          >
            Book Appointment
          </button>

          <button
            onClick={() => setPublicPage('login')}
            className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
          >
            <span>Staff / Patient Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => {
                setPublicPage(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium ${
                publicPage === link.id
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsBookModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-3 py-2 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 rounded-lg"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
