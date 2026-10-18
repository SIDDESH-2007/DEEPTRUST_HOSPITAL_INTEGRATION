import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { ShieldCheck, FileCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const InsurancePage: React.FC = () => {
  const { hospitalConfig } = useHospital();

  const providers = [
    { name: 'BlueShield Premier Health', type: 'PPO & HMO Cashless Desk', speed: 'Instant E-Preauth (<45 min)' },
    { name: 'UnitedHealthcare Choice Plus', type: 'Commercial Inpatient Network', speed: 'Direct Automated Clearing' },
    { name: 'Aetna Health Advantage', type: 'Specialty & Surgical Coverage', speed: 'Dedicated In-Hospital Desk' },
    { name: 'Cigna Global Health', type: 'Expatriate & Domestic Comprehensive', speed: 'Direct Verification' },
    { name: 'Kaiser Permanente Senior', type: 'Medicare Advantage Empanelled', speed: 'Standard Electronic Clearing' },
    { name: 'Medicare Part A & Part B', type: 'Federal Inpatient & Outpatient', speed: 'Hospital Certified Billing' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Cashless Medical Coverage
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Insurance Partners & Cashless Hospitalization
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {hospitalConfig.name} maintains direct empanelment with all leading domestic and international insurance carriers. Our dedicated TPA Insurance Helpdesk coordinates pre-authorizations seamlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((p, i) => (
          <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{p.name}</h3>
              <p className="text-xs text-slate-500">{p.type}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-teal-700 dark:text-teal-400 font-medium">
              ✓ {p.speed}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Checklist for Cashless Admission:</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Valid government-issued photo ID (Driver's License, Passport)</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Active Insurance Health Card with Policy Number</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Treating doctor's admission requisition advice</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Past clinical investigation reports & medication history</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
