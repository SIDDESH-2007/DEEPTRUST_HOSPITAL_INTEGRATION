import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Bed as BedType } from '../../types';
import {
  Bed,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  Wrench,
  Filter,
  DollarSign,
  ArrowRight,
  X
} from 'lucide-react';

export const BedManagement: React.FC = () => {
  const {
    beds,
    patients,
    updateBedStatus,
    setSelectedPatientId,
  } = useHospital();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeBedModal, setActiveBedModal] = useState<BedType | null>(null);

  // Stats
  const totalBeds = beds.length;
  const occupiedCount = beds.filter(b => b.status === 'Occupied').length;
  const availableCount = beds.filter(b => b.status === 'Available').length;
  const reservedCount = beds.filter(b => b.status === 'Reserved').length;
  const maintenanceCount = beds.filter(b => b.status === 'Maintenance').length;

  const filteredBeds = beds.filter(b => {
    if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
    if (selectedStatus !== 'all' && b.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Real-time Ward & Bed Management Console
          </h1>
          <p className="text-xs text-slate-500">
            Live hospital bed occupancy across ICU, Resuscitation, Private Suites, and General Wards.
          </p>
        </div>
      </div>

      {/* 5 Status Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Total Capacity</span>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {totalBeds} Beds
          </div>
          <div className="text-[10px] text-slate-500">Monitored units</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-emerald-600 dark:text-emerald-400">Available</span>
          <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {availableCount}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">Ready for admission</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-rose-600 dark:text-rose-400">Occupied</span>
          <div className="text-lg font-bold font-mono text-rose-600 dark:text-rose-400 tabular-nums">
            {occupiedCount}
          </div>
          <div className="text-[10px] text-slate-500">{Math.round((occupiedCount / totalBeds) * 100)}% Occupancy</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-amber-600 dark:text-amber-400">Reserved</span>
          <div className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">
            {reservedCount}
          </div>
          <div className="text-[10px] text-slate-500">Post-Op Hold</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Maintenance</span>
          <div className="text-lg font-bold font-mono text-slate-600 dark:text-slate-400 tabular-nums">
            {maintenanceCount}
          </div>
          <div className="text-[10px] text-slate-500">Sterilization / Repair</div>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold">Ward:</span>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Wards</option>
              <option value="ICU">ICU & CCU</option>
              <option value="Emergency">Emergency Resuscitation</option>
              <option value="Private Room">Executive Private Suite</option>
              <option value="General Ward">General Medical Ward</option>
              <option value="Isolation">Isolation Suite</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold">Status:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <option value="all">All States</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Reserved">Reserved</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        <span className="text-slate-500 font-medium">
          Showing {filteredBeds.length} hospital beds
        </span>
      </div>

      {/* Visual Bed Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBeds.map(b => {
          let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300';
          let borderCard = 'border-slate-200 dark:border-slate-700';

          if (b.status === 'Occupied') {
            badgeColor = 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300';
            borderCard = 'border-rose-200 dark:border-rose-900/50';
          } else if (b.status === 'Reserved') {
            badgeColor = 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300';
            borderCard = 'border-amber-200 dark:border-amber-900/50';
          } else if (b.status === 'Maintenance') {
            badgeColor = 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300';
          }

          return (
            <div
              key={b.id}
              className={`p-4 rounded-xl bg-white dark:bg-slate-800 border shadow-xs flex flex-col justify-between space-y-3 ${borderCard}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-slate-500" />
                    <span className="font-bold font-mono text-sm text-slate-900 dark:text-slate-100">
                      {b.bedNumber}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${badgeColor}`}>
                    {b.status}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{b.wardName}</div>
                  <div className="text-[11px] text-slate-500">{b.category} · {b.floor}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">${b.dailyRate}/day</div>
                </div>

                {b.patientName ? (
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60 text-xs space-y-0.5">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Current Inpatient:</span>
                    <button
                      onClick={() => b.patientId && setSelectedPatientId(b.patientId)}
                      className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 block text-left"
                    >
                      {b.patientName}
                    </button>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Adm: {b.admittedDate} · Dr: {b.attendingDoctor?.split(' ')[1] || 'Assigned'}
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 text-center text-[11px] text-slate-400">
                    Bed is sanitised & empty
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <button
                  onClick={() => setActiveBedModal(b)}
                  className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Manage Status
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bed Status Action Modal */}
      {activeBedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Update Bed {activeBedModal.bedNumber}
                </h3>
                <p className="text-[11px] text-slate-500">{activeBedModal.wardName} ({activeBedModal.category})</p>
              </div>
              <button onClick={() => setActiveBedModal(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              Select new bed operational status:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  updateBedStatus(activeBedModal.id, 'Available');
                  setActiveBedModal(null);
                }}
                className="w-full py-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 rounded font-semibold text-left px-3 hover:bg-emerald-100"
              >
                Mark as Available (Sanitized & Empty)
              </button>
              <button
                onClick={() => {
                  updateBedStatus(activeBedModal.id, 'Reserved');
                  setActiveBedModal(null);
                }}
                className="w-full py-2 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 rounded font-semibold text-left px-3 hover:bg-amber-100"
              >
                Mark as Reserved (Surgery / Transfer Hold)
              </button>
              <button
                onClick={() => {
                  updateBedStatus(activeBedModal.id, 'Maintenance');
                  setActiveBedModal(null);
                }}
                className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 rounded font-semibold text-left px-3 hover:bg-slate-200"
              >
                Mark as Maintenance / Terminal Sterilization
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
