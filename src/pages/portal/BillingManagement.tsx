import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  CreditCard,
  Plus,
  Printer,
  DollarSign,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { BillingInvoice } from '../../types';

export const BillingManagement: React.FC = () => {
  const {
    billing,
    setSelectedInvoice,
    recordPayment,
    setSelectedPatientId,
  } = useHospital();

  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredInvoices = billing.filter(b => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return b.patientName.toLowerCase().includes(q) || b.id.toLowerCase().includes(q);
    }
    return true;
  });

  const totalBilled = billing.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalPaid = billing.reduce((sum, b) => sum + b.paidAmount, 0);
  const totalOutstanding = billing.reduce((sum, b) => sum + b.balanceDue, 0);

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Hospital Billing, Invoicing & Patient Accounting
          </h1>
          <p className="text-xs text-slate-500">
            Itemized clinical charges, automated insurance clearing, and receipt ledger.
          </p>
        </div>
      </div>

      {/* 3 Accounting Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Total Invoiced Amount</span>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            ${totalBilled.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500">Across {billing.length} issued statements</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-emerald-600 dark:text-emerald-400">Collected Receipts</span>
          <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            ${totalPaid.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">Direct card & insurance settlements</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-rose-600 dark:text-rose-400">Receivable Balance</span>
          <div className="text-xl font-bold font-mono text-rose-600 dark:text-rose-400 tabular-nums">
            ${totalOutstanding.toLocaleString()}
          </div>
          <div className="text-[10px] text-rose-600 font-medium">Outstanding patient balances</div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-3 text-xs">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by invoice (INV-9021) or patient name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-semibold">Filter:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Invoices</option>
              <option value="Paid">Paid</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Pending">Pending</option>
              <option value="Insurance Processing">Insurance Processing</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-semibold">
                <th className="py-2.5">Invoice ID</th>
                <th className="py-2.5">Patient Details</th>
                <th className="py-2.5">Invoice Date</th>
                <th className="py-2.5 text-right">Subtotal</th>
                <th className="py-2.5 text-right">Insurance Adj</th>
                <th className="py-2.5 text-right">Total Net</th>
                <th className="py-2.5 text-right">Paid</th>
                <th className="py-2.5 text-right">Balance Due</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {inv.id}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => setSelectedPatientId(inv.patientId)}
                      className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 text-left"
                    >
                      {inv.patientName}
                    </button>
                    <div className="text-[10px] text-slate-400 font-mono">{inv.patientId}</div>
                  </td>
                  <td className="py-3 font-mono text-slate-500">
                    {inv.invoiceDate}
                  </td>
                  <td className="py-3 text-right font-mono tabular-nums text-slate-600 dark:text-slate-300">
                    ${inv.subtotal.toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-mono tabular-nums text-blue-600 dark:text-blue-400">
                    -${inv.insuranceCoveredAmount.toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-mono font-bold tabular-nums text-slate-900 dark:text-slate-100">
                    ${inv.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-mono tabular-nums text-emerald-600 dark:text-emerald-400 font-medium">
                    ${inv.paidAmount.toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-mono font-bold tabular-nums text-rose-600 dark:text-rose-400">
                    ${inv.balanceDue.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      inv.status === 'Partially Paid' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950 hover:bg-blue-100 text-blue-600 dark:text-blue-400 rounded text-[11px] font-semibold transition-colors"
                    >
                      View Invoice
                    </button>
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
