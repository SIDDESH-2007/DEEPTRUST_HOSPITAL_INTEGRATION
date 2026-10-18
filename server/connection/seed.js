import { Admin, Doctor, Nurse, Receptionist, LabTech, Pharmacist, Patient } from './HospitalIntegrationForDT.js';
import mongoose from 'mongoose';

async function seedDatabase() {
  try {
    await mongoose.connection.asPromise();
    console.log('Connected, clearing old data and seeding new collections...');

    // Clear existing data
    await Admin.deleteMany({});
    await Doctor.deleteMany({});
    await Nurse.deleteMany({});
    await Receptionist.deleteMany({});
    await LabTech.deleteMany({});
    await Pharmacist.deleteMany({});
    await Patient.deleteMany({});

    // Staff identities are provisioned and authenticated in DeepTrust.
    // Do not create local hospital admin credentials.

    // Seed Doctors
    const docs = await Doctor.insertMany([
      { doctorId: 'D001', firstName: 'Alice', lastName: 'Smith', specialization: 'Cardiology', department: 'Heart Center' },
      { doctorId: 'D002', firstName: 'Bob', lastName: 'Jones', specialization: 'Neurology', department: 'Brain Center' },
      { doctorId: 'D003', firstName: 'Carol', lastName: 'Williams', specialization: 'Pediatrics', department: 'Childrens Health' }
    ]);

    // Seed Nurses
    await Nurse.insertMany([
      { staffId: 'N001', firstName: 'David', lastName: 'Brown', department: 'ICU', shift: 'Night' },
      { staffId: 'N002', firstName: 'Eva', lastName: 'Davis', department: 'Emergency', shift: 'Day' },
      { staffId: 'N003', firstName: 'Frank', lastName: 'Miller', department: 'Pediatrics', shift: 'Day' }
    ]);

    // Seed Receptionists
    await Receptionist.insertMany([
      { staffId: 'R001', firstName: 'Grace', lastName: 'Wilson', deskNumber: 'Front-1' },
      { staffId: 'R002', firstName: 'Henry', lastName: 'Moore', deskNumber: 'ER-1' }
    ]);

    // Seed Lab Techs
    await LabTech.insertMany([
      { staffId: 'L001', firstName: 'Ivy', lastName: 'Taylor', labType: 'Blood Work' },
      { staffId: 'L002', firstName: 'Jack', lastName: 'Anderson', labType: 'Radiology' }
    ]);

    // Seed Pharmacists
    await Pharmacist.insertMany([
      { staffId: 'P001', firstName: 'Karen', lastName: 'Thomas', licenseNumber: 'PHARM-1234' },
      { staffId: 'P002', firstName: 'Leo', lastName: 'Jackson', licenseNumber: 'PHARM-5678' }
    ]);

    // Seed Patients
    await Patient.insertMany([
      { patientId: 'PT001', firstName: 'John', lastName: 'Doe', dateOfBirth: new Date('1980-01-01'), contactNumber: '555-0101', medicalHistory: ['Hypertension'], assignedDoctor: docs[0]._id },
      { patientId: 'PT002', firstName: 'Jane', lastName: 'Roe', dateOfBirth: new Date('1992-05-15'), contactNumber: '555-0202', medicalHistory: ['Asthma'], assignedDoctor: docs[1]._id },
      { patientId: 'PT003', firstName: 'Sam', lastName: 'Smith', dateOfBirth: new Date('2015-08-20'), contactNumber: '555-0303', medicalHistory: [], assignedDoctor: docs[2]._id }
    ]);

    console.log('Database successfully seeded with data for all personas! Refresh your MongoDB viewer.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
