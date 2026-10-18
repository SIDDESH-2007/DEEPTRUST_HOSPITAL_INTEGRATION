import { ProtectedByDeepTrustBadge } from '../common/ProtectedByDeepTrustBadge';
import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Phone, Mail, MapPin, HeartPulse, ShieldAlert, Award, ArrowUpRight } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const { hospitalConfig, setPublicPage } = useHospital();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs">
      {/* Top Advisory Banner */}
      <div className="border-b border-slate-800 py-3 px-4 bg-slate-950/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400 text-[11px]">
          <span className="flex items-center gap-1.5 text-rose-400 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            Medical Disclaimer: In a life-threatening crisis, call 911 or proceed immediately to the nearest Emergency Department.
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            Prototype Demonstration Platform · All medical and patient data are fictional.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Identity & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                {hospitalConfig.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {hospitalConfig.tagline}. Providing multi-specialty clinical care, precision diagnostics, and 24/7 Level I trauma resuscitation.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <p>License: {hospitalConfig.licenseNumber}</p>
              <p>Trauma Status: {hospitalConfig.traumaLevel}</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Clinical Services
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setPublicPage('departments')} className="hover:text-white transition-colors">
                  Cardiology & Vascular Institute
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage('departments')} className="hover:text-white transition-colors">
                  Neurology & Neurosurgery
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage('departments')} className="hover:text-white transition-colors">
                  Orthopedics & Robotic Surgery
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage('departments')} className="hover:text-white transition-colors">
                  Pediatrics & Neonatal ICU
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage('departments')} className="hover:text-white transition-colors">
                  Medical & Surgical Oncology
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage('emergency')} className="text-rose-400 hover:text-rose-300 transition-colors font-medium">
                  Level I Emergency Trauma Center
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Patient & Visitor Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Patient Care
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setPublicPage('appointments')} className="hover:text-white transition-colors">
                  Book Outpatient Appointment
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage('packages')} className="hover:text-white transition-colors">
                  Comprehensive Health Packages
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage('insurance')} className="hover:text-white transition-colors">
                  Insurance & Cashless Network
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage('facilities')} className="hover:text-white transition-colors">
                  Hospital Facilities & Amenities
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage('contact')} className="hover:text-white transition-colors">
                  Visiting Hours & Parking Directions
                </button>
              </li>
              <li>
                <button onClick={() => setPublicPage('login')} className="hover:text-white transition-colors text-blue-400">
                  Staff & Patient Portal Login →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Accreditations */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{hospitalConfig.address}, {hospitalConfig.city}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{hospitalConfig.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{hospitalConfig.email}</span>
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Accreditations</div>
              <p className="text-[11px] text-slate-400">
                Joint Commission Gold Seal of Approval · Magnet Nursing Excellence · Level I Trauma
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span>© {new Date().getFullYear()} {hospitalConfig.name}. All rights reserved.</span>
            <ProtectedByDeepTrustBadge variant="inline" className="!bg-slate-950/80 !border-slate-800" />
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setPublicPage('about')} className="hover:text-slate-300">Privacy Notice</button>
            <button onClick={() => setPublicPage('about')} className="hover:text-slate-300">Patient Bill of Rights</button>
            <button onClick={() => setPublicPage('contact')} className="hover:text-slate-300">Non-Discrimination Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
