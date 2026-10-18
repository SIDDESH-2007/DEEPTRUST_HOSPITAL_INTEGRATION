import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface Props {
  variant?: 'floating' | 'inline' | 'header';
  className?: string;
}

export const ProtectedByDeepTrustBadge: React.FC<Props> = ({
  variant = 'floating',
  className = ''
}) => {
  const [status, setStatus] = useState<{
    configured: boolean;
    connected: boolean;
    loading: boolean;
  }>({
    configured: true,
    connected: true,
    loading: true,
  });

  useEffect(() => {
    let mounted = true;

    const checkDeepTrustHealth = async () => {
      try {
        const res = await fetch('/api/health/deeptrust-status');
        if (res.ok) {
          const data = await res.json();
          if (mounted) {
            setStatus({
              configured: data.configured ?? true,
              connected: data.connected ?? false,
              loading: false,
            });
          }
        } else {
          if (mounted) {
            setStatus({ configured: true, connected: false, loading: false });
          }
        }
      } catch (err) {
        if (mounted) {
          setStatus({ configured: true, connected: false, loading: false });
        }
      }
    };

    checkDeepTrustHealth();
    const interval = setInterval(checkDeepTrustHealth, 15000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const isOnline = status.connected;

  if (variant === 'header') {
    return (
      <div
        id="deeptrust-header-trust-indicator"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
          isOnline
            ? 'bg-blue-950/70 border border-blue-600/40 text-blue-200'
            : 'bg-amber-950/60 border border-amber-600/40 text-amber-200'
        } ${className}`}
        title={
          isOnline
            ? 'Zero-Trust Identity & Access Security Active via DeepTrust'
            : 'DeepTrust Security Gateway Connection Unavailable'
        }
      >
        {isOnline ? (
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        ) : (
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        )}
        <span className="flex items-center gap-1">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
          />
          <span className="truncate">
            {isOnline ? 'Protected with DeepTrust' : 'DeepTrust — Unavailable'}
          </span>
        </span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        id="deeptrust-inline-trust-indicator"
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 border border-slate-700/60 text-slate-200 transition-all ${className}`}
      >
        {isOnline ? (
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : (
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
        )}
        <span className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isOnline ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]' : 'bg-amber-400'
            }`}
          />
          <span className="text-slate-300">
            {isOnline
              ? 'Protected with DeepTrust'
              : 'DeepTrust Protection — Connection Unavailable'}
          </span>
        </span>
      </div>
    );
  }

  // Floating bottom-left badge
  return (
    <div
      id="deeptrust-floating-badge"
      className={`fixed bottom-4 left-4 z-40 max-w-[90vw] sm:max-w-xs transition-transform duration-200 hover:scale-[1.02] ${className}`}
    >
      <div
        className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium shadow-lg backdrop-blur-md border flex items-center gap-2 ${
          isOnline
            ? 'bg-slate-900/90 border-blue-600/30 text-slate-100 shadow-blue-950/40'
            : 'bg-slate-900/90 border-amber-500/30 text-amber-200 shadow-amber-950/40'
        }`}
      >
        {isOnline ? (
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        ) : (
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        )}
        <span className="flex items-center gap-1.5 truncate">
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              isOnline ? 'bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.9)]' : 'bg-amber-400'
            }`}
          />
          <span className="truncate">
            {isOnline
              ? 'Protected with DeepTrust'
              : 'DeepTrust Protection — Connection Unavailable'}
          </span>
        </span>
      </div>
    </div>
  );
};
