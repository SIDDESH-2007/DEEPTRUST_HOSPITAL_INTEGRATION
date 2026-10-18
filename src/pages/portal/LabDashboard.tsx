import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  FlaskConical,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck,
  Search,
  Filter,
  X
} from 'lucide-react';
import { LabTestOrder } from '../../types';

export const LabDashboard: React.FC = () => {
  const {
    currentUser,
    labTests,
    updateLabResult,
    setSelectedPatientId,
  } = useHospital();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedOrderForResult, setSelectedOrderForResult] = useState<LabTestOrder | null>(null);
  const [resultInput, setResultInput] = useState('');
  const [flagSelection, setFlagSelection] = useState<LabTestOrder['flag']>('Normal');

  const filteredTests = labTests.filter(t => {
    if (filterCategory !== 'all' && t.category !== filterCategory) return false;
    return true;
  });

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForResult) return;

    updateLabResult(selectedOrderForResult.id, resultInput, flagSelection);
    setSelectedOrderForResult(null);
    setResultInput('');
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-purple-900 via-slate-900 to-slate-900 text-white shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-tight">
              Diagnostic Pathology & Biochemistry Laboratory
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-700/60 text-purple-200">
              LIS WORKLIST
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Logged in as: <strong className="text-white">{currentUser.name}</strong> · Medical Laboratory Scientist
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Total Requisitions</span>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {labTests.length}
          </div>
          <div className="text-[10px] text-slate-500">All categories</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">In Analyzer</span>
          <div className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">
            {labTests.filter(t => t.processingStatus === 'In Analysis').length}
          </div>
          <div className="text-[10px] text-amber-600 font-medium">Running run #40</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Completed & Signed</span>
          <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {labTests.filter(t => t.processingStatus === 'Completed').length}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">Released to EHR</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Pending Specimen</span>
          <div className="text-lg font-bold font-mono text-purple-600 dark:text-purple-400 tabular-nums">
            {labTests.filter(t => t.collectionStatus === 'Sample Received').length}
          </div>
          <div className="text-[10px] text-purple-600 font-medium">At accession desk</div>
        </div>
      </div>

      {/* Lab Worklist Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              Active Specimen Orders & Analyzer Queue
            </h2>
            <p className="text-[11px] text-slate-500">Hematology, Biochemistry & Immunology orders</p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="text-xs px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Categories</option>
              <option value="Biochemistry">Biochemistry</option>
              <option value="Hematology">Hematology</option>
              <option value="Immunology">Immunology</option>
              <option value="Microbiology">Microbiology</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-semibold">
                <th className="py-2.5">Requisition ID</th>
                <th className="py-2.5">Patient Details</th>
                <th className="py-2.5">Test Ordered</th>
                <th className="py-2.5">Specimen</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5">Result Findings</th>
                <th className="py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTests.map(test => (
                <tr key={test.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-mono font-bold text-purple-600 dark:text-purple-400">
                    {test.id}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => setSelectedPatientId(test.patientId)}
                      className="font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 text-left"
                    >
                      {test.patientName}
                    </button>
                    <div className="text-[10px] text-slate-400 font-mono">By: {test.doctorName}</div>
                  </td>
                  <td className="py-3 font-medium text-slate-800 dark:text-slate-200">
                    {test.testName}
                    <div className="text-[10px] text-slate-400">{test.category}</div>
                  </td>
                  <td className="py-3 font-mono text-slate-500">
                    {test.sampleType}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      test.processingStatus === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      test.processingStatus === 'In Analysis' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {test.processingStatus}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-slate-600 dark:text-slate-300">
                    {test.resultValue || <span className="text-slate-400 italic">Awaiting entry</span>}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedOrderForResult(test);
                        setResultInput(test.resultValue || '');
                        setFlagSelection(test.flag || 'Normal');
                      }}
                      className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-[11px] font-semibold"
                    >
                      {test.processingStatus === 'Completed' ? 'Edit Result' : 'Enter Result'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Entry Modal */}
      {selectedOrderForResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Enter Final Laboratory Result
                </h3>
                <p className="text-[11px] text-slate-500">Order: {selectedOrderForResult.id} · {selectedOrderForResult.patientName}</p>
              </div>
              <button onClick={() => setSelectedOrderForResult(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResult} className="space-y-4">
              <div>
                <span className="text-slate-500 font-semibold">Test Specification:</span>
                <p className="text-slate-900 dark:text-slate-100 font-bold mt-0.5">{selectedOrderForResult.testName}</p>
                <p className="text-slate-400 font-mono text-[11px]">Normal Reference Range: {selectedOrderForResult.normalRange}</p>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Analytical Result / Value
                </label>
                <textarea
                  rows={3}
                  required
                  value={resultInput}
                  onChange={e => setResultInput(e.target.value)}
                  placeholder="e.g. 9.2 ng/L (Within expected limits) | Creatinine 0.9 mg/dL"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Clinical Flag Status
                </label>
                <select
                  value={flagSelection}
                  onChange={e => setFlagSelection(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                  <option value="Critical">Critical Alert (Notify Clinician)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForResult(null)}
                  className="px-3 py-1.5 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded font-semibold"
                >
                  Sign & Finalize Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
