import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Calendar,
  FileText,
  FlaskConical,
  CreditCard,
  HeartPulse,
  Clock,
  ShieldCheck,
  Printer,
  ArrowRight,
  AlertTriangle,
  User
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const {
    currentUser,
    patients,
    appointments,
    prescriptions,
    labTests,
    radiology,
    billing,
    insuranceClaims,
    setSelectedInvoice,
    setSelectedPrescription,
    setIsBookModalOpen,
  } = useHospital();

  const [activeTab, setActiveTab] = useState<'summary' | 'appointments' | 'prescriptions' | 'reports' | 'billing'>('summary');

  // Find current patient data
  const myPatient = patients.find(p => p.id === currentUser.id) || patients[0];
  const myAppointments = appointments.filter(a => a.patientId === myPatient.id);
  const myPrescriptions = prescriptions.filter(p => p.patientId === myPatient.id);
  const myLabs = labTests.filter(l => l.patientId === myPatient.id);
  const myRadiology = radiology.filter(r => r.patientId === myPatient.id);
  const myInvoices = billing.filter(b => b.patientId === myPatient.id);
  const myClaims = insuranceClaims.filter(c => c.patientId === myPatient.id);

  const nextAppt = myAppointments.find(a => a.status === 'Confirmed' || a.status === 'In Consultation');
  const latestRx = myPrescriptions[0];
  const pendingInvoice = myInvoices.find(b => b.balanceDue > 0);

  return (
    <div className="space-y-6">
      
      {/* Patient Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Welcome back, {myPatient.name}
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-700/60 text-blue-200">
              {myPatient.id}
            </span>
          </div>
          <p className="text-xs text-slate-300">
            NovaCare Patient Health Portal · Personal Electronic Health Record (EHR) & Clinical Services
          </p>
          <div className="text-[11px] text-slate-400 pt-1">
            Age: {myPatient.age}y · Blood Group: <strong className="text-white">{myPatient.bloodGroup}</strong> · Attending: {myPatient.assignedDoctorName}
          </div>
        </div>

        <button
          onClick={() => setIsBookModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        
        {/* Next Appointment Card */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Next Scheduled Visit</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          {nextAppt ? (
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{nextAppt.date}</div>
              <div className="text-[11px] text-slate-500">{nextAppt.time} · {nextAppt.doctorName}</div>
              <span className="inline-block mt-2 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-semibold">
                Token #{nextAppt.tokenNumber || '101'}
              </span>
            </div>
          ) : (
            <p className="text-slate-400 italic">No upcoming visits scheduled.</p>
          )}
        </div>

        {/* Recent Prescription Card */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Active Prescription</span>
            <FileText className="w-4 h-4 text-teal-600" />
          </div>
          {latestRx ? (
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{latestRx.id}</div>
              <div className="text-[11px] text-slate-500">{latestRx.medications.length} Prescribed Medications</div>
              <button
                onClick={() => setSelectedPrescription(latestRx)}
                className="mt-2 text-[11px] text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Digital Rx</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <p className="text-slate-400 italic">No active prescription.</p>
          )}
        </div>

        {/* Diagnostics & Lab Results Card */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Recent Lab Reports</span>
            <FlaskConical className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{myLabs.length + myRadiology.length} Reports Ready</div>
            <div className="text-[11px] text-emerald-600 font-medium">All completed reports signed</div>
            <button
              onClick={() => setActiveTab('reports')}
              className="mt-2 text-[11px] text-purple-600 dark:text-purple-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Review Findings</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Outstanding Billing Card */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Hospital Invoicing</span>
            <CreditCard className="w-4 h-4 text-amber-600" />
          </div>
          {pendingInvoice ? (
            <div>
              <div className="font-bold text-sm text-rose-600 dark:text-rose-400 font-mono">
                ${pendingInvoice.balanceDue.toLocaleString()} Due
              </div>
              <div className="text-[11px] text-slate-500">Invoice: {pendingInvoice.id}</div>
              <button
                onClick={() => setSelectedInvoice(pendingInvoice)}
                className="mt-2 text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Pay / View Statement</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div>
              <div className="font-bold text-sm text-emerald-600 font-mono">$0.00 Balance</div>
              <div className="text-[11px] text-slate-500">All statements paid in full</div>
            </div>
          )}
        </div>

      </div>

      {/* Allergies & Clinical Alerts Strip */}
      {myPatient.allergies.length > 0 && (
        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/60 dark:bg-rose-950/30 text-xs flex items-center gap-3 text-rose-900 dark:text-rose-200">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold">Medical Alert - Documented Allergies:</span>
            {myPatient.allergies.map((allg, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-rose-100 dark:bg-rose-900 rounded font-semibold text-[11px]">
                {allg}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tabs for Detailed Records */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-6 space-y-6">
        
        <div className="flex border-b border-slate-200 dark:border-slate-700 text-xs font-semibold space-x-4 overflow-x-auto pb-2">
          {[
            { id: 'summary', label: 'EHR Summary' },
            { id: 'appointments', label: `My Appointments (${myAppointments.length})` },
            { id: 'prescriptions', label: `Prescriptions (${myPrescriptions.length})` },
            { id: 'reports', label: `Lab & Radiology (${myLabs.length + myRadiology.length})` },
            { id: 'billing', label: `Bills & Insurance (${myInvoices.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Summary */}
        {activeTab === 'summary' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Personal Health Profile</h3>
              <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <p>Full Legal Name: <strong className="text-slate-900 dark:text-slate-100">{myPatient.name}</strong></p>
                <p>Date of Birth: {myPatient.dob} ({myPatient.age} years)</p>
                <p>Gender: {myPatient.gender} · Blood Group: <strong className="text-blue-600 font-mono">{myPatient.bloodGroup}</strong></p>
                <p>Phone: {myPatient.phone}</p>
                <p>Email: {myPatient.email}</p>
                <p>Address: {myPatient.address}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Care Team & Coverage</h3>
              <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <p>Primary Clinic: <strong className="text-slate-900 dark:text-slate-100">{myPatient.department}</strong></p>
                <p>Attending Physician: <strong className="text-slate-900 dark:text-slate-100">{myPatient.assignedDoctorName}</strong></p>
                <p>Insurance Carrier: {myPatient.insuranceProvider}</p>
                <p className="font-mono text-[11px]">Policy No: {myPatient.insurancePolicyNumber}</p>
                <p>Emergency Contact: {myPatient.emergencyContact.name} ({myPatient.emergencyContact.relationship}) · {myPatient.emergencyContact.phone}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-3 text-xs">
            {myAppointments.map(a => (
              <div key={a.id} className="p-3.5 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    {a.doctorName} · {a.departmentName}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {a.date} at {a.time} ({a.type}) · Ref: <span className="font-mono">{a.id}</span>
                  </div>
                  {a.symptoms && <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 italic">{a.symptoms}</p>}
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    a.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {a.status}
                  </span>
                  {a.tokenNumber && (
                    <div className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 mt-1">
                      Token #{a.tokenNumber}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Prescriptions */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-3 text-xs">
            {myPrescriptions.map(rx => (
              <div key={rx.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{rx.id}</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{rx.diagnosis}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Issued by {rx.doctorName} on {rx.date} · {rx.medications.length} medicines
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPrescription(rx)}
                  className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-medium"
                >
                  View Rx
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Laboratory Pathology Reports</h4>
              {myLabs.map(lab => (
                <div key={lab.id} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{lab.testName}</span>
                      <div className="text-[11px] text-slate-500">Specimen: {lab.sampleType} · Date: {lab.orderDate}</div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-semibold rounded">
                      {lab.processingStatus}
                    </span>
                  </div>
                  {lab.resultValue && (
                    <div className="mt-2 p-2 rounded bg-slate-50 dark:bg-slate-900 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                      {lab.resultValue}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Medical Imaging & Radiology</h4>
              {myRadiology.map(rad => (
                <div key={rad.id} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{rad.modality}: {rad.bodyPart}</span>
                      <div className="text-[11px] text-slate-500">Date: {rad.orderDate}</div>
                    </div>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-semibold rounded">
                      {rad.status}
                    </span>
                  </div>
                  {rad.findings && (
                    <p className="mt-2 text-slate-600 dark:text-slate-300 italic text-[11px]">
                      {rad.findings}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Billing */}
        {activeTab === 'billing' && (
          <div className="space-y-3 text-xs">
            {myInvoices.map(inv => (
              <div key={inv.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{inv.id}</span>
                    <span className="text-slate-400">·</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">${inv.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Insurance Covered: ${inv.insuranceCoveredAmount.toLocaleString()} · Balance Due: ${inv.balanceDue.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {inv.status}
                  </span>
                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-medium"
                  >
                    View Statement
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
