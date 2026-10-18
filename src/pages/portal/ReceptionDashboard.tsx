import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  UserCheck,
  UserPlus,
  Calendar,
  ListOrdered,
  Bed,
  CreditCard,
  Search,
  Clock,
  CheckCircle2,
  Stethoscope,
  ArrowRight,
  Plus
} from 'lucide-react';
import { Patient } from '../../types';

export const ReceptionDashboard: React.FC = () => {
  const {
    patients,
    doctors,
    appointments,
    beds,
    opdQueue,
    billing,
    addPatient,
    setIsBookModalOpen,
    setSelectedPatientId,
    setSelectedInvoice,
  } = useHospital();

  const [searchPatientText, setSearchPatientText] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // New patient registration form state
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('35');
  const [newGender, setNewGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newDob, setNewDob] = useState('1991-05-14');
  const [newBloodGroup, setNewBloodGroup] = useState<Patient['bloodGroup']>('O+');
  const [newPhone, setNewPhone] = useState('+1 (555) 789-0123');
  const [newEmail, setNewEmail] = useState('');
  const [newAddress, setNewAddress] = useState('142 Highland Terrace, Metro City');
  const [newEmergencyName, setNewEmergencyName] = useState('Family Contact');
  const [newEmergencyPhone, setNewEmergencyPhone] = useState('+1 (555) 789-0124');
  const [newDepartment, setNewDepartment] = useState('General Internal Medicine');

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchPatientText.toLowerCase()) ||
    p.id.toLowerCase().includes(searchPatientText.toLowerCase()) ||
    p.phone.includes(searchPatientText)
  );

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const created = addPatient({
      name: newName,
      age: parseInt(newAge) || 30,
      gender: newGender,
      dob: newDob,
      bloodGroup: newBloodGroup,
      phone: newPhone,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      address: newAddress,
      emergencyContact: {
        name: newEmergencyName,
        relationship: 'Primary Contact',
        phone: newEmergencyPhone,
      },
      allergies: [],
      chronicConditions: [],
      status: 'Outpatient',
      department: newDepartment,
    });

    setIsRegisterModalOpen(false);
    setSelectedPatientId(created.id);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-white tracking-tight">
              Front Desk, Admissions & Patient Registration
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-700/60 text-teal-200">
              CENTRAL RECEPTION
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Patient onboarding, OPD token triage, outpatient appointment desk, and admission coordinate.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register New Patient</span>
          </button>
          <button
            onClick={() => setIsBookModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Total Registered</span>
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {patients.length}
          </div>
          <div className="text-[10px] text-slate-500">In hospital database</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">OPD Token Queue</span>
            <ListOrdered className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {opdQueue.length} Active
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">Avg wait: 12 min</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Doctors Available</span>
            <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {doctors.filter(d => d.isAvailableToday).length} / {doctors.length}
          </div>
          <div className="text-[10px] text-indigo-600 font-medium">Clinics active</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-semibold">Available Beds</span>
            <Bed className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {beds.filter(b => b.status === 'Available').length}
          </div>
          <div className="text-[10px] text-slate-500">Ready for admission</div>
        </div>
      </div>

      {/* Main Grid: OPD Live Queue & Patient Directory Lookup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* OPD Live Token Queue */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Live OPD Token Waiting Queue
              </h2>
              <p className="text-[11px] text-slate-500">Central reception triage monitor</p>
            </div>
            <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
              Now Serving #101
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {opdQueue.map(item => (
              <div
                key={item.tokenNumber}
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold font-mono flex items-center justify-center text-sm">
                    #{item.tokenNumber}
                  </div>
                  <div>
                    <button
                      onClick={() => setSelectedPatientId(item.patientId)}
                      className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 text-left"
                    >
                      {item.patientName}
                    </button>
                    <div className="text-[11px] text-slate-500">
                      {item.doctorName} · {item.department}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    item.status === 'With Doctor' ? 'bg-blue-100 text-blue-800' :
                    item.status === 'Vitals Taken' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {item.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5">Est. wait: {item.estimatedWaitMinutes}m</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Quick Directory & Check-in */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                Patient Search & Rapid Check-in
              </h2>
              <p className="text-[11px] text-slate-500">Lookup patient by name, ID or phone</p>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, patient ID (PAT-1049) or phone..."
              value={searchPatientText}
              onChange={e => setSearchPatientText(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <div className="space-y-2 text-xs max-h-72 overflow-y-auto">
            {filteredPatients.slice(0, 5).map(pt => (
              <div
                key={pt.id}
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <span>{pt.name}</span>
                    <span className="font-mono text-[10px] text-slate-400">{pt.id}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {pt.phone} · {pt.gender}, {pt.age}y · Blood: {pt.bloodGroup}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPatientId(pt.id)}
                    className="px-2.5 py-1 border border-slate-200 dark:border-slate-700 rounded text-[11px] font-medium hover:bg-white dark:hover:bg-slate-800"
                  >
                    View EMR
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODAL: Register New Patient */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  New Patient Registration Desk
                </h3>
                <p className="text-xs text-slate-500">Create electronic medical record & assign patient ID</p>
              </div>
              <button onClick={() => setIsRegisterModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterPatient} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    placeholder="e.g. Jonathan Wright"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={newDob}
                    onChange={e => setNewDob(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Age</label>
                  <input
                    type="number"
                    value={newAge}
                    onChange={e => setNewAge(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Gender</label>
                  <select
                    value={newGender}
                    onChange={e => setNewGender(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Blood Group</label>
                  <select
                    value={newBloodGroup}
                    onChange={e => setNewBloodGroup(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Primary Department</label>
                  <input
                    type="text"
                    value={newDepartment}
                    onChange={e => setNewDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Residential Street Address</label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={e => setNewAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
