import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useHospital();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
        let borderColor = 'border-emerald-200 dark:border-emerald-800/60';
        let bgLight = 'bg-white dark:bg-slate-900';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />;
          borderColor = 'border-rose-200 dark:border-rose-800/60';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />;
          borderColor = 'border-amber-200 dark:border-amber-800/60';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />;
          borderColor = 'border-cyan-200 dark:border-cyan-800/60';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-lg ${bgLight} ${borderColor} transition-all duration-200 ease-out`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  {toast.title}
                </h4>
              )}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
