import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { X, HeartPulse } from 'lucide-react';

export const VitalsModal: React.FC = () => {
  const {
    isVitalsModalOpen,
    setIsVitalsModalOpen,
    vitalsTargetPatient,
    setVitalsTargetPatient,
    currentUser,
    addVitals,
  } = useHospital();

  const [systolic, setSystolic] = useState('120');
  const [diastolic, setDiastolic] = useState('80');
  const [heartRate, setHeartRate] = useState('74');
  const [temperature, setTemperature] = useState('98.6');
  const [spO2, setSpO2] = useState('99');
  const [respiratoryRate, setRespiratoryRate] = useState('16');
  const [bloodSugar, setBloodSugar] = useState('105');
  const [notes, setNotes] = useState('Patient alert and resting comfortably in bed.');

  if (!isVitalsModalOpen || !vitalsTargetPatient) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVitals({
      patientId: vitalsTargetPatient.id,
      bloodPressure: `${systolic}/${diastolic}`,
      heartRate: parseInt(heartRate) || 72,
      temperature: parseFloat(temperature) || 98.6,
      spO2: parseInt(spO2) || 98,
      respiratoryRate: parseInt(respiratoryRate) || 16,
      bloodSugar: bloodSugar ? parseInt(bloodSugar) : undefined,
      takenBy: currentUser.name,
      notes,
    });
    setIsVitalsModalOpen(false);
    setVitalsTargetPatient(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-rose-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Log Clinical Vitals
              </h3>
              <p className="text-xs text-slate-500">
                {vitalsTargetPatient.name} ({vitalsTargetPatient.id})
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVitalsModalOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-500 mb-1 font-semibold">Blood Pressure (mmHg)</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  placeholder="Systolic"
                  value={systolic}
                  onChange={e => setSystolic(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                />
                <span className="text-slate-400">/</span>
                <input
                  type="number"
                  placeholder="Diastolic"
                  value={diastolic}
                  onChange={e => setDiastolic(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 mb-1 font-semibold">Heart Rate (bpm)</label>
              <input
                type="number"
                value={heartRate}
                onChange={e => setHeartRate(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-500 mb-1 font-semibold">Oxygen (SpO2 %)</label>
              <input
                type="number"
                value={spO2}
                onChange={e => setSpO2(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-500 mb-1 font-semibold">Temp (°F)</label>
              <input
                type="number"
                step="0.1"
                value={temperature}
                onChange={e => setTemperature(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-500 mb-1 font-semibold">Resp (breaths/m)</label>
              <input
                type="number"
                value={respiratoryRate}
                onChange={e => setRespiratoryRate(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-500 mb-1 font-semibold">Random Blood Sugar (mg/dL)</label>
            <input
              type="number"
              value={bloodSugar}
              onChange={e => setBloodSugar(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-500 mb-1 font-semibold">Nursing Clinical Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsVitalsModalOpen(false)}
              className="px-3 py-1.5 text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded font-medium transition-colors"
            >
              Save Vitals
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
