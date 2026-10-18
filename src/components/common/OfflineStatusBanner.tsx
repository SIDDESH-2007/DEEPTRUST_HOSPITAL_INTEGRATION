import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { WifiOff, RefreshCw, Database } from 'lucide-react';

export const OfflineStatusBanner: React.FC = () => {
  const {
    isOnline,
    offlineQueue,
    setIsQueueModalOpen,
    syncOfflineQueue,
  } = useHospital();

  // Show if offline or if there are items in the offline queue
  if (isOnline && offlineQueue.length === 0) {
    return null;
  }

  return (
    <aside aria-label="Offline status" className="fixed bottom-4 left-4 z-40 max-w-md animate-in slide-in-from-bottom-3 duration-300">
      <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl shadow-xl border backdrop-blur-md transition-all ${
        !isOnline
          ? 'bg-amber-500/95 text-white border-amber-400'
          : 'bg-blue-600/95 text-white border-blue-500'
      }`}>
        <div className="p-1.5 rounded-lg bg-black/20 shrink-0">
          {!isOnline ? (
            <WifiOff className="w-4 h-4 animate-pulse" />
          ) : (
            <Database className="w-4 h-4" />
          )}
        </div>

        <div className="min-w-0 pr-1">
          <div className="text-xs font-semibold leading-tight flex items-center gap-1.5">
            <span>{!isOnline ? 'Offline Mode Active' : 'Unsynced Local Changes'}</span>
            <span className="px-1.5 py-0.2 text-[10px] font-mono bg-black/20 rounded-full">
              {offlineQueue.length} queued
            </span>
          </div>
          <p className="text-[11px] text-white/90 truncate leading-tight mt-0.5">
            {!isOnline
              ? 'Changes cached locally in browser storage'
              : 'Connection active. Ready to sync with server'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isOnline && offlineQueue.length > 0 ? (
            <button
              onClick={syncOfflineQueue}
              className="px-2.5 py-1 text-xs font-semibold bg-white text-blue-700 hover:bg-blue-50 rounded-lg shadow-sm transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Sync</span>
            </button>
          ) : null}

          <button
            onClick={() => setIsQueueModalOpen(true)}
            className="px-2.5 py-1 text-xs font-medium bg-black/25 hover:bg-black/35 text-white rounded-lg transition-colors"
          >
            Manage
          </button>
        </div>
      </div>
    </aside>
  );
};
