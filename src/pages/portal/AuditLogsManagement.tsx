import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { History, Shield, Lock, Search, Filter } from 'lucide-react';

export const AuditLogsManagement: React.FC = () => {
  const { auditLogs } = useHospital();
  const [search, setSearch] = useState('');

  const filteredLogs = auditLogs.filter(log =>
    log.user.toLowerCase().includes(search.toLowerCase()) ||
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.module.toLowerCase().includes(search.toLowerCase()) ||
    log.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Information Security & Access Audit Trail
        </h1>
        <p className="text-xs text-slate-500">
          Immutable event telemetry tracking user logins, electronic prescription issuances, vitals logging, and medical data access.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs flex items-center justify-between text-blue-900 dark:text-blue-200">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <span>Security Protocol: All electronic protected health information (ePHI) modifications are timestamped with operator credentials.</span>
        </div>
        <span className="font-mono text-[10px] text-blue-700 dark:text-blue-300">Retention: 7 Years</span>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
        <div className="relative max-w-sm text-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search audit trail by actor, module or action..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-semibold">
                <th className="py-2.5">Log Ref</th>
                <th className="py-2.5">Timestamp</th>
                <th className="py-2.5">Actor / User</th>
                <th className="py-2.5">Role</th>
                <th className="py-2.5">Action Executed</th>
                <th className="py-2.5">Module</th>
                <th className="py-2.5">Audit Event Details</th>
                <th className="py-2.5 text-right">Workstation IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-mono font-bold text-slate-500">{log.id}</td>
                  <td className="py-3 font-mono text-slate-500 text-[11px]">{log.timestamp}</td>
                  <td className="py-3 font-bold text-slate-900 dark:text-slate-100">{log.user}</td>
                  <td className="py-3">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3 font-medium text-slate-800 dark:text-slate-200">{log.action}</td>
                  <td className="py-3 text-slate-500">{log.module}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-400 max-w-sm truncate">{log.details}</td>
                  <td className="py-3 text-right font-mono text-[11px] text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
