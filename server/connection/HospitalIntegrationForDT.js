import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/HospitalIntegrationForDT';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB: HospitalIntegrationForDT'))
  .catch(err => console.error('MongoDB connection error:', err));

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

const doctorSchema = new mongoose.Schema({
  doctorId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialization: { type: String },
  department: { type: String },
  role: { type: String, default: 'doctor' },
  createdAt: { type: Date, default: Date.now }
});

const nurseSchema = new mongoose.Schema({
  staffId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String },
  shift: { type: String },
  role: { type: String, default: 'nurse' },
  createdAt: { type: Date, default: Date.now }
});

const receptionistSchema = new mongoose.Schema({
  staffId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  deskNumber: { type: String },
  role: { type: String, default: 'receptionist' },
  createdAt: { type: Date, default: Date.now }
});

const labTechSchema = new mongoose.Schema({
  staffId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  labType: { type: String },
  role: { type: String, default: 'lab_tech' },
  createdAt: { type: Date, default: Date.now }
});

const pharmacistSchema = new mongoose.Schema({
  staffId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  licenseNumber: { type: String },
  role: { type: String, default: 'pharmacist' },
  createdAt: { type: Date, default: Date.now }
});

const patientSchema = new mongoose.Schema({
  patientId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date },
  contactNumber: { type: String },
  medicalHistory: { type: Array, default: [] },
  assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  createdAt: { type: Date, default: Date.now }
});

export const Admin = mongoose.model('Admin', adminSchema);
export const Doctor = mongoose.model('Doctor', doctorSchema);
export const Nurse = mongoose.model('Nurse', nurseSchema);
export const Receptionist = mongoose.model('Receptionist', receptionistSchema);
export const LabTech = mongoose.model('LabTech', labTechSchema);
export const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);
export const Patient = mongoose.model('Patient', patientSchema);
