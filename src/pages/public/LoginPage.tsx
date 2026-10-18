import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { UserRole } from '../../types';
import {
  HeartPulse,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Shield,
  Stethoscope,
  HeartHandshake,
  UserCheck,
  FlaskConical,
  Pill,
  User,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ProtectedByDeepTrustBadge } from '../../components/common/ProtectedByDeepTrustBadge';

export const LoginPage: React.FC = () => {
  const { hospitalConfig, loginWithDeepTrust, loginAsPatient, setPublicPage } = useHospital();

  const [activeTab, setActiveTab] = useState<'staff' | 'patient'>('staff');
  const [selectedStaffRole, setSelectedStaffRole] = useState<UserRole>('admin');
  
  // Patient login form state
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPassword, setPatientPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const staffAccounts: { role: UserRole; label: string; icon: any }[] = [
    { role: 'admin', label: 'Administrator', icon: Shield },
    { role: 'doctor', label: 'Doctor', icon: Stethoscope },
    { role: 'nurse', label: 'Nurse', icon: HeartHandshake },
    { role: 'receptionist', label: 'Receptionist', icon: UserCheck },
    { role: 'lab_technician', label: 'Lab Tech', icon: FlaskConical },
    { role: 'pharmacist', label: 'Pharmacist', icon: Pill },
  ];

  const handleStaffLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const result = await loginWithDeepTrust(selectedStaffRole);
    if (!result.success) {
      setIsLoading(false);
      setErrorMessage(result.message || 'DeepTrust authentication failed or connection unavailable.');
    }
  };

  const handlePatientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const result = await loginAsPatient(patientEmail, patientPassword);
    setIsLoading(false);

    if (!result.success) {
      setErrorMessage(result.message || 'Invalid patient credentials.');
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-xl space-y-6">
        
        {/* Hospital Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 space-y-6 relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex w-12 h-12 rounded-xl bg-blue-600 text-white items-center justify-center font-bold text-lg shadow-md">
              <HeartPulse className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {hospitalConfig.name}
            </h1>
            <p className="text-xs text-slate-500">
              Clinical Information System & Patient Portal Access
            </p>
          </div>

          {/* Access Mode Selector: Staff vs Patient */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800/70 p-1 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              id="tab-staff-access"
              onClick={() => {
                setActiveTab('staff');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'staff'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>STAFF ACCESS</span>
            </button>
            <button
              type="button"
              id="tab-patient-access"
              onClick={() => {
                setActiveTab('patient');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'patient'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>PATIENT ACCESS</span>
            </button>
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 rounded-lg text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-semibold">Authentication Denied</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {/* STAFF ACCESS TAB */}
          {activeTab === 'staff' ? (
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Select Authorized Staff Role
                  </span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                    Zero-Trust SSO Active
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {staffAccounts.map(acc => {
                    const Icon = acc.icon;
                    const isSelected = selectedStaffRole === acc.role;
                    return (
                      <button
                        key={acc.role}
                        type="button"
                        id={`role-select-${acc.role}`}
                        onClick={() => setSelectedStaffRole(acc.role)}
                        className={`p-2.5 rounded-lg text-left border transition-all text-xs flex flex-col justify-between ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold ring-1 ring-blue-600/30'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                        </div>
                        <span className="truncate font-semibold">{acc.label}</span>
                        <span className="text-[10px] text-slate-400 truncate">Hospital staff</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Staff DeepTrust Login Action */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  id="btn-login-deeptrust"
                  disabled={isLoading}
                  onClick={() => handleStaffLogin()}
                  className="w-full py-3 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2.5 disabled:opacity-70 group cursor-pointer"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2 text-xs">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Navigating to DeepTrust Security Gateway...</span>
                    </span>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">
                        Login with DeepTrust ({selectedStaffRole.replace('_', ' ').toUpperCase()})
                      </span>
                      <ArrowRight className="w-4 h-4 text-blue-200 ml-1" />
                    </>
                  )}
                </button>

                

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span>Authorized hospital staff only</span>
                  <ProtectedByDeepTrustBadge variant="inline" className="!py-0.5 !px-2 !text-[10px]" />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-[10px] text-slate-400 space-y-1">
                <p>Protected by DeepTrust Zero-Trust Identity Gateway with multi-factor biometric authentication.</p>
                <p className="italic">HIPAA Security Rule & HITECH Compliance Enforced Server-Side.</p>
              </div>
            </div>
          ) : (
            /* PATIENT ACCESS TAB (Direct NovaCare Authentication Only) */
            <form onSubmit={handlePatientLogin} className="space-y-4 text-xs">
              <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 rounded-lg flex items-center gap-2.5 text-blue-900 dark:text-blue-200">
                <User className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
                <span className="text-[11px]">
                  <strong>Patient Portal Login:</strong> Access your personal electronic health records, prescriptions, and appointment bookings securely.
                </span>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Patient MRN or Registered Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    id="patient-email"
                    value={patientEmail}
                    onChange={e => setPatientEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-700 dark:text-slate-300 font-semibold">
                    Patient Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotModalOpen(true);
                      setResetSent(false);
                    }}
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    id="patient-password"
                    value={patientPassword}
                    onChange={e => setPatientPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-patient-login"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Authenticating Patient Account...</span>
                    </span>
                  ) : (
                    <>
                      <span>Sign In to Patient Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-[10px] text-slate-400 space-y-1">
                <p>Patient access uses direct NovaCare medical authentication.</p>
                <p className="italic">Protected by NovaCare HIPAA Vault.</p>
              </div>
            </form>
          )}

        </div>

        {/* Back to public site */}
        <div className="text-center">
          <button
            onClick={() => setPublicPage('home')}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
          >
            Return to NovaCare Public Website
          </button>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Reset Security Credentials
            </h3>
            {resetSent ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-900 dark:text-emerald-200 space-y-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <p>Password reset instructions have been dispatched to your registered account.</p>
                <button
                  onClick={() => setForgotModalOpen(false)}
                  className="px-4 py-1.5 bg-emerald-600 text-white rounded text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <p className="text-slate-500">
                  Enter your email address to receive a secure token to reset your password.
                </p>
                <input
                  type="email"
                  required
                  placeholder="your.name@novacaremedical.org"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-3 py-1.5 text-slate-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-blue-600 text-white rounded font-medium"
                  >
                    Send Reset Token
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};


