import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { LineChart, BarChart3, TrendingUp, Calendar, ArrowUpRight, Activity, Bed, Users } from 'lucide-react';

export const AnalyticsManagement: React.FC = () => {
  const { patients, appointments, billing, beds } = useHospital();
  const [period, setPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Simulated metrics according to selected period
  const visitTrend = [
    { day: 'Mon', visits: 142, er: 28 },
    { day: 'Tue', visits: 168, er: 32 },
    { day: 'Wed', visits: 155, er: 24 },
    { day: 'Thu', visits: 180, er: 38 },
    { day: 'Fri', visits: 195, er: 42 },
    { day: 'Sat', visits: 130, er: 45 },
    { day: 'Sun', visits: 110, er: 39 },
  ];

  const occupancyTrend = [
    { ward: 'ICU / CCU', occupied: 82, target: 85 },
    { ward: 'Executive Private', occupied: 65, target: 70 },
    { ward: 'General Medicine', occupied: 91, target: 90 },
    { ward: 'Pediatric NICU', occupied: 78, target: 80 },
    { ward: 'Isolation Suites', occupied: 40, target: 50 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Healthcare Performance & Clinical Analytics
          </h1>
          <p className="text-xs text-slate-500">
            Institutional clinical volume, ER turnaround, inpatient length of stay, and bed utilization.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold">
          {(['7d', '30d', '90d', '1y'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded transition-colors ${
                period === p
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Avg Daily Patient Footfall</span>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            154 Patients
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">↑ +8.4% vs last period</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Average Length of Stay (ALOS)</span>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            3.8 Days
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">Optimal clinical discharge</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Bed Occupancy Rate</span>
          <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400 tabular-nums">
            78.5%
          </div>
          <span className="text-[10px] text-slate-500">Benchmark target: 80%</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Emergency Door-to-Doctor</span>
          <div className="text-xl font-bold font-mono text-teal-600 dark:text-teal-400 tabular-nums">
            11.4 Mins
          </div>
          <span className="text-[10px] text-teal-600 font-semibold">Level I Trauma Standard</span>
        </div>
      </div>

      {/* Visual Bar Charts: Weekly Visits & Bed Occupancy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        
        {/* Weekly Outpatient & ER Trends */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Patient Outpatient & Emergency Triage Trends
              </h2>
              <p className="text-[11px] text-slate-500">Daily patient volume across week</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {visitTrend.map(vt => (
              <div key={vt.day} className="space-y-1">
                <div className="flex justify-between text-slate-600 dark:text-slate-300 font-medium">
                  <span className="w-10 font-bold">{vt.day}</span>
                  <div className="flex gap-4 font-mono text-[11px]">
                    <span className="text-blue-600">OPD: {vt.visits}</span>
                    <span className="text-rose-600">ER: {vt.er}</span>
                  </div>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-700 flex overflow-hidden">
                  <div
                    className="bg-blue-600 h-full"
                    style={{ width: `${(vt.visits / 220) * 100}%` }}
                    title={`OPD: ${vt.visits}`}
                  />
                  <div
                    className="bg-rose-500 h-full"
                    style={{ width: `${(vt.er / 220) * 100}%` }}
                    title={`ER: ${vt.er}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span>Scheduled Outpatients (OPD)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span>Acute Emergency Cases (ER)</span>
            </div>
          </div>
        </div>

        {/* Ward Bed Occupancy Breakdown */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Specialized Ward Occupancy vs Target
              </h2>
              <p className="text-[11px] text-slate-500">Clinical utilization benchmark percentages</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {occupancyTrend.map(ot => (
              <div key={ot.ward} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{ot.ward}</span>
                  <span className="font-mono text-slate-500">{ot.occupied}% Occupancy</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${ot.occupied > 85 ? 'bg-amber-500' : 'bg-teal-500'}`}
                    style={{ width: `${ot.occupied}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700 text-[11px] text-slate-500 leading-relaxed">
            * Capacity thresholds automatically generate administrative notifications when any clinical unit exceeds 88% occupancy.
          </div>
        </div>

      </div>
    </div>
  );
};
