import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Stethoscope,
  Activity,
  HeartPulse,
  FlaskConical,
  Scan,
  Pill,
  Bed,
  Ambulance,
  Scissors,
  Droplet,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { hospitalConfig, setIsBookModalOpen } = useHospital();

  const services = [
    { title: 'Outpatient Consultations (OPD)', icon: Stethoscope, desc: 'Specialist clinics across 28 specialties with digital token queuing and minimal wait times.' },
    { title: 'Inpatient Hospitalization (IPD)', icon: Bed, desc: '450 licensed beds including luxury executive private suites, step-down units, and monitored wards.' },
    { title: '24/7 Level I Emergency & Trauma', icon: Activity, desc: 'Rapid resuscitation bays, direct helipad access, trauma surgery, and stroke intervention.' },
    { title: 'Robotic Surgical Suites (OT)', icon: Scissors, desc: 'State-of-the-art modular operating rooms with robotic arms and computerized surgical navigation.' },
    { title: 'Diagnostic Pathology Lab', icon: FlaskConical, desc: 'Fully automated biochemistry, molecular microbiology, hematology, and rapid STAT test results.' },
    { title: 'Radiology & Advanced Imaging (PACS)', icon: Scan, desc: '3-Tesla MRI, 128-slice CT scans, high-resolution ultrasound, and digital fluoroscopy.' },
    { title: 'Clinical Formulary & Pharmacy', icon: Pill, desc: '24-hour computerized inpatient and outpatient dispensing with drug interaction checks.' },
    { title: 'Transfusion Medicine & Blood Bank', icon: Droplet, desc: 'Component separation (PRBC, Platelets, FFP) with continuous antibody screening and crossmatch.' },
    { title: 'Mobile ICU Ambulance Fleet', icon: Ambulance, desc: 'Advanced Life Support (ALS) vehicles staffed with certified critical care paramedics.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Hospital Ecosystem
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Comprehensive Clinical Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          From preventive wellness checks and outpatient specialist clinics to complex robotic neurosurgery and round-the-clock emergency trauma support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {srv.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {srv.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Need Guidance on Choosing the Right Specialist?</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Our central care coordination helpline is available 24/7 to guide you to the appropriate medical clinic.
          </p>
        </div>
        <button
          onClick={() => setIsBookModalOpen(true)}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors"
        >
          Book Consultation Now
        </button>
      </div>
    </div>
  );
};
