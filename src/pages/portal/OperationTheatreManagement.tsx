import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Scissors, Clock, User, CheckCircle2, AlertCircle } from 'lucide-react';

export const OperationTheatreManagement: React.FC = () => {
  const { operationSurgeries, setSelectedPatientId } = useHospital();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Robotic Surgical Suites & Operation Theatre (OT)
        </h1>
        <p className="text-xs text-slate-500">
          Active surgical schedules, sterile suite allocation, and multidisciplinary perioperative teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {operationSurgeries.map(ot => (
          <div
            key={ot.id}
            className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3 text-xs"
          >
            <div className="flex justify-between items-start">
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{ot.otRoom}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                ot.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                ot.status === 'In Progress' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                ot.status === 'Preparing' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
              }`}>
                {ot.status}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{ot.procedureName}</h3>
              <p className="text-slate-500 mt-0.5">Duration: ~{ot.estimatedDuration}</p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <button
                  onClick={() => setSelectedPatientId(ot.patientId)}
                  className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600"
                >
                  {ot.patientName}
                </button>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Surgeon:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{ot.leadSurgeon}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Anesthesia:</span>
                <span className="text-slate-600 dark:text-slate-300">{ot.anesthesiologist}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
              <span>Date: {ot.scheduledDate}</span>
              <span className="font-mono">{ot.scheduledTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
