import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { CheckCircle2, ShieldCheck, HeartPulse, Activity } from 'lucide-react';

export const PackagesPage: React.FC = () => {
  const { setIsBookModalOpen } = useHospital();

  const packages = [
    {
      title: 'Basic Preventive Wellness',
      price: '$149',
      testsCount: '28 Tests',
      suitableFor: 'Adults under 35 without chronic symptoms',
      tests: ['Complete Blood Count (CBC) with differential', 'Fasting Blood Glucose & HbA1c', 'Lipid Profile (Cholesterol, Triglycerides, HDL, LDL)', 'Urinalysis & Kidney Function (Creatinine, BUN)', 'General Physician Consultation & Lifestyle Report'],
    },
    {
      title: 'Comprehensive Executive Health',
      price: '$299',
      popular: true,
      testsCount: '64 Tests',
      suitableFor: 'Working professionals seeking holistic screening',
      tests: ['All Basic Wellness Tests included', 'Resting 12-Lead Electrocardiogram (ECG)', 'Treadmill Cardiac Stress Test (TMT)', 'Ultrasound of Abdomen & Pelvis', 'High-Sensitivity Thyroid Stimulating Hormone (TSH)', 'Consultations with Internist & Dietitian'],
    },
    {
      title: 'Advanced Cardio-Vascular Check',
      price: '$450',
      testsCount: '42 Tests',
      suitableFor: 'Individuals with hypertension, family history, or >40y',
      tests: ['2D Color Doppler Echocardiogram', 'High-Sensitivity Cardiac Troponin & hs-CRP', 'Apolipoprotein A1 & B Assessment', 'Coronary Calcium Score / Low-Dose Chest CT', 'Senior Cardiologist Review & Diet Strategy'],
    },
    {
      title: 'Senior Citizen Vitality (Age 60+)',
      price: '$340',
      testsCount: '52 Tests',
      suitableFor: 'Older adults monitoring bone, vision, and metabolic health',
      tests: ['Bone Mineral Density (DEXA Dual-Energy Scan)', 'Prostate / Mammogram screening recommendations', 'Audiometric Hearing Test & Glaucoma Eye Exam', 'Vitamin D3 & Vitamin B12 Quantitative Assay', 'Geriatric Specialist Review & Fall Risk Assessment'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Preventive Diagnostics
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Comprehensive Health Checkup Packages
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Preventive healthcare detects asymptomatic conditions early when intervention is most effective. All packages include personalized physician reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {packages.map((pkg, i) => (
          <div
            key={i}
            className={`p-8 rounded-2xl border bg-white dark:bg-slate-800 shadow-sm flex flex-col justify-between space-y-6 ${
              pkg.popular ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{pkg.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{pkg.suitableFor}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black font-mono text-slate-900 dark:text-slate-100">{pkg.price}</div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">{pkg.testsCount}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Package Inclusions:</span>
                <ul className="mt-2 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {pkg.tests.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Schedule This Package
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
