import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  HeartHandshake,
  Bed,
  HeartPulse,
  Pill,
  Siren,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  Plus,
  ArrowRight
} from 'lucide-react';

export const NurseDashboard: React.FC = () => {
  const {
    currentUser,
    patients,
    beds,
    vitals,
    prescriptions,
    setIsVitalsModalOpen,
    setVitalsTargetPatient,
    setSelectedPatientId,
    addToast,
  } = useHospital();

  const [medSchedule, setMedSchedule] = useState([
    { id: 'ms-1', patient: 'Eleanor Vance-Ross', bed: 'ICU-01', med: 'Clopidogrel 75mg', time: '09:00 AM', status: 'Given', nurse: 'Marcus Brody, RN' },
    { id: 'ms-2', patient: 'James Anderson', bed: 'ER-02', med: 'Aspirin 81mg (Chewable)', time: '09:30 AM', status: 'Given', nurse: 'Marcus Brody, RN' },
    { id: 'ms-3', patient: 'Lucas Morales', bed: 'PVT-202', med: 'Albuterol Nebulizer 2.5mg', time: '11:00 AM', status: 'Pending', nurse: 'Unassigned' },
    { id: 'ms-4', patient: 'Eleanor Vance-Ross', bed: 'ICU-01', med: 'Atorvastatin 40mg', time: '08:00 PM', status: 'Scheduled', nurse: 'Night Shift' },
  ]);

  const [emergencyCodeModal, setEmergencyCodeModal] = useState(false);

  const wardPatients = patients.filter(p => p.status === 'Inpatient' || p.status === 'Emergency Care');

  const handleMarkMedGiven = (id: string) => {
    setMedSchedule(prev => prev.map(m => m.id === id ? { ...m, status: 'Given', nurse: currentUser.name } : m));
    addToast({ type: 'success', message: 'Medication administration recorded in MAR.' });
  };

  const triggerCode = (codeName: string) => {
    addToast({
      type: 'error',
      title: `${codeName} ACTIVATED`,
      message: `Emergency response team dispatched to ${currentUser.department}.`,
    });
    setEmergencyCodeModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 text-white shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-tight">
              Nursing Station & Patient Care Unit
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-700/60 text-blue-200">
              STATION 3-EAST
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Nurse on Duty: <strong className="text-white">{currentUser.name}</strong> · Shift: Morning (07:00 - 15:30)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEmergencyCodeModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors animate-pulse"
          >
            <Siren className="w-4 h-4" />
            <span>Emergency Code Broadcast</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Assigned Patients</span>
            <User className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {wardPatients.length}
          </div>
          <div className="text-[10px] text-slate-500">Active ward beds</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Vitals Logged Today</span>
            <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {vitals.length}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">All parameters stable</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Medication Doses</span>
            <Pill className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {medSchedule.filter(m => m.status === 'Pending').length} Pending
          </div>
          <div className="text-[10px] text-amber-600 font-medium">Due in next round</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Station Beds</span>
            <Bed className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {beds.filter(b => b.status === 'Available').length} Free / {beds.length}
          </div>
          <div className="text-[10px] text-teal-600 font-medium">Bed occupancy 58%</div>
        </div>
      </div>

      {/* Main Grid: Assigned Inpatient Roster + MAR Medication Administration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Ward Inpatient Roster with Bedside Vitals Action */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Assigned Inpatient Ward Roster
              </h2>
              <p className="text-[11px] text-slate-500">Live bedside monitoring and physician orders</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {wardPatients.map(pt => {
              const latestVital = vitals.filter(v => v.patientId === pt.id).slice(-1)[0];
              return (
                <div
                  key={pt.id}
                  className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{pt.name}</span>
                        <span className="font-mono text-[10px] text-slate-400">({pt.id})</span>
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
                          {pt.roomBed || 'ER Portico'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Attending: {pt.assignedDoctorName} · Blood: {pt.bloodGroup} · Age: {pt.age}y
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setVitalsTargetPatient(pt);
                          setIsVitalsModalOpen(true);
                        }}
                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[11px] font-semibold flex items-center gap-1"
                      >
                        <HeartPulse className="w-3 h-3" />
                        <span>Log Vitals</span>
                      </button>
                      <button
                        onClick={() => setSelectedPatientId(pt.id)}
                        className="px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded text-[11px] font-medium"
                      >
                        EHR
                      </button>
                    </div>
                  </div>

                  {latestVital && (
                    <div className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 font-mono text-[11px] flex items-center justify-between text-slate-700 dark:text-slate-300">
                      <span>BP: <strong>{latestVital.bloodPressure}</strong></span>
                      <span>HR: <strong>{latestVital.heartRate} bpm</strong></span>
                      <span>SpO2: <strong className="text-emerald-600">{latestVital.spO2}%</strong></span>
                      <span>Temp: <strong>{latestVital.temperature}°F</strong></span>
                    </div>
                  )}

                  {pt.allergies.length > 0 && (
                    <div className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Allergies: {pt.allergies.join(', ')}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Medication Administration Record (MAR) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Medication Administration Record (MAR)
              </h2>
              <p className="text-[11px] text-slate-500">Scheduled clinical dosage timing</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {medSchedule.map(m => (
              <div
                key={m.id}
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{m.med}</div>
                  <div className="text-[11px] text-slate-500">
                    Patient: {m.patient} · Bed: {m.bed}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Schedule: {m.time} {m.nurse !== 'Unassigned' && `· By: ${m.nurse}`}
                  </div>
                </div>

                <div>
                  {m.status === 'Given' ? (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" />
                      Given
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMarkMedGiven(m.id)}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold"
                    >
                      Administer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Emergency Code Broadcast Modal */}
      {emergencyCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-md w-full shadow-2xl border border-rose-300 dark:border-rose-900 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-rose-600">
              <Siren className="w-5 h-5 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Hospital Emergency Code Alert
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Select an emergency code to immediately broadcast alerts to central telemetry, pagers, and trauma teams:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => triggerCode('CODE BLUE (Cardiac Arrest)')}
                className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-left flex justify-between items-center"
              >
                <span>Code Blue — Adult Cardiac Arrest</span>
                <span>ICU / CCU Team</span>
              </button>
              <button
                onClick={() => triggerCode('CODE RED (Fire / Smoke Incident)')}
                className="w-full p-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-left flex justify-between items-center"
              >
                <span>Code Red — Fire / Smoke Safety Alert</span>
                <span>Evacuation Staff</span>
              </button>
              <button
                onClick={() => triggerCode('CODE PINK (Pediatric Emergency)')}
                className="w-full p-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold text-left flex justify-between items-center"
              >
                <span>Code Pink — Infant / Pediatric Emergency</span>
                <span>NICU Resuscitation</span>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setEmergencyCodeModal(false)}
                className="px-4 py-1.5 text-slate-500 hover:text-slate-700"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
