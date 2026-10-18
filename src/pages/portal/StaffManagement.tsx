import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { UserCog, Search, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const StaffManagement: React.FC = () => {
  const { staff } = useHospital();
  const [roleFilter, setRoleFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredStaff = staff.filter(s => {
    if (roleFilter !== 'all' && s.role !== roleFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.department.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Staff Directory & Hospital Human Resources
          </h1>
          <p className="text-xs text-slate-500">
            Medical faculty, registered nurses, laboratory technicians, pharmacists and administrators.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-3 text-xs">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search staff by name or department..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            <option value="all">All Roles</option>
            <option value="Doctor">Physicians / Doctors</option>
            <option value="Nurse">Registered Nurses</option>
            <option value="Lab Technician">Lab Technicians</option>
            <option value="Pharmacist">Pharmacists</option>
            <option value="Receptionist">Receptionists</option>
            <option value="Admin">Administration</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 text-[10px] uppercase font-semibold">
                <th className="py-2.5">Staff ID</th>
                <th className="py-2.5">Full Name</th>
                <th className="py-2.5">Clinical Role</th>
                <th className="py-2.5">Department</th>
                <th className="py-2.5">Shift Duty</th>
                <th className="py-2.5">Contact Details</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStaff.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-mono font-bold text-blue-600 dark:text-blue-400">{emp.id}</td>
                  <td className="py-3 font-bold text-slate-900 dark:text-slate-100">{emp.name}</td>
                  <td className="py-3 text-slate-700 dark:text-slate-300 font-medium">{emp.role}</td>
                  <td className="py-3 text-slate-500">{emp.department}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300 font-mono text-[11px]">{emp.shift}</td>
                  <td className="py-3 text-slate-500">
                    <div>{emp.phone}</div>
                    <div className="text-[10px] text-slate-400">{emp.email}</div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      {emp.status}
                    </span>
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
