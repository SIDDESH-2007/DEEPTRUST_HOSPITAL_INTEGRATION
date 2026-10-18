export type UserRole = 
  | 'admin' 
  | 'doctor' 
  | 'nurse' 
  | 'receptionist' 
  | 'lab_technician' 
  | 'pharmacist' 
  | 'patient';

export interface HospitalConfig {
  name: string;
  shortName: string;
  tagline: string;
  address: string;
  city: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  website: string;
  established: string;
  licenseNumber: string;
  traumaLevel: string;
  accreditation: string[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headOfDept: string;
  description: string;
  iconName: string;
  floor: string;
  phoneExtension: string;
  doctorsCount: number;
  bedsCount: number;
  services: string[];
  keySpecialties: string[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  licenseNo: string;
  consultationFee: number;
  availableDays: string[];
  availableHours: string;
  rating: number;
  reviewsCount: number;
  languages: string[];
  email: string;
  phone: string;
  bio: string;
  roomNo: string;
  isAvailableToday: boolean;
}

export interface VitalsRecord {
  id: string;
  patientId: string;
  timestamp: string;
  bloodPressure: string; // e.g. "120/80"
  heartRate: number; // bpm
  temperature: number; // °F
  spO2: number; // %
  respiratoryRate: number; // breaths/min
  bloodSugar?: number; // mg/dL
  takenBy: string;
  notes?: string;
}

export interface Patient {
  id: string; // e.g. "PAT-1049"
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  phone: string;
  email: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  status: 'Outpatient' | 'Inpatient' | 'Discharged' | 'Emergency Care';
  department: string;
  assignedDoctorId?: string;
  assignedDoctorName?: string;
  roomBed?: string;
  admissionDate?: string;
  dischargeDate?: string;
  registeredDate: string;
  lastVisit: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
}

export interface Appointment {
  id: string; // e.g. "APT-8821"
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorId: string;
  doctorName: string;
  departmentId: string;
  departmentName: string;
  date: string; // YYYY-MM-DD
  time: string; // "09:30 AM"
  type: 'In-Person Consultation' | 'Follow-up' | 'Diagnostic Review' | 'Emergency Assessment' | 'Second Opinion';
  symptoms: string;
  status: 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled' | 'In Consultation';
  tokenNumber?: number;
  createdDate: string;
  notes?: string;
}

export interface Bed {
  id: string;
  bedNumber: string;
  wardName: string;
  category: 'General Ward' | 'Private Room' | 'ICU' | 'NICU' | 'Emergency' | 'Isolation';
  floor: string;
  dailyRate: number;
  status: 'Available' | 'Occupied' | 'Reserved' | 'Maintenance';
  patientId?: string;
  patientName?: string;
  admittedDate?: string;
  attendingDoctor?: string;
}

export interface OpdQueueItem {
  tokenNumber: number;
  patientId: string;
  patientName: string;
  department: string;
  doctorName: string;
  arrivalTime: string;
  estimatedWaitMinutes: number;
  status: 'Waiting' | 'Vitals Taken' | 'With Doctor' | 'Completed' | 'Skipped';
}

export interface IpdAdmission {
  id: string; // e.g. "IPD-302"
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  ward: string;
  bedNumber: string;
  doctorName: string;
  admissionDate: string;
  diagnosis: string;
  expectedDischarge: string;
  status: 'Admitted' | 'Critical' | 'Stable' | 'Discharge Pending' | 'Discharged';
}

export interface MedicationItem {
  medicineName: string;
  dosage: string; // e.g. "500mg"
  frequency: string; // e.g. "Twice daily after meals"
  duration: string; // e.g. "7 days"
  instructions: string;
}

export interface Prescription {
  id: string; // e.g. "RX-4091"
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  diagnosis: string;
  vitals?: string;
  medications: MedicationItem[];
  advice: string;
  followUpDate?: string;
  dispensedStatus: 'Pending' | 'Dispensed' | 'Partially Dispensed';
}

export interface LabTestOrder {
  id: string; // e.g. "LAB-7721"
  patientId: string;
  patientName: string;
  doctorName: string;
  testName: string;
  category: 'Hematology' | 'Biochemistry' | 'Microbiology' | 'Pathology' | 'Immunology';
  sampleType: 'Whole Blood' | 'Serum' | 'Urine' | 'Swab' | 'Tissue';
  orderDate: string;
  collectionStatus: 'Collected' | 'Pending Collection' | 'Sample Received';
  processingStatus: 'Completed' | 'In Analysis' | 'Scheduled';
  normalRange: string;
  resultValue?: string;
  flag?: 'Normal' | 'High' | 'Low' | 'Critical';
  labTechnician?: string;
  notes?: string;
}

export interface RadiologyOrder {
  id: string; // e.g. "RAD-5012"
  patientId: string;
  patientName: string;
  doctorName: string;
  modality: 'X-Ray' | 'CT Scan' | 'MRI' | 'Ultrasound' | 'PET-CT';
  bodyPart: string;
  orderDate: string;
  status: 'Requested' | 'Scheduled' | 'Scan Completed' | 'Report Completed';
  findings?: string;
  radiologist?: string;
}

export interface PharmacyItem {
  id: string;
  name: string;
  genericName: string;
  category: 'Antibiotic' | 'Cardiovascular' | 'Analgesic' | 'Antidiabetic' | 'Respiratory' | 'IV Fluid' | 'Vaccine';
  dosageForm: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Ointment';
  strength: string;
  batchNumber: string;
  stockQuantity: number;
  minReorderLevel: number;
  unitPrice: number;
  expiryDate: string;
  supplier: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface BillingInvoice {
  id: string; // e.g. "INV-9021"
  patientId: string;
  patientName: string;
  invoiceDate: string;
  dueDate: string;
  items: {
    description: string;
    category: 'Consultation' | 'Laboratory' | 'Radiology' | 'Pharmacy' | 'Room Charges' | 'Operation & Procedure' | 'Nursing';
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
  subtotal: number;
  taxAmount: number;
  discount: number;
  insuranceCoveredAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  status: 'Paid' | 'Pending' | 'Partially Paid' | 'Insurance Processing';
  paymentMethod?: 'Card' | 'Insurance Direct' | 'Cash' | 'Online Banking';
}

export interface InsuranceClaim {
  id: string;
  policyNumber: string;
  provider: string;
  patientId: string;
  patientName: string;
  claimAmount: number;
  approvedAmount: number;
  submissionDate: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected';
  notes: string;
}

export interface BloodStockItem {
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  unitsAvailable: number;
  unitsReserved: number;
  status: 'Adequate' | 'Moderate' | 'Critical Shortage';
}

export interface BloodDonorRecord {
  id: string;
  donorName: string;
  bloodGroup: string;
  unitsDonated: number;
  donationDate: string;
  contact: string;
  hemoglobin: string;
}

export interface OperationSurgery {
  id: string; // e.g. "OT-104"
  otRoom: string; // "OT Suite 2"
  patientId: string;
  patientName: string;
  procedureName: string;
  leadSurgeon: string;
  anesthesiologist: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: string;
  status: 'Scheduled' | 'Preparing' | 'In Progress' | 'Completed' | 'Post-Op Recovery' | 'Cancelled';
}

export interface AmbulanceUnit {
  id: string;
  vehicleNumber: string;
  vehicleModel: string;
  driverName: string;
  driverPhone: string;
  paramedicTeam: string;
  status: 'Available' | 'Dispatched' | 'On Trip' | 'Returning' | 'Maintenance';
  currentLocation: string;
  assignedCallId?: string;
  equipmentLevel: 'Advanced Life Support (ALS)' | 'Basic Life Support (BLS)' | 'Neonatal Transport';
}

export interface StaffMember {
  id: string; // "EMP-410"
  name: string;
  role: 'Doctor' | 'Nurse' | 'Receptionist' | 'Lab Technician' | 'Pharmacist' | 'Admin' | 'Surgeon' | 'Security';
  department: string;
  shift: 'Morning (07:00 - 15:30)' | 'Evening (15:00 - 23:30)' | 'Night (23:00 - 07:30)' | 'Rotational';
  email: string;
  phone: string;
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'On Duty' | 'Off Duty';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'appointment' | 'emergency' | 'lab' | 'pharmacy' | 'admission' | 'billing' | 'system';
  isRead: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
}

export interface QueuedChange {
  id: string;
  timestamp: string;
  action: string;
  entity: 'patient' | 'appointment' | 'prescription' | 'vitals' | 'lab' | 'bed' | 'billing' | 'pharmacy' | 'ambulance';
  description: string;
  payload: any;
}
