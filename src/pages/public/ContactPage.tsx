import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { hospitalConfig, addToast } = useHospital();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast({ type: 'success', message: 'Your inquiry has been sent to NovaCare Central Patient Desk.' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Campus Contact & Visiting Guidelines
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Get in Touch with NovaCare Medical
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Conveniently located in the Metro Health District with dedicated visitor parking, ambulance reception, and direct transit connectivity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info & Visiting Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Campus Addresses & Phones</h3>
            <div className="space-y-3 text-slate-600 dark:text-slate-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{hospitalConfig.address}, {hospitalConfig.city}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>General Line: {hospitalConfig.phone}</span>
              </p>
              <p className="flex items-center gap-2.5 text-rose-600 font-bold">
                <Phone className="w-4 h-4 text-rose-600 shrink-0" />
                <span>24/7 Trauma Hotline: {hospitalConfig.emergencyPhone}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Email: {hospitalConfig.email}</span>
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Inpatient Visiting Hours</span>
            </h3>
            <div className="space-y-2 text-slate-600 dark:text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700">
                <span>General Wards:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">11:00 AM - 01:00 PM & 05:00 PM - 07:30 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700">
                <span>ICU / CCU (Restricted):</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">12:00 PM - 01:00 PM & 06:00 PM - 07:00 PM</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Emergency Department:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Open 24 Hours / 365 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            Send an Online General Inquiry
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            For medical appointments, use the appointment booking system. For administrative queries or feedback, please message below.
          </p>

          {submitted ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">Thank You For Reaching Out</h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                Our Patient Experience Desk will review your communication and respond within one business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-1.5 bg-emerald-600 text-white rounded text-xs font-semibold"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. Health Insurance Pre-Authorization question"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
