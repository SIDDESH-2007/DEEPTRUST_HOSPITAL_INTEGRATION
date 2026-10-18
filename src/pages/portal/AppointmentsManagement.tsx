import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Appointment } from '../../types';
import {
  Calendar,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  User,
  Stethoscope
} from 'lucide-react';

export const AppointmentsManagement: React.FC = () => {
  const {
    appointments,
    updateAppointmentStatus,
    setIsBookModalOpen,
    setSelectedPatientId,
  } = useHospital();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredAppointments = appointments.filter(a => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (typeFilter !== 'all' && a.type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        a.patientName.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.doctorName.toLowerCase().includes(q) ||
        a.departmentName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Outpatient Consultations & Appointment Scheduling
          </h1>
          <p className="text-xs text-slate-500">
            Central scheduling desk across 28 institutes with token assignment and real-time consultation states.
          </p>
        </div>

        <button
          onClick={() => setIsBookModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by patient, doctor, or Ref (APT-8821)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            >
              <option value="all">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Consultation">In Consultation</option>
              <option value="Completed">Completed</option>
              <option value="Rescheduled">Rescheduled</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="w-full py-2 px-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            >
              <option value="all">All Consultation Types</option>
              <option value="In-Person Consultation">In-Person Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Diagnostic Review">Diagnostic Review</option>
              <option value="Emergency Assessment">Emergency Assessment</option>
            </select>
          </div>

        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Ref ID</th>
                <th className="py-3 px-4">Token</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Attending Specialist</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Date & Slot</th>
                <th className="py-3 px-4">Visit Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredAppointments.map(appt => (
                <tr key={appt.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {appt.id}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-teal-600 dark:text-teal-400">
                    #{appt.tokenNumber || '—'}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedPatientId(appt.patientId)}
                      className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 text-left"
                    >
                      {appt.patientName}
                    </button>
                    <div className="text-[10px] text-slate-400 font-mono">{appt.patientPhone}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium">
                    {appt.doctorName}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {appt.departmentName}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                    {appt.date}
                    <div className="text-[10px] text-slate-400 font-semibold">{appt.time}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {appt.type}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                      appt.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      appt.status === 'In Consultation' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                      appt.status === 'Cancelled' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex gap-1.5">
                      {appt.status !== 'Completed' && appt.status !== 'Cancelled' && (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(appt.id, 'Completed')}
                            className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[10px] font-semibold"
                            title="Mark Completed"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appt.id, 'Cancelled')}
                            className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-[10px] font-semibold"
                            title="Cancel Appointment"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setSelectedPatientId(appt.patientId)}
                        className="px-2 py-1 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-medium"
                      >
                        EHR
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
