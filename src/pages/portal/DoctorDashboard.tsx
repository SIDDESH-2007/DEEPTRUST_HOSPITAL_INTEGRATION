import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Calendar,
  Users,
  Clock,
  FlaskConical,
  Siren,
  FileText,
  Plus,
  Stethoscope,
  Scan,
  HeartPulse,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  X
} from 'lucide-react';
import { MedicationItem, Prescription, LabTestOrder, RadiologyOrder } from '../../types';

export const DoctorDashboard: React.FC = () => {
  const {
    currentUser,
    appointments,
    patients,
    labTests,
    radiology,
    prescriptions,
    addPrescription,
    addLabTest,
    setSelectedPatientId,
    setSelectedPrescription,
    setPortalSection,
    addToast,
  } = useHospital();

  // Dialog states for clinical actions
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [isLabOrderModalOpen, setIsLabOrderModalOpen] = useState(false);
  const [isRadOrderModalOpen, setIsRadOrderModalOpen] = useState(false);

  // Active patient for prescription/orders
  const [selectedPatientForRx, setSelectedPatientForRx] = useState(patients[0]?.id || '');
  const [diagnosis, setDiagnosis] = useState('');
  const [vitalsInput, setVitalsInput] = useState('BP: 120/80 mmHg | HR: 72 bpm');
  const [clinicalAdvice, setClinicalAdvice] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [medsList, setMedsList] = useState<MedicationItem[]>([
    { medicineName: 'Atorvastatin Calcium', dosage: '40mg', frequency: 'Once daily at night', duration: '30 days', instructions: 'Take after dinner' },
  ]);

  // Lab order form state
  const [labPatientId, setLabPatientId] = useState(patients[0]?.id || '');
  const [labTestName, setLabTestName] = useState('High-Sensitivity Troponin-T (hs-cTnT)');
  const [labCategory, setLabCategory] = useState<LabTestOrder['category']>('Biochemistry');
  const [labSampleType, setLabSampleType] = useState<LabTestOrder['sampleType']>('Serum');

  // Doctor metrics
  const myAppointments = appointments.filter(a => a.doctorId === currentUser.id || a.doctorName.includes(currentUser.name.split(' ')[0]));
  const todayAppointments = appointments.slice(0, 4); // sample active queue
  const pendingLabs = labTests.filter(l => l.processingStatus !== 'Completed');
  const emergencyCases = patients.filter(p => p.status === 'Emergency Care');

  const handleAddMedicationRow = () => {
    setMedsList(prev => [
      ...prev,
      { medicineName: '', dosage: '', frequency: 'Twice daily', duration: '7 days', instructions: '' },
    ]);
  };

  const handleCreateRx = (e: React.FormEvent) => {
    e.preventDefault();
    const pt = patients.find(p => p.id === selectedPatientForRx);
    if (!pt) return;

    addPrescription({
      patientId: pt.id,
      patientName: pt.name,
      patientAge: pt.age,
      patientGender: pt.gender,
      doctorId: currentUser.id,
      doctorName: currentUser.name,
      department: currentUser.department,
      diagnosis: diagnosis || 'Clinical evaluation and prescription titration',
      vitals: vitalsInput,
      medications: medsList.filter(m => m.medicineName.trim().length > 0),
      advice: clinicalAdvice || 'Maintain prescribed hydration and balanced nutrition. Return if symptoms persist.',
      followUpDate: followUpDate || 'In 14 days',
    });

    setIsRxModalOpen(false);
    setDiagnosis('');
  };

  const handleCreateLabOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const pt = patients.find(p => p.id === labPatientId);
    if (!pt) return;

    addLabTest({
      patientId: pt.id,
      patientName: pt.name,
      doctorName: currentUser.name,
      testName: labTestName,
      category: labCategory,
      sampleType: labSampleType,
      normalRange: 'Refer to institutional laboratory reference manual',
      flag: 'Normal',
      notes: 'Priority clinical investigation requisition.',
    });

    setIsLabOrderModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Doctor Header Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-tight">
              Physician Consultation & Clinical Workstation
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-700/60 text-teal-200">
              {currentUser.name}
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            {currentUser.department} · Outpatient consultations, e-Prescriptions, and inpatient rounds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRxModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Write e-Prescription</span>
          </button>
          <button
            onClick={() => setIsLabOrderModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Order Lab Test</span>
          </button>
        </div>
      </div>

      {/* 5 Doctor Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Today's Appts</span>
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {todayAppointments.length}
          </div>
          <div className="text-[10px] text-slate-500">Scheduled slots</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Active Patients</span>
            <Users className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {patients.length}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">In care roster</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Consultations</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            1 Active
          </div>
          <div className="text-[10px] text-amber-600 font-medium">Token #101 In Room</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Pending Labs</span>
            <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {pendingLabs.length}
          </div>
          <div className="text-[10px] text-slate-500">Awaiting analyzer</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Emergency Alerts</span>
            <Siren className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-lg font-bold font-mono text-rose-600 dark:text-rose-400 tabular-nums">
            {emergencyCases.length}
          </div>
          <div className="text-[10px] text-rose-600 font-medium">STAT Trauma Bay 02</div>
        </div>
      </div>

      {/* Main Grid: Consultation Schedule + Diagnostic Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Outpatient Appointments Queue */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Today's Clinic Consultation Queue
              </h2>
              <p className="text-[11px] text-slate-500">Patient arrival and clinical triage status</p>
            </div>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              Suite 304 Active
            </span>
          </div>

          <div className="space-y-3">
            {todayAppointments.map(appt => (
              <div
                key={appt.id}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/40 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                      Token #{appt.tokenNumber}
                    </span>
                    <button
                      onClick={() => setSelectedPatientId(appt.patientId)}
                      className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 text-left"
                    >
                      {appt.patientName}
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono">({appt.patientId})</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Reason: {appt.symptoms}
                  </p>
                  <div className="text-[10px] text-slate-500">
                    Time: {appt.time} · Type: {appt.type}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedPatientForRx(appt.patientId);
                      setIsRxModalOpen(true);
                    }}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-semibold"
                  >
                    Prescribe
                  </button>
                  <button
                    onClick={() => setSelectedPatientId(appt.patientId)}
                    className="px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded text-[11px] font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Open EHR
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Laboratory & Radiology Feed */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Signed Diagnostic Investigation Reports
              </h2>
              <p className="text-[11px] text-slate-500">Pathology & Radiology PACS Feed</p>
            </div>
          </div>

          <div className="space-y-3">
            {labTests.slice(0, 3).map(lab => (
              <div
                key={lab.id}
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/40 text-xs space-y-1.5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{lab.testName}</span>
                    <div className="text-[11px] text-slate-500 font-mono">Patient: {lab.patientName}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    lab.processingStatus === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {lab.processingStatus}
                  </span>
                </div>
                {lab.resultValue && (
                  <p className="p-2 rounded bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                    {lab.resultValue}
                  </p>
                )}
              </div>
            ))}

            {radiology.slice(0, 1).map(rad => (
              <div
                key={rad.id}
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/40 text-xs space-y-1.5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{rad.modality}: {rad.bodyPart}</span>
                    <div className="text-[11px] text-slate-500">Patient: {rad.patientName}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-semibold">
                    {rad.status}
                  </span>
                </div>
                {rad.findings && (
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                    Findings: {rad.findings}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODAL: Write Electronic Prescription */}
      {isRxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Issue Digital Prescription (e-Rx)
                </h3>
              </div>
              <button onClick={() => setIsRxModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRx} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Select Patient</label>
                  <select
                    value={selectedPatientForRx}
                    onChange={e => setSelectedPatientForRx(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Clinical Vitals</label>
                  <input
                    type="text"
                    value={vitalsInput}
                    onChange={e => setVitalsInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Clinical Diagnosis</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coronary Artery Disease, Hyperlipidemia"
                  value={diagnosis}
                  onChange={e => setDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Medication rows */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Prescribed Medications</label>
                  <button
                    type="button"
                    onClick={handleAddMedicationRow}
                    className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Medicine</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {medsList.map((m, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="col-span-4">
                        <input
                          type="text"
                          required
                          placeholder="Medicine name"
                          value={m.medicineName}
                          onChange={e => {
                            const copy = [...medsList];
                            copy[idx].medicineName = e.target.value;
                            setMedsList(copy);
                          }}
                          className="w-full px-2 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          placeholder="Dosage (e.g. 40mg)"
                          value={m.dosage}
                          onChange={e => {
                            const copy = [...medsList];
                            copy[idx].dosage = e.target.value;
                            setMedsList(copy);
                          }}
                          className="w-full px-2 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          placeholder="Frequency"
                          value={m.frequency}
                          onChange={e => {
                            const copy = [...medsList];
                            copy[idx].frequency = e.target.value;
                            setMedsList(copy);
                          }}
                          className="w-full px-2 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          placeholder="Duration (e.g. 30 days)"
                          value={m.duration}
                          onChange={e => {
                            const copy = [...medsList];
                            copy[idx].duration = e.target.value;
                            setMedsList(copy);
                          }}
                          className="w-full px-2 py-1 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Advice & Dietary Restrictions</label>
                <textarea
                  rows={2}
                  value={clinicalAdvice}
                  onChange={e => setClinicalAdvice(e.target.value)}
                  placeholder="e.g. Low sodium cardiac diet, avoid heavy exertion"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsRxModalOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Sign & Issue Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Order Diagnostic Lab Test */}
      {isLabOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-teal-600" />
                Order Diagnostic Laboratory Test
              </h3>
              <button onClick={() => setIsLabOrderModalOpen(false)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLabOrder} className="space-y-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Patient</label>
                <select
                  value={labPatientId}
                  onChange={e => setLabPatientId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Test Name</label>
                <input
                  type="text"
                  required
                  value={labTestName}
                  onChange={e => setLabTestName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={labCategory}
                    onChange={e => setLabCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Biochemistry">Biochemistry</option>
                    <option value="Hematology">Hematology</option>
                    <option value="Microbiology">Microbiology</option>
                    <option value="Pathology">Pathology</option>
                    <option value="Immunology">Immunology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Specimen</label>
                  <select
                    value={labSampleType}
                    onChange={e => setLabSampleType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Serum">Serum</option>
                    <option value="Whole Blood">Whole Blood</option>
                    <option value="Urine">Urine</option>
                    <option value="Swab">Swab</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsLabOrderModalOpen(false)}
                  className="px-3 py-1.5 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-600 text-white rounded font-semibold"
                >
                  Submit Lab Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
