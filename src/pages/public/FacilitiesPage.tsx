import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Building2, Shield, HeartPulse, Bed, Cpu, Wifi, Car, Coffee, Lock } from 'lucide-react';

export const FacilitiesPage: React.FC = () => {
  const { hospitalConfig } = useHospital();

  const facilities = [
    { title: 'Modular Robotic Operating Suites', icon: Cpu, desc: 'Ultra-clean laminar airflow Class 100 operating rooms equipped with robotic surgical arms and 4K stereoscopic displays.' },
    { title: 'Advanced Diagnostic Imaging Suite', icon: HeartPulse, desc: 'High-speed 3-Tesla MRI and dual-source 128-slice CT scanners with ambient relaxing illumination.' },
    { title: 'Level III Neonatal Intensive Care (NICU)', icon: Shield, desc: 'Specialized micro-climate incubators, nitric oxide ventilation, and dedicated pediatric cardiology support.' },
    { title: 'Executive Inpatient Private Suites', icon: Bed, desc: 'Comfortable private rooms featuring motorized patient beds, visitor loungers, en-suite bathrooms, and nurse call systems.' },
    { title: 'Dedicated Negative Pressure Isolation', icon: Lock, desc: 'HEPA-filtered isolation suites for immunocompromised or contagious clinical cases.' },
    { title: 'Visitor Amenities & Campus Amenities', icon: Coffee, desc: '24-hour cafeteria serving nutritionist-curated meals, tranquil healing gardens, and quiet prayer/meditation rooms.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Campus Infrastructure
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Modern Medical Facilities & Infrastructure
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Engineered for patient safety, clinical sterility, rapid emergency access, and compassionate recovery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{f.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
