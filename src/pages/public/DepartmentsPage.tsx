import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Department } from '../../types';
import { Activity, Stethoscope, Bed, Phone, MapPin, CheckCircle2, ArrowRight, X } from 'lucide-react';

export const DepartmentsPage: React.FC = () => {
  const {
    departments,
    doctors,
    setIsBookModalOpen,
    setSelectedDoctorForBooking,
  } = useHospital();

  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Medical & Surgical Institutes
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Clinical Departments & Specialized Centers
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Explore NovaCare's multidisciplinary clinical institutes. Each department brings together specialized diagnostic imaging, board-certified physician faculty, and dedicated nursing care.
        </p>
      </div>

      {/* Grid of all departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => {
          const deptDoctors = doctors.filter(d => d.departmentId === dept.id);
          return (
            <div
              key={dept.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col justify-between space-y-6 hover:border-blue-500 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {dept.code}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                    Lead: {dept.headOfDept}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {dept.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Clinical Capacity:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{dept.bedsCount} Inpatient Beds</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Faculty Specialists:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{dept.doctorsCount} Physicians</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Campus Location:</span>
                    <span className="text-slate-700 dark:text-slate-200">{dept.floor}</span>
                  </div>
                </div>

                {/* Specialties preview */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {dept.keySpecialties.slice(0, 3).map((spec, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex gap-2">
                <button
                  onClick={() => setSelectedDept(dept)}
                  className="flex-1 py-2 text-center text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => {
                    const firstDoc = deptDoctors[0];
                    if (firstDoc) setSelectedDoctorForBooking(firstDoc);
                    setIsBookModalOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Book
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Department Detail Modal */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">{selectedDept.code}</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">{selectedDept.name}</h2>
                  <p className="text-xs text-slate-500">{selectedDept.floor} · Ext: {selectedDept.phoneExtension}</p>
                </div>
                <button onClick={() => setSelectedDept(null)} className="p-1 rounded text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedDept.description}
              </p>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-2">Clinical Services & Procedures Offered:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedDept.services.map((srv, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-500">
                  Head of Institute: <strong className="text-slate-900 dark:text-slate-100">{selectedDept.headOfDept}</strong>
                </span>
                <button
                  onClick={() => {
                    const match = doctors.find(d => d.departmentId === selectedDept.id);
                    if (match) setSelectedDoctorForBooking(match);
                    setSelectedDept(null);
                    setIsBookModalOpen(true);
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
                >
                  Schedule Department Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
