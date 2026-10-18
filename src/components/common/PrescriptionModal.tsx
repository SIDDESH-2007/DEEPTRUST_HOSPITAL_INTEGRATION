import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { X, Printer, Pill, CheckCircle2 } from 'lucide-react';

export const PrescriptionModal: React.FC = () => {
  const {
    selectedPrescription,
    setSelectedPrescription,
    hospitalConfig,
    markPrescriptionDispensed,
    currentRole,
  } = useHospital();

  if (!selectedPrescription) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Clinical Electronic Prescription</span>
            <span className="text-slate-400">·</span>
            <span className="font-mono text-teal-600 dark:text-teal-400">{selectedPrescription.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Prescription
            </button>
            <button
              onClick={() => setSelectedPrescription(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Prescription Printable Letterhead */}
        <div className="p-8 space-y-6 text-slate-800 dark:text-slate-200">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 dark:border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {hospitalConfig.name}
              </h2>
              <p className="text-xs font-semibold text-teal-700 dark:text-teal-400 mt-0.5">
                {selectedPrescription.department}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {hospitalConfig.address} · Tel: {hospitalConfig.phone}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {selectedPrescription.doctorName}
              </div>
              <div className="text-[11px] text-slate-500">
                Attending Consultant
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                Date: {selectedPrescription.date}
              </div>
            </div>
          </div>

          {/* Patient Strip */}
          <div className="grid grid-cols-3 gap-4 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Patient Name</span>
              <p className="font-semibold text-slate-900 dark:text-slate-100">{selectedPrescription.patientName}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Age / Gender</span>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                {selectedPrescription.patientAge} Years / {selectedPrescription.patientGender}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Patient ID</span>
              <p className="font-mono font-medium text-slate-800 dark:text-slate-200">{selectedPrescription.patientId}</p>
            </div>
          </div>

          {/* Diagnosis & Vitals */}
          <div className="space-y-1 text-xs">
            <div>
              <span className="font-semibold text-slate-500">Clinical Diagnosis: </span>
              <span className="font-medium text-slate-900 dark:text-slate-100">{selectedPrescription.diagnosis}</span>
            </div>
            {selectedPrescription.vitals && (
              <div>
                <span className="font-semibold text-slate-500">Recorded Vitals: </span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{selectedPrescription.vitals}</span>
              </div>
            )}
          </div>

          {/* Rx Symbol and Medications */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="font-serif italic font-bold text-2xl text-teal-700 dark:text-teal-400">℞</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Prescribed Regimen</span>
            </div>

            <div className="space-y-3">
              {selectedPrescription.medications.map((med, idx) => (
                <div key={idx} className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between items-baseline font-semibold text-slate-900 dark:text-slate-100">
                    <span className="text-sm font-medium">{idx + 1}. {med.medicineName}</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400">{med.dosage}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <span>{med.frequency}</span>
                    <span>·</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">Duration: {med.duration}</span>
                  </div>
                  {med.instructions && (
                    <div className="text-[11px] text-slate-500 italic">
                      Note: {med.instructions}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Advice & Followup */}
          {selectedPrescription.advice && (
            <div className="p-3 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 rounded-lg text-xs">
              <span className="font-semibold text-teal-950 dark:text-teal-200">Clinical Advice & Precautions:</span>
              <p className="text-teal-900 dark:text-teal-300 mt-1 leading-relaxed">
                {selectedPrescription.advice}
              </p>
            </div>
          )}

          {selectedPrescription.followUpDate && (
            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <span className="font-semibold">Recommended Follow-up Consultation:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedPrescription.followUpDate}</span>
            </div>
          )}

          {/* Pharmacy Dispense State & Action */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center print:hidden">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Dispense Status:</span>
              <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold ${
                selectedPrescription.dispensedStatus === 'Dispensed'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {selectedPrescription.dispensedStatus}
              </span>
            </div>

            {selectedPrescription.dispensedStatus !== 'Dispensed' && (currentRole === 'pharmacist' || currentRole === 'admin') && (
              <button
                onClick={() => {
                  markPrescriptionDispensed(selectedPrescription.id);
                  setSelectedPrescription({ ...selectedPrescription, dispensedStatus: 'Dispensed' });
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mark Dispensed
              </button>
            )}
          </div>

          {/* Disclaimer */}
          <div className="text-[10px] text-slate-400 text-center pt-2">
            Prototype clinical demonstration record. Not for real patient medication dispensation.
          </div>
        </div>
      </div>
    </div>
  );
};
