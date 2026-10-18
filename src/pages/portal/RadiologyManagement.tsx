import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Scan, Eye, FileText, CheckCircle2, Clock, X } from 'lucide-react';
import { RadiologyOrder } from '../../types';

export const RadiologyManagement: React.FC = () => {
  const { radiology, setSelectedPatientId } = useHospital();
  const [selectedScan, setSelectedScan] = useState<RadiologyOrder | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Medical Imaging PACS & Radiology
          </h1>
          <p className="text-xs text-slate-500">
            3-Tesla MRI, 128-Slice CT, Digital X-Ray, and Color Doppler Ultrasound worklist.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-semibold">
                <th className="py-2.5">Accession ID</th>
                <th className="py-2.5">Patient Details</th>
                <th className="py-2.5">Modality</th>
                <th className="py-2.5">Anatomical Region</th>
                <th className="py-2.5">Ordering Physician</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5 text-right">Radiology Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {radiology.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-mono font-bold text-blue-600 dark:text-blue-400">{item.id}</td>
                  <td className="py-3 font-semibold text-slate-900 dark:text-slate-100">{item.patientName}</td>
                  <td className="py-3 font-bold text-slate-800 dark:text-slate-200">{item.modality}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">{item.bodyPart}</td>
                  <td className="py-3 text-slate-500">{item.doctorName}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.status === 'Report Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setSelectedScan(item)}
                      className="px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded text-[11px] font-medium hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      View Findings
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedScan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Diagnostic Radiology Report · {selectedScan.id}
                </h3>
                <p className="text-[11px] text-slate-500">{selectedScan.modality} ({selectedScan.bodyPart}) · Patient: {selectedScan.patientName}</p>
              </div>
              <button onClick={() => setSelectedScan(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-semibold text-slate-500">Attending Radiologist:</span>
                <p className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">{selectedScan.radiologist || 'Dr. Nathan Cruz, MD'}</p>
              </div>

              <div>
                <span className="font-semibold text-slate-500">Clinical Impression & Findings:</span>
                <div className="mt-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-800 dark:text-slate-200 leading-relaxed">
                  {selectedScan.findings || 'Awaiting final radiologist sign-off.'}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-200 dark:border-slate-800">
              <button onClick={() => setSelectedScan(null)} className="px-4 py-1.5 bg-blue-600 text-white rounded font-medium">
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
