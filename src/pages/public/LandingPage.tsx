import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  HeartPulse,
  PhoneCall,
  Calendar,
  Stethoscope,
  ShieldCheck,
  Award,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
  Activity,
  Users,
  Building2,
  Sparkles,
  Siren
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const {
    hospitalConfig,
    departments,
    doctors,
    setPublicPage,
    setIsBookModalOpen,
    setSelectedDoctorForBooking,
  } = useHospital();

  const stats = [
    { label: 'Years of Clinical Excellence', value: '22+', sub: 'Serving the metropolitan community' },
    { label: 'Specialist Physicians & Surgeons', value: '140+', sub: 'Board-certified medical faculty' },
    { label: 'Specialized Departments', value: '28', sub: 'Comprehensive clinical institutes' },
    { label: 'Licensed Inpatient Beds', value: '450', sub: 'With 65 dedicated ICU beds' },
    { label: 'Annual Patient Consultations', value: '125K+', sub: 'Outpatient & inpatient admissions' },
    { label: 'Emergency Trauma Response', value: '24/7', sub: 'Level I Regional Trauma Center' },
  ];

  const packages = [
    {
      title: 'Comprehensive Executive Wellness',
      tag: 'Most Popular',
      price: '$299',
      tests: '64 Diagnostic Tests',
      highlights: ['Complete Metabolic Panel & Lipid Profile', 'Resting ECG & Treadmill Stress Test', 'Chest Radiograph & Ultrasound Abdomen', 'Consultation with Senior Consultant Physician'],
    },
    {
      title: 'Advanced Cardio-Vascular Screening',
      tag: 'Cardiology Care',
      price: '$450',
      tests: '38 Specialized Tests',
      highlights: ['2D Color Doppler Echocardiogram', 'High-Sensitivity hs-CRP & Troponin-T', 'Coronary Calcium Score (CT)', 'Cardiologist Consultation & Diet Guidance'],
    },
    {
      title: 'Senior Comprehensive Health (60+)',
      tag: 'Geriatric Care',
      price: '$340',
      tests: '52 Age-specific Tests',
      highlights: ['Bone Mineral Density (DEXA Scan)', 'Renal Function & Diabetic HbA1c', 'Audiometry & Comprehensive Eye Exam', 'Physiotherapy & Mobility Assessment'],
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 py-16 lg:py-24 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 rounded-full text-xs font-semibold text-blue-800 dark:text-blue-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{hospitalConfig.traumaLevel} · Joint Commission Accredited</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
                Advanced Medical Science. <br />
                <span className="text-blue-600 dark:text-blue-400">Compassionate Patient Care.</span>
              </h1>

              {/* Description */}
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Welcome to {hospitalConfig.name}. We bring together world-renowned physicians, precision surgical robotics, rapid 24/7 trauma triage, and patient-centered healing in a unified state-of-the-art facility.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setIsBookModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Specialist Appointment</span>
                </button>

                <button
                  onClick={() => setPublicPage('emergency')}
                  className="flex items-center gap-2 px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors animate-pulse"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Emergency 24/7 ({hospitalConfig.emergencyPhone})</span>
                </button>

                <button
                  onClick={() => setPublicPage('doctors')}
                  className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span>Find a Doctor</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">Zero Wait Triage</div>
                  <div className="text-slate-500">For acute cardiac & trauma</div>
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">Paperless EMR</div>
                  <div className="text-slate-500">Instant digital records access</div>
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">100% Cashless</div>
                  <div className="text-slate-500">With major health insurers</div>
                </div>
              </div>

            </div>

            {/* Right Column: Clean Clinical Card & Live Status Display */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-6 space-y-6">
                
                {/* Hospital Live Snapshot Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                      Campus Live Status
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    Floor Command 01
                  </span>
                </div>

                {/* Key Clinical Departments Quick Nav */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Core Centers of Excellence
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <button
                      onClick={() => setPublicPage('departments')}
                      className="p-3 text-left rounded-lg bg-blue-50/60 dark:bg-slate-900/60 hover:bg-blue-100/70 border border-blue-100 dark:border-slate-700 transition-colors"
                    >
                      <div className="font-bold text-blue-950 dark:text-blue-200">Cardiology</div>
                      <div className="text-[11px] text-slate-500">Cath Lab & Bypass</div>
                    </button>
                    <button
                      onClick={() => setPublicPage('departments')}
                      className="p-3 text-left rounded-lg bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      <div className="font-bold text-slate-900 dark:text-slate-100">Neurology</div>
                      <div className="text-[11px] text-slate-500">Stroke Unit & Brain</div>
                    </button>
                    <button
                      onClick={() => setPublicPage('departments')}
                      className="p-3 text-left rounded-lg bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      <div className="font-bold text-slate-900 dark:text-slate-100">Orthopedics</div>
                      <div className="text-[11px] text-slate-500">Robotic Joint Center</div>
                    </button>
                    <button
                      onClick={() => setPublicPage('departments')}
                      className="p-3 text-left rounded-lg bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      <div className="font-bold text-slate-900 dark:text-slate-100">Pediatrics</div>
                      <div className="text-[11px] text-slate-500">Level III NICU Care</div>
                    </button>
                  </div>
                </div>

                {/* Emergency Hotline Box */}
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase font-bold text-rose-800 dark:text-rose-300">
                      Emergency Ambulance Dispatch
                    </div>
                    <div className="text-base font-bold font-mono text-rose-600 dark:text-rose-400">
                      {hospitalConfig.emergencyPhone}
                    </div>
                  </div>
                  <button
                    onClick={() => setPublicPage('emergency')}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-xs"
                  >
                    Request Now
                  </button>
                </div>

                {/* Patient / Staff Portal shortcut */}
                <div className="pt-2 text-center">
                  <button
                    onClick={() => setPublicPage('login')}
                    className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Already a patient or staff member? Access Healthcare Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATISTICS STRIP (Transparent Prototype Tagging) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Institutional Scale & Experience
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              Serving the Health Needs of Over 120,000 Families Annually
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-700">
            {stats.map((s, idx) => (
              <div key={idx} className="pt-3 md:pt-0 px-2 space-y-1">
                <div className="text-2xl lg:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tabular-nums">
                  {s.value}
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {s.label}
                </div>
                <div className="text-[11px] text-slate-400">
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-center text-[10px] text-slate-400">
            * Operational figures shown represent prototype sample data for demonstration of hospital ecosystem capacity.
          </div>
        </div>
      </section>

      {/* CLINICAL DEPARTMENTS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Clinical Excellence
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              Specialized Medical & Surgical Institutes
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Equipped with high-precision imaging, dedicated sub-specialty intensive care units, and experienced clinical leadership.
            </p>
          </div>
          <button
            onClick={() => setPublicPage('departments')}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View All Departments ({departments.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.slice(0, 4).map(dept => (
            <div
              key={dept.id}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {dept.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {dept.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-2">
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Faculty:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{dept.doctorsCount} Specialists</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Location:</span>
                  <span className="font-medium text-slate-600 dark:text-slate-400">{dept.floor}</span>
                </div>
                <button
                  onClick={() => setPublicPage('departments')}
                  className="w-full mt-2 py-2 text-center text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  Explore Department
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED CONSULTANTS / DOCTORS */}
      <section className="bg-slate-50 dark:bg-slate-900/60 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Medical Leadership
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                Meet Our Senior Specialists & Department Chiefs
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Board-certified physicians committed to evidence-based clinical protocols and personalized patient care.
              </p>
            </div>
            <button
              onClick={() => setPublicPage('doctors')}
              className="flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
            >
              <span>View Specialist Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.slice(0, 3).map(doc => (
              <div
                key={doc.id}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold flex items-center justify-center text-base">
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

                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {doc.specialization}
                  </p>

                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    {doc.bio}
                  </p>

                  <div className="text-[11px] text-slate-500 space-y-1 pt-2">
                    <p>Experience: <strong className="text-slate-800 dark:text-slate-200">{doc.experienceYears} Years</strong></p>
                    <p>Timings: <strong className="text-slate-800 dark:text-slate-200">{doc.availableHours}</strong></p>
                    <p>Consultation: <strong className="text-slate-800 dark:text-slate-200 font-mono">${doc.consultationFee}</strong></p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => {
                      setSelectedDoctorForBooking(doc);
                      setIsBookModalOpen(true);
                    }}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMERGENCY & RESUSCITATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900 rounded-2xl text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-700/80 rounded-full text-xs font-bold uppercase tracking-wider text-rose-100">
              <Siren className="w-3.5 h-3.5 animate-pulse" />
              <span>Level I Regional Emergency Trauma Center</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Immediate Care When Every Second Counts.
            </h2>

            <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
              Our 45-bed emergency department features direct rooftop helipad transfer, dedicated trauma resuscitation suites, bedside CT scanning, and around-the-clock cardiac catheterization activation within 15 minutes.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setPublicPage('emergency')}
                className="px-6 py-3 bg-white text-rose-900 font-bold text-xs rounded-xl shadow-lg hover:bg-rose-50 transition-colors"
              >
                Access Emergency Department Details
              </button>
              <div className="text-rose-200 text-xs">
                Emergency Trauma Line: <span className="font-mono font-bold text-white text-sm">{hospitalConfig.emergencyPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HEALTH PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Preventive Healthcare
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Comprehensive Preventative Health Packages
          </h2>
          <p className="text-xs text-slate-500">
            Early detection and preventive wellness screening tailored for individual and corporate health needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {pkg.tag}
                  </span>
                  <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
                    {pkg.price}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {pkg.title}
                </h3>

                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {pkg.tests} Included:
                </p>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {pkg.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={() => setIsBookModalOpen(true)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Book Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PATIENT TESTIMONIALS (Adjacency & Real Roles) */}
      <section className="bg-slate-50 dark:bg-slate-900/40 py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Patient Experiences
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Trusted by Families Across the District
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "The cardiac catheterization team under Dr. Elena Vance acted with remarkable speed when my husband had chest heaviness. From the ambulance portico to the stent placement was under 38 minutes."
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">Margaret Anderson</div>
                <div className="text-[11px] text-slate-400">Family Caregiver · Metro Central</div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "Having the patient portal to view my MRI reports, verify medication dosages, and check bills directly from home without repetitive paperwork made all the difference in my recovery."
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">Robert Hastings</div>
                <div className="text-[11px] text-slate-400">Spine Rehabilitation Patient</div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                "The nursing staff in the pediatric wing and NICU were attentive, calm, and reassuring through our son's acute asthma exacerbation. Cleanest hospital environment we have ever seen."
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">Maria Morales</div>
                <div className="text-[11px] text-slate-400">Mother of Lucas Morales · Pediatric Care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSURANCE PARTNERS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Cashless Empanelled Insurance Partners
        </span>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">BlueShield Premier</span>
          <span className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">UnitedHealthcare</span>
          <span className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">Aetna Choice</span>
          <span className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">Cigna Global Health</span>
          <span className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">Kaiser Permanente</span>
          <span className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">Medicare Part A & B</span>
        </div>
      </section>

    </div>
  );
};
