import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Droplet, AlertTriangle, CheckCircle2, UserPlus, HeartHandshake } from 'lucide-react';

export const BloodBankManagement: React.FC = () => {
  const { bloodBank, donors } = useHospital();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Transfusion Medicine & Blood Bank Registry
        </h1>
        <p className="text-xs text-slate-500">
          Real-time blood component inventory, voluntary donor records, and surgical crossmatch reserves.
        </p>
      </div>

      {/* Blood Group Grid Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {bloodBank.map(item => {
          const isCritical = item.status === 'Critical Shortage';
          return (
            <div
              key={item.bloodGroup}
              className={`p-4 rounded-xl border text-center space-y-2 ${
                isCritical
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900/60 ring-1 ring-rose-400'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <Droplet className={`w-4 h-4 ${isCritical ? 'text-rose-600 animate-bounce' : 'text-rose-500'}`} />
                <span className="text-lg font-black text-slate-900 dark:text-slate-100 font-mono">
                  {item.bloodGroup}
                </span>
              </div>
              <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
                {item.unitsAvailable}
              </div>
              <div className="text-[10px] text-slate-500">
                Units Available ({item.unitsReserved} Reserved)
              </div>
              <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                isCritical ? 'bg-rose-200 text-rose-900 dark:bg-rose-900 dark:text-rose-200' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {item.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Voluntary Donors Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4 text-xs">
        <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
          <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
            Registered Voluntary Blood Donors
          </h2>
          <p className="text-[11px] text-slate-500">Recent donor screening and whole blood collection records</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-semibold">
                <th className="py-2.5">Donor Ref</th>
                <th className="py-2.5">Donor Name</th>
                <th className="py-2.5">Blood Group</th>
                <th className="py-2.5">Units Donated</th>
                <th className="py-2.5">Donation Date</th>
                <th className="py-2.5">Hemoglobin</th>
                <th className="py-2.5">Contact Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {donors.map(d => (
                <tr key={d.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-mono font-bold text-rose-600 dark:text-rose-400">{d.id}</td>
                  <td className="py-3 font-semibold text-slate-900 dark:text-slate-100">{d.donorName}</td>
                  <td className="py-3 font-mono font-bold text-rose-600">{d.bloodGroup}</td>
                  <td className="py-3 font-mono tabular-nums">{d.unitsDonated} Unit (450 mL)</td>
                  <td className="py-3 font-mono text-slate-500">{d.donationDate}</td>
                  <td className="py-3 font-mono text-slate-600 dark:text-slate-300">{d.hemoglobin}</td>
                  <td className="py-3 font-mono text-slate-500">{d.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
