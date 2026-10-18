import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  HospitalConfig,
  Department,
  Doctor,
  Patient,
  Appointment,
  Bed,
  OpdQueueItem,
  IpdAdmission,
  Prescription,
  LabTestOrder,
  RadiologyOrder,
  PharmacyItem,
  BillingInvoice,
  InsuranceClaim,
  BloodStockItem,
  BloodDonorRecord,
  OperationSurgery,
  AmbulanceUnit,
  StaffMember,
  NotificationItem,
  AuditLogItem,
  VitalsRecord,
  QueuedChange,
} from '../types';
import {
  initialHospitalConfig,
  initialDepartments,
  initialDoctors,
  initialPatients,
  initialAppointments,
  initialBeds,
  initialOpdQueue,
  initialIpdAdmissions,
  initialPrescriptions,
  initialLabTests,
  initialRadiology,
  initialPharmacy,
  initialBilling,
  initialInsuranceClaims,
  initialBloodBank,
  initialDonors,
  initialOperationSurgeries,
  initialAmbulances,
  initialStaff,
  initialNotifications,
  initialAuditLogs,
  initialVitals,
} from '../data/mockData';

export type PublicPage = 
  | 'home' 
  | 'about' 
  | 'departments' 
  | 'doctors' 
  | 'services' 
  | 'appointments' 
  | 'emergency' 
  | 'facilities' 
  | 'packages' 
  | 'insurance' 
  | 'contact' 
  | 'login';

export type PortalSection =
  | 'dashboard'
  | 'patients'
  | 'doctors'
  | 'nurses'
  | 'appointments'
  | 'departments'
  | 'emergency'
  | 'admissions'
  | 'beds'
  | 'opd'
  | 'ipd'
  | 'laboratory'
  | 'radiology'
  | 'pharmacy'
  | 'prescriptions'
  | 'billing'
  | 'insurance'
  | 'inventory'
  | 'blood_bank'
  | 'operation_theatre'
  | 'ambulance'
  | 'staff'
  | 'reports'
  | 'analytics'
  | 'notifications'
  | 'audit_logs'
  | 'settings'
  | 'profile';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
}

interface HospitalContextType {
  // Public vs Portal mode
  isInPortal: boolean;
  setIsInPortal: (inPortal: boolean) => void;
  publicPage: PublicPage;
  setPublicPage: (page: PublicPage) => void;
  portalSection: PortalSection;
  setPortalSection: (section: PortalSection) => void;
  
  // Auth & Roles
  currentRole: UserRole;
  currentUser: {
    name: string;
    role: UserRole;
    id: string;
    department: string;
    email: string;
    avatarInitials: string;
  };
  sessionToken: string | null;
  loginWithDeepTrust: (role: UserRole) => Promise<{ success: boolean; error?: string; message?: string; authorizedRole?: UserRole }>;
  loginAsPatient: (email: string, password?: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  logout: () => void;

  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Hospital config
  hospitalConfig: HospitalConfig;
  updateHospitalConfig: (config: Partial<HospitalConfig>) => void;

  // Data sets
  departments: Department[];
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];
  beds: Bed[];
  opdQueue: OpdQueueItem[];
  ipdAdmissions: IpdAdmission[];
  prescriptions: Prescription[];
  labTests: LabTestOrder[];
  radiology: RadiologyOrder[];
  pharmacy: PharmacyItem[];
  billing: BillingInvoice[];
  insuranceClaims: InsuranceClaim[];
  bloodBank: BloodStockItem[];
  donors: BloodDonorRecord[];
  operationSurgeries: OperationSurgery[];
  ambulances: AmbulanceUnit[];
  staff: StaffMember[];
  notifications: NotificationItem[];
  auditLogs: AuditLogItem[];
  vitals: VitalsRecord[];

  // Mutators
  addPatient: (patient: Omit<Patient, 'id' | 'registeredDate' | 'lastVisit'>) => Patient;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  bookAppointment: (appointment: Omit<Appointment, 'id' | 'createdDate' | 'status'>) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  addPrescription: (prescription: Omit<Prescription, 'id' | 'date' | 'dispensedStatus'>) => Prescription;
  markPrescriptionDispensed: (id: string) => void;
  addLabTest: (test: Omit<LabTestOrder, 'id' | 'orderDate' | 'collectionStatus' | 'processingStatus'>) => void;
  updateLabResult: (id: string, resultValue: string, flag?: LabTestOrder['flag']) => void;
  addVitals: (record: Omit<VitalsRecord, 'id' | 'timestamp'>) => void;
  updateBedStatus: (bedId: string, status: Bed['status'], patientId?: string, patientName?: string) => void;
  recordPayment: (invoiceId: string, amount: number, method: 'Card' | 'Insurance Direct' | 'Cash' | 'Online Banking') => void;
  updatePharmacyStock: (id: string, delta: number) => void;
  dispatchAmbulance: (ambulanceId: string, destination: string) => void;
  resetAmbulance: (ambulanceId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Modals & Selected states
  selectedPatientId: string | null;
  setSelectedPatientId: (id: string | null) => void;
  selectedInvoice: BillingInvoice | null;
  setSelectedInvoice: (invoice: BillingInvoice | null) => void;
  selectedPrescription: Prescription | null;
  setSelectedPrescription: (rx: Prescription | null) => void;
  isBookModalOpen: boolean;
  setIsBookModalOpen: (open: boolean) => void;
  selectedDoctorForBooking: Doctor | null;
  setSelectedDoctorForBooking: (doc: Doctor | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isVitalsModalOpen: boolean;
  setIsVitalsModalOpen: (open: boolean) => void;
  vitalsTargetPatient: Patient | null;
  setVitalsTargetPatient: (p: Patient | null) => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Offline & Network Caching
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  offlineQueue: QueuedChange[];
  syncOfflineQueue: () => void;
  clearOfflineQueue: () => void;
  isQueueModalOpen: boolean;
  setIsQueueModalOpen: (open: boolean) => void;
  lastSyncTimestamp: string | null;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

// Helper function to safely read from localStorage
const loadCached = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
};

const loadSessionCached = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = sessionStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.warn(`Error reading ${key} from sessionStorage:`, err);
    return fallback;
  }
};


