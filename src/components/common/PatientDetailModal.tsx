import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  X,
  User,
  HeartPulse,
  Calendar,
  FileText,
  FlaskConical,
  Scan,
  CreditCard,
  Plus,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Printer
} from 'lucide-react';

export const PatientDetailModal: React.FC = () => {
  const {
    selectedPatientId,
    setSelectedPatientId,
    patients,
    appointments,
    prescriptions,
    labTests,
    radiology,
    billing,
    vitals,
    setSelectedInvoice,
    setSelectedPrescription,
    setIsVitalsModalOpen,
    setVitalsTargetPatient,
    updatePatient,
  } = useHospital();

  const [activeTab, setActiveTab] = useState<'overview' | 'vitals' | 'appointments' | 'prescriptions' | 'lab_radiology' | 'billing'>('overview');
  const [isEditing, setIsEditing] = useState(false);

  const patient = patients.find(p => p.id === selectedPatientId);
  if (!patient) return null;

  // Linked records
  const patientAppts = appointments.filter(a => a.patientId === patient.id);
  const patientPrescriptions = prescriptions.filter(p => p.patientId === patient.id);
  const patientLab = labTests.filter(l => l.patientId === patient.id);
  const patientRadiology = radiology.filter(r => r.patientId === patient.id);
  const patientInvoices = billing.filter(b => b.patientId === patient.id);
  const patientVitals = vitals.filter(v => v.patientId === patient.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        
        {/* Header Strip */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm">
              {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {patient.name}
                </h3>
                <span className="font-mono text-xs text-slate-500">{patient.id}</span>
                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                  patient.status === 'Inpatient'
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    : patient.status === 'Emergency Care'
                    ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  {patient.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {patient.age}y · {patient.gender} · Blood Group: <strong className="text-slate-700 dark:text-slate-300">{patient.bloodGroup}</strong> · Last Visit: {patient.lastVisit}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setVitalsTargetPatient(patient);
                setIsVitalsModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <HeartPulse className="w-3.5 h-3.5" />
              Record Vitals
            </button>
            <button
              onClick={() => setSelectedPatientId(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs font-medium space-x-1">
          {[
            { id: 'overview', label: 'EHR Summary', icon: User },
            { id: 'vitals', label: `Vitals (${patientVitals.length})`, icon: HeartPulse },
            { id: 'appointments', label: `Appointments (${patientAppts.length})`, icon: Calendar },
            { id: 'prescriptions', label: `Prescriptions (${patientPrescriptions.length})`, icon: FileText },
            { id: 'lab_radiology', label: `Labs & Scans (${patientLab.length + patientRadiology.length})`, icon: FlaskConical },
            { id: 'billing', label: `Billing & Invoices (${patientInvoices.length})`, icon: CreditCard },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6 text-xs">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Clinical Alerts / Allergies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-semibold mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    Known Drug & Food Allergies
                  </div>
                  {patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {patient.allergies.map((allg, idx) => (
                        <span key={idx} className="px-2 py-1 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-200 font-semibold text-[11px]">
                          {allg}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500">No known documented allergies (NKDA).</p>
                  )}
                </div>

                <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold mb-2">
                    <HeartPulse className="w-4 h-4" />
                    Chronic Conditions & Co-morbidities
                  </div>
                  {patient.chronicConditions.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {patient.chronicConditions.map((cond, idx) => (
                        <span key={idx} className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200 font-semibold text-[11px]">
                          {cond}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500">No active chronic conditions documented.</p>
                  )}
                </div>
              </div>

              {/* Demographics & Admission details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30">
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 uppercase text-[10px] tracking-wider text-slate-400">
                    Demographic & Contact
                  </h4>
                  <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{patient.phone}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{patient.email}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{patient.address}</span>
                    </p>
                    <p className="text-slate-500 pt-1">
                      Emergency Contact: <strong className="text-slate-700 dark:text-slate-300">{patient.emergencyContact.name}</strong> ({patient.emergencyContact.relationship}) · {patient.emergencyContact.phone}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 uppercase text-[10px] tracking-wider text-slate-400">
                    Care Coordination & Insurance
                  </h4>
                  <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
                    <p>Primary Department: <strong className="text-slate-900 dark:text-slate-100">{patient.department}</strong></p>
                    {patient.assignedDoctorName && (
                      <p>Attending Physician: <strong className="text-slate-900 dark:text-slate-100">{patient.assignedDoctorName}</strong></p>
                    )}
                    {patient.roomBed && (
                      <p>Allocated Ward/Bed: <strong className="text-blue-600 dark:text-blue-400">{patient.roomBed}</strong> (Admitted: {patient.admissionDate})</p>
                    )}
                    <p>Insurance Carrier: <strong className="text-slate-700 dark:text-slate-300">{patient.insuranceProvider || 'Self-Pay / Not on file'}</strong></p>
                    {patient.insurancePolicyNumber && (
                      <p className="font-mono text-[11px] text-slate-500">Policy: {patient.insurancePolicyNumber}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VITALS */}
          {activeTab === 'vitals' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Physiological Vitals History</span>
                <button
                  onClick={() => {
                    setVitalsTargetPatient(patient);
                    setIsVitalsModalOpen(true);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-medium"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Log New Reading
                </button>
              </div>

              {patientVitals.length === 0 ? (
                <div className="py-8 text-center text-slate-400">No vitals logged yet for this patient.</div>
              ) : (
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase text-slate-400 font-semibold">
                      <tr>
                        <th className="py-2.5 px-3">Date / Time</th>
                        <th className="py-2.5 px-3">BP (mmHg)</th>
                        <th className="py-2.5 px-3">Heart Rate</th>
                        <th className="py-2.5 px-3">SpO2</th>
                        <th className="py-2.5 px-3">Temp (°F)</th>
                        <th className="py-2.5 px-3">Taken By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {patientVitals.map(v => (
                        <tr key={v.id}>
                          <td className="py-2.5 px-3 font-mono text-slate-500">{v.timestamp}</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">{v.bloodPressure}</td>
                          <td className="py-2.5 px-3 tabular-nums">{v.heartRate} bpm</td>
                          <td className="py-2.5 px-3 tabular-nums text-emerald-600 dark:text-emerald-400 font-semibold">{v.spO2}%</td>
                          <td className="py-2.5 px-3 tabular-nums">{v.temperature}°F</td>
                          <td className="py-2.5 px-3 text-slate-500">{v.takenBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="space-y-3">
              {patientAppts.length === 0 ? (
                <div className="py-8 text-center text-slate-400">No appointment history for this patient.</div>
              ) : (
                patientAppts.map(a => (
                  <div key={a.id} className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {a.doctorName} <span className="text-slate-400 font-normal">· {a.departmentName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Ref: <span className="font-mono">{a.id}</span> · {a.date} at {a.time} ({a.type})
                      </div>
                      {a.symptoms && <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 italic">{a.symptoms}</p>}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      a.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      a.status === 'In Consultation' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {a.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: PRESCRIPTIONS */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-3">
              {patientPrescriptions.length === 0 ? (
                <div className="py-8 text-center text-slate-400">No prescriptions on record.</div>
              ) : (
                patientPrescriptions.map(rx => (
                  <div key={rx.id} className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{rx.id}</span>
                        <span className="text-slate-400">·</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{rx.diagnosis}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Prescribed by {rx.doctorName} on {rx.date} · {rx.medications.length} medications
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPrescription(rx)}
                      className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-xs font-medium"
                    >
                      View Full Rx
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 5: LAB & RADIOLOGY */}
          {activeTab === 'lab_radiology' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Diagnostic Laboratory Orders</h4>
                {patientLab.length === 0 ? (
                  <p className="text-slate-400">No laboratory test orders.</p>
                ) : (
                  <div className="space-y-2">
                    {patientLab.map(lab => (
                      <div key={lab.id} className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">{lab.testName}</span>
                            <span className="text-[11px] font-mono text-slate-400 ml-2">({lab.id})</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            lab.processingStatus === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {lab.processingStatus}
                          </span>
                        </div>
                        {lab.resultValue && (
                          <div className="mt-1.5 p-2 bg-slate-50 dark:bg-slate-800/50 rounded font-mono text-[11px] text-slate-700 dark:text-slate-300">
                            Result: {lab.resultValue} · Ref: {lab.normalRange}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2">
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Radiology & Medical Imaging</h4>
                {patientRadiology.length === 0 ? (
                  <p className="text-slate-400">No radiology orders.</p>
                ) : (
                  <div className="space-y-2">
                    {patientRadiology.map(rad => (
                      <div key={rad.id} className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">{rad.modality}: {rad.bodyPart}</span>
                            <span className="text-[11px] font-mono text-slate-400 ml-2">({rad.id})</span>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                            {rad.status}
                          </span>
                        </div>
                        {rad.findings && (
                          <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-1.5 italic">
                            Findings: {rad.findings}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: BILLING */}
          {activeTab === 'billing' && (
            <div className="space-y-3">
              {patientInvoices.length === 0 ? (
                <div className="py-8 text-center text-slate-400">No invoices generated for this patient.</div>
              ) : (
                patientInvoices.map(inv => (
                  <div key={inv.id} className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">{inv.id}</span>
                        <span className="text-slate-400">·</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">${inv.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Date: {inv.invoiceDate} · Paid: ${inv.paidAmount.toLocaleString()} · Balance: ${inv.balanceDue.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                        inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {inv.status}
                      </span>
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-xs font-medium hover:bg-slate-50"
                      >
                        View Bill
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
