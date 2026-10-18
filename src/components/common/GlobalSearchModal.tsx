import React, { useState, useEffect, useRef } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Search, X, User, Stethoscope, Calendar, Pill, Building2, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    patients,
    doctors,
    appointments,
    pharmacy,
    departments,
    setSelectedPatientId,
    setIsInPortal,
    setPortalSection,
  } = useHospital();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingPatients = q
    ? patients.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.chronicConditions.some(c => c.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const matchingDoctors = q
    ? doctors.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.specialization.toLowerCase().includes(q) ||
          d.departmentName.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchingAppointments = q
    ? appointments.filter(
        a =>
          a.patientName.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q) ||
          a.doctorName.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchingMedicines = q
    ? pharmacy.filter(
        m =>
          m.name.toLowerCase().includes(q) ||
          m.genericName.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchingDepartments = q
    ? departments.filter(
        dep =>
          dep.name.toLowerCase().includes(q) ||
          dep.services.some(s => s.toLowerCase().includes(q))
      ).slice(0, 3)
    : [];

  const hasResults =
    matchingPatients.length > 0 ||
    matchingDoctors.length > 0 ||
    matchingAppointments.length > 0 ||
    matchingMedicines.length > 0 ||
    matchingDepartments.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search patients, doctors, appointments, medicines, departments..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-1.5 py-0.5"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="py-8 text-center text-slate-500 text-xs space-y-1">
              <p>Type to search across NovaCare clinical directories.</p>
              <p className="text-slate-400">Try searching "Elena", "Cardiology", "PAT-1049", or "Atorvastatin"</p>
            </div>
          )}

          {query && !hasResults && (
            <div className="py-8 text-center text-slate-500 text-xs">
              No clinical records found matching "{query}".
            </div>
          )}

          {/* Patients */}
          {matchingPatients.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Patients
              </div>
              <div className="space-y-1">
                {matchingPatients.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPatientId(p.id);
                      setIsInPortal(true);
                      setPortalSection('patients');
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors"
                  >
                    <div>
                      <div className="text-xs font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <span>{p.name}</span>
                        <span className="text-[11px] font-mono text-slate-400">{p.id}</span>
                        <span className="text-[11px] text-slate-500">· {p.gender}, {p.age}y</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Dept: {p.department} · Phone: {p.phone}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Doctors */}
          {matchingDoctors.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                Doctors & Specialists
              </div>
              <div className="space-y-1">
                {matchingDoctors.map(d => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setIsInPortal(true);
                      setPortalSection('doctors');
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors"
                  >
                    <div>
                      <div className="text-xs font-medium text-slate-900 dark:text-slate-100">
                        {d.name} <span className="text-slate-500 text-[11px]">· {d.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {d.departmentName} · {d.specialization}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Appointments */}
          {matchingAppointments.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                Appointments
              </div>
              <div className="space-y-1">
                {matchingAppointments.map(a => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setIsInPortal(true);
                      setPortalSection('appointments');
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors"
                  >
                    <div>
                      <div className="text-xs font-medium text-slate-900 dark:text-slate-100">
                        {a.patientName} with {a.doctorName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Ref: {a.id} · {a.date} at {a.time} · Status: {a.status}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Medicines */}
          {matchingMedicines.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-emerald-600" />
                Pharmacy Medicines
              </div>
              <div className="space-y-1">
                {matchingMedicines.map(m => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setIsInPortal(true);
                      setPortalSection('pharmacy');
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors"
                  >
                    <div>
                      <div className="text-xs font-medium text-slate-900 dark:text-slate-100">
                        {m.name} <span className="text-slate-500 text-[11px]">({m.genericName})</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Stock: {m.stockQuantity} units · Form: {m.dosageForm} · Status: {m.status}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Departments */}
          {matchingDepartments.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-sky-600" />
                Departments
              </div>
              <div className="space-y-1">
                {matchingDepartments.map(dep => (
                  <button
                    key={dep.id}
                    onClick={() => {
                      setIsInPortal(true);
                      setPortalSection('departments');
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors"
                  >
                    <div>
                      <div className="text-xs font-medium text-slate-900 dark:text-slate-100">
                        {dep.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {dep.floor} · Lead: {dep.headOfDept}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
          <span>Navigate with mouse or keyboard</span>
          <span>Press <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px]">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
