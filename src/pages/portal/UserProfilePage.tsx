import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { User, Lock, Bell, Shield, LogOut, CheckCircle2 } from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { currentUser, logout, addToast } = useHospital();

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [statAlerts, setStatAlerts] = useState(true);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw !== confirmPw) {
      addToast({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }
    addToast({ type: 'success', message: 'Credentials updated successfully.' });
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Staff Clinical Profile & Security Settings
        </h1>
        <p className="text-xs text-slate-500">
          Operator authentication credentials, departmental privileges, and notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
        
        {/* Profile Card */}
        <div className="md:col-span-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-6 space-y-4">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
              {currentUser.avatarInitials}
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">{currentUser.name}</h2>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
              {currentUser.id}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-2 text-slate-600 dark:text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">System Role:</span>
              <span className="font-semibold text-teal-600 dark:text-teal-400 capitalize">{currentUser.role.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Department:</span>
              <span className="font-medium text-right max-w-[160px] truncate">{currentUser.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Email:</span>
              <span className="text-right truncate">{currentUser.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Security Access:</span>
              <span className="text-emerald-600 font-semibold">Authorized Level 4</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
            <button
              onClick={logout}
              className="w-full py-2 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 rounded font-semibold flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of Workstation</span>
            </button>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="md:col-span-7 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Change Security Password</span>
            </h3>
            <p className="text-[11px] text-slate-500">Requires minimum 10 characters with numbers and symbols</p>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-3">
            <div>
              <label className="block text-slate-500 mb-1">Current Password</label>
              <input
                type="password"
                required
                value={currentPw}
                onChange={e => setCurrentPw(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-500 mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPw}
                onChange={e => setNewPw(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-500 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPw}
                onChange={e => setConfirmPw(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs"
              >
                Update Password
              </button>
            </div>
          </form>

          {/* Preferences */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-2">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300">Notification Alerts</h4>
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={e => setEmailAlerts(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              <span>Send urgent clinical alerts to hospital email</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={statAlerts}
                onChange={e => setStatAlerts(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              <span>Desktop sound notification for STAT emergency trauma alerts</span>
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};
