import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { X, Printer, CreditCard, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';

export const InvoiceModal: React.FC = () => {
  const {
    selectedInvoice,
    setSelectedInvoice,
    hospitalConfig,
    recordPayment,
    currentRole,
  } = useHospital();

  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Insurance Direct' | 'Cash' | 'Online Banking'>('Card');
  const [showPayForm, setShowPayForm] = useState(false);

  if (!selectedInvoice) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(paymentAmount) || selectedInvoice.balanceDue;
    recordPayment(selectedInvoice.id, amt, paymentMethod);
    setShowPayForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Hospital Invoice Preview</span>
            <span className="text-slate-400">·</span>
            <span className="font-mono text-blue-600 dark:text-blue-400">{selectedInvoice.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Invoice
            </button>
            <button
              onClick={() => setSelectedInvoice(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Document Body */}
        <div className="p-8 space-y-6 text-slate-800 dark:text-slate-200">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  NC
                </div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {hospitalConfig.name}
                </h2>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 max-w-xs leading-relaxed">
                {hospitalConfig.address}, {hospitalConfig.city}<br />
                Phone: {hospitalConfig.phone} · License: {hospitalConfig.licenseNumber}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-400">Medical Billing Statement</span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
                {selectedInvoice.id}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Date: {selectedInvoice.invoiceDate} · Due: {selectedInvoice.dueDate}
              </div>
            </div>
          </div>

          {/* Patient and Insurance Meta */}
          <div className="grid grid-cols-2 gap-6 p-4 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Patient Details</span>
              <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 mt-0.5">{selectedInvoice.patientName}</p>
              <p className="text-slate-500 font-mono mt-0.5">ID: {selectedInvoice.patientId}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Payment Status</span>
              <div className="mt-1 flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded ${
                  selectedInvoice.status === 'Paid'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : selectedInvoice.status === 'Partially Paid'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {selectedInvoice.status}
                </span>
                {selectedInvoice.paymentMethod && (
                  <span className="text-slate-500 text-[11px] font-medium">via {selectedInvoice.paymentMethod}</span>
                )}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5">Service Description</th>
                  <th className="py-2.5">Category</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Unit Rate</th>
                  <th className="py-2.5 text-right">Line Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {selectedInvoice.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 font-medium text-slate-800 dark:text-slate-200">{item.description}</td>
                    <td className="py-3 text-slate-500">{item.category}</td>
                    <td className="py-3 text-center tabular-nums">{item.quantity}</td>
                    <td className="py-3 text-right font-mono tabular-nums">${item.unitPrice.toLocaleString()}</td>
                    <td className="py-3 text-right font-mono font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                      ${item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial summary calculations */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span className="font-mono tabular-nums">${selectedInvoice.subtotal.toLocaleString()}</span>
              </div>
              {selectedInvoice.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Courtesy Discount:</span>
                  <span className="font-mono tabular-nums">-${selectedInvoice.discount.toLocaleString()}</span>
                </div>
              )}
              {selectedInvoice.insuranceCoveredAmount > 0 && (
                <div className="flex justify-between text-blue-600 dark:text-blue-400">
                  <span>Insurance Adjustment:</span>
                  <span className="font-mono tabular-nums">-${selectedInvoice.insuranceCoveredAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between font-bold text-sm text-slate-900 dark:text-slate-100">
                <span>Total Invoice:</span>
                <span className="font-mono tabular-nums">${selectedInvoice.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Amount Paid:</span>
                <span className="font-mono tabular-nums">${selectedInvoice.paidAmount.toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between font-bold text-sm text-rose-600 dark:text-rose-400">
                <span>Balance Due:</span>
                <span className="font-mono tabular-nums">${selectedInvoice.balanceDue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Pay Balance Form / Action */}
          {selectedInvoice.balanceDue > 0 && currentRole !== 'patient' && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 print:hidden">
              {!showPayForm ? (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Record an authorized payment for this invoice:</span>
                  <button
                    onClick={() => {
                      setPaymentAmount(String(selectedInvoice.balanceDue));
                      setShowPayForm(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Record Payment
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePay} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Amount ($)</label>
                      <input
                        type="number"
                        step="any"
                        value={paymentAmount}
                        onChange={e => setPaymentAmount(e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Payment Method</label>
                      <select
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value as any)}
                        className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                      >
                        <option value="Card">Credit / Debit Card</option>
                        <option value="Insurance Direct">Insurance Direct Clearing</option>
                        <option value="Cash">Cash at Counter</option>
                        <option value="Online Banking">Direct Wire Transfer</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowPayForm(false)}
                      className="px-3 py-1 text-xs text-slate-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium"
                    >
                      Confirm Payment
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Prototype disclaimer footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 text-center">
            Prototype demonstration billing document. All patient names and financial charges shown are fictional.
          </div>
        </div>
      </div>
    </div>
  );
};
