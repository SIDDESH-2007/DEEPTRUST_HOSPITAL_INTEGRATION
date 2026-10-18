import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Ambulance, Phone, MapPin, CheckCircle2, Clock, Wrench } from 'lucide-react';

export const AmbulanceManagement: React.FC = () => {
  const { ambulances, dispatchAmbulance, resetAmbulance } = useHospital();
  const [dispatchModalId, setDispatchModalId] = useState<string | null>(null);
  const [destinationInput, setDestinationInput] = useState('Highway 101 North Exit 22');

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchModalId) return;
    dispatchAmbulance(dispatchModalId, destinationInput);
    setDispatchModalId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Emergency Ambulance Fleet & Mobile ICU Dispatch
          </h1>
          <p className="text-xs text-slate-500">
            Real-time vehicle GPS status, paramedic crew assignments, and rapid emergency response tracking.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {ambulances.map(amb => (
          <div
            key={amb.id}
            className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100">{amb.id}</span>
                <span className="text-slate-400 font-mono text-[11px] ml-2">({amb.vehicleNumber})</span>
                <div className="text-slate-500 text-[11px] mt-0.5">{amb.vehicleModel}</div>
              </div>

              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                amb.status === 'Available' ? 'bg-emerald-100 text-emerald-800' :
                amb.status === 'Dispatched' ? 'bg-rose-100 text-rose-800 animate-pulse' :
                amb.status === 'Maintenance' ? 'bg-slate-100 text-slate-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {amb.status}
              </span>
            </div>

            <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="font-medium">{amb.currentLocation}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Driver: {amb.driverName} ({amb.driverPhone})</span>
              </p>
              <p className="text-slate-500">Crew: {amb.paramedicTeam}</p>
              <div className="text-[10px] text-teal-600 font-semibold pt-1">
                Equipment: {amb.equipmentLevel}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-700">
              {amb.status === 'Available' ? (
                <button
                  onClick={() => setDispatchModalId(amb.id)}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold"
                >
                  Dispatch Unit
                </button>
              ) : amb.status === 'Dispatched' ? (
                <button
                  onClick={() => resetAmbulance(amb.id)}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold"
                >
                  Return to Base
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {dispatchModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Dispatch Ambulance {dispatchModalId}
            </h3>
            <form onSubmit={handleDispatch} className="space-y-3">
              <div>
                <label className="block text-slate-500 mb-1">Emergency Destination Address</label>
                <input
                  type="text"
                  required
                  value={destinationInput}
                  onChange={e => setDestinationInput(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDispatchModalId(null)}
                  className="px-3 py-1.5 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-600 text-white rounded font-semibold"
                >
                  Authorize Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
