import { ProtectedByDeepTrustBadge } from './components/common/ProtectedByDeepTrustBadge';
import React, { useState } from 'react';
import { HospitalProvider, useHospital } from './context/HospitalContext';

// Layout components
import { PublicNavbar } from './components/layout/PublicNavbar';
import { PublicFooter } from './components/layout/PublicFooter';
import { PortalHeader } from './components/layout/PortalHeader';
import { PortalSidebar } from './components/layout/PortalSidebar';
import { NotificationDrawer } from './components/layout/NotificationDrawer';

// Common Modals
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { AppointmentBookingModal } from './components/common/AppointmentBookingModal';
import { InvoiceModal } from './components/common/InvoiceModal';
import { PrescriptionModal } from './components/common/PrescriptionModal';
import { PatientDetailModal } from './components/common/PatientDetailModal';
import { VitalsModal } from './components/common/VitalsModal';
import { ToastContainer } from './components/common/ToastContainer';
import { OfflineQueueModal } from './components/common/OfflineQueueModal';
import { OfflineStatusBanner } from './components/common/OfflineStatusBanner';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { DepartmentsPage } from './pages/public/DepartmentsPage';
import { DoctorsPage } from './pages/public/DoctorsPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { PublicAppointmentsPage } from './pages/public/PublicAppointmentsPage';
import { EmergencyPage } from './pages/public/EmergencyPage';
import { FacilitiesPage } from './pages/public/FacilitiesPage';
import { PackagesPage } from './pages/public/PackagesPage';
import { InsurancePage } from './pages/public/InsurancePage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';

// Portal Dashboards & Modules
import { AdminDashboard } from './pages/portal/AdminDashboard';
import { DoctorDashboard } from './pages/portal/DoctorDashboard';
import { NurseDashboard } from './pages/portal/NurseDashboard';
import { ReceptionDashboard } from './pages/portal/ReceptionDashboard';
import { LabDashboard } from './pages/portal/LabDashboard';
import { PharmacyDashboard } from './pages/portal/PharmacyDashboard';
import { PatientDashboard } from './pages/portal/PatientDashboard';
import { PatientsManagement } from './pages/portal/PatientsManagement';
import { AppointmentsManagement } from './pages/portal/AppointmentsManagement';
import { BedManagement } from './pages/portal/BedManagement';
import { OpdIpdManagement } from './pages/portal/OpdIpdManagement';
import { RadiologyManagement } from './pages/portal/RadiologyManagement';
import { BillingManagement } from './pages/portal/BillingManagement';
import { InsuranceManagement } from './pages/portal/InsuranceManagement';
import { BloodBankManagement } from './pages/portal/BloodBankManagement';
import { OperationTheatreManagement } from './pages/portal/OperationTheatreManagement';
import { AmbulanceManagement } from './pages/portal/AmbulanceManagement';
import { StaffManagement } from './pages/portal/StaffManagement';
import { AnalyticsManagement } from './pages/portal/AnalyticsManagement';
import { ReportsManagement } from './pages/portal/ReportsManagement';
import { AuditLogsManagement } from './pages/portal/AuditLogsManagement';
import { SettingsManagement } from './pages/portal/SettingsManagement';
import { UserProfilePage } from './pages/portal/UserProfilePage';

const HospitalAppContent: React.FC = () => {
  const {
    isInPortal,
    publicPage,
    portalSection,
    currentRole,
  } = useHospital();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  // Render Public Website Page
  const renderPublicPage = () => {
    switch (publicPage) {
      case 'home': return <LandingPage />;
      case 'about': return <AboutPage />;
      case 'departments': return <DepartmentsPage />;
      case 'doctors': return <DoctorsPage />;
      case 'services': return <ServicesPage />;
      case 'appointments': return <PublicAppointmentsPage />;
      case 'emergency': return <EmergencyPage />;
      case 'facilities': return <FacilitiesPage />;
      case 'packages': return <PackagesPage />;
      case 'insurance': return <InsurancePage />;
      case 'contact': return <ContactPage />;
      case 'login': return <LoginPage />;
      default: return <LandingPage />;
    }
  };

  // Render Portal Module / Dashboard
  const renderPortalSection = () => {
    // If on main 'dashboard' tab, show role-specific customized dashboard
    if (portalSection === 'dashboard') {
      switch (currentRole) {
        case 'admin': return <AdminDashboard />;
        case 'doctor': return <DoctorDashboard />;
        case 'nurse': return <NurseDashboard />;
        case 'receptionist': return <ReceptionDashboard />;
        case 'lab_technician': return <LabDashboard />;
        case 'pharmacist': return <PharmacyDashboard />;
        case 'patient': return <PatientDashboard />;
        default: return <AdminDashboard />;
      }
    }

    // Specific operational modules
    switch (portalSection) {
      case 'patients': return <PatientsManagement />;
      case 'appointments': return <AppointmentsManagement />;
      case 'beds': return <BedManagement />;
      case 'opd':
      case 'ipd':
      case 'admissions': return <OpdIpdManagement />;
      case 'nurses': return <NurseDashboard />;
      case 'doctors': return <DoctorsPage />;
      case 'departments': return <DepartmentsPage />;
      case 'laboratory': return <LabDashboard />;
      case 'radiology': return <RadiologyManagement />;
      case 'pharmacy':
      case 'inventory': return <PharmacyDashboard />;
      case 'prescriptions': return <DoctorDashboard />;
      case 'billing': return <BillingManagement />;
      case 'insurance': return <InsuranceManagement />;
      case 'blood_bank': return <BloodBankManagement />;
      case 'operation_theatre': return <OperationTheatreManagement />;
      case 'ambulance': return <AmbulanceManagement />;
      case 'emergency': return <EmergencyPage />;
      case 'staff': return <StaffManagement />;
      case 'analytics': return <AnalyticsManagement />;
      case 'reports': return <ReportsManagement />;
      case 'audit_logs': return <AuditLogsManagement />;
      case 'settings': return <SettingsManagement />;
      case 'profile': return <UserProfilePage />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {!isInPortal ? (
        /* PUBLIC HOSPITAL WEBSITE MODE */
        <div className="flex flex-col min-h-screen">
          <PublicNavbar />
          <main className="flex-1">
            {renderPublicPage()}
          </main>
          <PublicFooter />
        </div>
      ) : (
        /* HEALTHCARE PORTAL MODE */
        <div className="flex h-screen overflow-hidden">
          <PortalSidebar
            mobileOpen={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <PortalHeader
              onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              onOpenNotifications={() => setNotificationDrawerOpen(true)}
            />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {renderPortalSection()}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* Global Modals & Notifications */}
      <ProtectedByDeepTrustBadge variant="floating" />
      <GlobalSearchModal />
      <AppointmentBookingModal />
      <InvoiceModal />
      <PrescriptionModal />
      <PatientDetailModal />
      <VitalsModal />
      <OfflineQueueModal />
      <NotificationDrawer
        open={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
      />
      <ToastContainer />
      <OfflineStatusBanner />
    </div>
  );
};

export default function App() {
  return (
    <HospitalProvider>
      <HospitalAppContent />
    </HospitalProvider>
  );
}
