import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { FileBarChart, Download, Printer, FileText, CheckCircle2, Calendar, FileSpreadsheet } from 'lucide-react';

export const ReportsManagement: React.FC = () => {
  const { hospitalConfig, addToast } = useHospital();
  const [selectedCategory, setSelectedCategory] = useState('Patient Census');
  const [reportFormat, setReportFormat] = useState<'PDF' | 'CSV'>('PDF');

  const reportCategories = [
    { title: 'Patient Census & Admissions', desc: 'Comprehensive inpatient census, bed occupancy, and discharge rate summary.' },
    { title: 'Outpatient Appointments Registry', desc: 'Scheduled specialist clinic visits, cancellations, and doctor utilization rates.' },
    { title: 'Clinical Laboratory Pathology Worklist', desc: 'Specimen turn-around-time (TAT), panic values, and completed test counts.' },
    { title: 'Radiology PACS Modality Throughput', desc: 'MRI, CT, X-Ray, and Ultrasound scan volumes and diagnostic report timings.' },
    { title: 'Pharmacy Formulary & Stock Ledger', desc: 'Fast-moving medicines, low-stock alerts, expiry schedules, and dispensing counts.' },
    { title: 'Financial Billing & Revenue Audit', desc: 'Itemized department revenue, collection receipts, and insurance claim approvals.' },
    { title: 'Level I Emergency & Trauma Log', desc: 'Triage categories, ambulance dispatches, door-to-balloon times, and trauma arrivals.' },
  ];

  const handleExport = (catTitle: string, format: string) => {
    addToast({
      type: 'success',
      title: 'Report Generated Successfully',
      message: `${catTitle} downloaded in ${format} format.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Clinical & Executive Hospital Reports Center
        </h1>
        <p className="text-xs text-slate-500">
          Generate structured clinical audits, regulatory compliance summaries, and financial reports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {reportCategories.map((rc, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                <FileBarChart className="w-4 h-4" />
                <span>{rc.title}</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                {rc.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">Status: Ready</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleExport(rc.title, 'CSV')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-[11px] font-semibold"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={() => handleExport(rc.title, 'PDF')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex items-center justify-between">
        <span>Reports generated adhere to standard health data interchange specifications.</span>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Current Executive Summary</span>
        </button>
      </div>
    </div>
  );
};
