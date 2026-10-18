import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Patient } from '../../types';
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  HeartPulse,
  Phone,
  Calendar,
  AlertTriangle,
  ArrowUpDown
} from 'lucide-react';

export const PatientsManagement: React.FC = () => {
  const {
    patients,
    setSelectedPatientId,
    setIsVitalsModalOpen,
    setVitalsTargetPatient,
    addPatient,
    addToast,
  } = useHospital();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');
  const [sortField, setSortField] = useState<'name' | 'id' | 'age' | 'lastVisit'>('name');
  const [sortAsc, setSortAsc] = useState(true);

  // Add Patient modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('42');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [bloodGroup, setBloodGroup] = useState<Patient['bloodGroup']>('O+');
  const [phone, setPhone] = useState('+1 (555) 301-8840');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('220 Riverside Ave, Metro City');
  const [department, setDepartment] = useState('Cardiology & Vascular Institute');

  const filteredPatients = patients.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (deptFilter !== 'all' && p.department !== deptFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        p.department.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    let comp = 0;
    if (sortField === 'name') comp = a.name.localeCompare(b.name);
    else if (sortField === 'id') comp = a.id.localeCompare(b.id);
    else if (sortField === 'age') comp = a.age - b.age;
    else if (sortField === 'lastVisit') comp = a.lastVisit.localeCompare(b.lastVisit);
    return sortAsc ? comp : -comp;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addPatient({
      name,
      age: parseInt(age) || 30,
      gender,
      dob: '1984-06-15',
      bloodGroup,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      address,
      emergencyContact: {
        name: 'Family Primary Contact',
        relationship: 'Spouse',
        phone: phone,
      },
      allergies: [],
      chronicConditions: [],
      status: 'Outpatient',
      department,
    });

    setIsAddModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Patient Directory & Electronic Medical Records (EMR)
          </h1>
          <p className="text-xs text-slate-500">
            Unified patient registry with clinical histories, admissions, allergies, and diagnostic orders.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Register Patient</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by patient name, ID (PAT-1049), phone..."
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
              <option value="all">All Care Statuses</option>
              <option value="Outpatient">Outpatient</option>
              <option value="Inpatient">Inpatient</option>
              <option value="Emergency Care">Emergency Care</option>
              <option value="Discharged">Discharged</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <div className="flex items-center justify-between text-slate-500 py-2">
              <span>Found: <strong className="text-slate-900 dark:text-slate-100">{filteredPatients.length}</strong> patients</span>
            </div>
          </div>

        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-semibold">
              <tr>
                <th className="py-3 px-4 cursor-pointer" onClick={() => { setSortField('id'); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center gap-1">
                    <span>Patient ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 cursor-pointer" onClick={() => { setSortField('name'); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center gap-1">
                    <span>Full Name</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 cursor-pointer" onClick={() => { setSortField('age'); setSortAsc(!sortAsc); }}>
                  <div className="flex items-center gap-1">
                    <span>Age / Gender</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Blood</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4">Primary Department</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Ward / Bed</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPatients.map(pt => (
                <tr key={pt.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {pt.id}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedPatientId(pt.id)}
                      className="font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 text-left"
                    >
                      {pt.name}
                    </button>
                    {pt.allergies.length > 0 && (
                      <div className="text-[10px] text-rose-600 flex items-center gap-1 font-semibold">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        <span>Allergic: {pt.allergies.join(', ')}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {pt.age}y · {pt.gender}
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {pt.bloodGroup}
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono">
                    {pt.phone}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    {pt.department}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                      pt.status === 'Inpatient' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                      pt.status === 'Emergency Care' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                      pt.status === 'Discharged' ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300' :
                      'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {pt.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                    {pt.roomBed || '—'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => setSelectedPatientId(pt.id)}
                        className="p-1 text-slate-500 hover:text-blue-600"
                        title="View Complete EHR"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setVitalsTargetPatient(pt);
                          setIsVitalsModalOpen(true);
                        }}
                        className="p-1 text-slate-500 hover:text-rose-600"
                        title="Record Vitals"
                      >
                        <HeartPulse className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Patient Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Register New Inpatient / Outpatient
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Patient Name"
                    className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value as any)}
                    className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={e => setBloodGroup(e.target.value as any)}
                    className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
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
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Clinical Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white rounded font-semibold"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