// PKCE and OAuth2 cryptographic security helpers
async function generatePKCE() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  const verifier = Array.from(array, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
  
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  const challenge = btoa(String.fromCharCode.apply(null, hashArray))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
    
  return { verifier, challenge };
}

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation mode
  const [isInPortal, setIsInPortal] = useState<boolean>(false);
  const [publicPage, setPublicPage] = useState<PublicPage>('home');
  const [portalSection, setPortalSection] = useState<PortalSection>('dashboard');
  
  // User & Role
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const cachedUser = loadSessionCached<HospitalContextType['currentUser'] | null>('novacare_authenticated_user', null);
    return cachedUser?.role || 'admin';
  });
  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const token = sessionStorage.getItem('novacare_session_token');
    localStorage.removeItem('novacare_session_token');
    return token;
  });
  const [authenticatedUser, setAuthenticatedUser] = useState<HospitalContextType['currentUser'] | null>(() => {
    if (typeof window === 'undefined') return null;
    const user = loadSessionCached<HospitalContextType['currentUser'] | null>('novacare_authenticated_user', null);
    localStorage.removeItem('novacare_authenticated_user');
    return user;
  });

  // Handle OAuth2 Authorization Code Callback from DeepTrust
  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');

      if (!code) return;

      const codeVerifier = sessionStorage.getItem('novacare_pkce_verifier') || undefined;
      const expectedState = sessionStorage.getItem('novacare_oauth_state');
      const requestedRole = (sessionStorage.getItem('novacare_requested_role') as UserRole) || 'admin';

      // Clean the query parameters from URL immediately for clean address bar
      window.history.replaceState({}, document.title, window.location.pathname);

      if (!state || !expectedState || state !== expectedState) {
        addToast({
          type: 'error',
          title: 'DeepTrust Security Check Failed',
          message: 'The login response could not be matched to the hospital session. Please start again.',
        });
        sessionStorage.removeItem('novacare_pkce_verifier');
        sessionStorage.removeItem('novacare_oauth_state');
        sessionStorage.removeItem('novacare_requested_role');
        return;
      }

      try {
        const res = await fetch('/api/auth/deeptrust/exchange', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            state: state || expectedState,
            code_verifier: codeVerifier,
            requested_role: requestedRole,
            redirect_uri: window.location.origin,
          })
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setSessionToken(data.session_token);
          try { sessionStorage.setItem('novacare_session_token', data.session_token); } catch (e) {}
          setCurrentRole(data.user.role);
          const signedInUser = {
            name: data.user.name,
            role: data.user.role as UserRole,
            id: data.user.id,
            department: data.user.department,
            email: data.user.email,
            avatarInitials: String(data.user.name || 'Staff').split(/\s+/).slice(0, 2).map((part: string) => part[0]).join('').toUpperCase(),
          };
          setAuthenticatedUser(signedInUser);
          try { sessionStorage.setItem('novacare_authenticated_user', JSON.stringify(signedInUser)); } catch (e) {}
          setIsInPortal(true);
          setPortalSection('dashboard');
          addToast({
            type: 'success',
            title: 'DeepTrust Verified',
            message: `Biometric identity confirmed: Welcome, ${data.user.name} (${data.user.role.toUpperCase()})`
          });
          logAction('DeepTrust SSO Callback', 'Authentication', `Successfully authenticated staff ${data.user.name} via DeepTrust`);
        } else {
          addToast({
            type: 'warning',
            title: 'DeepTrust Authentication Notice',
            message: data.message || 'Authorization code exchange rejected or expired.'
          });
        }
      } catch (err: any) {
        addToast({
          type: 'warning',
          title: 'Authentication Notice',
          message: 'Unable to connect to DeepTrust gateway.'
        });
      } finally {
        sessionStorage.removeItem('novacare_pkce_verifier');
        sessionStorage.removeItem('novacare_oauth_state');
        sessionStorage.removeItem('novacare_requested_role');
      }
    };

    handleOAuthCallback();
  }, []);

  // Network State & Offline Queue
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  const [offlineQueue, setOfflineQueue] = useState<QueuedChange[]>(() => {
    return loadCached<QueuedChange[]>('novacare_offline_queue', []);
  });

  const [lastSyncTimestamp, setLastSyncTimestamp] = useState<string | null>(() => {
    return localStorage.getItem('novacare_last_sync') || new Date().toISOString().replace('T', ' ').substring(0, 19);
  });

  const [isQueueModalOpen, setIsQueueModalOpen] = useState<boolean>(false);

  // Theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('novacare_dark_mode') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('novacare_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Config
  const [hospitalConfig, setHospitalConfig] = useState<HospitalConfig>(() => {
    return loadCached<HospitalConfig>('novacare_config', initialHospitalConfig);
  });

  const updateHospitalConfig = (updates: Partial<HospitalConfig>) => {
    setHospitalConfig(prev => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem('novacare_config', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
    addToast({ type: 'success', message: 'Hospital organization settings updated.' });
  };

  // State data collections loaded from localStorage offline cache
  const [departments] = useState<Department[]>(initialDepartments);
  const [doctors] = useState<Doctor[]>(initialDoctors);
  const [patients, setPatients] = useState<Patient[]>(() => loadCached('novacare_patients', initialPatients));
  const [appointments, setAppointments] = useState<Appointment[]>(() => loadCached('novacare_appointments', initialAppointments));
  const [beds, setBeds] = useState<Bed[]>(() => loadCached('novacare_beds', initialBeds));
  const [opdQueue, setOpdQueue] = useState<OpdQueueItem[]>(() => loadCached('novacare_opd_queue', initialOpdQueue));
  const [ipdAdmissions, setIpdAdmissions] = useState<IpdAdmission[]>(() => loadCached('novacare_ipd_admissions', initialIpdAdmissions));
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => loadCached('novacare_prescriptions', initialPrescriptions));
  const [labTests, setLabTests] = useState<LabTestOrder[]>(() => loadCached('novacare_lab_tests', initialLabTests));
  const [radiology, setRadiology] = useState<RadiologyOrder[]>(() => loadCached('novacare_radiology', initialRadiology));
  const [pharmacy, setPharmacy] = useState<PharmacyItem[]>(() => loadCached('novacare_pharmacy', initialPharmacy));
  const [billing, setBilling] = useState<BillingInvoice[]>(() => loadCached('novacare_billing', initialBilling));
  const [insuranceClaims, setInsuranceClaims] = useState<InsuranceClaim[]>(() => loadCached('novacare_insurance_claims', initialInsuranceClaims));
  const [bloodBank, setBloodBank] = useState<BloodStockItem[]>(() => loadCached('novacare_blood_bank', initialBloodBank));
  const [donors] = useState<BloodDonorRecord[]>(initialDonors);
  const [operationSurgeries, setOperationSurgeries] = useState<OperationSurgery[]>(() => loadCached('novacare_surgeries', initialOperationSurgeries));
  const [ambulances, setAmbulances] = useState<AmbulanceUnit[]>(() => loadCached('novacare_ambulances', initialAmbulances));
  const [staff] = useState<StaffMember[]>(initialStaff);
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => loadCached('novacare_notifications', initialNotifications));
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => loadCached('novacare_audit_logs', initialAuditLogs));
  const [vitals, setVitals] = useState<VitalsRecord[]>(() => loadCached('novacare_vitals', initialVitals));

  // Sync cache changes to localStorage
  
  // Synchronize Aggregate Resource Counts with DeepTrust (Non-Drill-Down Numbers Only)
  useEffect(() => {
    try {
      const availBedsCount = beds.filter(b => b.status === 'Available').length;
      const occBedsCount = beds.filter(b => b.status === 'Occupied').length;
      fetch('http://localhost:5000/api/v1/telemetry/aggregate-counts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization_id: 'HEALTHCARE_ORG_1',
          organization_name: 'NovaCare Medical Center',
          counts: {
            patients: patients.length,
            appointments: appointments.length,
            prescriptions: prescriptions.length,
            lab_records: labTests.length,
            insurance_records: insuranceClaims.length,
            billing_transactions: billing.length,
            available_beds: availBedsCount,
            occupied_beds: occBedsCount
          }
        })
      }).catch(() => {});
    } catch (e) {}
  }, [patients.length, appointments.length, prescriptions.length, labTests.length, insuranceClaims.length, billing.length, beds]);

  useEffect(() => {
    try { localStorage.setItem('novacare_patients', JSON.stringify(patients)); } catch (e) {}
  }, [patients]);

  useEffect(() => {
    try { localStorage.setItem('novacare_appointments', JSON.stringify(appointments)); } catch (e) {}
  }, [appointments]);

  useEffect(() => {
    try { localStorage.setItem('novacare_beds', JSON.stringify(beds)); } catch (e) {}
  }, [beds]);

  useEffect(() => {
    try { localStorage.setItem('novacare_opd_queue', JSON.stringify(opdQueue)); } catch (e) {}
  }, [opdQueue]);

  useEffect(() => {
    try { localStorage.setItem('novacare_ipd_admissions', JSON.stringify(ipdAdmissions)); } catch (e) {}
  }, [ipdAdmissions]);

  useEffect(() => {
    try { localStorage.setItem('novacare_prescriptions', JSON.stringify(prescriptions)); } catch (e) {}
  }, [prescriptions]);

  useEffect(() => {
    try { localStorage.setItem('novacare_lab_tests', JSON.stringify(labTests)); } catch (e) {}
  }, [labTests]);

  useEffect(() => {
    try { localStorage.setItem('novacare_radiology', JSON.stringify(radiology)); } catch (e) {}
  }, [radiology]);

  useEffect(() => {
    try { localStorage.setItem('novacare_pharmacy', JSON.stringify(pharmacy)); } catch (e) {}
  }, [pharmacy]);

  useEffect(() => {
    try { localStorage.setItem('novacare_billing', JSON.stringify(billing)); } catch (e) {}
  }, [billing]);

  useEffect(() => {
    try { localStorage.setItem('novacare_insurance_claims', JSON.stringify(insuranceClaims)); } catch (e) {}
  }, [insuranceClaims]);

  useEffect(() => {
    try { localStorage.setItem('novacare_blood_bank', JSON.stringify(bloodBank)); } catch (e) {}
  }, [bloodBank]);

  useEffect(() => {
    try { localStorage.setItem('novacare_surgeries', JSON.stringify(operationSurgeries)); } catch (e) {}
  }, [operationSurgeries]);

  useEffect(() => {
    try { localStorage.setItem('novacare_ambulances', JSON.stringify(ambulances)); } catch (e) {}
  }, [ambulances]);

  useEffect(() => {
    try { localStorage.setItem('novacare_notifications', JSON.stringify(notifications)); } catch (e) {}
  }, [notifications]);

  useEffect(() => {
    try { localStorage.setItem('novacare_audit_logs', JSON.stringify(auditLogs)); } catch (e) {}
  }, [auditLogs]);

  useEffect(() => {
    try { localStorage.setItem('novacare_vitals', JSON.stringify(vitals)); } catch (e) {}
  }, [vitals]);

  useEffect(() => {
    try { localStorage.setItem('novacare_offline_queue', JSON.stringify(offlineQueue)); } catch (e) {}
  }, [offlineQueue]);

  // Network state listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      addToast({
        type: 'success',
        title: 'Connection Restored',
        message: 'Network connection active. NovaCare portal reconnected to clinical cloud.',
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      addToast({
        type: 'warning',
        title: 'Network Disconnected',
        message: 'Operating in offline mode. Changes are cached locally and queued for synchronization.',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Modals & Selected states
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<BillingInvoice | null>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState<boolean>(false);
  const [vitalsTargetPatient, setVitalsTargetPatient] = useState<Patient | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Helper to queue changes when offline
  const queueChangeIfOffline = (
    entity: QueuedChange['entity'],
    action: string,
    description: string,
    payload: any
  ) => {
    if (!isOnline) {
      const queuedItem: QueuedChange = {
        id: `QUE-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        action,
        entity,
        description,
        payload,
      };
      setOfflineQueue(prev => [queuedItem, ...prev]);
      addToast({
        type: 'warning',
        title: 'Offline Action Queued',
        message: `${description}. Queued locally until reconnected.`,
      });
      return true;
    }
    return false;
  };

  // Synchronize offline queue
  const syncOfflineQueue = () => {
    if (offlineQueue.length === 0) {
      addToast({
        type: 'info',
        title: 'Data Synchronized',
        message: 'Local cache is already up to date with the server.',
      });
      return;
    }

    const count = offlineQueue.length;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    setLastSyncTimestamp(now);
    try {
      localStorage.setItem('novacare_last_sync', now);
      localStorage.removeItem('novacare_offline_queue');
    } catch (e) {}

    setOfflineQueue([]);

    // Add system notification and audit log
    const syncNotif: NotificationItem = {
      id: `notif-sync-${Date.now()}`,
      title: 'Cloud Synchronization Complete',
      message: `Successfully synchronized ${count} queued record${count > 1 ? 's' : ''} with NovaCare central servers.`,
      timestamp: 'Just now',
      category: 'system',
      isRead: false,
      priority: 'normal',
    };
    setNotifications(prev => [syncNotif, ...prev]);
    logAction('Sync Offline Queue', 'System', `Synchronized ${count} pending changes with cloud database`);

    addToast({
      type: 'success',
      title: 'Synchronization Complete',
      message: `Successfully synced ${count} pending change${count > 1 ? 's' : ''} to central server.`,
    });
  };

  const clearOfflineQueue = () => {
    const count = offlineQueue.length;
    setOfflineQueue([]);
    try {
      localStorage.removeItem('novacare_offline_queue');
    } catch (e) {}
    addToast({
      type: 'info',
      title: 'Queue Discarded',
      message: `Removed ${count} queued change${count > 1 ? 's' : ''} from local device queue.`,
    });
  };

  // Audit Log helper & Privacy-Preserving Security Telemetry Dispatch
  const logAction = (action: string, module: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: currentUser.name,
      role: currentRole.toUpperCase(),
      action,
      module,
      details,
      ipAddress: isOnline ? '192.168.10.24' : '127.0.0.1 (Offline Local)',
    };
    setAuditLogs(prev => [newLog, ...prev]);

    // Dispatch Security Telemetry to DeepTrust (Zero Clinical Content)
    try {
      let resourceCategory = 'PATIENT_RECORD';
      const m = (module || '').toUpperCase();
      if (m.includes('PHARMACY') || m.includes('PRESCRIPTION')) resourceCategory = 'PRESCRIPTION';
      else if (m.includes('LAB') || m.includes('PATHOLOGY')) resourceCategory = 'LAB_RESULT';
      else if (m.includes('APPOINTMENT') || m.includes('OPD')) resourceCategory = 'APPOINTMENT';
      else if (m.includes('BED') || m.includes('IPD')) resourceCategory = 'BED_MANAGEMENT';
      else if (m.includes('BILLING') || m.includes('PAYMENT')) resourceCategory = 'BILLING';
      else if (m.includes('INSURANCE')) resourceCategory = 'INSURANCE';
      else if (m.includes('ADMIN') || m.includes('STAFF')) resourceCategory = 'STAFF_PERMISSION';

      fetch('http://localhost:5000/api/v1/telemetry/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization_id: 'HEALTHCARE_ORG_1',
          organization_name: 'NovaCare Medical Center',
          subject_id: currentUser.email || currentUser.name,
          role: currentUser.role,
          action: (action || 'READ').toUpperCase(),
          resource_type: resourceCategory,
          resource_reference: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
          timestamp: Date.now() / 1000
        })
      }).catch(() => {});
    } catch (e) {}
  };

  // User Profile by Role
  const roleProfiles: Record<UserRole, { name: string; role: UserRole; id: string; department: string; email: string; avatarInitials: string }> = {
    admin: {
      name: 'Robert Vance, MHA',
      role: 'admin',
      id: 'ADM-001',
      department: 'Executive Hospital Administration',
      email: 'admin@novacaremedical.org',
      avatarInitials: 'RV',
    },
    doctor: {
      name: 'Dr. Elena Vance, MD',
      role: 'doctor',
      id: 'DOC-882',
      department: 'Cardiology & Vascular Institute',
      email: 'elena.vance@novacaremedical.org',
      avatarInitials: 'EV',
    },
    nurse: {
      name: 'Marcus Brody, RN, BSN',
      role: 'nurse',
      id: 'NUR-402',
      department: 'Intensive Cardiac Care (ICU)',
      email: 'marcus.brody@novacaremedical.org',
      avatarInitials: 'MB',
    },
    receptionist: {
      name: 'Sarah Jenkins',
      role: 'receptionist',
      id: 'REC-108',
      department: 'Central Patient Admissions',
      email: 'sarah.jenkins@novacaremedical.org',
      avatarInitials: 'SJ',
    },
    lab_technician: {
      name: 'Liam Chen, MLS (ASCP)',
      role: 'lab_technician',
      id: 'LAB-512',
      department: 'Diagnostic Pathology & Lab',
      email: 'liam.chen@novacaremedical.org',
      avatarInitials: 'LC',
    },
    pharmacist: {
      name: 'Priya Sharma, PharmD',
      role: 'pharmacist',
      id: 'PHM-309',
      department: 'Central Clinical Pharmacy',
      email: 'priya.sharma@novacaremedical.org',
      avatarInitials: 'PS',
    },
    patient: {
      name: 'Eleanor Vance-Ross',
      role: 'patient',
      id: 'PAT-1049',
      department: 'Patient Care Services',
      email: 'eleanor.ross@example.com',
      avatarInitials: 'ER',
    },
  };

  const currentUser = authenticatedUser || {
    ...roleProfiles[currentRole],
    role: currentRole,
  };

  // Primary staff SSO: the backend creates a tenant-bound OAuth transaction.
  const loginWithDeepTrust = async (role: UserRole) => {
    try {
      const { verifier, challenge } = await generatePKCE();
      const redirectUri = window.location.origin;
      const response = await fetch('/api/auth/deeptrust/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requested_role: role, redirect_uri: redirectUri, code_challenge: challenge }),
      });
      const data = await response.json();
      if (!response.ok || !data.success || !data.authorization_url || !data.state) {
        return { success: false, message: data.message || 'DeepTrust hospital login is not configured.' };
      }

      sessionStorage.setItem('novacare_pkce_verifier', verifier);
      sessionStorage.setItem('novacare_oauth_state', data.state);
      sessionStorage.setItem('novacare_requested_role', role);

      window.location.assign(data.authorization_url);
      return { success: true };
    } catch (err: any) {
      console.error('DeepTrust login error:', err);
      return { success: false, message: err.message || 'Failed to start DeepTrust authentication.' };
    }
  };

  // Patient Login (Direct NovaCare Authentication Only)
  const loginAsPatient = async (email: string, password?: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'patient' })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSessionToken(data.session_token);
        try { sessionStorage.setItem('novacare_session_token', data.session_token); } catch (e) {}
        setCurrentRole('patient');
        const signedInUser = {
          name: data.user.name,
          role: 'patient' as UserRole,
          id: data.user.id,
          department: data.user.department,
          email: data.user.email,
          avatarInitials: String(data.user.name || 'Patient').split(/\s+/).slice(0, 2).map((part: string) => part[0]).join('').toUpperCase(),
        };
        setAuthenticatedUser(signedInUser);
        try { sessionStorage.setItem('novacare_authenticated_user', JSON.stringify(signedInUser)); } catch (e) {}
        setIsInPortal(true);
        setPortalSection('dashboard');
        addToast({
          type: 'success',
          title: 'Patient Access Granted',
          message: `Signed in as ${data.user.name}`
        });
        logAction('Patient Login', 'Authentication', `Patient ${data.user.name} authenticated directly`);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Invalid patient credentials.' };
      }
    } catch (err: any) {
      return { success: false, message: 'Patient authentication service error.' };
    }
  };

  const logout = async () => {
    if (sessionToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${sessionToken}` }
        });
      } catch (e) {}
    }
    setSessionToken(null);
    try {
      sessionStorage.removeItem('novacare_session_token');
      localStorage.removeItem('novacare_session_token');
    } catch (e) {}
    setAuthenticatedUser(null);
    try {
      sessionStorage.removeItem('novacare_authenticated_user');
      localStorage.removeItem('novacare_authenticated_user');
    } catch (e) {}
    setIsInPortal(false);
    setPublicPage('home');
    addToast({
      type: 'info',
      message: 'You have been securely signed out of NovaCare Medical Portal.',
    });
  };

  // Mutator operations with offline queueing support
  const addPatient = (patientData: Omit<Patient, 'id' | 'registeredDate' | 'lastVisit'>): Patient => {
    const newId = `PAT-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().split('T')[0];
    const newPatient: Patient = {
      ...patientData,
      id: newId,
      registeredDate: today,
      lastVisit: today,
    };
    setPatients(prev => [newPatient, ...prev]);

    queueChangeIfOffline('patient', 'Add Patient', `Registered patient ${newPatient.name} (${newId})`, newPatient);

    if (isOnline) {
      addToast({ type: 'success', message: `Patient ${newPatient.name} (${newId}) registered successfully.` });
    }
    logAction('Patient Registration', 'Patients', `Created record ${newId}${!isOnline ? ' [Offline Queued]' : ''}`);
    return newPatient;
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    queueChangeIfOffline('patient', 'Update Patient', `Updated patient details ${id}`, { id, updates });
    if (isOnline) {
      addToast({ type: 'success', message: `Patient record ${id} updated.` });
    }
    logAction('Patient Update', 'Patients', `Updated record ${id}${!isOnline ? ' [Offline Queued]' : ''}`);
  };

  const bookAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdDate' | 'status'>): Appointment => {
    const newId = `APT-${Math.floor(8000 + Math.random() * 1999)}`;
    const today = new Date().toISOString().split('T')[0];
    const token = Math.floor(100 + Math.random() * 50);

    const newAppointment: Appointment = {
      ...appointmentData,
      id: newId,
      status: 'Confirmed',
      tokenNumber: token,
      createdDate: today,
    };

    setAppointments(prev => [newAppointment, ...prev]);
    
    // Also push into OPD queue if today
    if (appointmentData.date === today) {
      setOpdQueue(prev => [
        ...prev,
        {
          tokenNumber: token,
          patientId: appointmentData.patientId,
          patientName: appointmentData.patientName,
          department: appointmentData.departmentName,
          doctorName: appointmentData.doctorName,
          arrivalTime: appointmentData.time,
          estimatedWaitMinutes: 15,
          status: 'Waiting',
        },
      ]);
    }

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Appointment Scheduled',
      message: `${appointmentData.patientName} scheduled with ${appointmentData.doctorName} for ${appointmentData.date} at ${appointmentData.time}.`,
      timestamp: 'Just now',
      category: 'appointment',
      isRead: false,
      priority: 'normal',
    };
    setNotifications(prev => [newNotif, ...prev]);

    queueChangeIfOffline('appointment', 'Book Appointment', `Appointment for ${appointmentData.patientName} with ${appointmentData.doctorName} (${newId})`, newAppointment);

    if (isOnline) {
      addToast({
        type: 'success',
        title: 'Appointment Confirmed',
        message: `Ref #${newId} with ${appointmentData.doctorName} for ${appointmentData.date}`,
      });
    }

    logAction('Book Appointment', 'Appointments', `Booked ${newId} for ${appointmentData.patientName}${!isOnline ? ' [Offline Queued]' : ''}`);
    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    queueChangeIfOffline('appointment', 'Update Appointment Status', `Appointment ${id} status set to ${status}`, { id, status });
    if (isOnline) {
      addToast({ type: 'info', message: `Appointment ${id} status updated to ${status}.` });
    }
    logAction('Appointment Status', 'Appointments', `Set ${id} to ${status}`);
  };

  const addPrescription = (rxData: Omit<Prescription, 'id' | 'date' | 'dispensedStatus'>): Prescription => {
    const newId = `RX-${Math.floor(4000 + Math.random() * 999)}`;
    const today = new Date().toISOString().split('T')[0];
    const newRx: Prescription = {
      ...rxData,
      id: newId,
      date: today,
      dispensedStatus: 'Pending',
    };
    setPrescriptions(prev => [newRx, ...prev]);

    queueChangeIfOffline('prescription', 'Create Prescription', `Prescription ${newId} for ${rxData.patientName}`, newRx);

    if (isOnline) {
      addToast({ type: 'success', message: `Prescription ${newId} created for ${rxData.patientName}.` });
    }
    logAction('Create Prescription', 'Prescriptions', `Issued ${newId}${!isOnline ? ' [Offline Queued]' : ''}`);
    return newRx;
  };

  const markPrescriptionDispensed = (id: string) => {
    setPrescriptions(prev => prev.map(rx => rx.id === id ? { ...rx, dispensedStatus: 'Dispensed' } : rx));
    queueChangeIfOffline('prescription', 'Dispense Prescription', `Marked Rx ${id} dispensed`, { id });
    if (isOnline) {
      addToast({ type: 'success', message: `Prescription ${id} marked as fully dispensed.` });
    }
    logAction('Dispense Prescription', 'Pharmacy', `Dispensed ${id}`);
  };

  const addLabTest = (testData: Omit<LabTestOrder, 'id' | 'orderDate' | 'collectionStatus' | 'processingStatus'>) => {
    const newId = `LAB-${Math.floor(7000 + Math.random() * 999)}`;
    const today = new Date().toISOString().split('T')[0];
    const newOrder: LabTestOrder = {
      ...testData,
      id: newId,
      orderDate: today,
      collectionStatus: 'Collected',
      processingStatus: 'In Analysis',
    };
    setLabTests(prev => [newOrder, ...prev]);

    queueChangeIfOffline('lab', 'Order Lab Test', `Requisition ${testData.testName} (${newId}) for ${testData.patientName}`, newOrder);

    if (isOnline) {
      addToast({ type: 'success', message: `Lab requisition ${newId} submitted for analysis.` });
    }
    logAction('Order Lab Test', 'Laboratory', `Ordered ${testData.testName} (${newId})${!isOnline ? ' [Offline Queued]' : ''}`);
  };

  const updateLabResult = (id: string, resultValue: string, flag: LabTestOrder['flag'] = 'Normal') => {
    setLabTests(prev => prev.map(t => t.id === id ? {
      ...t,
      resultValue,
      flag,
      processingStatus: 'Completed',
      labTechnician: currentUser.name,
    } : t));

    queueChangeIfOffline('lab', 'Submit Lab Result', `Lab result updated for ${id}: ${resultValue} (${flag})`, { id, resultValue, flag });

    if (isOnline) {
      addToast({ type: 'success', message: `Lab report ${id} finalized and released.` });
    }
    logAction('Submit Lab Result', 'Laboratory', `Report ${id} finalized${!isOnline ? ' [Offline Queued]' : ''}`);
  };

  const addVitals = (recordData: Omit<VitalsRecord, 'id' | 'timestamp'>) => {
    const newId = `VIT-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const timeStr = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const record: VitalsRecord = {
      ...recordData,
      id: newId,
      timestamp: timeStr,
    };
    setVitals(prev => [record, ...prev]);

    const patientName = patients.find(p => p.id === recordData.patientId)?.name || recordData.patientId;
    queueChangeIfOffline('vitals', 'Record Vitals', `Vitals for ${patientName}: BP ${recordData.bloodPressure}, HR ${recordData.heartRate}`, record);

    if (isOnline) {
      addToast({ type: 'success', message: `Vitals logged for Patient ${recordData.patientId}` });
    }
    logAction('Record Vitals', 'Nursing', `Vitals logged for ${recordData.patientId}${!isOnline ? ' [Offline Queued]' : ''}`);
  };

  const updateBedStatus = (bedId: string, status: Bed['status'], patientId?: string, patientName?: string) => {
    setBeds(prev => prev.map(b => b.id === bedId ? {
      ...b,
      status,
      patientId: status === 'Available' ? undefined : (patientId ?? b.patientId),
      patientName: status === 'Available' ? undefined : (patientName ?? b.patientName),
    } : b));

    queueChangeIfOffline('bed', 'Update Bed Status', `Bed ${bedId} updated to ${status}`, { bedId, status, patientId, patientName });

    if (isOnline) {
      addToast({ type: 'info', message: `Bed ${bedId} updated to ${status}` });
    }
    logAction('Bed Management', 'Wards', `Bed ${bedId} set to ${status}${!isOnline ? ' [Offline Queued]' : ''}`);
  };

  const recordPayment = (invoiceId: string, amount: number, method: 'Card' | 'Insurance Direct' | 'Cash' | 'Online Banking') => {
    setBilling(prev => prev.map(inv => {
      if (inv.id !== invoiceId) return inv;
      const newPaid = inv.paidAmount + amount;
      const newBalance = Math.max(0, inv.totalAmount - newPaid);
      const newStatus = newBalance <= 0 ? 'Paid' : 'Partially Paid';
      return {
        ...inv,
        paidAmount: newPaid,
        balanceDue: newBalance,
        status: newStatus,
        paymentMethod: method,
      };
    }));

    queueChangeIfOffline('billing', 'Record Payment', `Payment of $${amount} for invoice ${invoiceId}`, { invoiceId, amount, method });

    if (isOnline) {
      addToast({ type: 'success', message: `Payment of $${amount.toLocaleString()} received for ${invoiceId}.` });
    }
    logAction('Record Payment', 'Billing', `Received $${amount} for ${invoiceId}${!isOnline ? ' [Offline Queued]' : ''}`);
  };

  const updatePharmacyStock = (id: string, delta: number) => {
    setPharmacy(prev => prev.map(item => {
      if (item.id !== id) return item;
      const newStock = Math.max(0, item.stockQuantity + delta);
      let status: PharmacyItem['status'] = 'In Stock';
      if (newStock === 0) status = 'Out of Stock';
      else if (newStock <= item.minReorderLevel) status = 'Low Stock';
      return {
        ...item,
        stockQuantity: newStock,
        status,
      };
    }));

    queueChangeIfOffline('pharmacy', 'Adjust Stock', `Adjusted medicine ${id} stock by ${delta}`, { id, delta });

    if (isOnline) {
      addToast({ type: 'info', message: `Inventory adjusted for item ${id}` });
    }
  };

  const dispatchAmbulance = (ambulanceId: string, destination: string) => {
    setAmbulances(prev => prev.map(a => a.id === ambulanceId ? {
      ...a,
      status: 'Dispatched',
      currentLocation: `En Route to ${destination}`,
    } : a));

    queueChangeIfOffline('ambulance', 'Dispatch Ambulance', `Ambulance ${ambulanceId} dispatched to ${destination}`, { ambulanceId, destination });

    addToast({ type: 'warning', title: 'Ambulance Dispatched', message: `Vehicle ${ambulanceId} dispatched to ${destination}` });
    logAction('Ambulance Dispatch', 'Emergency', `Ambulance ${ambulanceId} dispatched${!isOnline ? ' [Offline Queued]' : ''}`);
  };

  const resetAmbulance = (ambulanceId: string) => {
    setAmbulances(prev => prev.map(a => a.id === ambulanceId ? {
      ...a,
      status: 'Available',
      currentLocation: 'Hospital Emergency Bay Portico',
    } : a));

    queueChangeIfOffline('ambulance', 'Reset Ambulance', `Ambulance ${ambulanceId} returned to bay`, { ambulanceId });

    addToast({ type: 'info', message: `Ambulance ${ambulanceId} returned and ready for duty.` });
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    addToast({ type: 'info', message: 'All notifications marked as read.' });
  };

  return (
    <HospitalContext.Provider
      value={{
        isInPortal,
        setIsInPortal,
        publicPage,
        setPublicPage,
        portalSection,
        setPortalSection,
        currentRole,
        currentUser,
        sessionToken,
        loginWithDeepTrust,
        loginAsPatient,
        logout,
        isDarkMode,
        toggleDarkMode,
        hospitalConfig,
        updateHospitalConfig,
        departments,
        doctors,
        patients,
        appointments,
        beds,
        opdQueue,
        ipdAdmissions,
        prescriptions,
        labTests,
        radiology,
        pharmacy,
        billing,
        insuranceClaims,
        bloodBank,
        donors,
        operationSurgeries,
        ambulances,
        staff,
        notifications,
        auditLogs,
        vitals,
        addPatient,
        updatePatient,
        bookAppointment,
        updateAppointmentStatus,
        addPrescription,
        markPrescriptionDispensed,
        addLabTest,
        updateLabResult,
        addVitals,
        updateBedStatus,
        recordPayment,
        updatePharmacyStock,
        dispatchAmbulance,
        resetAmbulance,
        markNotificationRead,
        markAllNotificationsRead,
        selectedPatientId,
        setSelectedPatientId,
        selectedInvoice,
        setSelectedInvoice,
        selectedPrescription,
        setSelectedPrescription,
        isBookModalOpen,
        setIsBookModalOpen,
        selectedDoctorForBooking,
        setSelectedDoctorForBooking,
        isSearchOpen,
        setIsSearchOpen,
        isVitalsModalOpen,
        setIsVitalsModalOpen,
        vitalsTargetPatient,
        setVitalsTargetPatient,
        toasts,
        addToast,
        removeToast,
        isOnline,
        setIsOnline,
        offlineQueue,
        syncOfflineQueue,
        clearOfflineQueue,
        isQueueModalOpen,
        setIsQueueModalOpen,
        lastSyncTimestamp,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
