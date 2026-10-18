import express from 'express';
import { requireAuth, requireRoles } from './auth.js';

const router = express.Router();

// Patient protected endpoints
router.get('/profile', requireAuth, (req, res) => {
  // Enforce access: either the patient themselves, or clinical staff
  const callerRole = req.user.role;
  if (callerRole !== 'patient' && !['admin', 'doctor', 'nurse', 'receptionist'].includes(callerRole)) {
    return res.status(403).json({
      success: false,
      error: 'FORBIDDEN',
      message: 'Access denied to patient profile.'
    });
  }

  res.json({
    success: true,
    patient_id: 'PAT-1049',
    name: 'Eleanor Vance-Ross',
    dob: '1988-04-12',
    blood_group: 'O+',
    allergies: ['Penicillin', 'Sulfa Drugs'],
    primary_doctor: 'Dr. Elena Vance, MD',
    protected_by: 'NovaCare HIPAA Vault'
  });
});

router.get('/records', requireAuth, (req, res) => {
  res.json({
    success: true,
    records: [
      { id: 'REC-901', date: '2026-09-15', diagnosis: 'Acute Cardiac Arrhythmia', doctor: 'Dr. Elena Vance, MD', status: 'Stable' },
      { id: 'REC-842', date: '2026-08-10', diagnosis: 'Annual Comprehensive Health Screening', doctor: 'Dr. Marcus Chen', status: 'Completed' }
    ]
  });
});

export default router;
