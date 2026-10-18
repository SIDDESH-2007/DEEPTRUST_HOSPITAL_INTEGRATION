import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Doctor } from '../../types';
import { Search, Stethoscope, Star, Clock, MapPin, Globe2, Calendar, Phone, Award, CheckCircle2 } from 'lucide-react';

export const DoctorsPage: React.FC = () => {
  const {
    doctors,
    departments,
    setIsBookModalOpen,
    setSelectedDoctorForBooking,
  } = useHospital();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [selectedDoctorProfile, setSelectedDoctorProfile] = useState<Doctor | null>(null);

  const filteredDoctors = doctors.filter(doc => {
    if (selectedDeptFilter !== 'all' && doc.departmentId !== selectedDeptFilter) return false;
    if (availableTodayOnly && !doc.isAvailableToday) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        doc.name.toLowerCase().includes(q) ||
        doc.specialization.toLowerCase().includes(q) ||
        doc.departmentName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Medical Faculty
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Find a Specialist Doctor
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Book appointments with our leading board-certified physicians, interventional surgeons, and pediatric specialists.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search doctor by name or specialty..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedDeptFilter}
              onChange={e => setSelectedDeptFilter(e.target.value)}
              className="w-full py-2 px-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
            >
              <option value="all">All Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 flex items-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={availableTodayOnly}
                onChange={e => setAvailableTodayOnly(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              <span>Available Today Only</span>
            </label>
          </div>

        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="py-16 text-center text-slate-500 space-y-2">
          <Stethoscope className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm">No specialists found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doc => (
            <div
              key={doc.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:border-blue-500 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold flex items-center justify-center text-base border border-teal-200 dark:border-teal-900/50">
                      {doc.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                        {doc.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{doc.rating}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                    {doc.departmentName}
                  </span>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                    {doc.specialization}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <p className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{doc.qualification}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{doc.availableHours}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{doc.roomNo}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Globe2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Languages: {doc.languages.join(', ')}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">Consultation Fee:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">${doc.consultationFee}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedDoctorForBooking(doc);
                    setIsBookModalOpen(true);
                  }}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
