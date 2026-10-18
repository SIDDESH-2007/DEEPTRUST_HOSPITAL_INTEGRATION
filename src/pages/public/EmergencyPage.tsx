import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Siren,
  PhoneCall,
  Ambulance,
  MapPin,
  Clock,
  ShieldAlert,
  CheckCircle2,
  HeartPulse,
  Brain,
  Baby,
  ArrowRight
} from 'lucide-react';

export const EmergencyPage: React.FC = () => {
  const {
    hospitalConfig,
    dispatchAmbulance,
    ambulances,
  } = useHospital();

  const [callerName, setCallerName] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [incidentLocation, setIncidentLocation] = useState('');
  const [emergencyNature, setEmergencyNature] = useState('Severe Chest Pain / Possible Heart Attack');
  const [dispatchedId, setDispatchedId] = useState<string | null>(null);

  const availableAmbulances = ambulances.filter(a => a.status === 'Available');

  const handleAmbulanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentLocation) return;

    const chosen = availableAmbulances[0] || ambulances[0];
    dispatchAmbulance(chosen.id, incidentLocation);
    setDispatchedId(chosen.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* High-visibility Emergency Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-700 to-slate-900 rounded-2xl text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-400/40 text-xs font-bold uppercase tracking-wider text-red-200">
            <Siren className="w-4 h-4 text-white animate-pulse" />
            <span>24/7 Level I Regional Trauma Center</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Emergency Care & Ambulance Services
          </h1>

          <p className="text-sm sm:text-base text-red-100/90 leading-relaxed">
            If you or someone around you is facing a life-threatening crisis, call our direct Emergency Hotline immediately or use the rapid ambulance dispatch protocol below.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={`tel:${hospitalConfig.emergencyPhone.replace(/\D/g, '')}`}
              className="flex items-center gap-2 px-6 py-3.5 bg-white text-rose-900 font-extrabold text-sm rounded-xl shadow-lg hover:bg-rose-50 transition-colors"
            >
              <PhoneCall className="w-5 h-5 text-rose-600 animate-bounce" />
              <span>Call Hotline: {hospitalConfig.emergencyPhone}</span>
            </a>
            <div className="text-xs text-rose-200">
              Immediate connection to Trauma Resuscitation Desk
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs flex items-start gap-3 text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-semibold">Medical Safety Protocol:</strong>
          <p className="leading-relaxed">
            This digital portal does not substitute emergency medical diagnosis. For critical conditions such as sudden unconsciousness, heavy bleeding, sudden weakness or numbness on one side of face/body, or severe breathing distress, immediately dial 911 or arrive at our emergency entrance portico.
          </p>
        </div>
      </div>

      {/* Grid: Rapid Ambulance Dispatch + Live Department Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Rapid Ambulance Request Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center font-bold">
                <Ambulance className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Request Mobile ICU / Ambulance
                </h2>
                <p className="text-xs text-slate-500">
                  Advanced Life Support (ALS) with paramedic telemetry
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {availableAmbulances.length} Units Available
            </span>
          </div>

          {dispatchedId ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                    Ambulance Unit {dispatchedId} Dispatched
                  </h3>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300">
                    Crew is mobile and en route to: <strong className="underline">{incidentLocation}</strong>
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Keep phone lines clear. Our paramedic team is monitoring the route via GPS telemetry. Estimated arrival time: 8–12 minutes.
              </p>
              <button
                onClick={() => setDispatchedId(null)}
                className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleAmbulanceSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Caller Name
                  </label>
                  <input
                    type="text"
                    required
                    value={callerName}
                    onChange={e => setCallerName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Callback Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={callerPhone}
                    onChange={e => setCallerPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Incident Pickup Address & Landmarks
                </label>
                <input
                  type="text"
                  required
                  value={incidentLocation}
                  onChange={e => setIncidentLocation(e.target.value)}
                  placeholder="Street address, building, floor or intersection"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Nature of Emergency / Patient Condition
                </label>
                <select
                  value={emergencyNature}
                  onChange={e => setEmergencyNature(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                >
                  <option value="Severe Chest Pain / Possible Heart Attack">Severe Chest Pain / Cardiac Distress</option>
                  <option value="Suspected Acute Stroke / Facial Droop / Slurred Speech">Suspected Acute Stroke (FAST)</option>
                  <option value="Severe Trauma / Road Collision / Fall">Severe Trauma / Fracture / Fall</option>
                  <option value="Acute Respiratory Distress / Breathing Difficulty">Acute Respiratory Distress</option>
                  <option value="Pediatric Emergency / High Fever with Seizure">Pediatric Acute Emergency</option>
                  <option value="Uncontrolled Bleeding / Deep Laceration">Uncontrolled Hemorrhage / Bleeding</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md transition-colors text-xs flex items-center justify-center gap-2"
                >
                  <Ambulance className="w-4 h-4" />
                  <span>Dispatch Closest Ambulance Now</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Live ER Department Readiness */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Trauma Center Readiness
            </h2>
            <p className="text-xs text-slate-500">Live operational staffing status</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
              <span className="text-slate-600 dark:text-slate-400">Chief of Emergency:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">Dr. Rebecca Croft, MD, FACEP</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
              <span className="text-slate-600 dark:text-slate-400">On-Duty Trauma Surgeons:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">4 Specialists Active</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
              <span className="text-slate-600 dark:text-slate-400">Cardiac Cath Lab Activation:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">Under 15 Mins</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
              <span className="text-slate-600 dark:text-slate-400">Emergency Resuscitation Bays:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">8 Available</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
              <span className="text-slate-600 dark:text-slate-400">Trauma Entrance Address:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-right">Ground Floor Portico A, South Gate</span>
            </div>
          </div>

          {/* Quick First Aid / Triage Tips */}
          <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 text-xs space-y-2">
            <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-blue-600" />
              <span>Suspected Heart Attack Protocol:</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              Have the patient rest quietly. Do not allow them to drive themselves. If advised by doctor and not allergic, chew one 325mg non-coated aspirin while awaiting paramedics.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
