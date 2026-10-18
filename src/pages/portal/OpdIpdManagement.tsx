import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  ListOrdered,
  Hotel,
  Bed,
  Calendar,
  Clock,
  User,
  Plus,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const OpdIpdManagement: React.FC = () => {
  const {
    opdQueue,
    ipdAdmissions,
    setSelectedPatientId,
    setIsBookModalOpen,
  } = useHospital();

  const [activeTab, setActiveTab] = useState<'opd' | 'ipd'>('opd');

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            OPD & IPD Operations Management
          </h1>
          <p className="text-xs text-slate-500">
            Outpatient Token Queue & Inpatient Hospitalization Registry
          </p>
        </div>

        <button
          onClick={() => setIsBookModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New OPD Booking</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 text-xs font-semibold space-x-4">
        <button
          onClick={() => setActiveTab('opd')}
          className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'opd'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ListOrdered className="w-4 h-4" />
          <span>Outpatient Queue (OPD Tokens)</span>
        </button>

        <button
          onClick={() => setActiveTab('ipd')}
          className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'ipd'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Hotel className="w-4 h-4" />
          <span>Inpatient Registry (IPD Admissions)</span>
        </button>
      </div>

      {/* OPD Tab Content */}
      {activeTab === 'opd' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Live Outpatient Queue & Consultation Tokens
              </h2>
              <p className="text-[11px] text-slate-500">Live token advancing display for waiting halls</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-semibold">
                  <th className="py-2.5">Token No.</th>
                  <th className="py-2.5">Patient Details</th>
                  <th className="py-2.5">Consultant Doctor</th>
                  <th className="py-2.5">Department</th>
                  <th className="py-2.5">Arrival Slot</th>
                  <th className="py-2.5">Est. Wait</th>
                  <th className="py-2.5">Triage Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {opdQueue.map(item => (
                  <tr key={item.tokenNumber} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 font-mono font-extrabold text-sm text-teal-600 dark:text-teal-400">
                      #{item.tokenNumber}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => setSelectedPatientId(item.patientId)}
                        className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 text-left"
                      >
                        {item.patientName}
                      </button>
                      <div className="text-[10px] text-slate-400 font-mono">{item.patientId}</div>
                    </td>
                    <td className="py-3 font-medium text-slate-800 dark:text-slate-200">
                      {item.doctorName}
                    </td>
                    <td className="py-3 text-slate-500">
                      {item.department}
                    </td>
                    <td className="py-3 font-mono text-slate-600 dark:text-slate-300">
                      {item.arrivalTime}
                    </td>
                    <td className="py-3 font-mono tabular-nums text-slate-500">
                      {item.estimatedWaitMinutes} mins
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        item.status === 'With Doctor' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'Vitals Taken' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* IPD Tab Content */}
      {activeTab === 'ipd' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Active Hospital Inpatient Admissions (IPD)
              </h2>
              <p className="text-[11px] text-slate-500">Bed allocation, admitting physician & expected discharge dates</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-semibold">
                  <th className="py-2.5">Admission ID</th>
                  <th className="py-2.5">Patient Details</th>
                  <th className="py-2.5">Ward & Bed</th>
                  <th className="py-2.5">Attending Specialist</th>
                  <th className="py-2.5">Admission Diagnosis</th>
                  <th className="py-2.5">Adm Date</th>
                  <th className="py-2.5">Est. Discharge</th>
                  <th className="py-2.5">Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {ipdAdmissions.map(adm => (
                  <tr key={adm.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {adm.id}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => setSelectedPatientId(adm.patientId)}
                        className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 text-left"
                      >
                        {adm.patientName}
                      </button>
                      <div className="text-[10px] text-slate-400">{adm.age}y · {adm.gender}</div>
                    </td>
                    <td className="py-3">
                      <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                        {adm.bedNumber}
                      </span>
                      <div className="text-[10px] text-slate-500">{adm.ward}</div>
                    </td>
                    <td className="py-3 font-medium text-slate-800 dark:text-slate-200">
                      {adm.doctorName}
                    </td>
                    <td className="py-3 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {adm.diagnosis}
                    </td>
                    <td className="py-3 font-mono text-slate-500">
                      {adm.admissionDate}
                    </td>
                    <td className="py-3 font-mono text-slate-500">
                      {adm.expectedDischarge}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        adm.status === 'Critical' ? 'bg-rose-100 text-rose-800' :
                        adm.status === 'Stable' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {adm.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
