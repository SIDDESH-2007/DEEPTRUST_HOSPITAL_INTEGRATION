import express from 'express';
import { requireAuth, requireRoles } from './auth.js';

const router = express.Router();

// Protected Nurse endpoints - only nurse, doctor, or admin
router.get('/ward-vitals', requireAuth, requireRoles(['nurse', 'doctor', 'admin']), (req, res) => {
  res.json({
    success: true,
    ward: 'ICU Cardiac Care Station 4',
    vitals_summary: [
      { patientId: 'PAT-1049', bed: 'ICU-04', bp: '120/78', hr: 72, spo2: 99, status: 'Normal' },
      { patientId: 'PAT-1052', bed: 'ICU-06', bp: '135/88', hr: 84, spo2: 97, status: 'Observation' }
    ]
  });
});

router.post('/record-vitals', requireAuth, requireRoles(['nurse', 'doctor', 'admin']), (req, res) => {
  const { patientId, bp, hr, spo2, temp } = req.body;
  res.json({
    success: true,
    message: `Vitals recorded by ${req.user.name} (${req.user.role}) for patient ${patientId}`,
    recordedAt: new Date().toISOString()
  });
});

export default router;
