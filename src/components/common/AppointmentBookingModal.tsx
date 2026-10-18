import React, { useState, useEffect } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { X, Calendar, Clock, Stethoscope, User, CheckCircle2, Printer } from 'lucide-react';
import { Appointment } from '../../types';

export const AppointmentBookingModal: React.FC = () => {
  const {
    isBookModalOpen,
    setIsBookModalOpen,
    selectedDoctorForBooking,
    setSelectedDoctorForBooking,
    departments,
    doctors,
    patients,
    bookAppointment,
  } = useHospital();

  const [selectedDeptId, setSelectedDeptId] = useState('');
  const [selectedDocId, setSelectedDocId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('09:30 AM');
  const [visitType, setVisitType] = useState<Appointment['type']>('In-Person Consultation');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('45');
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [patientPhone, setPatientPhone] = useState('+1 (555) 234-5891');
  const [patientEmail, setPatientEmail] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [existingPatientId, setExistingPatientId] = useState('');
  
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);

  // Auto-fill if a doctor was clicked
  useEffect(() => {
    if (selectedDoctorForBooking) {
      setSelectedDeptId(selectedDoctorForBooking.departmentId);
      setSelectedDocId(selectedDoctorForBooking.id);
    } else if (departments.length > 0 && !selectedDeptId) {
      setSelectedDeptId(departments[0].id);
    }
    // Set default tomorrow date
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  }, [selectedDoctorForBooking, departments]);

  // When existing patient is chosen, autofill
  const handleExistingPatientSelect = (pId: string) => {
    setExistingPatientId(pId);
    const found = patients.find(p => p.id === pId);
    if (found) {
      setPatientName(found.name);
      setPatientAge(String(found.age));
      setPatientGender(found.gender);
      setPatientPhone(found.phone);
      setPatientEmail(found.email);
    }
  };

  const filteredDoctors = doctors.filter(d => !selectedDeptId || d.departmentId === selectedDeptId);
  const activeDoctor = doctors.find(d => d.id === selectedDocId) || filteredDoctors[0];

  const timeSlots = [
    '08:30 AM', '09:00 AM', '09:30 AM', '10:15 AM', '11:00 AM', 
    '11:45 AM', '01:30 PM', '02:15 PM', '03:00 PM', '03:45 PM', '04:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !activeDoctor) return;

    const dept = departments.find(d => d.id === (activeDoctor ? activeDoctor.departmentId : selectedDeptId));

    const appt = bookAppointment({
      patientId: existingPatientId || `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName,
      patientPhone: patientPhone || '+1 (555) 000-0000',
      patientEmail: patientEmail || 'patient@example.com',
      doctorId: activeDoctor.id,
      doctorName: activeDoctor.name,
      departmentId: dept ? dept.id : 'dept-genmed',
      departmentName: dept ? dept.name : 'General Medicine',
      date: selectedDate,
      time: selectedTime,
      type: visitType,
      symptoms: symptoms || 'General medical consultation and assessment.',
    });

    setConfirmedAppt(appt);
  };

  const handleClose = () => {
    setIsBookModalOpen(false);
    setSelectedDoctorForBooking(null);
    setConfirmedAppt(null);
  };

  if (!isBookModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {confirmedAppt ? 'Appointment Confirmation' : 'Schedule Clinical Consultation'}
            </h3>
            <p className="text-xs text-slate-500">
              {confirmedAppt ? 'Your appointment has been registered in the hospital system.' : 'Select specialist, convenient time slot, and patient information.'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedAppt ? (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-emerald-950 dark:text-emerald-200">
                  Appointment Confirmed · {confirmedAppt.id}
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  Assigned OPD Queue Token: <strong className="font-mono font-semibold">#{confirmedAppt.tokenNumber}</strong>. Please arrive 15 minutes before your scheduled slot.
                </p>
              </div>
            </div>

            {/* Printable summary ticket */}
            <div className="p-5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 space-y-4">
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Patient Information</span>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{confirmedAppt.patientName}</div>
                  <div className="text-xs text-slate-500 font-mono">ID: {confirmedAppt.patientId} · Phone: {confirmedAppt.patientPhone}</div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">OPD Token</span>
                  <div className="text-xl font-bold font-mono text-teal-600 dark:text-teal-400">#{confirmedAppt.tokenNumber}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400">Consultant Doctor:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{confirmedAppt.doctorName}</p>
                  <p className="text-slate-500">{confirmedAppt.departmentName}</p>
                </div>
                <div>
                  <span className="text-slate-400">Date & Slot:</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{confirmedAppt.date} at {confirmedAppt.time}</p>
                  <p className="text-slate-500">{confirmedAppt.type}</p>
                </div>
              </div>

              {confirmedAppt.symptoms && (
                <div className="text-xs pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400">Chief Symptoms / Reason:</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5">{confirmedAppt.symptoms}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Slips
              </button>
              <button
                onClick={handleClose}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Step 1: Department & Doctor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Clinical Department
                </label>
                <select
                  value={selectedDeptId}
                  onChange={e => {
                    setSelectedDeptId(e.target.value);
                    const matching = doctors.filter(d => d.departmentId === e.target.value);
                    if (matching.length > 0) setSelectedDocId(matching[0].id);
                  }}
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Attending Specialist
                </label>
                <select
                  value={selectedDocId}
                  onChange={e => setSelectedDocId(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {filteredDoctors.map(doc => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} · {doc.title} (${doc.consultationFee})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Doctor Info Preview Strip */}
            {activeDoctor && (
              <div className="flex items-center gap-3 p-3 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-lg text-xs">
                <Stethoscope className="w-4 h-4 text-blue-600 shrink-0" />
                <div className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-blue-950 dark:text-blue-200">{activeDoctor.name}</span>
                  <span className="mx-1.5 text-slate-400">·</span>
                  <span>{activeDoctor.specialization}</span>
                  <span className="mx-1.5 text-slate-400">·</span>
                  <span className="text-slate-500">Hours: {activeDoctor.availableHours}</span>
                </div>
              </div>
            )}

            {/* Step 2: Date & Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Consultation Date
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Appointment Type
                </label>
                <select
                  value={visitType}
                  onChange={e => setVisitType(e.target.value as Appointment['type'])}
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="In-Person Consultation">In-Person Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Diagnostic Review">Diagnostic Review</option>
                  <option value="Second Opinion">Second Opinion</option>
                  <option value="Emergency Assessment">Emergency Assessment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Available Slot
                </label>
                <select
                  value={selectedTime}
                  onChange={e => setSelectedTime(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                >
                  {timeSlots.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick existing patient select */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Patient Information
                </label>
                <select
                  value={existingPatientId}
                  onChange={e => handleExistingPatientSelect(e.target.value)}
                  className="text-[11px] px-2 py-1 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  <option value="">Quick Autofill Demo Patient...</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-slate-500 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    placeholder="e.g. Eleanor Vance-Ross"
                    className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Age & Gender</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={patientAge}
                      onChange={e => setPatientAge(e.target.value)}
                      className="w-16 text-xs px-2 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                    <select
                      value={patientGender}
                      onChange={e => setPatientGender(e.target.value as any)}
                      className="flex-1 text-xs px-2 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={e => setPatientPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={e => setPatientEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-[11px] text-slate-500 mb-1">Presenting Symptoms / Clinical Notes</label>
                <textarea
                  rows={2}
                  value={symptoms}
                  onChange={e => setSymptoms(e.target.value)}
                  placeholder="Describe reasons for visit, onset duration, or current medications..."
                  className="w-full text-xs px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500">
                Estimated consultation fee: <strong className="text-slate-900 dark:text-slate-100">${activeDoctor?.consultationFee || 150}</strong>
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors shadow-sm"
                >
                  Confirm & Generate Token
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
