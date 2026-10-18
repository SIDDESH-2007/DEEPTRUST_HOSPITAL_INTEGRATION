import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { ShieldCheck, Award, HeartPulse, Building2, Users, CheckCircle2, Target, Eye, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { hospitalConfig, setPublicPage } = useHospital();

  const values = [
    { title: 'Clinical Integrity', desc: 'Strict adherence to global clinical pathways, zero-compromise patient safety, and transparent medical ethics.' },
    { title: 'Compassionate Dignity', desc: 'Treating each patient and family with empathy, cultural sensitivity, emotional support, and respect.' },
    { title: 'Pioneering Innovation', desc: 'Integrating robotic surgical suites, bedside AI-assisted diagnostics, and molecular pathology.' },
    { title: 'Community Stewardship', desc: 'Ensuring accessible emergency care, public health screenings, and free preventive community clinics.' },
  ];

  const milestones = [
    { year: '2004', event: 'Founded as an 80-bed community surgical center with Level II trauma capabilities.' },
    { year: '2010', event: 'Commissioned the Cardiovascular Institute with dedicated Catheterization Labs and CCU.' },
    { year: '2016', event: 'Awarded Level I Regional Trauma Center status and Joint Commission Gold Seal accreditation.' },
    { year: '2021', event: 'Opened the West Pavilion featuring 12 Robotic Operation Theatres and Comprehensive Stroke Center.' },
    { year: '2025', event: 'Deployed paperless enterprise hospital information system with integrated patient mobile portal.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          About {hospitalConfig.name}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          A Center of Healing, Medical Innovation, and Community Trust
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Established in {hospitalConfig.established}, {hospitalConfig.name} has grown from a regional surgical outpost into one of the country's most respected quaternary care healthcare institutions. Combining leading medical faculty, state-of-the-art clinical infrastructure, and a humane, patient-first philosophy.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Our Clinical Mission</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            To provide world-standard, evidence-grounded healthcare with unyielding clinical precision, empathetic service, and equitable access for all individuals and families in our care.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-teal-50/60 dark:bg-slate-800/60 border border-teal-100 dark:border-slate-700 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Our Institutional Vision</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            To be the premier benchmark healthcare system recognized globally for pioneering research, clinical outcomes, patient safety, and compassionate digital medicine.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Core Operating Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{v.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hospital History Timeline */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Hospital Evolution & Milestones
        </h2>
        <div className="space-y-4 border-l-2 border-blue-600/30 dark:border-blue-400/30 pl-6 ml-2">
          {milestones.map((m, i) => (
            <div key={i} className="relative space-y-1">
              <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900"></span>
              <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">{m.year}</span>
              <p className="text-xs text-slate-700 dark:text-slate-300">{m.event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accreditations & Infrastructure */}
      <div className="p-8 rounded-2xl bg-slate-900 text-white space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
            Gold Standard Recognitions
          </span>
          <h2 className="text-2xl font-bold text-white">
            Accreditations & Regulatory Quality Audits
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our clinical practices, nursing ratios, operating rooms, and infection control standards undergo rigorous continuous external evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {hospitalConfig.accreditation.map((acc, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
              <Award className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">{acc}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Comprehensive audit certified</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
