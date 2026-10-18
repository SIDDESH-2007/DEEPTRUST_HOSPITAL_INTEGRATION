import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Pill,
  AlertTriangle,
  CheckCircle2,
  Search,
  Package,
  FileText,
  Clock,
  Plus,
  ArrowRight
} from 'lucide-react';

export const PharmacyDashboard: React.FC = () => {
  const {
    currentUser,
    pharmacy,
    prescriptions,
    updatePharmacyStock,
    markPrescriptionDispensed,
    setSelectedPrescription,
  } = useHospital();

  const [searchMed, setSearchMed] = useState('');
  const [activeTab, setActiveTab] = useState<'inventory' | 'prescriptions'>('inventory');

  const filteredMeds = pharmacy.filter(m =>
    m.name.toLowerCase().includes(searchMed.toLowerCase()) ||
    m.genericName.toLowerCase().includes(searchMed.toLowerCase()) ||
    m.category.toLowerCase().includes(searchMed.toLowerCase())
  );

  const lowStockCount = pharmacy.filter(m => m.status === 'Low Stock' || m.status === 'Out of Stock').length;
  const pendingRxCount = prescriptions.filter(p => p.dispensedStatus === 'Pending').length;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-tight">
              Clinical Pharmacy & Formulary Dispensary
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-700/60 text-emerald-200">
              DISPENSARY HUB
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Pharmacist: <strong className="text-white">{currentUser.name}</strong> · Drug interaction checks and batch traceability.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Total Formulary Lines</span>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {pharmacy.length} Drugs
          </div>
          <div className="text-[10px] text-slate-500">Active barcode batches</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Low / Out of Stock</span>
          <div className="text-lg font-bold font-mono text-rose-600 dark:text-rose-400 tabular-nums">
            {lowStockCount} Items
          </div>
          <div className="text-[10px] text-rose-600 font-medium">Reorders triggered</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Rx Queue Pending</span>
          <div className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">
            {pendingRxCount}
          </div>
          <div className="text-[10px] text-amber-600 font-medium">Awaiting fulfillment</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Dispensed Today</span>
          <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {prescriptions.filter(p => p.dispensedStatus === 'Dispensed').length}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">Verified by PharmD</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 text-xs font-semibold space-x-4">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'inventory'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Medicine Formulary & Stock ({pharmacy.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'prescriptions'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Prescription Dispensing Queue ({prescriptions.length})</span>
        </button>
      </div>

      {/* Tab 1: Formulary Inventory */}
      {activeTab === 'inventory' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by brand name or generic drug..."
                value={searchMed}
                onChange={e => setSearchMed(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>
            <span className="text-[11px] text-slate-400">
              Showing {filteredMeds.length} medicines
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-semibold">
                  <th className="py-2.5">Brand / Generic Name</th>
                  <th className="py-2.5">Category</th>
                  <th className="py-2.5">Batch / Expiry</th>
                  <th className="py-2.5 text-right">Unit Price</th>
                  <th className="py-2.5 text-center">Stock Count</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Stock Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredMeds.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 font-semibold text-slate-900 dark:text-slate-100">
                      {item.name}
                      <div className="text-[10px] text-slate-400 font-normal">Generic: {item.genericName} · {item.dosageForm} ({item.strength})</div>
                    </td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">
                      {item.category}
                    </td>
                    <td className="py-3 font-mono text-[11px] text-slate-500">
                      {item.batchNumber}
                      <div className="text-[10px] text-slate-400">Exp: {item.expiryDate}</div>
                    </td>
                    <td className="py-3 text-right font-mono font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-3 text-center font-mono font-bold tabular-nums">
                      {item.stockQuantity}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        item.status === 'In Stock' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        item.status === 'Low Stock' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => updatePharmacyStock(item.id, 50)}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-[11px] font-mono"
                          title="Restock +50"
                        >
                          +50
                        </button>
                        <button
                          onClick={() => updatePharmacyStock(item.id, -1)}
                          disabled={item.stockQuantity <= 0}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-[11px] font-mono disabled:opacity-40"
                          title="Dispense -1"
                        >
                          -1
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Prescription Queue */}
      {activeTab === 'prescriptions' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4 text-xs">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              Doctor Electronic Prescriptions (e-Rx)
            </h2>
            <p className="text-[11px] text-slate-500">Verify dosages and complete physical medication dispensing</p>
          </div>

          <div className="space-y-3">
            {prescriptions.map(rx => (
              <div
                key={rx.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{rx.id}</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{rx.patientName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({rx.patientId})</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Prescribed by: <strong className="text-slate-700 dark:text-slate-300">{rx.doctorName}</strong> on {rx.date}
                  </div>
                  <div className="text-[11px] text-slate-700 dark:text-slate-300">
                    Diagnosis: <em>{rx.diagnosis}</em>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Items: {rx.medications.map(m => m.medicineName).join(', ')}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPrescription(rx)}
                    className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded text-xs font-medium hover:bg-white dark:hover:bg-slate-800"
                  >
                    View Slip
                  </button>
                  {rx.dispensedStatus === 'Pending' ? (
                    <button
                      onClick={() => markPrescriptionDispensed(rx.id)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Dispense</span>
                    </button>
                  ) : (
                    <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                      Dispensed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
