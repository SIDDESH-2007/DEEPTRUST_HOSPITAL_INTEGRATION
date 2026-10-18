import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Appointment } from '../../types';
import { Calendar, Search, Clock, Stethoscope, CheckCircle2, AlertCircle, X, RotateCcw } from 'lucide-react';

export const PublicAppointmentsPage: React.FC = () => {
  const {
    appointments,
    updateAppointmentStatus,
    setIsBookModalOpen,
  } = useHospital();

  const [searchRef, setSearchRef] = useState('');
  const [searchedAppointment, setSearchedAppointment] = useState<Appointment | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const q = searchRef.trim().toLowerCase();
    const found = appointments.find(
      a => a.id.toLowerCase() === q || a.patientPhone.includes(q) || a.patientName.toLowerCase().includes(q)
    );
    setSearchedAppointment(found || null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Outpatient Appointments
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Appointment Desk & Booking Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Schedule an outpatient consultation with any specialist physician or look up your existing scheduled consultation to check token status or reschedule.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Book New Appointment */}
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Schedule a New Consultation
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Choose your department, select your preferred board-certified physician, and select a guaranteed date and slot. You will immediately receive a digital confirmation and token number.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
              <li>✓ Instant electronic confirmation</li>
              <li>✓ Zero paper triage at front desk</li>
              <li>✓ SMS & Email reminder notifications</li>
            </ul>
          </div>

          <button
            onClick={() => setIsBookModalOpen(true)}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            Start Booking Form
          </button>
        </div>

        {/* Card 2: Look Up Existing Appointment */}
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Find / Manage Existing Booking
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Enter your Appointment ID (e.g. <span className="font-mono font-semibold">APT-8821</span>) or patient telephone number to review or reschedule.
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={searchRef}
                onChange={e => setSearchRef(e.target.value)}
                placeholder="APT-8821 or 555-234-5891..."
                className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
              >
                Search
              </button>
            </div>
          </form>

          {searched && (
            <div className="pt-2">
              {searchedAppointment ? (
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 text-xs space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{searchedAppointment.id}</span>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">{searchedAppointment.patientName}</h4>
                      <p className="text-slate-500">{searchedAppointment.doctorName} · {searchedAppointment.departmentName}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      searchedAppointment.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                      searchedAppointment.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {searchedAppointment.status}
                    </span>
                  </div>

                  <div className="text-slate-600 dark:text-slate-300">
                    <p>Date: <strong>{searchedAppointment.date}</strong> at <strong>{searchedAppointment.time}</strong></p>
                    {searchedAppointment.tokenNumber && (
                      <p>OPD Queue Token: <strong className="font-mono">#{searchedAppointment.tokenNumber}</strong></p>
                    )}
                  </div>

                  {searchedAppointment.status !== 'Cancelled' && (
                    <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => {
                          updateAppointmentStatus(searchedAppointment.id, 'Cancelled');
                          setSearchedAppointment({ ...searchedAppointment, status: 'Cancelled' });
                        }}
                        className="px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      >
                        Cancel Appointment
                      </button>
                      <button
                        onClick={() => {
                          updateAppointmentStatus(searchedAppointment.id, 'Rescheduled');
                          setSearchedAppointment({ ...searchedAppointment, status: 'Rescheduled' });
                        }}
                        className="px-3 py-1.5 text-xs text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 rounded hover:bg-blue-50 dark:hover:bg-blue-950/30"
                      >
                        Reschedule
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 text-xs text-rose-800 dark:text-rose-300">
                  No scheduled appointment found matching "{searchRef}". Please verify your reference number.
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
