import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Users,
  Calendar,
  Stethoscope,
  Bed,
  Siren,
  FlaskConical,
  CreditCard,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    hospitalConfig,
    patients,
    appointments,
    doctors,
    beds,
    labTests,
    billing,
    ambulances,
    setPortalSection,
    setSelectedPatientId,
    setSelectedInvoice,
  } = useHospital();

  const totalPatients = patients.length;
  const todayAppointments = appointments.filter(a => a.date === '2026-09-28');
  const availableDoctors = doctors.filter(d => d.isAvailableToday).length;
  const admittedPatients = patients.filter(p => p.status === 'Inpatient' || p.status === 'Emergency Care').length;
  const emergencyCases = patients.filter(p => p.status === 'Emergency Care').length;
  const availableBeds = beds.filter(b => b.status === 'Available').length;
  const pendingLabs = labTests.filter(l => l.processingStatus !== 'Completed').length;
  const pendingBills = billing.filter(b => b.status === 'Pending' || b.status === 'Partially Paid').length;

  // Revenue calculation
  const totalRevenue = billing.reduce((sum, b) => sum + b.paidAmount, 0);
  const pendingRevenue = billing.reduce((sum, b) => sum + b.balanceDue, 0);

  // Department distribution
  const deptWorkload = [
    { name: 'Cardiology & Vascular', count: 42, pct: 28, color: 'bg-blue-600' },
    { name: 'Orthopedics & Joint', count: 35, pct: 23, color: 'bg-teal-500' },
    { name: 'Emergency Trauma', count: 28, pct: 19, color: 'bg-rose-500' },
    { name: 'Neurology & Spine', count: 24, pct: 16, color: 'bg-indigo-600' },
    { name: 'Pediatrics (NICU)', count: 21, pct: 14, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 text-white shadow-sm border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-tight">
              Hospital Executive Command Dashboard
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-700/60 text-blue-200">
              CAMPUS MASTER
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Real-time census, clinical bed occupancy, pending diagnostic orders, and revenue telemetry for {hospitalConfig.name}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPortalSection('emergency')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            <Siren className="w-3.5 h-3.5" />
            <span>Emergency (Level I)</span>
          </button>
          <button
            onClick={() => setPortalSection('analytics')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Full Analytics</span>
          </button>
        </div>
      </div>

      {/* 8 Primary Hospital Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Total Patients</span>
            <Users className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {totalPatients}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
            Active EMR files
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Today's Appts</span>
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {todayAppointments.length}
          </div>
          <div className="text-[10px] text-slate-500">
            Scheduled slots
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Active Doctors</span>
            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {availableDoctors}
          </div>
          <div className="text-[10px] text-teal-600 font-medium">
            On Duty Today
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Admitted IPD</span>
            <Bed className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {admittedPatients}
          </div>
          <div className="text-[10px] text-slate-500">
            Inpatient Census
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">ER Trauma</span>
            <Siren className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-lg font-bold font-mono text-rose-600 dark:text-rose-400 tabular-nums">
            {emergencyCases}
          </div>
          <div className="text-[10px] text-rose-600 font-medium">
            STAT Resuscitation
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Free Beds</span>
            <Bed className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {availableBeds} / {beds.length}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">
            Available now
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Pending Labs</span>
            <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {pendingLabs}
          </div>
          <div className="text-[10px] text-slate-500">
            In analyzer run
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Pending Bills</span>
            <CreditCard className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {pendingBills}
          </div>
          <div className="text-[10px] text-amber-600 font-medium">
            ${pendingRevenue.toLocaleString()} Due
          </div>
        </div>

      </div>

      {/* Middle Grid: Operational Workload, Bed Occupancy & Revenue Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Department Workload Distribution */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Department Patient Census
              </h2>
              <p className="text-[11px] text-slate-500">Current active clinical workload</p>
            </div>
            <button
              onClick={() => setPortalSection('departments')}
              className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1"
            >
              <span>Institutes</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {deptWorkload.map((dw, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span className="font-medium">{dw.name}</span>
                  <span className="font-mono text-slate-500 tabular-nums">{dw.count} patients ({dw.pct}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${dw.color}`}
                    style={{ width: `${dw.pct * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-between text-xs text-slate-500">
            <span>Operating Theatre Active: <strong className="text-slate-900 dark:text-slate-100">Suite 1 & Suite 3</strong></span>
            <span>Avg Wait: <strong className="text-emerald-600">14 min</strong></span>
          </div>
        </div>

        {/* Real-time Ward Bed Status Overview */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Ward Bed Occupancy
              </h2>
              <p className="text-[11px] text-slate-500">Live capacity status</p>
            </div>
            <button
              onClick={() => setPortalSection('beds')}
              className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1"
            >
              <span>Manage Beds</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700 space-y-1">
              <span className="text-[11px] text-slate-500">ICU / CCU</span>
              <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">2 / 4 Free</div>
              <span className="text-[10px] text-amber-600 font-semibold">50% Occupied</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700 space-y-1">
              <span className="text-[11px] text-slate-500">Trauma Resuscitation</span>
              <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">1 / 2 Free</div>
              <span className="text-[10px] text-rose-600 font-semibold">Emergency Ready</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700 space-y-1">
              <span className="text-[11px] text-slate-500">Private Suites</span>
              <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">1 / 2 Free</div>
              <span className="text-[10px] text-emerald-600 font-semibold">Available</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700 space-y-1">
              <span className="text-[11px] text-slate-500">General Ward</span>
              <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">1 / 3 Free</div>
              <span className="text-[10px] text-slate-500">1 Maintenance</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs flex items-center justify-between">
            <span className="text-blue-950 dark:text-blue-200">Mobile ICU Ambulances:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {ambulances.filter(a => a.status === 'Available').length} Ready / {ambulances.length} Fleet
            </span>
          </div>
        </div>

        {/* Financial & Revenue Snapshot */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Revenue & Invoicing
              </h2>
              <p className="text-[11px] text-slate-500">Billing operations</p>
            </div>
            <button
              onClick={() => setPortalSection('billing')}
              className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1"
            >
              <span>Ledger</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <span className="text-[11px] text-emerald-800 dark:text-emerald-300">Collected Revenue:</span>
              <div className="text-lg font-bold font-mono text-emerald-900 dark:text-emerald-100 tabular-nums">
                ${totalRevenue.toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">Direct & Insurance Cleared</span>
            </div>

            <div className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
              <span className="text-[11px] text-amber-800 dark:text-amber-300">Outstanding Receivable:</span>
              <div className="text-lg font-bold font-mono text-amber-900 dark:text-amber-100 tabular-nums">
                ${pendingRevenue.toLocaleString()}
              </div>
              <span className="text-[10px] text-amber-700 dark:text-amber-400">Claims in processing</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400">
            * All financial indicators simulated for healthcare management prototype.
          </div>
        </div>

      </div>

      {/* Bottom Grid: Recent Inpatient Admissions + Today's Appointments Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Today's Appointments Table */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Today's Outpatient Appointments & OPD
              </h2>
              <p className="text-[11px] text-slate-500">Live specialist consult schedule</p>
            </div>
            <button
              onClick={() => setPortalSection('appointments')}
              className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-semibold">
                  <th className="py-2">Token</th>
                  <th className="py-2">Patient</th>
                  <th className="py-2">Specialist Doctor</th>
                  <th className="py-2">Slot</th>
                  <th className="py-2">Status</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {appointments.slice(0, 5).map(appt => (
                  <tr key={appt.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 font-mono font-bold text-teal-600 dark:text-teal-400">
                      #{appt.tokenNumber || '101'}
                    </td>
                    <td className="py-2.5">
                      <button
                        onClick={() => setSelectedPatientId(appt.patientId)}
                        className="font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 text-left"
                      >
                        {appt.patientName}
                      </button>
                    </td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-300">
                      {appt.doctorName}
                    </td>
                    <td className="py-2.5 font-mono text-slate-500">
                      {appt.time}
                    </td>
                    <td className="py-2.5">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                        appt.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        appt.status === 'In Consultation' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={() => setSelectedPatientId(appt.patientId)}
                        className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        Open EHR
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hospital Patient Census & Admitted Wards */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Current Inpatient Admissions
              </h2>
              <p className="text-[11px] text-slate-500">Actively monitored cases</p>
            </div>
            <button
              onClick={() => setPortalSection('ipd')}
              className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1"
            >
              <span>IPD Desk</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {patients.filter(p => p.status === 'Inpatient' || p.status === 'Emergency Care').slice(0, 4).map(pt => (
              <div
                key={pt.id}
                className="p-3 rounded-lg border border-slate-100 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/40 text-xs flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedPatientId(pt.id)}
                      className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600"
                    >
                      {pt.name}
                    </button>
                    <span className="font-mono text-[10px] text-slate-400">{pt.id}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Bed: <strong className="text-blue-600 dark:text-blue-400">{pt.roomBed || 'Awaiting Bed'}</strong> · Attending: {pt.assignedDoctorName}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                    pt.status === 'Emergency Care' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {pt.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">Adm: {pt.admissionDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
