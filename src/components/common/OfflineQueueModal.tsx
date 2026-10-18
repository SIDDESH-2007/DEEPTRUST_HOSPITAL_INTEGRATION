import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  X,
  Wifi,
  WifiOff,
  RefreshCw,
  Trash2,
  Clock,
  Database,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  Pill,
  HeartPulse,
  Bed,
  CreditCard,
  FlaskConical,
  Ambulance,
  HardDrive
} from 'lucide-react';
import { QueuedChange } from '../../types';

export const OfflineQueueModal: React.FC = () => {
  const {
    isQueueModalOpen,
    setIsQueueModalOpen,
    isOnline,
    setIsOnline,
    offlineQueue,
    syncOfflineQueue,
    clearOfflineQueue,
    lastSyncTimestamp,
    patients,
    appointments,
    prescriptions,
    vitals,
    labTests,
    billing,
    beds,
  } = useHospital();

  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  if (!isQueueModalOpen) return null;

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      syncOfflineQueue();
      setIsSyncing(false);
    }, 600);
  };

  const getEntityIcon = (entity: QueuedChange['entity']) => {
    switch (entity) {
      case 'patient': return <User className="w-4 h-4 text-blue-500" />;
      case 'appointment': return <Calendar className="w-4 h-4 text-indigo-500" />;
      case 'prescription': return <Pill className="w-4 h-4 text-teal-500" />;
      case 'vitals': return <HeartPulse className="w-4 h-4 text-rose-500" />;
      case 'bed': return <Bed className="w-4 h-4 text-purple-500" />;
      case 'billing': return <CreditCard className="w-4 h-4 text-emerald-500" />;
      case 'lab': return <FlaskConical className="w-4 h-4 text-amber-500" />;
      case 'ambulance': return <Ambulance className="w-4 h-4 text-red-500" />;
      default: return <Database className="w-4 h-4 text-slate-500" />;
    }
  };

  const getEntityBadgeClass = (entity: QueuedChange['entity']) => {
    switch (entity) {
      case 'patient': return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900';
      case 'appointment': return 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900';
      case 'prescription': return 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-900';
      case 'vitals': return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900';
      case 'bed': return 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900';
      case 'billing': return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900';
      case 'lab': return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900';
      case 'ambulance': return 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isOnline 
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' 
                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
            }`}>
              {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Offline Storage & Sync Center
                </h3>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${
                  isOnline 
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                  {isOnline ? 'Online' : 'Offline Mode'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Local-first caching layer with automatic change synchronization
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsQueueModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Status Bar & Simulation Switch */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span>Network Connection Status</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  (Auto-detected via Navigator API)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Last synced: <strong className="text-slate-700 dark:text-slate-200">{lastSyncTimestamp || 'Never'}</strong>
                </span>
                <span>•</span>
                <span>
                  Queued changes: <strong className="text-blue-600 dark:text-blue-400">{offlineQueue.length}</strong>
                </span>
              </div>
            </div>

            {/* Offline Simulation Toggle for interactive testing */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Simulate Offline:
              </span>
              <button
                type="button"
                onClick={() => setIsOnline(!isOnline)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  !isOnline ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                }`}
                role="switch"
                aria-checked={!isOnline}
                title="Toggle offline state to simulate working without network"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    !isOnline ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Queue Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Pending Offline Queue ({offlineQueue.length})
                </h4>
                {offlineQueue.length > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 rounded">
                    Unsynced
                  </span>
                )}
              </div>

              {offlineQueue.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearOfflineQueue}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors border border-transparent hover:border-rose-200 dark:hover:border-rose-900"
                    title="Discard all pending changes"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Queue</span>
                  </button>
                  <button
                    onClick={handleManualSync}
                    disabled={isSyncing}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>Sync Now</span>
                  </button>
                </div>
              )}
            </div>

            {offlineQueue.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/40 dark:bg-slate-900/40">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  All Records Synchronized
                </h5>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                  There are no pending offline mutations. When disconnected, any patient additions, bookings, vitals, or prescription entries will queue here automatically.
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => setIsOnline(false)}
                    className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 underline font-medium"
                  >
                    Test by toggling Offline Mode
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {offlineQueue.map(item => {
                  const isExpanded = expandedItemId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-white dark:bg-slate-900 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                            {getEntityIcon(item.entity)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                                {item.action}
                              </span>
                              <span className={`px-2 py-0.5 text-[10px] font-medium rounded-md border ${getEntityBadgeClass(item.entity)}`}>
                                {item.entity.toUpperCase()}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {item.timestamp}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 truncate">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded transition-colors shrink-0"
                          title={isExpanded ? 'Hide payload' : 'Inspect payload JSON'}
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Expandable JSON payload details */}
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                            <span>Queued Payload (Item ID: {item.id})</span>
                          </div>
                          <pre className="p-2.5 bg-slate-950 text-slate-200 rounded-lg text-[11px] font-mono overflow-x-auto max-h-40">
                            {JSON.stringify(item.payload, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* LocalStorage Cache Health Overview */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-slate-400" />
              <span>Offline Device Storage Cache</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="text-lg font-bold text-slate-800 dark:text-slate-100">{patients.length}</div>
                <div className="text-[11px] text-slate-500">Patients Cached</div>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="text-lg font-bold text-slate-800 dark:text-slate-100">{appointments.length}</div>
                <div className="text-[11px] text-slate-500">Appointments</div>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="text-lg font-bold text-slate-800 dark:text-slate-100">{prescriptions.length}</div>
                <div className="text-[11px] text-slate-500">Prescriptions</div>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="text-lg font-bold text-slate-800 dark:text-slate-100">{vitals.length}</div>
                <div className="text-[11px] text-slate-500">Vitals Logs</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
              All records, including {beds.length} beds, {billing.length} invoices, and {labTests.length} lab orders are cached locally in your browser storage for instant offline read/write access.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Encrypted local client storage active</span>
          </div>

          <div className="flex items-center gap-2">
            {offlineQueue.length > 0 && (
              <button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3.5 py-1.5 font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Sync {offlineQueue.length} Changes</span>
              </button>
            )}
            <button
              onClick={() => setIsQueueModalOpen(false)}
              className="px-3.5 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
