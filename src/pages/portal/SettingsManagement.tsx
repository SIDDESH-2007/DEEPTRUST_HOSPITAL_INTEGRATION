import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Settings, Building2, Shield, Bell, Database, CheckCircle2, Save } from 'lucide-react';

export const SettingsManagement: React.FC = () => {
  const { hospitalConfig, updateHospitalConfig, addToast } = useHospital();

  const [name, setName] = useState(hospitalConfig.name);
  const [shortName, setShortName] = useState(hospitalConfig.shortName);
  const [tagline, setTagline] = useState(hospitalConfig.tagline);
  const [address, setAddress] = useState(hospitalConfig.address);
  const [city, setCity] = useState(hospitalConfig.city);
  const [phone, setPhone] = useState(hospitalConfig.phone);
  const [emergencyPhone, setEmergencyPhone] = useState(hospitalConfig.emergencyPhone);
  const [email, setEmail] = useState(hospitalConfig.email);
  const [traumaLevel, setTraumaLevel] = useState(hospitalConfig.traumaLevel);
  const [licenseNumber, setLicenseNumber] = useState(hospitalConfig.licenseNumber);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHospitalConfig({
      name,
      shortName,
      tagline,
      address,
      city,
      phone,
      emergencyPhone,
      email,
      traumaLevel,
      licenseNumber,
    });
  };

  const handleBackup = () => {
    addToast({
      type: 'success',
      title: 'Database Snapshot Exported',
      message: 'Full clinical schema and transaction records exported to encrypted archive.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Hospital Organization Settings & Master Configuration
        </h1>
        <p className="text-xs text-slate-500">
          Configure hospital corporate identity, contact details, emergency numbers, and clinical licensing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Hospital Identity Form */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-6 space-y-5 text-xs">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              Hospital Master Identity
            </h2>
            <span className="text-[11px] text-teal-600 font-semibold">Live Synchronized</span>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Full Hospital Organization Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Brand Short Name
                </label>
                <input
                  type="text"
                  required
                  value={shortName}
                  onChange={e => setShortName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Institutional Tagline & Motto
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Campus Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  City, State & Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Central Telephone Inquiry Line
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  24/7 Emergency Hotline Number
                </label>
                <input
                  type="text"
                  required
                  value={emergencyPhone}
                  onChange={e => setEmergencyPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono text-rose-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Trauma Designation Status
                </label>
                <input
                  type="text"
                  required
                  value={traumaLevel}
                  onChange={e => setTraumaLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  State Hospital License Number
                </label>
                <input
                  type="text"
                  required
                  value={licenseNumber}
                  onChange={e => setLicenseNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Organization Settings</span>
              </button>
            </div>
          </form>
        </div>

        {/* System & Backup Info */}
        <div className="lg:col-span-4 space-y-6 text-xs">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-500" />
              <span>Database Backups & Snapshot</span>
            </h3>
            <p className="text-slate-500 leading-relaxed">
              Automated differential backups executed every 6 hours. Cryptographic hash verification verified.
            </p>
            <div className="text-[11px] text-slate-400 space-y-1">
              <p>Last Successful Snapshot: <strong className="text-slate-700 dark:text-slate-300">2026-09-28 06:00 AM</strong></p>
              <p>Backup Integrity: <strong className="text-emerald-600">Verified (SHA-256)</strong></p>
            </div>
            <button
              onClick={handleBackup}
              className="w-full py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 rounded font-semibold text-slate-700 dark:text-slate-200"
            >
              Trigger Manual Snapshot
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Information Governance</span>
            </h3>
            <div className="space-y-2 text-slate-500">
              <p>✓ Role-Based Access Control (RBAC) enforced</p>
              <p>✓ Session inactivity timeout: 30 minutes</p>
              <p>✓ Minimum password complexity: 12 chars</p>
              <p>✓ Prototype demonstration safe mode enabled</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
