import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { X, Bell, CheckCheck, Siren, Calendar, FlaskConical, Pill, ShieldAlert, ArrowRight } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ open, onClose }) => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setPortalSection,
  } = useHospital();

  const [activeFilter, setActiveFilter] = useState<'all' | 'emergency' | 'appointment' | 'lab' | 'pharmacy'>('all');

  if (!open) return null;

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    return n.category === activeFilter;
  });

  const getIcon = (cat: NotificationItem['category']) => {
    switch (cat) {
      case 'emergency': return <Siren className="w-4 h-4 text-rose-500" />;
      case 'appointment': return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'lab': return <FlaskConical className="w-4 h-4 text-teal-500" />;
      case 'pharmacy': return <Pill className="w-4 h-4 text-amber-500" />;
      default: return <ShieldAlert className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleAction = (item: NotificationItem) => {
    markNotificationRead(item.id);
    if (item.category === 'emergency') setPortalSection('emergency');
    else if (item.category === 'appointment') setPortalSection('appointments');
    else if (item.category === 'lab') setPortalSection('laboratory');
    else if (item.category === 'pharmacy') setPortalSection('pharmacy');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col z-10 text-xs">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Notification & Alert Center
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 p-1 flex items-center gap-1 text-[11px]"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1 p-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-[11px]">
          {(['all', 'emergency', 'appointment', 'lab', 'pharmacy'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-2.5 py-1 rounded capitalize whitespace-nowrap transition-colors ${
                activeFilter === tab
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 font-semibold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredNotifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              No notifications in this category.
            </div>
          ) : (
            filteredNotifications.map(item => (
              <div
                key={item.id}
                className={`p-3.5 rounded-lg border transition-all ${
                  !item.isRead
                    ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50'
                    : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">{getIcon(item.category)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-xs mt-1 leading-relaxed">
                      {item.message}
                    </p>
                    <div className="mt-2 flex items-center justify-between pt-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-400">
                        {item.category}
                      </span>
                      <button
                        onClick={() => handleAction(item)}
                        className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-medium hover:underline"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 text-center bg-slate-50 dark:bg-slate-800/30">
          Hospital Incident Notification Feed · Real-time Operational Telemetry
        </div>
      </div>
    </div>
  );
};
