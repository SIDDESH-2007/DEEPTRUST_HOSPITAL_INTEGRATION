import React from 'react';
import { useHospital, PortalSection } from '../../context/HospitalContext';
import { UserRole } from '../../types';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  HeartHandshake,
  Calendar,
  Building2,
  Siren,
  DoorOpen,
  Bed,
  ListOrdered,
  Hotel,
  FlaskConical,
  Scan,
  Pill,
  FileText,
  CreditCard,
  ShieldCheck,
  Package,
  Droplet,
  Scissors,
  Ambulance,
  UserCog,
  FileBarChart,
  LineChart,
  History,
  Settings,
  User,
  HeartPulse,
  X
} from 'lucide-react';

interface SidebarItem {
  id: PortalSection;
  label: string;
  icon: any;
  allowedRoles: UserRole[];
  badge?: string;
}

const allSidebarItems: SidebarItem[] = [
  // Core Dashboards
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, allowedRoles: ['admin', 'doctor', 'nurse', 'receptionist', 'lab_technician', 'pharmacist', 'patient'] },
  
  // Clinical & Patients
  { id: 'patients', label: 'Patients', icon: Users, allowedRoles: ['admin', 'doctor', 'nurse', 'receptionist'] },
  { id: 'appointments', label: 'Appointments', icon: Calendar, allowedRoles: ['admin', 'doctor', 'receptionist', 'patient'] },
  { id: 'prescriptions', label: 'Prescriptions', icon: FileText, allowedRoles: ['admin', 'doctor', 'pharmacist', 'patient'] },
  
  // Ward & Nursing
  { id: 'beds', label: 'Beds & Wards', icon: Bed, allowedRoles: ['admin', 'doctor', 'nurse', 'receptionist'] },
  { id: 'opd', label: 'OPD Queue', icon: ListOrdered, allowedRoles: ['admin', 'doctor', 'receptionist'] },
  { id: 'ipd', label: 'IPD Admissions', icon: Hotel, allowedRoles: ['admin', 'doctor', 'nurse', 'receptionist'] },
  { id: 'nurses', label: 'Nursing Care', icon: HeartHandshake, allowedRoles: ['admin', 'nurse'] },
  
  // Diagnostics
  { id: 'laboratory', label: 'Laboratory', icon: FlaskConical, allowedRoles: ['admin', 'doctor', 'lab_technician', 'patient'] },
  { id: 'radiology', label: 'Radiology PACS', icon: Scan, allowedRoles: ['admin', 'doctor', 'patient'] },
  
  // Pharmacy & Supplies
  { id: 'pharmacy', label: 'Pharmacy', icon: Pill, allowedRoles: ['admin', 'doctor', 'pharmacist'] },
  { id: 'inventory', label: 'Hospital Inventory', icon: Package, allowedRoles: ['admin', 'pharmacist', 'nurse'] },
  
  // Emergency & Specialty Units
  { id: 'emergency', label: 'Emergency (Level I)', icon: Siren, allowedRoles: ['admin', 'doctor', 'nurse'] },
  { id: 'blood_bank', label: 'Blood Bank', icon: Droplet, allowedRoles: ['admin', 'doctor', 'nurse', 'lab_technician'] },
  { id: 'operation_theatre', label: 'Operation Theatre', icon: Scissors, allowedRoles: ['admin', 'doctor', 'nurse'] },
  { id: 'ambulance', label: 'Ambulance Fleet', icon: Ambulance, allowedRoles: ['admin', 'nurse', 'receptionist'] },
  
  // Admin & Financials
  { id: 'billing', label: 'Billing & Invoices', icon: CreditCard, allowedRoles: ['admin', 'receptionist', 'patient'] },
  { id: 'insurance', label: 'Insurance Claims', icon: ShieldCheck, allowedRoles: ['admin', 'receptionist', 'patient'] },
  { id: 'doctors', label: 'Doctors Directory', icon: Stethoscope, allowedRoles: ['admin', 'receptionist'] },
  { id: 'departments', label: 'Departments', icon: Building2, allowedRoles: ['admin'] },
  { id: 'staff', label: 'Staff & HR', icon: UserCog, allowedRoles: ['admin'] },
  
  // Insights & Governance
  { id: 'analytics', label: 'Analytics', icon: LineChart, allowedRoles: ['admin'] },
  { id: 'reports', label: 'Reports', icon: FileBarChart, allowedRoles: ['admin', 'doctor'] },
  { id: 'audit_logs', label: 'Audit Logs', icon: History, allowedRoles: ['admin'] },
  { id: 'settings', label: 'Hospital Settings', icon: Settings, allowedRoles: ['admin'] },
  { id: 'profile', label: 'My Profile', icon: User, allowedRoles: ['admin', 'doctor', 'nurse', 'receptionist', 'lab_technician', 'pharmacist', 'patient'] },
];

interface PortalSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const {
    hospitalConfig,
    portalSection,
    setPortalSection,
    currentRole,
    currentUser,
  } = useHospital();

  const visibleItems = allSidebarItems.filter(item => item.allowedRoles.includes(currentRole));

  const roleLabels: Record<UserRole, string> = {
    admin: 'Executive Administration',
    doctor: 'Attending Physician Portal',
    nurse: 'Registered Nursing Unit',
    receptionist: 'Front Desk & Admissions',
    lab_technician: 'Diagnostic Pathology Lab',
    pharmacist: 'Clinical Formulary & Dispensary',
    patient: 'Patient Health Portal',
  };

  const navContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 border-r border-slate-800 select-none">
      
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <span className="text-sm font-bold text-white tracking-tight block">
              {hospitalConfig.shortName}
            </span>
            <span className="text-[10px] text-teal-400 font-medium block">
              {roleLabels[currentRole]}
            </span>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="p-1 rounded text-slate-400 hover:text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Role Notice Card */}
      <div className="px-3 pt-3 pb-1">
        <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-[11px]">
          <div className="flex items-center justify-between text-slate-400">
            <span>Session:</span>
            <span className="font-semibold text-emerald-400 capitalize">{currentRole.replace('_', ' ')}</span>
          </div>
          <p className="text-white font-medium truncate mt-0.5">{currentUser.name}</p>
        </div>
      </div>

      {/* Navigation Links Scrollable List */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 text-xs">
        {visibleItems.map(item => {
          const Icon = item.icon;
          const isActive = portalSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setPortalSection(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors text-left ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom System Status / Disclaimer */}
      <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500">
        <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>System Online · v2.4 Enterprise</span>
        </div>
        <p className="leading-tight">
          Prototype clinical interface. All records fictional.
        </p>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-60 h-screen sticky top-0 shrink-0">
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop & Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
