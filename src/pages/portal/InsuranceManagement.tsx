import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { ShieldCheck, CheckCircle2, Clock, XCircle, Search, FileText } from 'lucide-react';

export const InsuranceManagement: React.FC = () => {
  const { insuranceClaims, setSelectedPatientId } = useHospital();
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = insuranceClaims.filter(c => statusFilter === 'all' || c.status === statusFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Insurance Claims & Third-Party Administrator (TPA) Desk
        </h1>
        <p className="text-xs text-slate-500">
          Pre-authorizations, electronic insurance clearance, and payer reimbursement status.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3 text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Claims Registry</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            <option value="all">All Claims</option>
            <option value="Approved">Approved</option>
            <option value="Under Review">Under Review</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-semibold">
                <th className="py-2.5">Claim Ref</th>
                <th className="py-2.5">Insurance Provider</th>
                <th className="py-2.5">Policy Number</th>
                <th className="py-2.5">Patient Details</th>
                <th className="py-2.5 text-right">Claimed ($)</th>
                <th className="py-2.5 text-right">Approved ($)</th>
                <th className="py-2.5">Submission Date</th>
                <th className="py-2.5">Claim Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-mono font-bold text-blue-600 dark:text-blue-400">{c.id}</td>
                  <td className="py-3 font-semibold text-slate-900 dark:text-slate-100">{c.provider}</td>
                  <td className="py-3 font-mono text-slate-500">{c.policyNumber}</td>
                  <td className="py-3">
                    <button
                      onClick={() => setSelectedPatientId(c.patientId)}
                      className="font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 text-left"
                    >
                      {c.patientName}
                    </button>
                  </td>
                  <td className="py-3 text-right font-mono tabular-nums text-slate-800 dark:text-slate-200 font-semibold">
                    ${c.claimAmount.toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-mono tabular-nums text-emerald-600 dark:text-emerald-400 font-bold">
                    ${c.approvedAmount.toLocaleString()}
                  </td>
                  <td className="py-3 font-mono text-slate-500">{c.submissionDate}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      c.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                      c.status === 'Under Review' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
